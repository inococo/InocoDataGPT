import type Stripe from "stripe";

export const getCustomerId = (
  customer: string | Stripe.Customer | Stripe.DeletedCustomer | null
) => {
  if (!customer) throw new Error("No customer found");

  switch (