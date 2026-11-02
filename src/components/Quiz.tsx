"use client";

import { useState } from "react";
import { quiz } from "@/lib/knowledge";

export default function Quiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(quiz.map(() => null));
  const score = answers.filter((a, i) => a === quiz[i].answer).length;
  const done = answers.every((a) => a !== null);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        {quiz.map((item, qi) => {
          const picked = answers[qi];
          return (
            <div key={item.q} className="glass rounded-3xl p-5">
              <div className="font-bold">{qi + 1}. {item.q}</div>
              <div className="mt-3 grid gap-2">
                {item.options.map((o, oi) => {
                  const state = picked === null ? "" : oi === item.answer ? "bg-emerald-400 text-slate-950" : oi === picked ? "bg-pink-500 text-white" : "opacity-50";
                  return (
                    <button
                      key={o}
                      disabled={picked !== null}
                      onClick={() => setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)))}
                      className={`rounded-xl bg-white/10 px-3 py-2 text-left text-sm font-medium transition hover:bg-white/20 ${state}`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
              {picked !== null && <p className="mt-3 text-sm text-amber-200">{picked === item.answer ? "✅ " : "💡 "}{item.why}</p>}
            </div>
          );
        })}
      </div>
      <div className="mt-6 text-center">
        <div className="font-display text-3xl font-bold">
          Score: <span className="text-sunrise">{score} / {quiz.length}</span> {done && (score === quiz.length ? "🏆" : score >= 4 ? "🌟" : "🌱")}
        </div>
        {done && (
          <button onClick={() => setAnswers(quiz.map(() => null))} className="mt-3 rounded-full bg-white/10 px-5 py-2 font-semibold hover:bg-white/20">
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
