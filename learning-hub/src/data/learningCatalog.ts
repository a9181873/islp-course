export type LessonKind = "觀念" | "實作" | "案例";

export type Lesson = {
  id: string;
  number: string;
  title: string;
  summary: string;
  href: string;
  minutes: number;
  kind: LessonKind;
  tags: string[];
};

export type Chapter = {
  id: string;
  chapter: string;
  title: string;
  week: string;
  outcome: string;
  lessons: Lesson[];
};

export type AgentStage = {
  id: string;
  number: string;
  title: string;
  duration: string;
  description: string;
  outcome: string;
  skills: string[];
};

export type Resource = {
  id: string;
  type: "課程" | "論文" | "工具" | "研究筆記";
  title: string;
  description: string;
  href: string;
  meta: string;
  tags: string[];
};

// The historical repository stores some course pages at the site root while
// newer pages live under /statistics. Keep the mapping explicit so every link
// has a matching publish artifact without duplicating the lesson files.
const rootCourseFiles = new Set([
  "02_What_Is_Statistical_Learning.html",
  "02_Assessing_Model_Accuracy.html",
  "02_Lab_Python_Introduction.html",
  "03_simple_linear_regression.html",
  "3.2_multiple_linear_regression.html",
  "3_3_other_considerations.html",
  "3.4_the_marketing_plan.html",
  "04_Generative_Models.html",
  "04_classification_methods_comparison.html",
  "04_7_lab_classification_methods.html",
  "05_the_bootstrap.html",
  "6.1_subset_selection.html",
  "6.2_shrinkage_methods.html",
  "7.2_step_functions.html",
  "7.7_generalized_additive_models.html",
  "8.3_lab_tree_methods.html",
  "10.3_convolutional_neural_networks.html",
]);

const courseUrl = (file: string) =>
  `https://learn.dky.tw/${rootCourseFiles.has(file) ? "" : "statistics/"}${file}`;

