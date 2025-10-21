# 목차

1. [제네릭 소개](#제네릭-소개)
2. [타입 변수 응용](#타입-변수-응용)
3. [map, forEach 메서드 타입 정의](#map-foreach-메서드-타입-정의)
4. [제네릭 인터페이스, 제네릭 타입 별칭](#제네릭-인터페이스-제네릭-타입-별칭)
5. [제네릭 클래스](#제네릭-클래스)
6. [프로미스와 제네릭](#프로미스와-제네릭)

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

# map, forEach 메서드 타입 정의

### map

1. 메서드를 적용할 배열을 매개변수 arr로 받고, 콜백 함수를 매개변수 callback으로 받는다.

```typescript
function map<T>(arr: T[], callback: (item: T) => T): T[] {}
```

2. 함수 내부를 구현한다.

```typescript
function map<T>(arr: T[], callback: (item: T) => T): T[] {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i]));
  }
  return result;
}
```

3. 함수를 호출한다.

```typescript
const arr = [1, 2, 3];

function map<T>(arr: T[], callback: (item: T) => T): T[] {
  (...)
}

map(arr, (it) => it * 2);
// number[] 타입의 배열을 반환
// 결과 : [2, 4, 6]

map(arr, (it) => it.toString()); // ❌
```

첫번째 인수로 arr을 전달 -> 타입 변수 T에 number 타입 할당 -> 콜백 함수의 반환값 타입도 number[]

따라서 toString()을 호출했을 때 오류가 발생한다.

다른 타입의 배열로도 변환할 수 있도록 아래와 같이 반환값 타입에 타입 변수를 추가한다.

```typescript
const arr = [1, 2, 3];

function map<T, U>(arr: T[], callback: (item: T) => U): U[] {
  (...)
}

map(arr, (it) => it.toString());
// string[] 타입의 배열을 반환
// 결과 : ["1", "2", "3"]
```

### forEach

```typescript
function forEach<T>(arr: T[], callback: (item: T) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}
```

# 제네릭 인터페이스, 제네릭 타입 별칭

### 제네릭 인터페이스

```typescript
interface KeyPair<K, V> {
  key: K;
  value: V;
}
```

```typescript
let keyPair: KeyPair<string, number> = {
  key: "key",
  value: 0,
};

let keyPair2: KeyPair<boolean, string[]> = {
  key: true,
  value: ["1"],
};
```

> 제네릭 인터페이스는 제네릭 함수와는 달리 변수의 타입으로 정의할 때, 반드시 꺽쇠와 함께 타입 변수에 할당할 타입을 명시해야 합니다.

> 제네릭 함수는 매개변수에 제공되는 값의 타입을 기준으로 타입 변수의 타입을 추론할 수 있지만, 인터페이스는 추론할 수 없기 때문입니다.

#### 인덱스 시그니처와 함께 사용하기

제네릭 인터페이스는 인덱스 시그니처와 함께 사용하면 훨씬 더 유연한 객체 타입을 정의할 수 있습니다.

```typescript
interface Map<V> {
  [key: string]: V;
}

let stringMap: Map<string> = {
  key: "value",
};

let booleanMap: Map<boolean> = {
  key: true,
};
```

### 제네릭 타입 별칭

```typescript
type Map2<V> = {
  [key: string]: V;
};

let stringMap2: Map2<string> = {
  key: "string",
};
```

### 제네릭 인터페이스 활용 예시

```typescript
interface Student {
  type: "student";
  school: string;
}

interface Developer {
  type: "developer";
  skill: string;
}

interface User {
  name: string;
  profile: Student | Developer;
}

function goToSchool(user: User<Student>) {
  if (user.profile.type !== "student") {
    console.log("잘 못 오셨습니다");
    return;
  }

  const school = user.profile.school;
  console.log(`${school}로 등교 완료`);
}

const developerUser: User = {
  name: "이정환",
  profile: {
    type: "developer",
    skill: "typescript",
  },
};

const studentUser: User = {
  name: "홍길동",
  profile: {
    type: "student",
    school: "가톨릭대학교",
  },
};
```

이때 제네릭 인터페이스를 이용하여 훨씬 간결하게 만들 수 있습니다.

```typescript
interface Student {
  type: "student";
  school: string;
}

interface Developer {
  type: "developer";
  skill: string;
}

interface User<T> {
  name: string;
  profile: T;
}

function goToSchool(user: User<Student>) {
  //   if (user.profile.type !== "student") {
  //     console.log("잘 못 오셨습니다");
  //     return;
  //   }

  const school = user.profile.school;
  console.log(`${school}로 등교 완료`);
}

// goToSchool(developerUser); // 호출 시 오류

const developerUser: User<Developer> = {
  name: "이정환",
  profile: {
    type: "developer",
    skill: "TypeScript",
  },
};

const studentUser: User<Student> = {
  name: "홍길동",
  profile: {
    type: "student",
    school: "가톨릭대학교",
  },
};
```

# 제네릭 클래스

아래와 같은 Number 타입의 리스트를 생성하는 클래스가 있습니다.

```typescript
class NumberList {
  constructor(private list: number[]) {}

  push(data: number) {
    this.list.push(data);
  }

  pop() {
    return this.list.pop();
  }

  print() {
    console.log(this.list);
  }
}

const numberList = new NumberList([1, 2, 3]);
```

그런데 String 타입의 리스트를 생성하는 클래스도 필요하다면, 거의 동일한 클래스를 새로 생성해야 합니다.

이때 제네릭 클래스로 변경하여 간결하게 작성할 수 있습니다.

```typescript
class List<T> {
  constructor(private list: T[]) {}

  push(data: T) {
    this.list.push(data);
  }

  pop() {
    return this.list.pop();
  }

  print() {
    console.log(this.list);
  }
}

const numberList = new List([1, 2, 3]);
const stringList = new List(["1", "2"]);
```

클래스 생성자를 통해 타입 변수의 타입을 추론할 수 있기 때문에 생성자에 인수로 전달하는 값이 있을 경우 타입 변수에 할당할 타입을 생략할 수 있습니다.

직접 설정하고 싶다면 아래와 같이 작성합니다.

```typescript
class List<T> {
  constructor(private list: T[]) {}

  (...)
}

const numberList = new List<number>([1, 2, 3]);
const stringList = new List<string>(["1", "2"]);
```

# 프로미스와 제네릭

Promise는 제네릭 클래스로 구현되어 있습니다. 따라서 새로운 Promise를 생성할 때 타입 변수에 할당할 타입을 직접 설정해주면 해당 타입이 resolve 결과값의 타입이 됩니다.

```typescript
const promise = new Promise<number>((resolve, reject) => {
  setTimeout(() => {
    // 결과값 : 20
    resolve(20);
  }, 3000);
});

promise.then((response) => {
  // response는 number 타입
  console.log(response);
});

promise.catch((error) => {
  if (typeof error === "string") {
    console.log(error);
  }
});
```

reject 함수에 인수로 전달하는 값의 타입은 unknown으로 따로 정의할 수 없습니다. catch 메서드에서 사용하려면 타입 좁히기를 통해 안전하게 사용해야 합니다.

어떤 함수가 Promise 객체를 반환한다면 다음과 같이 작성할 수 있습니다.

```typescript
function fetchPost() {
  return new Promise<Post>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        title: "게시글 제목",
        content: "게시글 본문",
      });
    }, 3000);
  });
}
```

다음과 같이 직관적으로 반환값 타입을 직접 명시해도 됩니다. (추천)

```typescript
function fetchPost(): Promise<Post> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        title: "게시글 제목",
        content: "게시글 본문",
      });
    }, 3000);
  });
}
```
