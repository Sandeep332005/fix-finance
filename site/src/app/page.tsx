import { CopyCommand } from "./copy-command";
import { VideoModal } from "./video-modal";
import { TerminalDemo } from "./terminal-demo";
import { PIIScramble } from "./pii-scramble";
import { Reveal } from "./reveal";
import { Nav } from "@/components/nav";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Ray Finance",
  description:
    "Other finance apps show you what you spent. Ray tells you what to do. An open-source AI financial advisor that learns your full situation, uses your real bank data, and runs locally on your machine.",
  applicationCategory: "FinanceApplication",
  applicationSubCategory: "AI Financial Advisor",
  operatingSystem: "macOS, Linux, Windows",
  url: "https://rayfinance.app",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Self-hosted with your own API keys",
    },
    {
      "@type": "Offer",
      price: "10",
      priceCurrency: "USD",
      description: "Ray API Key — managed setup",
    },
  ],
  license: "https://opensource.org/licenses/MIT",
  featureList: [
    "AI-powered financial advice from real bank data",
    "Local-first — all data stays on your machine",
    "Connects to 12,000+ banks via Plaid",
    "Open source (MIT licensed)",
    "PII-masked AI queries",
    "Spending analysis and budget tracking",
    "Net worth tracking across all accounts",
    "Debt payoff planning",
    "Cash flow projection",
    "Financial goal tracking",
  ],
};

const faqItems = [
  {
    question: "What does Ray do?",
    answer:
      "Every other finance app shows you what you spent. Ray tells you what to do about it. It's an AI financial advisor that connects to your bank via Plaid and learns your full situation — family, income, goals, strategy, and key decisions. Ask \"can I afford this trip?\" or \"should I pay off debt or invest?\" and Ray gives you a real recommendation grounded in your actual numbers, not generic advice. Every answer ends with a next move, not another chart.",
  },
  {
    question: "How does Ray keep my financial data private?",
    answer:
      "Ray runs entirely on your computer. Your financial data is stored in an encrypted SQLite database on your machine — there's no cloud account, no server, and no company storing your bank data. When Ray uses AI, it strips personally identifiable information before sending anything to the AI model. It's open source (MIT licensed) so you can verify this yourself.",
  },
  {
    question: "How is Ray different from Monarch, Copilot, or YNAB?",
    answer:
      "Those apps show you what happened. They sort your transactions into pie charts and send you notifications — and the work of figuring out what to do with that information is still yours. Ray closes that loop. Ask \"how should I tackle my debt?\" and instead of a chart of your minimum payments, Ray says \"throw $440/mo at the Chase card first — it's at 24.9% — that clears it by September.\" Ray also keeps all data local on your machine instead of on cloud servers, and can be self-hosted for free.",
  },
  {
    question: "What can I ask Ray?",
    answer:
      "Anything about your finances. Example questions: \"Can I afford to take this trip?\", \"Am I on track to save $10k by December?\", \"What's my monthly burn rate?\", \"Did anything unusual hit my account this week?\", and \"How much should I set aside for quarterly taxes?\" Ray has 30+ tools that query your real financial data to give accurate answers.",
    link: { href: "/prompts", text: "See more example prompts" },
  },
  {
    question: "How much does Ray cost?",
    answer:
      "Ray has two plans. The free plan is fully open source (MIT licensed) — you install it with npm, bring your own AI provider (Anthropic, OpenAI, Ollama, or any OpenAI-compatible endpoint) and your own Plaid credentials for bank access. You pay your provider directly for AI usage, which is typically $1–3/month. The tradeoff is setup: Plaid production access requires a business entity, isn't guaranteed, and takes 1–2 weeks if approved. Ray Pro is $10/month and includes everything — AI and bank connectivity are built in, so you just install and connect your accounts in minutes. Both plans are the same app with the same features, and both keep all your financial data local on your machine. The only difference is whether you manage your own API keys or let Ray handle it.",
  },
  {
    question: "Which banks does Ray work with?",
    answer:
      "Ray connects to 12,000+ financial institutions through Plaid — including Chase, Bank of America, Wells Fargo, Capital One, American Express, Fidelity, Schwab, Robinhood, Vanguard, SoFi, Ally, and thousands more. If your bank works with Plaid, it works with Ray.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <main id="main">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-stone-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav />
      <Hero />
      <Terminal />
      <Reveal><Context /></Reveal>
      <Reveal><Story /></Reveal>
      <HowItWorks />
      <Reveal><Features /></Reveal>
      <Reveal><Privacy /></Reveal>
      <Reveal><SupportedBanks /></Reveal>
      <Reveal><Pricing /></Reveal>
      <Reveal><FAQ /></Reveal>
      <CTA />
    </main>
  );
}


