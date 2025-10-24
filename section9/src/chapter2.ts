/**
 * infer
 * inference -> 추론하다
 */

// 특정 타입만 추론

type FuncA = () => string;
type FuncB = () => number;

// type ReturnType<T> = T extends () => string ? string : never;
// type A = ReturnType<FuncA>; // string
// type B = ReturnType<FuncB>; // never
// => FuncA, FuncB에 맞는 return 값, 그 외에는 never가 나오길 바랬는데 string, never로 return 된다.

// infer를 사용하면 조건이 참이 되도록 타입을 추론한다.
// R = string
type ReturnType<T> = T extends () => infer R ? R : never;

type A = ReturnType<FuncA>; // string
type B = ReturnType<FuncB>; // number
type C = ReturnType<number>; // never
// () => infer R 이 number의 슈퍼타입이 될 수 없으므로 never가 반환된다.

/**
 * 예제
 */

// 1. T는 Promise 타입어야 한다.
// type PromiseUnpack<T> = T extends Promise<any> ? any : never;

// 2. 프로미스 타입의 결과값 타입을 반환해야 한다.
type PromiseUnpack<T> = T extends Promise<infer R> ? R : never;

type PromiseA = PromiseUnpack<Promise<number>>;
// number

type PromiseB = PromiseUnpack<Promise<string>>;
// string
