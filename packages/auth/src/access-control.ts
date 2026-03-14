import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

export const statement = {
	...defaultStatements,
	course: ["create", "read", "update", "delete"],
	chapter: ["create", "read", "update", "delete"],
	unit: ["create", "read", "update", "delete"],
	exercise: ["create", "read", "update", "delete"],
	calaculator: ["create", "read", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
	course: ["read"],
	chapter: ["read"],
	unit: ["read"],
	exercise: ["read"],
	calaculator: ["read"],
});

export const admin = ac.newRole({
	course: ["create", "read", "update"],
	chapter: ["create", "read", "update"],
	unit: ["create", "read", "update"],
	exercise: ["create", "read", "update"],
	calaculator: ["create", "read", "update"],
});

export const superAdmin = ac.newRole({
	course: ["create", "read", "update", "delete"],
	chapter: ["create", "read", "update", "delete"],
	unit: ["create", "read", "update", "delete"],
	exercise: ["create", "read", "update", "delete"],
	calaculator: ["create", "read", "update", "delete"],
	...adminAc.statements,
});

export const roles = {
	user,
	admin,
	superAdmin,
};

admin.statements.unit;
