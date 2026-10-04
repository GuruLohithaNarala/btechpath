import React, { useState } from "react";
import { Award, Briefcase, Code, ExternalLink, MessageCircle } from "lucide-react";

const JOB_PLATFORMS = [
  { name: "LinkedIn Jobs", type: "Professional network", url: "https://www.linkedin.com/jobs/", description: "Search roles, follow employers, and connect your profile with professional opportunities.", howToUse: ["Complete your profile and add a current resume.", "Filter by role, location, and experience; save searches and set job alerts.", "Tailor each application and track follow-ups."] },
  { name: "Glassdoor", type: "Jobs and company insights", url: "https://www.glassdoor.com/", description: "Explore job listings alongside company reviews, salary information, and interview experiences.", howToUse: ["Search roles and compare salary ranges and company reviews.", "Use interview experiences to prepare, while treating reviews as individual opinions.", "Verify the opening on the employer's own careers site before sharing personal information."] },
  { name: "Indeed", type: "Job search", url: "https://in.indeed.com/", description: "Search and filter job listings by role, location, experience, and employment type.", howToUse: ["Search with a role title and location, then apply filters for experience and job type.", "Save relevant listings and set alerts for new matches.", "Check the employer and application link before submitting details."] },
  { name: "Naukri.com", type: "India job search", url: "https://www.naukri.com/", description: "Find jobs across Indian industries, create a profile, and track applications.", howToUse: ["Create a complete profile with skills, education, and an updated resume.", "Set preferred roles, locations, and alerts; refresh your profile when your skills change.", "Apply to relevant openings and keep a record of recruiter communication."] },
  { name: "Internshala", type: "Internships and entry-level jobs", url: "https://internshala.com/jobs/", description: "Browse internships, fresher roles, and early-career opportunities in India.", howToUse: ["Set your education, skills, preferred location, and availability.", "Filter internships or fresher jobs and read role requirements carefully.", "Customize your application and check deadlines and stipend details."] },
  { name: "Wellfound", type: "Startup jobs", url: "https://wellfound.com/jobs", description: "Discover startup roles and review company, team, and compensation details.", howToUse: ["Build a candidate profile that highlights projects and the kind of work you want.", "Filter startup roles by location, stage, and compensation preferences.", "Review company details and confirm role terms directly with the employer."] }
];

const CODING_PLATFORMS = [
  { name: "HackerRank", type: "Skills practice and assessments", url: "https://www.hackerrank.com/", description: "Practice coding challenges by topic and language, prepare for assessments, and earn skill certifications.", howToUse: ["Choose a language and a topic track such as problem solving, SQL, or algorithms.", "Solve challenges in the online editor and run the provided test cases.", "Review failed cases, then try timed practice or skills certification challenges."] },
  { name: "LeetCode", type: "Interview problem practice", url: "https://leetcode.com/", description: "Solve data structures and algorithms problems and prepare for technical interviews.", howToUse: ["Start with easy problems in one topic, then progress to medium difficulty.", "Write down the approach and complexity before coding; test edge cases.", "Review discussions or editorials after attempting the problem yourself."] },
  { name: "GeeksforGeeks", type: "Learning and practice", url: "https://www.geeksforgeeks.org/", description: "Study programming concepts and practice problems across algorithms, languages, and computer science subjects.", howToUse: ["Select a subject or data-structure topic and review its tutorial.", "Attempt practice problems without looking at the solution first.", "Use the solution to compare approaches and note time and space complexity."] },
  { name: "CodeChef", type: "Competitive programming", url: "https://www.codechef.com/", description: "Practice programming problems, take part in contests, and improve problem-solving skills.", howToUse: ["Choose a beginner learning path or filter problems by difficulty.", "Practice implementation and debugging with the online judge.", "Join beginner-friendly contests and upsolve problems afterward."] },
  { name: "Codeforces", type: "Competitive programming", url: "https://codeforces.com/", description: "Join timed programming contests and practice problems across difficulty levels.", howToUse: ["Start with lower-rated problems and learn the contest format.", "After each contest, solve missed problems without a timer.", "Read editorials only after making a serious attempt, then reimplement from memory."] },
  { name: "HackerEarth", type: "Challenges and assessments", url: "https://www.hackerearth.com/practice/", description: "Practice coding challenges and explore contests and technical assessment preparation.", howToUse: ["Pick a topic such as data structures, algorithms, or basic programming.", "Submit solutions to the judge and use hidden-test failures to check edge cases.", "Try practice contests to get comfortable with timed assessments."] },
  { name: "InterviewBit", type: "Interview preparation", url: "https://www.interviewbit.com/", description: "Follow structured coding practice and interview-preparation tracks.", howToUse: ["Follow a topic-based track to build concepts in sequence.", "Attempt each problem independently before opening hints.", "Revisit incorrect problems and summarize the pattern used to solve them."] }
];

