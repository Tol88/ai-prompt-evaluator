# ai-prompt-evaluator

GenLayer-powered AI prompt evaluation and improvement platform.

## Overview

PromptEval helps users evaluate the quality of a prompt before sending it to an AI system. Instead of only generating an answer, the platform focuses on the instruction itself and helps improve it through structured evaluation.

## Why this project

AI output is heavily affected by prompt quality. Many prompts are readable but still weak because they lack clarity, specificity, context, audience definition, or a clear outcome.

This project helps identify those weaknesses and improve the prompt with a more effective version.

## Features

- prompt quality evaluation
- AI-based feedback
- improved prompt generation
- comparison between evaluator versions
- GenLayer integration for trusted evaluation flow

## How it works

1. user enters a prompt
2. the app sends the request to the evaluator
3. GenLayer processes the evaluation through AI execution
4. results are validated and returned to the frontend
5. the user can refine the prompt and evaluate again

## Evaluator versions

### V1

Basic evaluation with a quick score and feedback.

### V2

Advanced evaluation with deeper analysis and an improved prompt output.

## Tech stack

- React
- Vite
- JavaScript
- GenLayer

## Run locally

```bash
cd frontend
npm install
npm run dev
```

## Project structure

```text
ai-prompt-evaluator/
├── contracts/
├── frontend/
├── README.md
├── .gitignore
└── LICENSE
```

## Notes

This project is intended to support better prompt design through evaluation, feedback, and iterative improvement.
