# Building Robust Applications with Clean Architecture and Domain-Driven Design Templates

This project provides a comprehensive template for building scalable and maintainable applications using
Clean Architecture and Domain-Driven Design (DDD) principles. It offers pre-built structures and utilities,
allowing developers to focus on business logic rather than boilerplate code.

## Key Features

- **Clean Architecture Structure:** Enforces a clear separation of concerns, making the application more testable and maintainable.
- **Domain-Driven Design Support:** Provides tools and patterns to model complex business domains effectively.
- **Core Utilities:** Includes robust implementations of fundamental functional programming concepts like `Result` and `Option`.
- **Modular Package Structure:** Organizes code into distinct packages (Core, Domain, Application) for better management and scalability.
- **TypeScript First:** Built with TypeScript, offering strong typing and excellent developer experience.

## Packages

The project is organized into modular packages, each serving a specific purpose:

- **Core:** Contains fundamental types, helper functions, and core concepts.
- **Domain:** Houses the domain models and business logic.
- **Application:** Implements the application layer, handling use cases and interactions with the domain.

## Core Package

The `core` package provides essential building blocks for your application, including:

### Result Type

The `Result<T, E>` type represents the outcome of an operation that may succeed or fail. It is a powerful way to handle errors without resorting to exceptions.

- `T`: The type of the successful value.
- `E`: The type of the error value (typically `Error`).

```typescript
import { Result, Ok, Err } from "@ddd/core"; // Optional import, Result, Ok, and Error are
                                            // globally available

function divide(a: number, b: number): Result<number, Error> {
  if (b === 0) {
    return Err(new Error("Cannot divide by zero"));
  }
  return Ok(a / b);
}

const result1 = divide(10, 2);
const result2 = divide(10, 0);

if (result1.isOk()) {
  console.log("Result:", result1.unwrap()); // Output: Result: 5
}

if (result2.isErr()) {
  console.error("Error:", result2.unwrapErr().message); // Output: Error: Cannot divide by zero
}
```

For the early stage of development there is a Option to import `Result` and create a
custom implementation without the need to specify the Error property on return type, e.g.:

```typescript
import { Result as ResultType } from "@/result"; // Or import from "@ddd/core" outside of
                                                // core package

type Result<T> = ResultType<Ok<T>, Err<Error>>;

describe("Custom Result test suite", () => {
 it("should create an Ok result using a custom result type with only success type definition and access its value", () => {
  const result: Result<number> = Ok(42);

  expect(result.isOk()).toBe(true);
  expect(result.isErr()).toBe(false);
  expect(result.unwrap()).toBe(42);
 });

 it("should create an Err result using a custom result type with any type", () => {
  const result: Result<any> = Err("Error occurred");
  // The line below will lead to a compilation error:
  // const result: Result<never> = "Error occurred";

  expect(result.isErr()).toBe(true);
  expect(result.isOk()).toBe(false);
  expect(result.unwrapErr()).toBeInstanceOf(Error);
  expect(result.unwrapErr().message).toBe("Error occurred");
 });

});


```

### Option Type

The `Option<T>` type represents an optional value that may or may not exist. It helps avoid null or undefined errors.

`T`: The type of the optional value.

```TypeScript

import { Option, Some, None } from "@ddd/core"; // Some and None are globally available

function findUser(id: number): Option<string> {
  if (id === 123) {
    return Some("John Doe");
  }
  return None();
}

const user1 = findUser(123);
const user2 = findUser(456);

if (user1.isSome()) {
  console.log("User:", user1.unwrap()); // Output: User: John Doe
}

if (user2.isNone()) {
  console.log("User not found"); // Output: User not found
}
```

### Helper Functions

- `Ok(value: T): Result<T, never>`: Creates a successful Result with the given value.
- `Err(error: E): Result<never, E>`: Creates a failed Result with the given error.
- `Some(value: T): Option<T>`: Creates an Option with a value.
- `None(): Option<never>`: Creates an empty Option.

### Match Function

The match function allows for pattern matching on Result and Option types, providing a concise way to handle different cases.

