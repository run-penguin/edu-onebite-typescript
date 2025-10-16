# 목차

1. [인터페이스](#인터페이스)

## 인터페이스

타입에 이름을 지어주는 문법 (타입 별칭과 문법만 조금 다를 뿐 기본적인 기능은 비슷)

```typescript
interface Person {
  readonly name: string;
  age: number;
}
```

타입 주석과 함께 변수의 타입 정의

```typescript
const person: Person = {
  name: "이정환",
  age: 27,
};
```

### 선택적 프로퍼티 적용 가능

```typescript
interface Person {
  name: string;
  age?: number;
}

const person: Person = {
  name: "이정환",
  // age: 27,
};
```

### 읽기 전용 프로퍼티 적용 가능

```typescript
interface Person {
  readonly name: string;
}

const person: Person = {
  name: "이정환",
};

person.name = "홍길동"; // X
```

### 메서드 타입 정의

함수 타입 표현식 사용

```typescript
interface Person {
  readonly name: string;
  age?: number;
  sayHi: () => void;
}
```

호출 시그니처 사용

```typescript
interface Person {
  readonly name: string;
  age?: number;
  sayHi(): void;
}
```

### 메서드 오버로딩

함수 타입 표현식으로 메서드 타입을 정의하면 메서드의 오버로딩 구현이 불가능함

```typescript
interface Person {
  readonly name: string;
  age?: number;
  sayHi: () => void;
  sayHi: (a: number, b: number) => void; // X
}
```

호출 시그니처를 통해 메서드 타입을 정의하면 오버로딩 구현이 가능함

```typescript
interface Person {
  readonly name: string;
  age?: number;
  sayHi(): void;
  sayHi(a: number): void;
  sayHi(a: number, b: number): void;
}
```

### 하이브리드 타입

```typescript
interface Func2 {
  (a: number): string;
  b: boolean;
}

const func: Func2 = (a) => "hello";
func.b = true;
```

### 주의할 점

타입 별칭에서는 Union이나 Intersection 타입을 정의할 수 있었지만, 인터페이스에서는 불가능

```typescript
type Type1 = number | string;
type Type2 = number & string;

interface Person {
  name: string;
  age: number;
} | number // X
```

인터페이스로 만든 타입을 Union이나 Intersection으로 이용해야 한다면, 타입 별칭과 함께 사용하거나 타입 주석에서 직접 사용해야 함

```typescript
type Type1 = number | string | Person;
type Type2 = number & string & Person;

const person: Person & string = {
  name: "이정환",
  age: 27,
};
```
