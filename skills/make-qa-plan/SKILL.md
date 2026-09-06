---
name: make-qa-plan
description: Turn requirements or specifications into a risk-based QA plan with coverage, environments, test data, automation strategy, staffing, effort, and schedule estimates. Use for QA strategy and release readiness, not detailed test-case generation.
metadata:
  short-description: Create a resource-aware QA plan
---

# Make a QA plan

## Purpose and boundaries

Analyze requirements, product context, technical constraints, and delivery goals to produce a risk-based QA plan. Do not change project files or generate detailed API/E2E test cases unless the user separately requests implementation.

## Workflow

1. Extract scope, acceptance criteria, user roles, integrations, constraints, and quality goals.
2. Identify functional and non-functional risks and rank them by impact and likelihood.
3. Define test levels, coverage, environments, browsers/devices, accounts, and test data.
4. Define automation candidates, manual-only areas, entry criteria, exit criteria, and release checks.
5. Estimate QA effort, staffing, dependencies, and calendar schedule.
6. Check traceability from every requirement to one or more QA activities.

## Inputs and estimation rules

- Default to `4 members` when no QA team size is supplied.
- Accept a member count or roles such as QA lead, manual QA, automation QA, performance QA, and security QA.
- Accept optional availability, working hours, working days, start date, holidays, and fixed release dates.
- Estimate person-days for analysis, test design, data preparation, environment setup, execution, automation, regression, defect verification, and reporting.
- Convert effort to calendar duration using effective capacity, dependencies, review time, and realistic parallelism.
- Separate person-day effort from calendar duration.
- State assumptions and use relative timing if dates or environments are unknown.

## Output

Use this structure unless the user requests another format:

1. QA objectives and summary
2. Assumptions, risks, and open questions
3. Scope and exclusions
4. Test strategy and coverage matrix
5. Environment, account, and test-data plan
6. Automation and tooling strategy
7. Team and resource plan
8. Effort and schedule estimates
9. Entry/exit criteria and release checklist
10. Requirement-to-coverage traceability

Cover API, integration, UI, E2E, exploratory, regression, accessibility, performance, and security testing when relevant. Do not list detailed test cases; identify them as planned deliverables.

## Quality checklist

- High-risk requirements have explicit coverage.
- Test levels are justified rather than listed generically.
- Environment, account, data, and external dependencies are identified.
- Automation scope is realistic and distinguishes manual-only work.
- Entry and exit criteria are measurable.
- Resource assumptions and schedule dependencies are explicit.
- Release risks and unresolved questions are visible.

## Example

```text
Use $make-qa-plan for this requirement:

Users can reset a password by email. Cover the API, web flow, expired links,
rate limiting, email delivery failures, accessibility, and browser support.

Team: 4 members
Roles: QA lead, manual QA, automation QA, security QA
Availability: 80%
```

The result should identify authentication and account-takeover risks, define API/UI/security coverage, estimate test-data and automation work, specify entry/exit criteria, and produce a schedule that accounts for environment and email-provider dependencies.
