---
name: gen-e2e-test-cases
description: Generate requirement-driven E2E test cases from requirements and user journeys, with categorized Markdown structure, compact or detailed step layouts, coverage traceability, and optional TestRail CSV/XML export.
metadata:
  short-description: Generate E2E cases and TestRail exports
---

# Generate E2E test cases

## Purpose and boundaries

Convert requirements, user stories, acceptance criteria, workflows, or UX specifications into framework-independent end-to-end test cases. Do not generate browser automation code unless the user requests the Playwright E2E skill.

The output must be requirement-driven rather than implementation-driven. Every stated requirement should map to one or more cases, and gaps must be identified instead of hidden.

## Workflow

1. Identify the feature, requirements source, user roles, assumptions, and missing information.
2. Extract functional scenarios, edge cases, error scenarios, and state transitions when the workflow is stateful.
3. Generate unique, traceable test cases with measurable expected results.
4. Validate coverage for every requirement and check priorities, data, cleanup, and dependencies.
5. Produce Markdown by default or the requested CSV/XML export.

## Inputs and layouts

Support:

- `layout=compact`: all actions in one numbered Steps block and all outcomes in one Expected Results block.
- `layout=detailed`: a `Step | Action | Expected Result` table for each case.

Use `detailed` by default. Accept “one block”, “compact”, “stepwise”, or “expected result for every step” as layout instructions.

Consider primary journeys, alternate and negative flows, validation errors, roles and permissions, authentication, empty/loading/failure states, navigation, persistence, multi-step workflows, retries, recovery, browser/device differences, accessibility expectations, and cross-feature behavior. Do not assume selectors or implementation details.

## Output

Use this complete Markdown structure unless the user requests another format. Keep headings as real Markdown headings; do not wrap `#`, `##`, or `###` in bold markers.

```markdown
# E2E Test Cases: [Feature Name]

## Overview
**Feature**: [Feature name]
**Requirements Source**: [PRD, user stories, or description]
**User Roles**: [roles covered]
**Test Scope**: [journeys and platforms covered]
**Layout**: detailed
**Generated**: [YYYY-MM-DD]
**Total Test Cases**: [count]

## 1. Functional Tests

### TC-F-001: Login with valid credentials

**Requirement**: REQ-001
**Priority**: High
**Type**: Functional
**Persona**: Registered customer

##### 1. Test Summary
Verify that a registered user can successfully log in.

##### 2. Pre-condition
- The application is accessible.
- The user has a valid, active account.
- The user is on the Login page.

##### 3. Test Steps
| Step | Action | Expected Result |
|---|---|---|
| 1 | Enter a valid email address. | The email is accepted and displayed correctly. |
| 2 | Enter the correct password. | The password characters are masked. |
| 3 | Click the “Login” button. | The user is redirected to the dashboard. |

##### 4. Post-condition
- The user is authenticated.
- An active session is created.

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

Each case includes requirement reference, title, persona/role, priority, type, preconditions, environment, accounts, test data, steps, expected results, postconditions or final business outcome, and cleanup when applicable.

Expected results must be observable and verifiable without assuming implementation-specific selectors.

## TestRail export

Support `export=none`, `export=csv`, and `export=xml`.

- Preserve one test case per record.
- Map title, section, type, priority, references, preconditions, steps, and expected result to the target fields.
- Serialize detailed table rows into compatible multiline Steps and Expected Result fields.
- Preserve custom fields when a mapping is supplied.
- Do not silently discard unsupported fields; report them.
- Treat XML as a configurable TestRail import profile and state the expected version/schema when unknown.
- Produce valid escaped content and a field-mapping note.

Default options are `layout=detailed` and `export=none`. If the user asks to save Markdown, use `tests/<feature-name>-e2e-test-cases.md` with a sanitized feature name and only write it when the user clearly requests or authorizes file creation.

## Internal validation

- Every requirement has one or more cases or an explicit coverage gap.
- Main journeys, alternate flows, errors, permissions, and relevant state transitions are considered.
- IDs are unique and use the correct category prefix.
- Steps are executable by a QA engineer without ambiguity.
- Expected results are measurable and verifiable.
- Preconditions, postconditions, cleanup, and test data are explicit.
- The coverage matrix shows complete, partial, or missing coverage.
- Exported fields are mapped or reported as unsupported.

## Example

```text
Use $gen-e2e-test-cases for the checkout flow.

Requirements:
- A signed-in customer can add products to a cart and complete checkout.
- Invalid payment details show a clear error without losing the cart.
- The order confirmation displays the order number.
- A customer cannot view another customer's order.

Role: customer
Layout: detailed
Export: none
```

Expected output includes functional cases for successful checkout, edge cases for an empty or changed cart, error cases for invalid payment details, permission coverage for another customer's order, and a coverage matrix linked to each requirement.
