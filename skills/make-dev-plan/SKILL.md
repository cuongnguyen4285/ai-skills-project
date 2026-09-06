---
name: make-dev-plan
description: Turn requirements or technical specifications into an actionable development plan with effort, staffing, dependencies, risks, and schedule estimates. Use for implementation planning, not source-code generation or detailed test cases.
metadata:
  short-description: Create a resource-aware development plan
---

# Make a development plan

## Purpose and boundaries

Analyze requirements, technical specifications, repository context, and delivery constraints to produce an implementation plan. Do not change project files or generate source code unless the user separately requests implementation.

Do not replace the QA plan with detailed API or E2E test cases. Identify QA dependencies and handoffs at planning level only.

## Workflow

1. Extract goals, requirements, acceptance criteria, constraints, and out-of-scope items.
2. Identify affected applications, services, components, data, integrations, and infrastructure.
3. Break the work into deliverables with dependencies, owners, effort, and acceptance criteria.
4. Identify the critical path, parallel work, risks, assumptions, and open questions.
5. Estimate person-days, resource allocation, and calendar schedule.
6. Check traceability from every requirement to one or more planned tasks.

## Inputs and estimation rules

- Default to `4 members` when no team size is supplied.
- Accept a member count or named roles such as backend, frontend, database, DevOps, and developer.
- Accept optional availability, working hours, working days, start date, holidays, and fixed milestones.
- Estimate effort in person-days before estimating calendar duration.
- Account for dependencies, reviews, integration, meetings, support allocation, and useful parallelism. Do not divide total effort by team size alone.
- Separate person-day effort from calendar duration.
- If information is missing, state assumptions and provide relative timing instead of false precision.

## Output

Use this structure unless the user requests another format:

1. Executive summary
2. Assumptions and open questions
3. Scope and impact analysis
4. Proposed technical approach
5. Work breakdown with role, effort, dependencies, and acceptance criteria
6. Resource allocation
7. Schedule and milestones
8. Critical path, risks, and mitigations
9. Definition of done
10. Requirement-to-task traceability

Include best-case, expected, and risk-adjusted scenarios when uncertainty is material. Clearly label all estimates as estimates.

## Quality checklist

- Every requirement has a planned task or an explicit gap.
- Technical, data, integration, deployment, and documentation work is considered.
- Dependencies and critical-path tasks are visible.
- Owners and resource assumptions are explicit.
- Calendar duration is not confused with person-day effort.
- Risks, mitigations, and open decisions are actionable.
- The plan does not silently assume implementation details that are not provided.

## Example

```text
Use $make-dev-plan for this requirement:

Add passwordless email login. The API, web UI, email provider integration,
database migration, monitoring, and rollout documentation are required.

Team: 4 members
Roles: 2 backend, 1 frontend, 1 DevOps
Availability: 80%
```

The result should separate backend, frontend, infrastructure, migration, and documentation effort; identify the email-provider dependency; show person-days and calendar duration; and state missing decisions such as token expiry and retry behavior.
