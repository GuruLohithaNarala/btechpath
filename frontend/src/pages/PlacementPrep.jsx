import React, { useState, useEffect } from "react";
import { placementService } from "../services/appServices";
import { GraduationCap, Code, Database, Cpu, HelpCircle, CheckCircle2, ChevronRight, Award, Lightbulb, Video, Building2, ExternalLink } from "lucide-react";

const APTITUDE_SHORTCUTS = {
  "Percentages": [
    "x% of y = y% of x; swap the numbers when it makes the arithmetic easier.",
    "For successive changes a% and b%, net change = a + b + (ab / 100), using a negative sign for a decrease."
  ],
  "Profit & Loss": [
    "Profit% = (SP - CP) / CP x 100; loss% = (CP - SP) / CP x 100.",
    "For equal selling prices, compare cost prices using the given profit and loss percentages; do not average the percentages."
  ],
  "Time & Work": [
    "Convert each worker's time into a one-day rate (1 / days), then add rates for joint work.",
    "For two workers, use total time = (a x b) / (a + b) when their individual times are a and b."
  ],
  "Probability": [
    "Start with P(event) = favorable outcomes / total equally likely outcomes.",
    "For 'at least one', use 1 - P(none); multiply probabilities for independent events."
  ],
  "Speed & Distance": [
    "Use distance = speed x time and convert units before substituting values.",
    "For equal distances, average speed = 2ab / (a + b); for opposite directions, add speeds for relative speed."
  ],
  "Blood Relations": [
    "Draw a small family tree and mark each generation before resolving the relation.",
    "Translate the statement one link at a time; do not infer gender unless the question states it."
  ],
  "Coding-Decoding": [
    "Write letter positions A=1 through Z=26 and check consistent shifts, reversals, or alternating patterns.",
    "Test the rule on every example before applying it to the answer choices."
  ],
  "Syllogism": [
    "Use a quick Venn diagram and accept only conclusions that must be true in every valid diagram.",
    "Treat 'some' as at least one; never reverse 'all' or 'some' statements automatically."
  ],
  "Seating Arrangement": [
    "Fix one person as an anchor in circular arrangements to remove rotational duplicates.",
    "Place the strongest left/right or opposite clues first, then check every condition against the final layout."
  ],
  "Reading Comprehension": [
    "Read the question first, then scan for the relevant paragraph and supporting evidence.",
    "Choose the answer supported by the passage, not by outside knowledge or an extreme assumption."
  ],
  "Sentence Correction": [
    "Check subject-verb agreement and tense first, then pronouns, modifiers, and parallel structure.",
    "Read the whole sentence after each change to catch meaning and grammar errors together."
  ],
  "Synonyms & Antonyms": [
    "Use the sentence context and tone before considering a word's memorized definition.",
    "Break unfamiliar words into roots and prefixes, then eliminate choices with the wrong part of speech."
  ],
  "Para Jumbles": [
    "Find the opening sentence, then connect pronouns, repeated ideas, and transition words.",
    "Lock mandatory sentence pairs first and check that the final order reads as one coherent paragraph."
  ]
};