/* ─── Npm Downloads ─── */
async function NpmDownloads() {
  let downloads: number | null = null;
  try {
    const res = await fetch("https://api.npmjs.org/downloads/point/last-month/ray-finance", {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      downloads = data.downloads ?? null;
    }
  } catch {}
  if (!downloads) return null;

  return (
    <span>{" · "}{downloads.toLocaleString()} installs this month</span>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="pt-32 pb-10 sm:pt-40">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h1 className="animate-fade-up text-5xl leading-[1.08] font-extrabold tracking-tight text-stone-950 sm:text-6xl">
          Talk to your&nbsp;money
        </h1>
        <p className="animate-fade-up-delay-1 mx-auto mt-5 max-w-md text-base leading-relaxed text-stone-500">
          Every other finance app shows you what you spent.{" "}
          <span className="font-medium text-stone-900">Ray tells you what to do about it</span>
          &mdash;using your real bank data, running locally on your machine.
        </p>
        <div className="animate-fade-up-delay-2 mt-8 flex flex-col items-center gap-3">
          <CopyCommand
            command="npm install -g ray-finance"
            className="rounded-full bg-stone-900 px-5 py-2.5 text-sm text-white transition-colors hover:bg-stone-800 [&>span:first-child]:text-stone-500"
          />
          <VideoModal youtubeId="-ULzglbZmPg">
            <span className="text-sm text-stone-500 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-stone-700">
              Watch the demo
            </span>
          </VideoModal>
        </div>
        <p className="animate-fade-up-delay-2 mt-8 text-xs text-stone-400">
          Loved by users
          {" · "}
          <a
            href="https://github.com/cdinnison/ray-finance"
            className="transition-colors hover:text-stone-600"
          >
            Open source, MIT licensed
          </a>
          {" · "}
          <a
            href="https://www.producthunt.com/products/ray-7"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-stone-600"
          >
            #2 Product of the Day on Product Hunt
          </a>
          <NpmDownloads />
        </p>
      </div>
    </section>
  );
}

/* ─── Terminal Demo ─── */
function Terminal() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-3xl px-6">
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-stone-950">
          <TerminalDemo />
        </div>
      </div>
    </section>
  );
}


/* ─── Story ─── */
function Story() {
  return (
    <section id="story" className="py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-2xl font-bold tracking-tight text-stone-950 sm:text-3xl">
          You know what you&nbsp;spent. Now&nbsp;what?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-stone-500">
          Every finance tool ever built is great at showing you the past. None of them tell you what to do next. That&rsquo;s the gap Ray fills.
        </p>

        <div className="mt-14 space-y-12">
          <StoryBlock
            label="The Apps"
            title="Dashboards show. They don't tell."
            body="Monarch, Copilot, YNAB, Mint — they sort your transactions
              into pie charts and send you notifications. They're great at
              showing you what you spent. Then they stop. What to do about it
              is still your job. And when your subscription expires, so does
              your data."
          />

          <StoryBlock
            label="The Spreadsheets"
            title="Powerful, but you still do all the work."
            body="You built the perfect spreadsheet once. Formulas, projections,
              a debt payoff timeline. Even with Tiller syncing your data,
              you're still the one analyzing rows, updating formulas, and
              deciding what any of it means. The spreadsheet never tells you
              what to do next, either."
          />

          <StoryBlock
            label="Then there's Ray"
            title="The only one that actually tells you what to do."
            body={`Ask "can I afford this?" and you don't get another chart — you get a yes, a no, or a "not yet, and here's what would change that." Ray factors in your real situation, queries your actual bank data, and hands you a decision. It remembers your goals, your family, your strategy, and every call you've made together. Every conversation ends with a next move.`}
          />
        </div>
      </div>
    </section>
  );
}

