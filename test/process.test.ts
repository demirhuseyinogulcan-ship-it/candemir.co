import assert from "node:assert/strict";
import test from "node:test";
import { PROCESS_TREE } from "../app/lib/constants.ts";

test("process phases expose an intentional three-step phrase sequence", () => {
  const nodes = PROCESS_TREE as unknown as ReadonlyArray<{
    readonly name: string;
    readonly phrases?: readonly string[];
  }>;

  assert.deepEqual(
    nodes.map((node) => node.phrases),
    [
      ["bağlamı aç", "işi çöz", "fırsatı gör"],
      ["söyleneni dinle", "arananı ölç", "çelişkiyi yakala"],
      ["gürültüyü ayıkla", "kök nedeni bul", "tek probleme in"],
      ["olasılıkları tart", "konumu seç", "yönü kur"],
      ["mesajı sırala", "tonu belirle", "bakışı yönlendir"],
      ["iskeleti kur", "akışı sadeleştir", "deneyimi ör"],
      ["bileşeni kur", "sistemi bağla", "ürünü çalıştır"],
      ["kırığı tara", "hızı ölç", "sinyali oku"],
      ["işe yarayanı çoğalt", "otomasyonu bağla", "menzili büyüt"],
    ],
  );
});
