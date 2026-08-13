# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

from genlayer import *
import json


class PromptEvaluatorV2(gl.Contract):

    last_prompt: str

    last_score: i32
    last_clarity: i32
    last_specificity: i32
    last_context: i32
    last_usefulness: i32

    last_feedback: str
    last_improved_prompt: str

    def __init__(self):
        self.last_prompt = ""

        self.last_score = 0
        self.last_clarity = 0
        self.last_specificity = 0
        self.last_context = 0
        self.last_usefulness = 0

        self.last_feedback = ""
        self.last_improved_prompt = ""

    @gl.public.write
    def evaluate_prompt(self, prompt: str):

        if not prompt.strip():
            raise gl.vm.UserError("Prompt cannot be empty")

        task = f"""
You are an expert prompt engineer.

Evaluate the quality of the following user prompt.

PROMPT:
{prompt}

Evaluate these four criteria from 1 to 10:

1. Clarity
   Is the request easy to understand?

2. Specificity
   Does the prompt provide enough details and constraints?

3. Context
   Does the prompt provide enough background information?

4. Usefulness
   Is the goal clear and likely to produce a useful result?

Then calculate an overall score from 1 to 10.

Finally, rewrite the prompt into a significantly better version while
preserving the original intent.

Return ONLY valid JSON using exactly this structure:

{{
    "score": 1,
    "clarity": 1,
    "specificity": 1,
    "context": 1,
    "usefulness": 1,
    "feedback": "short explanation of strengths and weaknesses",
    "improved_prompt": "improved version of the original prompt"
}}
"""

        def evaluate():

            response = gl.nondet.exec_prompt(
                task,
                response_format="json"
            )

            return {
                "score": int(response["score"]),
                "clarity": int(response["clarity"]),
                "specificity": int(response["specificity"]),
                "context": int(response["context"]),
                "usefulness": int(response["usefulness"]),
                "feedback": str(response["feedback"]),
                "improved_prompt": str(
                    response["improved_prompt"]
                )
            }

        def validator(leader_result):

            if not isinstance(
                leader_result,
                gl.vm.Return
            ):
                return False

            leader_data = leader_result.calldata

            own_result = evaluate()

            # Validate leader result
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

            # Validate independent result
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

            # Validate ranges

            values = [
                leader_score,
                leader_clarity,
                leader_specificity,
                leader_context,
                leader_usefulness,
                own_score,
                own_clarity,
                own_specificity,
                own_context,
                own_usefulness
            ]

            for value in values:

                if value < 1 or value > 10:
                    return False

            # Allow small differences between
            # independent LLM evaluations.

            if abs(
                leader_score - own_score
            ) > 1:
                return False

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

            return True

        result = gl.vm.run_nondet_unsafe(
            evaluate,
            validator
        )

        # Store result

        self.last_prompt = prompt

        self.last_score = result["score"]

        self.last_clarity = result["clarity"]

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

        return result

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