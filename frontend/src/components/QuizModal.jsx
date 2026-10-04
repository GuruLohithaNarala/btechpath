import React, { useState, useEffect } from "react";
import { quizService } from "../services/appServices";
import { useAuth } from "../context/AuthContext";
import { X, CheckCircle, AlertCircle, Award, RotateCcw, HelpCircle, ArrowRight } from "lucide-react";

export default function QuizModal({ quizId, onClose }) {
  const { user, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchQuiz() {
      setLoading(true);
      const res = await quizService.getQuiz(quizId);
      if (res && res.quiz) {
        setQuiz(res.quiz);
      }
      setLoading(false);
    }
    fetchQuiz();
  }, [quizId]);

  const handleSelectOption = (questionId, optionIndex) => {
    if (results) return; // Prevent change after submission
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = async () => {
    setSubmitting(true);
    const userId = user ? user.id : "demo_user";
    const res = await quizService.submitQuiz(quizId, userAnswers, userId);
    setResults(res);
    setSubmitting(false);

    if (res.xp_earned && user) {
      updateUserProfile({ xp: (user.xp || 0) + res.xp_earned });
    }
  };

  const handleRetry = () => {
    setUserAnswers({});
    setResults(null);
    setCurrentIndex(0);
  };

  if (!quizId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-cyan-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base truncate">{quiz ? quiz.title : "Assessment Quiz"}</h3>
              <p className="text-xs text-slate-400">Topic: {quiz ? quiz.topic : "Computer Science"}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {loading ? (
            <div className="py-12 text-center text-slate-400 space-y-3">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm">Loading quiz questions...</p>
            </div>
          ) : results ? (
            /* Results View */
            <div className="space-y-6">
              <div className="text-center py-6 bg-slate-950/40 rounded-2xl border border-slate-800 space-y-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white mx-auto shadow-glow">
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-extrabold text-white">Quiz Completed!</h4>
                <p className="text-sm text-slate-400">
                  Your Score: <span className="text-cyan-400 font-bold text-lg">{results.score} / {results.total}</span> ({results.percentage}%)
                </p>
                <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                  <span>+{results.xp_earned} XP Awarded</span>
                </div>
              </div>

              {/* Question Breakdown */}
              <div className="space-y-4">
                <h5 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Detailed Answers</h5>
                {results.results.map((r, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border ${
                      r.is_correct
                        ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-200"
                        : "bg-rose-950/20 border-rose-500/30 text-rose-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-semibold text-sm">Q{idx + 1}. {r.question}</span>
                      {r.is_correct ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-300 mt-2">
                      Explanation: {r.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : quiz && quiz.questions ? (
            /* Question View */
            <div className="space-y-6">
              {/* Question Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Question {currentIndex + 1} of {quiz.total_questions}</span>
                  <span>{Math.round(((currentIndex + 1) / quiz.total_questions) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / quiz.total_questions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Current Question */}
              {(() => {
                const q = quiz.questions[currentIndex];
                return (
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white">{q.question}</h4>
                    <div className="space-y-2.5">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = userAnswers[q.id] === oIdx;
                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectOption(q.id, oIdx)}
                            className={`w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all ${
                              isSelected
                                ? "bg-blue-600/20 border-cyan-400 text-white shadow-glow"
                                : "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700"
                            }`}
                          >
                            <span className="inline-block w-6 text-slate-500 font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <p className="text-center text-slate-400">No quiz questions available for this module.</p>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
          {results ? (
            <div className="flex items-center justify-between w-full">
              <button
                onClick={handleRetry}
                className="flex items-center px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retry Quiz
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all"
              >
                Done
              </button>
            </div>
          ) : quiz && quiz.questions ? (
            <div className="flex items-center justify-between w-full">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 font-semibold text-sm transition-all"
              >
                Previous
              </button>

              {currentIndex === quiz.total_questions - 1 ? (
                <button
                  disabled={submitting || Object.keys(userAnswers).length < quiz.total_questions}
                  onClick={handleSubmitQuiz}
                  className="flex items-center px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 disabled:opacity-40 text-white font-bold text-sm shadow-glow transition-all"
                >
                  {submitting ? "Submitting..." : "Submit Quiz"}
                </button>
              ) : (
                <button
                  onClick={() => setCurrentIndex((prev) => Math.min(quiz.total_questions - 1, prev + 1))}
                  className="flex items-center px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all"
                >
                  Next <ArrowRight className="w-4 h-4 ml-1.5" />
                </button>
              )}
            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}
