export abstract class Adapter {
	getById<T>(id: number): T {
		throw new Error("Method not Implimented");
	}

	create<Resp, Payload>(payload: Payload): Resp {
		throw new Error("Method not Implimented");
	}

	updateById<Resp, Payload>(lessonId: number, data: Payload): Resp {
		throw new Error("Method not Implimented");
	}
}
