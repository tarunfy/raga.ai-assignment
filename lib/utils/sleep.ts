/**
 * Creates a deterministic artificial delay to simulate network latency.
 *
 * @param duration - The amount of time to wait in milliseconds
 */
export const sleep = (duration = 900) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
