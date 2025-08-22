import { DomainException } from "@/core/exception/domain.exception";
import {
	StackValidationHandler,
	ThrowsValidationHandler,
	Validation,
} from "@/core/validation";

describe("StackValidationHandler", () => {
	it("should create an instance with no errors", () => {
		const handler = StackValidationHandler.create();
		expect(handler.hasErrors()).toBe(false);
		expect(handler.getErrors()).toEqual([]);
	});

	it("should append an error", () => {
		const handler = StackValidationHandler.create();
		const error = new Error("Test error");
		handler.append(error);
		expect(handler.hasErrors()).toBe(true);
		expect(handler.getErrors()).toEqual([error]);
	});

	it("should append errors from another ValidationHandler", () => {
		const handler1 = StackValidationHandler.create();
		const handler2 = StackValidationHandler.create();
		const error1 = new Error("Error 1");
		const error2 = new Error("Error 2");
		handler2.append(error1);
		handler2.append(error2);
		handler1.append(handler2);
		expect(handler1.getErrors()).toEqual([error1, error2]);
	});

	it("should validate successfully", () => {
		const handler = StackValidationHandler.create();
		const validation: Validation = {
			validate: () => {},
		};
		handler.validate(validation);
		expect(handler.hasErrors()).toBe(false);
	});

	it("should capture DomainException during validation", () => {
		const handler = StackValidationHandler.create();
		const error = new Error("Domain error");
		const validation: Validation = {
			validate: () => {
				throw new DomainException(error.message, error);
			},
		};
		handler.validate(validation);
		expect(handler.hasErrors()).toBe(true);
		expect(handler.getErrors()).toEqual([
			new DomainException(error.message, error),
		]);
	});

	it("should log unknown exception during validation", () => {
		const handler = StackValidationHandler.create();
		const error = new Error("Generic error");
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		const validation: Validation = {
			validate: () => {
				throw error;
			},
		};
		handler.validate(validation);
		expect(consoleSpy).toHaveBeenCalled();
		consoleSpy.mockRestore();
	});

	it("should create a handler with an error", () => {
		const error = new Error("Test error");
		const handler = StackValidationHandler.createFromError(error);
		expect(handler.getErrors()).toEqual([error]);
	});
});

describe("ThrowsValidationHandler", () => {
	it("should throw DomainException when appending an error", () => {
		const handler = new ThrowsValidationHandler();
		const error = new Error("Test error");
		expect(() => handler.append(error)).toThrowError(DomainException);
		expect(() => handler.append(error)).toThrowError("Test error");
	});

	it("should throw DomainException when appending errors from another ValidationHandler", () => {
		const handler = new ThrowsValidationHandler();
		const otherHandler = StackValidationHandler.create();
		const error1 = new Error("Error 1");
		const error2 = new Error("Error 2");
		otherHandler.append(error1);
		otherHandler.append(error2);
		expect(() => handler.append(otherHandler)).toThrowError(DomainException);
		expect(() => handler.append(otherHandler)).toThrowError(
			"Error: Error 1,Error: Error 2",
		);
	});

	it("should validate successfully", () => {
		const handler = new ThrowsValidationHandler();
		const validation: Validation = {
			validate: () => {},
		};
		expect(() => handler.validate(validation)).not.toThrow();
	});

	it("should throw DomainException with DomainException during validation", () => {
		const handler = new ThrowsValidationHandler();
		const error = new Error("Domain error");
		const validation: Validation = {
			validate: () => {
				throw new DomainException(error.message, error);
			},
		};
		expect(() => handler.validate(validation)).toThrowError(DomainException);
		expect(() => handler.validate(validation)).toThrowError("Domain error");
	});

	it("should throw DomainException with Error during validation", () => {
		const handler = new ThrowsValidationHandler();
		const error = new Error("Generic error");
		const validation: Validation = {
			validate: () => {
				throw error;
			},
		};
		expect(() => handler.validate(validation)).toThrowError(DomainException);
		expect(() => handler.validate(validation)).toThrowError("Generic error");
	});

	it("should throw DomainException with generic exception during validation", () => {
		const handler = new ThrowsValidationHandler();
		const error = "Generic error";
		const validation: Validation = {
			validate: () => {
				throw error;
			},
		};
		expect(() => handler.validate(validation)).toThrowError(DomainException);
		expect(() => handler.validate(validation)).toThrowError("Generic error");
	});

	it("should have no errors", () => {
		const handler = new ThrowsValidationHandler();
		expect(handler.hasErrors()).toBe(false);
		expect(handler.getErrors()).toEqual([]);
	});
});
