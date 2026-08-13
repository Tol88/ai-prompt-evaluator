import React from "react";

function Landing({ onLaunch }) {
  return (
    <div className="landing">

      {/* NAVBAR */}

      <header className="landing-nav">

        <div className="landing-brand">
          <div className="brand-mark">
            P
          </div>

          <div>
            <strong>PromptEval</strong>
            <span>AI Prompt Quality</span>
          </div>
        </div>

        <nav>
          <a href="#about">
            Product
          </a>

          <a href="#how">
            How it works
          </a>

          <a href="#technology">
            Technology
          </a>

          <button onClick={onLaunch}>
            Launch App →
          </button>
        </nav>

      </header>

      {/* HERO */}

      <section className="landing-hero">

        <div className="landing-eyebrow">
          POWERED BY GENLAYER
        </div>

        <h1>
          Build better prompts
          <br />
          <span>Get better AI results</span>
        </h1>

        <p>
          PromptEval is an AI powered prompt
          evaluation platform that uses GenLayer
          intelligent contracts and AI consensus
          to analyze explain and improve prompts
        </p>

        <div className="hero-actions">

          <button
            className="hero-primary"
            onClick={onLaunch}
          >
            Start Evaluating →
          </button>

          <a href="#how">
            Learn how it works ↓
          </a>

        </div>

      </section>

      {/* PRODUCT INTRO */}

      <section
        id="about"
        className="landing-section"
      >

        <div className="section-kicker">
          WHAT IS PROMPTEVAL?
        </div>

        <div className="two-column">

          <h2>
            A quality layer
            <br />
            for AI prompts
          </h2>

          <div>

            <p className="large-text">
              AI output is often only as good as
              the instructions behind it
            </p>

            <p>
              PromptEval helps users understand
              whether a prompt is clear specific
              contextual and useful before sending
              it to an AI system
            </p>

            <p>
              Instead of relying on a single
              evaluation PromptEval uses GenLayer
              intelligent contracts to execute
              AI based evaluation and validate
              results through consensus
            </p>

          </div>

        </div>

      </section>

      {/* PROBLEM */}

      <section className="problem-section">

        <div className="section-kicker">
          THE PROBLEM
        </div>

        <h2>
          Writing prompts is easy
          <br />
          Writing good prompts is not
        </h2>

        <div className="problem-grid">

          <div>
            <span>01</span>
            <h3>Unclear instructions</h3>
            <p>
              Prompts can be understandable
              but still leave too much room
              for interpretation.
            </p>
          </div>

          <div>
            <span>02</span>
            <h3>Missing context</h3>
            <p>
              AI systems perform better when
              the task, audience, and desired
              outcome are clearly defined.
            </p>
          </div>

          <div>
            <span>03</span>
            <h3>No structured feedback</h3>
            <p>
              Users often receive an answer
              without knowing why their prompt
              could have been better.
            </p>
          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section
        id="how"
        className="landing-section"
      >

        <div className="section-kicker">
          HOW IT WORKS
        </div>

        <h2>
          From prompt to
          <br />
          improved prompt
        </h2>

        <div className="workflow">

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
            <h3>Submit</h3>
            <p>
              Your prompt is sent to the
              PromptEval intelligent contract.
            </p>
          </div>

          <div>
            <b>03</b>
            <h3>Evaluate</h3>
            <p>
              GenLayer executes AI evaluation
              using nondeterministic execution.
            </p>
          </div>

          <div>
            <b>04</b>
            <h3>Consensus</h3>
            <p>
              Independent validator results
              are checked through GenLayer
              consensus.
            </p>
          </div>

          <div>
            <b>05</b>
            <h3>Improve</h3>
            <p>
              Receive feedback and an
              improved prompt you can evaluate
              again.
            </p>
          </div>

        </div>

      </section>

      {/* V1 VS V2 */}

      <section className="version-section">

        <div className="section-kicker">
          TWO EVALUATION LAYERS
        </div>

        <h2>
          Start simple
          <br />
          Go deeper with V2
        </h2>

        <div className="version-grid">

          <div className="version-card">

            <span>VERSION 01</span>

            <h3>
              Basic Evaluator
            </h3>

            <p>
              A simple evaluation layer designed
              to quickly determine overall prompt
              quality
            </p>

            <ul>
              <li>Overall score</li>
              <li>AI feedback</li>
              <li>Simple evaluation</li>
            </ul>

          </div>

          <div className="version-card version-card-dark">

            <span>VERSION 02</span>

            <h3>
              Advanced Evaluator
            </h3>

            <p>
              A deeper evaluation layer that
              breaks prompt quality into multiple
              measurable dimensions
            </p>

            <ul>
              <li>Overall score</li>
              <li>Clarity</li>
              <li>Specificity</li>
              <li>Context</li>
              <li>Usefulness</li>
              <li>AI feedback</li>
              <li>Improved prompt</li>
            </ul>

          </div>

        </div>

      </section>

      {/* TECHNOLOGY */}

      <section
        id="technology"
        className="landing-section"
      >

        <div className="section-kicker">
          TECHNOLOGY
        </div>

        <div className="two-column">

          <h2>
            Why GenLayer
          </h2>

          <div>

            <p className="large-text">
              Prompt evaluation requires AI
              reasoning but AI reasoning is
              nondeterministic
            </p>

            <p>
              PromptEval uses GenLayer to place
              this AI evaluation inside an
              intelligent contract workflow
            </p>

            <p>
              The contract calls
              <code>
                gl.nondet.exec_prompt()
              </code>
              and the resulting evaluation is
              validated through GenLayer's
              consensus mechanism
            </p>

          </div>

        </div>

        <div className="architecture">

          <div className="architecture-node">
            User
          </div>

          <div className="architecture-line" />

          <div className="architecture-node">
            PromptEval
            <small>
              Intelligent Contract
            </small>
          </div>

          <div className="architecture-line" />

          <div className="architecture-node">
            AI Evaluation
            <small>
              Nondeterministic execution
            </small>
          </div>

          <div className="architecture-line" />

          <div className="architecture-node">
            Consensus
            <small>
              GenLayer validators
            </small>
          </div>

          <div className="architecture-line" />

          <div className="architecture-node">
            Result
          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="features-section">

        <div className="section-kicker">
          PLATFORM
        </div>

        <h2>
          Everything needed
          <br />
          to improve prompts
        </h2>

        <div className="feature-grid">

          <div>
            <span>01</span>
            <h3>AI Evaluation</h3>
            <p>
              Evaluate prompt quality using
              AI-powered reasoning.
            </p>
          </div>

          <div>
            <span>02</span>
            <h3>AI Consensus</h3>
            <p>
              Validate nondeterministic AI
              results through GenLayer.
            </p>
          </div>

          <div>
            <span>03</span>
            <h3>Detailed Analysis</h3>
            <p>
              Understand clarity, specificity,
              context, and usefulness.
            </p>
          </div>

          <div>
            <span>04</span>
            <h3>Prompt Improvement</h3>
            <p>
              Generate a stronger prompt and
              evaluate it again.
            </p>
          </div>

          <div>
            <span>05</span>
            <h3>On-chain Execution</h3>
            <p>
              Evaluation logic runs through
              GenLayer smart contracts.
            </p>
          </div>

          <div>
            <span>06</span>
            <h3>Transparent Results</h3>
            <p>
              Evaluation transactions can be
              traced through the network.
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="final-cta">

        <div className="section-kicker">
          READY?
        </div>

        <h2>
          Turn a rough prompt
          <br />
          into a better one
        </h2>

        <p>
          Evaluate your first prompt with
          PromptEval and see what can be improved
        </p>

        <button
          className="hero-primary"
          onClick={onLaunch}
        >
          Launch PromptEval →
        </button>

      </section>

      {/* FOOTER */}

      <footer className="landing-footer">

        <div>
          <strong>PromptEval</strong>
          <span>
            AI Prompt Quality Platform
          </span>
        </div>

        <span>
          Built with GenLayer
        </span>

      </footer>

    </div>
  );
}

export default Landing;
