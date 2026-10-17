import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
const lessons = [
  {
    n: "01",
    tag: "THE BASICS",
    title: "Give every naira a job.",
    time: "4 MIN",
    color: "orange",
    body: "A budget is a plan for the money you already have.",
    detail:
      "Start with what comes in, what must go out, and what matters to you. The goal is not to track every kobo forever. It is to stop wondering where your money went.",
    points: [
      "Write down income you can rely on.",
      "List essentials before flexible spending.",
      "Give saving a place in the plan, even if it starts small.",
    ],
  },
  {
    n: "02",
    tag: "BUILD A BUFFER",
    title: "Make room for the unexpected.",
    time: "5 MIN",
    color: "blue",
    body: "A small emergency fund can give you more options when life changes.",
    detail:
      "A buffer is money you can reach when something goes wrong: a sudden repair, an urgent trip, or a delayed payment. Start with a target that feels possible, then build it in small steps.",
    points: [
      "Choose a first milestone you can reach.",
      "Keep it separate from everyday spending.",
      "Replenish it when you need to use it.",
    ],
  },
  {
    n: "03",
    tag: "THE LONG GAME",
    title: "Let time do some work.",
    time: "6 MIN",
    color: "lime",
    body: "Compounding means growth can earn growth of its own.",
    detail:
      "When returns stay invested, future returns can build on earlier gains. This can be powerful over long periods, but real investment returns vary and can be negative. No chart can promise what happens next.",
    points: [
      "Start with an amount you can sustain.",
      "Understand fees, risk and your time horizon.",
      "Never treat an assumed return as guaranteed.",
    ],
  },
  {
    n: "04",
    tag: "BORROW WITH EYES OPEN",
    title: "Know what debt really costs.",
    time: "5 MIN",
    color: "pink",
    body: "Interest and fees are part of the price, too.",
    detail:
      "Before borrowing, look beyond the monthly payment. Compare the total amount repaid, the interest rate, fees, penalties, and what happens if your income changes.",
    points: [
      "Compare total repayment, not just instalments.",
      "Read the late-payment terms.",
      "Borrow for a reason, not because credit is available.",
    ],
  },
];
const money = (v) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Number.isFinite(v) ? v : 0));
function calculate(principal, monthly, years, annual) {
  const n = years * 12,
    r = Math.pow(1 + annual / 100, 1 / 12) - 1;
  let balance = principal;
  const history = [{ year: 0, balance, invested: principal }];
  for (let m = 1; m <= n; m++) {
    balance = balance * (1 + r) + monthly;
    if (m % 12 === 0)
      history.push({
        year: m / 12,
        balance,
        invested: principal + monthly * m,
      });
  }
  return { balance, invested: principal + monthly * n, history };
}
function App() {
  const [intro, setIntro] = useState(true);
  const [amount, setAmount] = useState(25000),
    [monthly, setMonthly] = useState(15000),
    [years, setYears] = useState(10),
    [rate, setRate] = useState(8);
  const [lesson, setLesson] = useState(null),
    [done, setDone] = useState([]),
    [menu, setMenu] = useState(false),
    [quiz, setQuiz] = useState(false),
    [answer, setAnswer] = useState(""),
    [checked, setChecked] = useState(false);
  const result = useMemo(
    () => calculate(amount, monthly, years, rate),
    [amount, monthly, years, rate],
  );
  const profit = result.balance - result.invested;
  useEffect(() => {
    if (!intro) return;
    const t = setTimeout(() => {
      setIntro(false);
      try {
        sessionStorage.setItem("compound-intro", "1");
      } catch {}
    }, 3650);
    return () => clearTimeout(t);
  }, [intro]);
  useEffect(() => {
    if (intro) return;
    const nodes = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [intro]);
  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };
  const markDone = (n) => {
    setDone((old) => (old.includes(n) ? old : [...old, n]));
    setLesson(null);
  };
  return (
    <div className="site">
      {intro && (
        <div className="intro" aria-label="COMPOUND introduction">
          <div className="intro-top">
            <span>
              COMPOUND<span className="intro-mark">®</span>
            </span>
          </div>
          <div className="intro-stage">
            <div className="intro-flare" />
            <div className="intro-orbit intro-orbit-one" />
            <div className="intro-orbit intro-orbit-two" />
            <div className="intro-planet">
              <span />
            </div>
            <div className="intro-title">
              <h1 aria-label="COMPOUND">
                <span>C</span>
                <span>O</span>
                <span>M</span>
                <span>P</span>
                <span>O</span>
                <span>U</span>
                <span>N</span>
                <span>D</span>
                <sup>®</sup>
              </h1>
            </div>
            <div className="intro-floor" />
          </div>
          <div className="intro-bottom">
            <div className="intro-track">
              <i />
            </div>
          </div>
        </div>
      )}
      <header className="nav">
        <button
          className="wordmark"
          onClick={() => go("top")}
          aria-label="Compound home"
        >
          C<span>°</span>MP<span className="wordmark-dot">.</span>
        </button>
        <nav className={menu ? "nav-links open" : "nav-links"}>
          <button onClick={() => go("school")}>THE SCHOOL</button>
          <button onClick={() => go("lab")}>GROWTH LAB</button>
          <button onClick={() => go("fieldnotes")}>FIELD NOTES</button>
        </nav>
        <button className="nav-cta" onClick={() => go("school")}>
          START LEARNING ↗
        </button>
        <button
          className="mobile-menu"
          onClick={() => setMenu((v) => !v)}
          aria-label="Toggle navigation"
        >
          {menu ? "✕" : "☰"}
        </button>
      </header>
      <main id="top">
        <section className="hero">
          <div className="hero-grid" />
          <div
            className={`hero-main ${intro ? "hero-waiting" : "hero-revealed"}`}
          >
            <div className="hero-title-wrap">
              <p className="eyebrow">YOUR MONEY HAS A NEXT CHAPTER.</p>
              <h1>
                Make money
                <br />
                <em>make sense.</em>
              </h1>
              <p className="hero-copy">
                Less money mystery. More moves you understand. Learn the basics,
                test the maths, build your own point of view.
              </p>
              <button className="black-button" onClick={() => go("school")}>
                GET INTO IT <span>↘</span>
              </button>
            </div>
           
          </div>
        
        </section>
        <section className="ticker" aria-label="Topics">
          <div className="ticker-track">
            {Array.from({ length: 4 }, (_, i) => (
              <span key={i}>
                SAVE WITH INTENTION <b>✳</b> UNDERSTAND INTEREST <b>✳</b> INVEST
                WITH CONTEXT <b>✳</b> ASK BETTER QUESTIONS <b>✳</b>
              </span>
            ))}
          </div>
        </section>
        <section className="school section-pad" id="school">
          <div className="section-heading" data-reveal>
            <div>
              <h2>
                Money stuff.
                <br />
                <em>Made less weird.</em>
              </h2>
            </div>
            <p className="section-intro">
              Four short lessons. Real-life concepts. No finance-bro vocabulary
              test.
            </p>
          </div>
          <div className="lesson-list">
            {lessons.map((l, i) => (
              <button
                className={`lesson-row ${l.color}`}
                key={l.n}
                onClick={() => setLesson(l)}
                data-reveal
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="lesson-number">{l.n}</span>
                <span className="lesson-info">
                  <span className="lesson-tag">{l.tag}</span>
                  <strong>{l.title}</strong>
                  <span className="lesson-body">{l.body}</span>
                </span>
                <span className="lesson-time">◷ &nbsp;{l.time}</span>
                <span className="lesson-action">
                  {done.includes(l.n) ? "✓" : "↗"}
                </span>
              </button>
            ))}
          </div>
          <div className="school-bottom">
            <span>
              {done.length} / {lessons.length} LESSONS COMPLETE
            </span>
            <div className="progress-line">
              <i
                style={{ width: `${(done.length / lessons.length) * 100}%` }}
              />
            </div>
            <button className="text-link" onClick={() => setQuiz(true)}>
              TEST YOUR INSTINCTS →
            </button>
          </div>
        </section>
        <section className="lab" id="lab">
          
          <div className="lab-heading" data-reveal>
            <h2>
              Small deposits.
              <br />
              <em>Long shadows.</em>
            </h2>
            <p>
              Explore how regular contributions and assumed returns can add up
              over time. Change one thing and watch the picture move.
            </p>
          </div>
          <div className="lab-layout">
            <div className="controls">
              <Range
                label="STARTING AMOUNT"
                value={amount}
                min={0}
                max={1000000}
                step={5000}
                format={money}
                onChange={setAmount}
                minLabel="₦0"
                maxLabel="₦1,000,000"
              />
              <Range
                label="MONTHLY ADDITION"
                value={monthly}
                min={0}
                max={200000}
                step={5000}
                format={money}
                onChange={setMonthly}
                minLabel="₦0"
                maxLabel="₦200,000"
              />
              <Range
                label="TIME HORIZON"
                value={years}
                min={1}
                max={40}
                step={1}
                format={(v) => `${v} ${v === 1 ? "year" : "years"}`}
                onChange={setYears}
                minLabel="1 year"
                maxLabel="40 years"
              />
              <Range
                label="ASSUMED ANNUAL RETURN"
                value={rate}
                min={0}
                max={15}
                step={0.5}
                format={(v) => `${Number(v).toFixed(1)}%`}
                onChange={setRate}
                minLabel="0%"
                maxLabel="15%"
                note="An adjustable assumption, not a prediction or guaranteed rate."
              />
              <button
                className="reset-button"
                onClick={() => {
                  setAmount(25000);
                  setMonthly(15000);
                  setYears(10);
                  setRate(8);
                }}
              >
                ↺ &nbsp; RESET EXAMPLE
              </button>
            </div>
            <div className="chart-panel">
              <div className="chart-top">
                <span>YOUR ILLUSTRATIVE OUTCOME</span>
                <span className="chart-live">
                  <i /> LIVE CALCULATION
                </span>
              </div>
              <div className="big-number">{money(result.balance)}</div>
              <div className="big-caption">
                Possible future balance after {years}{" "}
                {years === 1 ? "year" : "years"} <span>↗</span>
              </div>
              <GrowthChart history={result.history} total={result.balance} />
              <div className="chart-years">
                <span>NOW</span>
                <span>YEAR {Math.max(1, Math.round(years / 2))}</span>
                <span>YEAR {years}</span>
              </div>
              <div className="chart-legend">
                <span>
                  <i className="legend-lime" />
                  TOTAL CONTRIBUTIONS <b>{money(result.invested)}</b>
                </span>
                <span>
                  <i className="legend-black" />
                  ILLUSTRATIVE GROWTH <b>{money(Math.max(0, profit))}</b>
                </span>
              </div>
              <p className="chart-disclaimer">
                Assumes a monthly rate derived from the selected annual return
                and contributions at each month-end. Excludes taxes, fees,
                inflation and market volatility. Actual results may be lower or
                negative.
              </p>
            </div>
          </div>
        </section>
        <section className="fieldnotes section-pad" id="fieldnotes">
          <div className="notes-top" data-reveal>
            <div>
              <h2>
                Keep your
                <br />
                <em>head in it.</em>
              </h2>
            </div>
           
          </div>
          <div className="notes-grid">
            <article className="note-card note-dark" data-reveal>
              <div className="note-symbol">₦</div>
              <span className="note-kicker">THE REALITY CHECK / 01</span>
              <h3>
                Saving is a habit.
                <br />
                Investing is a risk.
              </h3>
              <p>
                They can serve different jobs. Know what you need your money to
                do before deciding where it belongs.
              </p>
              <button onClick={() => setLesson(lessons[1])}>
                START WITH SAVING ↗
              </button>
              <span className="note-index">01</span>
            </article>
            <article className="note-card note-lime" data-reveal>
              <div className="note-symbol">✳</div>
              <span className="note-kicker">THE LONG VIEW / 02</span>
              <h3>
                Returns aren't
                <br />
                promises.
              </h3>
              <p>
                Every investment carries risk. High returns with little or no
                risk are a warning sign, not a shortcut.
              </p>
              <button onClick={() => setLesson(lessons[2])}>
                UNDERSTAND GROWTH ↗
              </button>
              <span className="note-index">02</span>
            </article>
            <article className="note-card note-orange" data-reveal>
              <div className="note-symbol">↗</div>
              <span className="note-kicker">THE NEXT STEP / 03</span>
              <h3>
                Ask the question
                <br />
                behind the question.
              </h3>
              <p>
                What does it cost? What could go wrong? Who benefits if I say
                yes? Curiosity is a money skill.
              </p>
              <button
                onClick={() => {
                  setQuiz(true);
                  setChecked(false);
                  setAnswer("");
                }}
              >
                TRY A QUICK CHECK ↗
              </button>
              <span className="note-index">03</span>
            </article>
          </div>
        </section>
        <section className="closing">
          <div className="closing-stamp">
            C<span>°</span>
          </div>
          <p className="eyebrow">YOU DON'T NEED TO KNOW EVERYTHING.</p>
          <h2>
            Just make your
            <br />
            <em>next move clearer.</em>
          </h2>
          <button className="black-button" onClick={() => go("school")}>
            TAKE THE FIRST STEP ↗
          </button>
          <div className="closing-orbit" />
        </section>
      </main>
      <footer className="footer">
        <button className="wordmark" onClick={() => go("top")}>
          C<span>°</span>MP<span className="wordmark-dot">.</span>
        </button>
        <span>AN INDEPENDENT MONEY SCHOOL.</span>
        <span>EDUCATION, NOT PERSONAL FINANCIAL ADVICE.</span>
        <span>© COMPOUND 2026</span>
      </footer>
      {lesson && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setLesson(null);
          }}
        >
          <article className="lesson-modal">
            <button
              className="modal-close"
              onClick={() => setLesson(null)}
              aria-label="Close lesson"
            >
              ✕
            </button>
            <p className="eyebrow">
              {lesson.n} / {lesson.tag}
            </p>
            <h2>{lesson.title}</h2>
            <p className="modal-lead">{lesson.body}</p>
            <p>{lesson.detail}</p>
            <ul>
              {lesson.points.map((p) => (
                <li key={p}>
                  <span>✓</span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="modal-footer">
              <span>◷ &nbsp;{lesson.time} READ</span>
              <button
                className="black-button"
                onClick={() => markDone(lesson.n)}
              >
                {done.includes(lesson.n) ? "LESSON COMPLETED" : "MARK AS READ"}{" "}
                <span>✓</span>
              </button>
            </div>
          </article>
        </div>
      )}
      {quiz && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setQuiz(false);
              setChecked(false);
              setAnswer("");
            }
          }}
        >
          <article className="lesson-modal quiz-modal">
            <button
              className="modal-close"
              onClick={() => {
                setQuiz(false);
                setChecked(false);
                setAnswer("");
              }}
              aria-label="Close quiz"
            >
              ✕
            </button>
            <p className="eyebrow">QUICK CHECK / 01</p>
            <h2>Which sounds more realistic?</h2>
            <p className="modal-lead">
              Someone promises a high investment return with no risk. What
              should you do?
            </p>
            {!checked ? (
              <div className="quiz-options">
                <button
                  className={answer === "a" ? "chosen" : ""}
                  onClick={() => setAnswer("a")}
                >
                  A. Move quickly before the opportunity disappears.
                </button>
                <button
                  className={answer === "b" ? "chosen" : ""}
                  onClick={() => setAnswer("b")}
                >
                  B. Treat it as a red flag and investigate carefully.
                </button>
                <button
                  className={answer === "c" ? "chosen" : ""}
                  onClick={() => setAnswer("c")}
                >
                  C. Assume the promise is safe if it looks professional.
                </button>
                <button
                  className="black-button"
                  disabled={!answer}
                  onClick={() => setChecked(true)}
                >
                  CHECK ANSWER →
                </button>
              </div>
            ) : (
              <div className="quiz-result">
                <span className="result-icon">
                  {answer === "b" ? "✓" : "?"}
                </span>
                <h3>
                  {answer === "b" ? "Exactly." : "Not quite. Be careful."}
                </h3>
                <p>
                  Promises of high returns with little or no risk are a common
                  warning sign of investment fraud. Slow down, verify claims and
                  never invest money you cannot afford to lose.
                </p>
                <button
                  className="black-button"
                  onClick={() => {
                    setQuiz(false);
                    setChecked(false);
                    setAnswer("");
                  }}
                >
                  GOT IT →
                </button>
              </div>
            )}
          </article>
        </div>
      )}
    </div>
  );
}
function Range({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
  minLabel,
  maxLabel,
  note,
}) {
  const id = label.toLowerCase().replaceAll(" ", "-");
  return (
    <div className="control-item">
      <div className="control-label">
        <label htmlFor={id}>{label}</label>
        <output className="control-value" htmlFor={id}>
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="range-limits">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
      {note && <p className="control-note">ⓘ &nbsp;{note}</p>}
    </div>
  );
}
function GrowthChart({ history, total }) {
  const max = Math.max(total, 1),
    x = (i) => (history.length === 1 ? 0 : (i / (history.length - 1)) * 640),
    y = (v) => 235 - (v / max) * 190;
  const path = (key) =>
    history.map((d, i) => `${i ? "L" : "M"} ${x(i)} ${y(d[key])}`).join(" ");
  const area = `${path("balance")} ${history
    .slice()
    .reverse()
    .map((d, i) => `L ${x(history.length - 1 - i)} ${y(d.invested)}`)
    .join(" ")} Z`;
  return (
    <svg
      className="growth-chart"
      viewBox="0 0 640 245"
      role="img"
      aria-label="Illustrative growth chart showing contributions and assumed growth"
      preserveAspectRatio="none"
    >
      {[35, 85, 135, 185, 235].map((v) => (
        <line
          key={v}
          x1="0"
          y1={v}
          x2="640"
          y2={v}
          className="chart-gridline"
        />
      ))}
      <path d={area} className="chart-area" />
      <path d={path("invested")} className="chart-invested" />
      <path d={path("balance")} className="chart-growth" />
      <circle cx="640" cy={y(total)} r="5" className="chart-end" />
    </svg>
  );
}
createRoot(document.getElementById("root")).render(<App />);
