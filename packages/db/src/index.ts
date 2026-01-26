import {
    type DB as DevDB,
    getAuthDrizzleAdapter as getDevAuthDrizzleAdapter,
    getDb as getDevDb,
} from "./db.dev";
import {
    type DB as ProdDB,
    getAuthDrizzleAdapter as getProdAuthDrizzleAdapter,
    getDb as getProdDb,
} from "./db.prod";

export {
    getDevDb,
    getDevAuthDrizzleAdapter,
    getProdDb,
    getProdAuthDrizzleAdapter,
};

export type { DevDB, ProdDB };
export * from "drizzle-orm";
