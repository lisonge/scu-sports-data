import fs from "node:fs/promises";
import path from "node:path";

async function* walk(dirPath: string) {
  const pathnameList = (await fs.readdir(dirPath)).map((s) =>
    path.join(dirPath, s)
  );
  while (pathnameList.length > 0) {
    const pathname = pathnameList.pop()!;
    const state = await fs.lstat(pathname);
    if (state.isFile()) {
      yield pathname;
    } else if (state.isDirectory()) {
      pathnameList.push(
        ...(await fs.readdir(pathname)).map((s) => path.join(pathname, s))
      );
    }
  }
}
const nameConfig: Record<number, string> = {
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
const config: Record<string, any[]> = {};
for await (const fp of walk(process.cwd() + "/public/_data/")) {
  const id = fp.split(/[\/\\]/).at(-2);
  config[id] = config[id] ?? [];
  const obj = JSON.parse((await fs.readFile(fp)).toString("utf-8"));
  // obj.hash = obj.id;
  // obj.id = obj.course.id;
  // obj.name = obj.course.name;
  // delete obj.course;
  // obj.id = String(obj.id);
  fs.writeFile(fp, JSON.stringify(obj), "utf-8");
  config[id].push(obj);
}
Object.entries(config).forEach(([id, objs]) => {
  fs.writeFile(
    `${process.cwd()}/public/_combine/${id}.json`,
    JSON.stringify({
      id,
      name: nameConfig[id],
      papers: objs,
    })
  );
});
