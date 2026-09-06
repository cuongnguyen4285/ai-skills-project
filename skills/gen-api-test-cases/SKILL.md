---
name: gen-api-test-cases
description: Generate requirement-driven API test cases from requirements, API specifications, or endpoint documentation, with categorized Markdown structure, compact or detailed step layouts, coverage traceability, and optional TestRail CSV/XML export.
metadata:
  short-description: Generate API test cases and TestRail exports
---

# Generate API test cases

## Purpose and boundaries

Convert requirements, OpenAPI/Swagger documents, endpoint documentation, examples, or business rules into executable-by-a-person API test cases. Do not generate framework code unless the user requests the Playwright API skill.

The output must be requirement-driven rather than implementation-driven. Every stated requirement should map to one or more cases, and gaps must be identified instead of hidden.

## Workflow

1. Identify the feature, requirements source, API scope, assumptions, and missing information.
2. Extract functional scenarios, edge cases, error scenarios, and state transitions when the API is stateful.
3. Generate unique, traceable test cases with measurable expected results.
4. Validate coverage for every requirement and check priorities, data, cleanup, and dependencies.
5. Produce Markdown by default or the requested CSV/XML export.

## Inputs and layouts

Support:

- `layout=compact`: all actions in one numbered Steps block and all outcomes in one Expected Results block.
- `layout=detailed`: a `Step | Action | Expected Result` table for each case.

Use `detailed` by default. Accept “one block”, “compact”, “stepwise”, or “one expected result per step” as layout instructions.

Consider happy paths, required/optional fields, invalid formats/types, missing fields, boundaries, authentication, authorization, duplicate requests, idempotency, pagination, filtering, sorting, rate limits, security-sensitive input, versioning, and observable side effects when relevant. Do not invent undocumented business rules.

## Output

Use this complete Markdown structure unless the user requests another format. Keep headings as real Markdown headings; do not wrap `#`, `##`, or `###` in bold markers.

```markdown
# API Test Cases: [Feature Name]

## Overview
**Feature**: [Feature name]
**Requirements Source**: [PRD, OpenAPI file, or description]
**API Scope**: [Endpoints and operations covered]
**Layout**: detailed
**Generated**: [YYYY-MM-DD]
**Total Test Cases**: [count]

## 1. Functional Tests

### TC-F-001: Get product details by valid product ID

**Requirement**: REQ-001
**Priority**: High
**Type**: Functional
**Endpoint**: `GET /products/{productId}`
**Authentication**: Valid customer token

##### 1. Test Summary
Verify that product details are returned for a valid product ID.

##### 2. Pre-condition
- The API service is available.
- A valid product exists.
- The caller has valid authorization.

##### 3. Test Steps
| Step | Action | Expected Result |
|---|---|---|
| 1 | Send `GET /products/{productId}` with a valid ID. | The request is accepted. |
| 2 | Observe the response status. | The API returns `200 OK`. |
| 3 | Validate the response body. | Product details are returned. |
| 4 | Validate required fields. | Required fields are present. |
| 5 | Compare the product ID. | The response ID matches the requested ID. |

##### 4. Post-condition
- No test data is modified.

## 2. Edge Case Tests
## 3. Error Handling Tests
## 4. State Transition Tests

## Test Coverage Matrix
| Requirement ID | Test Cases | Coverage Status |
|---|---|---|
| REQ-001 | TC-F-001 | Complete |

```

Include only applicable categories, but always include the coverage matrix. Put important assumptions or coverage gaps in the Overview metadata or directly in the affected test case; do not add separate Notes or Quality Checklist sections. Use IDs:

- `TC-F-###`: functional
- `TC-E-###`: edge case
- `TC-ERR-###`: error handling
- `TC-ST-###`: state transition

Each case includes requirement reference, title, priority, type, endpoint, method, authentication, request data, preconditions, steps, expected results, postconditions, and cleanup when applicable.

Expected results must be measurable through status codes, response fields, schemas, headers, or observable side effects.

## TestRail export

Support `export=none`, `export=csv`, and `export=xml`.

- Preserve one test case per record.
- Map title, section, type, priority, references, preconditions, steps, and expected result to the target fields.
- Serialize detailed table rows into compatible multiline Steps and Expected Result fields.
- Preserve custom fields when a mapping is supplied.
- Do not silently discard unsupported fields; report them.
- Treat XML as a configurable TestRail import profile and state the expected version/schema when unknown.
- Produce valid escaped content and a field-mapping note.

Default options are `layout=detailed` and `export=none`. If the user asks to save Markdown, use `tests/<feature-name>-api-test-cases.md` with a sanitized feature name and only write it when the user clearly requests or authorizes file creation.

## Internal validation

- Every requirement has one or more cases or an explicit coverage gap.
- Happy path, boundaries, invalid data, permissions, and failures are considered.
- IDs are unique and use the correct category prefix.
- Steps are executable by a QA engineer without ambiguity.
- Expected results are measurable and verifiable.
- Preconditions, postconditions, cleanup, and test data are explicit.
- The coverage matrix shows complete, partial, or missing coverage.
- Exported fields are mapped or reported as unsupported.

## Example

```text
Use $gen-api-test-cases for the create-order API.

Requirements:
- An authenticated customer can create an order with one or more items.
- Quantity must be a positive integer.
- An unavailable product must be rejected.
- A duplicate request with the same idempotency key must not create two orders.

Layout: detailed
Export: csv
Target: TestRail
```

Expected output includes functional creation cases, boundary cases for quantity, error cases for unavailable products and authentication failures, a state/idempotency case, and a coverage matrix linked to every requirement.
