export const metadata = {
  title: 'About – Vêtue',
  description: 'Our mission and how we curate premium resale.',
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">About Vêtue</h1>
      <p className="text-gray-700">
        We curate brand-name fashion at honest prices. Each item is selected for quality, value,
        and style—so discount shopping feels premium and transparent.
      </p>
      <ul className="list-disc pl-5 text-gray-700 space-y-1">
        <li>Clear savings: original vs sale price on every product</li>
        <li>Hand-picked items (often single-quantity)</li>
        <li>Simple, mobile-first shopping experience</li>
      </ul>
    </section>
  );
}