const CERTIFICATION_PLATFORMS = [
  { name: "freeCodeCamp", type: "Free course certifications", credential: "Free certifications after completing the required curriculum projects and challenges.", url: "https://www.freecodecamp.org/learn/", description: "Project-based certifications in areas such as web development, JavaScript, Python, and databases.", howToUse: ["Create a free account and select a certification curriculum.", "Complete the lessons and required projects, then pass the certification tests.", "Add the earned certification to your portfolio or resume with its verification link."] },
  { name: "Microsoft Learn", type: "Free learning; exam credentials vary", credential: "Learning modules and achievements are free. Microsoft Certification exams are separate and may require a paid exam.", url: "https://learn.microsoft.com/training/", description: "Self-paced modules and learning paths for Azure, AI, data, security, and developer tools.", howToUse: ["Choose a learning path that matches your role or skill goal.", "Complete modules and knowledge checks while signed in to track progress.", "Use the exam study guide if pursuing a formal Microsoft Certification; check exam fees and offers separately."] },
  { name: "IBM SkillsBuild", type: "Free courses and digital credentials", credential: "Free learning with digital credentials available for eligible courses or learning paths; check each course's requirements.", url: "https://skillsbuild.org/", description: "Career-focused learning in AI, cybersecurity, data, and other technology areas.", howToUse: ["Create an account and choose a learner path or course catalog topic.", "Complete the activities and assessments for the selected learning path.", "Check the course page for credential eligibility and claim instructions."] },
  { name: "Cisco Networking Academy", type: "Free courses; credential varies", credential: "Many courses are free; course badges or completion credentials vary. Cisco certification exams are separate and may be paid.", url: "https://www.netacad.com/catalogs/learn", description: "Networking, cybersecurity, programming, and IT courses, including self-paced options.", howToUse: ["Browse the course catalog and choose an available self-paced course.", "Enroll, complete its lessons and assessments, and check its stated completion credential.", "Use certification-aligned courses as study support; verify professional exam costs separately."] },
  { name: "HubSpot Academy", type: "Free course certifications", credential: "Free courses and certifications; complete the required lessons and certification assessment.", url: "https://academy.hubspot.com/courses", description: "Certifications and courses in digital marketing, sales, customer service, and CRM tools.", howToUse: ["Create a free Academy account and choose a course marked as a certification.", "Complete the lessons and any practical exercises.", "Pass the certification assessment and follow the course page's steps to access the credential."] },
  { name: "Google Skillshop", type: "Free product training and certifications", credential: "Free product training; available certifications require passing the relevant assessment and may have renewal requirements.", url: "https://skillshop.withgoogle.com/", description: "Google product training and certifications for tools such as Google Ads and Google Analytics.", howToUse: ["Sign in and select a product learning path.", "Complete the training modules and practice materials.", "Take the certification assessment and check validity and renewal details on the credential page."] }
];

