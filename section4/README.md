# 목차

1. [함수 타입](#함수-타입)

## 함수 타입

### 함수 타입 정의하기

```typescript
function func(a: number, b: number): number {
  return a + b;
}
```

함수의 반환값 타입은 자동으로 추론되기 때문에 아래와 같이 생략 가능

```typescript
function func(a: number, b: number) {
  return a + b;
}
```

#### 화살표 함수 타입 정의하기

```typescript
const add = (a: number, b: number): number => a + b;
```

```typescript
const add = (a: number, b: number) => a + b;
```

#### 매개변수 기본값 설정하기

함수의 매개변수에 기본값이 설정되어 있으면 타입이 자동으로 추론되어 생략 가능

```typescript
function introduce(name = "이정환") {
  console.log(`name : ${name}`);
}
```

#### 선택적 매개변수 설정하기

매개변수의 이름뒤에 ?를 붙이면 선택적 매개변수가 되어 생략 가능

```typescript
function introduce(name = "이정환", tall?: number) {
  console.log(`name : ${name}`);
  console.log(`tall : ${tall}`);
}

introduce("이정환", 156);

introduce("이정환");
```

tall => number | undefined로 추론되므로 number 타입의 값일 거라고 기대하고 사용하려면 타입 좁히기가 필요함

```typescript
function introduce(name = "이정환", tall?: number) {
  console.log(`name : ${name}`);
  if (typeof tall === "number") {
    console.log(`tall : ${tall + 10}`);
  }
}
```

> 선택적 매개변수는 필수 매개변수 앞에 올 수 없으므로, 반드시 뒤에 배치해야 함!

#### 나머지 매개변수 (rest parameter)

```typescript
function getSum(...rest: number[]) {
  let sum = 0;
  rest.forEach((it) => (sum += it));
  return sum;
}
```

튜플 타입도 가능

```typescript
function getSum(...rest: [number, number, number]) {
  let sum = 0;
  rest.forEach((it) => (sum += it));
  return sum;
}

getSum(1, 2, 3); // O
getSum(1, 2, 3, 4); // X
```

## 함수 타입 표현식

함수의 타입을 타입 별칭과 함께 별도로 정의

```typescript
type Add = (a: number, b: number) => number;

const add: Add = (a, b) => a + b;
```

아래와 같이 여러개의 함수가 동일한 타입을 갖는 경우 요긴하게 사용 가능

```typescript
type Operation = (a: number, b: number) => number;

const add: Operation = (a, b) => a + b;
const sub: Operation = (a, b) => a - b;
const multiply: Operation = (a, b) => a * b;
const divide: Operation = (a, b) => a / b;
```

타입 별칭 없이 함수 타입 표현식을 사용도 가능

```typescript
const add: (a: number, b: number) => number = (a, b) => a + b;
```

## 호출 시그니처 (Call Signature)

함수의 타입을 별도로 정의하는 방식

```typescript
type Operation2 = {
  (a: number, b: number): number;
  name: string;
};

const add2: Operation2 = (a, b) => a + b;
const sub2: Operation2 = (a, b) => a - b;
const multiply2: Operation2 = (a, b) => a * b;
const divide2: Operation2 = (a, b) => a / b;

add2(1, 2);
add2.name;
```

함수도 객체이므로 객체를 정의하듯 함수의 타입을 별도로 정의할 수 있으며, 프로퍼티를 추가하는 것 또한 가능함

## 함수 타입의 호환성

특정 함수 타입을 다른 함수 타입으로 취급해도 괜찮은지 판단하는 것

1. 두 함수의 반환값 타입이 호환되는가?
2. 두 함수의 매개변수 타입이 호환되는가?

### 기준1. 반환값 타입이 호환되는가?

```typescript
type A = () => number;
type B = () => 10;

let a: A = () => 10;
let b: B = () => 10;

a = b; // O
b = a; // X => number 타입을 number literal 타입으로 취급하려고 해서 안됨 (다운캐스팅)
```

### 기준2. 매개변수의 타입이 호환되는가?

#### 2-1. 매개변수의 개수가 같을 때

```typescript
type C = (value: number) => void;
type D = (value: 10) => void;

let c: C = (value) => {};
let d: D = (value) => {};

c = d; // X
d = c; // O
```

매개변수의 타입이 호환되는지 체크할 때, 오히려 업캐스팅은 안되고 다운캐스팅은 가능함.

이 특징은 아래와 같이 매개변수의 타입이 객체일 때 두드러짐.

```typescript
type Animal = {
  name: string;
};

type Dog = {
  name: string;
  color: string;
};

let animalFunc = (animal: Animal) => {
  console.log(animal.name);
};

let dogFunc = (dog: Dog) => {
  console.log(dog.name);
  console.log(dog.color);
};

animalFunc = dogFunc; // X
dogFunc = animalFunc; // O
```

프로퍼티가 더 많은 Dog 타입을 Animal 타입으로 취급하면, 함수 내에서 프로퍼티를 호출할 때 문제가 생김

```typescript
let testFunc = (animal: Animal) => {
  console.log(animal.name);
  console.log(animal.color); // 오류 발생
};
```

#### 2-2. 매개변수의 개수가 다를 때

```typescript
type Func1 = (a: number, b: number) => void;
type Func2 = (a: number) => void;

let func1: Func1 = (a, b) => {};
let func2: Func2 = (a) => {};

func1 = func2; // O
func2 = func1; // X
```
