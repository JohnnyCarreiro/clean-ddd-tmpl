/**
 * Represents a `Some` option, which holds a value.
 * @template T The type of the value held by this `Some` instance.
 */
export class Some {
    value;
    /**
     * Creates a new `Some` option with the given value.
     * @param value The value to be wrapped in the `Some` option.
     */
    constructor(value) {
        this.value = value;
    }
    /**
     * Checks if this option is a `Some`.
     * @returns `true` if this option is a `Some`, otherwise `false`.
     */
    isSome() {
        return true;
    }
    /**
     * Checks if this option is a `None`.
     * @returns `false` because this is a `Some`.
     */
    isNone() {
        return false;
    }
    /**
     * Unwraps the value held by this `Some` option.
     * @returns The value held by this `Some` option.
     */
    unwrap() {
        return this.value;
    }
    /**
     * Applies a transformation function to the value held by this `Some` option and returns a new `Option` with the transformed value.
     * @template U The type of the transformed value.
     * @param fn The transformation function to apply to the value.
     * @returns A new `Some` option containing the transformed value.
     */
    map(fn) {
        return new Some(fn(this.value));
    }
    /**
     * Applies a transformation function that returns an `Option` to the value held by this `Some` option.
     * @template U The type of the value in the resulting `Option`.
     * @param fn The transformation function to apply to the value.
     * @returns The result of applying the transformation function.
     */
    flatMap(fn) {
        return fn(this.value);
    }
    /**
     * Returns the value held by this `Some` option, ignoring the default value provided.
     * @param _ A default value (ignored in this implementation).
     * @returns The value held by this `Some` option.
     */
    unwrapOr(_) {
        return this.value;
    }
}
/**
 * Represents a `None` option, which holds no value.
 */
export class None {
    /**
     * Checks if this option is a `Some`.
     * @returns `false` because this is a `None`.
     */
    isSome() {
        return false;
    }
    /**
     * Checks if this option is a `None`.
     * @returns `true` because this is a `None`.
     */
    isNone() {
        return true;
    }
    /**
     * Attempts to unwrap the value from this `None` option.
     * @throws An error because `None` has no value.
     */
    unwrap() {
        throw new Error("Called unwrap on a None value");
    }
    /**
     * Applies a transformation function to the value (which does not exist) of this `None` option.
     * @template U The type of the value that would have been returned.
     * @param _fn The transformation function (ignored in this implementation).
     * @returns A new `None` option.
     */
    map(_fn) {
        return new None();
    }
    /**
     * Applies a transformation function that returns an `Option` to the value (which does not exist) of this `None` option.
     * @template U The type of the value in the resulting `Option`.
     * @param _fn The transformation function (ignored in this implementation).
     * @returns A new `None` option.
     */
    flatMap(_fn) {
        return new None();
    }
    /**
     * Returns the default value provided, since `None` has no value.
     * @template T The type of the default value.
     * @param defaultValue The value to return.
     * @returns The default value provided.
     */
    unwrapOr(defaultValue) {
        return defaultValue;
    }
}
