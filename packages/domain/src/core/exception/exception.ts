/**
 * Base class for all exceptions in the application.
 * This abstract class is the foundation for creating specific exception types
 * in different layers (e.g., Domain, Application, Repository).
 *
 * It extends the native `Error` class, preserving the stack trace and
 * allowing the inclusion of a root cause.
 */
export abstract class Exception extends Error {
	/**
	 * Creates a new Exception instance.
	 *
	 * @param message - A descriptive message for the exception.
	 * @param cause - An optional underlying error that caused this exception.
	 */
	constructor(
		readonly message: string,
		cause?: Error,
	) {
		super(message, { cause });
		Object.setPrototypeOf(this, Exception.prototype);

		// Captures the stack trace for debugging purposes
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, Exception);
		}
	}
}
