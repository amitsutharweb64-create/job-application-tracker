import { ChevronDown, LoaderCircle, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { fetchInterviewQuestions, reviewInterviewAnswer } from "../api/prep";

const inputClass =
  "h-11 w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-violet-500 dark:focus:ring-violet-500/20";

const quickTopics = [
  "MERN stack interview questions",
  "React interview questions",
  "Node.js interview questions",
  "MongoDB interview questions",
  "DSA interview questions",
  "HR round questions",
];

const difficultyClass = {
  Easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  Medium: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Hard: "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-300",
};

function QuestionCard({ item, index, open, onToggle }) {
  const [answer, setAnswer] = useState("");
  const [review, setReview] = useState(null);
  const [reviewing, setReviewing] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const [error, setError] = useState("");

  async function handleReview(event) {
    event.preventDefault();
    setError("");
    setReviewing(true);
    try {
      const data = await reviewInterviewAnswer(item.question, answer);
      setReview(data);
    } catch (reviewError) {
      setError(reviewError.message);
    } finally {
      setReviewing(false);
    }
  }

  return (
    <article className="rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start gap-3 px-4 py-3 text-left"
      >
        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700 dark:bg-violet-500/20 dark:text-violet-300">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap gap-1.5">
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {item.category}
            </span>
            <span className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${difficultyClass[item.difficulty]}`}>
              {item.difficulty}
            </span>
          </div>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{item.question}</p>
        </div>
        <ChevronDown
          size={16}
          className={`mt-1 shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="space-y-3 border-t border-slate-100 px-4 py-3 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium text-slate-600 dark:text-slate-300">Hint: </span>
            {item.hint}
          </p>

          <form onSubmit={handleReview} className="space-y-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">
                Your answer
              </span>
              <textarea
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                rows={4}
                placeholder="Type your answer here, then review it..."
                className="w-full resize-y rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-violet-500 dark:focus:ring-violet-500/20"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={reviewing || answer.trim().length < 8}
                className="inline-flex h-9 items-center gap-2 rounded-md bg-violet-600 px-3 text-xs font-medium text-white hover:bg-violet-700 disabled:opacity-60"
              >
                {reviewing ? <LoaderCircle size={14} className="animate-spin" /> : <Sparkles size={14} />}
                Review my answer
              </button>
              <button
                type="button"
                onClick={() => setShowSample((value) => !value)}
                className="h-9 rounded-md border border-slate-200 px-3 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {showSample ? "Hide sample" : "Show sample answer"}
              </button>
            </div>
          </form>

          {error && <p className="text-xs text-red-500">{error}</p>}

          {review && (
            <div className="rounded-md border border-violet-100 bg-violet-50/70 p-3 dark:border-violet-500/20 dark:bg-violet-500/10">
              <p className="text-xs font-semibold text-violet-700 dark:text-violet-300">Score: {review.score}/10</p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{review.feedback}</p>
              {review.betterAnswer ? (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="font-medium">Stronger answer: </span>
                  {review.betterAnswer}
                </p>
              ) : null}
            </div>
          )}

          {showSample && (
            <p className="rounded-md bg-slate-50 p-3 text-sm text-slate-600 dark:bg-slate-800/80 dark:text-slate-300">
              {item.sampleAnswer}
            </p>
          )}
        </div>
      )}
    </article>
  );
}

function InterviewPrep() {
  const [query, setQuery] = useState("MERN stack interview questions");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [openId, setOpenId] = useState("");

  async function loadQuestions(topic) {
    const nextQuery = topic.trim();
    if (nextQuery.length < 2) {
      setError("Type a topic first.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await fetchInterviewQuestions(nextQuery);
      setResult(data);
      setOpenId(data.questions?.[0]?.id || "");
    } catch (loadError) {
      setError(loadError.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    loadQuestions(query);
  }

  return (
    <section className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
        <h3 className="mb-3 text-base font-semibold text-violet-600 dark:text-violet-400">
          Search interview questions
        </h3>
        <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
          Kisi bhi role, skill, ya company round ka topic type karo. Gemini custom practice questions banayega;
          service unavailable ho to built-in topics automatically kaam karenge.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
          <label className="relative block flex-1">
            <span className="sr-only">Interview topic</span>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              className={inputClass}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Type: MERN stack interview questions"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-violet-600 px-5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60"
          >
            {loading ? <LoaderCircle size={16} className="animate-spin" /> : <Sparkles size={16} />}
            Get questions
          </button>
        </form>

        <div className="mt-3 flex flex-wrap gap-2">
          {quickTopics.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => {
                setQuery(topic);
                loadQuestions(topic);
              }}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-violet-500/40 dark:hover:bg-violet-500/10 dark:hover:text-violet-300"
            >
              {topic.replace(" interview questions", "")}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </p>
      )}

      {result && (
        <div className="space-y-3">
          {result.warning && (
            <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
              {result.warning}
            </p>
          )}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-800 dark:text-slate-100">{result.topic}</span>
              {" · "}
              {result.questions.length} questions
            </p>
            <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {result.source === "ai" ? `AI generated · ${result.model || "Gemini"}` : "Built-in bank"}
            </span>
          </div>

          <div className="space-y-2">
            {result.questions.map((item, index) => (
              <QuestionCard
                key={item.id}
                item={item}
                index={index}
                open={openId === item.id}
                onToggle={() => setOpenId((current) => (current === item.id ? "" : item.id))}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default InterviewPrep;
