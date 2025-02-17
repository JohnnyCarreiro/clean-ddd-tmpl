import { Some as SomeType, None as NoneType } from "./__internal__/types";

/**
 * Creates a new `Some` instance, representing an `Option` with a value.
 * @template T The type of the value contained in the `Some`.
 * @param value The value to wrap in the `Some` instance.
 * @returns A `Some` instance containing the given value.
 * @example
 * const option = Some(42);
 * console.log(option.isSome()); // true
 * console.log(option.unwrap()); // 42
 */
export function Some<T>(value: T): SomeType<T> {
	return new SomeType(value);
}

/**
 * Creates a new `None` instance, representing an `Option` with no value.
 * @returns A `None` instance.
 * @example
 * const option = None();
 * console.log(option.isNone()); // true
 * console.log(option.unwrap()); // throws Error: "Called unwrap on a None value"
 */
export function None(): NoneType {
	return new NoneType();
}
