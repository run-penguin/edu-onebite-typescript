# 목차

1. [제네릭 소개](#제네릭-소개)
2. [타입 변수 응용](#타입-변수-응용)

# 제네릭 소개

함수나 인터페이스, 타입 별칭, 클래스 등을 다양한 타입과 함께 동작하도록 만들어주는 기능

### 제네릭이 필요한 상황

```typescript
function func(value: any) {
  return value;
}

let num = func(10);
// any 타입

let str = func("string");
// any 타입
```

매개변수의 타입 주석을 any 타입이나 unknown 타입으로 설정하면, return 타입 또한 동일한 타입으로 설정됨.

> 매개변수의 타입 주석을 any 타입으로 설정

    매개변수의 타입과 상관없이 모든 메서드 호출이 가능하여 오류를 감지하지 못하는 위험한 상태가 됨

> 매개변수의 타입 주석을 unknown 타입으로 설정

    매개변수의 타입에서 사용할 수 있는 메서드도 호출이 안됨 -> 타입 좁히기를 통해 해당 메서드를 사용할수는 있으나 비효율적

### 제네릭 함수

1. 함수 이름 뒤에 <타입변수>를 선언

```typescript
function func<T>(value: T): T {
  return value;
}

let num = func(10);
// number 타입
```

T에 어떤 타입이 할당될 지는 함수가 호출될 때 결정됨

함수 호출 -> 매개변수 value에 타입의 값이 저장되며 T의 타입이 추론됨 -> 반환값 또한 동일한 타입으로 설정

![제네릭함수1](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6442ef29-4a0e-4d95-9a68-4b697b80cb59%2FUntitled.png?table=block&id=33d9f7a5-484d-49a7-8c74-bc3ec9930f60&cache=v2)

2. 타입변수에 할당할 타입을 직접 명시

```typescript
function func<T>(value: T): T {
  return value;
}

let arr = func<[number, number, number]>([1, 2, 3]);
```

T에 [Number, Number, Number] 튜플 타입 할당 -> 매개변수 value와 반환값 타입이 모두 튜플 타입으로 설정

# 타입 변수 응용

### 사례 1

2개의 타입 변수가 필요한 경우

```typescript
function swap<T, U>(a: T, b: U) {
  return [b, a];
}

const [a, b] = swap("1", 2);
```

### 사례 2

다양한 배열 타입을 인수로 받는 제네릭 함수인 경우

```typescript
function returnFirstValue<T>(data: T[]) {
  return data[0];
}

let num = returnFirstValue([0, 1, 2]);
// number

let str = returnFirstValue([1, "hello", "mynameis"]);
// number | string
```

### 사례 3

반환값의 타입을 배열의 첫번째 요소의 타입이 되도록 하려는 경우

```typescript
function returnFirstValue<T>(data: [T, ...unknown[]]) {
  return data[0];
}

let str = returnFirstValue([1, "hello", "mynameis"]);
// number
```

### 사례 4

타입 변수를 제한하는 경우 (함수를 호출하고 인수로 전달할 수 있는 값의 범위에 제한)

```typescript
function getLength<T extends { length: number }>(data: T) {
  return data.length;
}

getLength("123"); // ✅

getLength([1, 2, 3]); // ✅

getLength({ length: 1 }); // ✅

getLength(undefined); // ❌

getLength(null); // ❌
```
