# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

from genlayer import *
import json


class PromptEvaluator(gl.Contract):

    last_prompt: str
    last_score: i32
    last_feedback: str

    def __init__(self):
        self.last_prompt = ""
        self.last_score = 0
        self.last_feedback = ""

    @gl.public.write
    def evaluate_prompt(self, prompt: str):

        if not prompt.strip():
            raise gl.vm.UserError("Prompt cannot be empty")

        task = f"""
Evaluate the quality of this user prompt.

PROMPT:
{prompt}

Evaluate these criteria:
1. Clarity
2. Specificity
3. Context
4. Usefulness

Give a score from 1 to 10.

Return ONLY valid JSON:
{{
    "score": 1,
    "feedback": "short explanation"
}}
"""

        def evaluate():
            response = gl.nondet.exec_prompt(
                task,
                response_format="json"
            )

            return {
                "score": int(response["score"]),
                "feedback": str(response["feedback"])
            }

        def validator(leader_result):
            if not isinstance(leader_result, gl.vm.Return):
                return False

            leader_data = leader_result.calldata

            own_result = evaluate()

            leader_score = int(leader_data["score"])
            own_score = int(own_result["score"])

            if leader_score < 1 or leader_score > 10:
                return False

            if own_score < 1 or own_score > 10:
                return False

            # Allow a small difference between LLM evaluations
            return abs(leader_score - own_score) <= 1

        result = gl.vm.run_nondet_unsafe(
            evaluate,
            validator
        )

        self.last_prompt = prompt
        self.last_score = result["score"]
        self.last_feedback = result["feedback"]

        return result

    @gl.public.view
    def get_last_prompt(self) -> str:
        return self.last_prompt

    @gl.public.view
    def get_last_score(self) -> int:
        return self.last_score

    @gl.public.view
    def get_last_feedback(self) -> str:
        return self.last_feedback