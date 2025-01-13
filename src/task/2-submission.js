import { namespaceWrapper } from "@_koii/namespace-wrapper";

export async function submission(roundNumber) {
  try {
    const clicks = await namespaceWrapper.storeGet("clicks");
    console.log(`Submitting clicks for round ${roundNumber}: ${clicks}`);
    return `Round ${roundNumber}: ${clicks} clicks`;
  } catch (error) {
    console.error("Submission error:", error);
    return null;
  }
}
