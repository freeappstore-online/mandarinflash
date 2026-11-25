import { describe, expect, it } from "vitest";
import { cards, categories } from "./deck";
describe("verified starter deck", () => {
  it("uses the intended categories and tone-marked readings", () => {
    expect(categories).toEqual(["Same pinyin, different tones", "Same sound & tone, different writing/meaning", "Look-alikes, different meaning", "Near-sounds (not homophones)"]);
    expect(cards.map(c => [c.category, ...c.items.map(i => `${i.hanzi} ${i.pinyin}`)])).toEqual([
      [categories[0], "买 mǎi", "卖 mài"], [categories[1], "他 tā", "她 tā"], [categories[1], "权利 quánlì", "权力 quánlì"], [categories[2], "未 wèi", "末 mò"], [categories[3], "四 sì", "十 shí"]
    ]);
    expect(cards[2].target).toContain("利 lì"); expect(cards[2].target).toContain("力 lì");
    expect(cards[4].note).toContain("not homophones");
    expect(JSON.stringify(cards)).not.toMatch(/[晴睛]/);
  });
});