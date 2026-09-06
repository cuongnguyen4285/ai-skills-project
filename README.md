# AI Skills

This repository contains six independent, discoverable skills for planning, test-case design, and Playwright automation.

## Publish to skills.sh

The skills.sh homepage and leaderboard display skills from public GitHub repositories. The local `SKILL.md` files and `agents/openai.yaml` metadata do not create a public skills.sh listing by themselves.

This repository is published at `cuongnguyen4285/ai-skills-project`.

```bash
# Install all skills from the repository
npx skills add https://github.com/cuongnguyen4285/ai-skills-project

# Install one skill
npx skills add https://github.com/cuongnguyen4285/ai-skills-project --skill gen-api-test-cases
```

Individual skill pages use this URL pattern:

```text
https://www.skills.sh/cuongnguyen4285/ai-skills-project/<skill-name>
```

For example, the API test-case skill would be:

```text
https://www.skills.sh/cuongnguyen4285/ai-skills-project/gen-api-test-cases
```

The leaderboard position and install count are managed by skills.sh telemetry after users install the public skill. They cannot be set from `openai.yaml` or this local repository.

An install badge can be added after the repository URL is known:

```markdown
[![skills.sh](https://skills.sh/b/cuongnguyen4285/ai-skills-project)](https://www.skills.sh/cuongnguyen4285/ai-skills-project)
```

Skill pages:

- <https://www.skills.sh/cuongnguyen4285/ai-skills-project/make-dev-plan>
- <https://www.skills.sh/cuongnguyen4285/ai-skills-project/make-qa-plan>
- <https://www.skills.sh/cuongnguyen4285/ai-skills-project/gen-api-test-cases>
- <https://www.skills.sh/cuongnguyen4285/ai-skills-project/gen-e2e-test-cases>
- <https://www.skills.sh/cuongnguyen4285/ai-skills-project/gen-api-test-cases-playwright>
- <https://www.skills.sh/cuongnguyen4285/ai-skills-project/gen-e2e-test-cases-playwright>

## Skills

| Skill | Purpose |
| --- | --- |
| [`make-dev-plan`](skills/make-dev-plan/SKILL.md) | Create a development plan with effort, team resources, dependencies, and schedule. |
| [`make-qa-plan`](skills/make-qa-plan/SKILL.md) | Create a risk-based QA plan with coverage, staffing, effort, and schedule. |
| [`gen-api-test-cases`](skills/gen-api-test-cases/SKILL.md) | Generate framework-independent API test cases and optional TestRail CSV/XML output. |
| [`gen-e2e-test-cases`](skills/gen-e2e-test-cases/SKILL.md) | Generate framework-independent E2E test cases and optional TestRail CSV/XML output. |
| [`gen-api-test-cases-playwright`](skills/gen-api-test-cases-playwright/SKILL.md) | Convert API test cases into Playwright API tests. |
| [`gen-e2e-test-cases-playwright`](skills/gen-e2e-test-cases-playwright/SKILL.md) | Convert E2E test cases into Playwright browser tests. |

Each skill's `SKILL.md` includes a concrete usage example with the expected inputs and behavior.

## How skills work

A skill is an instruction package for an AI agent. It is not a standalone application and it does not call OpenAI by itself.

The execution flow is:

```text
Your prompt
    ↓
AI host, such as Codex or an application using an OpenAI model
    ↓
The host selects and loads SKILL.md
    ↓
The model follows the skill instructions and produces the result
```

The `agents/openai.yaml` files provide UI metadata and discovery settings. They do not make API requests. The AI host owns the model connection, authentication, billing, tool access, and file permissions.

This repository therefore does not need an OpenAI API key to define or validate the skills. An API key is needed only if you build a separate application that sends prompts to an OpenAI API and loads these skill files itself.

## Using the skills

Use a skill explicitly with its `$` name, or describe the task and allow automatic discovery when your AI host indexes the repository.

```text
$make-dev-plan

Analyze the attached requirements. Use a team of 5 members, with one frontend,
two backend, one DevOps, and one QA engineer. Provide person-day and calendar estimates.

Requirements:
[paste or attach requirements here]
```

