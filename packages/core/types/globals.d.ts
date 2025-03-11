import { Option } from "../src/option";
import { Result as ResultType } from "../src/result";
import { Ok as OkType, Err as ErrType } from "../src/result/__internal__/types";
import {
	Some as SomeType,
	None as NoneType,
} from "../src/option/__internal__/types";

declare global {
	function match<T, E extends Error, R>(
		matcher: ResultType<T, E>,
		cases: {
			Ok: (value: T) => R;
			Err: (error: E) => R;
		},
	): R;

	// Overload para Option<T>
	function match<T, R>(
		matcher: Option<T>,
		cases: {
			Some: (value: T) => R;
			None: () => R;
		},
	): R;

	function match<T, E extends Error>(
		matcher: Result<T, E>,
		cases: {
			Ok: (value: T) => Some<T>;
			Err: (error: E) => Option<T>;
		},
	): Option<T>;

	function match<T, E extends Error = Error>(
		matcher: Option<T>,
		cases: {
			Some: (value: T) => Result<T, E>;
			None: () => Result<t, E>;
		},
	): Result<T, E>;

	/**
	 * Represents the result of an operation that can either succeed (`Ok`) or fail (`Err`).
	 */
	type Result<T, E extends Error> = OkType<T> | ErrType<E>;

	type Ok<T, E = never> = [T] extends [never] ? never : T;
	type Err<E, T = never> = [E] extends [never] ? never : E;

	type Result<T, E extends Error> = Ok<T> | Err<E>;

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
	function Ok<T>(value: T): Result<T, never>;

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
	function Err<E extends Error>(error: E | string): Result<never, E>;

	function Some<T>(value: T): SomeType<T>;
	function None(): NoneType;
}

export {};
