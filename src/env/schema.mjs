
// @ts-check
import { z } from "zod";

const requiredForProduction = () =>
  process.env.NODE_ENV === "production"
    ? z.string().min(1).trim()
    : z.string().min(1).trim().optional();

const requiredAuthEnabledForProduction = () => {
  return process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_FF_AUTH_ENABLED === "true"
    ? z.string().min(1).trim()
    : z.string().min(1).trim().optional();
};

function stringToBoolean() {
  return z.preprocess((str) => str === "true", z.boolean());
}
function stringToNumber() {
  return z.preprocess((str) => Number(str), z.number());
}
/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXTAUTH_SECRET: requiredForProduction(),
  NEXTAUTH_URL: z.preprocess(
    // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    // Since NextAuth.js automatically uses the VERCEL_URL if present.
    (str) => process.env.VERCEL_URL ?? str,
    // VERCEL_URL doesn't include `https` so it cant be validated as a URL
    process.env.VERCEL ? z.string() : z.string().url()
  ),
  OPENAI_API_KEY: z.string(),

  GOOGLE_CLIENT_ID: requiredAuthEnabledForProduction(),
  GOOGLE_CLIENT_SECRET: requiredAuthEnabledForProduction(),
  GITHUB_CLIENT_ID: requiredAuthEnabledForProduction(),
  GITHUB_CLIENT_SECRET: requiredAuthEnabledForProduction(),
  DISCORD_CLIENT_ID: requiredAuthEnabledForProduction(),
  DISCORD_CLIENT_SECRET: requiredAuthEnabledForProduction(),

  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_SUBSCRIPTION_PRICE_ID: z.string().optional(),

  UPSTASH_REDIS_REST_URL: z.string().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  RATE_LIMITER_REQUESTS_PER_MINUTE: stringToNumber().optional(),
});