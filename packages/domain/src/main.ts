import { Err, None, Ok, type Option, type Result, Some } from "@ddd/core";
import { Entity } from "./core/entity";
import { Uuid } from "./core/Uuid";

// Result Example
const success: Result<number, Error> = Ok(42);
const failure: Result<number, Error> = Err("Something went wrong");

console.log(success.isOk()); // true
console.log(success.unwrap()); // 42
console.log(success.map((x) => x * 2).unwrap()); // 84

console.log(failure.isErr()); // true
console.log(failure.mapErr((err) => new Error(`Error: ${err}`)).unwrapErr()); // "Error: Something went wrong"

// Option Example
const someValue: Option<number> = Some(10);
const noValue: Option<number> = None();

console.log(someValue.isSome()); // true
console.log(someValue.unwrap()); // 10
console.log(someValue.map((x) => x + 5).unwrap()); // 15

console.log(noValue.isNone()); // true
console.log(noValue.unwrapOr(100)); // 100

class TestEntity extends Entity<Uuid> {
	constructor() {
		super(Uuid.create().unwrap(), new Date(), new Date(), new Date());
	}
}

const testEntity = new TestEntity();
const isEqual = testEntity.isEquals(testEntity);
const id = testEntity.getId().getValue();
