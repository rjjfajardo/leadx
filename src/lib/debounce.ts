// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <A extends any[]>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (...arg: A) => any,
  interval: number,
): ((...arg: A) => void) => {
  let timerId: string | number | NodeJS.Timeout | undefined = undefined;
  return (...args: A) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, interval);
  };
};
