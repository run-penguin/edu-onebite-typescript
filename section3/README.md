
# 타입은 집합이다


타입스크립트의 타입은 여러 개의 값을 포함하는 '집합'이며, '집합'은 동일한 속성을 갖는 여러개의 요소들을 하나의 그룹으로 묶은 단위이다.


1. Number 타입 -> 숫자 값들을 묶어놓은 집합
2. Number Literal 타입 -> 하나의 숫자 값만 포함하는 타입
3. Number Literal 타입은 Number 타입이라는 거대한 집합에 포함되는 부분 집합

- 타입스크립트의 모든 타입들은 집합으로써 서로 포함하고 포함되는 관계를 갖는다.
- Number 타입처럼 다른 타입을 포함하는 타입을 ***슈퍼 타입(부모 타입)***이라고 하며, 반대로는 ***서브 타입(자식 타입)***이라고 한다.

![부모타입_자식타입](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff474bc02-bad2-40d8-ae0f-21503e4ecdb9%2FUntitled.png?table=block&id=2fd0b889-a6a7-4064-82c2-f707e202638b&cache=v2)


# 타입 호환성

A, B 두개의 타입이 존재할 때 A 타입의 값을 B 타입으로 취급해도 괜찮은지 판단하는 것

![타입호환성](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fcad65769-77bb-4f9c-8ce2-4c426a02d5fb%2FUntitled.png?table=block&id=994a3752-bc88-46ab-8754-d56ca53d6a19&cache=v2)

![캐스팅](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F42382978-4468-424e-a3ea-95b6747653ca%2FUntitled.png?table=block&id=53270154-fdd5-45fd-ad96-579ec8f10c0a&cache=v2)


# 타입 계층도

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

