# Fix

**Other finance apps show you what you spent. Fix tells you what to do.**

An AI financial advisor that turns your real bank data into your next move.

[![npm version](https://img.shields.io/npm/v/fix-finance.svg)](https://www.npmjs.com/package/fix-finance)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/Sandeep332005/fix-finance.svg?style=social)](https://github.com/Sandeep332005/fix-finance/stargazers)

You already know where the money went. That's the easy part — every app does it. The part that's missing is what to do about it. Fix is that part.

Tell Fix about your family, goals, and strategy once. From then on, every answer is a real recommendation grounded in your actual numbers — not another chart, not generic advice. Ask "can I afford this?" and Fix gives you a yes, a no, or a "not yet, and here's what would change that." Local-first. Encrypted. Built by us.

## Why Fix is different

**Dashboards show. Fix tells.** Monarch, Copilot, YNAB, Mint — they sort your transactions into pie charts and call it insight. You still have to figure out what to do next. Fix closes that loop: it takes your real bank data, factors in your goals and situation, and hands you the decision.

Example — you ask "how should I deal with my debt?"

- **ChatGPT:** "Aim to save 15–20% of your income. Consider a 3–6 month emergency fund, then focus on high-interest debt."
- **Your budgeting app:** A pie chart of debt payments by month.
- **Fix:** "You've got $34,200 across two cards and a car loan. At $95k with a baby coming in March, pause the Japan fund and throw that $440/mo at the Chase card — it's at 24.9%. That clears it by September and frees up $340/mo before the baby arrives."

That's the difference. Fix doesn't describe your situation back to you. It tells you what to do about it.

## Features

### It gets smarter every conversation

- **Your situation, always loaded** — Every conversation starts with your financial profile: family, income, goals, strategy, key decisions, and open items. Fix reads it all before you type a word.
- **Self-updating context** — Got a raise? Had a baby? Decided to pay off debt aggressively? Fix updates your profile automatically when your situation changes.
- **Long-term memory** — Mention you're saving for a house or that you cancelled a subscription. Fix remembers across every future conversation.

### Stay on track without trying

- **CFO personality** — Fix doesn't list options. It tells you what it would do and why, references your goals, and flags problems you haven't noticed yet.
- **Daily scoring** — A 0-100 behavior score with streaks and 14 unlockable achievements. No restaurants for a week? That's Kitchen Hero. Five zero-spend days? Monk Mode.
- **Budgets and goals** — Track spending limits by category and progress toward financial goals.
- **Smart alerts** — Large transactions, low balances, budget overruns.

### Your data never leaves your machine

- **Encrypted local database** — All data stays on your machine in an AES-256 encrypted SQLite database.
- **PII masking** — Names, account numbers, and identifying details are scrubbed before anything reaches the AI. Your data is analyzed, not exposed.

### Set it and forget it

- **Bank sync via Plaid or Bridge** — Connect checking, savings, credit cards, investments, and loans. Plaid supports 🇺🇸 United States and 🇨🇦 Canada. Bridge supports 🇪🇺 Europe (France and the broader EU via PSD2).
- **Scheduled daily sync** — Automatic bank sync via launchd (macOS) or cron (Linux).
- **Auto-recategorization** — Define rules to automatically re-label transactions.
- **Export/import** — Back up and restore your financial data.

## Install

```
npm install -g fix-finance
```

## Try It

Explore Fix with realistic fake data — no bank accounts needed.

```
fix demo                # seed a demo database
fix --demo status       # financial overview
fix --demo accounts     # linked accounts with balances
fix --demo spending     # spending breakdown by category
fix --demo budgets      # budget tracking
fix --demo goals        # financial goal progress
fix --demo score        # daily score, streaks, achievements
fix --demo alerts       # financial alerts
fix --demo transactions # recent transactions
```

The dashboard commands work with no setup at all. To also try the AI chat with demo data, run `fix setup` first and add an API key (Anthropic, OpenAI, or any OpenAI-compatible provider) — then `fix --demo` will start an interactive session where you can ask questions about the fake portfolio.

When you're ready to connect real accounts, run `fix link`.

## Quick Start

```
fix setup
```

The setup wizard offers two modes:

### Pro (quick setup)

We handle the API keys. Your data stays local. $10/mo.

1. Enter your name
2. Get a Fix API key (opens Stripe checkout)
3. Link your accounts — checking, savings, credit cards, investments, loans, mortgage
4. Done — daily sync auto-scheduled at 6am

### Bring your own keys

Bring your own AI and banking credentials. Free forever.

1. Pick your AI provider — Anthropic, OpenAI, Ollama (local), or any OpenAI-compatible endpoint
2. Enter your API key and pick a model
3. Enter your banking credentials — Plaid for 🇺🇸/🇨🇦 ([get free keys](https://dashboard.plaid.com/signup)), Bridge for 🇪🇺 Europe ([get free keys](https://dashboard.bridgeapi.io/signup)), or both
4. Link your accounts — checking, savings, credit cards, investments, loans, mortgage
5. Done

**Plaid OAuth banks (Chase, Capital One, etc.)** redirect through their bank's site, so you must:

- Set `PLAID_REDIRECT_URI=http://localhost:9876/oauth-return` (use your `FIX_PORT` if you changed it).
- In your [Plaid dashboard](https://dashboard.plaid.com) → Team Settings → API → Allowed redirect URIs, register the same URL. `http://localhost` is allowed by Plaid for local dev.

**Plaid optional products** — Investments and Liabilities are off by default. If your Plaid account is approved for them, opt in with `PLAID_OPTIONAL_PRODUCTS=investments,liabilities`. Leaving them on without approval will cause `fix link` to fail.

## Commands

Run `fix --help` to see all available commands.

| Command                   | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| `fix`                     | Interactive AI chat with your financial advisor         |
| `fix demo`                | Seed a demo database with realistic fake data           |
| `fix --demo <cmd>`        | Run any command against demo data                       |
| `fix setup`               | Configure API keys and preferences                      |
| `fix link`                | Connect a new bank account                               |
| `fix add`                 | Add a manual account (home, car, crypto, etc.)          |
| `fix remove`              | Remove a linked bank or manual account                  |
| `fix sync`                | Pull latest transactions and balances                   |
| `fix status`              | Quick financial dashboard                                |
| `fix accounts`            | Linked accounts with balances                            |
| `fix transactions`        | Recent transactions (filterable by category, merchant)  |
| `fix spending [period]`   | Spending breakdown by category                           |
| `fix budgets`             | Budget status and overruns                               |
| `fix goals`               | Financial goal progress                                  |
| `fix bills`               | Upcoming bills                                            |
| `fix recap [period]`      | Monthly spending recap                                    |
| `fix score`               | Daily score, streaks, and achievements                    |
| `fix alerts`              | Active financial alerts                                   |
| `fix export [path]`       | Export data to a backup file                               |
| `fix import <path>`       | Restore from a backup file                                  |
| `fix import-apple <path>` | Import Apple Card transactions from an Apple CSV export |
| `fix billing`             | Manage your Fix subscription (managed mode only)          |
| `fix update`              | Update Fix to the latest version                          |
| `fix doctor`              | Check system health                                        |

## How It Works

```
Checking · Savings · Credit · Investments · Loans · Mortgage
                          │
                 Plaid API · Bridge API
                          │
               ┌──────────▼──────────┐
               │   Local SQLite DB    │
               │  (AES-256 encrypted) │
               └──────────┬──────────┘
                          │
               ┌──────────▼──────────┐
               │      fix CLI         │
               │  insights · tools    │
               │  scoring · alerts    │
               └──────────┬──────────┘
                          │
                     LLM API
                   (PII-masked)
```

Two outbound calls: your bank aggregator (Plaid or Bridge) and your AI provider (PII-masked). Supports Anthropic, OpenAI, Ollama, and any OpenAI-compatible endpoint. Your financial data is never stored off your machine. No telemetry. No analytics.

## Apple Card

Apple Card isn't supported by Plaid, so Fix provides a CSV importer. Export your transactions from [card.apple.com](https://card.apple.com/) — the web portal lets you pick any date range, unlike the Wallet app which is limited to single statements. Then:

```
fix import-apple ~/Downloads/apple-card.csv --balance 1847.32
```

On first run Fix creates an "Apple Card" manual account. On subsequent monthly imports, rows are deduplicated by a stable hash of the full row content, so re-running is safe. If Apple retroactively updates pending charges or merchant names, use `--replace-range` to overwrite the CSV's date range authoritatively. Apple's categories are mapped to Fix's category taxonomy so transactions participate in spending, scoring, and budgets like any other account. If you've configured auto-recategorization rules (via the AI advisor's `add_recat_rule` tool), they're applied automatically after each import — no separate `fix sync` needed.

## Security & Privacy

- All financial data stored locally in `~/.fix/data/finance.db`
- Database encrypted with AES-256 (SQLCipher)
- Plaid and Bridge access tokens encrypted at rest with AES-256-GCM
- Config file stored with `0600` permissions
- PII redacted before sending to any AI provider
- No data leaves your machine — only API calls to your bank aggregator (Plaid or Bridge) and your AI provider

## Configuration

Fix stores everything in `~/.fix/`:

```
~/.fix/
  config.json          # API keys and preferences (0600 permissions)
  context.md            # Persistent financial context for AI
  data/
    finance.db           # Encrypted SQLite database
    demo.db               # Demo database (created by `fix demo`)
  sync.log               # Daily sync output
```

### Environment Variables

You can also configure Fix via environment variables or a `.env` file:

```
ANTHROPIC_API_KEY=          # Anthropic API key (if using Anthropic)
OPENAI_COMPATIBLE_KEY=      # API key for OpenAI or compatible provider
OPENAI_COMPATIBLE_BASE_URL= # Base URL (e.g. https://api.openai.com/v1, http://localhost:11434/v1)
FIX_PROVIDER=               # "anthropic" or "openai-compatible"
FIX_MODEL=                  # Model name (e.g. claude-sonnet-4-6, gpt-4o, llama3.1)
PLAID_CLIENT_ID=            # Plaid client ID (US/Canada banks)
PLAID_SECRET=                # Plaid secret key
PLAID_ENV=production         # Plaid environment
PLAID_REDIRECT_URI=          # Required for OAuth banks (Chase, Capital One). e.g. http://localhost:9876/oauth-return — must also be registered in your Plaid dashboard under Team Settings → API → Allowed redirect URIs
PLAID_OPTIONAL_PRODUCTS=     # Comma-separated, e.g. investments,liabilities — only enable if your Plaid account is approved for them
BRIDGE_CLIENT_ID=            # Bridge client ID (European banks)
BRIDGE_CLIENT_SECRET=        # Bridge client secret
BRIDGE_DEFAULT_EXTERNAL_USER_ID= # Optional: reuse an existing Bridge external_user_id
DB_ENCRYPTION_KEY=           # Database encryption key
PLAID_TOKEN_SECRET=          # Key for encrypting stored Plaid/Bridge tokens
FIX_API_KEY=                 # Fix API key (managed mode, replaces the above)
```

## Roadmap

- [x] Bring your own model — use any LLM provider (OpenAI, Ollama, open-source models, etc.)
- [ ] Daily digest email — morning summary of your finances
- [ ] **Investment portfolio & trading accounts** — asset allocation, sector/geography concentration, drift-from-target alerts, and rebalancing or tax-loss-harvesting suggestions for brokerage accounts already pulled in via Plaid/Bridge.
- [ ] **SIP / recurring mutual fund investing** — CSV/statement import from CAMS, KFintech, and major Indian brokers (following the same pattern as the Apple Card importer), with goal-timeline projection and underperformance flags for SIP contributions.
- [ ] **Retirement planning** — aggregate 401(k)/IRA/pension accounts, project balance at target retirement age, recommend contribution increases (including catch-up eligibility), and model a safe withdrawal rate for the drawdown phase.

Have an idea? [Open a PR](https://github.com/Sandeep332005/fix-finance/pulls).

## Support

Questions, feedback, or need help getting set up? [Open an issue](https://github.com/Sandeep332005/fix-finance/issues).

## Contributing

```
git clone https://github.com/Sandeep332005/fix-finance.git
cd fix-finance
npm install
npm run build
npm link   # Makes 'fix' available globally
```

PRs welcome. Please open an issue first for large changes.

## License

[MIT](./LICENSE)
