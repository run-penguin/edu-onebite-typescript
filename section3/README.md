# 목차

1. [타입은 집합이다](#타입은-집합이다)
2. [타입 호환성](#타입-호환성)
3. [타입 계층도](#타입-계층도)
4. [객체 타입의 호환성](#객체-타입의-호환성)
5. [대수 타입](#대수-타입algebraic-type)
6. [타입 추론](#타입-추론)
7. [타입 단언](#타입-단언)

## 타입은 집합이다

타입스크립트의 타입은 여러 개의 값을 포함하는 '집합'이며, '집합'은 동일한 속성을 갖는 여러개의 요소들을 하나의 그룹으로 묶은 단위이다.

1. Number 타입 -> 숫자 값들을 묶어놓은 집합
2. Number Literal 타입 -> 하나의 숫자 값만 포함하는 타입
3. Number Literal 타입은 Number 타입이라는 거대한 집합에 포함되는 부분 집합

- 타입스크립트의 모든 타입들은 집합으로써 서로 포함하고 포함되는 관계를 갖는다.
- Number 타입처럼 다른 타입을 포함하는 타입을 **_슈퍼 타입(부모 타입)_**이라고 하며, 반대로는 **_서브 타입(자식 타입)_**이라고 한다.

![부모타입_자식타입](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff474bc02-bad2-40d8-ae0f-21503e4ecdb9%2FUntitled.png?table=block&id=2fd0b889-a6a7-4064-82c2-f707e202638b&cache=v2)

## 타입 호환성

A, B 두개의 타입이 존재할 때 A 타입의 값을 B 타입으로 취급해도 괜찮은지 판단하는 것

![타입호환성](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fcad65769-77bb-4f9c-8ce2-4c426a02d5fb%2FUntitled.png?table=block&id=994a3752-bc88-46ab-8754-d56ca53d6a19&cache=v2)

![캐스팅](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F42382978-4468-424e-a3ea-95b6747653ca%2FUntitled.png?table=block&id=53270154-fdd5-45fd-ad96-579ec8f10c0a&cache=v2)

## 타입 계층도

### unknown 타입

- 타입 계층도의 최상단에 위치 = 모든 타입의 슈퍼타입
- 모든 타입의 슈퍼타입이므로, 모든 타입은 unknown 타입으로 업캐스트 할 수 있고, unknown 타입은 다운 캐스트 할 수 없음 (any만 제외)

```typescript
function unknownExam() {
  let a: unknown = 1;
  let b: unknown = "hello";
  let c: unknown = true;
  let d: unknown = null;
  let e: unknown = undefined;

  let unknownVar: unknown;

  // 오류 발생
  // let num: number = unknownVar;
  // let str: string = unknownVar;
  // let bool: boolean = unknownVar;
}
```

### never 타입

- 타입 계층도 최하단에 위치
- 공집합 타입
- 모든 계층의 서브타입이므로, never는 모든 타입으로 업캐스트 할 수 있고, 모든 타입은 never로 다운 캐스트 할 수 없음

```typescript
function neverExam() {
  function neverFunc(): never {
    while (true) {}
  }

  let num: number = neverFunc();
  let str: string = neverFunc();
  let bool: boolean = neverFunc();

  // 오류 발생
  // let never1: never = 10;
  // let never2: never = 'string';
  // let never3: never = true;
}
```

### void 타입

- void의 서브 타입은 undefined, never이므로 그 외에 다른 타입의 값을 할당할 수 없음

```typescript
function voidExam() {
  function voidFunc(): void {
    console.log("hi");
  }

  let voidVar: void = undefined;
}
```

### any 타입

- 사실상 타입 계층도를 무시함
- 모든 타입의 슈퍼 타입이 될 수도 있고, 서브 타입이 될 수도 있음
- 예외로 never에는 할당할 수는 없음!

## 객체 타입의 호환성

- 객체 타입간의 호환성도 슈퍼-서브 타입 관계를 가지며, 업캐스팅은 허용하고 다운캐스팅은 허용하지 않음

```typescript
type Animal = {
  name: string;
  color: string;
};

type Dog = {
  name: string;
  color: string;
  breed: string;
};

let animal: Animal = {
  name: "기린",
  color: "yellow",
};

let dog: Dog = {
  name: "돌돌이",
  color: "brown",
  breed: "진도",
};

animal = dog;
// dog = animal;
```

1. Animal 타입은 name, color 프로퍼티를 갖는 모든 객체들을 포함하는 집합
2. Dog 타입은 name, color, breed 프로터피를 갖는 모든 객체들을 포함하는 집합
   => 따라서 Dog 타입에 포함된다면 Animal 타입에 포함됨 (Animal = 슈퍼타입, Dog = 서브타입)

### 초과 프로퍼티 검사

- 변수를 객체 리터럴로 초기화할 때 발동하는 타입스크립트의 특수한 기능
- 타입에 정의된 프로퍼티 외의 추가 프로퍼티가 포함된 객체를 할당할 수 없음

```typescript
type Book = {
  name: string;
  price: number;
};

type ProgrammingBook = {
  name: string;
  price: number;
  skill: string;
};

let book2: Book = {
  name: "한 입 크기로 잘라먹는 리액트",
  price: 33000,
  // skill: "reactjs"
};
```

Book 타입으로 정의된 변수에 ProgrammingBook으로 보이는 초기값을 설정했으나 오류 발생 => '초과 프로퍼티 검사' 발동

> 변수 초기화 시 객체 리터럴을 사용하지 않으면 발생하지 않음! (함수의 매개변수에도 동일)

```typescript
let book3: Book = programmingBook;
```

```typescript
function func(book: Book) {}
func({
  name: "한 입 크기로 잘라먹는 리액트",
  price: 33000,
  // skill: "reactjs"
});
func(programmingBook);
```

## 대수 타입(Algebraic type)

여러개의 타입을 합성해서 만드는 타입

### 합집합 (Union) 타입

- 바(|)를 이용하여 정의할 수 있으며, 정의할 수 있는 타입의 개수 제한이 없음
- 정의된 타입에 포함되는 값을 할당 가능 (OR)

```typescript
let a: string | number | boolean;

let arr: (number | string | boolean)[] = [1, "hello", true];
```

```typescript
type Dog = {
  name: string;
  color: string;
};

type Person = {
  name: string;
  language: string;
};

type Union1 = Dog | Person;

let union1: Union1 = {
  name: "",
  color: "",
};

let union2: Union1 = {
  name: "",
  language: "",
};

let union3: Union1 = {
  name: "",
  color: "",
  language: "",
};
```

-> Dog 타입이거나 Person 타입이거나 둘 다 포함이거나 (O)

```typescript
let union4: Union1 = {
  name: "",
};
```

-> 이런 객체는 포함되지 않음 (X)

### 교집합 (Intersection) 타입

- &를 이용하여 정의
- 정의된 타입에 모두 포함되는 값을 할당 가능 (AND)

```typescript
let variable: number & string; // never 타입으로 추론
```

```typescript
type Dog = {
  name: string;
  color: string;
};

type Person = {
  name: string;
  language: string;
};

type Intersection = Dog & Person;

let intersection1: Intersection = {
  name: "",
  color: "",
  language: "",
};
```

## 타입 추론

- 타입스크립트는 타입이 정의되어 있지 않은 변수의 타입을 자동으로 추론
- 모든 변수에 일일이 타입을 정의하지 않아도 되는 편리함 제공

```typescript
let a = 10; // number 타입으로 추론
```

그러나 모든 상황에 추론이 되는 것은 아님

```typescript
function func(param) {} // 오류
```

- 위와 같이 타입 추론이 불가능한 변수(매개변수)에는 암시적으로 any 타입이 추론
- 엄격한 타입 검사 모드에서는 오류로 판단함

### 타입 추론이 가능한 상황

1. 변수 선언

```typescript
let a = 10;
let b = "hello";
let c = {
  id: 1,
  name: "이정환",
  profile: {
    nickname: "winterlood",
  },
  urls: ["https://winterlood.com"],
};
```

2. 구조 분해 할당

```typescript
let { id, name, profile } = c;

let [one, two, three] = [1, "hello", true];
```

3. 함수의 반환 값

```typescript
function func() {
  return "hello"; // return 문을 기준으로 추론
}
```

4. 기본 값이 설정된 매개변수

```typescript
function func(message = "hello") {
  return "hello";
}
```

### 주의해야 할 상황

1. 암시적 any 타입

변수를 선언할 때 초기값을 생략하면 암시적 any 타입으로 추론

```typescript
let d;
d = 10; // any -> number
d.toFixed();

d = "hello"; // number -> string
d.toUpperCase();
d.toFixed(); // 오류
```

코드의 흐름에 따라 타입이 계속 변화 (=any의 진화)

> 명시적으로 any 타입을 할당했을 때는 toFixed(), toUpperCase() 등 각 타입에서만 사용할 수 있는 메서드 호출이 모두 가능하지만, 암시적 any 타입일 때는 해당 타입으로 진화하여 불가능해진다.

2. const 상수의 추론

상수는 초기화 때 설정한 값을 변경할 수 없기 때문에 가장 좁은 타입으로 추론

```typescript
const num = 10; // 10 Number Literal 타입으로 추론
const str = "hello"; // "hello" String Literal 타입으로 추론
```

### 최적 공통 타입

다양한 타입의 요소를 담은 배열을 변수의 초기값으로 설정하면, 최적의 공통 타입으로 추론됨

```typescript
let arr = [1, "string"]; // (string | number)[] 타입으로 추론
```

## 타입 단언

'값 as 타입'으로 특정 값을 원하는 타입으로 단언

```typescript
type Person = {
  name: string;
  age: number;
};

let person: Person = {};
person.name = "";
person.age = 23;
```

-> 초기화 할 때 빈 객체를 넣는 경우 에러 발생함. 이때 아래와 같이 단언할 수 있음.

```typescript
type Person = {
  name: string;
  age: number;
};

let person = {} as Person;
person.name = "이정환";
person.age = 27;
```

아래는 breed라는 초과 프로퍼티가 존재하지만 Dog 타입으로 단언하여 초과 프로퍼티 검사를 피할 수 있음

```typescript
type Dog = {
  name: string;
  color: string;
};

let dog = {
  name: "돌돌이",
  color: "brown",
  breed: "진도",
} as Dog;
```

### 타입 단언의 조건

'값 as 타입' 형식의 단언식을 A as B로 표현했을 때 아래의 두 가지 조건 중 한가지를 만족해야 함

1. A가 B의 슈퍼 타입이다
2. A가 B의 서브 타입이다

```typescript
let num1 = 10 as never; // O
let num2 = 10 as unknown; // O

let num3 = 10 as string; // X
```

### 다중 단언

- 다중 단언을 사용하면 불가능했던 단언을 가능하도록 만들어줄 수도 있음
- 매우 좋지 않은 방식!!

```typescript
let num3 = 10 as unknown as string;
```

### const 단언

특정 값을 const 타입으로 단언하면 변수를 const로 선언한 것과 비슷하게 타입이 변경됨

```typescript
let num4 = 10 as const; // 10 Number Literal 타입으로 단언

let cat = {
  name: "야옹이",
  color: "yellow",
} as const; // 모든 프로퍼티가 readonly를 갖도록 단언
```

### Non Null 단언

값 뒤에 !를 붙여주면 이 값이 undefined이거나 null이 아닐것으로 단언 가능

```typescript
type Post = {
  title: string;
  author?: string; // 필수 속성 아님
};

let post: Post = {
  title: "게시글1",
};

const len: number = post.author!.length; // author가 비어있지 않다고 단언
```
