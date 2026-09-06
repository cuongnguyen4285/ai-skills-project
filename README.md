# AI Skills

Six independent Codex skills for turning requirements into development plans, QA plans, test cases, and Playwright tests.

## Quick start

Install all six skills globally for Codex:

```bash
npx skills add https://github.com/cuongnguyen4285/ai-skills-project \
  --agent codex \
  --skill '*' \
  --global \
  --yes
```

Install only one skill when needed:

```bash
npx skills add https://github.com/cuongnguyen4285/ai-skills-project \
  --agent codex \
  --skill gen-api-test-cases \
  --global \
  --yes
```

After installation:

1. Start a new Codex conversation or restart Codex.
2. Invoke a skill with its `$` name, such as `$make-qa-plan`.
3. Attach a PDF, paste requirements, or provide a project path as requested by the skill.
4. Review assumptions and generated output before using it in a project.

The URL must be plain text in a terminal. Do not include Markdown link syntax such as `[URL](URL)` or add a backslash before command options.

## Skill overview

| Skill | Use it when you need to | Main output |
| --- | --- | --- |
| [`make-dev-plan`](skills/make-dev-plan/SKILL.md) | Plan implementation work from requirements or technical specifications. | Resource-aware development plan |
| [`make-qa-plan`](skills/make-qa-plan/SKILL.md) | Define QA strategy, coverage, risks, resources, and release readiness. | Risk-based QA plan |
| [`gen-api-test-cases`](skills/gen-api-test-cases/SKILL.md) | Design framework-independent API tests from requirements or API documentation. | Categorized API test cases or TestRail export |
| [`gen-e2e-test-cases`](skills/gen-e2e-test-cases/SKILL.md) | Design framework-independent user-journey and browser tests. | Categorized E2E test cases or TestRail export |
| [`gen-api-test-cases-playwright`](skills/gen-api-test-cases-playwright/SKILL.md) | Convert API test cases into Playwright API automation. | Playwright API test files and supporting code |
| [`gen-e2e-test-cases-playwright`](skills/gen-e2e-test-cases-playwright/SKILL.md) | Convert E2E test cases into Playwright browser automation. | Playwright E2E test files and supporting code |

## Recommended workflow

Use the skills in this order when starting from a new feature:

```text
Requirements or specification
        |
        +--> $make-dev-plan
        |
        +--> $make-qa-plan
        |
        +--> $gen-api-test-cases       (API coverage)
        |
        +--> $gen-e2e-test-cases       (user-journey coverage)
                    |
                    +--> $gen-api-test-cases-playwright
                    |
                    +--> $gen-e2e-test-cases-playwright
```

The planning skills are independent. You can use only the QA plan, only the development plan, or start directly with test cases when the requirements are already clear.

## Guide for each skill

### 1. `make-dev-plan`

Use this skill for implementation planning. It analyzes scope, affected components, dependencies, effort, staffing, risks, milestones, and the critical path. It does not generate source code or detailed test cases.

Provide:

- Requirements, technical specification, or user stories
- Team size or roles; the default is 4 members
- Availability, such as `80%`
- Start date, deadline, working days, or fixed milestones when known
- Existing repository or architecture information when relevant

Example:

```text
$make-dev-plan

Create a development plan for the attached passwordless login requirements.
Use 4 members with 80% availability:
- 2 backend developers
- 1 frontend developer
- 1 DevOps engineer

Include person-day estimates, calendar duration, dependencies, milestones,
risks, acceptance criteria, and requirement-to-task traceability.
```

The result separates person-day effort from calendar duration and identifies assumptions instead of presenting uncertain dates as facts.

### 2. `make-qa-plan`

Use this skill for QA strategy and release planning. It covers risk, test levels, environments, accounts, data, automation, staffing, effort, schedule, and entry/exit criteria. It does not replace detailed API or E2E test-case generation.

Provide:

- Product requirements or specification
- User roles and supported platforms when known
- QA team size or roles; the default is 4 members
- Availability, such as `80%`
- Environment, test-data, integration, browser, or release constraints

Example:

```text
$make-qa-plan

Create a QA plan from the attached requirements for password reset by email.
Assume 4 QA members with 80% availability:
- QA lead
- Manual QA engineer
- Automation QA engineer
- Security QA engineer

Cover API, UI, E2E, accessibility, security, rate limiting, email failures,
test data, environments, effort, schedule, entry criteria, exit criteria,
and release risks.
```

