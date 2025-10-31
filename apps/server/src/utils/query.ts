import { and, asc, count, desc, getTableColumns, SQL } from "drizzle-orm";
import type { SQLiteColumn } from "drizzle-orm/sqlite-core";
import type { DB } from "@/db";
import { getDb } from "@/db";

export class TableQuery<T extends Record<string, any>> {
	private db: DB;
	private table;
	private where?: SQL;
	private order?: SQL;
	private limitValue?: number;
	private offsetValue?: number;
	private joins: { table: any; on: SQL }[] = [];
	private fields?: T;

	constructor(db: ReturnType<typeof getDb>, table: any) {
		this.db = db;
		this.table = table;
	}

	private clone(modify: (clone: this) => void): this {
		const copy = Object.assign(
			Object.create(Object.getPrototypeOf(this)),
			this,
		);
		modify(copy);
		return copy;
	}

	whereClause(clause: SQL) {
		return this.clone((c) => {
			c.where = c.where ? and(c.where, clause) : clause;
		});
	}

	innerJoin(table: any, on: SQL) {
		return this.clone((c) => {
			c.joins.push({ table, on });
		});
	}

	sort(field: SQLiteColumn<any>, direction: "asc" | "desc" = "desc") {
		return this.clone((c) => {
			c.order = direction === "desc" ? desc(field) : asc(field);
		});
	}

	paginate(page = 1, limit = 10) {
		return this.clone((c) => {
			c.limitValue = limit;
			c.offsetValue = (page - 1) * limit;
		});
	}

	select(fields: T) {
		this.fields = fields;
	}

	protected getColumns() {
		return getTableColumns(this.table);
	}

	build() {
		const columns = this.getColumns();

		let query = this.db.select(this.fields ?? columns).from(this.table);

		for (const { table, on } of this.joins) {
			query = query.innerJoin(table, on);
		}
		if (this.where) query = query.where(this.where);
		if (this.order) query = query.orderBy(this.order);
		if (this.limitValue) query = query.limit(this.limitValue);
		if (this.offsetValue) query = query.offset(this.offsetValue);

		return query;
	}

	countQuery() {
		const query = this.db.select({ count: count() }).from(this.table);
		if (this.where) {
			query.where(this.where);
		}
		return query;
	}
}
