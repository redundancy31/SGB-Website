const SAFE_DESTINATIONS = new Set(["/dashboard", "/account", "/account/security", "/management/employees", "/management/access"]);

export function safePortalDestination(value: string | null | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return "/dashboard";
  const pathname = value.split(/[?#]/, 1)[0];
  return SAFE_DESTINATIONS.has(pathname) ? pathname : "/dashboard";
}
