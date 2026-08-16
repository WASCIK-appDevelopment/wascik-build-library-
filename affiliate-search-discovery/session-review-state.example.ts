export type ReviewCandidate = {
  id: string;
  title: string;
  brand: string;
};

export type ReviewSession = {
  seenIds: string[];
  selected: ReviewCandidate[];
};

export const emptyReviewSession: ReviewSession = {
  seenIds: [],
  selected: [],
};

export function recordDisplayed(
  state: ReviewSession,
  displayed: ReviewCandidate[],
): ReviewSession {
  return {
    ...state,
    seenIds: [...new Set([...state.seenIds, ...displayed.map((item) => item.id)])],
  };
}

export function chooseCandidate(
  state: ReviewSession,
  candidate: ReviewCandidate,
): ReviewSession {
  if (state.selected.some((item) => item.id === candidate.id)) return state;
  return { ...state, selected: [...state.selected, candidate] };
}

export function serializeReviewSession(state: ReviewSession) {
  return JSON.stringify(state);
}

export function restoreReviewSession(raw: string | null): ReviewSession {
  if (!raw) return emptyReviewSession;
  try {
    const value = JSON.parse(raw) as Partial<ReviewSession>;
    return {
      seenIds: Array.isArray(value.seenIds)
        ? value.seenIds.filter((id): id is string => typeof id === "string")
        : [],
      selected: Array.isArray(value.selected)
        ? value.selected.filter(
            (item): item is ReviewCandidate =>
              Boolean(item) &&
              typeof item.id === "string" &&
              typeof item.title === "string" &&
              typeof item.brand === "string",
          )
        : [],
    };
  } catch {
    return emptyReviewSession;
  }
}

// Remove this storage key during the authenticated sign-out workflow.
// Do not persist session-only skips as permanent business rejections.
