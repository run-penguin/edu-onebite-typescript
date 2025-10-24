# 목차

1. [조건부 타입](#조건부-타입)
2. [분산적인 조건부 타입](#분산적인-조건부-타입)

# 조건부 타입

extends + 삼항 연산자를 이용해 조건에 따라 다른 타입을 정의하도록 돕는 문법

```typescript
type A = number extends string ? number : string;
```

```typescript
type ObjA = {
  a: number;
};

type ObjB = {
  a: number;
  b: number;
};

type B = ObjB extends ObjA ? number : string;
```

objA는 슈퍼타입, objB는 서브타입이므로 true가 반환되어 number가 됩니다.

### 제네릭 조건부 타입

```typescript
type StringNumberSwitch<T> = T extends number ? string : number;

let varA: StringNumberSwitch<number>;
// string

let varB: StringNumberSwitch<string>;
// number
```

```typescript
function removeSpaces<T>(text: T): T extends string ? string : undefined {
  if (typeof text === "string") {
    return text.replaceAll(" ", ""); // ❌
  } else {
    return undefined; // ❌
  }
}

let result = removeSpaces("hi im winterlood");
// string

let result2 = removeSpaces(undefined);
// undefined
```

조건부 타입의 결과를 함수 내부에서 알 수 없기 때문에 오류가 발생합니다.

함수 오버로딩을 통해 해결할 수 있습니다.

```typescript
function removeSpaces<T>(text: T): T extends string ? string : undefined;
function removeSpaces(text: any) {
  if (typeof text === "string") {
    return text.replaceAll(" ", "");
  } else {
    return undefined;
  }
}

let result = removeSpaces("hi im winterlood");
// string

let result2 = removeSpaces(undefined);
// undefined
```

# 분산적인 조건부 타입

조건부 타입의 타입 변수에 Union 타입을 할당하면 '분산적인 조건부 타입'이 됩니다.

분산적인 조건부 타입은 다음과 같이 동작합니다.

1. 타입 변수에 할당한 Union 타입 내부의 모든 타입이 분리됩니다.
2. 분산된 각 타입의 결과를 모아 다시 Union 타입으로 묶습니다.

```typescript
type StringNumberSwitch<T> = T extends number ? string : number;

let c: StringNumberSwitch<number | string>;
// string | number
```

### Exclude (제외하다)

특정 타입만 제거

```typescript
type Exclude<T, U> = T extends U ? never : T;

type A = Exclude<number | string | boolean, string>;
```

### Extract (뽑아내다)

특정 타입만 추출

```typescript
type Extract<T, U> = T extends U ? T : never;

type B = Extract<number | string | boolean, string>;
```

# infer

조건부 타입 내에서 특정 타입을 추론하는 문법입니다.

```typescript
type ReturnType<T> = T extends () => infer R ? R : never;

type FuncA = () => string;

type FuncB = () => number;

type A = ReturnType<FuncA>;
// string

type B = ReturnType<FuncB>;
// number
```

infer R은 조건식이 참이 되도록 만들 수 있는 최적의 R 타입을 추론하라는 의미입니다.

```typescript
type ReturnType<T> = T extends () => infer R ? R : never;

type FuncA = () => string;

type FuncB = () => number;

type A = ReturnType<FuncA>;
// string

type B = ReturnType<FuncB>;
// number

type C = ReturnType<number>;
// 조건식을 만족하는 R추론 불가능
// never
```

추론이 불가능하다면 조건식을 false로 판단합니다.

> Promise의 resolve 타입을 infer를 이용해 추출하는 예시

```typescript
type PromiseUnpack<T> = T extends Promise<infer R> ? R : never;
// 1. T는 프로미스 타입이어야 한다.
// 2. 프로미스 타입의 결과값 타입을 반환해야 한다.

type PromiseA = PromiseUnpack<Promise<number>>;
// number

type PromiseB = PromiseUnpack<Promise<string>>;
// string
```
