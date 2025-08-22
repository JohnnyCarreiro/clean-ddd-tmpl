import { Identifier } from "./identifier";
import { ValueObject } from "./value-object";

/**
 * Extracts the underlying value type of an `Identifier`.
 */
export type ValueType<T> = T extends Identifier<infer U> ? U : never;

// 1. Defina um tipo para o construtor da entidade que inclui os métodos estáticos
export type EntityConstructor<
	Id extends Identifier<ValueType<Id>>,
	T extends Entity<Id>,
> = {
	new (id: Id, createdAt: Date, updatedAt: Date, deletedAt?: Date): T;
	create(): T;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	create(...args: any[]): T;
	from(): T;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	from(props: any): T;
};

/**
 * Base class for all entities in the domain.
 *
 * An `Entity` is an object that is defined not by its attributes,
 * but rather by a unique identifier that distinguishes it from other entities.
 * This class provides shared behaviors and properties for all entities.
 *
 * @template Id - The type of the unique identifier for the entity.
 */
export abstract class Entity<Id extends Identifier<ValueType<Id>>> {
	/**
	 * Creates a new `Entity` instance.
	 *
	 * @param id - The unique identifier for the entity.
	 * @param createdAt - The date and time when the entity was created.
	 * @param updatedAt - The date and time when the entity was last updated.
	 * @param deletedAt - The date and time when the entity was deleted (if applicable).
	 */
	protected constructor(
		protected id: Id,
		protected createdAt: Date,
		protected updatedAt: Date,
		protected deletedAt?: Date,
	) {
		// Assert `as EntityConstructor<Id, typeof this>` is crucial here.
		// This'll inform Typescript that this method has expected static methods facotiry
		// However this only work at runtime, which means if you forget to implement this on
		// your concrete entity it will lead to runtime excepecion and may break your app
		// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
		const constructor = this.constructor as EntityConstructor<Id, typeof this>;

		if (typeof constructor.create !== "function") {
			throw new Error(
				`${this.constructor.name} must implement the static method create`,
			);
		}

		if (typeof constructor.from !== "function") {
			throw new Error(
				`${this.constructor.name} must implement the static method from`,
			);
		}
	}

	/**
	 * Retrieves the unique identifier of the entity.
	 *
	 * @returns The entity's unique identifier.
	 */
	public getId(): Id {
		return this.id;
	}

	/**
	 * Retrieves the creation timestamp of the entity.
	 *
	 * @returns A `Date` object representing when the entity was created.
	 */
	public getCreatedAt(): Date {
		return this.createdAt;
	}

	/**
	 * Retrieves the last update timestamp of the entity.
	 *
	 * @returns A `Date` object representing when the entity was last updated.
	 */
	public getUpdatedAt(): Date {
		return this.updatedAt;
	}

	/**
	 * Retrieves the deletion timestamp of the entity, if it has been deleted.
	 *
	 * @returns A `Date` object representing when the entity was deleted, or `undefined` if it hasn't been deleted.
	 */
	public getDeletedAt(): Date | undefined {
		return this.deletedAt;
	}

	/**
	 * Compares the current entity with another entity to determine if they are equal.
	 *
	 * Equality is determined by comparing all properties of both entities,
	 * including nested entities, identifiers, and value objects.
	 *
	 * @param entity - The entity to compare against.
	 * @returns `true` if the entities are equal; otherwise, `false`.
	 */
	public isEquals(entity: this): boolean {
		if (!(entity instanceof Entity)) return false;

		const thisKeys = Object.keys(this);
		const otherKeys = Object.keys(entity);

		// Compare the number of properties
		if (thisKeys.length !== otherKeys.length) return false;

		// Compare each property
		return thisKeys.every((key) => {
			const thisValue = this[key as keyof this];
			const otherValue = entity[key as keyof this];

			// Check if both values are entities and compare recursively
			if (thisValue instanceof Entity && otherValue instanceof Entity) {
				return thisValue.isEquals(otherValue);
			}

			// Check if both values are identifiers and compare using their equality method
			if (thisValue instanceof Identifier && otherValue instanceof Identifier) {
				return thisValue.equals(otherValue);
			}

			// Check if both values are value objects and compare using their equality method
			if (
				thisValue instanceof ValueObject &&
				otherValue instanceof ValueObject
			) {
				return thisValue.equals(otherValue);
			}

			// Fallback to strict equality comparison
			return thisValue === otherValue;
		});
	}
}
