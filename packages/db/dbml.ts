import { pgGenerate } from "drizzle-dbml-generator"; // Using Postgres for this example
import * as schema from "./src/schema/index.ts";

const out = "./schema.dbml";
const relational = true;

pgGenerate({ schema, out, relational });
