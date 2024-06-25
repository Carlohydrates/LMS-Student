/* eslint-disable @typescript-eslint/no-unused-vars */
interface CheckoutSessionResponse {
  url: string;
  token: string;
}

export const useUpgradePremium = () => {

  const upgradePremium = async (userId: string, id: number, quantity: number) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_STRIPE_CHECKOUT_URL}/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: [{ id, quantity }]}),
      });
      if (res.ok) {
        const data: CheckoutSessionResponse = await res.json();
        // console.log('Checkout session response:', data);
        localStorage.setItem('transactionToken', data.token);
        window.location.href = data.url;
      } else {
        console.log("Failed to create checkout session")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { upgradePremium };
};
