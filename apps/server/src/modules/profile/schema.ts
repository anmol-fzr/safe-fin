import { userDemographics } from "@safe-fin/db";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const demoGraphicsSchema = createInsertSchema(userDemographics);

const insertDemoGraphicsSchema = demoGraphicsSchema.pick({
	dob: false,
	gender: true,
	country: true,
	state: true,
	city: true,
	educationLevel: true,
	occupation: true,
});

export { insertDemoGraphicsSchema };
