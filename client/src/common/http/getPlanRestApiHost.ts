declare global {
  interface Window {
    __APP_CONFIG__?: {
      PLAN_REST_API_HOST?: string;
    };
  }
}

/**
 * Gets the Plan REST API host URL.
 *
 * This function supports both runtime configuration (for k8s/Docker deployments)
 * and build-time configuration (for Render static deployments):
 *
 * - Runtime: Reads from window.__APP_CONFIG__.PLAN_REST_API_HOST (set by config.js)
 * - Build-time: Falls back to import.meta.env.VITE_PLAN_REST_API_HOST
 *
 * @returns The Plan REST API host URL
 */
export function getPlanRestApiHost(): string {
  return window.__APP_CONFIG__?.PLAN_REST_API_HOST ?? import.meta.env.VITE_PLAN_REST_API_HOST ?? "";
}
