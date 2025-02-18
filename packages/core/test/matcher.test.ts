import { None, Option, Some } from "@/option";
import { Err, Ok, Result } from "@/result";

describe("Result Test Suite", () => {
	it("should handle Ok case", () => {
		const sut: Result<string, Error> = Ok("Success");

		const result = match(sut, {
			Ok: (value) => `Value: ${value}`,
			Err: (error) => {
				throw new Error(`Error: ${(error as Error).message}`);
			},
		});

		expect(result).toBe("Value: Success");
	});

	it("should handle Err case", () => {
		const sut: Result<string, Error> = Err(new Error("Success"));

		const result = match(sut, {
			Ok: (value) => `Value: ${value}`,
			Err: (error) => "Value: Error",
		});

		expect(result).toBe("Value: Error");
	});
});

describe("Option Test Suite", () => {
	it("should handle Some and None cases", () => {
		const sut: Option<number> = Some(42);

		const result = match(sut, {
			Some: (value) => `Value: ${value}`,
			None: () => "No value",
		});

		expect(result).toBe("Value: 42");
	});

	it("should handle None case", () => {
		const sut: Option<number> = None();

		const result = match(sut, {
			Some: (value) => `Value: ${value}`,
			None: () => "No value",
		});

		expect(result).toBe("No value");
	});
});
