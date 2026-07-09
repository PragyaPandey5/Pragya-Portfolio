import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Github, Linkedin, Mail, ExternalLink, ChevronRight, Cpu,
  Database, Cloud, Layers, Award, GraduationCap, MessageCircle, Send,
  Menu, X, ArrowUpRight, CheckCircle2, Circle, Sparkles, Braces, Server,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";

/* ------------------------------------------------------------------ */
/*  DATA — edit this block to make the site yours                      */
/* ------------------------------------------------------------------ */

const PROFILE = {
  name: "Pragya Pandey",
  handle: "@PragyaPandey5",
  role: "Full-Stack Developer & ML Enthusiast",
  tagline: "AWS Certified Cloud Practitioner building sparse neural nets and shipping full-stack apps — open-source contributor.",
  location: "Dehradun, Uttarakhand, India",
  email: "pp3895552@gmail.com",
  github: "https://github.com/PragyaPandey5",
  linkedin: "https://www.linkedin.com/in/pragya-pandey-6268772b0",
  leetcode: "https://leetcode.com/u/Pragya_005/",
  resumeUrl: "#", // TODO: link once the resume PDF is hosted in the GitHub repo
  status: "Open to SDE Internships",
};

const EDUCATION = {
  school: "Graphic Era Hill University",
  location: "Bhimtal, India",
  degree: "B.Tech, Computer Science & Engineering",
  period: "Expected May 2027 · CGPA 7.88/10",
};

const CERTS = [
  "AWS Certified Cloud Practitioner",
  "Full-Stack Web Development — A+ Grade",
];

const EXPERIENCE = [
  {
    role: "Team Lead — Static Code Analyser",
    org: "Graphic Era Hill University Fest",
    period: "Jan 2026 – Mar 2026",
    points: [
      "Led a team of 4 building a parsing engine for static code analysis",
      "Improved analysis efficiency by 30%",
    ],
  },
  {
    role: "Peer Mentor — Data Structures & Algorithms",
    org: "Graphic Era Hill University",
    period: "2025",
    points: [
      "Mentored 20 juniors through weekly doubt-clearing sessions",
      "Lifted class test averages by 15% with structured practice plans",
    ],
  },
  {
    role: "Event Coordinator",
    org: "Graphic Era Hill University",
    period: "2024 – Present",
    points: ["Coordinated logistics for technical events with 500+ attendees"],
  },
];

const SKILL_GROUPS = [
  {
    label: "Core Languages",
    icon: Braces,
    accent: "purple",
    items: ["C++", "Python", "JavaScript", "HTML/CSS", "SQL"],
  },
  {
    label: "Machine Learning",
    icon: Cpu,
    accent: "cyan",
    items: ["PyTorch", "NumPy", "Mixture of Experts", "Sparse Routing", "Transformers"],
  },
  {
    label: "Full-Stack",
    icon: Server,
    accent: "emerald",
    items: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind", "MySQL", "REST APIs"],
  },
  {
    label: "Cloud & Tools",
    icon: Cloud,
    accent: "purple",
    items: ["AWS", "Git/GitHub", "VS Code", "Linux"],
  },
  {
    label: "Core CS",
    icon: Database,
    accent: "cyan",
    items: ["DSA", "Dynamic Programming", "DBMS", "Operating Systems", "System Design"],
  },
];

// Fill these in as problems get logged — the card below auto-switches from
// an empty state to the chart once DSA_TOTALS.solved > 0.
const DSA_STATS = [
  { topic: "Arrays", solved: 0 },
  { topic: "DP", solved: 0 },
  { topic: "Graphs", solved: 0 },
  { topic: "Trees", solved: 0 },
  { topic: "Strings", solved: 0 },
  { topic: "Greedy", solved: 0 },
];

const DSA_TOTALS = { solved: 0, easy: 0, medium: 0, hard: 0 };