```text
$make-qa-plan

Create a QA plan for these requirements. Assume 4 QA members with 80% availability.

Requirements:
[paste or attach requirements here]
```

If the `$skill-name` syntax is not recognized, reference the local instruction file directly:

```text
Read and follow skills/make-qa-plan/SKILL.md.

Create a QA plan for these requirements:
[paste requirements here]
```

## Test-case layouts

The API and E2E test-case skills support two layouts:

- `layout=compact`: all actions in one Steps block and all outcomes in one Expected Result block.
- `layout=detailed`: each step is represented in a `Step | Action | Expected Result` table. This is the default.

Both generators organize Markdown output into an Overview, Functional Tests, Edge Case Tests, Error Handling Tests, State Transition Tests when applicable, and a Test Coverage Matrix. Assumptions and coverage gaps belong in the Overview metadata or affected test case, not in separate Notes or Quality Checklist sections. Test-case IDs use these prefixes:

- `TC-F-###`: functional
- `TC-E-###`: edge case
- `TC-ERR-###`: error handling
- `TC-ST-###`: state transition

Every test case includes a requirement reference, priority, preconditions, executable steps, measurable expected results, and postconditions or a final business outcome. If you ask to save Markdown to a repository, the default paths are `tests/<feature-name>-api-test-cases.md` and `tests/<feature-name>-e2e-test-cases.md`.

The detailed format uses this structure. Headings should remain normal Markdown headings; do not write them as `**# Heading**` because that displays the `#` characters as bold text instead of rendering a heading.

```markdown
### TC-F-001: Login with valid credentials

**Requirement**: REQ-001
**Priority**: High

#### 1. Test Summary
Verify that a registered user can successfully log in.

#### 2. Pre-condition
- The application is accessible.
- The user has a valid, active account.

#### 3. Test Steps
| Step | Action | Expected Result |
|---|---|---|
| 1 | Enter a valid email address. | The email is accepted. |
| 2 | Enter the password. | The password is masked. |
| 3 | Click Login. | The user reaches the dashboard. |

#### 4. Post-condition
- The user is authenticated.

#### Coverage Matrix
| Requirement ID | Test Cases | Coverage Status |
|---|---|---|
| REQ-001 | TC-F-001 | Complete |
```

Examples:

```text
$gen-api-test-cases
Generate detailed cases from this OpenAPI specification and export them as CSV for TestRail.

Specification:
[paste or attach the OpenAPI specification]
```

```text
$gen-e2e-test-cases
Generate compact cases from these user stories and export them as XML for TestRail.

User stories:
[paste or attach user stories]
```

Exports can be requested with `export=csv` or `export=xml`. The skills preserve unsupported or unmapped fields as warnings instead of silently dropping them.

## Playwright generation

The Playwright skills accept compact or detailed API/E2E cases. They inspect the target project first and reuse its existing configuration, fixtures, helpers, page objects, authentication, and naming conventions.

```text
$gen-api-test-cases-playwright
Convert these API test cases into TypeScript Playwright API tests.

Project path: /path/to/project
Test cases:
[paste or attach API test cases]
```

```text
$gen-e2e-test-cases-playwright
Convert these E2E cases into Playwright tests using the existing page objects and fixtures.

Project path: /path/to/project
Test cases:
[paste or attach E2E test cases]
```

The Playwright skills report missing selectors, credentials, test data, configuration, and unresolved assumptions. They do not make broad project changes without explicit approval.

## Resource estimation defaults

`make-dev-plan` and `make-qa-plan` default to 4 members when no team size is supplied. You can override this with a member count or a role-based team description. Estimates distinguish person-days from calendar duration and account for dependencies and realistic parallelism.

## Validation

Each skill contains a required `SKILL.md` and UI metadata in `agents/openai.yaml`. Validate a skill with the bundled skill-creator validator:

```bash
python3 /Users/lw11643/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/make-dev-plan
```

Repeat the command for each skill directory before publishing or indexing the repository.
