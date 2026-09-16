from __future__ import annotations

from .schemas import ChatRequest, ChatResponse, FaqEntry, FaqResponse, GroundingEntry
from ..knowledge_base.data import SEATING_FAQ_ENTRIES
from ..knowledge_base.search import search_seating_faq


SUGGESTED_PROMPTS: list[str] = [
    "Can I choose seats during booking and again before check-in?",
    "What are the rules for exit-row seating?",
    "How can I make sure my child sits with me?",
    "When do I get a seat if I skip seat selection?",
    "How do I request accessible seating support?",
]


def get_suggested_prompts() -> list[str]:
    return SUGGESTED_PROMPTS


def get_faq() -> FaqResponse:
    entries = [
        FaqEntry(id=entry["id"], question=entry["question"], answer=entry["answer"])
        for entry in SEATING_FAQ_ENTRIES
    ]
    return FaqResponse(entries=entries)


def generate_chat_response(request: ChatRequest) -> ChatResponse:
    recent_user_context = [item.message for item in request.history if item.role == "user"][-2:]
    effective_query = " ".join([*recent_user_context, request.message])
    entries = search_seating_faq(effective_query)

    if not entries:
        answer = (
            "I could not find a close match in the seating FAQ yet. "
            "Please ask about seat selection, exit rows, family seating, or accessibility."
        )
        return ChatResponse(answer=answer, grounding=[])

    top = entries[0]
    answer = (
        f"Based on our seating FAQ: {top['answer']} "
        "If you want, I can also compare options for your fare type or travel group."
    )
    grounding = [
        GroundingEntry(id=entry["id"], question=entry["question"], answer=entry["answer"])
        for entry in entries
    ]
    return ChatResponse(answer=answer, grounding=grounding)
