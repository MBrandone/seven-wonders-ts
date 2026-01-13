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
- Function should be concise (less than 10 lines)
- Prefer explicit types over inference when it improves clarity
- Avoid magic values and use enums or Objects to give sense
- Do not use comments and make the naming of variables and functions the most explicit
- It is forbidden to use double assertion (as unknown as)
- Do the necessary refactoring : if a function parameter is not used, remove it from function parameters and delete it in all function calls

## Architecture
- Nest project is divided into sevaral modules which must be the most independent possible
- Strictly follow Hexagonal Architecture
- Domain layer must not depend on:
  - frameworks
  - databases
  - HTTP / REST
  - external services
- Dependencies always point inward

## Testing
- All the written code should be tested by automated tests
- Write the tests in the GIVEN, WHEN and THEN fashion and mark each section with the appropriate comment (//GIVEN, //WHEN and //THEN)
- Tests are written in french. The "describe" jest method should always start with a sentences like "Quand ..." whic explain the situation we are in before making the assertions. The "it" jest method should always start with "Alors ..." and explain the assertion. This is an example : 
```
describe("When this condition apply", () => {
  it("Then this is the assertion", () => {
    // GIVEN
    const a = 1;
    const b = 2

    // WHEN
    const result = a + b

    // THEN
    expect(result).toBe(3)
  })
})
```

## Tooling
- Code must comply with Biome linter rules
- Do not introduce unnecessary external dependencies

## Collaboration
- If requirements are ambiguous, ask for clarification
- Prefer minimal and incremental changes
- Explain trade-offs briefly when relevant
- Before starting to code, give a plan on what you are going to do. You can start to good once I approve the plan
