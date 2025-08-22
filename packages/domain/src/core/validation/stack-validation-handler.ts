import { DomainException } from "../exception/domain.exception";
import { Validation, ValidationHandler } from "./validaton-handler";

export class StackValidationHandler implements ValidationHandler {
	private errors: Error[];

	private constructor(errors: Error[]) {
		this.errors = errors;
	}

	public static create(): StackValidationHandler {
		return new StackValidationHandler([]);
	}

	public static createFromError(anError: Error): StackValidationHandler {
		return StackValidationHandler.create().append(anError);
	}

	public append(arg: Error | ValidationHandler): StackValidationHandler {
		if (this.isError(arg)) {
			this.errors.push(arg);
		} else {
			this.errors.push(...arg.getErrors());
		}
		return this;
	}

	public validate(validation: Validation): StackValidationHandler {
		try {
			validation.validate();
		} catch (ex) {
			if (this.isDomainException(ex)) {
				this.errors.push(ex);
			} else {
				//If excpetion is not a Throwable or DomainException, we can log it, or throw an error.
				console.error("Unknown Exception type caught during validation: ", ex);
			}
		}
		return this;
	}

	public hasErrors(): boolean {
		return this.errors.length > 0;
	}

	public getErrors(): Error[] {
		return this.errors;
	}

	private isError(arg: any): arg is Error {
		return typeof arg === "object" && arg !== null && "message" in arg;
	}

	private isDomainException(arg: any): arg is DomainException {
		// return typeof arg === "object" && arg !== null && "getErrors" in arg;
		return (
			arg instanceof DomainException ||
			(typeof arg === "object" && arg !== null && "getErrors" in arg)
		);
	}
}