function StoryBlock({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <p className="font-mono text-xs tracking-widest text-stone-400 uppercase">
        {label}
      </p>
      <h3 className="mt-2 text-lg font-semibold tracking-tight text-stone-950">
        {title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-stone-500">{body}</p>
    </div>
  );
}

/* ─── How It Works ─── */
function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Install in seconds",
      description:
        "One npm command. No accounts, no sign-ups, no app store.",
      code: "npm install -g ray-finance",
    },
    {
      num: "02",
      title: "Connect your bank",
      description:
        "Securely link your accounts through Plaid. Bank-level encryption.",
      code: "ray link",
    },
    {
      num: "03",
      title: "Ask anything",
      description:
        "Get instant, AI-powered answers about your spending, savings goals, subscriptions, and financial health.",
      code: "Am I on track to save $10k?",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <p className="font-mono text-xs tracking-widest text-stone-400 uppercase">
          How it works
        </p>

        <div className="mt-10 space-y-10">
          {steps.map((step) => (
            <div key={step.num} className="flex gap-5">
              <span className="font-mono text-sm text-stone-300">
                {step.num}
              </span>
              <div>
                <h3 className="text-base font-semibold text-stone-950">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-500">
                  {step.description}
                </p>
                <p className="mt-3 font-mono text-xs text-stone-500">
                  <span className="text-stone-300">$ </span>
                  {step.code}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Supported Banks ─── */
const banks: { name: string; file: string; className?: string }[] = [
  { name: "Chase", file: "chase" },
  { name: "Bank of America", file: "bankofamerica" },
  { name: "Wells Fargo", file: "wellsfargo" },
  { name: "Capital One", file: "capitalone" },
  { name: "American Express", file: "americanexpress" },
  { name: "Fidelity", file: "fidelity" },
  { name: "Charles Schwab", file: "schwab" },
  { name: "Robinhood", file: "robinhood" },
  { name: "Vanguard", file: "vanguard" },
  { name: "SoFi", file: "sofi" },
  { name: "Ally", file: "ally" },
  { name: "PayPal", file: "paypal" },
  { name: "Venmo", file: "venmo" },
  { name: "Discover", file: "discover" },
];

function SupportedBanks() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <p className="font-mono text-xs tracking-widest text-stone-400 uppercase">
          Integrations
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-stone-950 sm:text-3xl">
          Works with your bank, brokerage, and lender.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-stone-500">
          Ray connects to 12,000+ financial institutions through Plaid — from
          major banks to local credit unions.
        </p>

        <div className="mt-12 grid grid-cols-3 items-center gap-x-8 gap-y-8 sm:grid-cols-5">
          {banks.map((bank) => (
            <div key={bank.file} className="flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/banks/${bank.file}.svg`}
                alt={bank.name}
                className={`${bank.className ?? "h-5"} w-auto opacity-50 grayscale`}
              />
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-stone-400">
          And 12,000+ more institutions supported via Plaid.
        </p>
      </div>
    </section>
  );
}

/* ─── Context ─── */
function Context() {
  const items = [
    { label: "Family situation", example: "Married, two kids, one income" },
    { label: "Career stage", example: "Just started a new job at $95k" },
    { label: "Financial goals", example: "Pay off student loans by 2027" },
    { label: "Risk tolerance", example: "Conservative — no crypto" },
    { label: "Life events", example: "Baby due in March, buying a house" },
    { label: "Past decisions", example: "We cut DoorDash last month" },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <p className="font-mono text-xs tracking-widest text-stone-400 uppercase">
          What makes Ray different
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-stone-950 sm:text-3xl">
          Tell Ray once. It remembers&nbsp;everything.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-stone-500">
          Ray keeps a persistent profile of your life&nbsp;&mdash; family,
          income, goals, strategy, and key decisions. That&rsquo;s why it
          can tell you what to do, not just show you what you spent. The
          advice you get on day&nbsp;30 is nothing like day&nbsp;one,
          because Ray remembers everything that happened on
          days&nbsp;1&nbsp;through&nbsp;29.
        </p>

        <dl className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.label}>
              <dt className="text-sm font-medium text-stone-950">
                {item.label}
              </dt>
              <dd className="mt-0.5 text-sm text-stone-400">
                {item.example}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Before / After — terminal-style */}
      <div className="mx-auto max-w-3xl px-6">
        <div className="mt-16 overflow-hidden rounded-xl border border-stone-200 bg-stone-950">
          {/* Title bar */}
          <div className="relative flex items-center border-b border-stone-800 px-4 py-3">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-stone-700" />
              <div className="h-3 w-3 rounded-full bg-stone-700" />
              <div className="h-3 w-3 rounded-full bg-stone-700" />
            </div>
            <span className="absolute inset-x-0 text-center font-mono text-xs text-stone-500">
              generic AI vs ray
            </span>
          </div>

          {/* Threads */}
          <div className="divide-y divide-stone-800">
            <TerminalThread
              question="how should I deal with my debt?"
              generic="You should aim to save 15–20% of your income. Consider building a 3–6 month emergency fund, then focus on paying off high-interest debt."
              ray="You've got $34,200 in debt across two cards and a car loan. At $95k with two kids and a baby coming in March, I'd pause the Japan fund and throw that $440/mo at the Chase card — it's at 24.9%. That clears it by September and frees up $340/mo before the baby arrives."
            />
            <TerminalThread
              question="can I take this trip to Tahoe?"
              generic="A weekend trip can cost $500–$2,000 depending on the destination. Make sure it fits your budget and doesn't derail your savings goals."
              ray="Tahoe would run about $1,200 with the Airbnb and gas. You can swing it, but it'll push your 401k contribution below the $23,000 max this year — you'd need to bump it back to 18% in May to catch up. Want me to map that out?"
            />
            <TerminalThread
              question="is my rent too high?"
              generic="It depends on your income, expenses, and financial goals. Generally, you should avoid spending more than 30% of income on housing."
              ray="Your rent is $2,400 against $6,100 take-home — that's 39%, which is high. But you told me last week you're planning to move in with your partner in June. Once you split rent, housing drops to 22% and frees up $900/mo for the student loan blitz."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TerminalThread({
  question,
  generic,
  ray,
}: {
  question: string;
  generic: string;
  ray: string;
}) {
  return (
    <div className="px-5 py-5 font-mono text-[11px] leading-[1.7] sm:px-7 sm:py-6 sm:text-[12px]">
      {/* User question */}
      <p className="text-white">
        <span className="text-stone-500">{"❯ "}</span>
        {question}
      </p>

      {/* Generic response — crossed out */}
      <div className="mt-3">
        <p className="text-stone-600 text-[10px] sm:text-[11px] uppercase tracking-wider mb-1">
          chatgpt
        </p>
        <p className="text-stone-600 line-through decoration-stone-700">
          {generic}
        </p>
      </div>

      {/* Ray response */}
      <div className="mt-3">
        <p className="text-lime-400 text-[10px] sm:text-[11px] uppercase tracking-wider mb-1">
          ray
        </p>
        <p className="text-stone-300">
          {ray}
        </p>
      </div>
    </div>
  );
}

/* ─── Privacy ─── */
function Privacy() {
  return (
    <section id="privacy" className="py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <p className="font-mono text-xs tracking-widest text-stone-400 uppercase">
          Privacy
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-stone-950 sm:text-3xl">
          Your financial data is never stored outside your machine.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-stone-500">
          Ray runs entirely on your computer. There&rsquo;s no cloud, no
          account, no server storing your data. Your financial history lives
          in an encrypted database on your hard drive, and your name is
          scrubbed before anything reaches the AI.
        </p>

      </div>

      <div className="mx-auto mt-12 max-w-3xl px-6">
        <PIIScramble />
      </div>

      <div className="mx-auto max-w-2xl px-6">
        <div className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2">
          <PrivacyCard
            title="Encrypted at rest"
            description="Your data is encrypted on disk with the same standard used by banks. No one else can read it."
            href="https://github.com/cdinnison/ray-finance/blob/main/src/db/schema.ts"
          />
          <PrivacyCard
            title="No cloud storage"
            description="Everything stays in ~/.ray on your machine. No servers or security breaches to worry about."
          />
          <PrivacyCard
            title="Fully auditable"
            description="Every AI tool call is logged locally. You can see exactly what data was accessed and when."
            href="https://github.com/cdinnison/ray-finance/blob/main/src/ai/agent.ts"
          />
          <PrivacyCard
            title="Two outbound calls"
            description="Plaid for bank sync, your AI provider for chat (PII-masked). That's it. No telemetry. No analytics."
            href="https://github.com/cdinnison/ray-finance/blob/main/src/plaid/client.ts"
          />
        </div>
      </div>
    </section>
  );
}

function PrivacyCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href?: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-medium text-stone-950">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-stone-500">
        {description}
      </p>
      {href && (
        <a
          href={href}
          className="mt-2 inline-block font-mono text-xs text-stone-400 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-stone-600"
        >
          view source
        </a>
      )}
    </div>
  );
}

/* ─── Features ─── */
function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <p className="font-mono text-xs tracking-widest text-stone-400 uppercase">
          What Ray can do
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-stone-950 sm:text-3xl">
          Not a dashboard. Not a chatbot. An advisor that tells you what to do.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-stone-500">
          Ray has 30+ tools that query your real bank data, run the math, and
          hand you the next move &mdash; not another chart.
        </p>

        <div className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2">
          <Feature
            question={`"Can I afford to take this trip?"`}
            description="Ray projects your balance forward based on actual income and spending patterns. See the impact before you commit."
          />
          <Feature
            question={`"How's my score today?"`}
            description="A daily 0-100 behavior score with streaks and unlockable achievements. No restaurants for a week? That's Kitchen Hero. Five zero-spend days? Monk Mode. It turns financial discipline into a game you actually want to play."
          />
          <Feature
            question={`"What did we decide last time?"`}
            description="Ray remembers your goals, preferences, life events, and past decisions. Every conversation builds on the last one."
          />
          <Feature
            question={`"What's my net worth right now?"`}
            description="Ray pulls balances across every linked account — checking, savings, credit cards, loans — and gives you one number. Updated every time you ask."
          />
          <Feature
            question={`"Did anything unusual hit my account this week?"`}
            description="Ray scans recent transactions for anomalies — unexpected charges, duplicate payments, amounts that don't match your patterns. Like a financial advisor who actually checks."
          />
          <Feature
            question={`"Can you audit to make sure my tenants have paid for the past 12 months?"`}
            description="Ray searches your real transaction history, flags gaps, and gives you a straight answer. Landlord, freelancer, whatever — if the data is in your bank, Ray can check it."
          />
        </div>
      </div>
    </section>
  );
}

function Feature({
  question,
  description,
}: {
  question: string;
  description: string;
}) {
  return (
    <div>
      <h3 className="font-mono text-sm font-medium text-stone-950">
        {question}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-stone-500">
        {description}
      </p>
    </div>
  );
}

/* ─── Pricing ─── */
function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <p className="font-mono text-xs tracking-widest text-stone-400 uppercase">
          Pricing
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-stone-950 sm:text-3xl">
          Free forever. Or skip the setup.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-stone-500">
          Two ways to run Ray. Both keep your data local.
        </p>

        <div className="mt-12 grid items-start gap-x-10 gap-y-14 sm:grid-cols-2">
          {/* BYOK */}
          <div className="border-t border-stone-200 pt-6">
            <h3 className="text-base font-semibold text-stone-950">Bring Your Own Keys</h3>
            <p className="mt-0.5 text-sm text-stone-500">Free and open source forever</p>
            <p className="mt-5">
              <span className="text-3xl font-bold tracking-tight text-stone-900">
                $0
              </span>
              <span className="text-sm text-stone-500">/forever</span>
            </p>
            <ul className="mt-6 space-y-2 text-sm leading-relaxed text-stone-500">
              <li>Open source, MIT licensed</li>
              <li>Your own AI key (Anthropic, OpenAI, Ollama, etc.)</li>
              <li>Your own Plaid (US/Canada) or Bridge (Europe) credentials</li>
              <li>Full model selection</li>
              <li>All features included</li>
            </ul>
            <CopyCommand
              command="npm install -g ray-finance"
              className="mt-7 text-sm text-stone-900 [&>span:first-child]:text-stone-400"
            />
            <a
              href="https://github.com/cdinnison/ray-finance"
              className="mt-3 block text-xs text-stone-400 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-stone-600"
            >
              View source on GitHub
            </a>

            <details className="group mt-7">
              <summary className="flex cursor-pointer items-center gap-1.5 text-xs text-stone-400 transition-colors select-none hover:text-stone-600">
                <svg className="h-3 w-3 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                Steps to self-host
                <span className="font-mono text-[10px] text-stone-300 group-open:hidden">~2 weeks</span>
              </summary>
              <div className="mt-4 space-y-4 border-l border-stone-200 pl-4">
                <SetupStep time="~5 min" href="/guides/get-anthropic-api-key">
                  Get an AI API key (Anthropic, OpenAI, or run Ollama locally)
                </SetupStep>
                <SetupStep time="~5 min" href="/guides/get-plaid-credentials">
                  Create Plaid developer account
                </SetupStep>
                <SetupStep time="1-2 weeks" href="/guides/get-plaid-credentials">
                  Apply for Plaid production access
                </SetupStep>
                <SetupStep time="~5 min">
                  Run <code className="rounded bg-stone-100 px-1 py-0.5">ray setup</code>, paste keys
                </SetupStep>
                <SetupStep time="~2 min">
                  Run <code className="rounded bg-stone-100 px-1 py-0.5">ray link</code> to connect bank
                </SetupStep>
              </div>
              <p className="mt-4 font-mono text-[11px] text-stone-400">
                ~20 min of work + 1-2 week wait for Plaid approval
              </p>
            </details>
          </div>

          {/* Ray Pro */}
          <div className="border-t border-stone-900 pt-6">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-base font-semibold text-stone-950">Ray Pro</h3>
              <span className="font-mono text-[10px] tracking-widest text-stone-400 uppercase">
                most popular
              </span>
            </div>
            <p className="mt-0.5 text-sm text-stone-500">Just install and go</p>
            <p className="mt-5">
              <span className="text-3xl font-bold tracking-tight text-stone-900">
                $10
              </span>
              <span className="text-sm text-stone-500">/month</span>
            </p>
            <ul className="mt-6 space-y-2 text-sm leading-relaxed text-stone-500">
              <li>AI and bank connection included</li>
              <li>Connect your accounts in seconds</li>
              <li>Your data stays on your machine</li>
              <li>All features, no limits</li>
              <li>Cancel anytime</li>
            </ul>
            <CopyCommand
              command="npm install -g ray-finance"
              className="mt-7 inline-block rounded-full bg-stone-900 px-5 py-2.5 text-sm text-white transition-colors hover:bg-stone-800 [&>span:first-child]:text-stone-500"
            />

            <details className="group mt-7">
              <summary className="flex cursor-pointer items-center gap-1.5 text-xs text-stone-400 transition-colors select-none hover:text-stone-600">
                <svg className="h-3 w-3 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                Steps to sign up
                <span className="font-mono text-[10px] text-stone-300 group-open:hidden">~5 min</span>
              </summary>
              <div className="mt-4 space-y-4 border-l border-stone-200 pl-4">
                <SetupStep time="~2 min">
                  Run <code className="rounded bg-stone-100 px-1 py-0.5">ray setup</code> to get your key
                </SetupStep>
                <SetupStep time="~1 min">
                  Run <code className="rounded bg-stone-100 px-1 py-0.5">ray link</code> to connect bank
                </SetupStep>
              </div>
              <p className="mt-4 font-mono text-[11px] text-stone-400">
                Total: ~3 minutes
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}