The result is a QA strategy and schedule. Ask a test-case skill afterward when you need executable test cases.

### 3. `gen-api-test-cases`

Use this skill to create framework-independent API test cases from OpenAPI/Swagger, endpoint documentation, requirements, examples, or business rules.

Provide:

- API specification or endpoint documentation
- Authentication and authorization rules
- Required fields, schemas, status codes, and business rules
- Test-data constraints and cleanup requirements
- Desired layout and export format

Example:

```text
$gen-api-test-cases

Generate API test cases for the attached OpenAPI specification.
Use layout=detailed and export=csv for TestRail.
Cover positive, negative, boundary, authentication, authorization,
validation, duplicate-request, pagination, and error scenarios when they
are supported by the specification.
```

The skill produces traceable cases grouped into Functional, Edge Case, Error Handling, and State Transition categories when applicable. Each case includes a requirement reference, priority, preconditions, executable steps, measurable expected results, and postconditions.

### 4. `gen-e2e-test-cases`

Use this skill to design framework-independent browser and user-journey tests from requirements, user stories, acceptance criteria, workflows, or UX specifications.

Provide:

- User journeys and acceptance criteria
- Personas, roles, and permissions
- Starting state, test accounts, and required data
- Supported browsers, devices, or platforms when relevant
- Desired layout and export format

Example:

```text
$gen-e2e-test-cases

Generate E2E test cases for the attached checkout requirements.
Use layout=detailed and export=xml for TestRail.
Cover successful checkout, invalid payment, empty cart, out-of-stock items,
session expiry, navigation, persistence, and recovery flows.
```

The skill creates cases for primary journeys, alternate flows, validation, error handling, state transitions, navigation, and recovery without inventing selectors or implementation details.

### 5. `gen-api-test-cases-playwright`

Use this skill after API test cases exist and you want Playwright API automation. It uses `@playwright/test` and `APIRequestContext` by default, while preserving the target project's existing conventions.

Provide:

- The API test cases or TestRail export
- Target project path
- Language and Playwright version if they are not discoverable
- Environment, authentication, fixture, controller, and cleanup details
- Permission to create or modify files

Example:

```text
$gen-api-test-cases-playwright

Convert API cases TC-F-001, TC-ERR-002, and TC-E-003 into TypeScript
Playwright API tests.

Project path: ./orders-service
Use the existing API fixtures, controllers, authentication helpers, and
naming conventions. Preserve the test-case IDs and report all missing
schemas, credentials, environment variables, or cleanup requirements.
```

Before generating code, the skill inspects the project. It reuses existing fixtures, controllers, models, configuration, authentication, and test data. It does not invent endpoints, credentials, schemas, or architecture.

### 6. `gen-e2e-test-cases-playwright`

Use this skill after E2E test cases exist and you want Playwright browser automation.

Provide:

- The E2E test cases or TestRail export
- Target project path
- Language and Playwright version if they are not discoverable
- Existing page objects, fixtures, authentication, routes, and test-data rules
- Permission to create or modify files

Example:

```text
$gen-e2e-test-cases-playwright

Convert the attached login E2E cases into TypeScript Playwright tests.

Project path: ./web-app
Use the existing Page Object Model, custom fixtures, storage state, and
locator conventions. Preserve the test-case IDs. Do not use
page.waitForTimeout(). Report selector gaps, missing accounts, and required
configuration changes before making code changes.
```

The skill prefers stable role, label, text, and test-ID locators; uses existing POM and fixtures when available; avoids hard-coded secrets and arbitrary sleeps; and reports files, configuration, execution commands, traceability, and unresolved assumptions.

## Test-case options

The API and E2E test-case skills support two layouts:

- `layout=detailed` (default): every action and expected result is paired in a `Step | Action | Expected Result` table.
- `layout=compact`: all actions are in one numbered Steps block and all outcomes are in one Expected Results block.

Examples:

```text
Use layout=detailed with one expected result for every step.
```

```text
Use layout=compact with all actions in one block and all expected results in
one block.
```

Both layouts use real Markdown headings and normally include:

- Overview and scope metadata
- Functional tests
- Edge case tests
- Error handling tests
- State transition tests when applicable
- Test coverage matrix

Test-case IDs use these prefixes:

