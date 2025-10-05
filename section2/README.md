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