export const chapters: Chapter[] = [
  {
    id: "chapter-2",
    chapter: "CH 02",
    title: "統計學習的共同語言",
    week: "第 1 週",
    outcome: "能分辨預測與推論、監督與非監督學習，並用 Python 讀取與觀察資料。",
    lessons: [
      { id: "s-2-1", number: "2.1", title: "什麼是統計學習？", summary: "Y=f(X)+ε、預測 vs 推論、參數化 vs 非參數化。", href: courseUrl("02_What_Is_Statistical_Learning.html"), minutes: 30, kind: "觀念", tags: ["統計學習", "監督學習"] },
      { id: "s-2-2", number: "2.2", title: "評估模型準確度", summary: "Bias–variance tradeoff、Bayes classifier、KNN 與測試誤差。", href: courseUrl("02_Assessing_Model_Accuracy.html"), minutes: 35, kind: "觀念", tags: ["模型評估", "KNN"] },
      { id: "s-2-3", number: "2.3", title: "Lab：Python 入門", summary: "NumPy、pandas 與 matplotlib 的課程必備操作。", href: courseUrl("02_Lab_Python_Introduction.html"), minutes: 50, kind: "實作", tags: ["Python", "pandas"] },
    ],
  },
  {
    id: "chapter-3",
    chapter: "CH 03",
    title: "線性迴歸：建立第一個可解釋模型",
    week: "第 2 週",
    outcome: "能建模、檢查假設、解讀係數，並知道線性方法何時比 KNN 合適。",
    lessons: [
      { id: "s-3-1", number: "3.1", title: "簡單線性迴歸", summary: "最小平方法、係數估計、信賴區間與假說檢定。", href: courseUrl("03_simple_linear_regression.html"), minutes: 35, kind: "觀念", tags: ["線性迴歸", "OLS"] },
      { id: "s-3-2", number: "3.2", title: "多元線性迴歸", summary: "F 檢定、變數選擇、R² 與預測區間。", href: courseUrl("3.2_multiple_linear_regression.html"), minutes: 40, kind: "觀念", tags: ["多元迴歸", "F 檢定"] },
      { id: "s-3-3", number: "3.3", title: "迴歸模型的其他考量", summary: "虛擬變數、交互作用、殘差診斷、共線性與 VIF。", href: courseUrl("3_3_other_considerations.html"), minutes: 40, kind: "觀念", tags: ["殘差", "VIF"] },
      { id: "s-3-4", number: "3.4", title: "行銷計畫", summary: "用迴歸回答預算配置與媒體效果的真實決策問題。", href: courseUrl("3.4_the_marketing_plan.html"), minutes: 25, kind: "案例", tags: ["行銷", "應用"] },
      { id: "s-3-5", number: "3.5", title: "線性迴歸 vs KNN", summary: "比較參數化與非參數化方法，以及維度詛咒。", href: courseUrl("3.5_linear_regression_vs_knn.html"), minutes: 25, kind: "觀念", tags: ["KNN", "維度詛咒"] },
      { id: "s-3-6", number: "3.6", title: "Lab：線性迴歸", summary: "以 Boston 房價完成建模、交互作用與殘差分析。", href: courseUrl("3.6_lab_linear_regression.html"), minutes: 60, kind: "實作", tags: ["Python", "Boston"] },
    ],
  },
  {
    id: "chapter-4",
    chapter: "CH 04",
    title: "分類：從機率到類別決策",
    week: "第 3 週",
    outcome: "能在 Logistic、LDA、QDA、KNN 與 Naive Bayes 之間做有根據的選擇。",
    lessons: [
      { id: "s-4-3", number: "4.3", title: "邏輯回歸", summary: "Logistic function、勝算比、最大概似估計與混淆因子。", href: courseUrl("4.3_logistic_regression.html"), minutes: 40, kind: "觀念", tags: ["Logistic", "MLE"] },
      { id: "s-4-4", number: "4.4", title: "生成模型：LDA・QDA・Naive Bayes", summary: "從貝氏觀點理解生成式分類與模型假設。", href: courseUrl("04_Generative_Models.html"), minutes: 40, kind: "觀念", tags: ["LDA", "Naive Bayes"] },
      { id: "s-4-5", number: "4.5", title: "分類方法比較", summary: "把五種經典分類方法放在同一張決策地圖上。", href: courseUrl("04_classification_methods_comparison.html"), minutes: 30, kind: "案例", tags: ["模型選擇", "分類"] },
      { id: "s-4-6", number: "4.6", title: "廣義線性模型", summary: "Poisson 迴歸、計數資料、連結函數與 GLM 統一框架。", href: courseUrl("4_6_generalized_linear_models.html"), minutes: 35, kind: "觀念", tags: ["GLM", "Poisson"] },
      { id: "s-4-7", number: "4.7", title: "Lab：分類方法", summary: "親手比較 Logistic、LDA、QDA 與 KNN 的預測表現。", href: courseUrl("04_7_lab_classification_methods.html"), minutes: 60, kind: "實作", tags: ["Python", "分類"] },
    ],
  },
  {
    id: "chapter-5",
    chapter: "CH 05",
    title: "重抽樣：把模型評估做對",
    week: "第 4 週",
    outcome: "能用交叉驗證選模型、用 Bootstrap 衡量不確定性，並避免資料洩漏。",
    lessons: [
      { id: "s-5-1", number: "5.1", title: "交叉驗證", summary: "Validation set、LOOCV、k-fold CV 與偏差變異權衡。", href: courseUrl("05_cross_validation.html"), minutes: 35, kind: "觀念", tags: ["交叉驗證", "LOOCV"] },
      { id: "s-5-2", number: "5.2", title: "Bootstrap", summary: "用有放回抽樣估計標準誤差、信賴區間與模型穩定性。", href: courseUrl("05_the_bootstrap.html"), minutes: 35, kind: "觀念", tags: ["Bootstrap", "不確定性"] },
      { id: "s-5-3", number: "5.3", title: "Lab：CV 與 Bootstrap", summary: "從切分資料到重抽樣，完整建立可重現評估流程。", href: courseUrl("05_lab_cross_validation_bootstrap.html"), minutes: 55, kind: "實作", tags: ["Python", "模型評估"] },
    ],
  },
  {
    id: "chapter-6",
    chapter: "CH 06",
    title: "模型選擇、正則化與高維度",
    week: "第 5 週",
    outcome: "能控制過度擬合、選擇 λ，並在 p 接近或大於 n 時建立可靠模型。",
    lessons: [
      { id: "s-6-1", number: "6.1", title: "子集選擇", summary: "最佳子集、逐步選擇與 Cp、AIC、BIC、調整 R²。", href: courseUrl("6.1_subset_selection.html"), minutes: 35, kind: "觀念", tags: ["特徵選擇", "BIC"] },
      { id: "s-6-2", number: "6.2", title: "收縮方法", summary: "Ridge 溫和收縮、Lasso 選變數，以及交叉驗證選 λ。", href: courseUrl("6.2_shrinkage_methods.html"), minutes: 45, kind: "觀念", tags: ["Ridge", "Lasso"] },
      { id: "s-6-3", number: "6.3", title: "PCR 與 PLS", summary: "先濃縮再分析：比較無監督與監督式降維。", href: courseUrl("6.3_pcr_pls.html"), minutes: 35, kind: "觀念", tags: ["PCR", "PLS"] },
      { id: "s-6-4", number: "6.4", title: "高維度資料", summary: "理解 p > n、稀疏性假設與高維模型的風險。", href: courseUrl("6.4_high_dimensions.html"), minutes: 30, kind: "觀念", tags: ["高維度", "稀疏性"] },
      { id: "s-6-5", number: "6.5", title: "Lab：模型選擇與正則化", summary: "建立 regularization path，並用 RidgeCV、LassoCV 比較係數。", href: courseUrl("6.5_lab_regularization.html"), minutes: 60, kind: "實作", tags: ["Python", "正則化"] },
    ],
  },
  {
    id: "chapter-7",
    chapter: "CH 07",
    title: "超越線性：可解釋的非線性",
    week: "第 6 週",
    outcome: "能依資料形狀選用多項式、樣條、局部迴歸或 GAM，而不是盲目增加複雜度。",
    lessons: [
      { id: "s-7-1", number: "7.1", title: "多項式迴歸", summary: "用多項式展開捕捉曲線關係與建立信賴區間。", href: courseUrl("7.1_polynomial_regression.html"), minutes: 30, kind: "觀念", tags: ["多項式", "非線性"] },
      { id: "s-7-2", number: "7.2", title: "階梯函數", summary: "將連續變數分箱，理解區段式判斷的優缺點。", href: courseUrl("7.2_step_functions.html"), minutes: 25, kind: "觀念", tags: ["分箱", "階梯函數"] },
      { id: "s-7-3", number: "7.3", title: "基底函數", summary: "用同一框架理解多項式、階梯、樣條與傅立葉展開。", href: courseUrl("7.3_basis_functions.html"), minutes: 30, kind: "觀念", tags: ["基底函數", "展開"] },
      { id: "s-7-4", number: "7.4", title: "迴歸樣條", summary: "分段多項式、節點與連續性限制。", href: courseUrl("7.4_regression_splines.html"), minutes: 35, kind: "觀念", tags: ["樣條", "節點"] },
      { id: "s-7-5", number: "7.5", title: "平滑樣條", summary: "以 λ 懲罰控制曲線平滑度，不必手動挑每個節點。", href: courseUrl("7.5_smoothing_splines.html"), minutes: 30, kind: "觀念", tags: ["平滑", "Lambda"] },
      { id: "s-7-6", number: "7.6", title: "局部迴歸", summary: "用鄰近樣本與 span 建立局部加權模型。", href: courseUrl("7.6_local_regression.html"), minutes: 25, kind: "觀念", tags: ["LOESS", "局部模型"] },
      { id: "s-7-7", number: "7.7", title: "廣義加法模型", summary: "讓每個變數有自己的非線性函數，同時保留可解釋性。", href: courseUrl("7.7_generalized_additive_models.html"), minutes: 35, kind: "觀念", tags: ["GAM", "可解釋性"] },
      { id: "s-7-8", number: "7.8", title: "Lab：非線性建模", summary: "在 Wage 資料上比較多項式、樣條與 GAM。", href: courseUrl("7.8_lab_nonlinear_modeling.html"), minutes: 65, kind: "實作", tags: ["Python", "GAM"] },
    ],
  },
  {
    id: "chapter-8",
    chapter: "CH 08",
    title: "樹狀方法與集成學習",
    week: "第 7 週",
    outcome: "能解釋單棵樹的決策，再用 Bagging、Random Forest 與 Boosting 改善泛化能力。",
    lessons: [
      { id: "s-8-1", number: "8.1", title: "決策樹基礎", summary: "遞迴二元分割、不純度、剪枝與分類／回歸樹。", href: courseUrl("8.1_decision_trees.html"), minutes: 40, kind: "觀念", tags: ["決策樹", "剪枝"] },
      { id: "s-8-2", number: "8.2", title: "Bagging・隨機森林・Boosting", summary: "用抽樣、去相關與序列修正建立集成模型。", href: courseUrl("8.2_bagging_random_forests_boosting.html"), minutes: 50, kind: "觀念", tags: ["Random Forest", "Boosting"] },
      { id: "s-8-3", number: "8.3", title: "Lab：決策樹方法", summary: "比較決策樹、隨機森林與梯度提升的實際表現。", href: courseUrl("8.3_lab_tree_methods.html"), minutes: 60, kind: "實作", tags: ["Python", "集成學習"] },
    ],
  },
  {
    id: "chapter-9",
    chapter: "CH 09",
    title: "支援向量機與核方法",
    week: "第 7–8 週",
    outcome: "能從最大邊界理解 SVM，選擇 C 與 kernel，並處理多類別分類。",
    lessons: [
      { id: "s-9-1", number: "9.1", title: "最大邊界分類器", summary: "超平面、分離邊界、支援向量與不可分離情況。", href: courseUrl("9.1_maximal_margin_classifier.html"), minutes: 35, kind: "觀念", tags: ["最大邊界", "超平面"] },
      { id: "s-9-2", number: "9.2", title: "支援向量分類器", summary: "軟邊界、容錯與 C 參數的偏差變異取捨。", href: courseUrl("9.2_support_vector_classifiers.html"), minutes: 35, kind: "觀念", tags: ["SVC", "C 參數"] },
      { id: "s-9-3", number: "9.3", title: "支援向量機", summary: "RBF 與多項式 kernel、γ 參數及非線性邊界。", href: courseUrl("9.3_support_vector_machines.html"), minutes: 40, kind: "觀念", tags: ["SVM", "Kernel"] },
      { id: "s-9-4", number: "9.4", title: "多類別 SVM", summary: "One-vs-one 與 one-vs-all 的擴展策略。", href: courseUrl("9.4_svm_multiclass.html"), minutes: 25, kind: "觀念", tags: ["多類別", "SVM"] },
      { id: "s-9-5", number: "9.5", title: "SVM 與邏輯回歸", summary: "從損失函數比較 margin 與機率式分類。", href: courseUrl("9.5_relationship_to_logistic_regression.html"), minutes: 25, kind: "案例", tags: ["Logistic", "比較"] },
      { id: "s-9-6", number: "9.6", title: "Lab：SVM", summary: "調整 C、γ 與 kernel，並檢查分類邊界。", href: courseUrl("9.6_lab_svm.html"), minutes: 55, kind: "實作", tags: ["Python", "SVM"] },
    ],
  },
  {
    id: "chapter-10",
    chapter: "CH 10",
    title: "深度學習：從感知器到 CNN",
    week: "第 8 週",
    outcome: "能描述前向傳播、隱藏層與卷積，並把經典統計觀點帶入深度模型。",
    lessons: [
      { id: "s-10-1", number: "10.1", title: "單層神經網路", summary: "從感知器、活化函數到單層網路的表達能力。", href: courseUrl("10.1_single_layer_neural_networks.html"), minutes: 35, kind: "觀念", tags: ["神經網路", "活化函數"] },
      { id: "s-10-2", number: "10.2", title: "多層神經網路", summary: "隱藏層、MLP、Softmax 與反向傳播的核心直覺。", href: courseUrl("10.2_multilayer_neural_networks.html"), minutes: 45, kind: "觀念", tags: ["MLP", "Backprop"] },
      { id: "s-10-3", number: "10.3", title: "卷積神經網路", summary: "卷積、局部連接、權重共享與影像特徵階層。", href: courseUrl("10.3_convolutional_neural_networks.html"), minutes: 45, kind: "觀念", tags: ["CNN", "卷積"] },
      { id: "s-10-4", number: "10.4", title: "文件分類", summary: "把深度學習用於文字表示與文件分類任務。", href: courseUrl("10.4_document_classification.html"), minutes: 45, kind: "案例", tags: ["NLP", "文件分類"] },
    ],
  },
];

