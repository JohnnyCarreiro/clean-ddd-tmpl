import { DomainException } from "@/core/exception/domain.exception";
import { Uuid } from "@/core/Uuid";
import { ThrowsValidationHandler } from "@/core/validation";

describe("Uuid Test Suite", () => {
	it("should create a new uuid", () => {
		const sut = Uuid.create();

		const result = match(sut, {
			Ok: (value) => value,
			Err: (err) => {
				if (err instanceof DomainException) throw err;
				throw new Error("unexpected error");
			},
		});

		expect(sut.isOk()).toBeTruthy();
		expect(result.getValue()).toBeDefined();
		assertType<Uuid>(result);
	});

	it("should create a new valid uuid", () => {
		const uuid = Uuid.create();

		const sut = match(uuid, {
			Ok: (value) => value,
			Err: (err) => {
				if (err instanceof DomainException) throw err;
				throw new Error("unexpected error");
			},
		});

		const validationHandler = new ThrowsValidationHandler();
		sut.validate(validationHandler);

		expect(validationHandler.hasErrors()).toBe(false);
	});

	it("should result in a DomainException for invalid uuid", () => {
		const invalidUuid = Uuid.from("invalid-uuid");
		// const validationHandler = new ThrowsValidationHandler();
		//
		// expect(() => invalidUuid.unwrap().validate(validationHandler)).toThrow(
		// 	DomainException,
		// );

		expect(invalidUuid.isErr()).toBeTruthy();
		expect(invalidUuid.unwrapErr()).toBeInstanceOf(DomainException);
	});
});
