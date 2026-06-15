(function () {
"use strict";

const CONFIG = {
  brand: `<img src="https://cdn.prod.website-files.com/65fdd9abdfe007f804f15369/69f2817d3ad5de3dea2ee10a_logo.png" alt="Coachability Consultants" style="height:18px;object-fit:contain;width:auto;display:block;">`,
  brandShort: "CCI",
  submitUrl: "",

  intro: {
    heading: "What type of coaching pathway is best for you?",
    body: "Give us a few minutes and we’ll point you in the right direction.",
    insightLabel: "What you'll get",
    insightText: "A personalized assessment of your organization's coaching culture maturity — with a specific recommendation on where to start.",
    ctaLabel: "Start assessment",
  },

  step1Card: {
    bgImage: "https://cdn.prod.website-files.com/65fdd9abdfe007f804f15369/6a0b63162f0a05ed816fed16_Block%3D00-Step%2C%20Version%3DPrincipal%2C%20Viewport%3DDesktop%2C%20Status%3DDefault.png",
    heading: "Check your readiness.",
    body: "Take 2 minutes to discover where coachability can fuel your team's performance. Get your personalized maturity snapshot and clear next steps.",
    cta: "Start my assessment",
  },

  sidebarSteps: [
    "Start",
    "Culture",
    "Chats",
    "After launch",
    "Main hurdles",
    "Today's setup",
    "Priority",
    "Audience",
    "Timeline",
    "About you",
  ],

  questions: [
    {
      heading: "Let's understand your coaching culture",
      subtitle: "What role does coaching currently play in driving performance in your organization?",
      type: "single",
      insight: {
        label: "WHY THIS MATTERS",
        text: "Research shows that when coaching is tied directly to business outcomes, performance improves up to 79% faster. Where coaching sits in your organization tells us a lot about where the opportunity is.",
      },
      answers: [
        { text: "Developmental support — helpful, but not tied directly to business outcomes", weight: 1 },
        { text: "Encouraged practice — impact varies by leader", weight: 2 },
        { text: "Expected leadership behavior with performance accountability", weight: 3 },
        { text: "Core performance lever — embedded in how results are achieved", weight: 4 },
      ],
    },
    {
      heading: "How does coaching land today?",
      subtitle: "When coaching conversations occur, what most often happens afterward?",
      type: "single",
      insight: {
        label: "WHAT WE LOOK AT",
        text: "The gap between a great coaching conversation and actual behavior change is where most organizations lose momentum. This is the coachability gap.",
      },
      answers: [
        { text: "Insightful discussions — behavior change is inconsistent", weight: 1 },
        { text: "Motivation increases — follow-through varies", weight: 2 },
        { text: "Clear action plans — execution depends on the individual", weight: 3 },
        { text: "Observable behavior change and measurable performance improvement", weight: 4 },
      ],
    },
    {
      heading: "What happens after launch?",
      subtitle: "When new initiatives roll out (sales models, leadership programs, system changes), what typically happens?",
      type: "single",
      insight: {
        label: "INSIGHT",
        text: "Pull-through is the #1 predictor of whether a coaching investment pays off. Adoption that fades isn't a training problem — it's a coachability problem.",
      },
      answers: [
        { text: "Energy is high at kickoff; adoption fades quickly", weight: 1 },
        { text: "Some teams embrace it; others resist or quietly revert", weight: 2 },
        { text: "Managers reinforce it inconsistently — results vary widely", weight: 3 },
        { text: "Behavior change sticks and scales — we see measurable results", weight: 4 },
      ],
    },
    {
      heading: "Where does coaching fall short?",
      subtitle: "When coaching doesn't drive performance improvements, the underlying issue is usually:",
      type: "single",
      insight: {
        label: "THE MISSING PIECE",
        text: "Most organizations focus on improving the coach. We focus on the other side — the person being coached. That's where the untapped leverage lives.",
      },
      answers: [
        { text: "Managers may not be coaching consistently", weight: 1 },
        { text: "Coaching quality varies significantly", weight: 2 },
        { text: "Employees struggle to apply feedback", weight: 3 },
        { text: "Coaching reliably drives behavior change", weight: 4 },
      ],
    },
    {
      heading: "Your coaching investments",
      subtitle: "Which of the following are currently in place? Select all that apply.",
      type: "multiple",
      insight: {
        label: "CONTEXT",
        text: "The more infrastructure you've built, the more coachability becomes the differentiator. Without it, even the best investments plateau.",
      },
      answers: [
        { text: "A defined coaching model or framework", weight: 1 },
        { text: "Coaching skills training for leaders", weight: 1 },
        { text: "Internal or external executive coaching", weight: 1 },
        { text: "AI-enabled or technology-supported coaching tools", weight: 1 },
        { text: "Coaching embedded in competency models", weight: 1 },
        { text: "Measurement of coaching effectiveness", weight: 1 },
        { text: "We are early in building coaching capability", weight: 0 },
      ],
    },
    {
      heading: "Where's the opportunity?",
      subtitle: "Where is the greatest opportunity to strengthen coachability today?",
      type: "single",
      insight: {
        label: "WHAT WE SEE",
        text: "Organizations that start with sales often expand enterprise-wide within 12 months once results become visible. The entry point matters less than the commitment.",
      },
      answers: [
        { text: "Primarily within our sales organization", weight: 1 },
        { text: "Sales first — then potentially broader teams", weight: 2 },
        { text: "Across all levels of leadership", weight: 3 },
        { text: "Enterprise-wide capability tied to culture and talent strategy", weight: 4 },
      ],
    },
    {
      heading: "Scale of impact",
      subtitle: "If you were to elevate coachability, the initial reach would likely be:",
      type: "single",
      insight: {
        label: "SCALE",
        text: "Whether you start with a single team or a global rollout, the methodology adapts. What matters is that coachability becomes measurable from day one.",
      },
      answers: [
        { text: "A team or group of teams", weight: 1 },
        { text: "A business unit or department(s)", weight: 2 },
        { text: "National / regional population", weight: 3 },
        { text: "Global enterprise-wide rollout", weight: 4 },
      ],
    },
    {
      heading: "Timing",
      subtitle: "When would developing coachability realistically enter your planning horizon?",
      type: "single",
      insight: {
        label: "READINESS",
        text: "There's no wrong time to start understanding your coachability baseline. Even exploratory conversations surface insights that shift how leaders think about development.",
      },
      answers: [
        { text: "Immediately — it's already a priority", weight: 4 },
        { text: "Within the next 6–12 months", weight: 3 },
        { text: "Within the next 12–24 months", weight: 2 },
        { text: "Future consideration — exploratory", weight: 1 },
      ],
    },
  ],

  leadForm: {
    heading: "One last step before your results",
    subtitle: "Tell us a little about you so one of our consultants can get back to you with a tailored next step.",
    fields: {
      firstName:  { label: "First name",    placeholder: "Jane" },
      lastName:   { label: "Last name",     placeholder: "Smith" },
      company:    { label: "Company name",  placeholder: "Acme Inc." },
      email:      { label: "Work email",    placeholder: "jane@acme.com" },
      phone:      { label: "Phone",         placeholder: "+1 555 123 4567" },
      message:    { label: "Message",       placeholder: "Tell us briefly what you're hoping to achieve…" },
    },
    termsText: 'I agree to the <a href="#" target="_blank" rel="noopener">Terms &amp; Conditions</a> and the <a href="#" target="_blank" rel="noopener">Privacy Policy</a>, and consent to being contacted by Coachability Consultants.',
    submitLabel: "Get my results",
  },

  /* ── CHANGE 1: added maturityPct + opportunityPct to every tier ── */
  tiers: [
    {
      type: "A", label: "Foundational",
      scoreMin: 8, scoreMax: 13,
      maturityPct: 35, opportunityPct: 65,
      response: "Your organization appears to invest in coaching, but adoption and behavior change may be inconsistent. In environments like this, the gap is rarely intent — it's usually application.",
      detail: "Coaching conversations may be happening, but without a deliberate focus on coachability, even the best coaching struggles to translate into lasting performance improvement. Organizations at this stage often see the fastest transformation once they address the receiving side of coaching.",
      cta: "Want to see where coachability may be limiting performance — and how to quantify it?",
      recommendation: "Coachability Quotient (CQ) Assessment",
    },
    {
      type: "B", label: "Emerging",
      scoreMin: 14, scoreMax: 19,
      maturityPct: 45, opportunityPct: 60,
      response: "Your organization has begun building a coaching culture, and there are signs of progress — but the results are uneven. Coaching impact depends too heavily on individual receptivity rather than a systematic capability.",
      detail: "You're past the starting line, which matters. The next move is turning coachability from something that varies person-to-person into a measurable, trainable skill across your teams. That shift is what separates organizations that coach from organizations where coaching works.",
      cta: "Ready to make coachability a measurable skill?",
      recommendation: "CQ Assessment + Explore Your Coachability Workshop",
    },
    {
      type: "C", label: "Strategic",
      scoreMin: 20, scoreMax: 25,
      maturityPct: 50, opportunityPct: 55,
      response: "Organizations operating at this level don't just coach more — they systematically elevate coachability across roles, levels, and regions. You've built real infrastructure. The foundation is strong.",
      detail: "At this stage, the opportunity isn't more coaching — it's making coachability a strategic competency. That means measurement, precision, and embedding coachability into how your organization develops talent, drives adoption, and sustains performance over time.",
      cta: "Ready to move from coaching culture to coachability culture?",
      recommendation: "Collaborative Coaching Framework + Coachability Skills Training",
    },
    {
      type: "D", label: "Multiplier-Ready",
      scoreMin: 26, scoreMax: 32,
      maturityPct: 65, opportunityPct: 75,
      response: "This is rare. Your organization has coaching embedded as a true performance lever — behavior change sticks, initiatives scale, and results are measurable. You've moved beyond building a coaching culture into operating one.",
      detail: "At the Multiplier-Ready level, the play is multiplication: certifying internal champions, embedding coachability into hiring and talent strategy, and using advanced behavioral measurement to stay ahead. This is where coaching becomes a compounding competitive advantage.",
      cta: "Ready to protect and multiply your advantage?",
      recommendation: "Coachability Certification + Hiring for Coachability + Behavioral Measurements",
    },
  ],

  pathways: [
    {
      id: "coachees",
      eyebrow: "A Pathway for <strong>Coachees</strong>",
      headline: "Everyone can be more coachable.",
      desc: "Preparing your people to receive coaching well — the foundation that makes every other coaching investment pay off. Most companies start here.",
      image: "https://cdn.prod.website-files.com/65fdd9abdfe007f804f15369/6a0e29fbcfa96a13f0510dba_Container.png",
      url: "/pathway-for-coachees",
      cta: "Check it out",
    },
    {
      id: "coaches",
      eyebrow: "A Pathway for <strong>Coaches</strong>",
      headline: "Better results with better coaching.",
      desc: "Hands-on training that gives your leaders the tools, language and frameworks to coach their teams consistently and well.",
      image: "https://cdn.prod.website-files.com/65fdd9abdfe007f804f15369/6a0e29fbe52f6e04013a67f1_Container%20(3).png",
      url: "/a-pathway-for-coaches",
      cta: "Check it out",
    },
    {
      id: "elite",
      eyebrow: "A Pathway for <strong>Elite Performers</strong>",
      headline: "Specific training to be even better.",
      desc: "A focused program for top performers who already deliver — and want sharper feedback loops to keep raising the bar.",
      image: "https://cdn.prod.website-files.com/65fdd9abdfe007f804f15369/6a0e29f8b6ca65f075cc0ded_Container-2.png",
      url: "/a-pathway-for-elite-performers",
      cta: "Check it out",
    },
    {
      id: "peer",
      eyebrow: "A Pathway for <strong>Peer Leaders</strong>",
      headline: "The delicate art of leading peers.",
      desc: "The most advanced pathway — for organizations ready to embed coachability into how peers grow each other.",
      image: "https://cdn.prod.website-files.com/65fdd9abdfe007f804f15369/6a0e29f05511a0603d1ae9f5_Container-3.png",
      url: "/a-pathway-for-peer-leaders",
      cta: "Check it out",
    },
  ],

  resultsCtas: {
    primary:   { label: "Schedule a conversation", url: "/your-coachability-quotient" },
    secondary: { label: "Learn more",              url: "/why-cci-method" },
  },

  pathwaysSection: {
    title: "Where to go from here",
    subtitle: "Based on your answers we've highlighted the pathway that fits you best — but feel free to explore all four.",
  },
};

/* ─────────────────────────── CSS ─────────────────────────── */
const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
#msf-overlay{
  position:fixed;inset:0;background: url('https://cdn.prod.website-files.com/65fdd9abdfe007f804f15369/6a0b63162f0a05ed816fed16_Block%3D00-Step%2C%20Version%3DPrincipal%2C%20Viewport%3DDesktop%2C%20Status%3DDefault.png');z-index:99999;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display:flex;flex-direction:column;
  font-family:'Inter',system-ui,-apple-system,sans-serif;
  color:#0a0a0a;overflow:hidden;
  opacity:0;transform:translateY(18px);
  transition:opacity .35s ease,transform .35s cubic-bezier(.22,1,.36,1);
}
#msf-overlay.msf-visible{opacity:1;transform:translateY(0)}
#msf-overlay *{font-family:inherit}

/* ── HEADER ── */
.msf-header{
  display: none !important;
}
.msf-logo{font-size:.95rem;font-weight:700;letter-spacing:-.01em;color:#0a0a0a}
.msf-close{
  width:40px;height:40px;border:1.5px solid #e5e5e5;background:transparent;
  display:flex;align-items:center;justify-content:center;
  font-size:1.3rem;font-weight:400;color:#0a0a0a;border-radius:50%;
  cursor:pointer;transition:all .2s ease;flex-shrink:0;line-height:1;
}
.msf-close:hover{background:#0a0a0a;color:#fff;border-color:#0a0a0a}

/* ── PROGRESS ── */
.msf-progress{height:3px;background:#f0f0f0;flex-shrink:0}
.msf-progress-fill{height:100%;background:#0a0a0a;transition:width .4s cubic-bezier(.4,0,.2,1)}

/* ── MAIN BODY ── */
.msf-body{
  flex:1;overflow:hidden;
  display:flex;
  transition:opacity .22s ease,transform .22s ease;
}
.msf-body.fade-out-fwd{opacity:0;transform:translateX(18px)}
.msf-body.fade-out-back{opacity:0;transform:translateX(-18px)}
.msf-body.fade-in{opacity:1;transform:translateX(0)}

/* INTRO — full-bleed hero */
.msf-body.msf-mode-intro{
  flex-direction:column;
  overflow-y:auto;
}

/* START & PANEL modes — sidebar + right panel */
.msf-body.msf-mode-start,
.msf-body.msf-mode-panel{
  flex-direction:row;
  overflow:hidden;
}

/* RESULTS mode — full page two-section layout */
.msf-body.msf-mode-results{
  flex-direction:column;
  overflow-y:auto;
  padding:0;
  background:#fff;
}

/* ── INTRO ── */
.msf-intro-hero{
  flex:1;position:relative;
  display:flex;align-items:center;justify-content:center;
  overflow:hidden;min-height:100%;
}
.msf-intro-bg{
  position:absolute;inset:0;
  background-image:url('https://cdn.prod.website-files.com/65fdd9abdfe007f804f15369/6a0b5e9b7779453863f4d3fb_Block%3DWelcome%2C%20Version%3DPrincipal%2C%20Viewport%3DDesktop%2C%20Status%3DDefault.jpg');
  background-size:cover;background-position:center;background-color:#f5f5f5;
}
.msf-intro-content{
  position:relative;z-index:1;
  display:flex;flex-direction:column;align-items:center;text-align:center;
  padding:40px 32px;max-width:635px;width:100%;
}
.msf-intro-heading{
  font-size: 48px;
  font-family:DM Sans,system-ui,sans-serif !important;
  font-weight:500;line-height:1.12;letter-spacing:-.03em;color:#1E1E1E;margin-bottom:16px;
}
.msf-intro-body{
  font-size:1rem;font-family:DM Sans,system-ui,sans-serif !important;
  line-height:1.65;color:#2E2E2E;margin-bottom:0;
}
.msf-intro-spacer{height:clamp(78px,8vh,96px)}
.msf-intro-cta{
  display:inline-flex;align-items:center;gap:10px;
  padding:8px 16px;background:#0a0a0a;color:#fff;
  font-size: 13px;font-weight:400;border-radius:999px;border:none;
  cursor:pointer;transition:background .18s ease,transform .18s ease;
  letter-spacing:-.01em;white-space:nowrap;
}
.msf-intro-cta:hover{background:#333;transform:translateY(-1px)}
.msf-intro-cta:active{transform:scale(.97)}

/* ── SIDEBAR ── */
.msf-sidebar{
  width:25%;min-width:180px;flex-shrink:0;
  display:flex;flex-direction:column;
  padding: 18px 32px 28px;background:transparent;overflow-y:auto;
}
.msf-sidebar-brand{
  font-size:1.4rem;font-weight:700;letter-spacing:-.03em;
  color:#0a0a0a;margin-bottom:auto;line-height:1;
}
.msf-sidebar-steps{
  margin-top:auto;padding-top:32px;
  display:flex;flex-direction:column;gap:6px;
}
.msf-sidebar-step{
  font-size:.88rem;font-weight:400;color:#bbb;
  padding:5px 0;transition:color .18s ease;line-height:1.3;
}
.msf-sidebar-step.active{color:#0a0a0a;font-weight:600}
.msf-sidebar-step.done{color:#888}

/* ── RIGHT PANEL ── */
.msf-panel-right{
  flex:1;display:flex;flex-direction:column;background:transparent;overflow:hidden;
}
.msf-panel-header{
  display:flex;align-items:center;justify-content:space-between;
  padding:18px 32px;flex-shrink:0;
}
.msf-panel-counter{font-size:.82rem;font-weight:600;color:#9a9a9a;letter-spacing:.04em}
.msf-panel-tagline{font-size:.82rem;font-weight:500;color:#9a9a9a;text-transform:uppercase;letter-spacing:.08em}
.msf-panel-close{
  width:36px;height:36px;border:1.5px solid #e5e5e5;background:transparent;
  display:flex;align-items:center;justify-content:center;
  font-size:1.2rem;font-weight:400;color:#0a0a0a;border-radius:50%;
  cursor:pointer;transition:all .2s ease;flex-shrink:0;line-height:1;
}
.msf-panel-close:hover{background:#0a0a0a;color:#fff;border-color:#0a0a0a}

/* ── PANEL CONTENT (the scrollable right area for all questions) ── */
.msf-panel-content{
  flex:1;overflow-y:auto;padding:32px 40px;
  padding-left: 32px !important;
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  scroll-behavior:smooth;
}

/* Content fade animation inside the panel */
.msf-panel-content-inner{
  transition:opacity .2s ease,transform .2s ease;
  width:100%;
}
.msf-panel-content-inner.fade-out{opacity:0;transform:translateY(10px); height: 100%; min-height:90%;}
.msf-panel-content-inner.fade-in{opacity:1;transform:translateY(0); min-height: 100%;}

/* ── QUESTION IN-CARD CONTINUE ── */
.msf-q-continue-row{
  display:flex;justify-content:flex-end;margin-top:20px;
}
.msf-q-continue-btn{
  display:inline-flex;align-items:center;gap:8px;
  padding:8px 16px;background:#0a0a0a;color:#fff;
  font-size:.9rem;font-weight:400;border-radius:999px;border:none;
  cursor:pointer;transition:background .18s ease,transform .15s ease;
}
.msf-q-continue-btn:hover:not(:disabled){background:#333}
.msf-q-continue-btn:active:not(:disabled){transform:scale(.97)}
.msf-q-continue-btn:disabled{background:#e5e5e5;color:#bbb;cursor:not-allowed}

/* ── START CARD ── */
.msf-start-card{
  background:#fff;border:1px solid transparent;border-radius:12px;
  overflow:hidden;max-width:70%;box-shadow:0 2px 12px rgba(0,0,0,.06);
  height: 100%;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  align-items: self-start;
  justify-content: space-between;
}
.msf-start-card-top{padding:28px 28px 20px}
.msf-start-card-heading {
  font-size: 1.45rem;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif !important;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: #1E1E1E;
}
.msf-start-card-hero{
  display: none !important;
}
.msf-start-card-body{padding:22px 28px 26px}
.msf-start-card-text{font-size:14px;font-family: 'DM Sans' !important;line-height:18px;color:#484848;margin-bottom:18px;max-width: 65%;width: 100%;}
.msf-start-card-btn{
  display:inline-flex;align-items:center;gap:8px;
  padding:8px 16px;background:#1E1E1E;color:#fff;
  font-size:13px;font-weight:400;border-radius:999px;font-family: 'DM Sans' !important;border:none;
  cursor:pointer;transition:background .18s ease,transform .15s ease;letter-spacing:-.01em;
}
.msf-start-card-btn:hover{background:#333;transform:translateY(-1px)}
.msf-start-card-btn:active{transform:scale(.97)}
.msf-panel-watermark{
  position:absolute;bottom:20px;right:28px;
  font-size:.68rem;font-weight:700;letter-spacing:.12em;
  text-transform:uppercase;color:#bbb;pointer-events:none;
}

/* ── QUESTION ── */
.msf-q-card {
  display: flex;
  flex-direction: column;
  row-gap: 14px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 32px 32px;
  max-width: 70%;
  width: 100%;
  box-shadow: 0 2px 16px rgba(0, 0, 0, .06);
  min-height: 90%;
}
.msf-step-row{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:12px;gap:16px}
.msf-heading{font-size:clamp(1.25rem,2.8vw,1.65rem);font-family: "DM Sans", sans-serif !important; font-weight:700;line-height:1.2;letter-spacing:-.02em;color:#1E1E1E}
.msf-subtitle{font-size:14px;font-weight:400;font-family: "DM Sans", sans-serif !important;color:#484848;margin-bottom:22px;line-height:1.6;max-width:500px}
.msf-options-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px;
  margin-bottom:0;
}
.msf-option{
  display:block;width:100%;max-height:100%;padding:22px 18px;
  border:1.5px solid transparent;border-radius: 24px;background: rgba(21, 21, 21, 0.02);color:#484848;
  font-size:13px;font-weight:400;font-family: "DM Sans", sans-serif !important;line-height:1.45;text-align:left;
  border-radius:24px;transition:all .18s ease;cursor:pointer;
}
.msf-option:hover{border-color:transparent;background: rgba(21, 21, 21, 0.02)}
.msf-option.selected {
  background: rgba(21, 21, 21, 0.02);
  color: #1E1E1E;
  font-weight: 600;
  border: 1.5px solid #8217cf;
}
.msf-option.selected:hover{background: rgba(21, 21, 21, 0.02)}
/* multiple-choice checkmark */
.msf-check{
  display:none;align-items:center;justify-content:center;
  width:18px;height:18px;border:1.5px solid currentColor;border-radius:4px;
  margin-right:13px;vertical-align:middle;position:relative;top:-1px;
  font-size:.7rem;font-weight:700;flex-shrink:0;
}

/* Insight block */
.msf-insight{
  display: none !important;
}
.msf-insight-label{font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#9a9a9a;margin-bottom:8px}
.msf-insight-text{font-size:.93rem;line-height:1.6;color:#555}

/* ── LEAD FORM CARD ── */
.lead-form-main-cont {
  display: flex;
  flex-direction: column;
  row-gap: 14px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 32px 32px;
  max-width: 70%;
  width: 100%;
  box-shadow: 0 2px 16px rgba(0, 0, 0, .06);
  min-height: 90%;
}

/* ── LEAD FORM SUBMIT BUTTON ── */
.msf-lead-submit-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #1E1E1E;
  color: #fff;
  font-size: 13px;
  line-height: 16px;
  font-weight: 400;
  font-family: 'DM Sans', sans-serif !important;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  transition: background .18s ease, transform .15s ease;
  letter-spacing: -.01em;
  align-self: flex-end;
  margin-top: 8px;
}
.msf-lead-submit-btn:hover:not(:disabled) { background: #333; transform: translateY(-1px); }
.msf-lead-submit-btn:active:not(:disabled) { transform: scale(.97); }
.msf-lead-submit-btn:disabled { background: #e5e5e5; color: #bbb; cursor: not-allowed; }

/* ── FOOTER ── */
.msf-footer{
  display:none !important;
}
.msf-btn-back{
  padding:13px 26px;border:1.5px solid #e5e5e5;background:transparent;
  color:#bbb;font-size:.93rem;font-weight:600;border-radius:999px;
  cursor:pointer;transition:all .18s ease;
}
.msf-btn-back.active{border-color:#0a0a0a;color:#0a0a0a}
.msf-btn-back.active:hover{background:#fafafa}
.msf-btn-continue{
  padding:13px 30px;border:1.5px solid #0a0a0a;background:#0a0a0a;color:#fff;
  font-size:.93rem;font-weight:600;border-radius:999px;
  cursor:pointer;transition:all .18s ease;
}
.msf-btn-continue:hover:not(:disabled){background:#333;border-color:#333}
.msf-btn-continue:active:not(:disabled){transform:scale(.97)}
.msf-btn-continue:disabled{background:#e5e5e5;border-color:#e5e5e5;color:#bbb;cursor:not-allowed}

/* ── LEAD FORM FIELDS ── */
.msf-lead-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px 16px;margin-bottom:8px}
.msf-field{display:flex;flex-direction:column;gap:7px}
.msf-field-full{grid-column:1/-1}
.msf-label{font-size:.83rem;font-weight:600;color:#0a0a0a;letter-spacing:-.005em}
.msf-label .msf-req{color:#9a9a9a;font-weight:400;margin-left:2px}
.msf-input,.msf-textarea{
  width:100%;padding:13px 15px;border:1.5px solid #e5e5e5;border-radius:10px;
  background:#fff;font-size:.97rem;color:#0a0a0a;line-height:1.5;
  transition:border-color .18s ease;outline:none;
}
.msf-input::placeholder,.msf-textarea::placeholder{color:#bbb}
.msf-input:hover,.msf-textarea:hover{border-color:#9a9a9a}
.msf-input:focus,.msf-textarea:focus{border-color:#0a0a0a}
.msf-input.error,.msf-textarea.error{border-color:#c94f4f}
.msf-textarea{resize:vertical;min-height:108px}
.msf-error-msg{font-size:.76rem;font-weight:500;color:#c94f4f;margin-top:-2px;display:none}
.msf-error-msg.show{display:block}
.msf-terms{display:flex;align-items:flex-start;gap:11px;margin-top:18px;cursor:pointer;user-select:none}
.msf-terms input{position:absolute;opacity:0;pointer-events:none}
.msf-terms-box{
  flex-shrink:0;width:22px;height:22px;border:1.5px solid #bbb;border-radius:6px;
  display:flex;align-items:center;justify-content:center;background:#fff;
  transition:all .18s ease;margin-top:1px;
}
.msf-terms-box::after{
  content:"";width:10px;height:6px;border-left:2px solid #fff;border-bottom:2px solid #fff;
  transform:rotate(-45deg) translate(1px,-1px);opacity:0;transition:opacity .18s;
}
.msf-terms input:checked+.msf-terms-box{background:#0a0a0a;border-color:#0a0a0a}
.msf-terms input:checked+.msf-terms-box::after{opacity:1}
.msf-terms-text{font-size:.88rem;color:#555;line-height:1.5}
.msf-terms-text a{color:#0a0a0a;text-decoration:underline;text-underline-offset:2px}
.msf-terms.error .msf-terms-box{border-color:#c94f4f}

/* ══════════════════════════════════════════
   RESULTS — 3-COLUMN REDESIGN
   ══════════════════════════════════════════ */

.msf-res-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  background-color: #F1F1F1;
  font-family: 'DM Sans', system-ui, sans-serif !important;
}

/* ── SECTION 1: gradient / bg image ── */
.msf-res-section1 {
  position: relative;
  padding: 0 0 72px;
  background-image: var(--res-bg-image, none);
  background-size: cover;
  background-position: center;
  background-color: #f1f1f1;
}

/* Topbar lives inside section1 to sit on the gradient */
.msf-res-section1-topbar-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 64px;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
}
.msf-res-topbar-logo {}
.msf-res-topbar-close {
  width: 36px; height: 36px;
  border: 1.5px solid #010101;
  background: transparent;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.2rem; font-weight: 400; color: #010101;
  border-radius: 50%; cursor: pointer;
  transition: all .2s ease; line-height: 1;
}
.msf-res-topbar-close:hover {
  background: #010101;
  border-color: transparent;
  color: #fff;
}

/* Centered title + subtitle */
.msf-res-title-block {
  text-align: center;
  padding: 40px 64px 44px;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
}
.msf-res-title {
  font-family: 'Bitter', Georgia, serif !important;
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  font-weight: 400;
  letter-spacing: -0.03em;
  color: #1E1E1E;
  line-height: 1.15;
  margin-bottom: 10px;
}
.msf-res-subtitle {
  font-family: 'DM Sans', system-ui, sans-serif !important;
  font-size: 16px;
  font-weight: 400;
  color: #484848;
  line-height: 1.6;
  max-width: 480px;
  margin: 0 auto;
}

/* ── 3-COLUMN GRID ── */
.msf-res-3col {
  display: grid;
  grid-template-columns: 1fr minmax(300px, 420px) 1fr;
  gap: 60px;
  align-items: center;
  max-width: 1300px;
  margin: 0 auto;
  padding: 120px 32px;
  width: 100%;
  background-image: url('https://cdn.prod.website-files.com/65fdd9abdfe007f804f15369/6a0cf1f8c9d484062a2cd6be_Hero%20(1).png');
  background-size: cover;
  background-position: center;
  border-radius: 12px;
}

/* Left column */
.msf-res-col-left {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.msf-res-col-left-response {
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  color: rgba(255,255,255,0.88);
  font-family: 'DM Sans', system-ui, sans-serif !important;
}

/* ── CENTER GLASS CARD ── */
.msf-res-center-card {
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: 1px solid rgba(255,255,255,0.30);
  border-radius: 20px;
  padding: 28px 24px;
  box-shadow:
    0 8px 40px rgba(0,0,0,0.20),
    inset 0 1px 0 rgba(255,255,255,0.28);
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
}

.msf-res-profile-label {
  font-size: 24px;
  font-weight: 400;
  line-height: 29px;
  color: #fff;
  margin-bottom: 16px;
  font-family: 'DM Sans', system-ui, sans-serif !important;
  width: 80%;
  flex-grow: 1;
  padding-right: 30px;
}

.msf-res-type-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
  width: 20%;
}
.msf-res-type-letter {
  font-size: 48px;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: #fff;
  font-family: 'DM Sans', system-ui, sans-serif !important;
  line-height: 1;
}
.msf-res-type-name {
  font-size: 13px;
  font-weight: 400;
  color: #fff;
  font-family: 'Bitter', system-ui, sans-serif !important;
  text-align: center;
}

/* Two score boxes side-by-side */
.msf-res-score-boxes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
}
.msf-res-score-box {
  background-color: rgba(0, 0, 0, 0.12);
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 16px 14px 14px;
}
.msf-res-score-val {
  font-size: 20px;
  font-weight: 400;
  letter-spacing: -0.03em;
  color: #fff;
  line-height: 1;
  margin-bottom: 10px;
  font-family: 'DM Sans', system-ui, sans-serif !important;
}
.msf-res-score-bar {
  width: 100%;
  height: 3px;
  background: rgba(255,255,255,0.16);
  border-radius: 99px;
  margin-bottom: 10px;
  overflow: hidden;
}
.msf-res-score-bar-fill {
  height: 100%;
  background: rgba(255,255,255,0.75);
  border-radius: 99px;
  width: 0%;
  transition: width 1.2s cubic-bezier(.4,0,.2,1);
}
#msf-bar-left {
  background: linear-gradient(to right, #D7A7FF 0%, #E3BFFC 55%, #F3DCF9 95%) !important;
}
#msf-bar-right {
  background: linear-gradient(to right, #BCDD53 0%, #B8E559 29%, #B5EC5D 85%);
}
.msf-res-score-lbl {
  font-size: 10px;
  font-weight: 400;
  letter-spacing: .06em;
  color: #fff;
  font-family: 'DM Sans', system-ui, sans-serif !important;
  line-height: 1.4;
}

/* Right column */
.msf-res-col-right {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.msf-res-col-right-detail {
  font-size: 13px;
  line-height: 16px;
  font-weight: 400px;
  letter-spacing: 0.2px;
  color: rgba(255,255,255,0.75);
  font-family: 'DM Sans', system-ui, sans-serif !important;
}
.msf-res-col-right-cta {
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  font-family: 'Bitter', system-ui, sans-serif !important;
  line-height: 1.45;
}
.msf-res-col-right-rec {
  font-size: 13px;
  color: rgba(255,255,255,0.85);
  font-style: normal;
  font-family: 'DM Sans', system-ui, sans-serif !important;
  line-height: 128%;
  max-width: 308px;
}

/* ── CHANGE 2: "Start now" button styled to match reference design ── */
.msf-res-start-btn {
  align-self: flex-start;
  padding: 8px 16px;
  background: transparent;
  color: #fff;
  font-size: 13px;
  font-weight: 400;
  font-family: 'DM Sans', system-ui, sans-serif !important;
  border: 1.5px solid rgba(255,255,255,0.7);
  border-radius: 999px;
  cursor: pointer;
  transition: background .18s ease, border-color .18s ease, transform .15s ease;
  text-decoration: none;
  display: inline-block;
  letter-spacing: -.01em;
}
.msf-res-start-btn:hover {
  background: rgba(255,255,255,0.15);
  border-color: #fff;
  transform: translateY(-1px);
}
.msf-res-start-btn:active { transform: scale(.97); }

/* ── SECTION 2: pathways ── */
.msf-res-section2 {
  padding: 52px 64px 60px;
  background: #F1F1F1;
}

.card-inner-results-top {
  max-width: 1440px;
  margin: 0 auto;
  background-color: white;
  padding: 60px 48px;
  border-radius: 16px;
}

/* Pathways header row */
.msf-res-pw-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 48px;
  margin-bottom: 28px;
}
.msf-res-pw-title {
  font-family: 'DM Sans', system-ui, sans-serif !important;
  font-size: clamp(1.35rem, 2.5vw, 3rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  color: #1E1E1E;
  line-height: 1.2;
  flex-shrink: 0;
  max-width: 411px;
}
.msf-res-pw-subtitle {
  font-size: 14px;
  font-weight: 400;
  font-family: 'DM Sans', system-ui, sans-serif !important;
  color: #484848;
  line-height: 1.65;
  max-width: 295px;
  text-align: left;
}

/* Pathway cards grid */
.msf-res-pw-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 14px;
  margin-bottom: 36px;
}
.msf-res-pw-card {
  display: flex;
  flex-direction: column;
  border: 1.5px solid #e5e5e5;
  border-radius: 14px;
  background: #fff;
  overflow: hidden;
  transition: border-color .18s ease, box-shadow .18s ease;
  padding: 24px 16px;
}
.msf-res-pw-card:hover {
  border-color: #9a9a9a;
  box-shadow: 0 4px 16px rgba(0,0,0,0.07);
}
.msf-res-pw-card.best {
  border: 1px solid #B46BF3;
  border-radius: 24px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05), 0 12px 32px rgba(0,0,0,0.08);
  padding: 24px 16px;
  background-color: rgba(0, 0, 0, 0.02);
  position: relative;
}
.msf-res-pw-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
  border-radius: 12px;
  background: #f0f0f0;
}
.msf-res-pw-body {
  padding-top: 14px;
  display: flex;
  flex-direction: column;
  flex: 1;
  row-gap: 12px;
  align-items: start;
  justify-content: left;
}
.msf-res-pw-badge {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 13px; font-weight: 400; font-family: 'DM Sans';
  letter-spacing: .08em; text-transform: uppercase;
  color: #1E1E1E; background: #F9F9F9;
  padding: 4px 8px; border-radius: 5px;
  margin-bottom: 12px; align-self: flex-start;
  position: absolute;
  top: 35px;
  left: 30px;
}
.msf-res-pw-eyebrow {
  font-size: 13px; font-weight: 400;
  font-family: 'DM Sans', system-ui, sans-serif !important;
  color: #555;
  padding: 4px 8px;
  border: 1px solid #8080802b;
  border-radius: 5px;
}
.msf-res-pw-eyebrow strong { color: #0a0a0a; font-weight: 700; }
.msf-res-pw-headline {
  font-size: 13px; font-weight: 600;
  line-height: 1.25; letter-spacing: -0.01em;
  color: #0a0a0a;
  font-family: 'DM Sans', system-ui, sans-serif !important;
}
.msf-res-pw-desc {
  font-size: 13px; line-height: 1.55;
  color: #484848; flex: 1;
  font-family: 'DM Sans', system-ui, sans-serif !important;
}
.msf-res-pw-cta {
  align-self: flex-start;
  padding: 8px 16px;
  border: 1.5px solid #1E1E1E;
  background: transparent; color: #1E1E1E;
  font-size: 13px; font-weight: 400;
  font-family: 'DM Sans', system-ui, sans-serif !important;
  border-radius: 999px; text-decoration: none;
  cursor: pointer; transition: all .18s ease;
  display: inline-block;
}
.msf-res-pw-cta:hover { background: #8217CF; color: #fff; border-color: #8217CF; }
.msf-res-pw-card.best .msf-res-pw-cta { background: #8217CF; color: #fff; border-color: #8217CF; }
.msf-res-pw-card.best .msf-res-pw-cta:hover { background: transparent; border-color: #1E1E1E; color: #1E1E1E; }

/* Bottom CTAs */
.msf-res-cta-row {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
.msf-res-cta-btn {
  padding: 8px 16px;
  border: 1.5px solid #1E1E1E;
  font-size: 13px; font-weight: 400;
  font-family: 'DM Sans', system-ui, sans-serif !important;
  text-align: center; border-radius: 999px;
  cursor: pointer; transition: all .18s ease;
  text-decoration: none; display: inline-block;
}
.msf-res-cta-btn.primary { background: #1E1E1E; color: #fff; }
.msf-res-cta-btn.primary:hover { background: transparent; border-color: #1E1E1E; color: #1E1E1E; }
.msf-res-cta-btn.secondary { background: transparent; color: #1E1E1E; }
.msf-res-cta-btn.secondary:hover { background: #1E1E1E; color: #fff; }

/* ── RESPONSIVE — RESULTS ── */
@media(max-width:1100px){
  .msf-res-3col {
    grid-template-columns: 1fr 340px 1fr;
    gap: 28px;
    padding: 80px 40px;
  }
}
@media(max-width:900px){
  .msf-res-3col {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 48px 32px;
  }
  .msf-res-center-card { max-width: 440px; }
  .msf-res-section1 { padding: 0 0 48px; }
  .msf-res-title-block { padding: 32px 32px 32px; }
  .msf-res-section1-topbar-wrap { padding: 14px 32px; }
  .msf-res-pw-grid { grid-template-columns: 1fr 1fr; }
}
/* ── CHANGE 4: mobile padding fix for .msf-res-3col ── */
@media(max-width:640px){
  .msf-res-3col { padding: 40px 20px; gap: 20px; }
  .msf-res-section1-topbar-wrap { padding: 12px 20px; }
  .msf-res-title-block { padding: 24px 20px 24px; }
  .msf-res-section1 { padding: 0 0 36px; }
  .msf-res-section2 { padding: 24px 16px 32px; }
  .card-inner-results-top { padding: 28px 20px; }
  .msf-res-title { font-size: 1.5rem; }
  .msf-res-score-val { font-size: 1.5rem; }
  .msf-res-pw-grid { grid-template-columns: 1fr; }
  .msf-res-pw-header { flex-direction: column; gap: 8px; }
  .msf-res-pw-subtitle { text-align: left; max-width: 100%; }
  .msf-res-cta-row { justify-content: stretch; flex-direction: column; }
  .msf-res-cta-btn { text-align: center; }
  .msf-res-center-card { max-width: 100%; }
}

/* ── RESPONSIVE — other steps ── */
@media(max-width:768px){
  .msf-sidebar{display:none}
  .msf-q-card{max-width:100%;min-height:auto;padding:24px 20px}
  .lead-form-main-cont{max-width:100%;min-height:auto;padding:24px 20px}
  .msf-options-grid{grid-template-columns:1fr}
  .msf-lead-grid{grid-template-columns:1fr;gap:16px}
  .msf-panel-content{padding:20px !important}
  .msf-panel-header{padding:14px 20px}
  .msf-start-card{max-width:100%}
  .msf-start-card-text{max-width:100%}
}
@media(max-width:640px){
  .msf-header{padding:16px 18px}
  .msf-footer{padding:14px 18px}
  .msf-heading{font-size:1.35rem}
  .msf-intro-content{padding:28px 20px}
  .msf-intro-heading{font-size:1.6rem}
  .msf-intro-spacer{height:40px}
  .msf-lead-submit-btn{align-self:stretch;justify-content:center}
}
`;

/* ── inject CSS ── */
(function injectCSS() {
  const old = document.getElementById('msf-style');
  if (old) old.remove();
  const s = document.createElement('style');
  s.id = 'msf-style';
  s.textContent = CSS;
  document.head.appendChild(s);
})();

/* ── STEPS ──
   0          = intro
   1          = start card
   2…(2+N-1)  = questions
   2+N        = lead form
   2+N+1      = results
*/
const TOTAL      = CONFIG.questions.length;
const STEP_START = 1;
const STEP_Q0    = 2;
const STEP_LEAD  = STEP_Q0 + TOTAL;
const STEP_RES   = STEP_LEAD + 1;

let step = 0;
let answers        = [];
let selectedMulti  = new Set();
let leadData       = {};

function resetState() {
  step          = 0;
  answers       = Array(TOTAL).fill(null);
  selectedMulti = new Set();
  leadData      = { firstName:'', lastName:'', company:'', email:'', phone:'', message:'', terms:false };
}

/* ─── BUILD SHELL ─── */
function buildModal() {
  const old = document.getElementById('msf-overlay');
  if (old) old.remove();
  const el = document.createElement('div');
  el.id = 'msf-overlay';
  el.setAttribute('role','dialog');
  el.setAttribute('aria-modal','true');
  el.style.display = 'none';
  el.innerHTML = `
    <div class="msf-header" id="msf-header">
      <div class="msf-logo">${CONFIG.brand}</div>
      <button class="msf-close" id="msf-close" aria-label="Close">×</button>
    </div>
    <div class="msf-progress" id="msf-progress"><div class="msf-progress-fill" id="msf-prog" style="width:0%"></div></div>
    <div class="msf-body fade-in" id="msf-body"></div>
    <div class="msf-footer" id="msf-footer">
      <button class="msf-btn-back" id="msf-back">Back</button>
      <button class="msf-btn-continue" id="msf-continue" disabled>Continue</button>
    </div>
  `;
  document.body.appendChild(el);
}

/* ─── OPEN / CLOSE ─── */
function openModal() {
  buildModal();
  resetState();
  const ov = document.getElementById('msf-overlay');
  ov.style.display = 'flex';
  requestAnimationFrame(() => ov.classList.add('msf-visible'));
  document.body.style.overflow = 'hidden';
  bindModalEvents();
  renderStep(0);
}
function closeModal() {
  const ov = document.getElementById('msf-overlay');
  if (!ov) return;
  ov.classList.remove('msf-visible');
  setTimeout(() => { ov.style.display='none'; }, 350);
  document.body.style.overflow = '';
}

function bindModalEvents() {
  const close = document.getElementById('msf-close');
  const back  = document.getElementById('msf-back');
  const cont  = document.getElementById('msf-continue');
  if (close && !close._b) { close.addEventListener('click', closeModal); close._b=true; }
  if (back  && !back._b)  { back.addEventListener('click',  goBack);     back._b=true; }
  if (cont  && !cont._b)  { cont.addEventListener('click',  goForward);  cont._b=true; }
}

/* ─── PROGRESS BAR ─── */
function calcProgress(s) {
  if (s <= STEP_START) return 0;
  if (s >= STEP_LEAD)  return 100;
  const qIdx = s - STEP_Q0;
  return Math.round(((qIdx + 1) / (TOTAL + 1)) * 100);
}

/* ─── RENDER STEP ─── */
function renderStep(s) {
  step = s;
  const header   = document.getElementById('msf-header');
  const progress = document.getElementById('msf-progress');
  const prog     = document.getElementById('msf-prog');
  const body     = document.getElementById('msf-body');
  const footer   = document.getElementById('msf-footer');

  const isIntro   = s === 0;
  const isStart   = s === STEP_START;
  const isQ       = s >= STEP_Q0 && s < STEP_LEAD;
  const isLead    = s === STEP_LEAD;
  const isResults = s === STEP_RES;

  if (isIntro || isStart || isResults) {
    header.style.display   = 'none';
    progress.style.display = 'none';
    prog.style.width       = '0%';
  } else {
    header.style.display   = '';
    progress.style.display = '';
    prog.style.width       = calcProgress(s) + '%';
  }

  body.classList.remove('msf-mode-intro','msf-mode-start','msf-mode-panel','msf-mode-results');
  if (isIntro)        body.classList.add('msf-mode-intro');
  else if (isStart)   body.classList.add('msf-mode-start');
  else if (isResults) body.classList.add('msf-mode-results');
  else                body.classList.add('msf-mode-panel');

  if (footer) footer.style.display = 'none';

  if (isIntro)        { body.innerHTML = renderIntro();   attachIntroListeners(); }
  else if (isStart)   { body.innerHTML = renderStart();   attachStartListeners(); }
  else if (isQ)       { renderQuestionInPanel(s); }
  else if (isLead)    { renderLeadInPanel(); }
  else if (isResults) { body.innerHTML = renderResults(); attachResultsListeners(); animateBar(); }
}

/* ── INTRO ── */
function renderIntro() {
  return `
    <div class="msf-intro-hero">
      <div class="msf-intro-bg"></div>
      <div class="msf-intro-content">
        <h1 class="msf-intro-heading">${esc(CONFIG.intro.heading)}</h1>
        <p class="msf-intro-body">${esc(CONFIG.intro.body)}</p>
        <div class="msf-intro-spacer"></div>
        <button class="msf-intro-cta" id="msf-intro-btn">
          ${esc(CONFIG.intro.ctaLabel)} <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>`;
}
function attachIntroListeners() {
  const btn = document.getElementById('msf-intro-btn');
  if (btn) btn.addEventListener('click', goForward);
}

/* ── START CARD ── */
function renderStart() {
  const c  = CONFIG.step1Card;
  const ss = CONFIG.sidebarSteps;
  const stepsHtml = ss.map((l,i) =>
    `<div class="msf-sidebar-step${i===0?' active':''}">${esc(l)}</div>`
  ).join('');
  const totalSteps = String(TOTAL + 1).padStart(2,'0');
  return `
    <div class="msf-sidebar">
      <div class="msf-sidebar-brand">${esc(CONFIG.brandShort)}</div>
      <div class="msf-sidebar-steps" id="msf-sidebar-steps">${stepsHtml}</div>
    </div>
    <div class="msf-panel-right">
      <div class="msf-panel-header" id="msf-panel-header">
        <span class="msf-panel-counter" id="msf-panel-counter">00 / ${totalSteps}</span>
        <span class="msf-panel-tagline">Unlock your potential</span>
        <button class="msf-panel-close" id="msf-panel-close" aria-label="Close">×</button>
      </div>
      <div class="msf-panel-content" id="msf-panel-content" style="position:relative;">
        <div class="msf-panel-content-inner fade-in" id="msf-panel-inner">
          <div class="msf-start-card">
            <div class="msf-start-card-top">
              <h2 class="msf-start-card-heading">${esc(c.heading)}</h2>
            </div>
            <div class="msf-start-card-body">
              <p class="msf-start-card-text">${esc(c.body)}</p>
              <button class="msf-start-card-btn" id="msf-start-btn">
                ${esc(c.cta)} <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
          <div class="msf-panel-watermark">Power up performance.</div>
        </div>
      </div>
    </div>`;
}
function attachStartListeners() {
  const pc = document.getElementById('msf-panel-close');
  const sb = document.getElementById('msf-start-btn');
  if (pc) pc.addEventListener('click', closeModal);
  if (sb) sb.addEventListener('click', goForward);
}

/* ── QUESTION ── */
function renderQuestionInPanel(s) {
  const body = document.getElementById('msf-body');
  const existingPanel = document.getElementById('msf-panel-content');
  if (!existingPanel) {
    body.innerHTML = buildPanelScaffold(s);
    attachPanelClose();
    attachOptionListeners(s);
  } else {
    swapPanelInner(s);
  }
}

function buildPanelScaffold(s) {
  const qIdx = s - STEP_Q0;
  const ss   = CONFIG.sidebarSteps;
  const qNum = qIdx + 1;
  const stepsHtml = ss.map((l,i) => {
    let cls = 'msf-sidebar-step';
    if (i === qNum)    cls += ' active';
    else if (i < qNum) cls += ' done';
    return `<div class="${cls}">${esc(l)}</div>`;
  }).join('');
  const padNum   = String(qNum).padStart(2,'0');
  const padTotal = String(TOTAL + 1).padStart(2,'0');
  return `
    <div class="msf-sidebar" id="msf-sidebar">
      <div class="msf-sidebar-brand">${esc(CONFIG.brandShort)}</div>
      <div class="msf-sidebar-steps" id="msf-sidebar-steps">${stepsHtml}</div>
    </div>
    <div class="msf-panel-right">
      <div class="msf-panel-header" id="msf-panel-header">
        <span class="msf-panel-counter" id="msf-panel-counter">${padNum} / ${padTotal}</span>
        <span class="msf-panel-tagline">Unlock your potential</span>
        <button class="msf-panel-close" id="msf-panel-close" aria-label="Close">×</button>
      </div>
      <div class="msf-panel-content" id="msf-panel-content">
        <div class="msf-panel-content-inner fade-in" id="msf-panel-inner">
          ${questionHTML(s)}
        </div>
      </div>
    </div>`;
}

function swapPanelInner(s) {
  const inner   = document.getElementById('msf-panel-inner');
  const panel   = document.getElementById('msf-panel-content');
  const counter = document.getElementById('msf-panel-counter');
  const sidebar = document.getElementById('msf-sidebar-steps');
  const prog    = document.getElementById('msf-prog');

  const qIdx   = s - STEP_Q0;
  const qNum   = qIdx + 1;
  const isLead = s === STEP_LEAD;

  if (prog) prog.style.width = calcProgress(s) + '%';

  if (counter) {
    if (isLead) counter.textContent = `${String(TOTAL + 1).padStart(2,'0')} / ${String(TOTAL + 1).padStart(2,'0')}`;
    else        counter.textContent = `${String(qNum).padStart(2,'0')} / ${String(TOTAL + 1).padStart(2,'0')}`;
  }

  if (sidebar) {
    const ss = CONFIG.sidebarSteps;
    sidebar.innerHTML = ss.map((l,i) => {
      let cls = 'msf-sidebar-step';
      if (isLead) {
        cls += i < ss.length - 1 ? ' done' : ' active';
      } else {
        if (i === qNum)    cls += ' active';
        else if (i < qNum) cls += ' done';
      }
      return `<div class="${cls}">${esc(l)}</div>`;
    }).join('');
  }

  if (!inner) {
    if (s === STEP_LEAD) renderLeadInPanel();
    else { const b = document.getElementById('msf-body'); b.innerHTML = buildPanelScaffold(s); attachPanelClose(); attachOptionListeners(s); }
    return;
  }

  inner.classList.remove('fade-in');
  inner.classList.add('fade-out');

  setTimeout(() => {
    if (panel) panel.scrollTop = 0;
    if (isLead) {
      inner.innerHTML = `<div class="lead-form-main-cont">${leadFormHTML()}</div>`;
    } else {
      inner.innerHTML = questionHTML(s);
    }
    inner.classList.remove('fade-out');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => inner.classList.add('fade-in'));
    });
    if (isLead) attachLeadInputListeners();
    else        attachOptionListeners(s);
  }, 200);
}

function attachPanelClose() {
  const pc = document.getElementById('msf-panel-close');
  if (pc && !pc._b) { pc.addEventListener('click', closeModal); pc._b = true; }
}

/* ── QUESTION HTML ── */
function questionHTML(s) {
  const qIdx = s - STEP_Q0;
  const q    = CONFIG.questions[qIdx];
  const ans  = answers[qIdx];
  const canContinue = q.type === 'multiple' ? selectedMulti.size > 0 : ans !== null;
  const opts = q.answers.map((a,i) => {
    const sel = q.type === 'single' ? ans === a.weight : selectedMulti.has(i);
    const chk = q.type === 'multiple' ? `<span class="msf-check">${sel?'✓':''}</span>` : '';
    return `<button class="msf-option${sel?' selected':''}" data-idx="${i}" data-weight="${a.weight}">${chk}${esc(a.text)}</button>`;
  }).join('');
  return `
    <div class="msf-q-card">
      <div class="msf-heading">${q.heading}</div>
      <div class="msf-subtitle">${q.subtitle}</div>
      <div class="msf-options-grid" id="msf-options">${opts}</div>
      <div id="msf-insight"></div>
      <div class="msf-q-continue-row">
        <button class="msf-q-continue-btn" id="msf-q-cont-btn" ${canContinue?'':'disabled'}>
          Continue <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>`;
}

function attachOptionListeners(s) {
  attachPanelClose();
  const qIdx = s - STEP_Q0;
  const q    = CONFIG.questions[qIdx];

  const inlineBtn = document.getElementById('msf-q-cont-btn');
  if (inlineBtn && !inlineBtn._b) {
    inlineBtn.addEventListener('click', () => { if (!inlineBtn.disabled) goForward(); });
    inlineBtn._b = true;
  }

  document.querySelectorAll('.msf-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      const w   = parseInt(btn.dataset.weight);

      if (q.type === 'single') {
        answers[qIdx] = w;
        document.querySelectorAll('.msf-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      } else {
        if (selectedMulti.has(idx)) {
          selectedMulti.delete(idx);
          btn.classList.remove('selected');
          const chk = btn.querySelector('.msf-check');
          if (chk) chk.textContent = '';
        } else {
          selectedMulti.add(idx);
          btn.classList.add('selected');
          const chk = btn.querySelector('.msf-check');
          if (chk) chk.textContent = '✓';
        }
        let raw = 0;
        selectedMulti.forEach(i => { raw += q.answers[i].weight; });
        answers[qIdx] = raw;
      }

      const cb = document.getElementById('msf-q-cont-btn');
      if (cb) cb.disabled = false;
      updateContBtn();
      revealInsight(s);
    });
  });
}

function revealInsight(s) {
  const qIdx = s - STEP_Q0;
  const q    = CONFIG.questions[qIdx];
  const show = q.type === 'multiple' ? selectedMulti.size > 0 : answers[qIdx] !== null;
  const c    = document.getElementById('msf-insight');
  if (!c || !show || c.querySelector('.msf-insight')) return;
  c.innerHTML = `
    <div class="msf-insight">
      <div class="msf-insight-label">${q.insight.label}</div>
      <div class="msf-insight-text">${q.insight.text}</div>
    </div>`;
}

/* ── LEAD FORM HTML ── */
function leadFormHTML() {
  const f = CONFIG.leadForm;
  const v = leadData;

  function field(name, type, span) {
    const fd  = f.fields[name];
    const tag = name === 'message';
    const inp = tag
      ? `<textarea class="msf-textarea" id="lf-${name}" name="${name}" rows="4" placeholder="${fd.placeholder}">${escText(v[name])}</textarea>`
      : `<input class="msf-input" id="lf-${name}" name="${name}" type="${type||'text'}" placeholder="${fd.placeholder}" value="${escAttr(v[name])}" autocomplete="${autoC(name)}">`;
    return `<div class="msf-field${span?' msf-field-full':''}">
      <label class="msf-label" for="lf-${name}">${fd.label}<span class="msf-req">*</span></label>
      ${inp}
      <div class="msf-error-msg" data-err="${name}">${errMsg(name)}</div>
    </div>`;
  }

  const isValid = isLeadValid();
  return `
    <div class="msf-heading">${f.heading}</div>
    <div class="msf-subtitle">${f.subtitle}</div>
    <div class="msf-lead-grid">
      ${field('firstName')}${field('lastName')}
      ${field('company','text',true)}
      ${field('email','email')}${field('phone','tel')}
      ${field('message','',true)}
    </div>
    <label class="msf-terms" for="lf-terms">
      <input id="lf-terms" name="terms" type="checkbox" ${v.terms?'checked':''}>
      <span class="msf-terms-box" aria-hidden="true"></span>
      <span class="msf-terms-text">${f.termsText}</span>
    </label>
    <div class="msf-error-msg" data-err="terms" style="margin-top:8px">You must accept the terms to continue.</div>
    <button class="msf-lead-submit-btn" id="msf-lead-submit" ${isValid?'':'disabled'}>
      ${esc(f.submitLabel)} <span aria-hidden="true">→</span>
    </button>`;
}

function renderLeadInPanel() {
  const existingPanel = document.getElementById('msf-panel-content');
  if (existingPanel) {
    swapPanelInner(STEP_LEAD);
  } else {
    const body = document.getElementById('msf-body');
    body.innerHTML = buildLeadScaffold();
    attachPanelClose();
    attachLeadInputListeners();
  }
}

function buildLeadScaffold() {
  const ss = CONFIG.sidebarSteps;
  const stepsHtml = ss.map((l,i) => {
    const cls = 'msf-sidebar-step' + (i < ss.length-1 ? ' done' : ' active');
    return `<div class="${cls}">${esc(l)}</div>`;
  }).join('');
  return `
    <div class="msf-sidebar" id="msf-sidebar">
      <div class="msf-sidebar-brand">${esc(CONFIG.brandShort)}</div>
      <div class="msf-sidebar-steps" id="msf-sidebar-steps">${stepsHtml}</div>
    </div>
    <div class="msf-panel-right">
      <div class="msf-panel-header" id="msf-panel-header">
        <span class="msf-panel-counter" id="msf-panel-counter">${String(TOTAL + 1).padStart(2,'0')} / ${String(TOTAL + 1).padStart(2,'0')}</span>
        <span class="msf-panel-tagline">Unlock your potential</span>
        <button class="msf-panel-close" id="msf-panel-close" aria-label="Close">×</button>
      </div>
      <div class="msf-panel-content" id="msf-panel-content">
        <div class="msf-panel-content-inner fade-in" id="msf-panel-inner">
          <div class="lead-form-main-cont">${leadFormHTML()}</div>
        </div>
      </div>
    </div>`;
}

function attachLeadInputListeners() {
  attachPanelClose();

  ['firstName','lastName','company','email','phone','message'].forEach(name => {
    const el = document.getElementById(`lf-${name}`);
    if (!el) return;
    el.addEventListener('input', () => {
      leadData[name] = el.value;
      el.classList.remove('error');
      const err = document.querySelector(`[data-err="${name}"]`);
      if (err) err.classList.remove('show');
      updateLeadSubmitBtn();
    });
    el.addEventListener('blur', () => {
      if (!validField(name, el.value)) markErr(name, true);
    });
  });

  const terms = document.getElementById('lf-terms');
  if (terms) {
    terms.addEventListener('change', () => {
      leadData.terms = terms.checked;
      const err  = document.querySelector('[data-err="terms"]');
      const wrap = document.querySelector('.msf-terms');
      if (terms.checked) {
        if (err) err.classList.remove('show');
        if (wrap) wrap.classList.remove('error');
      }
      updateLeadSubmitBtn();
    });
  }

  const submitBtn = document.getElementById('msf-lead-submit');
  if (submitBtn && !submitBtn._b) {
    submitBtn.addEventListener('click', () => {
      if (submitBtn.disabled) return;
      if (!validateLead()) return;
      submitLead();
      doOverlayTransition(STEP_RES, 'forward');
    });
    submitBtn._b = true;
  }
}

function updateLeadSubmitBtn() {
  const btn = document.getElementById('msf-lead-submit');
  if (btn) btn.disabled = !isLeadValid();
}

/* ══════════════════════════════════════════
   RESULTS
   ══════════════════════════════════════════ */
function renderResults() {
  const score = calcScore();
  const tier  = getTier(score);

  /* ── CHANGE 1: use fixed tier percentages ── */
  const pct  = tier.maturityPct;
  const opp  = tier.opportunityPct;

  /* ── CHANGE 1: multi-pathway array ── */
  const recs = getRecommendedPathways(tier.type);
  const ctaC = CONFIG.resultsCtas;
  const ps   = CONFIG.pathwaysSection;

  const pathCards = CONFIG.pathways.map(p => {
    const best = recs.includes(p.id);
    return `
      <article class="msf-res-pw-card${best?' best':''}">
        <img class="msf-res-pw-img" src="${p.image||''}" alt="${esc(p.headline)}" loading="lazy">
        <div class="msf-res-pw-body">
          ${best ? `<span class="msf-res-pw-badge">★ Best fit for you</span>` : ''}
          <div class="msf-res-pw-eyebrow">${p.eyebrow}</div>
          <h3 class="msf-res-pw-headline">${esc(p.headline)}</h3>
          <p class="msf-res-pw-desc">${esc(p.desc)}</p>
          <a class="msf-res-pw-cta" href="${p.url}">${best ? 'Explore this pathway' : esc(p.cta)}</a>
        </div>
      </article>`;
  }).join('');

  return `
    <div class="msf-res-page">

      <div class="msf-res-section1">

        <div class="msf-res-section1-topbar-wrap">
          <div class="msf-res-topbar-logo">${CONFIG.brand}</div>
          <button class="msf-res-topbar-close" id="msf-res-close" aria-label="Close">×</button>
        </div>

        <div class="msf-res-title-block">
          <h1 class="msf-res-title">Here is our initial conclusion</h1>
          <p class="msf-res-subtitle">Based on your responses, here's a snapshot of your coaching culture — and where the opportunity lives.</p>
        </div>

        <div class="msf-res-3col">

          <div class="msf-res-col-left">
            <p class="msf-res-col-left-response">${tier.response}</p>
          </div>

          <div class="msf-res-center-card">
            <div class="msf-res-profile-label">Your coachability profile</div>
            <div class="msf-res-type-row">
              <span class="msf-res-type-letter">${tier.type}</span>
              <span class="msf-res-type-name">${tier.label}</span>
            </div>
            <div class="msf-res-score-boxes">
              <div class="msf-res-score-box">
                <div class="msf-res-score-val" id="msf-pct-val">0%</div>
                <div class="msf-res-score-bar">
                  <div class="msf-res-score-bar-fill" id="msf-bar-left" data-target="${pct}"></div>
                </div>
                <div class="msf-res-score-lbl">Current Maturity</div>
              </div>
              <div class="msf-res-score-box">
                <div class="msf-res-score-val" id="msf-opp-val">0%</div>
                <div class="msf-res-score-bar">
                  <div class="msf-res-score-bar-fill" id="msf-bar-right" data-target="${opp}"></div>
                </div>
                <div class="msf-res-score-lbl">Coachability opportunity</div>
              </div>
            </div>
          </div>

          <!-- CHANGE 2 + 3: transparent pill button, recommendation below it, no thanks note -->
          <div class="msf-res-col-right">
            <p class="msf-res-col-right-detail">${tier.detail}</p>
            <p class="msf-res-col-right-cta">${tier.cta}</p>
            <a class="msf-res-start-btn" href="${ctaC.primary.url}">Start now</a>
            <p class="msf-res-col-right-rec">Recommended: ${tier.recommendation}</p>
          </div>

        </div>
      </div>

      <div class="msf-res-section2">
        <div class="card-inner-results-top">
          <div class="msf-res-pw-header">
            <h2 class="msf-res-pw-title">${esc(ps.title)}</h2>
            <p class="msf-res-pw-subtitle">${esc(ps.subtitle)}</p>
          </div>
          <div class="msf-res-pw-grid">${pathCards}</div>
          <div class="msf-res-cta-row">
            <a class="msf-res-cta-btn secondary" href="${ctaC.secondary.url}">${esc(ctaC.secondary.label)}</a>
            <a class="msf-res-cta-btn primary" href="https://calendly.com/coachabilityheather/30min">${esc(ctaC.primary.label)}</a>
          </div>
        </div>
      </div>

    </div>`;
}

function attachResultsListeners() {
  const closeBtn = document.getElementById('msf-res-close');
  if (closeBtn && !closeBtn._b) { closeBtn.addEventListener('click', closeModal); closeBtn._b = true; }
}

function animateBar() {
  setTimeout(() => {
    const barLeft  = document.getElementById('msf-bar-left');
    const barRight = document.getElementById('msf-bar-right');
    const pctEl    = document.getElementById('msf-pct-val');
    const oppEl    = document.getElementById('msf-opp-val');

    const pct = barLeft  ? parseInt(barLeft.dataset.target  || '0') : 0;
    const opp = barRight ? parseInt(barRight.dataset.target || '0') : 0;

    if (barLeft)  barLeft.style.width  = pct + '%';
    if (barRight) barRight.style.width = opp + '%';

    const duration = 70;
    let frame = 0;
    const tick = setInterval(() => {
      frame++;
      const progress = frame / duration;
      const ease = 1 - Math.pow(1 - progress, 3);
      if (pctEl) pctEl.textContent = Math.round(ease * pct) + '%';
      if (oppEl) oppEl.textContent = Math.round(ease * opp) + '%';
      if (frame >= duration) {
        clearInterval(tick);
        if (pctEl) pctEl.textContent = pct + '%';
        if (oppEl) oppEl.textContent = opp + '%';
      }
    }, 16);
  }, 120);
}

/* ── SCORING ── */
function normalizeQ5(raw) {
  if (raw === 0) return 1;
  if (raw <= 2)  return 2;
  if (raw <= 4)  return 3;
  return 4;
}
function calcScore() {
  let t = 0;
  CONFIG.questions.forEach((q,i) => {
    const a = answers[i];
    if (a == null) return;
    t += q.type === 'multiple' ? normalizeQ5(a) : a;
  });
  return t;
}
function getTier(score) {
  return CONFIG.tiers.find(t => score >= t.scoreMin && score <= t.scoreMax) || CONFIG.tiers[0];
}

/* ── CHANGE 1: multi-pathway recommendation logic ── */
function getRecommendedPathways(tierType) {
  if (tierType === 'A') return ['coaches', 'coachees'];
  if (tierType === 'B') return ['coaches', 'coachees'];
  if (tierType === 'C') return ['coachees'];
  if (tierType === 'D') return ['coachees', 'peer', 'elite'];
  return ['coachees'];
}

/* ── NAVIGATION ── */
function goForward() {
  if (step === 0)          { doTransition(STEP_START); return; }
  if (step === STEP_START) { doTransition(STEP_Q0);    return; }

  if (step >= STEP_Q0 && step < STEP_LEAD) {
    const nextStep = step + 1;
    selectedMulti = new Set();
    step = nextStep;
    if (nextStep === STEP_LEAD) {
      swapPanelInner(STEP_LEAD);
    } else {
      updateFooterForQ(nextStep);
      swapPanelInner(nextStep);
    }
    return;
  }
}

function goBack() {
  if (step === STEP_LEAD) {
    const prevStep = STEP_Q0 + TOTAL - 1;
    selectedMulti = new Set();
    step = prevStep;
    updateFooterForQ(prevStep);
    swapPanelInner(prevStep);
    return;
  }
  if (step > STEP_Q0 && step < STEP_LEAD) {
    const prevStep = step - 1;
    selectedMulti = new Set();
    step = prevStep;
    updateFooterForQ(prevStep);
    swapPanelInner(prevStep);
    return;
  }
}

function updateFooterForQ(s) {
  const back = document.getElementById('msf-back');
  const cont = document.getElementById('msf-continue');
  if (!back || !cont) return;
  const isFirstQ = s === STEP_Q0;
  back.className = isFirstQ ? 'msf-btn-back' : 'msf-btn-back active';
  back.disabled  = isFirstQ;
  cont.style.display = 'none';
}

function doTransition(newStep) {
  const body = document.getElementById('msf-body');
  body.classList.remove('fade-in');
  body.classList.add('fade-out-fwd');
  setTimeout(() => {
    body.classList.remove('fade-out-fwd');
    renderStep(newStep);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => body.classList.add('fade-in'));
    });
  }, 220);
}

function doOverlayTransition(newStep) {
  const body = document.getElementById('msf-body');
  body.classList.remove('fade-in');
  body.classList.add('fade-out-fwd');
  setTimeout(() => {
    body.classList.remove('fade-out-fwd');
    renderStep(newStep);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => body.classList.add('fade-in'));
    });
  }, 220);
}

/* ── VALIDATION ── */
function validField(n, v) {
  if (n === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v||'').trim());
  return (v||'').trim().length > 0;
}
function markErr(n, on) {
  const el  = document.querySelector(`[name="${n}"]`);
  const err = document.querySelector(`[data-err="${n}"]`);
  if (el)  el.classList.toggle('error', on);
  if (err) err.classList.toggle('show', on);
}
function isLeadValid() {
  return ['firstName','lastName','company','email','phone','message'].every(n => validField(n, leadData[n])) && leadData.terms;
}
function validateLead() {
  let ok = true;
  ['firstName','lastName','company','email','phone','message'].forEach(n => {
    const v = validField(n, leadData[n]);
    markErr(n, !v);
    if (!v) ok = false;
  });
  if (!leadData.terms) {
    const err  = document.querySelector('[data-err="terms"]');
    const wrap = document.querySelector('.msf-terms');
    if (err) err.classList.add('show');
    if (wrap) wrap.classList.add('error');
    ok = false;
  }
  return ok;
}

function updateContBtn() {
  const cont = document.getElementById('msf-continue');
  if (!cont) return;
  if (step === 0 || step === STEP_START) { cont.disabled = false; return; }
  if (step >= STEP_RES)                 { cont.disabled = true;  return; }
  const qIdx = step - STEP_Q0;
  const q    = CONFIG.questions[qIdx];
  if (q) cont.disabled = q.type === 'multiple' ? selectedMulti.size === 0 : answers[qIdx] === null;
}

function submitLead() {
  if (!CONFIG.submitUrl) return;
  fetch(CONFIG.submitUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...leadData, score: calcScore(), tier: getTier(calcScore()).type, answers }),
  }).catch(() => {});
}

/* ── UTILS ── */
function esc(s)     { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') }
function escAttr(s) { return esc(s).replace(/"/g,'&quot;') }
function escText(s) { return esc(s) }
function autoC(n)   { return {firstName:'given-name',lastName:'family-name',company:'organization',email:'email',phone:'tel',message:'off'}[n]||'off' }
function errMsg(n)  { return {firstName:'Please enter your first name.',lastName:'Please enter your last name.',company:'Please enter your company name.',email:'Please enter a valid email.',phone:'Please enter your phone number.',message:'Please share a short message.'}[n]||'' }

/* ── KEYBOARD ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const ov = document.getElementById('msf-overlay');
    if (ov && ov.style.display !== 'none') closeModal();
  }
});

/* ── TRIGGERS ── */
function bindTriggers() {
  document.querySelectorAll('[data-msf-open]').forEach(el => {
    if (!el._msfTrigger) { el.addEventListener('click', openModal); el._msfTrigger = true; }
  });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindTriggers);
else bindTriggers();
const _obs = new MutationObserver(bindTriggers);
_obs.observe(document.body, { childList:true, subtree:true });

window.msfOpen  = openModal;
window.msfClose = closeModal;

})();
