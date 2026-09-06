---
name: gen-api-test-cases-playwright
description: Convert API test cases into maintainable Playwright API tests using APIRequestContext while preserving project conventions, traceability, assertions, authentication, data management, and cleanup.
metadata:
  short-description: Generate Playwright API test scripts
---

# Generate API test cases with Playwright

## Purpose and boundaries

Convert supplied API test cases, whether compact or detailed, into executable Playwright API tests. Use `@playwright/test` and `APIRequestContext` unless the target project clearly uses another supported convention.

Do not invent endpoint behavior, credentials, schemas, or project architecture. Do not modify a project broadly or rewrite its test infrastructure without explicit user approval.

## Workflow

1. Inspect the target repository and identify language, Playwright version, test directories, configuration, fixtures, controllers, models, helpers, and naming conventions.
2. Map every source test-case ID and requirement to a test or explicitly report why it cannot be automated.
3. Reuse existing request fixtures, controllers, environment handling, schemas, and test data.
4. Generate the smallest justified set of model, controller, fixture, and spec changes.
5. Review status/body/schema assertions, data isolation, cleanup, tags, and traceability.
6. Report files, assumptions, configuration needs, and execution commands.

## Test implementation rules

- Preserve source/TestRail IDs in test titles, annotations, or comments.
- Convert compact cases into a readable request/assertion sequence.
- Convert detailed cases into request operations and expected-result assertions that follow the source pairs.
- Keep assertions in test specs: status, headers, response body, schema, and side effects must be explicit.
- Use deterministic dynamic data for parallel runs and clean up created resources whenever supported.
- Avoid arbitrary sleeps and assertions that only verify a request did not throw.
- Use tags such as `@api`, `@regression`, and `@smoke` when they match the repository convention.
- Never hard-code secrets, tokens, or API URLs. Use secure configuration and environment helpers.

## Controller and model mode

When the target repository uses an API controller pattern, preserve it:

- Controllers accept `APIRequestContext` and return raw `APIResponse` values for assertions in specs.
- Keep default headers readonly and load base URL/authentication from repository configuration.
- Wrap public controller methods in `return await test.step(...)` and log non-fatal failures using the project's convention.
- Use interfaces for data models and `Partial<T>` for update payloads when appropriate.
- Inject controllers through the existing custom fixture; do not instantiate them manually in specs.
- Add JSDoc and explicit return types when required by the repository.

If the repository does not use controllers, follow its existing API-test architecture instead of introducing a controller layer by default.

## Data, assertions, and anti-patterns

- Store static data where the repository expects it and generate unique values for parallel tests.
- Use raw Playwright responses for assertions such as `200`, `201`, `204`, `400`, `401`, `403`, `404`, or `422` when specified.
- Parse and assert response fields with exact or partial matching according to the requirement.
- Do not use `axios` or `fetch` when the project convention is Playwright `APIRequestContext`.
- Do not hard-code the same mutable record across parallel tests.
- Do not instantiate controllers manually when fixture injection exists.
- Do not swallow response failures or leave created test data without cleanup.

## Output and authorization

Provide generated test files plus justified models, controllers, fixtures, or helpers. Also report:

- Files created or proposed
- Required environment variables, credentials, schemas, and test data
- Configuration or fixture changes
- Execution commands
- Test-case-to-script traceability
- Unresolved assumptions and limitations

Make only the changes needed for the supplied cases when the user authorizes code changes.

## Example

```text
Use $gen-api-test-cases-playwright to implement these API cases.

Project path: ./orders-service
Framework: TypeScript Playwright
Cases: TC-F-001, TC-ERR-002, TC-E-003

Use the existing request fixture, environment variables, API schemas,
controller pattern, and TestRail tags.
```

If the repository follows the controller pattern, a focused result can look like this:

```typescript
// src/controllers/user-controller.ts
import { APIRequestContext, APIResponse } from '@playwright/test';
import { test } from 'src/base-test/base-test';
import BaseConfig from 'src/config/base-config';
import { User } from 'src/models/user-model';

const env = BaseConfig.getEnvironment();

export default class UserController {
  readonly context: APIRequestContext;
  readonly defaultHeaders: Record<string, string>;

  constructor(context: APIRequestContext) {
    this.context = context;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.apiToken}`,
      Accept: 'application/json',
    };
  }

  async createUser(
    user: User,
    headers: Record<string, string> = this.defaultHeaders
  ): Promise<APIResponse> {
    return await test.step(`Create user ${user.name}`, async () => {
      const response = await this.context.post(`${env.apiBaseURL}/users`, {
        headers,
        data: user,
      });

      if (!response.ok()) {
        console.warn(`Create user failed: ${response.status()} ${response.statusText()}`);
      }
      return response;
    });
  }
}
```

```typescript
// src/tests/api/test_api_user.spec.ts
import { expect, test } from 'src/base-test/base-test';
import user from '@testdata/users.json';

test.describe('User API testing', { tag: ['@api', '@regression'] }, () => {
  test('C53986986 verify user creation response', async ({ userController }) => {
    const response = await userController.createUser({
      ...user,
      email: `qa-${Date.now()}@example.com`,
    });

    expect(response.status()).toBe(201);
    await expect(response).toBeOK();
    expect(await response.json()).toMatchObject({ name: user.name });
  });
});
```

Adapt imports, paths, fixtures, configuration, and test-data utilities to the target repository. Report missing schemas, credentials, configuration, or cleanup requirements instead of inventing them.

## Review checklist

- Every source test case has a script or an explicit automation limitation.
- Test names include source/TestRail IDs and describe behavior and condition.
- Fixtures, controllers, models, and helpers follow target-project conventions.
- No secrets, hard-coded URLs, or unsafe shared test data are introduced.
- Response status, body, schema, and side effects are asserted where required.
- Tests are independent, deterministic, tagged, and clean up their data.
- Generated code is formatted and type-checkable according to the target project.
