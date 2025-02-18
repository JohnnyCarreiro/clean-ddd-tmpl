type Option<T> = {
	isSome: () => boolean;
	isNone: () => boolean;
	unwrap: () => T;
	unwrapOr: (defaultValue: T) => T;
	map: <U>(fn: (value: T) => U) => Option<U>;
};

const Some = <T>(value: T): Option<T> => ({
	isSome: () => true,
	isNone: () => false,
	unwrap: () => value,
	unwrapOr: (_defaultValue: T) => value,
	map: <U>(fn: (value: T) => U) => Some(fn(value)),
});

const None = <T>(): Option<T> => ({
	isSome: () => false,
	isNone: () => true,
	unwrap: () => {
		throw new Error("Called unwrap on a None value");
	},
	unwrapOr: (defaultValue: T) => defaultValue,
	map: <U>(_fn: (value: T) => U) => None<U>(),
});
