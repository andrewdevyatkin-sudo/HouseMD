"use client";

import { useState } from "react";
import { useToast } from "./Toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SubmittedQuestion {
  id: string;
  body: string;
  submittedAt: string;
}

// ─── Ask Question Box ─────────────────────────────────────────────────────────

export function AskQuestionBox() {
  const { showToast } = useToast();
  const [question, setQuestion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [myQuestions, setMyQuestions] = useLocalStorage<SubmittedQuestion[]>("housemd-my-questions", []);

  function handleSubmit() {
    if (!question.trim() || question.trim().length < 20) {
      showToast("Please describe your problem in more detail (at least 20 characters).", "warning");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const newQ: SubmittedQuestion = {
        id: `q-${Date.now()}`,
        body: question.trim(),
        submittedAt: new Date().toISOString(),
      };
      setMyQuestions((prev) => [newQ, ...prev]);
      setSubmitting(false);
      setQuestion("");
      showToast("Your question was posted! Check 'My Questions' below.", "success");
    }, 1200);
  }

  return (
    <div>
      <div
        id="ask"
        className="rounded-2xl p-5"
        style={{
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(17, 24, 39, 0.8) 100%)",
          border: "1px solid rgba(139, 92, 246, 0.2)",
        }}
      >
        <h3 className="font-bold mb-2" style={{ color: "#f1f5f9" }}>Have a question?</h3>
        <p className="text-xs mb-4" style={{ color: "#94a3b8", lineHeight: "1.6" }}>
          Describe your problem and get answers from verified trade professionals.
        </p>
        <textarea
          className="w-full text-sm rounded-xl p-3 mb-3 resize-none"
          rows={4}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What's happening with your home? Be specific — include symptoms, when it started, what you've tried..."
          id="ask-textarea"
          style={{
            fontFamily: "inherit",
            background: "rgba(11, 15, 26, 0.6)",
            border: "1px solid rgba(30, 45, 69, 0.8)",
            color: "#f1f5f9",
            outline: "none",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
        <button
          id="submit-question-btn"
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-2.5 rounded-xl text-sm font-bold btn-primary cursor-pointer"
          style={{ border: "none", opacity: submitting ? 0.7 : 1 }}
        >
          {submitting ? "Posting…" : "Post Question"}
        </button>
      </div>

      {/* Saved questions */}
      {myQuestions.length > 0 && (
        <div className="mt-4 rounded-2xl p-4" style={{ background: "rgba(17,24,39,0.8)", border: "1px solid rgba(30,45,69,0.5)" }}>
          <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#94a3b8" }}>
            My Questions ({myQuestions.length})
          </h4>
          <div className="space-y-2">
            {myQuestions.map((q) => (
              <div key={q.id} className="text-xs p-3 rounded-xl" style={{ background: "rgba(11,15,26,0.5)", border: "1px solid rgba(30,45,69,0.4)" }}>
                <p className="leading-relaxed mb-1" style={{ color: "#94a3b8" }}>{q.body}</p>
                <span style={{ color: "#4b6080" }}>
                  Submitted {new Date(q.submittedAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Vote Button ──────────────────────────────────────────────────────────────

export function VoteButton({ threadId, initialVotes }: { threadId: string; initialVotes: number }) {
  const { showToast } = useToast();
  // Persist all votes as a map {threadId: true/false}
  const [votes, setVotes] = useLocalStorage<Record<string, boolean>>("housemd-votes", {});
  const [liveCount, setLiveCount] = useLocalStorage<Record<string, number>>(`housemd-vote-counts`, {});

  const voted = votes[threadId] ?? false;
  const count = (liveCount[threadId] ?? initialVotes) + (voted ? 0 : 0); // count stored separately
  const displayCount = liveCount[threadId] !== undefined ? liveCount[threadId] : initialVotes;

  function handleVote() {
    const nowVoted = !voted;
    setVotes((prev) => ({ ...prev, [threadId]: nowVoted }));
    setLiveCount((prev) => ({
      ...prev,
      [threadId]: (prev[threadId] !== undefined ? prev[threadId] : initialVotes) + (nowVoted ? 1 : -1),
    }));
    showToast(nowVoted ? "Upvoted! Thanks for helping rank useful questions." : "Vote removed.", nowVoted ? "success" : "info");
  }

  return (
    <button
      id={`vote-btn-${threadId}`}
      onClick={handleVote}
      className="flex flex-col items-center shrink-0 pt-1 cursor-pointer"
      style={{ background: "none", border: "none", padding: "4px 0" }}
      title={voted ? "Remove vote" : "Upvote this question"}
    >
      <svg
        width="16" height="16" fill="none" viewBox="0 0 24 24"
        stroke={voted ? "#fbbf24" : "#4b6080"} strokeWidth="2.5"
        style={{ marginBottom: 2, transition: "stroke 0.2s" }}
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
      <div
        className="text-xl font-black"
        style={{ color: voted ? "#fbbf24" : (displayCount > 100 ? "#fbbf24" : "#94a3b8"), lineHeight: 1, transition: "color 0.2s" }}
      >
        {displayCount}
      </div>
      <div className="text-xs" style={{ color: "#4b6080" }}>votes</div>
    </button>
  );
}