function getVideoSearchUrl(topic) {
  const query = `${topic} aptitude placement preparation shortcuts`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

export default function PlacementPrep() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dsa");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await placementService.getPlacementData();
      if (res) {
        setData(res);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400 space-y-4">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm">Loading placement preparation modules...</p>
      </div>
    );
  }

  const dsaModules = data ? data.dsa_modules || [] : [];
  const coreCS = data ? data.core_cs || [] : [];
  const aptitude = data ? data.aptitude || [] : [];
  const interviewQA = data ? data.interview_qa || [] : [];
  const governmentJobs = data ? data.government_jobs || [] : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <GraduationCap className="w-4 h-4" />
          <span>Campus Recruitment Training (CRT) Portal</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Placement <span className="gradient-text">Preparation Hub</span>
        </h1>
        <p className="text-slate-400 text-sm">
          Master Data Structures & Algorithms, Core CS Theory, Quantitative Aptitude, and Technical & HR Interview Question Banks.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-2xl flex items-center space-x-2 overflow-x-auto">
          {[
            { id: "dsa", label: "DSA Modules", icon: Code },
            { id: "core_cs", label: "Core CS Subjects", icon: Database },
            { id: "aptitude", label: "Aptitude & Reasoning", icon: Cpu },
            { id: "interview", label: "Interview Q&A Bank", icon: HelpCircle },
            { id: "government_jobs", label: "Government Jobs", icon: Building2 }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-glow"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: DSA MODULES */}
      {activeTab === "dsa" && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dsaModules.map((m, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-slate-700 transition-all card-hover">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-cyan-300 text-xs font-semibold border border-blue-500/20">
                    {m.difficulty}
                  </span>
                  <span className="text-xs text-slate-400">{m.completed}/{m.total_problems} Problems</span>
                </div>

                <h3 className="font-bold text-white text-lg">{m.title}</h3>

                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400" style={{ width: `${Math.round((m.completed / m.total_problems) * 100)}%` }} />
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className="text-xs text-slate-400 font-semibold">Key Patterns:</span>
                  <div className="flex flex-wrap gap-1">
                    {m.key_topics.map((t, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 bg-slate-950 text-slate-300 text-[11px] rounded-md border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-glow transition-all">
                    Practice Module
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CORE CS */}
      {activeTab === "core_cs" && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreCS.map((c, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-xl">{c.subject}</h3>
                  <span className="text-xs font-semibold text-cyan-400">{c.topics_count} Modules</span>
                </div>
                <div className="space-y-2">
                  {c.key_concepts.map((kc, kIdx) => (
                    <div key={kIdx} className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{kc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: APTITUDE */}
      {activeTab === "aptitude" && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aptitude.map((apt, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                <h3 className="font-bold text-white text-lg">{apt.category}</h3>
                <div className="space-y-2">
                  {apt.topics.map((tp, tIdx) => (
                    <div key={tIdx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-sm font-semibold text-white">{tp}</h4>
                        <a
                          href={getVideoSearchUrl(tp)}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Watch ${tp} video lessons on YouTube`}
                          className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-red-300 hover:text-red-200"
                        >
                          <Video className="w-4 h-4" />
                          Videos
                        </a>
                      </div>
                      <div className="space-y-2 border-t border-slate-800 pt-3">
                        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-emerald-300">
                          <Lightbulb className="w-3.5 h-3.5" /> Quick shortcuts
                        </p>
                        {(APTITUDE_SHORTCUTS[tp] || ["Identify the question type, write down the relevant rule, and estimate the answer before calculating."]).map((shortcut, shortcutIdx) => (
                          <p key={shortcutIdx} className="text-xs leading-relaxed text-slate-300">{shortcut}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: INTERVIEW QA */}
      {activeTab === "interview" && (
        <div className="space-y-6 animate-in fade-in">
          <div className="space-y-4">
            {interviewQA.map((qa, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-cyan-300 text-xs font-semibold border border-blue-500/20">
                    Subject: {qa.subject}
                  </span>
                  <span className="text-xs text-slate-500">Q{idx + 1}</span>
                </div>
                <h4 className="font-bold text-white text-base">Q: {qa.q}</h4>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-emerald-400">Sample Answer:</strong> <br />
                  {qa.a}
                </div>
                {qa.code && (
                  <details className="bg-slate-950 rounded-2xl border border-slate-800">
                    <summary className="cursor-pointer px-4 py-3 text-xs font-semibold text-cyan-300 hover:text-cyan-200">
                      Show Python reference solution
                    </summary>
                    <pre className="overflow-x-auto border-t border-slate-800 p-4 text-xs leading-relaxed text-slate-200">
                      <code>{qa.code}</code>
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: GOVERNMENT JOBS */}
      {activeTab === "government_jobs" && (
        <div className="space-y-6 animate-in fade-in">
          <div className="border border-amber-500/20 bg-amber-950/20 p-4 rounded-2xl text-sm text-amber-100">
            Eligibility, vacancies, exam stages, and dates change by recruitment cycle. Always confirm details in the latest official notification before applying.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {governmentJobs.map((job) => (
              <article key={job.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="space-y-2">
                  <span className="inline-flex px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-semibold">
                    {job.sector}
                  </span>
                  <h3 className="text-lg font-bold text-white">{job.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{job.roles}</p>
                </div>
                <div className="space-y-3 border-t border-slate-800 pt-4 text-xs leading-relaxed">
                  <div>
                    <h4 className="font-bold text-cyan-300 mb-1">Eligibility overview</h4>
                    <p className="text-slate-300">{job.eligibility}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-cyan-300 mb-1">Selection route</h4>
                    <p className="text-slate-300">{job.selection}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-cyan-300 mb-1">Preparation focus</h4>
                    <p className="text-slate-300">{job.preparation}</p>
                  </div>
                </div>
                {job.official_url ? (
                  <a
                    href={job.official_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 hover:text-cyan-200"
                  >
                    {job.official_label}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <p className="text-xs font-semibold text-cyan-300">{job.official_label}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
