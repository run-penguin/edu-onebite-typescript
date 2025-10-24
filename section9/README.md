# 목차

1. [조건부 타입](#조건부-타입)

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

## 제네릭 조건부 타입

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
