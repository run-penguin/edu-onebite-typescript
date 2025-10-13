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
