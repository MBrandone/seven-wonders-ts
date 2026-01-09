# Project Context

It's a 7 wonders game which is playable on the web.

## Backend
- Framework: NestJS
- Architecture: independants modules and hexagonal architecture inside each modules
- Testing: Jest
- Layers:
  - domain: entities, value objects
  - services: use cases and read models
  - application: API endpoints, jobs, workers, gateways
  - infrastructure: database, repositories implementations, persistence implementations
- E2E tests are located in /e2e and test complete user journeys

## Frontend
- Framework: React
- Language: TypeScript
- Focus on maintainability and explicit state management

# Bash commands
- npm run build: Build the project
- npm run format: Format code
- npm run test: run automated tests

# Workflow
- Write automated tests for every code that you want to add
- Before finishing, lint and format code if needed. fix every issues that are shown
- Before finishing, run tests and e2e tests. All tests from test suite should be green.

## Code Language & Style
- Use TypeScript exclusively
- Follow Clean Code principles
- Prefer explicit types over inference when it improves clarity
- Avoid magic values
- Do not use comments and make the naming of variables and functions the most explicit
- It is forbidden to use double assertion (as unknown as)

## Architecture
- Nest project is divided into sevaral modules which must be the most independent possible
- Strictly follow Hexagonal Architecture
- Domain layer must not depend on:
  - frameworks
  - databases
  - HTTP / REST
  - external services
- Dependencies always point inward

## Tooling
- Code must comply with Biome linter rules
- Do not introduce unnecessary external dependencies

## Collaboration
- If requirements are ambiguous, ask for clarification
- Prefer minimal and incremental changes
- Explain trade-offs briefly when relevant
- Before starting to code, give a plan on what you are going to do. You can start to good once I approve the plan
