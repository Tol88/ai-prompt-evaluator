import { useState } from "react";
import Landing from "./Landing";

import {
  evaluateV1,
  evaluateV2,
  getV1Score,
  getV1Feedback,
  getV2Score,
  getV2Clarity,
  getV2Specificity,
  getV2Context,
  getV2Usefulness,
  getV2Feedback,
  getV2ImprovedPrompt,
} from "./contract";

function App() {
  const [prompt, setPrompt] = useState("");

  const [wallet, setWallet] = useState("");

  const [v1, setV1] = useState({
    score: null,
    feedback: "",
    txHash: "",
  });

  const [v2, setV2] = useState({
    score: null,
    clarity: null,
    specificity: null,
    context: null,
    usefulness: null,
    feedback: "",
    improvedPrompt: "",
    txHash: "",
  });

  const [loadingV1, setLoadingV1] =
    useState(false);

  const [loadingV2, setLoadingV2] =
    useState(false);

  const [status, setStatus] = useState("");

  const [theme, setTheme] = useState("light");

  const [showApp, setShowApp] = useState(false);

  // =====================================================
  // CONNECT WALLET
  // =====================================================

  async function connectWallet() {
    try {
      if (!window.ethereum) {
        throw new Error(
          "MetaMask tidak ditemukan."
        );
      }

      const accounts =
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

      setWallet(accounts[0]);
      setStatus("Wallet connected.");
    } catch (error) {
      setStatus(error.message);
    }
  }

  function disconnectWallet() {
    setWallet("");
    setStatus("Wallet disconnected.");
  }

  function toggleTheme() {
    setTheme((current) =>
      current === "light" ? "dark" : "light"
    );
  }

  // =====================================================
  // GET WALLET
  // =====================================================

  async function ensureWallet() {
    if (wallet) {
      return wallet;
    }

    if (!window.ethereum) {
      throw new Error(
        "MetaMask tidak ditemukan."
      );
    }

    const accounts =
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

    setWallet(accounts[0]);

    return accounts[0];
  }

  // =====================================================
  // V1
  // =====================================================

  async function handleV1() {
    if (!prompt.trim()) {
      setStatus(
        "Please enter a prompt first."
      );
      return;
    }

    try {
      setLoadingV1(true);
      setStatus(
        "V1: Sending prompt to GenLayer..."
      );

      const currentWallet =
        await ensureWallet();

      const result = await evaluateV1(
        prompt,
        currentWallet
      );

      setStatus(
        "V1: Consensus accepted. Reading result..."
      );

      const [score, feedback] =
        await Promise.all([
          getV1Score(),
          getV1Feedback(),
        ]);

      setV1({
        score: Number(score),
        feedback: String(feedback),
        txHash: result.txHash,
      });

      setStatus("V1 evaluation complete.");
    } catch (error) {
      console.error(error);

      setStatus(
        error?.message ||
          "V1 evaluation failed."
      );
    } finally {
      setLoadingV1(false);
    }
  }

  // =====================================================
  // V2
  // =====================================================

  async function handleV2() {
    if (!prompt.trim()) {
      setStatus(
        "Please enter a prompt first."
      );
      return;
    }

    try {
      setLoadingV2(true);
      setStatus(
        "V2: Sending prompt to GenLayer..."
      );

      const currentWallet =
        await ensureWallet();

      const result = await evaluateV2(
        prompt,
        currentWallet
      );

      setStatus(
        "V2: Consensus accepted. Reading analysis..."
      );

      const [
        score,
        clarity,
        specificity,
        context,
        usefulness,
        feedback,
        improvedPrompt,
      ] = await Promise.all([
        getV2Score(),
        getV2Clarity(),
        getV2Specificity(),
        getV2Context(),
        getV2Usefulness(),
        getV2Feedback(),
        getV2ImprovedPrompt(),
      ]);

      setV2({
        score: Number(score),
        clarity: Number(clarity),
        specificity: Number(specificity),
        context: Number(context),
        usefulness: Number(usefulness),
        feedback: String(feedback),
        improvedPrompt:
          String(improvedPrompt),
        txHash: result.txHash,
      });

      setStatus("V2 evaluation complete.");
    } catch (error) {
      console.error(error);

      setStatus(
        error?.message ||
          "V2 evaluation failed."
      );
    } finally {
      setLoadingV2(false);
    }
  }

  // =====================================================
  // RESET RESULTS
  // =====================================================

  function resetResults() {
    setV1({
      score: null,
      feedback: "",
      txHash: "",
    });

    setV2({
      score: null,
      clarity: null,
      specificity: null,
      context: null,
      usefulness: null,
      feedback: "",
      improvedPrompt: "",
      txHash: "",
    });

    setStatus("");
  }

  // =====================================================
  // USE IMPROVED PROMPT
  // =====================================================

  function useImprovedPrompt() {
    if (!v2.improvedPrompt) return;

    setPrompt(v2.improvedPrompt);

    resetResults();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setStatus(
      "Improved prompt loaded. Ready for another evaluation."
    );
  }

  // =====================================================
  // EXAMPLES
  // =====================================================

  function useExample(text) {
    setPrompt(text);
    resetResults();
  }

  if (!showApp) {
    return (
      <Landing
        onLaunch={() => {
          setShowApp(true);

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      />
    );
  }

  return (
    <div className={`app theme-${theme}`}>

      {/* NAVIGATION */}

      <header className="navbar">

        <div className="brand">
          <div className="brand-mark">
            P
          </div>

          <div>
            <strong>PromptEval</strong>
            <span>AI Prompt Quality</span>
          </div>
        </div>

        <div className="nav-right">

          <button
            type="button"
            className="back-button"
            onClick={() => {
              setShowApp(false);

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            ← About
          </button>

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "☾" : "☀"}
          </button>

          <span className="network-badge">
            GENLAYER · BRADBURY
          </span>

          <div className="wallet-shell">
            <button
              type="button"
              className="wallet-button"
              onClick={wallet ? undefined : connectWallet}
            >
              <span className="wallet-status-dot" />

              {wallet
                ? `${wallet.slice(
                    0,
                    6
                  )}...${wallet.slice(-4)}`
                : "Connect Wallet"}
            </button>

            {wallet && (
              <button
                type="button"
                className="disconnect-button"
                onClick={disconnectWallet}
              >
                Disconnect
              </button>
            )}
          </div>

        </div>

      </header>

      <main>

        {/* HERO */}

        <section className="hero">

          <span className="eyebrow">
            POWERED BY GENLAYER
          </span>

          <h1>
            Build better prompts
            <br />
            <span>Get better results</span>
          </h1>

          <p>
            Evaluate prompt quality with
            AI consensus understand what
            can be improved and generate
            a stronger version of your prompt
          </p>

        </section>

        {/* PROMPT INPUT */}

        <section className="prompt-section">

          <div className="section-top">

            <div>
              <span className="section-label">
                YOUR PROMPT
              </span>

              <h2>
                What do you want to evaluate
              </h2>
            </div>

            <span className="character-count">
              {prompt.length} characters
            </span>

          </div>

          <textarea
            value={prompt}
            onChange={(e) =>
              setPrompt(e.target.value)
            }
            placeholder="Write a prompt you want to evaluate"
          />

          <div className="examples">

            <span>Examples</span>

            <button
              onClick={() =>
                useExample(
                  "Write a short explanation about blockchain for beginners"
                )
              }
            >
              Blockchain
            </button>

            <button
              onClick={() =>
                useExample(
                  "Create a landing page for a decentralized finance application"
                )
              }
            >
              Landing Page
            </button>

            <button
              onClick={() =>
                useExample(
                  "Explain smart contracts to someone who has never used cryptocurrency"
                )
              }
            >
              Smart Contracts
            </button>

          </div>

        </section>

        {/* V1 / V2 */}

        <section className="evaluators">

          {/* V1 */}

          <article className="evaluator-card">

            <div className="card-top">

              <div>
                <span className="version">
                  VERSION 01
                </span>

                <h2>
                  Basic Evaluator
                </h2>

                <p>
                  Simple prompt quality
                  evaluation
                </p>
              </div>

              <span className="version-number">
                V1
              </span>

            </div>

            <button
              className="primary-button"
              onClick={handleV1}
              disabled={loadingV1}
            >
              {loadingV1
                ? "Evaluating..."
                : "Evaluate with V1 →"}
            </button>

            {v1.score !== null && (

              <div className="result">

                <div className="score-block">

                  <span>OVERALL SCORE</span>

                  <strong>
                    {v1.score}
                    <small>/10</small>
                  </strong>

                </div>

                <div className="divider" />

                <div className="feedback">

                  <span>AI FEEDBACK</span>

                  <p>
                    {v1.feedback}
                  </p>

                </div>

                {v1.txHash && (
                  <div className="tx">
                    <span>
                      TRANSACTION
                    </span>

                    <code>
                      {v1.txHash.slice(
                        0,
                        12
                      )}
                      ...
                      {v1.txHash.slice(-10)}
                    </code>
                  </div>
                )}

              </div>
            )}

          </article>

          {/* V2 */}

          <article className="evaluator-card v2-card">

            <div className="card-top">

              <div>
                <span className="version">
                  VERSION 02
                </span>

                <h2>
                  Advanced Evaluator
                </h2>

                <p>
                  Detailed analysis and
                  prompt improvement
                </p>
              </div>

              <span className="version-number">
                V2
              </span>

            </div>

            <button
              className="primary-button dark-button"
              onClick={handleV2}
              disabled={loadingV2}
            >
              {loadingV2
                ? "Analyzing..."
                : v2.score !== null
                  ? "Evaluate Again →"
                  : "Evaluate with V2 →"}
            </button>

            {v2.score !== null && (

              <div className="result">

                <div className="score-block">

                  <span>OVERALL SCORE</span>

                  <strong>
                    {v2.score}
                    <small>/10</small>
                  </strong>

                </div>

                {/* BREAKDOWN */}

                <div className="breakdown">

                  <div className="metric">
                    <div>
                      <span>Clarity</span>
                      <b>
                        {v2.clarity}/10
                      </b>
                    </div>

                    <div className="bar">
                      <i
                        style={{
                          width: `${v2.clarity * 10}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="metric">
                    <div>
                      <span>
                        Specificity
                      </span>
                      <b>
                        {v2.specificity}/10
                      </b>
                    </div>

                    <div className="bar">
                      <i
                        style={{
                          width: `${v2.specificity * 10}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="metric">
                    <div>
                      <span>Context</span>
                      <b>
                        {v2.context}/10
                      </b>
                    </div>

                    <div className="bar">
                      <i
                        style={{
                          width: `${v2.context * 10}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="metric">
                    <div>
                      <span>
                        Usefulness
                      </span>
                      <b>
                        {v2.usefulness}/10
                      </b>
                    </div>

                    <div className="bar">
                      <i
                        style={{
                          width: `${v2.usefulness * 10}%`,
                        }}
                      />
                    </div>
                  </div>

                </div>

                <div className="divider" />

                {/* FEEDBACK */}

                <div className="feedback">

                  <span>AI FEEDBACK</span>

                  <p>
                    {v2.feedback}
                  </p>

                </div>

                {/* IMPROVED PROMPT */}

                {v2.improvedPrompt && (

                  <div className="improved">

                    <div className="improved-header">

                      <span>
                        ✦ IMPROVED PROMPT
                      </span>

                      <small>
                        AI-generated improvement
                      </small>

                    </div>

                    <p>
                      {v2.improvedPrompt}
                    </p>

                    <button
                      onClick={useImprovedPrompt}
                    >
                      Use Improved Prompt →
                    </button>

                  </div>

                )}

                {v2.txHash && (
                  <div className="tx">
                    <span>
                      TRANSACTION
                    </span>

                    <code>
                      {v2.txHash.slice(
                        0,
                        12
                      )}
                      ...
                      {v2.txHash.slice(-10)}
                    </code>
                  </div>
                )}

              </div>
            )}

          </article>

        </section>

        {/* V1 VS V2 COMPARISON */}

        {v1.score !== null && v2.score !== null && (
          <section className="comparison">

            <div className="section-title">
              <span>COMPARISON</span>

              <h2>
                V1 vs V2
              </h2>

              <p>
                See how the advanced evaluator expands
                on the basic evaluation
              </p>
            </div>

            <div className="comparison-card">

              {/* HEADER */}

              <div className="comparison-row comparison-header">

                <div>
                  METRIC
                </div>

                <div>
                  V1
                </div>

                <div>
                  V2
                </div>

              </div>

              {/* SCORE */}

              <div className="comparison-row">

                <div>
                  Overall Score
                </div>

                <div className="comparison-value">
                  {v1.score}/10
                </div>

                <div className="comparison-value">
                  {v2.score}/10
                </div>

              </div>

              {/* CLARITY */}

              <div className="comparison-row">

                <div>
                  Clarity
                </div>

                <div className="comparison-muted">
                  —
                </div>

                <div className="comparison-value">
                  {v2.clarity}/10
                </div>

              </div>

              {/* SPECIFICITY */}

              <div className="comparison-row">

                <div>
                  Specificity
                </div>

                <div className="comparison-muted">
                  —
                </div>

                <div className="comparison-value">
                  {v2.specificity}/10
                </div>

              </div>

              {/* CONTEXT */}

              <div className="comparison-row">

                <div>
                  Context
                </div>

                <div className="comparison-muted">
                  —
                </div>

                <div className="comparison-value">
                  {v2.context}/10
                </div>

              </div>

              {/* USEFULNESS */}

              <div className="comparison-row">

                <div>
                  Usefulness
                </div>

                <div className="comparison-muted">
                  —
                </div>

                <div className="comparison-value">
                  {v2.usefulness}/10
                </div>

              </div>

              {/* FEEDBACK */}

              <div className="comparison-row">

                <div>
                  AI Feedback
                </div>

                <div className="comparison-check">
                  ✓
                </div>

                <div className="comparison-check">
                  ✓
                </div>

              </div>

              {/* IMPROVEMENT */}

              <div className="comparison-row">

                <div>
                  Improved Prompt
                </div>

                <div className="comparison-muted">
                  —
                </div>

                <div className="comparison-check">
                  ✓
                </div>

              </div>

            </div>

            {/* EXPLANATION */}

            <div className="comparison-explanation">

              <div className="comparison-badge">
                V2
              </div>

              <div>

                <strong>
                  More than a score.
                </strong>

                <p>
                  V1 provides a simple quality score
                  and feedback V2 adds detailed
                  criteria analysis and generates an
                  improved version of the prompt
                </p>

              </div>

            </div>

          </section>
        )}

        {/* STATUS */}

        {status && (
          <div className="status">
            <span />
            {status}
          </div>
        )}

        {/* HOW IT WORKS */}

        <section className="how">

          <div className="section-title">

            <span>
              HOW IT WORKS
            </span>

            <h2>
              From prompt to better prompt.
            </h2>

          </div>

          <div className="steps">

            <div>
              <b>01</b>
              <h3>Write</h3>
              <p>
                Enter any prompt you want
                to evaluate.
              </p>
            </div>

            <div>
              <b>02</b>
              <h3>Evaluate</h3>
              <p>
                GenLayer processes the
                evaluation through a
                smart contract.
              </p>
            </div>

            <div>
              <b>03</b>
              <h3>Consensus</h3>
              <p>
                Independent AI evaluations
                are validated through
                GenLayer consensus.
              </p>
            </div>

            <div>
              <b>04</b>
              <h3>Improve</h3>
              <p>
                Get actionable feedback
                and an improved prompt.
              </p>
            </div>

          </div>

        </section>

        {/* TECHNOLOGY */}

        <section className="technology">

          <span className="section-label">
            TECHNOLOGY
          </span>

          <h2>
            GenLayer at the center.
          </h2>

          <p>
            PromptEval uses GenLayer smart
            contracts as the core evaluation
            layer. Prompts are evaluated using
            non-deterministic AI execution and
            validated through consensus before
            results are returned to the user.
          </p>

          <div className="tech-grid">

            <div>
              <strong>
                GenLayer
              </strong>
              <span>
                Intelligent blockchain
              </span>
            </div>

            <div>
              <strong>
                Smart Contracts
              </strong>
              <span>
                On-chain evaluation logic
              </span>
            </div>

            <div>
              <strong>
                AI Consensus
              </strong>
              <span>
                Validated AI results
              </span>
            </div>

            <div>
              <strong>
                Bradbury
              </strong>
              <span>
                GenLayer Testnet
              </span>
            </div>

          </div>

        </section>

        {/* FOOTER */}

        <footer>

          <div>
            <strong>
              PromptEval
            </strong>

            <span>
              AI Prompt Quality Platform
            </span>
          </div>

          <span>
            Built with GenLayer
          </span>

        </footer>

      </main>

    </div>
  );
}

export default App;