import { useEffect, useRef, useState } from "react";
import Logger from "../helper/logger";

const resolveResponse = async (response: Response) => {
  const type = response.headers.get("content-type");

  if (type?.includes("application/json")) {
    return await response.json();
  } else {
    return await response.text();
  }
};

type AnyObject = { [name: string]: any };

interface Options extends Partial<RequestInit> {
  method?: "GET" | "POST";
  headers?: AnyObject;
  body?: any;
}

interface Payload<P, D> {
  params?: P;
  options?: Options;
  mapper?: (data: D, setStore?: (store: any) => void) => any;

  // Init control
  initialData?: D;
  initialFetch?: boolean;
}

function useFetch<P extends { [name: string]: any } = any, D = any>(
  endpoint: string,
  payload?: Payload<P, D>,
) {
  // Extend default
  payload = Object.assign({ initialFetch: true }, payload);

  // eslint-disable-next-line no-undef
  const signalRef = useRef(new AbortController()).current;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<D>(payload?.initialData!);
  const [error, setError] = useState<any>();
  const [params, setParams] = useState<P>(payload?.params!);

  const doRequest = () => {
    const defaults: AnyObject = {
      headers: {
        ...payload?.options?.headers,
      },
      method: payload?.options?.method || "GET",
      signal: signalRef.signal,
    };

    if (params) {
      const pattern = /{\s*(\w+?)\s*}/g;
      endpoint = endpoint.replace(
        pattern,
        (_, token: any) => params?.[token]! || "",
      );
    }

    if (payload?.options?.body) {
      defaults.headers.body = payload?.options?.body;
    }

    Logger.debug("REQUEST", {
      endpoint,
      params,
    });

    fetch(endpoint, defaults)
      .then(async (response) => {
        try {
          const resolvedResponse = await resolveResponse(response);

          response.ok
            ? setData(
                typeof payload?.mapper === "function"
                  ? payload?.mapper(resolvedResponse)
                  : resolvedResponse,
              )
            : setError(resolvedResponse);
        } catch (err) {
          setError(err);
        }

        setLoading(false);
      })
      .catch(setError);
  };

  const load = (newParams?: Partial<P>) => {
    setLoading(true);

    if (newParams) setParams((s) => ({ ...s, ...newParams }));
    else doRequest();
  };

  const abort = () => {
    signalRef.abort();
  };

  useEffect(() => () => signalRef.abort(), []);
  useEffect(() => {
    if (payload?.initialFetch) {
      setLoading(true);
      doRequest();
    }
  }, [endpoint, params]);

  return {
    isLoading,
    data,
    error,
    load,
    abort,
    fetchParams: params,
    manipulate: setData,
  };
}

export { useFetch };
