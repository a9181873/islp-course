#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(process.argv[2] ?? ".");
const sourceRoot = fs.existsSync(path.join(projectRoot, "client/src")) ? "client/src" : "src";
const catalogPath = path.join(projectRoot, sourceRoot, "data/learningCatalog.ts");
const homePath = path.join(projectRoot, sourceRoot, "pages/Home.tsx");
const failures = [];

for (const filePath of [catalogPath, homePath]) {
  if (!fs.existsSync(filePath)) failures.push(`找不到必要檔案：${path.relative(projectRoot, filePath)}`);
}

if (failures.length === 0) {
  const catalog = fs.readFileSync(catalogPath, "utf8");
  const home = fs.readFileSync(homePath, "utf8");
  const lessonIds = [...catalog.matchAll(/id:\s*"(s-[^"]+)"/g)].map((match) => match[1]);
  const coursePaths = [...catalog.matchAll(/courseUrl\("([^"]+)"\)/g)].map((match) => match[1]);
  const duplicate = (values) => [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];

  if (lessonIds.length < 40) failures.push(`統計課程節點只有 ${lessonIds.length} 個，低於預期下限 40`);
  if (lessonIds.length !== coursePaths.length) failures.push(`lesson id (${lessonIds.length}) 與課程網址 (${coursePaths.length}) 數量不一致`);
  if (duplicate(lessonIds).length) failures.push(`重複 lesson id：${duplicate(lessonIds).join(", ")}`);
  if (duplicate(coursePaths).length) failures.push(`重複課程網址：${duplicate(coursePaths).join(", ")}`);

  const publishRoot = path.dirname(projectRoot);
  if (fs.existsSync(path.join(publishRoot, ".git"))) {
    for (const coursePath of coursePaths) {
      const candidates = [path.join(publishRoot, "statistics", coursePath), path.join(publishRoot, coursePath)];
      if (!candidates.some((candidate) => fs.existsSync(candidate))) {
        failures.push(`找不到課程發布檔案：${coursePath}`);
      }
    }
  }

  for (const anchor of ["overview", "course", "agent-route", "library", "method"]) {
    if (!home.includes(`id="${anchor}"`)) failures.push(`缺少主要章節錨點：${anchor}`);
  }
  if (!home.includes("localStorage")) failures.push("找不到裝置內進度保存機制");
  if (!home.includes("role=\"progressbar\"")) failures.push("找不到可及性進度列");
  if (!home.includes("skip-link")) failures.push("找不到跳到主要內容連結");

  console.log(`課程節點：${lessonIds.length}`);
  console.log(`唯一課程網址：${new Set(coursePaths).size}`);
  console.log("主要章節：5");
}

if (failures.length) {
  console.error("\n稽核失敗：");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("稽核通過：內容索引與學習介面結構完整。");
