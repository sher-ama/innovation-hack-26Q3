from __future__ import annotations

from fastapi import APIRouter

from .schemas import ChatRequest, ChatResponse, FaqResponse, SuggestedPromptsResponse
from .service import generate_chat_response, get_faq, get_suggested_prompts

router = APIRouter(prefix="/api/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    return generate_chat_response(request)


@router.get("/suggested-prompts", response_model=SuggestedPromptsResponse)
def suggested_prompts() -> SuggestedPromptsResponse:
    return SuggestedPromptsResponse(prompts=get_suggested_prompts())


@router.get("/faq", response_model=FaqResponse)
def faq() -> FaqResponse:
    return get_faq()
