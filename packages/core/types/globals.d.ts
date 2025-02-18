import { Option } from "../src/option";
import { Result } from "../src/result";

declare global {
	function match<T, E, R>(
		matcher: Result<T, E> | Option<T>,
		cases: {
			Ok?: (value: T) => R;
			Err?: (error: E) => R;
			Some?: (value: T) => R;
			None?: () => R;
		},
	): R;
}

export {};
