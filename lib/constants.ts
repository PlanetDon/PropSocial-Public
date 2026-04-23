export const APP_NAME = "PropSocial";

export const USER_ROLES = {
  USER: "user",
  AGENT: "agent",
  ADMIN: "admin"
} as const;

export const PRIVATE_ROUTES = ["/dashboard", "/messages", "/grc", "/settings"] as const;

export const SUPPORTED_REGIONS = [
  { code: "NG-LA", label: "Nigeria / Lagos", currency: "NGN" },
  { code: "US-NY", label: "United States / New York", currency: "USD" },
  { code: "GB-LDN", label: "United Kingdom / London", currency: "GBP" }
] as const;
