/**
 * Ensures redirect targets always stay within the application.
 *
 * @param candidate - The requested redirect path from query params
 */
export const getSafeRedirectPath = (candidate: string | null) => {
  if (!candidate) {
    return "/dashboard";
  }

  if (!candidate.startsWith("/") || candidate.startsWith("//")) {
    return "/dashboard";
  }

  return candidate;
};
