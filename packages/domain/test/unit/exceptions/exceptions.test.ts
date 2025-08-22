import { DomainException } from "@/core/exception/domain.exception";
import { Exception } from "@/core/exception/exception";
import { NotFoundException } from "@/core/exception/not-found.exception";

describe("Exception Classes", () => {
	it("should create a DomainException and preserve its prototype", () => {
		const domainException = new DomainException("Domain level error");

		expect(domainException).toBeInstanceOf(Exception);
		expect(domainException).toBeInstanceOf(DomainException);
		expect(domainException.message).toBe("Domain level error");
		expect(domainException.stack).toBeDefined();
	});

	it("should create a NotFoundException and set resourceName property", () => {
		const resourceName = "User";
		const notFoundException = new NotFoundException(resourceName);

		expect(notFoundException).toBeInstanceOf(Exception);
		expect(notFoundException).toBeInstanceOf(DomainException);
		expect(notFoundException).toBeInstanceOf(NotFoundException);
		expect(notFoundException.message).toBe(`${resourceName} not found`);
		expect(notFoundException.getResourceName()).toBe(resourceName);
		expect(notFoundException.stack).toBeDefined();
	});

	it("should create a NotFoundException with a cause and preserve it", () => {
		const cause = new Error("Underlying cause");
		const resourceName = "Order";
		const notFoundException = new NotFoundException(resourceName, cause);

		expect(notFoundException.cause).toBe(cause);
		expect(notFoundException.message).toBe(`${resourceName} not found`);
	});

	it("should verify the stack trace is preserved in all exceptions", () => {
		const domainException = new DomainException("Domain Error");
		const notFoundException = new NotFoundException("Resource");

		expect(domainException.stack).toBeDefined();
		expect(notFoundException.stack).toBeDefined();
	});
});
