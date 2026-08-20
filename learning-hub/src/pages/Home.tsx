import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BookMarked,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock3,
  ExternalLink,
  Github,
  Menu,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { agentStages, allLessons, chapters, resources, type Resource } from "@/data/learningCatalog";

const STORAGE_KEY = "dky-learn-progress-v2";
const resourceTypes = ["全部", "課程", "論文", "工具", "研究筆記"] as const;

function readProgress() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return new Set<string>(value ? JSON.parse(value) : []);
  } catch {
    return new Set<string>();
  }
}

export default function Home() {
  const [completed, setCompleted] = useState<Set<string>>(readProgress);
  const [selectedChapterId, setSelectedChapterId] = useState(chapters[0].id);
  const [selectedAgentStage, setSelectedAgentStage] = useState(agentStages[0].id);
  const [resourceType, setResourceType] = useState<(typeof resourceTypes)[number]>("全部");
  const [query, setQuery] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completed)));
  }, [completed]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape") setQuery("");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const selectedChapter = chapters.find((chapter) => chapter.id === selectedChapterId) ?? chapters[0];
  const selectedStage = agentStages.find((stage) => stage.id === selectedAgentStage) ?? agentStages[0];
  const totalItems = allLessons.length + agentStages.length;
  const completedCount = Array.from(completed).filter((id) => allLessons.some((lesson) => lesson.id === id) || agentStages.some((stage) => stage.id === id)).length;
  const progress = Math.round((completedCount / totalItems) * 100);
  const nextLesson = allLessons.find((lesson) => !completed.has(lesson.id)) ?? allLessons[0];
  const nextChapter = chapters.find((chapter) => chapter.lessons.some((lesson) => lesson.id === nextLesson.id)) ?? chapters[0];

  const searchResults = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("zh-TW");
    if (!needle) return [];
    const lessons = allLessons
      .filter((lesson) => [lesson.number, lesson.title, lesson.summary, ...lesson.tags].join(" ").toLocaleLowerCase("zh-TW").includes(needle))
      .map((lesson) => ({ id: lesson.id, title: `${lesson.number} ${lesson.title}`, meta: `${lesson.kind} · ${lesson.minutes} 分鐘`, href: lesson.href }));
    const library = resources
      .filter((resource) => [resource.title, resource.description, resource.type, ...resource.tags].join(" ").toLocaleLowerCase("zh-TW").includes(needle))
      .map((resource) => ({ id: resource.id, title: resource.title, meta: resource.meta, href: resource.href }));
    return [...lessons, ...library].slice(0, 8);
  }, [query]);

  const filteredResources = useMemo(() => {
    if (resourceType === "全部") return resources;
    return resources.filter((resource) => resource.type === resourceType);
  }, [resourceType]);

  const toggleComplete = (id: string) => {
    setCompleted((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const closeNavAndScroll = (id: string) => {
    setMobileNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const continueLearning = () => {
    setSelectedChapterId(nextChapter.id);
    window.setTimeout(() => document.getElementById("course")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const chapterDone = (chapterId: string) => {
    const chapter = chapters.find((item) => item.id === chapterId);
    if (!chapter) return 0;
    return chapter.lessons.filter((lesson) => completed.has(lesson.id)).length;
  };

  return (
    <div className="learning-app">
      <a className="skip-link" href="#main-content">跳到主要內容</a>

      <aside className={mobileNavOpen ? "side-rail is-open" : "side-rail"} aria-label="網站目錄">
        <div className="rail-brand">
          <span className="brand-mark">學</span>
          <div><strong>DKY Learn</strong><small>學習作業系統</small></div>
          <button className="rail-close" onClick={() => setMobileNavOpen(false)} aria-label="關閉目錄"><X size={20} /></button>
        </div>

        <nav className="toc" aria-label="頁面目錄">
          <span className="toc-label">目錄</span>
          <button onClick={() => closeNavAndScroll("overview")}><span>01</span>今日學習</button>
          <button onClick={() => closeNavAndScroll("course")}><span>02</span>統計學習課程</button>
          <button onClick={() => closeNavAndScroll("agent-route")}><span>03</span>AI Agent 路徑</button>
          <button onClick={() => closeNavAndScroll("library")}><span>04</span>資源圖書館</button>
          <button onClick={() => closeNavAndScroll("method")}><span>05</span>學習方法</button>
        </nav>

        <div className="rail-progress">
          <div className="progress-head"><span>整體進度</span><b>{progress}%</b></div>
          <div className="progress-track" role="progressbar" aria-label="整體學習進度" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div>
          <p>{completedCount} / {totalItems} 個學習節點</p>
        </div>

        <div className="rail-links">
          <a href="https://github.com/a9181873/islp-course" target="_blank" rel="noreferrer"><Github size={16} />課程原始碼</a>
          <a href="https://www.statlearning.com/" target="_blank" rel="noreferrer"><BookMarked size={16} />ISLP 教材</a>
        </div>
      </aside>
      {mobileNavOpen && <button className="rail-scrim" aria-label="關閉目錄" onClick={() => setMobileNavOpen(false)} />}

      <div className="app-column">
        <header className="app-header">
          <button className="menu-button" onClick={() => setMobileNavOpen(true)} aria-label="開啟目錄"><Menu size={21} /></button>
          <div className="search-shell">
            <Search size={18} aria-hidden="true" />
            <input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜尋課程、技術或研究資源" aria-label="搜尋所有學習內容" />
            <kbd>/</kbd>
            {query && <button onClick={() => setQuery("")} aria-label="清除搜尋"><X size={16} /></button>}
            {query && (
              <div className="search-popover" role="status">
                <div className="search-popover-head"><span>搜尋結果</span><b>{searchResults.length}</b></div>
                {searchResults.length ? searchResults.map((result) => (
                  <a key={result.id} href={result.href} target="_blank" rel="noreferrer" onClick={() => setQuery("")}>
                    <span><strong>{result.title}</strong><small>{result.meta}</small></span><ArrowRight size={16} />
                  </a>
                )) : <p>找不到相符內容，試試「交叉驗證」、「記憶」或「SVM」。</p>}
              </div>
            )}
          </div>
          <span className="header-status"><span />內容索引已整合</span>
        </header>

        <main id="main-content">
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <span className="eyebrow">STATISTICAL LEARNING × AGENTIC AI</span>
              <h1 id="hero-title">把學習資源，整理成一條<br /><em>真正走得完的路。</em></h1>
              <p>從 ISLP 的統計基礎，到 AI Agent 的工具使用、記憶與可靠性。每一段都說清楚先備知識、投入時間與完成成果。</p>
              <div className="hero-actions">
                <button className="primary-action" onClick={continueLearning}>繼續學習 <ArrowRight size={17} /></button>
                <button className="text-action" onClick={() => closeNavAndScroll("course")}>查看完整目錄</button>
              </div>
              <div className="hero-facts"><span><b>{allLessons.length}</b> 堂統計課程</span><span><b>{agentStages.length}</b> 段 Agent 路徑</span><span><b>{resources.length}</b> 份精選資源</span></div>
            </div>

            <article className="focus-card" aria-label="下一個學習項目">
              <div className="focus-card-top"><span>下一站</span><span>{nextChapter.week}</span></div>
              <div className="focus-number">{nextLesson.number}</div>
              <p className="focus-kicker">{nextChapter.title}</p>
              <h2>{nextLesson.title}</h2>
              <p>{nextLesson.summary}</p>
              <div className="focus-meta"><span><Clock3 size={15} />{nextLesson.minutes} 分鐘</span><span>{nextLesson.kind}</span></div>
              <a href={nextLesson.href} target="_blank" rel="noreferrer">開始這一課 <ExternalLink size={15} /></a>
            </article>
          </section>

          <section id="overview" className="today-section section-anchor" aria-labelledby="today-title">
            <div className="section-heading compact-heading">
              <div><span className="section-no">01 / TODAY</span><h2 id="today-title">今天只做這三件事</h2></div>
              <p>一個學習單位控制在 50 分鐘內，先形成理解，再關掉教材提取，最後用一個小任務驗證。</p>
            </div>
            <div className="sprint-grid">
              <article><span>25 MIN</span><b>理解</b><p>讀一個核心概念，只記下能改變判斷的三個重點。</p></article>
              <article><span>05 MIN</span><b>提取</b><p>關掉頁面，用自己的話回答「它解決什麼問題？」</p></article>
              <article><span>20 MIN</span><b>應用</b><p>完成一個最小實作或比較題，留下失敗與修正紀錄。</p></article>
            </div>
          </section>

          <section id="course" className="course-section section-anchor" aria-labelledby="course-title">
            <div className="section-heading">
              <div><span className="section-no">02 / STATISTICAL LEARNING</span><h2 id="course-title">ISLP 統計學習課程</h2></div>
              <p>原始 GitHub 課程、線上文章與練習資料已對齊成章節目錄。先觀念、再比較、最後 Lab；完成勾選會保留在這台裝置。</p>
            </div>

            <div className="course-layout">
              <nav className="chapter-list" aria-label="ISLP 章節">
                {chapters.map((chapter) => (
                  <button key={chapter.id} className={selectedChapter.id === chapter.id ? "is-active" : ""} onClick={() => setSelectedChapterId(chapter.id)}>
                    <span>{chapter.chapter}</span>
                    <span><b>{chapter.title}</b><small>{chapter.week} · {chapterDone(chapter.id)}/{chapter.lessons.length}</small></span>
                    <ChevronRight size={17} />
                  </button>
                ))}
              </nav>

              <div className="chapter-panel">
                <div className="chapter-panel-head">
                  <div><span>{selectedChapter.chapter} · {selectedChapter.week}</span><h3>{selectedChapter.title}</h3></div>
                  <p><b>完成後，你能：</b>{selectedChapter.outcome}</p>
                </div>
                <div className="lesson-list">
                  {selectedChapter.lessons.map((lesson) => {
                    const isDone = completed.has(lesson.id);
                    return (
                      <article className={isDone ? "lesson-row is-done" : "lesson-row"} key={lesson.id}>
                        <button className="complete-button" onClick={() => toggleComplete(lesson.id)} aria-label={isDone ? `標示 ${lesson.title} 為未完成` : `標示 ${lesson.title} 為已完成`} aria-pressed={isDone}>
                          {isDone ? <CheckCircle2 size={21} /> : <Circle size={21} />}
                        </button>
                        <span className="lesson-number">{lesson.number}</span>
                        <a href={lesson.href} target="_blank" rel="noreferrer">
                          <span><strong>{lesson.title}</strong><small>{lesson.summary}</small></span>
                          <span className="lesson-side"><small>{lesson.kind} · {lesson.minutes} 分</small><ArrowRight size={17} /></span>
                        </a>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section id="agent-route" className="agent-section section-anchor" aria-labelledby="agent-title">
            <div className="section-heading light-heading">
              <div><span className="section-no">03 / AGENTIC AI</span><h2 id="agent-title">AI Agent 學習路徑</h2></div>
              <p>先讓單一模型可靠呼叫工具，再進入編排、記憶與多代理。路徑整合工作區內的工具索引、論文依據與實務研究筆記。</p>
            </div>
            <div className="agent-layout">
              <ol className="agent-rail">
                {agentStages.map((stage) => (
                  <li key={stage.id}>
                    <button className={stage.id === selectedStage.id ? "is-active" : ""} onClick={() => setSelectedAgentStage(stage.id)}>
                      <span>{completed.has(stage.id) ? <Check size={15} /> : stage.number}</span><b>{stage.title}</b><small>{stage.duration}</small>
                    </button>
                  </li>
                ))}
              </ol>
              <article className="agent-detail">
                <div className="agent-detail-top"><span>STAGE {selectedStage.number}</span><span><Clock3 size={14} />{selectedStage.duration}</span></div>
                <h3>{selectedStage.title}</h3>
                <p>{selectedStage.description}</p>
                <div className="skill-chips">{selectedStage.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                <div className="stage-outcome"><Sparkles size={19} /><p><b>完成成果</b>{selectedStage.outcome}</p></div>
                <button className={completed.has(selectedStage.id) ? "stage-complete is-done" : "stage-complete"} onClick={() => toggleComplete(selectedStage.id)}>
                  {completed.has(selectedStage.id) ? <><CheckCircle2 size={17} />已完成這一段</> : <><Circle size={17} />標記為已完成</>}
                </button>
              </article>
              <aside className="agent-note"><span>學習守則</span><p>每一階段都用「概念 → 小實作 → 原始來源 → 回顧」四步走。不要把成功執行一次的範例當成可靠系統。</p><button onClick={() => closeNavAndScroll("library")}>找這一段的資源 <ArrowRight size={15} /></button></aside>
            </div>
          </section>

          <section id="library" className="library-section section-anchor" aria-labelledby="library-title">
            <div className="section-heading">
              <div><span className="section-no">04 / LIBRARY</span><h2 id="library-title">精選資源圖書館</h2></div>
              <p>只保留能改變實作判斷的內容，並直接連回課程原始碼、官方教材、論文或完整研究筆記。</p>
            </div>
            <div className="resource-filters" aria-label="資源類型篩選">
              {resourceTypes.map((type) => <button key={type} className={resourceType === type ? "is-active" : ""} onClick={() => setResourceType(type)}>{type}</button>)}
            </div>
            <div className="resource-grid">
              {filteredResources.map((resource: Resource, index) => (
                <a href={resource.href} target="_blank" rel="noreferrer" className="resource-card" key={resource.id}>
                  <div><span>{String(index + 1).padStart(2, "0")}</span><span className="resource-type">{resource.type}</span></div>
                  <h3>{resource.title}</h3><p>{resource.description}</p>
                  <div className="resource-card-foot"><small>{resource.meta}</small><ExternalLink size={16} /></div>
                </a>
              ))}
            </div>
          </section>

          <section id="method" className="method-section section-anchor" aria-labelledby="method-title">
            <div className="method-copy"><span className="section-no">05 / METHOD</span><h2 id="method-title">為人類記憶設計，<br />不是為內容數量設計。</h2><p>目錄解決「我在哪裡」；時間標示解決「現在能不能開始」；提取與實作解決「我真的會了嗎」；裝置內進度則讓你下次直接接續。</p></div>
            <div className="method-grid">
              <article><span>01</span><b>先定位</b><p>每章先看完成成果，再決定今天的投入。</p></article>
              <article><span>02</span><b>短迴圈</b><p>閱讀、提取、應用控制在一個專注時段內。</p></article>
              <article><span>03</span><b>交錯練習</b><p>比較相近方法，比只重複同一題更能建立判斷。</p></article>
              <article><span>04</span><b>留下證據</b><p>以可解釋、可重跑的輸出取代「看完了」的錯覺。</p></article>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div><span className="brand-mark small">學</span><p><b>DKY Learn</b><small>統計學習 · AI Agent · 開源實作</small></p></div>
          <p>內容依據 ISLP 課程原始碼與工作區研究資源整合。</p>
          <a href="https://github.com/a9181873/islp-course" target="_blank" rel="noreferrer">GitHub <ExternalLink size={14} /></a>
        </footer>
      </div>
    </div>
  );
}
