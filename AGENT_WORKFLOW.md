# AI Agent Workflow Log

## Agents Used

- **Claude (claude.ai)** — Primary agent used throughout the project for architecture design, code generation, debugging, and refactoring.

---

## Prompts & Outputs

### Example 1 — Project Structure

**Prompt:**
> "give github repo name, folder and files structure"

**Output:**
Claude generated the complete repo name `fueleu-maritime-compliance` and full folder structure for both frontend and backend following hexagonal architecture with all files listed including domain, usecases, ports, controllers, repositories, migrations, and seeds.

**Value:** Saved 2+ hours of architecture planning. Got production-ready structure in one shot.

---

### Example 2 — Backend Server Setup

**Prompt:**
> "how to create database and connect?"

**Output:**
Claude provided complete PostgreSQL setup including database creation commands, `.env` configuration, `connection.ts` using `pg.Pool`, migration runner, and seed file with all 5 routes from the KPI dataset.

**Value:** Full database layer ready in minutes including migrations and seeding.

---

### Example 3 — All API Routes

**Prompt:**
> "now create all the mentioned routes in the assignment"

**Output:**
Claude generated all domain entities, port interfaces, use cases (ComputeCB, ComputeComparison, BankSurplus, ApplyBanked, CreatePool), PostgreSQL repositories, HTTP controllers, and Express route files for `/routes`, `/compliance`, `/banking`, `/pools` — all wired together in `app.ts`.

**Value:** Entire backend API built in one structured response following hexagonal architecture strictly.

---

### Example 4 — TypeScript Error Fix

**Prompt:**
> "Argument of type 'string | string[] | undefined' is not assignable to parameter of type 'string'. Type 'undefined' is not assignable to type 'string'.ts(2345) const id: string | string[] | undefined"

**Output:**
Claude first suggested adding an `if (!id)` check, which partially fixed it. After pasting the remaining error, Claude provided the final fix using `const id = req.params.id as string` type casting.

**Correction:** Required two iterations — first fix did not fully resolve the TypeScript strict mode complaint.

---

### Example 5 — Unit and Integration Tests

**Prompt:**
> "Testing Checklist: Unit — ComputeComparison, ComputeCB, BankSurplus, ApplyBanked, CreatePool. Integration — HTTP endpoints via Supertest. Data — Migrations + Seeds load correctly. Edge cases — Negative CB, over-apply bank, invalid pool. now this is very important. lets give code for this"

**Output:**
Claude generated all 5 unit test files with Jest mocks and all 4 integration test files using Supertest covering success cases, error cases, and all edge cases listed in the assignment checklist.

**Value:** Complete test suite generated covering 30 test cases across unit and integration layers.

---

### Example 6 — Integration Test Failures

**Prompt:**
> *(pasted full Jest output showing 5 failed tests with error messages)*

**Output:**
Claude identified three root causes — missing `beforeAll` setup in integration tests, CB data not existing before banking/pooling tests ran, and the pooling test using R002+R003 whose sum was negative. Fixed by adding `beforeAll` blocks to compute CB before each test suite.

**Correction:** Pooling test still failed. After pasting debug logs showing `R002 CB: 263082240`, `R003 CB: -870525120`, `SUM: -607442880`, Claude corrected the test to use R002+R004 which form a valid pool.

---

### Example 7 — Database Constraint Error

**Prompt:**
> *(pasted Jest output showing: `error: there is no unique or exclusion constraint matching the ON CONFLICT specification`)*

**Output:**
Claude identified the missing UNIQUE constraint on `ship_compliance(ship_id, year)` and provided the exact SQL fix:
```sql
ALTER TABLE ship_compliance ADD CONSTRAINT unique_ship_year UNIQUE (ship_id, year);
```

**Value:** Root cause identified instantly from error message. One SQL command fixed all compliance and banking test failures.

---

### Example 8 — Frontend Build

**Prompt:**
> "only frontend"

**Output:**
Claude built the complete React frontend with all 4 tabs — Routes, Compare, Banking, Pooling — including API clients, shared components, hooks, filters, a Recharts bar chart for GHG comparison, KPI cards, and full TailwindCSS styling.

---

### Example 9 — UI Styling

**Prompt:**
> "didnt add css. webpage looks very ugly"

**Output:**
Claude rewrote all components with a professional dark navy/slate theme — gradient navbar, animated tab bar with icons, dark tables with hover states, color-coded GHG values, styled KPI cards, loading spinners, and consistent dark backgrounds across all 4 tabs.

**Value:** UI went from plain unstyled HTML to a professional-looking dashboard in one response.

---

## Validation / Corrections

### Correction 1 — Pool Test Ship Selection
Initial pooling test used R002 + R003. After running tests and printing CB values, sum was `-607,442,880` which is negative and correctly rejected by the pool validation. Fixed by switching to R002 + R004 which both have surplus or near-zero CB values forming a valid pool.

### Correction 2 — Missing DB Unique Constraint
The `ON CONFLICT (ship_id, year)` clause in `ComplianceRepository` required a UNIQUE constraint that was missing from the original migration. Fixed by running `ALTER TABLE` in psql directly.

### Correction 3 — TypeScript Strict Mode in Controllers
`req.params.id` typed as `string | string[] | undefined` caused build errors. Fixed using `as string` type assertion after confirming Express always provides a string for named route params.

### Correction 4 — Integration Test Setup Order
Banking and pooling tests depended on CB records existing in the database. Added `beforeAll` blocks to compute CB for required ships before each test suite runs.

---

## Observations

### Where Agent Saved Time
- **Architecture** — Complete hexagonal structure generated instantly
- **Boilerplate** — All repositories, controllers, and route files scaffolded quickly
- **Formula** — CB calculation matched EU regulation spec on first attempt
- **Debugging** — Pasting exact error output got precise fixes immediately
- **Tests** — 30 test cases generated covering all assignment checklist items
- **UI** — Full dark theme applied across 15+ components in one response

### Where It Failed or Needed Correction
- **Test data assumptions** — Did not verify actual CB values before writing pooling test
- **Missing DB constraints** — UNIQUE constraint omitted from initial migration
- **Test setup ordering** — Did not add `beforeAll` CB setup steps initially
- **Multi-step errors** — TypeScript fix required two iterations

### How Tools Were Combined
- Claude used for all code generation, architecture, and debugging
- VS Code terminal used to run commands and capture real error output
- Exact error messages pasted back to Claude for targeted fixes
- Iterative loop: generate → run → paste error → fix → repeat

---

## Best Practices Followed

- **Exact error prompting** — Always pasted full error output instead of describing it vaguely
- **Incremental commits** — Used conventional commits: `feat:`, `fix:`, `test:`, `chore:`, `docs:`
- **Validate before moving on** — Ran `npm run dev` and `npm test` after every major change
- **Architecture first** — Folder structure and interfaces defined before any implementation
- **Separation of concerns** — Core domain layer kept completely free of Express or pg dependencies