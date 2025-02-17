/**
 * Represents the result of an operation that can either succeed (`Ok`) or fail (`Err`).
 */
type Result<T, E> = Ok<T> | Err<E>;

/**
 * Represents a successful result (`Ok`) that contains a value.
 * @template T The type of the value contained in this `Ok`.
 */
class Ok<T> {
	/**
	 * Creates a new `Ok` instance with the given value.
	 * @param value The value to wrap in the `Ok` instance.
	 */
	constructor(private value: T) {}

	/**
	 * Checks if this result is an `Ok`.
	 * @returns `true` because this is an `Ok`.
	 */
	isOk(): this is Ok<T> {
		return true;
	}

	/**
	 * Checks if this result is an `Err`.
	 * @returns `false` because this is an `Ok`.
	 */
	isErr(): this is Err<unknown> {
		return false;
	}

	/**
	 * Retrieves the value contained in this `Ok`.
	 * @returns The value contained in this `Ok`.
	 */
	unwrap(): T {
		return this.value;
	}

	/**
	 * Applies a transformation function to the value contained in this `Ok` and returns a new `Result` with the transformed value.
	 * @template U The type of the transformed value.
	 * @param fn The transformation function to apply to the value.
	 * @returns A new `Ok` containing the transformed value.
	 */
	map<U>(fn: (value: T) => U): Result<U, never> {
		return new Ok(fn(this.value));
	}

	/**
	 * Applies a transformation function that returns a `Result` to the value contained in this `Ok`.
	 * @template U The type of the value in the resulting `Result`.
	 * @param fn The transformation function to apply to the value.
	 * @returns The result of applying the transformation function.
	 */
	flatMap<U>(fn: (value: T) => Result<U, never>): Result<U, never> {
		return fn(this.value);
	}

	/**
	 * Maps the error value (if any). Since this is an `Ok`, the error mapping function is ignored, and the original `Ok` is returned.
	 * @template U The type of the error (ignored for `Ok`).
	 * @param _fn The mapping function for errors (not used).
	 * @returns The original `Ok` instance.
	 */
	mapErr<U>(_fn: (err: never) => U): Result<T, never> {
		return this;
	}

	/**
	 * Retrieves the error contained in this result. Since this is an `Ok`, an error is thrown.
	 * @throws An error because `unwrapErr` is called on an `Ok`.
	 */
	unwrapErr(): never {
		throw new Error("Called unwrapErr on an Ok value");
	}
}

/**
 * Represents a failed result (`Err`) that contains an error value.
 * @template E The type of the error contained in this `Err`.
 */
class Err<E> {
	/**
	 * Creates a new `Err` instance with the given error value.
	 * @param error The error to wrap in the `Err` instance.
	 */
	constructor(private error: E) {}

	/**
	 * Checks if this result is an `Ok`.
	 * @returns `false` because this is an `Err`.
	 */
	isOk(): this is Ok<never> {
		return false;
	}

	/**
	 * Checks if this result is an `Err`.
	 * @returns `true` because this is an `Err`.
	 */
	isErr(): this is Err<E> {
		return true;
	}

	/**
	 * Retrieves the value contained in this result. Since this is an `Err`, an error is thrown.
	 * @throws An error because `unwrap` is called on an `Err`.
	 */
	unwrap(): never {
		throw new Error("Called unwrap on an Err value");
	}

	/**
	 * Maps the value (if any). Since this is an `Err`, the mapping function is ignored, and the original `Err` is returned.
	 * @template U The type of the value (ignored for `Err`).
	 * @param _fn The mapping function for values (not used).
	 * @returns The original `Err` instance.
	 */
	map<U>(_fn: (value: never) => U): Result<never, E> {
		return this;
	}

	/**
	 * Maps the error value using a transformation function and returns a new `Result` with the transformed error.
	 * @template U The type of the transformed error.
	 * @param fn The transformation function to apply to the error value.
	 * @returns A new `Err` containing the transformed error.
	 */
	mapErr<U>(fn: (err: E) => U): Result<never, U> {
		return new Err(fn(this.error));
	}

	/**
	 * Applies a transformation function that returns a `Result` to the value (which does not exist) of this `Err`.
	 * @template U The type of the value in the resulting `Result`.
	 * @param _fn The transformation function (ignored in this implementation).
	 * @returns The original `Err` instance.
	 */
	flatMap<U>(_fn: (value: never) => Result<U, never>): Result<never, E> {
		return this;
	}

	/**
	 * Retrieves the error value contained in this `Err`.
	 * @returns The error value contained in this `Err`.
	 */
	unwrapErr(): E {
		return this.error;
	}
}

/**
 * @package
 */
export { Err, Ok, Result };
