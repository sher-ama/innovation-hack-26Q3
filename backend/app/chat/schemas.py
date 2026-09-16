from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field
from pydantic import field_validator


class ChatHistoryItem(BaseModel):
    role: Literal["user", "assistant", "system"]
    message: str = Field(min_length=1, max_length=1200)

    @field_validator("message")
    @classmethod
    def validate_non_empty_message(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("message must not be empty")
        return stripped


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=500)
    history: list[ChatHistoryItem] = Field(default_factory=list, max_length=20)

    @field_validator("message")
    @classmethod
    def validate_non_empty_input(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("message must not be empty")
        return stripped


class GroundingEntry(BaseModel):
    id: str
    question: str
    answer: str


class ChatResponse(BaseModel):
    answer: str
    grounding: list[GroundingEntry]


class SuggestedPromptsResponse(BaseModel):
    prompts: list[str]


class FaqEntry(BaseModel):
    id: str
    question: str
    answer: str


class FaqResponse(BaseModel):
    entries: list[FaqEntry]