```TypeScript

import { match, Result, Ok, Err, Option, Some, None } from './core';

const result: Result<string, Error> = Ok("Success");

const optionResult: Option<string> = match(result, {
  Ok: (value) => Some(value),
  Err: (_) => None(),
});

match(optionResult, {
    Some: (value) => console.log("Matched Some: " + value),
    None: () => console.log("Matched None")
});
```

## Work in Progress (WIP) - Result Type

The `Result<T, E>` type is heavily inspired by Rust's `Result` and aims to provide a
robust way to handle success and failure scenarios in TypeScript.

### Current Implementation

The `Result` type currently implements the following methods:

- [x] `isOk()`: Checks if the result is `Ok`.
- [x] `isErr()`: Checks if the result is `Err`.
- [x] `unwrap()`: Extracts the successful value or throws an error.
- [x] `unwrapErr()`: Extracts the error value.
- [x] `map(fn)`: Maps a successful value using a function.
- [x] `flatMap(fn)`: Applies a function that returns a `Result`.
- [x] `mapErr(fn)`: Maps an error value using a function.

### Methods to be Developed

The following methods are planned for future development:

- [ ] `expect(message)`: Extracts the successful value or throws an error with a custom message.
- [ ] `ok()`: Converts `Result<T, E>` into `Option<T>`.
- [ ] `err()`: Converts `Result<T, E>` into `Option<E>`.
- [ ] `and(res)`: Returns `Err` if `self` is `Err`, otherwise returns `res`.
- [ ] `andThen(fn)`: Calls `fn` if the result is `Ok`, otherwise returns `Err`.
- [ ] `or(res)`: Returns `Ok` if `self` is `Ok`, otherwise returns `res`.
- [ ] `orElse(fn)`: Calls `fn` if the result is `Err`, otherwise returns `Ok`.
- [ ] `unwrapOr(defaultValue)`: Extracts the successful value or returns a default value.
- [ ] `unwrapOrElse(fn)`: Extracts the successful value or calls a function to get a default value.
- [ ] `transpose()`: Transposes a `Result<Option<T>, E>` into an `Option<Result<T, E>>`.
- [ ] `flatten()`: Flattens a nested `Result<Result<T, E>, E>` into a `Result<T, E>`.

We welcome contributions to help implement these methods and improve the `Result` type!

## Work in Progress (WIP) - Option Type

The `Option<T>` type is heavily inspired by Rust's `Option` and aims to provide a robust way to handle optional values in TypeScript,
avoiding `null` and `undefined` issues.

### Current Implementation

The `Option` type currently implements the following methods:

- [x] `isSome()`: Checks if the option is `Some`.
- [x] `isNone()`: Checks if the option is `None`.
- [x] `unwrap()`: Extracts the value or throws an error if `None`.
- [x] `map(fn)`: Maps a `Some` value using a function.
- [x] `flatMap(fn)`: Applies a function that returns an `Option`.
- [x] `unwrapOr(defaultValue)`: Extracts the value or returns a default value.

### Methods to be Developed

The following methods are planned for future development:

- [ ] `expect(message)`: Extracts the value or throws an error with a custom message if `None`.
- [ ] `okOr(err)`: Converts `Option<T>` into `Result<T, E>`.
- [ ] `okOrElse(errFn)`: Converts `Option<T>` into `Result<T, E>` using a function to create the error.
- [ ] `and(optb)`: Returns `None` if `self` is `None`, otherwise returns `optb`.
- [ ] `andThen(fn)`: Calls `fn` if the option is `Some`, otherwise returns `None`.
- [ ] `or(optb)`: Returns `self` if `Some`, otherwise returns `optb`.
- [ ] `orElse(fn)`: Returns `self` if `Some`, otherwise calls `fn` to get an `Option`.
- [ ] `unwrapOrElse(fn)`: Extracts the value or calls a function to get a default value.
- [ ] `filter(predicate)`: Returns `Some` if the value matches the predicate, otherwise `None`.
- [ ] `zip(other)`: Zips two `Option` values into a tuple if both are `Some`.
- [ ] `zipWith(other, fn)`: Zips two `Option` values using a function if both are `Some`.
- [ ] `transpose()`: Transposes an `Option<Result<T, E>>` into a `Result<Option<T>, E>`.

We welcome contributions to help implement these methods and improve the `Option` type!
