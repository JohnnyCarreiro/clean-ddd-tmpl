import { ValidationHandler } from "./validation/validaton-handler";

/**
 * Interface for defining value objects in the domain.
 *
 * A `ValueObject` represents an immutable concept that is uniquely identified
 * by its value, not its identity. This interface defines the essential methods
 * to ensure consistency and validation in concrete implementations.
 */
export interface ValueObject<T> {
	/**
	 * Defines the expected constructor for value objects.
	 */
	new (...args: any[]): ValueObject<T>;
	new (): ValueObject<T>;
}

/**
 * Abstract class for implementing value objects.
 *
 * The `ValueObject` abstract class provides a base for implementing value objects,
 * which should be immutable and defined by the value they encapsulate.
 * Subclasses must implement the required methods to retrieve the value,
 * validate the object's state, check equality, and convert it to a string.
 */
export abstract class ValueObject<T> implements ValueObject<T> {
	protected constructor(readonly value: T) {}
	/**
	 * Retrieves the value encapsulated by the value object.
	 *
	 * @returns The value of type `T` represented by the object.
	 */
	abstract getValue(): T;

	/**
	 * Validates the state of the value object using a `ValidationHandler`.
	 *
	 * This method must be implemented to ensure the encapsulated value is valid
	 * and meets the domain criteria.
	 *
	 * @param validationHandler - A validation handler to collect any potential errors.
	 */
	abstract validate(validationHandler: ValidationHandler): void;

	/**
	 * Compares this value object with another value object of the same type.
	 *
	 * This method checks if the value objects are equal based on their encapsulated values.
	 *
	 * @param value - The value object to compare with.
	 * @returns True if both value objects are equal, otherwise false.
	 */
	abstract equals(value: ValueObject<T>): boolean;

	/**
	 * Converts the value object to a string representation.
	 *
	 * This method provides a string representation of the value object for debugging
	 * or logging purposes.
	 *
	 * @returns A string representation of the value object.
	 */
	abstract toString(): string;
}
