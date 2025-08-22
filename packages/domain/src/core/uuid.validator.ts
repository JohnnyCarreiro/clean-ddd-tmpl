import { DomainException } from "./exception/domain.exception";
import { Uuid } from "./Uuid";
import { ValidationHandler } from "./validation/validaton-handler";
import { Validator } from "./validation/validator";

export class UuidValidator extends Validator {
	constructor(
		private uuid: Uuid,
		protected readonly handler: ValidationHandler,
	) {
		super(uuid, handler);
	}
	validate(): void {
		if (!this.isValidUUID(this.uuid.getValue())) {
			this.handler.append(new DomainException("Invalid UUID format"));
		}
	}

	private isValidUUID(uuid: string): boolean {
		// Basic UUID validation regex.
		const uuidRegex =
			/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
		return uuidRegex.test(uuid);
	}
}