const PROJECTS = [
  {
    id: "moe",
    title: "Mixture of Experts Layer",
    subtitle: "PyTorch · Sparse Routing",
    size: "lg",
    accent: "cyan",
    description:
      "A sparse MoE layer with top-k softmax gating for selective token activation, built on transformer routing concepts. Debugged dimension-mismatch errors across the routing path and added an auxiliary load-balancing loss to keep expert utilization even.",
    tags: ["PyTorch", "NumPy", "Transformers", "MoE"],
    links: { code: "#" },
    kind: "moe",
  },
  {
    id: "chat",
    title: "Real-Time Chat Application",
    subtitle: "Socket.io · Sub-100ms",
    size: "lg",
    accent: "purple",
    description:
      "A live messaging platform using WebSockets to deliver sub-100ms message latency between connected users, with real-time presence tracking, automated timestamps, and persistent chat history in MongoDB.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    links: { code: "#" },
    kind: "chat",
  },
  {
    id: "analyzer",
    title: "Static Code Analyzer",
    subtitle: "Team Lead · Developer Tooling",
    size: "md",
    accent: "emerald",
    description:
      "Led a team of 4 to build a parsing engine for static code analysis at a university tech fest, improving analysis efficiency by 30% through better rule structuring.",
    tags: ["Python", "AST", "Linting"],
    links: { code: "#" },
    kind: "plain",
  },
  {
    id: "pytorch-optim",
    title: "PyTorch Optimizer — OSS Contribution",
    subtitle: "Open Source · PyTorch",
    size: "md",
    accent: "cyan",
    description:
      "Implemented an exponential learning-rate scheduler with linear warmup for an open-source PyTorch scheduler library, added decay-rate validation, wired it into the scheduler registry, and extended the test suite — merged via fork → commit → PR.",
    tags: ["PyTorch", "Open Source", "Testing"],
    links: { code: "#" },
    kind: "plain",
  },
  {
    id: "budget-tracker",
    title: "Personal Budget Tracker",
    subtitle: "FinTech Dashboard",
    size: "md",
    accent: "purple",
    description:
      "A financial dashboard with dynamic income/expense visualizations and live balance calculations, using Chart.js and React Context so recalculations happen instantly without a page reload.",
    tags: ["React", "Chart.js", "Context API"],
    links: { code: "#" },
    kind: "plain",
  },
  {
    id: "scheduler",
    title: "Facility Scheduling Optimizer",
    subtitle: "PyTorch · Reinforcement Learning",
    size: "md",
    accent: "cyan",
    description:
      "An RL agent trained in PyTorch that learns a scheduling policy for facility and resource allocation — replacing a hand-tuned formulation with a policy that generalizes across problem instances.",
    tags: ["PyTorch", "Reinforcement Learning", "Optimization"],
    links: { code: "#" },
    kind: "plain",
  },
  {
    id: "school",
    title: "School Website",
    subtitle: "Full-Stack Platform",
    size: "md",
    accent: "purple",
    description:
      "A full-featured educational platform covering admissions, announcements, and a faculty-managed content backend.",
    tags: ["React", "Express", "MySQL"],
    links: { code: "#", demo: "#" },
    kind: "plain",
  },
];

/* ------------------------------------------------------------------ */
/*  ACCENT MAP — keep to Tailwind's core palette                       */
/* ------------------------------------------------------------------ */

const ACCENT = {
  purple: {
    text: "text-purple-400",
    textStrong: "text-purple-300",
    border: "border-purple-500/30",
    borderHover: "hover:border-purple-400/60",
    glow: "hover:shadow-purple-500/20",
    bg: "bg-purple-500/10",
    dot: "bg-purple-400",
    ring: "focus:ring-purple-400/40",
    grad: "from-purple-500/20",
    bar: "#c084fc",
  },
  cyan: {
    text: "text-cyan-400",
    textStrong: "text-cyan-300",
    border: "border-cyan-500/30",
    borderHover: "hover:border-cyan-400/60",
    glow: "hover:shadow-cyan-500/20",
    bg: "bg-cyan-500/10",
    dot: "bg-cyan-400",
    ring: "focus:ring-cyan-400/40",
    grad: "from-cyan-500/20",
    bar: "#22d3ee",
  },
  emerald: {
    text: "text-emerald-400",
    textStrong: "text-emerald-300",
    border: "border-emerald-500/30",
    borderHover: "hover:border-emerald-400/60",
    glow: "hover:shadow-emerald-500/20",
    bg: "bg-emerald-500/10",
    dot: "bg-emerald-400",
    ring: "focus:ring-emerald-400/40",
    grad: "from-emerald-500/20",
    bar: "#34d399",
  },
};

/* ------------------------------------------------------------------ */
/*  SHARED UI PRIMITIVES                                                */
/* ------------------------------------------------------------------ */

