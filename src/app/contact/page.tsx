export const metadata = {
  title: 'Contact – Vêtue',
  description: 'Get in touch with the Vêtue team.',
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="text-gray-700">
        Questions about sizing, shipping, or returns? We’re here to help.
      </p>

      {/* Placeholder contact block (replace with a real form later) */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-600">Email</p>
        <a
          className="text-base font-medium text-black underline decoration-gray-300 underline-offset-4"
          href="mailto:support@vetue.com"
        >
          support@vetue.com
        </a>

        <div className="mt-4">
          <p className="text-sm text-gray-600">Business Hours</p>
          <p className="text-gray-800">Mon–Fri, 9am–5pm PT</p>
        </div>
      </div>
    </section>
  );
}
