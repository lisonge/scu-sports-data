import localforage from "localforage";
import type { CombineCourse } from "./types";
localforage.config({
  driver: localforage.INDEXEDDB,
  version: 1,
});

export const id2name: Record<string, string> = {
  1: "橄榄球",
  2: "健美操",
  3: "击剑",
  4: "篮球",
  5: "排球",
  6: "排舞",
  7: "乒乓球",
  8: "气排球",
  9: "散手",
  10: "射箭",
  11: "社交舞",
  12: "太极拳",
  13: "跆拳道",
  14: "网球",
  15: "校园定向",
  16: "艺术体操",
  17: "瑜伽",
  18: "羽毛球",
  19: "自卫防身",
  20: "足球",
};
export const ids = Object.keys(id2name);

export const type2name: Record<number, string> = {
  1: `判断题`,
  2: `单选题`,
  3: `多选题`,
};

export const getCombineCourse = async (id: string): Promise<CombineCourse> => {
  const key = `/_combine/${id}.json`;
  let text = await localforage.getItem<string>(key);
  if (!text) {
    const resp = await fetch(key);
    text = await resp.text();
    localforage.setItem(key, text);
  }
  return JSON.parse(text);
};
