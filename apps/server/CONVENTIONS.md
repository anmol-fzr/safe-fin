
## Directory Structure

src/
├── index.ts               # Entry point
├── api/
│   ├── v1/
│   │   └── router.ts      # Aggregates V1 routes
│   └── v2/                # For Future
│       └── router.ts
├────── modules/
│    ├── quiz/
│    │   ├── service.ts           # Shared DB Logic
│    │   ├── quiz.controller.ts   # V1 logic
│    │   ├── quiz.router.ts       # V1 routes
│    │   ├── v2.quiz.service.ts        # V2 specific DB Login (if needed)
│    │   ├── v2.quiz.controller.ts     # V2 specific logic (if needed)
│    │   └── v2.quiz.router.ts         # V2 specific routes
│    └── lesson/
│       ├── service.ts
│       ├── controller.ts
│       └── router.ts
├────── config/
│        ├─── auth.ts      # Auth Related Global Config
│        └─── db.ts        # DB Related Global Config like Singletons
├────── middleware/        # Global Middlewares
├────── schema/            # Global Schemas Only (for pagination etc)

###<version>.<module>.<file-type>.ts
#### version 
Version number is omitted for 1st version

#### module 
Name of the Module (singular)

#### file-type 
The Type of file contains: 
- controller -> API Level Handlers
- router     -> Only Routing Logic ( params, query & body validation + handler calling )
- service    -> Only DB Logic
- codes      -> Only Success and Error Codes for the module

## Centralized Package Imports
All external or shared package imports (especially `@safe-fin/*` and `drizzle-orm`) MUST go through a centralized configuration file in `src/config/`.
Do not import directly from these packages in your functional code.
- **Example**: Import database entities and operators from `@/pkg/db` instead of `@safe-fin/db` or `drizzle-orm`.