function SetupStep({ children, time, href }: { children: React.ReactNode; time: string; href?: string }) {
  const content = (
    <div className="flex items-start justify-between gap-3">
      <p className="text-xs text-stone-500">{children}</p>
      <span className="shrink-0 font-mono text-[10px] text-stone-400">
        {time}
      </span>
    </div>
  );
  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className="block hover:opacity-70 transition-opacity">{content}</a>;
  }
  return content;
}

/* ─── FAQ ─── */
function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <p className="font-mono text-xs tracking-widest text-stone-400 uppercase">
          FAQ
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-stone-950 sm:text-3xl">
          Common questions about Ray
        </h2>

        <div className="mt-10 divide-y divide-stone-200">
          {faqItems.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer items-start justify-between gap-4">
                <h3 className="text-base font-medium text-stone-900">
                  {item.question}
                </h3>
                <svg
                  className="mt-1 h-4 w-4 shrink-0 text-stone-400 transition-transform group-open:rotate-45"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-stone-500">
                {item.answer}
                {item.link && (
                  <>
                    {" "}
                    <a href={item.link.href} className="text-stone-900 underline decoration-stone-300 underline-offset-4 hover:text-stone-700">
                      {item.link.text} &rarr;
                    </a>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-stone-950 sm:text-3xl">
          Stop tracking. Start&nbsp;deciding.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-stone-500">
          Every other finance app shows you what you spent. Ray tells you
          what to do. Free, open source, and takes five minutes to set up.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <CopyCommand
            command="npm install -g ray-finance"
            className="rounded-full bg-stone-900 px-5 py-2.5 text-sm text-white transition-colors hover:bg-stone-800 [&>span:first-child]:text-stone-500"
          />
          <div className="flex items-center gap-5 text-sm">
            <a
              href="https://github.com/cdinnison/ray-finance"
              className="text-stone-500 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-stone-900"
            >
              View on GitHub
            </a>
            <a
              href="#pricing"
              className="text-stone-500 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-stone-900"
            >
              Compare plans
            </a>
          </div>
        </div>

        {/* Founder story */}
        <div className="mx-auto mt-20 max-w-xl border-t border-stone-200 pt-12 text-left">
          <p className="text-base leading-relaxed text-stone-500 italic">
            &ldquo;I tried every finance app, built every spreadsheet, and talked to
            a financial advisor who charged $200/hr to tell me things I already
            knew. Nothing actually helped me make better decisions with my own
            money. So I built the thing I wanted&nbsp;&mdash; an advisor that
            knows my real numbers, runs locally, and is honest enough to
            open&#8209;source.&rdquo;
          </p>
          <p className="mt-5 text-sm text-stone-400">
            &mdash;{" "}
            <a
              href="https://github.com/cdinnison"
              className="underline decoration-stone-300 underline-offset-4 transition-colors hover:text-stone-600"
            >
              Clark Dinnison
            </a>
            , creator of Ray
          </p>
        </div>
      </div>
    </section>
  );
}
