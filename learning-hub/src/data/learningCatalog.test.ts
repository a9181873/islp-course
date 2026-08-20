import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { agentStages, allLessons, chapters, resources } from "./learningCatalog";

describe("learningCatalog", () => {
  it("keeps every learning node uniquely addressable", () => {
    const ids = [...allLessons.map((lesson) => lesson.id), ...agentStages.map((stage) => stage.id), ...resources.map((resource) => resource.id)];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("keeps every statistics chapter actionable", () => {
    for (const chapter of chapters) {
      expect(chapter.lessons.length).toBeGreaterThan(0);
      expect(chapter.lessons.some((lesson) => lesson.kind === "實作" || lesson.kind === "案例")).toBe(true);
      expect(chapter.lessons.every((lesson) => lesson.href.startsWith("https://learn.dky.tw/"))).toBe(true);
    }
  });

  it("maps every course URL to a publishable HTML file", () => {
    for (const lesson of allLessons) {
      const pathname = new URL(lesson.href).pathname.replace(/^\//, "");
      expect(existsSync(resolve("..", pathname)), `${lesson.number}: ${pathname}`).toBe(true);
    }
  });

  it("includes both first-party course material and evidence sources", () => {
    expect(resources.some((resource) => resource.href.includes("a9181873/islp-course"))).toBe(true);
    expect(resources.some((resource) => resource.type === "論文" && resource.href.includes("arxiv.org"))).toBe(true);
  });
});
