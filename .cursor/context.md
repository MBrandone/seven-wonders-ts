# Project Context

This is a fullstack TypeScript project.
It's a 7 wonders game which is playable on a web application supported by a backend implementation the business rules and exposing several endpoint to play the game.

## Backend
- Framework: NestJS
- Architecture: independants modules and hexagonal inside each modules
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

## Global Goals
- Long-term maintainability
- Clear separation of concerns
- High test coverage on business logic
