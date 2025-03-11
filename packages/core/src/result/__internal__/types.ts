// type Ok<T, E = never> = [T] extends [never] ? never : T;
// type Err<E, T = never> = [E] extends [never] ? never : E;
//
// type Result<T, E extends Error | string = Error> = Ok<T> | Err<E>;

type OkType<T> = [T] extends [never] ? never : T;
type ErrType<E> = [E] extends [never] ? never : E;

/**
 * Represents the result of an operation that can either succeed (`Ok`) or fail (`Err`).
 */
// type Result<T, E extends Error | string = Error> = OkType<T> | ErrType<E>;
type Result<T, E extends Error> = Ok<OkType<T>> | Err<ErrType<E>>;

/**
 * Represents the result methods that must be implemented for success (`Ok`) or failure (`Err`).
 */
interface ResultDefinition<T = never, E = never> {
	isOk(): this is Ok<T>;
	isErr(): this is Err<E extends Error ? E : Error>;
	unwrap(): T;
	unwrapErr(): E;
	map<U>(fn: (value: T) => U): ResultDefinition<U, E>;
	flatMap<U>(fn: (value: T) => ResultDefinition<U, E>): ResultDefinition<U, E>;
	mapErr<U extends Error>(fn: (err: E) => U): ResultDefinition<T, U>;
}

/**
 * Represents a successful result (`Ok`) that contains a value.
 * @template T The type of the value contained in this `Ok`.
 */
class Ok<T> implements ResultDefinition<T, never> {
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
	isErr(): this is Err<never> {
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
	map<U>(fn: (value: T) => U): ResultDefinition<U, never> {
		return new Ok(fn(this.value)) as ResultDefinition<U, never>;
	}

	/**
	 * Applies a transformation function that returns a `Result` to the value contained in this `Ok`.
	 * @template U The type of the value in the resulting `Result`.
	 * @param fn The transformation function to apply to the value.
	 * @returns The result of applying the transformation function.
	 */
	flatMap<U>(
		fn: (value: T) => ResultDefinition<U, never>,
	): ResultDefinition<U, never> {
		return fn(this.value);
	}

	/**
	 * Maps the error value (if any). Since this is an `Ok`, the error mapping function is ignored, and the original `Ok` is returned.
	 * @template U The type of the error (ignored for `Ok`).
	 * @param _fn The mapping function for errors (not used).
	 * @returns The original `Ok` instance.
	 */
	// mapErr<U extends Error | string>(fn: (err: U) => U): Result<T, never> {
	// 	return this;
	mapErr<U extends Error>(_fn: (err: never) => U): ResultDefinition<T, U> {
		return this as unknown as ResultDefinition<T, U>;
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
class Err<E extends Error> extends Error implements ResultDefinition<never, E> {
	private error: E;
	/**
	 * Creates a new `Err` instance with the given error value.
	 * @param error The error to wrap in the `Err` instance.
	 */
	constructor(error: E | string) {
		super(typeof error === "string" ? error : error.message);
		this.error =
			typeof error === "string" ? (new Error(error) as E) : (error as E);
		Object.setPrototypeOf(this, Err.prototype);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, Err);
		}
	}

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
	isErr(): this is Err<E extends Error ? E : Error> {
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
	map<U>(_fn: (value: never) => U): ResultDefinition<never, E> {
		return this as unknown as ResultDefinition<never, E>;
	}

	/**
	 * Maps the error value using a transformation function and returns a new `Result` with the transformed error.
	 * @template U The type of the transformed error.
	 * @param fn The transformation function to apply to the error value.
	 * @returns A new `Err` containing the transformed error.
	 */
	mapErr<U extends Error>(fn: (err: E) => U): ResultDefinition<never, U> {
		return new Err<U>(fn(this.error)) as unknown as ResultDefinition<never, U>;
	}

	/**
	 * Applies a transformation function that returns a `Result` to the value (which does not exist) of this `Err`.
	 * @template U The type of the value in the resulting `Result`.
	 * @param _fn The transformation function (ignored in this implementation).
	 * @returns The original `Err` instance.
	 */
	flatMap<U>(
		_fn: (value: never) => ResultDefinition<U, never>,
	): ResultDefinition<never, E> {
		return this as unknown as ResultDefinition<never, E>;
	}

	/**
	 * Retrieves the error value contained in this `Err`.
	 * @returns The error value contained in this `Err`.
	 */
	unwrapErr(): E {
		return this.error;
	}
}

// (global as any).Result = Result;

export { Err, Ok, Result };
