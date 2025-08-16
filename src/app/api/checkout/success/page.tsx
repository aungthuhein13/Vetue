// app/checkout/success/page.tsx
// This page displays a success message after a successful checkout.
// It thanks the user and provides a link to continue shopping

export default function SuccessPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold">Thank you!</h1>
      <p className="mt-2 text-gray-600">Your order was placed successfully.</p>
      <a href="/shop" className="mt-6 inline-block rounded-lg border px-4 py-2">Continue shopping</a>
    </section>
  );
}