| Prefix | Category |
| --- | --- |
| `TC-F-###` | Functional |
| `TC-E-###` | Edge case |
| `TC-ERR-###` | Error handling |
| `TC-ST-###` | State transition |

Request TestRail exports explicitly:

```text
Generate detailed API test cases and export=csv for TestRail.
```

```text
Generate compact E2E test cases and export=xml for TestRail.
```

Markdown is the default output. When asked to save Markdown in a repository, the default paths are `tests/<feature-name>-api-test-cases.md` and `tests/<feature-name>-e2e-test-cases.md`. Export fields that cannot be mapped are reported as warnings instead of being silently discarded.

## Supplying files and requirements

You can:

- Attach a PDF, OpenAPI file, or requirements document.
- Paste requirements directly into the prompt.
- Provide a repository path for Playwright generation.
- Include explicit constraints such as team size, availability, browsers, environments, or release dates.

Clearly label instructions that belong to the requirements document versus instructions for the skill. For example: “Treat the attached PDF as the product requirements. Assume 4 QA members with 80% availability.”

## How skills work

A skill is an instruction package for an AI host. It is not a standalone application and it does not call OpenAI by itself.

```text
Your prompt
    ↓
AI host, such as Codex or an application using an OpenAI model
    ↓
The host selects and loads SKILL.md
    ↓
The model follows the skill instructions and produces the result
```

The `agents/openai.yaml` files contain UI metadata and discovery settings. They do not make API requests. The AI host owns model access, authentication, billing, tool access, and file permissions. This repository does not need an OpenAI API key to define or validate the skills.

If `$skill-name` is not recognized, use the local instruction file directly:

```text
Read and follow skills/make-qa-plan/SKILL.md.

Create a QA plan for these requirements:
[paste or attach requirements here]
```

## skills.sh links

This repository is public at `cuongnguyen4285/ai-skills-project`.

Repository page:

- <https://www.skills.sh/cuongnguyen4285/ai-skills-project>

Individual skill pages:

- <https://www.skills.sh/cuongnguyen4285/ai-skills-project/make-dev-plan>
- <https://www.skills.sh/cuongnguyen4285/ai-skills-project/make-qa-plan>
- <https://www.skills.sh/cuongnguyen4285/ai-skills-project/gen-api-test-cases>
- <https://www.skills.sh/cuongnguyen4285/ai-skills-project/gen-e2e-test-cases>
- <https://www.skills.sh/cuongnguyen4285/ai-skills-project/gen-api-test-cases-playwright>
- <https://www.skills.sh/cuongnguyen4285/ai-skills-project/gen-e2e-test-cases-playwright>

The official CLI can confirm repository discovery:

```bash
npx -y skills add https://github.com/cuongnguyen4285/ai-skills-project --list
```

An actual installation is required for install telemetry. skills.sh indexing and install counts may update asynchronously; they cannot be set from `SKILL.md`, `openai.yaml`, or this README.

## Troubleshooting

### The skill name is not recognized

Start a new Codex conversation, use the exact `$` name from the overview table, or reference the local `SKILL.md` directly.

### The CLI finds the repository but skills.sh does not show a page

Confirm that the GitHub repository is public, run the full installation command above rather than only `--list`, and allow time for registry indexing. The repository layout is one `SKILL.md` at `skills/<skill-name>/SKILL.md` for each skill.

### Playwright code cannot be generated

Provide a real target project path and test cases. The project should contain its Playwright configuration, dependencies, fixtures, or page objects when those are required. The skill reports missing selectors, accounts, environment variables, schemas, and cleanup information instead of inventing them.

### Estimates look too precise

Provide team roles, availability, working days, dependencies, and a deadline. Estimates remain estimates; the planning skills separate person-days from calendar duration and state assumptions.

## Repository structure

```text
skills/
├── make-dev-plan/SKILL.md
├── make-qa-plan/SKILL.md
├── gen-api-test-cases/SKILL.md
├── gen-e2e-test-cases/SKILL.md
├── gen-api-test-cases-playwright/SKILL.md
└── gen-e2e-test-cases-playwright/SKILL.md
```

Each skill also contains `agents/openai.yaml` metadata. Validate a skill with the skill-creator validator:

```bash
python3 /Users/lw11643/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/make-dev-plan
```

Repeat the command for each skill directory before publishing or indexing the repository.
