from __future__ import annotations

from typing import TypedDict


class SeatingFaqEntry(TypedDict):
    id: str
    question: str
    answer: str
    tags: list[str]


SEATING_FAQ_ENTRIES: list[SeatingFaqEntry] = [
    {
        "id": "seat-selection-window",
        "question": "Can I pick my seat when booking my flight?",
        "answer": "Yes. Most fares allow seat selection during booking or later in Manage Booking. Basic fares may limit free options until check-in.",
        "tags": ["seat selection", "booking", "manage booking", "basic fare"],
    },
    {
        "id": "extra-legroom-pricing",
        "question": "How much does an extra legroom seat usually cost?",
        "answer": "Pricing varies by route and airline, but extra legroom seats are usually sold as paid ancillaries and can change dynamically based on demand.",
        "tags": ["extra legroom", "pricing", "ancillary"],
    },
    {
        "id": "family-seating",
        "question": "Will children be seated with their parents?",
        "answer": "Airlines generally try to seat children with at least one adult in the same booking. If seats are split, contact support before departure for reassignment options.",
        "tags": ["family seating", "children", "reassignment"],
    },
    {
        "id": "exit-row-rules",
        "question": "Who can sit in an exit row seat?",
        "answer": "Exit row passengers must meet safety requirements, including mobility and language comprehension criteria, and cannot require special assistance.",
        "tags": ["exit row", "safety", "eligibility"],
    },
    {
        "id": "seat-change-after-booking",
        "question": "Can I change my seat after I already selected one?",
        "answer": "Yes. Seat changes are usually possible before check-in through Manage Booking, but fare conditions and seat availability may apply.",
        "tags": ["seat change", "manage booking", "availability"],
    },
    {
        "id": "check-in-seat-assignment",
        "question": "When is my seat assigned if I do not choose one in advance?",
        "answer": "If no seat is preselected, the system typically assigns one automatically at check-in based on remaining availability.",
        "tags": ["check-in", "auto assignment", "availability"],
    },
    {
        "id": "accessible-seating",
        "question": "How do I request accessible seating?",
        "answer": "You can request accessible seating during booking or via customer support. Early requests increase the chance of getting a suitable seat.",
        "tags": ["accessible seating", "special assistance", "support"],
    },
    {
        "id": "group-booking-seats",
        "question": "Can large groups sit together on the aircraft?",
        "answer": "Group seating depends on aircraft layout and remaining inventory. Booking early and selecting seats at purchase improves the chance of sitting together.",
        "tags": ["group booking", "seat map", "inventory"],
    },
]