function GlassCard({ children, className = "", accent = "purple", span = "" }) {
  const a = ACCENT[accent];
  return (
    <div
      className={`group relative rounded-2xl border ${a.border} ${a.borderHover} bg-zinc-900/40 backdrop-blur-xl
        shadow-lg shadow-black/40 ${a.glow} hover:shadow-2xl transition-all duration-500
        p-6 sm:p-7 overflow-hidden ${span} ${className}`}
    >
      <div
        className={`pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br ${a.grad} to-transparent
          opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700`}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

function SectionEyebrow({ icon: Icon, children, accent = "purple" }) {
  const a = ACCENT[accent];
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon className={`h-4 w-4 ${a.text}`} />
      <span className={`text-xs font-mono tracking-widest uppercase ${a.text}`}>{children}</span>
    </div>
  );
}

function Tag({ children, accent = "purple" }) {
  const a = ACCENT[accent];
  return (
    <span
      className={`inline-flex items-center rounded-full border ${a.border} ${a.bg} ${a.textStrong}
        px-2.5 py-1 text-[11px] font-mono tracking-wide`}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  NAV                                                                 */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-800/60" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 h-16">
        <button onClick={() => go("hero")} className="flex items-center gap-2 font-mono text-sm text-zinc-200 hover:text-cyan-300 transition-colors">
          <span className="text-purple-400">&lt;</span>
          dev
          <span className="text-cyan-400">/&gt;</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              {l.label}
            </button>
          ))}
          <a
            href={PROFILE.resumeUrl}
            className="ml-2 px-4 py-2 text-sm font-medium rounded-lg border border-emerald-500/40 text-emerald-300
              bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-400/70 transition-colors"
          >
            Resume
          </a>
        </div>

        <button className="md:hidden text-zinc-300" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800/60 px-5 pb-4 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="text-left px-3 py-3 text-sm font-medium text-zinc-300 hover:text-white rounded-lg hover:bg-white/5"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO — glass signature panel (no terminal)                         */
/* ------------------------------------------------------------------ */

const HERO_BADGES = [
  { icon: Braces, label: "C++ / Python", accent: "purple", pos: "top-2 left-2" },
  { icon: Cpu, label: "PyTorch", accent: "cyan", pos: "top-2 right-2" },
  { icon: Server, label: "Node.js", accent: "emerald", pos: "bottom-24 left-0 -translate-x-1/4" },
  { icon: Cloud, label: "AWS", accent: "purple", pos: "bottom-24 right-0 translate-x-1/4" },
  { icon: Database, label: "MySQL", accent: "cyan", pos: "bottom-2 left-1/2 -translate-x-1/2" },
];

const HERO_STATS = [
  { label: "Projects", value: "7" },
  { label: "Certifications", value: "2" },
  { label: "CGPA", value: "7.88" },
];

