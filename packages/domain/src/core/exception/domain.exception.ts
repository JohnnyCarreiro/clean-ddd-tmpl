import { Exception } from "./exception";

/**
 * Represents exceptions that occur in the Domain layer.
 * These exceptions indicate violations of business rules or constraints.
 *
 * This class should be extended to create domain-specific exception types.
 */
export class DomainException extends Exception {
	/**
	 * Creates a new DomainException instance.
	 *
	 * @param message - A descriptive message for the domain exception.
	 * @param cause - An optional underlying error that caused this exception.
	 */
	constructor(message: string, cause?: Error) {
		super(message, cause);
		Object.setPrototypeOf(this, DomainException.prototype);
	}
}
