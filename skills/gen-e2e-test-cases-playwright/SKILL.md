---
name: gen-e2e-test-cases-playwright
description: Convert E2E test cases into maintainable Playwright browser tests while preserving project conventions, stable locators, fixtures, assertions, cleanup, and requirement traceability.
metadata:
  short-description: Generate Playwright E2E test scripts
---

# Generate E2E test cases with Playwright

## Purpose and boundaries

Convert supplied E2E test cases, whether compact or detailed, into executable browser tests using the target project's Playwright architecture.

Do not assume that every project uses Page Object Model, custom fixtures, TypeScript, or the folder names shown in the example. Inspect the project first and preserve its established conventions.

## Workflow

1. Inspect the target project.
   - Identify language, Playwright version, test directories, configuration, fixtures, authentication state, page objects, helpers, and naming conventions.
   - Confirm whether tests run in parallel and how test data is isolated.
2. Map the source cases.
   - Preserve every test-case ID and requirement reference.
   - Map each source case to one or more scripts, or explicitly report why it cannot be automated.
3. Design the implementation.
   - Reuse existing page objects, shared components, fixtures, authentication, test data, and configuration.
   - Identify missing selectors, routes, accounts, data, or expected behavior before coding.
4. Generate the smallest justified set of test files and supporting page objects, fixtures, or helpers.
5. Review reliability and traceability.
   - Check isolation, cleanup, locator stability, assertions, diagnostics, and source-to-script mapping.
6. Report files, assumptions, configuration needs, and execution commands.

## Test implementation rules

- Convert compact cases into a readable sequence of browser actions and assertions.
- Convert detailed cases into actions and assertions that follow each paired step/result.
- Keep one business scenario per test unless the source case explicitly describes a workflow that must be verified end to end.
- Preserve source/TestRail IDs in test titles, annotations, or comments. Use descriptive behavior-driven names.
- Assert user-visible results and meaningful business outcomes rather than implementation details alone.
- Prefer role, label, text, and test-ID locators. Use CSS, XPath, or positional selectors only when no stable alternative exists, and document the reason.
- Keep tests independent, deterministic, and safe for parallel execution. Do not depend on test order or another test's data.
- Create unique records for mutating scenarios and clean them up or reset them when the system supports cleanup.
- Do not use `page.waitForTimeout()` for synchronization. Use Playwright auto-waiting, web assertions, or explicit state-based waits.
- Do not add `test.only`, disabled tests, swallowed errors, or blanket retries to hide failures. Treat retries as CI resilience, not a flakiness strategy.
- Use screenshot comparisons only when the requirement is visual and follow the target project's snapshot naming and threshold conventions.

## Page Object Model mode

When the target repository uses POM, follow these rules:

- Use one page-object class per page or reusable component and accept `Page` in the constructor.
- Keep static locators as `readonly` properties initialized in the constructor.
- Put parameterized selectors in methods that return `Locator`.
- Put browser actions in page-object methods and wrap every public action in `test.step()`.
- Put assertions in methods whose names start with `should`. Assertion methods must contain assertions only; they must not click, fill, navigate, or call action methods.
- Keep locators out of test specs. Specs should use injected page objects and business-level methods.
- Reuse shared components instead of duplicating locators.
- Use explicit async return types and JSDoc when required by the repository.

If the repository does not use POM, follow its existing architecture and explain the detected convention before introducing a new abstraction.

## Fixtures, authentication, and test data

- Use the project's custom `test` fixture instead of importing `test` directly from `@playwright/test` when a custom fixture exists.
- Register new page objects in the existing fixture file before using them in specs.
- Prefer storage state or the repository's cookie utility for authenticated scenarios. Use UI login only when the scenario tests login or authentication behavior.
- Never hard-code real credentials, tokens, or secrets. Use a secure account fixture, configuration helper, storage state, or cookie utility.
- Keep test data variables inside the test callback that uses them.
- Use environment variables for configuration and secrets only; do not use environment-variable fallbacks as business test data.
- Preserve the repository's UI, regression, smoke, and other tagging conventions.

## Output and authorization

Provide generated test files plus any justified page objects, fixtures, or helpers. Also report:

- Files created or proposed
- Required environment variables and test data
- Configuration or fixture changes
- Execution commands
- Test-case-to-script traceability
- Unresolved assumptions, selector gaps, and limitations

Do not modify a project broadly or rewrite its test architecture without explicit user approval. If the user requests code changes, make only the changes needed for the supplied cases.

## Example

```text
Use $gen-e2e-test-cases-playwright to implement these checkout cases.

Project path: ./shop-web
Cases: TC-F-001, TC-ERR-002, TC-ST-003

Reuse the existing authenticated fixture and checkout page object.
Use stable role and test-id locators. Do not add arbitrary waits.
```

If the repository uses POM and a custom fixture, a focused result can look like this:

```typescript
// src/pages/login-page.ts
import { Locator, Page } from '@playwright/test';
import { expect, test } from 'src/base-test/base-test';

export default class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async navigateTo(url: string): Promise<void> {
    await test.step(`Navigate to ${url}`, async () => {
      await this.page.goto(url);
    });
  }

  async login(email: string, password: string): Promise<void> {
    await test.step('Log in with credentials', async () => {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    });
  }

  async shouldSeeDashboard(): Promise<void> {
    await test.step('Should see the dashboard', async () => {
      await expect(this.page).toHaveURL(/dashboard/);
      await expect(this.page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    });
  }
}
```

```typescript
// src/tests/ui/test_login.spec.ts
import { test } from 'src/base-test/base-test';
import BaseConfig from 'src/config/base-config';
import { Username } from 'src/models/enum';

test.describe('Login', { tag: ['@ui', '@regression'] }, () => {
  test('C75242241 verify user can log in with valid credentials', async ({ loginPage }) => {
    const account = BaseConfig.getTestAccount(Username.Lampard);
    const loginUrl = '/login';

    await loginPage.navigateTo(loginUrl);
    await loginPage.login(account.username, account.password);
    await loginPage.shouldSeeDashboard();
  });
});
```

The example assumes the repository has `BaseConfig.getTestAccount()` and a `loginPage` fixture. Adapt both to the detected project conventions. For tests that do not verify login, use storage state or cookie setup instead of repeating UI authentication.

## Review checklist

- Every source test case has a script or an explicit automation limitation.
- Test names include source/TestRail IDs when available and describe behavior and condition.
- Fixtures and page objects are registered and imported using target-project conventions.
- No real credentials, tokens, unnecessary hard-coded URLs, or unstable locators are introduced.
- Actions and assertions are separated; `should*` methods do not perform actions.
- Tests can run independently and safely in parallel.
- Authentication, cleanup, failure diagnostics, and execution commands are documented.
- The generated code is formatted and type-checkable according to the target project.
