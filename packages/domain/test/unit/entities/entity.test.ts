// assertType<ValueType<Id>>(id.getValue());
// assertType<Id>(id);

import { Entity } from "@/core/entity";
import type { DomainException } from "@/core/exception/domain.exception";
import { Uuid } from "@/core/Uuid";
import type { Result } from "@ddd/core";

class TestEntity extends Entity<Uuid> {
	private constructor(
		id: Uuid,
		private someParam: string,
		createdAt: Date,
		updatedAt: Date,
		deletedAt?: Date,
	) {
		super(id, createdAt, updatedAt, deletedAt);
	}

	static create(someParam: string): Result<TestEntity, DomainException> {
		const uuidResult = Uuid.create();
		if (uuidResult.isErr()) return Err(uuidResult.unwrapErr());
		const uuid = uuidResult.unwrap();

		return Ok(
			new TestEntity(uuid, someParam, new Date(), new Date(), new Date()),
		);
	}

	static from(
		id: string,
		someParam: string,
		createdAt: Date,
		updatedAt: Date,
		deletedAt?: Date,
	): Result<TestEntity, DomainException> {
		const uuidResult = Uuid.from(id);
		if (uuidResult.isErr()) return Err(uuidResult.unwrapErr());
		const uuid = uuidResult.unwrap();
		return Ok(new TestEntity(uuid, someParam, createdAt, updatedAt, deletedAt));
	}

	getSomeParam(): string {
		return this.someParam;
	}
}

describe("Entity Test Suite", () => {
	it("It should create a new entity", () => {
		const entityResult = TestEntity.create("some value");

		const sut = match(entityResult, {
			Ok: (value) => value,
			Err: (error) => {
				throw error;
			},
		});

		assertType<Entity<Uuid>>(sut);
		assertType<Uuid>(sut.getId());

		expect(sut.getSomeParam()).toBe("some value");
		expect(entityResult.isOk()).toBe(true);
	});

	it("should returns false when creating new entities with same data", () => {
		const entity1 = TestEntity.create("some value").unwrap();
		const entity2 = TestEntity.create("some value").unwrap();

		const isEqual = entity1.isEquals(entity2);

		expect(isEqual).toBe(false);
	});

	it("should returns true when restoring entities with same data", () => {
		const createdAt = new Date();
		const updatedAt = new Date();
		const entity1 = TestEntity.from(
			"f7d5e7b4-4b4a-4b4a-4b4a-4b4a4b4a4b4a",
			"some value",
			createdAt,
			updatedAt,
		).unwrap();
		const entity2 = TestEntity.from(
			"f7d5e7b4-4b4a-4b4a-4b4a-4b4a4b4a4b4a",
			"some value",
			createdAt,
			updatedAt,
		).unwrap();

		const isEqual = entity1.isEquals(entity2);

		expect(isEqual).toBe(true);
	});
});
