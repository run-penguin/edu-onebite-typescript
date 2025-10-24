/**
 * 분산적인 조건부 타입
 */

type StringNumberSwitch<T> = T extends number ? string : number;

let a: StringNumberSwitch<number>;
let b: StringNumberSwitch<string>;

// number|string 타입이 슈퍼 타입, number가 서브 타입이므로 extends number?는 거짓이됨
// union 타입을 사용하면 일반적인 조건부 타입 X, 분산적인 조건부 타입 O
let c: StringNumberSwitch<number | string>;
// => number, string 각각 분리되어 T에 할당됨
// StringNumberSwitch<number> => string
// StringNumberSwitch<string> => number
// => string | number 로 합쳐짐

let d: StringNumberSwitch<boolean | number | string>;
// StringNumberSwitch<boolean> => number
// StringNumberSwitch<number> => string
// StringNumberSwitch<string> => number
// => number | string

/**
 * 실용적인 예제
 */

type Exclude<T, U> = T extends U ? never : T;

// t = number, u = string
// Exclude<number, string> => T (=number)

type A = Exclude<number | string | boolean, string>;
// Exclude<number, string> => T (=number)
// Exclude<string, string> => never
// Exclude<boolean, string> => T (=boolean)

// number | never | boolean => never는 공집합이므로 공집합+집합 = 집합 이므로 없는걸로 침

// 결과 : number | boolean (never를 이용해 특정 타입을 제거할 수 있다!)

type Extract<T, U> = T extends U ? T : never;

type B = Extract<number | string | boolean, string>;

// Extract<number, string> => never
// Extract<string, string> => string
// Extract<boolean, string> => never

// string (never를 이용해 특정 타입만 뽑아낼 수 있다!)
