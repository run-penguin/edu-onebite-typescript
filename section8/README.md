# 목차

1. [타입 조작이란](#타입-조작이란)
2. [인덱스드 액세스 타입](#인덱스드-액세스-타입)
3. [keyof 연산자](#keyof-연산자)
4. [맵드 타입](#맵드-타입)

# 타입 조작이란

기본 타입이나 별칭, 인터페이스로 만든 타입들을 상황에 따라 다른 타입으로 변환하는 기능

- 제네릭
- 인덱스드 액세스 타입
- keyof 연산자
- Mapped(맵드) 타입
- 템플릿 리터럴 타입
- 조건부 타입

# 인덱스드 액세스 타입

인덱스를 이용해 다른 타입내의 특정 프로퍼티 타입을 추출하는 타입

### 객체 프로퍼티의 타입 추출하기

아래 코드에서 Post 타입의 "author" 프로퍼티의 타입이 수정되면, 매개변수의 타입도 매번 변경되어야 합니다.

```typescript
interface Post {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
  };
}

const post: Post = {
  title: "게시글 제목",
  content: "게시글 본문",
  author: {
    id: 1,
    name: "이정환",
  },
};

function printAuthorInfo(author: { id: number; name: string }) {
  console.log(`${author.id} - ${author.name}`);
}
```

이때 "인덱스드 액세스 타입"을 이용해 "author" 프로퍼티의 타입을 추출할 수 있습니다.

```typescript
function printAuthorInfo(author: Post["author"]) {
  console.log(`${author.id} - ${author.name}`);
}
```

대괄호 속에 들어가는 String Literal 타입인 "author"를 "인덱스"라고 합니다.
이 인덱스를 이용해 특정 타입에 접근한다고 하여 "인덱스드 액세스 타입"이라고 합니다.

> 인덱스에는 타입만 작성 가능합니다.

```typescript
const authorKey = "author";

// 오류 발생
function printAuthorInfo(author: Post[authorKey]) {
  console.log(`${author.id} - ${author.name}`);
}
```

> 인덱스에 존재하지 않는 프로퍼티 이름을 사용하면 오류가 발생합니다.

> 인덱스를 중첩하여 사용할 수 있습니다.

```typescript
function printAuthorInfo(authorId: Post["author"]["id"]) {
  console.log(authorId);
}
```

### 배열 요소의 타입 추출하기

```typescript
type PostList = {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    age: number;
  };
}[];

const post: PostList[number] = {
  title: "게시글 제목",
  content: "게시글 본문",
  author: {
    id: 1,
    name: "이정환",
    age: 27,
  },
};
```

PostList[number]는 '인덱스드 액세스 타입'입니다.

PostList[0]과 같이 Number Literal 타입을 넣어도 됩니다.

### 튜플의 요소 타입 추출하기

```typescript
type Tup = [number, string, boolean];
type Tup0 = Tup[0];
type Tup1 = Tup[1];
type Tup2 = Tup[2];
// type Tup3 = Tup[3]; // 없는 타입은 오류
type TupNum = Tup[number]; // number | string | boolean
```

# keyof 연산자

객체 타입으로부터 프로퍼티의 모든 Key들을 String Literal Union 타입으로 추출하는 연산자

```typescript
interface Person {
  name: string;
  age: number;
  location: string; // 추가
}

function getPropertyKey(person: Person, key: "name" | "age" | "location") {
  return person[key];
}

const person: Person = {
  name: "이정환",
  age: 27,
};
```

Person의 프로퍼티가 변경되면 key에도 반영되어야 합니다.

이때 아래와 같이 keyof 연산자를 활용할 수 있습니다.

```typescript
function getPropertyKey(person: Person, key: keyof Person) {
  return person[key];
}
```

> 'keyof 연산자'는 오직 타입만 적용할 수 있습니다.

```typescript
// 오류 발생
function getPropertyKey(person: Person, key: keyof person) {
  return person[key];
}
```

### typeof

특정 값의 타입을 문자열로 반환하는 연산자로, 타입을 정의할 때 사용하면 특정 변수의 타입을 추론할 수 있습니다.

```typescript
const person2 = {
  name: "이정화",
  location: "부산",
};

type Person2 = typeof person2;
```

### keyof + typeof

```typescript
function getPropertyKey2(person: Person, key: keyof typeof person2) {
  return person2[key];
}
```

# 맵드 타입

기존의 객체 타입을 기반으로 새로운 객체 타입을 만드는 기능

```typescript
interface User {
  id: number;
  name: string;
  age: number;
}

function fetchUser(): User {
  (...)
}

function updateUser(user: User) {
  // ... 유저 정보 수정 기능
}

updateUser({ // ❌
  age: 25
});
```

updateUser 함수의 매개변수가 User 타입이므로 수정된 특정 프로퍼티만 보내는 것이 허용되지 않습니다.

```typescript
interface User {
  id: number;
  name: string;
  age: number;
}

type PartialUser = {
  [key in "id" | "name" | "age"]?: User[key]; // 맵드 타입
  // [key in keyof User]?: User[key]; // 맵드 타입에 keyof 연산자 활용
};

// 프로퍼티 모두 boolean인 타입 만들기
type BooleanUser = {
  [key in "id" | "name" | "age"]: boolean;
};

// 모든 프로퍼티가 읽기 전용인 타입 만들기
type ReadonlyUser = {
  readonly [key in keyof User]: User[key];
};
```
