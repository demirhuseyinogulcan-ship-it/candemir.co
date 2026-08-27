import assert from "node:assert/strict";
import test from "node:test";
import { PROJECTS } from "../app/lib/constants.ts";

test("KapsülKent case study exposes real copy and responsive preview media", () => {
  const project = PROJECTS.find((item) => item.id === "kapsulotel");

  assert.ok(project, "KapsülKent project should exist");
  assert.doesNotMatch(project.description, /Lorem ipsum|Türkiye'nin ilk/);
  assert.doesNotMatch(project.story, /Lorem ipsum|Vivamus|Duis aute|Excepteur/);
  assert.equal(project.story.split("\n\n").length, 4);
  assert.deepEqual(project.mockupVideos, ["/videos/kapsulkent-desktop.mp4"]);
  assert.deepEqual(project.mobileMockupVideos, ["/videos/kapsulkent-mobile.mp4"]);
  assert.equal(
    project.mockupScreenshot,
    "/images/projects/kapsulotel/kapsulkent-poster.jpg",
  );
});