export const agentStages: AgentStage[] = [
  { id: "a-foundation", number: "01", title: "共同基礎", duration: "3–5 週", description: "把 Python、API、JSON 與 prompt 當成可測試的工作語言。", outcome: "完成可重複執行的 LLM 小程式。", skills: ["Python / API", "LLM 心智模型", "Prompt"] },
  { id: "a-tools", number: "02", title: "工具使用與 Agent loop", duration: "2–3 週", description: "從 function calling 與 ReAct 理解思考、行動、觀察與修正。", outcome: "完成一個有工具、可觀察、可除錯的 agent loop。", skills: ["Tool schema", "ReAct", "錯誤處理"] },
  { id: "a-orchestration", number: "03", title: "編排與協作", duration: "4–6 週", description: "在框架、MCP、Skills 與子代理中選擇適當的自主邊界。", outcome: "能為真實流程設計 state、handoff 與人工覆核點。", skills: ["State graph", "MCP", "Handoff"] },
  { id: "a-context", number: "04", title: "上下文工程", duration: "2 週", description: "用 RAG、記憶層與檢索策略管理有限的 context budget。", outcome: "完成可追溯、可淘汰、可更新的 context pipeline。", skills: ["RAG", "Memory", "Context budget"] },
  { id: "a-production", number: "05", title: "可靠生產", duration: "4–7 週", description: "把 eval、observability、sandbox 與人類覆核放進系統邊界。", outcome: "能把 demo 轉成可維運、可評估的 agent 系統。", skills: ["Evaluation", "Tracing", "Human review"] },
];

