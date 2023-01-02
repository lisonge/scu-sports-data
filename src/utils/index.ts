import {
  createEffect,
  createSignal,
  onCleanup,
  Signal,
  SignalOptions,
} from "solid-js";

export const delay = async (n = 0) => {
  return new Promise<void>((res) => {
    setTimeout(res, n);
  });
};

export const debounce = <T extends (...args: any[]) => void>(fn: T, n = 0) => {
  let id: number | undefined = undefined;
  return ((...args: any[]) => {
    if (id !== undefined) {
      window.clearTimeout(id);
    }
    id = window.setTimeout(fn, n, ...args);
  }) as unknown as T;
};

/**
 * 注意不能在 if 和 for/while 中调用
 * 缓存 路由根组件 的数据，由于 solid-router 目前没有 history api，导致数据无法回收
 */
export const createCacheSignal = (() => {
  const cacheSignals: unknown[] = [];
  let count = 0;
  return function <T>(value: T, options?: SignalOptions<T>): Signal<T> {
    if (count == 0) {
      onCleanup(() => {
        count = 0;
      });
    }
    if (cacheSignals.length > count) {
      value = cacheSignals[count] as T;
    } else {
      cacheSignals.push(value);
    }
    const [s, set] = createSignal(value, options);
    const c = count;
    createEffect(() => {
      cacheSignals[c] = s();
    });
    count++;
    return [s, set];
  };
})();
