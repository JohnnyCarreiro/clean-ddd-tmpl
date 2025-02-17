/**
 * Represents an optional value that can either be `Some` (with a value) or `None` (no value).
 */
export type Option<T> = Some<T> | None;
/**
 * Represents a `Some` option, which holds a value.
 * @template T The type of the value held by this `Some` instance.
 */
export declare class Some<T> {
    private value;
    /**
     * Creates a new `Some` option with the given value.
     * @param value The value to be wrapped in the `Some` option.
     */
    constructor(value: T);
    /**
     * Checks if this option is a `Some`.
     * @returns `true` if this option is a `Some`, otherwise `false`.
     */
    isSome(): this is Some<T>;
    /**
     * Checks if this option is a `None`.
     * @returns `false` because this is a `Some`.
     */
    isNone(): this is None;
    /**
     * Unwraps the value held by this `Some` option.
     * @returns The value held by this `Some` option.
     */
    unwrap(): T;
    /**
     * Applies a transformation function to the value held by this `Some` option and returns a new `Option` with the transformed value.
     * @template U The type of the transformed value.
     * @param fn The transformation function to apply to the value.
     * @returns A new `Some` option containing the transformed value.
     */
    map<U>(fn: (value: T) => U): Option<U>;
    /**
     * Applies a transformation function that returns an `Option` to the value held by this `Some` option.
     * @template U The type of the value in the resulting `Option`.
     * @param fn The transformation function to apply to the value.
     * @returns The result of applying the transformation function.
     */
    flatMap<U>(fn: (value: T) => Option<U>): Option<U>;
    /**
     * Returns the value held by this `Some` option, ignoring the default value provided.
     * @param _ A default value (ignored in this implementation).
     * @returns The value held by this `Some` option.
     */
    unwrapOr(_: T): T;
}
/**
 * Represents a `None` option, which holds no value.
 */
export declare class None {
    /**
     * Checks if this option is a `Some`.
     * @returns `false` because this is a `None`.
     */
    isSome(): this is Some<never>;
    /**
     * Checks if this option is a `None`.
     * @returns `true` because this is a `None`.
     */
    isNone(): this is None;
    /**
     * Attempts to unwrap the value from this `None` option.
     * @throws An error because `None` has no value.
     */
    unwrap(): never;
    /**
     * Applies a transformation function to the value (which does not exist) of this `None` option.
     * @template U The type of the value that would have been returned.
     * @param _fn The transformation function (ignored in this implementation).
     * @returns A new `None` option.
     */
    map<U>(_fn: (value: never) => U): Option<U>;
    /**
     * Applies a transformation function that returns an `Option` to the value (which does not exist) of this `None` option.
     * @template U The type of the value in the resulting `Option`.
     * @param _fn The transformation function (ignored in this implementation).
     * @returns A new `None` option.
     */
    flatMap<U>(_fn: (value: never) => Option<U>): Option<U>;
    /**
     * Returns the default value provided, since `None` has no value.
     * @template T The type of the default value.
     * @param defaultValue The value to return.
     * @returns The default value provided.
     */
    unwrapOr<T>(defaultValue: T): T;
}
//# sourceMappingURL=types.d.ts.map