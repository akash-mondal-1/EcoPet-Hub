import { loadStripe } from "@stripe/stripe-js";

// Load Stripe with the public API key from environment variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);

export const initiateCheckout = async ({ lineItems } = {}) => {
  try {
    // Ensure the Stripe instance is loaded
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe failed to initialize.");
      return;
    }

    // Redirect to Stripe's Checkout page with the specified options
    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems,
      successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: window.location.origin,
    });

    // Handle any errors that occur during redirection
    if (error) {
      console.error("Error redirecting to checkout:", error.message);
    }
  } catch (err) {
    console.error("Error initiating checkout:", err);
  }
};
