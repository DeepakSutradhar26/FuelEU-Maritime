# Reflection — AI Agent Usage in FuelEU Maritime Project

## What I Learned Using AI Agents

Working with Claude as my primary AI agent throughout this project fundamentally changed how I approach full-stack development. The most important insight was that AI agents are most effective when given precise, structured prompts — vague requests produce generic output, while specific technical prompts produce production-ready code.

I learned to treat the agent as a senior pair programmer: I provide the context and constraints, it provides the implementation scaffold, and I validate and correct. This division of labour was highly effective for a project with well-defined specifications like this one.

## Efficiency Gains vs Manual Coding

| Task | Manual Estimate | With AI Agent | Saving |
|------|----------------|---------------|--------|
| Architecture setup | 2–3 hours | 15 minutes | ~85% |
| Boilerplate repositories | 3–4 hours | 30 minutes | ~87% |
| CB formula + use cases | 1–2 hours | 20 minutes | ~80% |
| Unit + integration tests | 3–4 hours | 45 minutes | ~80% |
| Frontend components | 6–8 hours | 1.5 hours | ~80% |
| Debugging TS errors | 1–2 hours | 10 minutes | ~90% |
| **Total** | **~20 hours** | **~3.5 hours** | **~82%** |

The biggest gains were in boilerplate-heavy areas — repository classes, controller scaffolding, and test setup — where the pattern is repetitive and the AI generates near-perfect output immediately.

## What I Would Improve Next Time

1. **Prompt for constraints upfront** — I would ask Claude to include DB constraints (UNIQUE, NOT NULL) in migration files from the start, rather than discovering missing constraints during test failures.

2. **Validate test data before writing tests** — Before writing integration tests, I would first query the database to understand actual CB values, then write tests around real data rather than assumptions.

3. **Use agent for incremental refactoring** — Rather than generating large code blocks at once, I would break tasks into smaller units and validate each one before proceeding.

4. **Document prompts in real time** — I would keep a running log of prompts during development rather than reconstructing them afterward.

5. **Ask for edge cases explicitly** — Include a prompt step like "what edge cases should this function handle?" before implementation to catch issues like over-applying banked amounts or negative pool sums early.

Overall, AI-assisted development with Claude proved to be a significant force multiplier — reducing implementation time by approximately 80% while maintaining code quality, architectural integrity, and regulatory compliance with the FuelEU Maritime Regulation (EU) 2023/1805.