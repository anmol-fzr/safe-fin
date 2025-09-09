import { describe, it, expect } from "vitest";
import { createToastMessages } from "../defaults";

describe("Testing api hook utilities", () => {
	it("createToastMessages Should Work as Expected", () => {
		const result = createToastMessages("Lesson");

		expect(result).toStrictEqual({
			createMsg: {
				loadingMsg: "Adding Lesson...",
				successMsg: "Lesson Added Successfully",
				errorMsg: "Unable to Add Lesson",
			},
			updateMsg: {
				loadingMsg: "Updating Lesson...",
				successMsg: "Lesson Updated Successfully",
				errorMsg: "Unable to Update Lesson",
			},
			deleteMsg: {
				loadingMsg: "Deleting Lesson...",
				successMsg: "Lesson Deleted Successfully",
				errorMsg: "Unable to Delete Lesson",
			},
		});
	});
});
