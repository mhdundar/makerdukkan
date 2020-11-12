function debug(name: string, params: any = "") {
  if (__DEV__) {
    if (typeof params === "object") {
      try {
        params = JSON.stringify(params, null, 2);
      } catch (error) {
        console.log(error);
      }
    }

    console.log(
      `\n\x1b[47m\x1b[30m::LOG DEBUG ~ ${name}\x1b[0m`,
      `\x1b[36m${params}\x1b[0m`,
      "\n",
    );
  }
}

export default { debug };
