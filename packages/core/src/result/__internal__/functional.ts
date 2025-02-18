type Result<T, E> = {
	isOk: () => boolean;
	isErr: () => boolean;
	unwrap: () => T;
	unwrapErr: () => E;
	map: <U>(fn: (value: T) => U) => Result<U, E>;
	flatMap: <U>(fn: (value: T) => Result<U, E>) => Result<U, E>;
	mapErr: <U>(fn: (err: E) => U) => Result<T, U>;
};

/**
 * Creates an `Ok` result wrapping the given value.
 */
const Ok = <T>(value: T): Result<T, never> => ({
	isOk: () => true,
	isErr: () => false,
	unwrap: () => value,
	unwrapErr: () => {
		throw new Error("Called unwrapErr on an Ok value");
	},
	map: <U>(fn: (value: T) => U) => Ok(fn(value)),
	flatMap: <U>(fn: (value: T) => Result<U, never>) => fn(value),
	mapErr: <U>(_fn: (err: never) => U) => Ok(value),
});

/**
 * Creates an `Err` result wrapping the given error.
 */
const Err = <E>(error: E): Result<never, E> => ({
	isOk: () => false,
	isErr: () => true,
	unwrap: () => {
		throw new Error("Called unwrap on an Err value");
	},
	unwrapErr: () => error,
	map: <U>(_fn: (value: never) => U) => Err(error),
	flatMap: <U>(_fn: (value: never) => Result<U, E>) => Err(error),
	mapErr: <U>(fn: (err: E) => U) => Err(fn(error)),
});

// Example usage:
const success = Ok(42);
console.log(success.isOk()); // true
console.log(success.unwrap()); // 42

const failure = Err("Something went wrong");
console.log(failure.isErr()); // true
console.log(failure.unwrapErr()); // "Something went wrong"

// Chaining with map:
const doubled = success.map((value) => value * 2);
console.log(doubled.unwrap()); // 84

const flatMapped = success.flatMap((value) =>
	value > 40 ? Ok("Valid") : Ok(value.toString()),
);

flatMapped.isOk();
console.log(flatMapped.unwrap()); // "Valid"
