# 기본 타입 (Basic Types)

타입스크립트가 자체적으로 제공하는 타입 (내장 타입)

![기본타입](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F49eaebca-f260-4d43-b59f-6d6e3d0174cb%2FUntitled.png?table=block&id=967f7334-5247-4be3-9cdc-99490ea2b833&cache=v2)

# 원시 타입 (Primitive Type)

동시에 한개의 값만 저장할 수 있는 타입

> 변수 이름 뒤에 콜론(:)과 함께 변수의 타입을 정의하는 문법을 '타입 주석' 또는 '타입 어노테이션'이라고 함

## number

```typescript
let num1: number = 123;
let num2: number = -123;
let num3: number = 0.123;
let num4: number = -0.123;
let num5: number = Infinity;
let num6: number = -Infinity;
let num7: number = NaN;
```

## string

```typescript
let str1: string = "hello";
let str2: string = "hello";
let str3: string = `hello`;
let str4: string = `hello ${num1}`;
```

## boolean

```typescript
let bool1: boolean = true;
let bool2: boolean = false;
```

## null

```typescript
let null1: null = null;
```

## undefined
```typescript
let unde1: undefined = undefined;
```

## null 값을 다른 타입의 변수에 할당하기

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

# 리터럴 타입

하나의 값만 포함하는 타입

```typescript
let numA: 10 = 10;
let strA: "hello" = "hello";
let boolA: true = true;
```

# 배열과 튜플

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


# 객체 타입

## 객체 타입 정의

### object로 정의

```typescript
let user: object = {
  id: 1,
  name: "이정환",
};
```

- 하지만 user.id처럼 객체의 특정 프로퍼티에 접근하려고 하면 오류가 발생함
- 타입스크립트의 object 타입은 객체인 것 외에 프로퍼티에 대한 정보는 가지고 있지 않음

### 리터럴 타입으로 정의

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
- 기존의 정적 타입 시스템을 따르는 언어와 달리 프로퍼티를 기존으로 객체의 구조를 정의하여 '구조적 타입 시스템'으로 부름

## 특수한 프로퍼티 정의

### 선택적 프로퍼티 (Optional Property)

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

### 읽기 전용 프로퍼티 (Readonly Property)

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