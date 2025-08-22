import { Entity } from "../entity";
import { ValueObject } from "../value-object";
import { ValidationHandler } from "./validaton-handler";

type ValueType<T> = T extends ValueObject<infer U> ? U : never;
type IdType<T> = T extends Entity<infer U> ? U : never;

/**
 * Base class for implementing domain validators.
 *
 * A `Validator` is responsible for encapsulating validation logic in the domain layer.
 * It works alongside a `ValidationHandler` to report validation errors and ensures
 * that entities or value objects conform to specific business rules.
 *
 * This class should be extended to implement specific validation logic for entities,
 * value objects, or aggregates in the domain.
 */
export abstract class Validator {
	/**
	 * Creates a new `Validator` instance.
	 *
	 * @param handler - An instance of `ValidationHandler` used to manage validation errors.
	 */
	protected constructor(
		protected readonly clazz: Entity<IdType<any>> | ValueObject<ValueType<any>>,
		protected readonly handler: ValidationHandler,
	) {}

	/**
	 * Abstract method to define validation logic.
	 *
	 * Subclasses must implement this method to perform specific validations.
	 * The validation logic should use the provided `ValidationHandler` to report errors.
	 */
	abstract validate(): void;

	/**
	 * Retrieves the `ValidationHandler` instance.
	 *
	 * This method provides access to the `ValidationHandler` used for managing
	 * validation errors during the validation process.
	 *
	 * @returns The `ValidationHandler` instance.
	 */
	protected validationHandler(): ValidationHandler {
		return this.handler;
	}
}
