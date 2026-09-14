# AI Skills

Six independent skills for Codex and other agents that support the open Agent Skills format. They cover development planning, QA planning, test-case design, and Playwright test generation.

The skills are instruction packages loaded by an AI host. They are not standalone applications and do not require an OpenAI API key.

Repository: <https://github.com/cuongnguyen4285/ai-skills-project>

## Contents

| Skill                           | Use it for                                                                                          | Documentation                                                                                                                                              |
| ------------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `make-dev-plan`                 | Development plans with scope, effort, staffing, dependencies, risks, milestones, and schedule       | [SKILL.md](skills/make-dev-plan/SKILL.md) · [skills.sh](https://skills.sh/cuongnguyen4285/ai-skills-project/make-dev-plan)                                 |
| `make-qa-plan`                  | Risk-based QA plans, coverage, environments, test data, automation, staffing, and release readiness | [SKILL.md](skills/make-qa-plan/SKILL.md) · [skills.sh](https://skills.sh/cuongnguyen4285/ai-skills-project/make-qa-plan)                                   |
| `gen-api-test-cases`            | Requirement-driven, framework-independent API test cases and TestRail exports                       | [SKILL.md](skills/gen-api-test-cases/SKILL.md) · [skills.sh](https://skills.sh/cuongnguyen4285/ai-skills-project/gen-api-test-cases)                       |
| `gen-e2e-test-cases`            | Requirement-driven browser and user-journey test cases and TestRail exports                         | [SKILL.md](skills/gen-e2e-test-cases/SKILL.md) · [skills.sh](https://skills.sh/cuongnguyen4285/ai-skills-project/gen-e2e-test-cases)                       |
| `gen-api-test-cases-playwright` | Playwright API automation from existing API test cases                                              | [SKILL.md](skills/gen-api-test-cases-playwright/SKILL.md) · [skills.sh](https://skills.sh/cuongnguyen4285/ai-skills-project/gen-api-test-cases-playwright) |
| `gen-e2e-test-cases-playwright` | Playwright browser automation from existing E2E test cases                                          | [SKILL.md](skills/gen-e2e-test-cases-playwright/SKILL.md) · [skills.sh](https://skills.sh/cuongnguyen4285/ai-skills-project/gen-e2e-test-cases-playwright) |

The individual skills.sh links are the canonical public URLs. The repository-level URL may not display a page until the repository has been indexed.

## Requirements

- Node.js and `npx`.
- A compatible AI agent, such as Codex, Claude Code, Cursor, or another agent supported by the `skills` CLI.
- A public GitHub repository when you want skills.sh discovery and indexing.

No dependency installation is required in this repository. The `skills` CLI is run through `npx`.

## Install the skills

### Install all skills for Codex

Run this command in a terminal. Keep the GitHub URL or repository shorthand as plain terminal text; do not paste Markdown link syntax into the command.

```bash
npx skills add cuongnguyen4285/ai-skills-project \
  --agent codex \
  --skill '*' \
  --global \
  --yes
```

### Install one skill for Codex

```bash
npx skills add cuongnguyen4285/ai-skills-project \
  --agent codex \
  --skill gen-api-test-cases \
  --global \
  --yes
```

Replace `gen-api-test-cases` with any skill name from the table above.

### Install for every supported agent

```bash
npx skills add cuongnguyen4285/ai-skills-project \
  --agent '*' \
  --skill '*' \
  --global \
  --yes
```

Use `--global` for user-level installation. Omit it to install into the current project when the CLI supports project-scoped installation for your agent.

### Verify an installation

List the skills installed globally:

```bash
npx skills ls --global
```

Inspect the skills available in this repository without installing them:

```bash
npx skills add cuongnguyen4285/ai-skills-project --list
```

## Use a skill in Codex

After installation:

1. Start a new Codex conversation, or restart Codex if the skill is not recognized.
2. Invoke the skill by its `$` name, for example `$make-qa-plan`.
3. Attach or paste the requirements, specification, OpenAPI document, or test cases requested by the skill.
4. Include project paths, team constraints, environments, browsers, and output formats when relevant.
5. Review assumptions, missing information, generated files, and traceability before using the result.

## Examples by skill

Each example below is a starting prompt focused on feature-specific context and
optional settings. The corresponding `SKILL.md` defines the default workflow,
output structure, and quality rules.

### `make-dev-plan`

```text
$make-dev-plan

Create an implementation plan for passwordless email login.

Requirements: API, web UI, email-provider integration, database migration,
monitoring, and rollout documentation.

Team: 4 members
Roles:
- 2 backend developers
- 1 frontend developer
- 1 DevOps engineer
Availability: 80%

Open decisions: token expiry and email retry behavior.
```

### `make-qa-plan`

```text
$make-qa-plan

Create a risk-based QA plan for password reset by email.

Cover expired links, rate limiting, email delivery failures, accessibility,
security, and browser support.

Team: 4 members
Roles: QA lead, manual QA, automation QA, security QA
Availability: 80%
```

### `gen-api-test-cases`

```text
$gen-api-test-cases

Generate test cases for the attached OpenAPI specification for the create-order
API.

Requirements:
- An authenticated customer can create an order with one or more items.
- Quantity must be a positive integer.
- An unavailable product must be rejected.
- A repeated idempotency key must not create two orders.

Layout: detailed
Export: csv
Target: TestRail
```

### `gen-e2e-test-cases`

```text
$gen-e2e-test-cases

Generate test cases for the attached checkout user stories.

Requirements:
- A signed-in customer can add products to a cart and complete checkout.
- Invalid payment details show an error without losing the cart.
- The confirmation displays the order number.
- A customer cannot view another customer's order.

Role: signed-in customer
Layout: compact
Export: xml
Target: TestRail
```

### `gen-api-test-cases-playwright`

```text
$gen-api-test-cases-playwright

Convert API cases TC-F-001, TC-ERR-002, and TC-E-003 into TypeScript
Playwright API tests.

Project path: ./orders-service
Framework: existing TypeScript Playwright project
Existing conventions: request fixture, controller pattern, authentication
helpers, API schemas, environment configuration, and TestRail tags
```

### `gen-e2e-test-cases-playwright`

```text
$gen-e2e-test-cases-playwright

Convert the attached E2E cases into TypeScript Playwright tests.
Project path: ./web-app
Framework: existing Playwright web project
Existing conventions: page objects, custom fixtures, authentication state,
shared components, and stable locator strategy
```

## Index the skills on skills.sh

skills.sh discovers public skills from GitHub repositories through the `skills` CLI. There is no separate `publish` command in this repository.

### 1. Make the repository discoverable

Before indexing, confirm that:

- The GitHub repository is public.
- Each skill is in a supported layout such as `skills/<skill-name>/SKILL.md`.
- Each `SKILL.md` has valid YAML frontmatter with at least `name` and `description`.
- The frontmatter `name` matches the skill directory and the name used in installation commands.
- The default branch contains the latest committed files.

This repository uses the supported flat layout:

```text
skills/<skill-name>/SKILL.md
```

### 2. Check the repository locally

List the skills recognized by the CLI without installing them:

```bash
npx skills add cuongnguyen4285/ai-skills-project --list
```

If the CLI reports no skills, check the frontmatter and directory layout first.

### 3. Create an indexed installation event

Install the public repository at least once:

```bash
npx skills add cuongnguyen4285/ai-skills-project \
  --agent '*' \
  --skill '*' \
  --global \
  --yes
```

skills.sh uses CLI activity and anonymous install telemetry for discovery and ranking. Indexing and install counts update asynchronously, so a newly installed repository may not appear immediately.

### 4. Check discovery

Search the CLI by skill name:

```bash
npx skills find gen-api-test-cases
```

Then open the individual page using this pattern:

```text
https://skills.sh/<github-owner>/<github-repository>/<skill-name>
```

For this repository, the expected pages are listed in the [Contents](#contents) table. A repository-level skills.sh URL is not a reliable substitute for an individual skill URL.

Do not expect to control install counts or indexing status from `SKILL.md`, `agents/openai.yaml`, `package.json`, or this README.

## Repository structure

```text
.
├── README.md
├── package.json
└── skills
    ├── make-dev-plan
    │   ├── SKILL.md
    │   └── agents/openai.yaml
    ├── make-qa-plan
    │   ├── SKILL.md
    │   └── agents/openai.yaml
    ├── gen-api-test-cases
    │   ├── SKILL.md
    │   └── agents/openai.yaml
    ├── gen-e2e-test-cases
    │   ├── SKILL.md
    │   └── agents/openai.yaml
    ├── gen-api-test-cases-playwright
    │   ├── SKILL.md
    │   └── agents/openai.yaml
    └── gen-e2e-test-cases-playwright
        ├── SKILL.md
        └── agents/openai.yaml
```

`SKILL.md` contains the instructions followed by the AI host. `agents/openai.yaml` contains agent-specific UI metadata and does not provide model access or authentication.