export const resources: Resource[] = [
  { id: "r-islp", type: "課程", title: "ISLP 課程原始碼與練習資料", description: "繁體中文章節筆記、Python 實作、資料集與開源版本紀錄。", href: "https://github.com/a9181873/islp-course", meta: "GitHub · 43 個課程節點", tags: ["統計", "Python", "教材"] },
  { id: "r-book", type: "課程", title: "An Introduction to Statistical Learning", description: "課程依據的官方教材網站、資料與延伸資源。", href: "https://www.statlearning.com/", meta: "官方教材", tags: ["ISLP", "教科書"] },
  { id: "r-map", type: "工具", title: "Awesome Agentic AI 繁中學習地圖", description: "從基礎、框架、記憶到可靠性的繁體中文策展路線。", href: "https://github.com/WenyuChiou/awesome-agentic-ai-zh", meta: "GitHub · 路線圖", tags: ["Agent", "學習地圖"] },
  { id: "r-react", type: "論文", title: "ReAct", description: "用 reasoning 與 action 的交錯迴圈理解 agent 如何取得資訊並修正計畫。", href: "https://arxiv.org/abs/2210.03629", meta: "arXiv · 2023", tags: ["Agent loop", "Tool use"] },
  { id: "r-toolformer", type: "論文", title: "Toolformer", description: "工具使用的關鍵不只在 API，而是呼叫時機、參數與結果吸收。", href: "https://arxiv.org/abs/2302.04761", meta: "arXiv · 2023", tags: ["工具", "LLM"] },
  { id: "r-memgpt", type: "論文", title: "MemGPT", description: "借用作業系統的階層式記憶概念處理有限上下文與長任務。", href: "https://arxiv.org/abs/2310.08560", meta: "arXiv · 2023", tags: ["記憶", "Context"] },
  { id: "r-agentbench", type: "論文", title: "AgentBench", description: "提醒我們要在互動環境評估任務完成能力，而非只看單輪回答。", href: "https://arxiv.org/abs/2308.03688", meta: "arXiv · 2023", tags: ["Evaluation", "可靠性"] },
  { id: "r-prompt", type: "研究筆記", title: "Prompt Engineering Guide", description: "提示設計、思維鏈、RAG 與 agent 的繁體中文導讀入口。", href: "https://learn.dky.tw/research/prompt-engineering-guide.html", meta: "DKY 研究筆記", tags: ["Prompt", "LLM"] },
  { id: "r-memory", type: "研究筆記", title: "AI Agent 長期記憶與知識圖譜", description: "外部記憶、混合搜尋、知識圖譜與帶引用的綜合回答。", href: "https://learn.dky.tw/research/gbrain-opinionated-agent-brain.html", meta: "DKY 研究筆記", tags: ["記憶", "知識圖譜"] },
  { id: "r-reliability", type: "研究筆記", title: "多 Agent 系統故障復原實戰", description: "從失敗模式、復原層級到複合可靠性陷阱的實務整理。", href: "https://learn.dky.tw/research/2026-06-14-multi-agent-reliability.html", meta: "DKY 研究筆記", tags: ["Multi-agent", "維運"] },
];

export const allLessons = chapters.flatMap((chapter) => chapter.lessons);
