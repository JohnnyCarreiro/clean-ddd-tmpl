import { Err as ErrType, Ok as OkType, Result } from "./__internal__/types";

/**
 * Creates a new `Ok` instance, representing a successful result.
 * @template T The type of the value contained in the `Ok`.
 * @param value The value to wrap in the `Ok` instance.
 * @returns An `Ok` instance containing the given value.
 * @example
 * const result = Ok(42);
 * console.log(result.isOk()); // true
 * console.log(result.unwrap()); // 42
 */
function Ok<T>(value: T): Result<T, never> {
	return new OkType(value) as Result<T, never>;
}

/**
 * Creates a new `Err` instance, representing a failed result.
 * @template E The type of the error contained in the `Err`.
 * @param error The error to wrap in the `Err` instance.
 * @returns An `Err` instance containing the given error.
 * @example
 * const result = Err("Something went wrong");
 * console.log(result.isErr()); // true
 * console.log(result.unwrapErr()); // "Something went wrong"
 */
function Err<E extends Error>(error: E | string): Result<never, E> {
	return new ErrType(error) as unknown as Result<never, E>;
}

(global as any).Ok = Ok;
(global as any).Err = Err;

export { Err, Ok, Result, ErrType, OkType };
