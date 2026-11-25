import { useState } from "react";
import { initApp } from "@freeappstore/sdk";
import { Shell, type NavItem } from "@freeappstore/sdk/ui";
import { cards, categories } from "./deck";

export const fas = initApp({ appId: "mandarinflash" });
const nav: NavItem[] = [{ label: "Cards", href: "/", title: "Mandarin Flash" }];
export default function App() {
  const [selected, setSelected] = useState<string>("All");
  const [recall, setRecall] = useState(false);
  const [revealed, setRevealed] = useState<number[]>([]);
  return <Shell app={fas} appName="Mandarin Flash" nav={nav}>
    <main className="deck-page">
      <header className="intro"><p className="eyebrow">A little Mandarin, clearly compared</p><h1>See the difference.</h1><p>Small visual clues make memorable connections. Compare the writing, sounds and meanings side by side.</p></header>
      <section aria-labelledby="filter-heading"><h2 id="filter-heading">Explore the deck</h2><div className="filters" aria-label="Filter cards by category">{["All", ...categories].map(category => <button key={category} type="button" aria-pressed={selected === category} onClick={() => setSelected(category)}>{category}</button>)}</div>
      <label className="recall"><input type="checkbox" checked={recall} onChange={e => {setRecall(e.target.checked); setRevealed([]);}} /> Practice recall: hide answers until revealed</label></section>
      <div className="cards">{cards.map((card, index) => selected !== "All" && selected !== card.category ? null : <article className="card" key={index}><p className="category">{card.category}</p><div className="pair">{card.items.map(item => <div className="word" key={item.hanzi}><span className="hanzi" lang="zh-Hans">{item.hanzi}</span>{(!recall || revealed.includes(index)) && <><span className="pinyin">{item.pinyin}</span><span>{item.meaning}</span></>}</div>)}</div>{recall && !revealed.includes(index) ? <button className="reveal" onClick={() => setRevealed([...revealed, index])}>Reveal pronunciation and meaning</button> : <div className="explanation"><p><strong>Notice:</strong> {card.note}</p>{card.target && <p>{card.target}</p>}</div>}</article>)}</div>
      <footer>Made for curious learners ? <a href="https://freeappstore.online">FreeAppStore</a><p>Readings and meanings checked against <a href="https://en.wiktionary.org/wiki/Appendix:HSK_list_of_Mandarin_words_v3.0/level_1">Wiktionary and its Mandarin word lists</a>.</p></footer>
    </main>
  </Shell>;
}