function HeroVisual() {
  const initials = PROFILE.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <div className="relative">
      <style>{`
        @keyframes floatY { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulseRing { 0% { opacity: .55; transform: scale(0.9); } 100% { opacity: 0; transform: scale(1.35); } }
        .hero-float { animation: floatY 4.5s ease-in-out infinite; }
        .hero-ring { animation: pulseRing 3s ease-out infinite; }
        .hero-orbit { animation: spinSlow 22s linear infinite; }
      `}</style>

      <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl shadow-2xl shadow-purple-500/10 overflow-hidden aspect-square max-w-md mx-auto">
        {/* subtle rotating conic glow ring */}
        <div
          className="hero-orbit absolute -inset-8 opacity-30"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(168,85,247,0.5) 15%, transparent 30%, rgba(34,211,238,0.5) 55%, transparent 70%, rgba(52,211,153,0.5) 90%, transparent 100%)",
          }}
        />

        <div className="absolute inset-[3px] rounded-3xl bg-zinc-950/90 backdrop-blur-xl" />

        {/* content */}
        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center">
            <span className="hero-ring absolute h-28 w-28 rounded-full border border-cyan-400/50" />
            <span className="hero-ring absolute h-28 w-28 rounded-full border border-purple-400/50" style={{ animationDelay: "1s" }} />
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/30 via-cyan-400/20 to-emerald-400/20 border border-zinc-700 flex items-center justify-center backdrop-blur-md">
              <span className="text-2xl font-display font-bold bg-gradient-to-br from-purple-300 via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
                {initials}
              </span>
            </div>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-300">{PROFILE.status}</span>
          </div>

          <div className="mt-8 flex items-center gap-6">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-white text-lg font-semibold">{s.value}</p>
                <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* floating tech badges */}
        {HERO_BADGES.map((b, i) => {
          const a = ACCENT[b.accent];
          const Icon = b.icon;
          return (
            <div
              key={b.label}
              className={`hero-float absolute ${b.pos} z-20`}
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border ${a.border} bg-zinc-900/80 backdrop-blur-md shadow-lg`}
              >
                <Icon className={`h-3.5 w-3.5 ${a.text}`} />
                <span className="text-[10px] font-mono text-zinc-300 whitespace-nowrap">{b.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 px-5 sm:px-8 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-300">{PROFILE.status}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]">
            {PROFILE.role.split(" & ")[0]}
            <span className="block bg-gradient-to-r from-purple-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              & ML Enthusiast
            </span>
          </h1>
          <p className="mt-5 text-zinc-400 text-base sm:text-lg max-w-md">{PROFILE.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-zinc-950 font-medium text-sm
                hover:bg-zinc-200 transition-colors"
            >
              View projects <ArrowUpRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-700 text-zinc-200 font-medium text-sm
                hover:border-cyan-400/60 hover:text-cyan-300 transition-colors"
            >
              <Mail className="h-4 w-4" /> Get in touch
            </button>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <a href={PROFILE.github} className="text-zinc-500 hover:text-white transition-colors"><Github className="h-5 w-5" /></a>
            <a href={PROFILE.linkedin} className="text-zinc-500 hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
            <a href={`mailto:${PROFILE.email}`} className="text-zinc-500 hover:text-white transition-colors"><Mail className="h-5 w-5" /></a>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ABOUT / SNAPSHOT BENTO                                              */
/* ------------------------------------------------------------------ */

function AboutSection() {
  return (
    <section id="about" className="px-5 sm:px-8 max-w-6xl mx-auto py-12">
      <SectionEyebrow icon={Sparkles} accent="purple">Snapshot</SectionEyebrow>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-fr">
        <GlassCard accent="purple" className="md:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-2">About</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Computer Science undergraduate who splits time between systems that route tokens through sparse
            experts and systems that route messages between people in real time — with an open-source PR merged
            into a PyTorch scheduler library along the way. Comfortable moving from a training loop to a
            production REST API in the same afternoon, and from writing code to leading the team that reviews it.
            Currently looking for an SDE internship where that range is useful.
          </p>
        </GlassCard>

        <GlassCard accent="cyan">
          <div className="flex items-start gap-3">
            <GraduationCap className="h-5 w-5 text-cyan-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-white">{EDUCATION.school}</h3>
              <p className="text-zinc-500 text-[11px] mt-0.5">{EDUCATION.location}</p>
              <p className="text-zinc-400 text-xs mt-1">{EDUCATION.degree}</p>
              <p className="text-cyan-300 text-xs font-mono mt-2">{EDUCATION.period}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard accent="emerald">
          <div className="flex items-start gap-3">
            <Award className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Certifications</h3>
              <ul className="space-y-1.5">
                {CERTS.map((c) => (
                  <li key={c} className="text-zinc-400 text-xs flex items-start gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </GlassCard>

        <GlassCard accent="purple" className="md:col-span-2">
          <h3 className="text-sm font-semibold text-white mb-3">Focus areas</h3>
          <div className="flex flex-wrap gap-2">
            {["System Design", "DSA & DP", "DBMS", "Operating Systems", "Sparse MoE", "Real-time systems"].map((t) => (
              <Tag key={t} accent="purple">{t}</Tag>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  EXPERIENCE & LEADERSHIP                                             */
/* ------------------------------------------------------------------ */

function ExperienceSection() {
  const accents = ["cyan", "purple", "emerald"];
  return (
    <section id="experience" className="px-5 sm:px-8 max-w-6xl mx-auto py-12">
      <SectionEyebrow icon={Award} accent="emerald">Experience & leadership</SectionEyebrow>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {EXPERIENCE.map((role, i) => {
          const accent = accents[i % accents.length];
          const a = ACCENT[accent];
          return (
            <GlassCard key={role.role} accent={accent}>
              <h3 className="text-sm font-semibold text-white">{role.role}</h3>
              <p className={`text-xs font-mono mt-1 ${a.text}`}>{role.org}</p>
              <p className="text-zinc-600 text-[11px] font-mono mt-0.5">{role.period}</p>
              <ul className="mt-3 space-y-1.5">
                {role.points.map((p) => (
                  <li key={p} className="text-zinc-400 text-xs flex items-start gap-1.5">
                    <CheckCircle2 className={`h-3.5 w-3.5 ${a.text} mt-0.5 shrink-0`} />
                    {p}
                  </li>
                ))}
              </ul>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TECH STACK GRID                                                     */
/* ------------------------------------------------------------------ */

function StackSection() {
  return (
    <section id="stack" className="px-5 sm:px-8 max-w-6xl mx-auto py-12">
      <SectionEyebrow icon={Layers} accent="cyan">Tech stack</SectionEyebrow>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SKILL_GROUPS.map((group) => {
          const a = ACCENT[group.accent];
          const Icon = group.icon;
          return (
            <GlassCard key={group.label} accent={group.accent}>
              <div className="flex items-center gap-2 mb-4">
                <Icon className={`h-4.5 w-4.5 ${a.text}`} />
                <h3 className="text-sm font-semibold text-white">{group.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className={`text-xs font-mono px-2.5 py-1.5 rounded-lg border ${a.border} text-zinc-300
                      bg-zinc-950/40 hover:${a.bg} ${a.borderHover} transition-colors cursor-default`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </GlassCard>
          );
        })}

        <GlassCard accent="emerald">
          <h3 className="text-sm font-semibold text-white mb-4">Problem solving</h3>
          {DSA_TOTALS.solved > 0 ? (
            <>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DSA_STATS} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <XAxis dataKey="topic" tick={{ fill: "#a1a1aa", fontSize: 10 }} axisLine={{ stroke: "#3f3f46" }} tickLine={false} />
                    <YAxis tick={{ fill: "#a1a1aa", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: 8, fontSize: 12 }}
                      labelStyle={{ color: "#e4e4e7" }}
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                    />
                    <Bar dataKey="solved" radius={[4, 4, 0, 0]}>
                      {DSA_STATS.map((_, i) => (
                        <Cell key={i} fill="#34d399" fillOpacity={0.75} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-3 text-center">
                <div>
                  <p className="text-white text-sm font-semibold">{DSA_TOTALS.solved}</p>
                  <p className="text-zinc-500 text-[10px] font-mono">solved</p>
                </div>
                <div>
                  <p className="text-emerald-400 text-sm font-semibold">{DSA_TOTALS.easy}</p>
                  <p className="text-zinc-500 text-[10px] font-mono">easy</p>
                </div>
                <div>
                  <p className="text-cyan-400 text-sm font-semibold">{DSA_TOTALS.medium}</p>
                  <p className="text-zinc-500 text-[10px] font-mono">medium</p>
                </div>
                <div>
                  <p className="text-purple-400 text-sm font-semibold">{DSA_TOTALS.hard}</p>
                  <p className="text-zinc-500 text-[10px] font-mono">hard</p>
                </div>
              </div>
            </>
          ) : (
            <div className="h-40 flex flex-col items-center justify-center text-center gap-2 border border-dashed border-zinc-800 rounded-xl">
              <p className="text-zinc-500 text-xs">Profile just created — problems logging soon.</p>
              <a
                href={PROFILE.leetcode}
                className="text-emerald-400 text-xs font-mono hover:text-emerald-300 inline-flex items-center gap-1"
              >
                View LeetCode profile <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
          <p className="text-zinc-600 text-[10px] font-mono mt-3">chart fills in automatically once DSA_TOTALS is updated in the data block</p>
        </GlassCard>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  LIVE CHAT PREVIEW — mini demo of the Chat App project               */
/* ------------------------------------------------------------------ */

const CHAT_SCRIPT = [
  { from: "them", text: "hey, is the server room card scanner rewired yet?" },
  { from: "me", text: "yep, pushed the socket layer for it an hour ago" },
  { from: "them", text: "nice — seeing it live update on my end" },
  { from: "me", text: "typing indicators + read receipts both working too" },
];

function ChatPreview() {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    async function loop() {
      while (!cancelled) {
        for (let i = 0; i < CHAT_SCRIPT.length; i++) {
          if (cancelled) return;
          setTyping(true);
          await new Promise((r) => setTimeout(r, 900));
          if (cancelled) return;
          setTyping(false);
          setVisible(i + 1);
          await new Promise((r) => setTimeout(r, 1100));
        }
        await new Promise((r) => setTimeout(r, 1400));
        if (cancelled) return;
        setVisible(0);
      }
    }
    loop();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [visible, typing]);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-zinc-800 bg-zinc-900/50">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span className="text-xs text-zinc-300 font-medium">team-general</span>
        <span className="text-[10px] text-zinc-500 font-mono ml-auto">live</span>
      </div>
      <div ref={boxRef} className="p-3 space-y-2 h-40 overflow-hidden">
        {CHAT_SCRIPT.slice(0, visible).map((m, i) => (
          <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <span
              className={`max-w-[80%] text-xs px-3 py-1.5 rounded-2xl ${
                m.from === "me"
                  ? "bg-purple-500/20 text-purple-100 rounded-br-sm"
                  : "bg-zinc-800 text-zinc-200 rounded-bl-sm"
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <span className="bg-zinc-800 text-zinc-400 text-xs px-3 py-2 rounded-2xl rounded-bl-sm inline-flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:-0.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:-0.1s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-500 animate-bounce" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECTS                                                            */
/* ------------------------------------------------------------------ */

function ProjectCard({ project }) {
  const a = ACCENT[project.accent];
  return (
    <GlassCard
      accent={project.accent}
      className={project.size === "lg" ? "md:col-span-3" : "md:col-span-2"}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="text-white font-semibold">{project.title}</h3>
            <p className={`text-xs font-mono mt-0.5 ${a.text}`}>{project.subtitle}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            {project.links.demo && (
              <a href={project.links.demo} className="text-zinc-500 hover:text-white transition-colors" aria-label="Live demo">
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            <a href={project.links.code} className="text-zinc-500 hover:text-white transition-colors" aria-label="Source code">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed">{project.description}</p>

        {project.kind === "chat" && (
          <div className="mt-4">
            <ChatPreview />
          </div>
        )}

        {project.kind === "moe" && (
          <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-3">
              <span>token</span>
              <span>top-k gate</span>
              <span>experts</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-8 w-8 rounded-md bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-300 font-mono">x</div>
              <div className="flex-1 mx-3 h-px bg-gradient-to-r from-zinc-700 via-cyan-500/60 to-zinc-700" />
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-8 w-8 rounded-md flex items-center justify-center text-[10px] font-mono transition-colors ${
                      i === 1 || i === 3 ? "bg-cyan-500/25 text-cyan-200 border border-cyan-400/50" : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    E{i}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[10px] font-mono text-zinc-600 mt-3">top-2 of 4 experts activated per token</p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5 pt-1 mt-auto">
          {project.tags.map((t) => (
            <Tag key={t} accent={project.accent}>{t}</Tag>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="px-5 sm:px-8 max-w-6xl mx-auto py-12">
      <SectionEyebrow icon={Braces} accent="emerald">Projects</SectionEyebrow>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT / FOOTER                                                    */
/* ------------------------------------------------------------------ */

function ContactSection() {
  return (
    <section id="contact" className="px-5 sm:px-8 max-w-6xl mx-auto py-16">
      <GlassCard accent="cyan" className="text-center py-12">
        <MessageCircle className="h-8 w-8 text-cyan-400 mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Let's build something</h2>
        <p className="text-zinc-400 text-sm mt-3 max-w-md mx-auto">
          {PROFILE.status} — reach out if there's a team looking for someone comfortable across the stack.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-zinc-950 font-medium text-sm hover:bg-zinc-200 transition-colors"
          >
            <Send className="h-4 w-4" /> Email me
          </a>
          <a
            href={PROFILE.github}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-700 text-zinc-200 font-medium text-sm hover:border-purple-400/60 hover:text-purple-300 transition-colors"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a
            href={PROFILE.linkedin}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-700 text-zinc-200 font-medium text-sm hover:border-cyan-400/60 hover:text-cyan-300 transition-colors"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
        </div>
      </GlassCard>

      <footer className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600 font-mono">
        <span>© {new Date().getFullYear()} {PROFILE.name}. built with react + tailwind.</span>
        <span className="flex items-center gap-1.5">
          <Circle className="h-2 w-2 fill-emerald-400 text-emerald-400" /> deployed on github pages
        </span>
      </footer>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  BACKGROUND — subtle grid + ambient glow, no heavy libraries         */
/* ------------------------------------------------------------------ */

function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-zinc-950">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #71717a 1px, transparent 1px), linear-gradient(to bottom, #71717a 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-600/20 blur-[100px]" />
      <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-cyan-600/10 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-emerald-600/10 blur-[120px]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                 */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  return (
    <div className="min-h-screen text-zinc-100 selection:bg-purple-500/30">
      <AmbientBackground />
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <ExperienceSection />
        <StackSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}
