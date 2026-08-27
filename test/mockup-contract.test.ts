import assert from "node:assert/strict";
import test from "node:test";
import { MOCKUP_MEDIA_CONFIG } from "../app/lib/mockup-config.ts";

test("mockup media uses device-matched capture and display contracts", () => {
  assert.deepEqual(MOCKUP_MEDIA_CONFIG.laptop.captureViewport, {
    width: 1024,
    height: 680,
  });
  assert.equal(MOCKUP_MEDIA_CONFIG.laptop.objectFit, "contain");
  assert.deepEqual(MOCKUP_MEDIA_CONFIG.mobile.captureViewport, {
    width: 390,
    height: 844,
  });
  assert.equal(MOCKUP_MEDIA_CONFIG.mobile.objectFit, "cover");
  assert.equal(
    MOCKUP_MEDIA_CONFIG.mobile.notchColor,
    "var(--hero-background)",
  );
});
