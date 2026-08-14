# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

from genlayer import *


class PromptEvaluatorV2(gl.Contract):

    # -----------------------------
    # STORED PROMPT
    # -----------------------------

    last_prompt: str

    # -----------------------------
    # SCORES
    # -----------------------------

    last_score: i32
    last_clarity: i32
    last_specificity: i32
    last_context: i32
    last_usefulness: i32

    # -----------------------------
    # AI OUTPUT
    # -----------------------------

    last_feedback: str
    last_improved_prompt: str

    # -----------------------------
    # INITIALIZATION
    # -----------------------------

    def __init__(self):

        self.last_prompt = ""

        self.last_score = 0
        self.last_clarity = 0
        self.last_specificity = 0
        self.last_context = 0
        self.last_usefulness = 0

        self.last_feedback = ""
        self.last_improved_prompt = ""

    # =========================================================
    # MAIN EVALUATION
    # =========================================================

    @gl.public.write
    def evaluate_prompt(self, prompt: str):

        # -----------------------------------------------------
        # INPUT VALIDATION
        # -----------------------------------------------------

        if not prompt.strip():
            raise gl.vm.UserError(
                "Prompt cannot be empty"
            )

        # -----------------------------------------------------
        # PROFESSIONAL AI EVALUATION PROMPT
        # -----------------------------------------------------

        task = f"""
You are an expert AI Prompt Engineer and Prompt Quality Auditor.

Your task is to perform a professional and objective evaluation
of the user's prompt and then create an improved version while
preserving the user's original intent.

USER PROMPT:
{prompt}

============================================================
EVALUATION DIMENSIONS
============================================================

1. CLARITY

Determine whether the instruction is clear, understandable,
unambiguous, and easy for an AI system to follow.

Consider:
- Is the requested task understandable?
- Is there ambiguity?
- Can an AI reasonably determine what the user wants?

------------------------------------------------------------

2. SPECIFICITY

Determine whether the prompt provides sufficient details,
requirements, constraints, and expected outcomes.

Consider:
- Required features
- Important details
- Desired result
- Relevant constraints
- Output requirements

------------------------------------------------------------

3. CONTEXT

Determine whether the prompt provides enough background,
purpose, target audience, role, and relevant information.

Consider:
- Who is the intended audience?
- What is the purpose?
- What background information is necessary?
- Is important context missing?

------------------------------------------------------------

4. USEFULNESS

Determine whether the prompt is likely to produce a useful,
relevant, actionable, and appropriate AI response.

Consider:
- Is the goal practical?
- Is the expected result understandable?
- Is the prompt likely to reduce unnecessary interpretation?

============================================================
SCORING
============================================================

Give each dimension a score from 1 to 10.

1-2  = Very weak
3-4  = Needs major improvement
5-6  = Acceptable but incomplete
7-8  = Good
9    = Excellent
10   = Highly precise and production-ready

The overall score must represent the actual quality of the
ORIGINAL prompt.

Do not give a high score simply because the topic is interesting.

============================================================
FEEDBACK
============================================================

Write concise but meaningful professional feedback.

The feedback must:

- Identify the strongest aspect of the prompt.
- Identify the most important weakness.
- Explain why the weakness matters.
- Explain what should be improved.

Avoid generic statements such as:

"Be more specific."

Instead explain exactly what information is missing.

============================================================
IMPROVED PROMPT
============================================================

Create a professionally improved version of the original prompt.

The improved prompt MUST:

- Preserve the user's original intent.
- Preserve the original task.
- Improve clarity.
- Improve specificity.
- Add useful context when appropriate.
- Define the expected output when useful.
- Add practical constraints when appropriate.
- Be ready to copy and use with an AI system.
- Remain practical and concise.
- Avoid unnecessary complexity.

IMPORTANT:

Do not change the user's fundamental objective.

Do not claim that information was provided by the user
if it was added during the improvement process.

============================================================
OUTPUT
============================================================

Return ONLY valid JSON.

Use EXACTLY these fields:

{{
    "score": 1,
    "clarity": 1,
    "specificity": 1,
    "context": 1,
    "usefulness": 1,
    "feedback": "Professional explanation of the original prompt's strengths, weaknesses, and recommended improvements.",
    "improved_prompt": "Professionally improved version of the original prompt while preserving the original intent."
}}
"""

        # =====================================================
        # AI EVALUATION
        # =====================================================

        def evaluate():

            response = gl.nondet.exec_prompt(
                task,
                response_format="json"
            )

            # -------------------------------------------------
            # RESPONSE TYPE
            # -------------------------------------------------

            if not isinstance(
                response,
                dict
            ):
                raise gl.vm.UserError(
                    "Invalid AI response format"
                )

            # -------------------------------------------------
            # EXTRACT VALUES
            # -------------------------------------------------

            score = int(
                response["score"]
            )

            clarity = int(
                response["clarity"]
            )

            specificity = int(
                response["specificity"]
            )

            context = int(
                response["context"]
            )

            usefulness = int(
                response["usefulness"]
            )

            feedback = str(
                response["feedback"]
            )

            improved_prompt = str(
                response["improved_prompt"]
            )

            # -------------------------------------------------
            # LOCAL RESULT VALIDATION
            # -------------------------------------------------

            values = [
                score,
                clarity,
                specificity,
                context,
                usefulness
            ]

            for value in values:

                if value < 1 or value > 10:
                    raise gl.vm.UserError(
                        "AI score must be between 1 and 10"
                    )

            if not feedback.strip():

                raise gl.vm.UserError(
                    "AI feedback cannot be empty"
                )

            if not improved_prompt.strip():

                raise gl.vm.UserError(
                    "Improved prompt cannot be empty"
                )

            # -------------------------------------------------
            # RETURN STRUCTURED RESULT
            # -------------------------------------------------

            return {
                "score": score,
                "clarity": clarity,
                "specificity": specificity,
                "context": context,
                "usefulness": usefulness,
                "feedback": feedback,
                "improved_prompt": improved_prompt
            }

        # =====================================================
        # GENLAYER VALIDATOR
        # =====================================================

        def validator(leader_result):

            # -------------------------------------------------
            # LEADER RESULT MUST BE VALID
            # -------------------------------------------------

            if not isinstance(
                leader_result,
                gl.vm.Return
            ):
                return False

            leader_data = (
                leader_result.calldata
            )

            # -------------------------------------------------
            # INDEPENDENT VALIDATOR EVALUATION
            # -------------------------------------------------

            own_result = evaluate()

            # -------------------------------------------------
            # LEADER SCORES
            # -------------------------------------------------

            leader_score = int(
                leader_data["score"]
            )

            leader_clarity = int(
                leader_data["clarity"]
            )

            leader_specificity = int(
                leader_data["specificity"]
            )

            leader_context = int(
                leader_data["context"]
            )

            leader_usefulness = int(
                leader_data["usefulness"]
            )

            # -------------------------------------------------
            # VALIDATOR SCORES
            # -------------------------------------------------

            own_score = int(
                own_result["score"]
            )

            own_clarity = int(
                own_result["clarity"]
            )

            own_specificity = int(
                own_result["specificity"]
            )

            own_context = int(
                own_result["context"]
            )

            own_usefulness = int(
                own_result["usefulness"]
            )

            # =================================================
            # RANGE VALIDATION
            # =================================================

            leader_values = [
                leader_score,
                leader_clarity,
                leader_specificity,
                leader_context,
                leader_usefulness
            ]

            own_values = [
                own_score,
                own_clarity,
                own_specificity,
                own_context,
                own_usefulness
            ]

            for value in leader_values:

                if value < 1 or value > 10:
                    return False

            for value in own_values:

                if value < 1 or value > 10:
                    return False

            # =================================================
            # TEXT VALIDATION
            # =================================================

            leader_feedback = str(
                leader_data["feedback"]
            )

            leader_improved_prompt = str(
                leader_data["improved_prompt"]
            )

            own_feedback = str(
                own_result["feedback"]
            )

            own_improved_prompt = str(
                own_result["improved_prompt"]
            )

            if not leader_feedback.strip():
                return False

            if not leader_improved_prompt.strip():
                return False

            if not own_feedback.strip():
                return False

            if not own_improved_prompt.strip():
                return False

            # =================================================
            # CONSENSUS TOLERANCE
            # =================================================

            # Overall score should be very close.
            if abs(
                leader_score - own_score
            ) > 1:
                return False

            # Individual dimensions may naturally differ
            # slightly between independent LLM evaluations.

            if abs(
                leader_clarity - own_clarity
            ) > 2:
                return False

            if abs(
                leader_specificity - own_specificity
            ) > 2:
                return False

            if abs(
                leader_context - own_context
            ) > 2:
                return False

            if abs(
                leader_usefulness - own_usefulness
            ) > 2:
                return False

            # -------------------------------------------------
            # IMPORTANT:
            #
            # We intentionally DO NOT compare feedback or
            # improved_prompt text exactly.
            #
            # Two independent LLMs may produce different
            # wording while reaching the same valid evaluation.
            # -------------------------------------------------

            return True

        # =====================================================
        # EXECUTE GENLAYER CONSENSUS
        # =====================================================

        result = gl.vm.run_nondet_unsafe(
            evaluate,
            validator
        )

        # =====================================================
        # STORE FINAL CONSENSUS RESULT
        # =====================================================

        self.last_prompt = prompt

        self.last_score = result[
            "score"
        ]

        self.last_clarity = result[
            "clarity"
        ]

        self.last_specificity = result[
            "specificity"
        ]

        self.last_context = result[
            "context"
        ]

        self.last_usefulness = result[
            "usefulness"
        ]

        self.last_feedback = result[
            "feedback"
        ]

        self.last_improved_prompt = result[
            "improved_prompt"
        ]

        # =====================================================
        # RETURN RESULT TO FRONTEND
        # =====================================================

        return result

    # =========================================================
    # VIEW METHODS
    # =========================================================

    @gl.public.view
    def get_last_prompt(self) -> str:

        return self.last_prompt

    @gl.public.view
    def get_last_score(self) -> int:

        return self.last_score

    @gl.public.view
    def get_last_clarity(self) -> int:

        return self.last_clarity

    @gl.public.view
    def get_last_specificity(self) -> int:

        return self.last_specificity

    @gl.public.view
    def get_last_context(self) -> int:

        return self.last_context

    @gl.public.view
    def get_last_usefulness(self) -> int:

        return self.last_usefulness

    @gl.public.view
    def get_last_feedback(self) -> str:

        return self.last_feedback

    @gl.public.view
    def get_last_improved_prompt(self) -> str:

        return self.last_improved_prompt