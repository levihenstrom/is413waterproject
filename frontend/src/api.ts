/**
 * Default: HTTP API on port 4000 (matches launchSettings).
 * ASP.NET's UseHttpsRedirection is disabled in Development so this URL is not
 * 307-redirected to https://localhost:5000 (which would break fetch with a
 * self-signed dev certificate).
 *
 * Override with VITE_API_URL in .env if needed.
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000";
