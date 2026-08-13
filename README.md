# PromptEval

> AI-powered prompt evaluation and improvement, built with GenLayer.

## Overview

PromptEval is a GenLayer-powered platform that helps users evaluate, understand, and improve prompts before using them with AI systems.

Instead of simply generating an answer, PromptEval focuses on the quality of the instruction itself. Users submit a prompt and receive an AI-powered evaluation through GenLayer intelligent contracts, including a quality score, detailed feedback, and an improved version of the prompt.

## Why PromptEval?

AI output is often strongly influenced by the quality of the prompt.

A prompt can be understandable but still lack:

- clarity
- specificity
- context
- a defined audience
- a clear desired outcome

PromptEval provides a structured way to identify these weaknesses and improve the prompt before it is used elsewhere.

## Example

A user submits:

```text
Create a crypto website.
```

PromptEval can identify that the prompt lacks important information such as:

- target audience
- required features
- visual direction
- technical requirements
- desired outcome

The Advanced Evaluator can then generate an improved version such as:

```text
Create a modern crypto portfolio website for beginner users.
Include a dashboard, asset overview, transaction history,
and wallet connection. Use a clean responsive interface
with a white and black visual style.
```

The user can then evaluate the improved prompt again.

## How It Works

```text
User
  |
  v
PromptEval Frontend
  |
  v
GenLayer Intelligent Contract
  |
  v
gl.nondet.exec_prompt()
  |
  v
AI Evaluation
  |
  v
GenLayer Consensus
  |
  v
Score + Feedback
  |
  v
Improved Prompt
  |
  v
Evaluate Again
```

The frontend does not directly perform the AI evaluation. The evaluation logic is implemented inside the GenLayer smart contract.

## GenLayer Integration

GenLayer is the core of PromptEval.

The project uses GenLayer's nondeterministic AI execution:

```text
gl.nondet.exec_prompt()
```

This allows the intelligent contract to perform AI-based reasoning.

Because AI execution is nondeterministic, PromptEval uses GenLayer's validation and consensus mechanism to verify evaluation results.

This makes GenLayer part of the application's core workflow rather than simply being used for wallet connectivity.

## Smart Contracts

PromptEval currently has two evaluator versions.

### V1 - Basic Evaluator

The first version provides a simple prompt quality evaluation.

#### Output

- overall score
- AI feedback

#### Contract

```text
0x162A4472a300E5FC555e51Bf556Db2fe06C19b13
```

V1 is designed to provide a quick and simple evaluation.

### V2 - Advanced Evaluator

V2 expands the evaluation into multiple dimensions.

#### Output

- overall score
- clarity
- specificity
- context
- usefulness
- AI feedback
- improved prompt

The user can take the improved prompt and evaluate it again.

#### Contract

```text
0x0B305D3CB1A26b1Be2c8A820d76d522554F73886
```

### V1 vs V2

| Feature | V1 | V2 |
| --- | --- | --- |
| Overall score | ✓ | ✓ |
| AI feedback | ✓ | ✓ |
| Clarity | — | ✓ |
| Specificity | — | ✓ |
| Context | — | ✓ |
| Usefulness | — | ✓ |
| Improved prompt | — | ✓ |
| Evaluate again | — | ✓ |

V1 provides a fast quality check. V2 provides a deeper analysis and an improvement workflow.

## User Flow

1. Enter a prompt
2. Select an evaluator
3. Confirm the transaction
4. GenLayer evaluates the prompt
5. Consensus validates the result
6. Receive the result
7. Improve and evaluate again

### Example flow

```text
Explain blockchain to a beginner.
```

The user can then choose between:

- V1 Basic Evaluator
- V2 Advanced Evaluator

After the evaluation, the app displays the score and explanation. For V2, it also provides a stronger prompt for the next iteration.

## Product Architecture

```text
                    PROMPTEVAL
                         |
              +----------+----------+
              |                     |
          Frontend              Contracts
              |                     |
        React Application      GenLayer
              |                     |
              +----------+----------+
                         |
                         v
                Intelligent Contract
                         |
                         v
                gl.nondet.exec_prompt
                         |
                         v
                  AI Evaluation
                         |
                         v
                  GenLayer Consensus
                         |
                         v
                    Evaluation
```

## Main Features

### Prompt Evaluation

Evaluate the quality of any prompt.

### Multi-dimensional Analysis

V2 analyzes:

- clarity
- specificity
- context
- usefulness
- AI feedback

### Prompt Improvement

V2 generates an improved version of the prompt.

### Evaluate Again

Users can iteratively improve and re-evaluate a prompt.

### On-chain Execution

The evaluation request is executed through a GenLayer intelligent contract.

## Tech Stack

- React
- Vite
- JavaScript
- GenLayer

## Getting Started

### Prerequisites

- Node.js and npm installed
- A connected wallet for the app
- Access to the GenLayer environment used by the project

### Install dependencies

```bash
cd frontend
npm install
```

### Run locally

```bash
npm run dev
```

## Project Structure

```text
ai-prompt-evaluator/
├── contracts/
├── frontend/
├── README.md
├── .gitignore
├── LICENSE
└── .gitignore
```

## Notes

This project is designed to improve prompt quality through structured evaluation, feedback, and iterative refinement rather than simple one-shot generation.
