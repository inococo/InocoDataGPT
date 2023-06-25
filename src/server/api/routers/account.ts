import { createTRPCRouter, protectedProcedure } from "../trpc";
import Stripe from "stripe";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../db";
import { getCustomerId } from "../../../utils/stripe-utils";

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const stripe = new Stripe(env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2022-11-15",
});

export const accountRouter = createTRPCRouter({
  subscribe: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: ctx.session?.user?.id,
      },
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: env.NEXTAUTH_URL,
      cancel_url: env.NEXTAUTH_URL,
      mode: "subscription",
      line_items: [
        {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          price: env.STRIPE_SUBSCRIPTION_PRICE_ID ?? "",
    