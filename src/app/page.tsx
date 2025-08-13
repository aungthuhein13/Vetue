// app/page.tsx
export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-2xl bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight">Vêtue</h1>
        <p className="mt-2 text-gray-600">
          Curated fashion. Honest prices. Premium resale made simple.
        </p>

        <div className="mt-6 flex gap-3">
          <a
            href="/shop"
            className="rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-900"
          >
            Shop now
          </a>
          <a
            href="/about"
            className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
}
