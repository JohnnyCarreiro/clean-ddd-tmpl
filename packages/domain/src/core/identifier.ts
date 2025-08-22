import { DomainException } from "./exception/domain.exception";
import { ValueObject } from "./value-object";

/**
 * Interface for defining identifiers in the domain.
 *
 * An `Identifier` represents a unique identity within the domain and serves as
 * a specialized form of `ValueObject`. Identifiers can be used to uniquely
 * identify entities and value objects in the system.
 *
 * All classes that implement `Identifier` MUST provide a static factory method
 * called `new` (or `create`, `from`, etc. - choose a consistent name) that
 * accepts a value of type `T` and returns a new instance of `Identifier<T>`.
 * This method serves as a controlled constructor, allowing for validation,
 * data transformation, or other operations before object creation.
 *
 * Example:
 *
 * ```typescript
 * class Uuid extends Identifier<string> {
 *   private constructor(readonly value: string) {
 *     super(value);
 *   }
 *
 *   static new(value: string): Uuid {
 *     // Validation or other operations can be performed here
 *     if (!isValidUUID(value)) { // Example validation
 *       throw new Error("Invalid UUID format");
 *     }
 *     return new Uuid(value);
 *   }
 *
 *   // ... other methods
 * }
 * ```
 */
export interface Identifier<T> extends ValueObject<T> {
	/**
	 * Defines the expected constructor for identifiers.
	 *
	 * Identifiers are a type of value object and must implement this constructor.
	 */
	create(...args: any[]): Result<Identifier<T>, DomainException>;
	create(): Result<Identifier<T>, DomainException>;
	/**
	 * Defines the expected constructor for identifiers.
	 *
	 * Identifiers are a type of value object and must implement this constructor.
	 */
	from(): Result<Identifier<T>, DomainException>;
	from(props: any): Result<Identifier<T>, DomainException>;
}

/**
 * Abstract class for implementing identifiers.
 *
 * The `Identifier` abstract class provides a base for creating identifiers
 * within the domain, which are specialized value objects. Identifiers have
 * the same characteristics as value objects, but they are used to uniquely
 * identify entities or other objects in the system.
 *
 * Subclasses MUST implement a static factory method as described in the
 * `Identifier` interface documentation.  This factory method is the preferred
 * way to create instances of the identifier.
 */
export abstract class Identifier<T>
	extends ValueObject<T>
	implements ValueObject<T>
{
	protected constructor(readonly value: T) {
		super(value);
		const constructor = this.constructor as unknown as Identifier<T>;

		if (typeof constructor.create !== "function") {
			throw new Error(
				`${this.constructor.name} must implement the static method new`,
			);
		}

		if (typeof constructor.from !== "function") {
			throw new Error(
				`${this.constructor.name} must implement the static method from`,
			);
		}
	}
	// public static abstract new<T>(): Identifier<T> ;
}
