import type { NextRequest } from "next/server";
import { ipAddress } from "@vercel/edge";
import { rateLimiter } from "./server/redis";

export const config = {
  // Only run the middleware on t