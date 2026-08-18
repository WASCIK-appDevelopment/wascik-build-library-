type Publication = { id: string; pagePath: string };
type DuplicateWarning = { readyProductId: string; title: string };

type Proposal = {
  confirmationToken?: string;
  duplicateWarnings?: DuplicateWarning[];
};

/**
 * Publish everything that passes duplicate review.
 * Duplicates remain in Ready Products for explicit owner review/removal.
 */
export async function publishAllExceptDuplicates(
  all: Publication[],
  propose: (items: Publication[]) => Promise<Proposal>,
  confirm: (token: string, items: Publication[]) => Promise<void>,
) {
  const firstProposal = await propose(all);
  const warnings = firstProposal.duplicateWarnings || [];
  const duplicateIds = new Set(warnings.map((warning) => warning.readyProductId));
  const publishable = all.filter((item) => !duplicateIds.has(item.id));

  if (!publishable.length) {
    return { publishedCount: 0, duplicates: warnings };
  }

  let token = firstProposal.confirmationToken || "";
  if (warnings.length) {
    const cleanProposal = await propose(publishable);
    if (cleanProposal.duplicateWarnings?.length) {
      throw new Error("Duplicate state changed during confirmation. Retry the operation.");
    }
    token = cleanProposal.confirmationToken || "";
  }
  if (!token) throw new Error("Publication confirmation was not created.");

  await confirm(token, publishable);
  return { publishedCount: publishable.length, duplicates: warnings };
}
