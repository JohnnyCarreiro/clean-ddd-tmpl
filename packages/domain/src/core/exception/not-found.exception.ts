import { DomainException } from "./domain.exception";

/**
 * Represents an exception indicating that a specific resource was not found.
 * Typically used to signal a missing entity or object in the Domain layer.
 */
export class NotFoundException extends DomainException {
	/**
	 * The name of the resource that was not found.
	 */
	private readonly resourceName: string;

	/**
	 * Creates a new NotFoundException instance.
	 *
	 * @param resourceName - The name of the resource that could not be located.
	 * @param cause - An optional underlying error that caused this exception.
	 */
	constructor(resourceName: string, cause?: Error) {
		super(`${resourceName} not found`, cause);
		Object.setPrototypeOf(this, NotFoundException.prototype);
		this.resourceName = resourceName;
	}

	/**
	 * Retrieves the name of the resource that was not found.
	 *
	 * @returns The name of the missing resource.
	 */
	getResourceName(): string {
		return this.resourceName;
	}
}
