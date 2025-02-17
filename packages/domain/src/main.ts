import { Err, None, Ok, Option, Result, Some } from "@ddd/core";

// Result Example
const success: Result<number, string> = Ok(42);
const failure: Result<number, string> = Err("Something went wrong");

console.log(success.isOk()); // true
console.log(success.unwrap()); // 42
console.log(success.map((x) => x * 2).unwrap()); // 84

console.log(failure.isErr()); // true
console.log(failure.mapErr((err) => `Error: ${err}`).unwrapErr()); // "Error: Something went wrong"

// Option Example
const someValue: Option<number> = Some(10);
const noValue: Option<number> = None();

console.log(someValue.isSome()); // true
console.log(someValue.unwrap()); // 10
console.log(someValue.map((x) => x + 5).unwrap()); // 15

console.log(noValue.isNone()); // true
console.log(noValue.unwrapOr(100)); // 100
