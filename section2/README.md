# 목차

1. [기본 타입](#기본-타입-basic-types)
2. [원시 타입](#원시-타입-primitive-type)
3. [리터럴 타입](#리터럴-타입)
4. [배열 타입](#배열-타입)
5. [튜플 타입](#튜플-타입)
6. [객체 타입](#객체-타입)
7. [타입 별칭](#타입-별칭-type-alias)
8. [인덱스 시그니처](#인덱스-시그니처-index-signature)
9. [열거형 타입](#열거형enum-타입)
10. [any 타입](#any-타입)
11. [unknown 타입](#unknown-타입)
12. [void 타입](#void-타입)
13. [never 타입](#never-타입)



## 기본 타입 (Basic Types)

타입스크립트가 자체적으로 제공하는 타입 (내장 타입)

![기본타입](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F49eaebca-f260-4d43-b59f-6d6e3d0174cb%2FUntitled.png?table=block&id=967f7334-5247-4be3-9cdc-99490ea2b833&cache=v2)




## 원시 타입 (Primitive Type)

동시에 한개의 값만 저장할 수 있는 타입

> 변수 이름 뒤에 콜론(:)과 함께 변수의 타입을 정의하는 문법을 '타입 주석' 또는 '타입 어노테이션'이라고 함

### number
```typescript
let num1: number = 123;
let num2: number = -123;
let num3: number = 0.123;
let num4: number = -0.123;
let num5: number = Infinity;
let num6: number = -Infinity;
let num7: number = NaN;
```

### string
```typescript
let str1: string = "hello";
let str2: string = "hello";
let str3: string = `hello`;
let str4: string = `hello ${num1}`;
```

### boolean
```typescript
let bool1: boolean = true;
let bool2: boolean = false;
```

### null
```typescript
let null1: null = null;
```

### undefined
```typescript
let unde1: undefined = undefined;
```

### null 값을 다른 타입의 변수에 할당하기

아직 값이 정해지지 않은 상태에서 임시로 null을 넣고자 하는 경우 tsconfig.json의 아래 옵션을 변경

```json
{
    "compilerOptions": {
        "strictNullChecks": false
    },
}
```

- 기본 값 true
- true인 경우 엄격하게 null 값을 검사해 null 타입이 아닌 경우 할당할 수 없음
- strict 옵션의 하위 옵션으로 strict 옵션에따라 자동으로 설정되며, 직접 설정하면 설정된 옵션에 따름
- 안전한 타입스크립트 코드를 작성하는 측면에서는 도움이 되지 않음




## 리터럴 타입

하나의 값만 포함하는 타입

```typescript
let numA: 10 = 10;
let strA: "hello" = "hello";
let boolA: true = true;
```




## 배열 타입

- 배열요소타입[] 형식으로 정의
- Array<배열요소타입> 으로도 형식 정의 가능 (제네릭)

```typescript
let numArr: number[] = [1, 2, 3];
let strArr: string[] = ["hello", "im", "winterlood"];

let boolArr: Array<boolean> = [true, false, true];
```

### 다양한 타입 요소를 갖는 배열 타입 정의

소괄호와 바(|)를 이용해 정의 (유니온 타입)

```typescript
let multiArr: (string | number)[] = [1, "hello"];
```

### 다차원 배열 타입 정의

```typescript
let doubleArr: number[][] = [
  [1, 2, 3],
  [4, 5],
];
```




## 튜플 타입

- 타입스크립트의 특수한 타입
- 고정된 길이와 배열을 의미

```typescript
let tup1: [number, number] = [1, 2];
let tup2: [number, string, boolean] = [1, "2", true];
```

***컴파일 시 자바스크립트 배열로 변환되므로 결국 튜플은 배열임***

***push나 pop을 이용해 고정된 길이를 무시하고 요소를 추가/삭제 가능하므로 주의 필요***




## 객체 타입

### 객체 타입 정의

#### * object로 정의

```typescript
let user: object = {
  id: 1,
  name: "이정환",
};
```

- 하지만 user.id처럼 객체의 특정 프로퍼티에 접근하려고 하면 오류가 발생함
- 타입스크립트의 object 타입은 객체인 것 외에 프로퍼티에 대한 정보는 가지고 있지 않음

#### * 리터럴 타입으로 정의

```typescript
let user: {
  id: number;
  name: string;
} = {
  id: 1,
  name: "이정환",
};
```

- 객체 리터럴 타입
- 프로퍼티에 접근 가능
- 기존의 정적 타입 시스템을 따르는 언어와 달리 프로퍼티를 기준으로 객체의 구조를 정의하여 '구조적 타입 시스템'으로 부름 (대부분의 타언어는 '명목적 타입 시스템')

### 특수한 프로퍼티 정의

#### * 선택적 프로퍼티 (Optional Property)

- 특정 프로퍼티가 있을수도 없을수도 있는 경우
- 프로퍼티의 이름 뒤에 ? 사용
- 선택적 프로퍼티가 존재한다면 value 타입은 명시한 것과 동일해야 함

```typescript
let user: {
  id?: number; // 선택적 프로퍼티가 된 id
  name: string;
} = {
  id: 1,
  name: "이정환",
};

user = {
  name: "홍길동",
};
```

#### * 읽기 전용 프로퍼티 (Readonly Property)

```typescript
let user: {
  id?: number;
  readonly name: string; // name은 이제 Readonly 프로퍼티가 되었음
} = {
  id: 1,
  name: "이정환",
};

user.name = "dskfd"; // 오류 발생
```




## 타입 별칭 (Type Alias)

'type 타입_이름 = 타입' 형태로 타입을 별도로 정의하여 사용할 수 있음

```typescript
type User = {
    id: number;
    name: string;
    nickname: string;
    birth: string;
    bio: string;
    location: string;
}
```

> 변수 선언과 마찬가지로 동일한 스코프에 동일한 이름의 타입 별칭을 선언할 수 없음




## 인덱스 시그니처 (Index Signature)

- 객체 타입을 유연하게 정의할 수 있도록 돕는 특수한 문법
- 아래는 key 타입이 string, value 타입이 string

```typescript
type CountryCodes = {
    [key: string]: string;
};
```

반드시 포함해야 하는 프로퍼티가 있다면 아래와 같이 명시

```typescript
type CountryCodes = {
    [key: string]: string;
    Korea: string;
};
```

> 인덱스 시그니처의 value 타입과 직접 추가한 프로퍼티의 value 타입이 호환(일치)해야 함




## 열거형(Enum) 타입

- 자바스크립트에는 존재하지 않고 타입스크립트에서만 사용할 수 있는 특별한 타입
- 열거형은 다음과 같이 여러개의 값을 나열하는 용도로 사용함

```typescript
enum Role {
    ADMIN,
    USER,
    GUEST,
}
```

- 각 멤버에는 숫자를 할당할 수 있으며, 할당하지 않은 경우 0부터 1씩 늘어나는 값으로 자동 할당됨

```typescript
enum Role {
    ADMIN = 0,
    USER = 1,
    GUEST = 2,
}
```

- 자동 할당되는 값의 시작 값을 변경하고 싶은 경우, 시작하는 위치에 직접 할당

```typescript
enum Role {
  ADMIN,      // 0 할당 (자동)
  USER = 10,  // 10 할당
  GUEST,      // 11 할당 (자동)
}
```

### 문자열 열거형

- 모든 멤버의 값이 문자열 값인 enum
- 오타 발생 방지

```typescript
enum Language {
    korean = "ko",
    english = "en",
}

const user1 = {
  name: "이정환",
  role: Role.ADMIN, // 0
  language: Language.korean,// "ko"
};
```

### enum은 컴파일 결과 객체로 변환

다른 타입들처럼 사라지지 않고 자바스크립트 객체로 변환됨



## any 타입

타입스크립트에서만 제공되며, 타입 검사를 받지 않는 특수한 타입

```typescript
let anyVar: any = 10;
anyVar = "hello";

anyVar = true;
anyVar = {};
anyVar = () => {};

anyVar.toUpperCase();
anyVar.toFixed();
anyVar.a;

let num: number = 10;
num = anyVar;
```

- 어떤 타입의 값도 범용적으로 담아 사용할 수 있고 호출 가능함
- 반대로 어떤 타입으로 정의된 변수던 할당할 수 있음

> 그러나 실제 실행해보면 런타임에서 오류가 발생함!! 정말 어쩔 수 없는 경우를 제외하고는 사용하지 않아야 함




## Unknown 타입

any 타입과 비슷하지만 보다 안전한 타입

```typescript
let unknownVar: unknown;

unknownVar = "";
unknownVar = 1;
unknownVar = () => {};
```

- 어떤 타입의 값도 담을 수 있음
- 어떤 타입의 변수에도 저장할 수 없음
- 어떤 연산에도 참여할 수 없으며, 어떤 메서드도 사용할 수 없음 (하지만 아래와 같이 타입을 보장한다면 가능)

```typescript
if (typeof unknownVar === "number") {
	// 이 조건이 참이된다면 unknownVar는 number 타입으로 볼 수 있음
  unknownVar * 2;
}
```



## void 타입

아무 값도 없음을 의미하는 타입

```typescript
function func2(): void {
    console.log("hello");
}
```

- 보통은 아무런 값도 반환하지 않는 함수의 반환값 타입을 정의할 때 사용
- 변수의 타입으로도 지정할 수 있으나, void 타입의 변수에는 undefined 외에는 담을 수 없음
- tsconfig.json에 strictNullChecks = false로 지정 시에는 null 값을 담을 수 있음

- 타입스크립트 5.1 버전 이전에는 아래와 같이 함수에서 아무것도 반환하지 않을 때 undefined를 명시하면 오류가 발생했으나 현재는 정상 동작함
```typescript
function foo(): undefined {
  // no returns
}
```



## never 타입

- 불가능을 의미하는 타입
- 어떤 값도 반환할 수 없는 상황일 때, 해당 함수의 반환값 타입으로 사용
- 변수의 타입을 never로 정의하면 any를 포함해 어떤 값도 담을 수 없음

```typescript
function func3(): never {
    while (true) {}
}
```
이 함수는 영원히 종료될 수 없기 때문에 뭔가를 반환한다는 것 자체가 '불가능'함

```typescript
function func4(): never {
    throw new Error();
}
```
의도적으로 오류를 발생시키는 함수도 가능