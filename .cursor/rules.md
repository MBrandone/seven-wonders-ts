# Global Engineering Rules

These rules are mandatory and must always be followed.

## Language & Style
- Use TypeScript exclusively
- Follow Clean Code principles
- Prefer explicit types over inference when it improves clarity
- Avoid magic values
- Do not use comments and make the naming of variables and functions the most explicit
- Forbidden to use double assertion (as unknown as)

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

## Skills
- When a skill is referenced, it is mandatory
- All skill rules must be applied
- If a rule conflicts with existing code, explain the conflict before changing
