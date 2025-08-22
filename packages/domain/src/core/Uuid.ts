import { randomUUID } from "node:crypto";
import { Identifier } from "./identifier";
import { ValidationHandler } from "./validation/validaton-handler";
import { UuidValidator } from "./uuid.validator";
import { Result } from "@ddd/core";
import { DomainException } from "./exception/domain.exception";

export class Uuid extends Identifier<string> implements Identifier<string> {
	// Value for now is string, but probably will be changed to Uuid 128-bit representation
	private constructor(value: string) {
		super(value);
	}
	static create(): Result<Uuid, DomainException> {
		// Need to replace uuid genaration to support v7 implementation, v4 could lead to
		// performance issues due to not be sortable.
		return Ok(new Uuid(randomUUID().toString()));
	}

	static from(uuid: string): Result<Uuid, DomainException> {
		// TODO: Add uuid validation to create new instance based on string received value
		// simple regex validation
		const uuidRegex =
			/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

		if (!uuidRegex.test(uuid)) {
			return Err(new DomainException("Invalid UUID format"));
		}

		return Ok(new Uuid(uuid));
	}

	override getValue(): string {
		return this.value;
	}

	validate(validationHnadler: ValidationHandler): void {
		new UuidValidator(this, validationHnadler).validate();
	}

	equals(value: Uuid): boolean {
		return this.value === value.getValue();
	}

	toString(): string {
		return this.value;
	}
}
