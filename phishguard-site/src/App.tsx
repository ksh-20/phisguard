import { useMemo } from 'react'

function App() {
  const features = useMemo(
    () => [
      {
        title: 'Real-time Detection',
        desc: 'Analyzes URLs instantly using local heuristics and your ML backend.',
      },
      {
        title: 'Clear Warnings',
        desc: 'Color-coded risk scores and human-readable reasons for flags.',
      },
      {
        title: 'Privacy First',
        desc: 'No personal data leaves your browser; API calls share only the URL.',
      },
    ],
    [],
  )

  const installSteps = [
    'Download the extension ZIP using the button below.',
    'Extract the ZIP to a local folder.',
    'Open chrome://extensions and enable “Developer mode”.',
    'Click “Load unpacked” and select the extracted folder.',
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Nav */}
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 text-white font-bold">PG</span>
              <span className="font-semibold">PhishGuard</span>
            </div>
            <nav className="hidden sm:flex gap-6 text-sm">
              <a href="#about" className="hover:text-indigo-600">About</a>
              <a href="#learn" className="hover:text-indigo-600">Learn</a>
              <a href="#install" className="hover:text-indigo-600">Install</a>
              <a href="#faq" className="hover:text-indigo-600">FAQ</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                Stay safe from phishing links, in real time.
              </h1>
              <p className="mt-4 text-white/90 md:text-lg">
                PhishGuard detects and flags suspicious URLs using metadata, content features, domain checks, and your ML backend API—before you click.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href="/PhishGuard.zip"
                  download
                  className="inline-flex items-center gap-2 rounded-md bg-white text-slate-900 px-5 py-3 font-semibold hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  ⬇️ Download Extension
                </a>
                <a
                  href="#install"
                  className="inline-flex items-center gap-2 rounded-md bg-transparent ring-1 ring-white/60 text-white px-5 py-3 font-semibold hover:bg-white/10"
                >
                  Installation Guide
                </a>
              </div>
              <p className="mt-3 text-white/80 text-sm">
                Put <code className="bg-black/20 px-1 py-0.5 rounded">PhishGuard.zip</code> in the public/ directory so this button works.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 ring-1 ring-white/20">
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>URL Risk</span>
                  <span className="rounded-md bg-red-500 px-2 py-0.5 text-white text-xs font-bold">High</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>HTTPS</span>
                  <span className="rounded-md bg-green-500 px-2 py-0.5 text-white text-xs font-bold">Valid</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Domain Age</span>
                  <span className="rounded-md bg-yellow-500 px-2 py-0.5 text-white text-xs font-bold">Young</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Keyword Flags</span>
                  <span className="rounded-md bg-red-500 px-2 py-0.5 text-white text-xs font-bold">login, verify</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-bold">What is phishing?</h2>
        <p className="mt-4 text-slate-600">
          Phishing is a social engineering attack where adversaries impersonate trusted services to trick users into revealing sensitive information like passwords, OTPs, or payment details. Attackers use deceptive URLs, look‑alike domains, and urgent language.
        </p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-lg font-semibold">{f.title}</div>
              <p className="mt-2 text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Learn */}
      <section id="learn" className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold">How PhishGuard detects risky URLs</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 text-slate-600">
            <li>Domain & TLD heuristics (e.g., suspicious TLDs, excessive subdomains, IP hosts)</li>
            <li>URL structure cues (length, special characters, keyword patterns like login/verify)</li>
            <li>Security checks (HTTPS presence)</li>
            <li>Optional ML backend via API for high-accuracy classification</li>
          </ul>
        </div>
      </section>

      {/* Install */}
      <section id="install" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-bold">Install the extension</h2>
        <ol className="mt-4 list-decimal pl-6 space-y-2 text-slate-600">
          {installSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        <div className="mt-6">
          <a
            href="/PhishGuard.zip"
            download
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 text-white px-5 py-3 font-semibold hover:bg-indigo-700"
          >
            ⬇️ Download Extension ZIP
          </a>
        </div>
        <p className="mt-3 text-sm text-slate-500">
          Tip: Put your zipped extension (manifest, background.js, content.js, etc.) as <code className="bg-slate-100 px-1 rounded">public/PhishGuard.zip</code>.
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold">FAQ</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="font-semibold">Does the extension send my data to a server?</div>
              <p className="mt-2 text-slate-600">
                No personal data. URLs may be sent to your API only if you enable it in the extension settings.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="font-semibold">Is Manifest V3 supported?</div>
              <p className="mt-2 text-slate-600">
                Yes. It uses background service worker + content scripts and a non-blocking approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-slate-900 text-slate-300">
        <div className="mx-auto max-w-6xl px-4 text-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} PhishGuard. Stay safe online.</div>
          <div className="flex gap-4">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#install" className="hover:text-white">Install</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App