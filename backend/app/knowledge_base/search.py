from __future__ import annotations

from .data import SEATING_FAQ_ENTRIES, SeatingFaqEntry


def search_seating_faq(query: str, *, limit: int = 3) -> list[SeatingFaqEntry]:
    """Simple lexical search over mock FAQ data.

    This function is the seam to replace later with a real knowledge base retriever.
    """
    terms = [term for term in query.lower().split() if term]
    if not terms:
        return []

    scored: list[tuple[int, SeatingFaqEntry]] = []
    for entry in SEATING_FAQ_ENTRIES:
        haystack = " ".join([entry["question"], entry["answer"], " ".join(entry["tags"])]).lower()
        score = sum(1 for term in terms if term in haystack)
        if score > 0:
            scored.append((score, entry))

    scored.sort(key=lambda item: item[0], reverse=True)
    return [entry for _, entry in scored[:limit]]
