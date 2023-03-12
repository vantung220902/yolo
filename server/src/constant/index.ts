export const COOKIE_NAME = "sendo-cookie";
export const __prod__ = process.env.NODE_ENV === "production";
export const SSL = process.env.SSL === "YES";
export const TODAY = new Date().toISOString().slice(0, 10);
