import { Entity, ValueType } from "./entity";
import { Identifier } from "./identifier";

/**
 * Base class for all Aggregate Roots in the domain.
 *
 * An `AggregateRoot` is a special type of `Entity` that acts as the entry point
 * for accessing and managing the state of an aggregate. An aggregate is a cluster of
 * domain objects that are treated as a single unit for the purpose of data changes.
 *
 * This class extends the `Entity` class, inheriting its properties and behaviors while
 * marking the entity as an aggregate root.
 *
 * @template Id - The type of the unique identifier for the aggregate root.
 */
export abstract class AggregateRoot<
	Id extends Identifier<ValueType<Id>>,
> extends Entity<Id> {
	/**
	 * Creates a new `AggregateRoot` instance.
	 *
	 * @param id - The unique identifier for the aggregate root.
	 * @param createdAt - The date and time when the aggregate root was created.
	 * @param updatedAt - The date and time when the aggregate root was last updated.
	 * @param deletedAt - The date and time when the aggregate root was deleted (if applicable).
	 */
	protected constructor(
		protected id: Id,
		protected createdAt: Date,
		protected updatedAt: Date,
		protected deletedAt?: Date,
	) {
		super(id, createdAt, updatedAt, deletedAt);
	}
}
