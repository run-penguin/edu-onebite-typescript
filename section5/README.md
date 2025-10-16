# 목차

1. [인터페이스](#인터페이스)
2. [인터페이스 확장](#인터페이스-확장)
3. [선언 합침](#선언-합침)

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

## 인터페이스 확장

하나의 인터페이스를 다른 인터페이스들이 상속받아 중복된 프로퍼티를 정의하지 않도록 도와주는 문법

```typescript
interface Animal {
  name: string;
  color: string;
}

interface Dog extends Animal {
  breed: string;
}

interface Cat extends Animal {
  isScratch: boolean;
}

interface Chicken extends Animal {
  isFly: boolean;
}

const dog: Dog = {
  name: "돌돌이",
  color: "brown",
  breed: "진도",
};
```

### 프로퍼티 재정의

```typescript
interface Animal {
  name: string;
  color: string;
}

interface Dog extends Animal {
  name: "doldol"; // 타입 재 정의
  breed: string;
}
```

- Dog 타입은 Animal 타입을 확장하며 name 프로퍼티의 타입을 String -> String Literal 타입으로 재정의함
- 프로퍼티를 재정의할 때 extends 대상이 슈퍼타입이어야 함

```typescript
interface Animal {
  name: string;
  color: string;
}

interface Dog extends Animal {
  name: number; // X
  breed: string;
}
```

### 타입 별칭 확장

인터페이스는 인터페이스 뿐만 아니라 타입 별칭으로 정의된 객체로 확장할 수 있음

```typescript
type Animal = {
  name: string;
  color: string;
};

interface Dog extends Animal {
  breed: string;
}
```

### 다중 확장

여러 개의 인터페이스를 확장하는 것이 가능함

```typescript
interface DogCat extends Dog, Cat {}

const dogCat: DogCat = {
  name: "",
  color: "",
  breed: "",
  isScratch: true,
};
```

## 선언 합침

타입 별칭은 동일한 스코프 내에 중복된 이름으로 선언할 수 없는 반면 인터페이스는 가능함

```typescript
type Person = {
  name: string;
};

// type 별칭 => 중복 선언 X
type Person = {
  age: number;
};
```

```typescript
interface Person {
  name: string;
}

// interface => 중복 선언 O
interface Person {
  age: number;
}
```

인터페이스 선언은 결국 모두 하나로 합쳐짐 => 선언 합침 (Declaration Merging)

```typescript
// 위 코드에 선언한 인터페이스들은 아래와 같이 합쳐짐
interface Person {
  name: string;
  age: number;
}
```

### 주의점

동일한 이름의 프로퍼티를 다른 타입으로 정의한다면 오류 발생함

```typescript
interface Person {
  name: string;
}

interface Person {
  name: number; // X
  age: number;
}
```