const WHATSAPP_CHANNELS = [

  {
    name: "Tableau For Data Visualization",
    type: "Learning · Tableau and data analytics",
    url: "https://whatsapp.com/channel/0029VasYW1V5kg6z4EHOHG1t",
    description: "The channel page describes content about Tableau and data analytics. Posting frequency may change.",
    howToUse: ["Follow the channel to see its learning updates in WhatsApp.", "Practice each Tableau or analytics topic in the tool alongside the post.", "Save useful posts and verify course, tool, or certification claims with the original provider."]
  },
  {
    name: "Power BI for Data Analytics",
    type: "Learning · Power BI and data visualization",
    url: "https://whatsapp.com/channel/0029Vai1xKf1dAvuk6s1v22c",
    description: "The channel describes free resources for Power BI, Tableau, and data visualization.",
    howToUse: ["Follow the channel and choose one visualization topic to practice.", "Recreate examples with your own sample dataset.", "Check any course or certification claims with the original provider."]
  },
  {
    name: "Learn MS Excel",
    type: "Learning · Excel and workplace skills",
    url: "https://whatsapp.com/channel/0029Vb2MyArAu3aRk5BGMk1l",
    description: "The channel focuses on learning Excel and building job-ready spreadsheet skills.",
    howToUse: ["Follow the channel and turn on notifications for new updates.", "Practice formulas, tables, or charts in a spreadsheet as you learn them.", "Build a small workbook to demonstrate the skills you practice."]
  },
  {
    name: "Learn English Grammar Spoken",
    type: "Learning · English and interview preparation",
    url: "https://whatsapp.com/channel/0029Va8faXyBPzjRt3KYjG3R",
    description: "The channel lists English grammar, vocabulary, spoken English, job-interview preparation, and other learning topics; it describes its updates as daily.",
    howToUse: ["Follow the channel and practice one vocabulary or speaking exercise at a time.", "Use the interview and communication posts for practice, not as a substitute for role-specific preparation.", "Confirm external course offers before sharing information or paying."]
  },
  {
    name: "Artificial Intelligence & Data Science Projects",
    type: "Learning · AI, ML, data science, and coding",
    url: "https://whatsapp.com/channel/0029Va4QUHa6rsQjhITHK82y",
    description: "The channel describes resources and projects for machine learning, data science, Python, and related technology topics.",
    howToUse: ["Pick one topic and follow its project or learning resources.", "Rebuild project examples yourself and document datasets, sources, and limitations.", "Verify linked downloads and third-party claims before using them."]
  },
  {
    name: "Python Programming",
    type: "Learning · Python and data science",
    url: "https://whatsapp.com/channel/0029VaiM08SDuMRaGKd9Wv0L",
    description: "The channel lists Python lessons, coding projects, course resources, and data science topics.",
    howToUse: ["Start with Python fundamentals and work through topics in order.", "Run each example locally, then modify it to test your understanding.", "Use projects as practice and inspect external links before downloading files."]
  },
  {
    name: "Coding Interview - Python, Java, Programming, AI Tools & Tech News",
    type: "Learning · Coding interviews and programming",
    url: "https://whatsapp.com/channel/0029VammZijATRSlLxywEC3X",
    description: "The channel describes coding interview problems and resources across programming, Python, data, and AI topics.",
    howToUse: ["Attempt a problem yourself before reading its shared solution.", "Write down the algorithm and time and space complexity.", "Re-solve missed problems later without looking at the answer."]
  },
  {
    name: "Python Projects",
    type: "Learning · Python projects and coding practice",
    url: "https://whatsapp.com/channel/0029Vau5fZECsU9HJFLacm2a",
    description: "The channel lists Python tutorials, projects, coding challenges, interview practice, and Python-related internship and job alerts.",
    howToUse: ["Choose a project that matches your current Python level and build it yourself.", "Use the challenges to practice regularly, then publish polished projects to a portfolio.", "Verify job and internship notices directly with the employer."]
  },
  {
    name: "Artificial Intelligence",
    type: "Learning · AI, machine learning, and data science",
    url: "https://whatsapp.com/channel/0029VaoePz73bbV94yTh6V2E",
    description: "The channel describes AI and machine-learning resources, projects, courses, and technology updates.",
    howToUse: ["Use a post to choose a concept, then study the linked course or documentation.", "Build a small project to test what you learned.", "Check source links and course terms before downloading or enrolling."]
  }
];

export default function GovernmentPlatforms() {
  const [activePlatformType, setActivePlatformType] = useState("jobs");
  const platformCategories = {
    jobs: { platforms: JOB_PLATFORMS, icon: Briefcase },
    coding: { platforms: CODING_PLATFORMS, icon: Code },
    certifications: { platforms: CERTIFICATION_PLATFORMS, icon: Award },
    whatsapp: { platforms: WHATSAPP_CHANNELS, icon: MessageCircle }
  };
  const { platforms, icon: PlatformIcon } = platformCategories[activePlatformType];

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <header className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
          <Briefcase className="h-4 w-4" />
          Career resources
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Professional <span className="gradient-text">Platforms</span>
        </h1>
          <p className="text-sm text-slate-400">
            Explore job-search platforms, build coding skills, find courses, and follow useful learning communities.
          </p>
      </header>

      <section className="space-y-5" aria-label="Job portals and coding practice platforms">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Platform categories</h2>
            <p className="mt-1 text-sm text-slate-400">Choose a category to explore platforms and their resources.</p>
          </div>
          <div className="inline-flex w-fit rounded-xl border border-slate-800 bg-slate-900 p-1" role="tablist" aria-label="Platform category">
            {[
              { id: "jobs", label: "Job portals" },
              { id: "coding", label: "Coding practice" },
              { id: "certifications", label: "Certification courses" },
              { id: "whatsapp", label: "WhatsApp Channels" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activePlatformType === tab.id}
                onClick={() => setActivePlatformType(tab.id)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                  activePlatformType === tab.id ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {platforms.map((platform) => (
            <article key={platform.name} className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-bold text-white">{platform.name}</h3>
                <PlatformIcon className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
              </div>
              <span className="w-fit rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-[11px] font-semibold text-slate-300">
                {platform.type}
              </span>
              <p className="flex-1 text-sm leading-relaxed text-slate-400">{platform.description}</p>
              {platform.credential && (
                <p className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs leading-relaxed text-emerald-200">
                  {platform.credential}
                </p>
              )}
              <div className="space-y-2 border-t border-slate-800 pt-3">
                <h4 className="text-xs font-bold text-cyan-300">How to use</h4>
                <ol className="list-decimal space-y-1 pl-4 text-xs leading-relaxed text-slate-400">
                  {platform.howToUse.map((step) => <li key={step}>{step}</li>)}
                </ol>
              </div>
              <a
                href={platform.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 hover:text-cyan-200"
              >
                Visit platform
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
        <p className="text-xs leading-relaxed text-slate-500">
          Platform details and posting schedules can change. WhatsApp channels are community sources, not endorsements; verify job notices with the recruiting organization and never pay to apply through a channel.
        </p>
      </section>
    </main>
  );
}
