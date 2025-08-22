import { DomainException } from "../exception/domain.exception"; // Adjust path as needed
import { Validation, ValidationHandler } from "./validaton-handler"; // Adjust path as needed

export class ThrowsValidationHandler implements ValidationHandler {
	public append(arg: Error | ValidationHandler): ValidationHandler {
		if (this.isError(arg)) {
			throw new DomainException(arg.message, arg);
		} else {
			throw new DomainException(arg.getErrors().join(","));
		}
	}

	public validate(aValidation: Validation): ValidationHandler {
		try {
			aValidation.validate();
		} catch (ex) {
			if (this.isDomainException(ex)) {
				throw ex;
			} else if (ex instanceof Error) {
				throw new DomainException(ex.message, ex);
			} else {
				throw new DomainException(String(ex));
			}
		}
		return this;
	}

	public hasErrors(): boolean {
		return false;
	}

	public getErrors(): Error[] {
		return [];
	}

	private isError(arg: any): arg is Error {
		return typeof arg === "object" && arg !== null && "message" in arg;
	}

	private isDomainException(arg: any): arg is DomainException {
		return typeof arg === "object" && arg !== null && "getErrors" in arg;
	}
}
