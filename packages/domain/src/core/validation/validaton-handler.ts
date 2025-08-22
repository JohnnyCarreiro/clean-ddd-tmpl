export interface Validation {
	validate: () => void;
}
/**
 * Interface for handling validation errors in the domain layer.
 *
 * The `ValidationHandler` interface defines the contract for classes
 * responsible for collecting and managing validation errors during
 * the validation process. It supports appending errors and retrieving
 * them for further processing.
 */
export interface ValidationHandler {
	/**
	 * Appends a new error or another `ValidationHandler`'s errors to the current handler.
	 *
	 * This method allows for chaining errors or combining multiple validation results
	 * into a single handler.
	 *
	 * @param err - An `Error` instance or another `ValidationHandler` containing errors.
	 * @returns The current `ValidationHandler` instance for chaining.
	 */
	append(err: Error): ValidationHandler;
	append(validationHandler: ValidationHandler): ValidationHandler;

	/**
	 * Retrieves all validation errors stored in the handler.
	 *
	 * @returns An array of `Error` objects representing validation errors.
	 */
	getErrors(): Error[];

	/**
	 * Checks whether the handler contains any validation errors.
	 *
	 * @returns `true` if there are validation errors, otherwise `false`.
	 */
	hasErrors(): boolean;
}

/**
 * Abstract base class for implementing a `ValidationHandler`.
 *
 * This abstract class provides a default implementation of the `hasErrors()` method
 * and serves as a foundation for custom validation handlers. Subclasses are expected
 * to implement the remaining methods (`append` and `getErrors`).
 */
export abstract class ValidationHandler implements ValidationHandler {
	/**
	 * Checks whether the handler contains any validation errors.
	 *
	 * The method verifies if the list of errors is non-null and non-empty.
	 *
	 * @returns `true` if there are validation errors, otherwise `false`.
	 */
	hasErrors(): boolean {
		return this.getErrors() != null && this.getErrors().length > 0;
	}
}
