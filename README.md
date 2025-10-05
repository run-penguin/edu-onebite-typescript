# 목차
- section1 - 패키지 생성 및 실행
- section1-compile - 컴파일 설정


# 타입스크립트?
출처 : https://ts.winterlood.com/7250edd7-a3fd-4662-b756-f11f927c73f2

- 2012년 마이크로소프트의 개발자이자 C#의 창시자 Anders Hejlsberg(앤더스 하일스버그)로부터 탄생
- 오픈소스
- 자바스크립트의 확장판 (자바스크립트를 더 안전하게 사용할 수 있도록 "타입 관련 기능들을 추가한" 언어)

# 타입스크립트가 필요한 이유
- 자바스크립트는 웹 브라우저에서 간단한 상호작용을 위해 탄생 -> 안정성이나 견고함은 일부 포기하고 빠르고 간결하게 만드는 것에 중점
- Node.js의 등장으로 자바스크립트를 어디서든 실행할 수 있게 됨 -> 다양한 프로그램을 만들기 시작 -> 엄격하지 않은 문법 때문에 안정성 부족 -> 타입스크립트 등장

# 자바스크립트 한계점

## 타입 시스템

언어의 타입과 관련된 문법 체계

> 값들을 어떤 기준으로 묶어 타입을 규정할 것인가?

> 코드의 타입을 언제 검사할 것인가?

> 어떻게 타입을 검사할 것인가?

![타입시스템](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6c167134-9ffa-4aba-b8b8-fb559cad664e%2FUntitled.png?table=block&id=5242549c-8d18-4e3f-919b-c7f331451f0b&cache=v2)

## 동적 타입 시스템

1. 변수의 타입들을 코드가 실행되는 도중에 결정 -> 미리 변수 타입을 설정하지 않음
2. 현재 변수에 담긴 값에 따라 변수의 타입이 동적으로 변경됨
3. 변수 하나로 여러 곳에 사용 가능

그러나 아래와 같은 문제가 있음

![동적타입시스템의오류](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F59ce432a-f8c4-414e-bcf7-ab28ae7570a2%2FUntitled.png?table=block&id=016932fc-e0c0-4737-b445-ea220e6beb91&cache=v2)

- 실행은 되지만 오류가 발생하고 프로그램이 비정상적으로 종료됨
- 복잡한 프로그램인 경우, 오류가 실행과 동시에 발생하지 않고 이후에 발생하여 서비스가 마비될 수 있음
- 따라서 런타임에 오류가 발생하게 되면 아주 치명적인 문제가 될 수 있음

## 정적 타입 시스템

1. 코드 실행 전에 모든 변수의 타입을 결정함
2. 타입 관련 오류가 있으면 에디터 상에서 알려주고 실행이 불가능함 -> 의도치 않은 실수 방지
3. 모든 변수에 타입을 정의해야 하므로 매우 귀찮고 코드의 양이 늘어남

![정적타입시스템](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fb675ad24-2e00-4126-8e31-a36c8fba8b1f%2FUntitled.png?table=block&id=72e3d652-d351-4512-8d26-569f7e0c202b&cache=v2)

# 타입스크립트와 점진적 타이핑

> 타입스크립트 = 동적 타입 시스템 + 정적 타입 시스템

- 변수의 타입을 코드 실행 전에 결정하고 프로그램 실행전에 검사
- 변수에 담기는 초기값을 기준으로 자동으로 타입을 추론함
- 점진적으로 타입을 결정함 -> 점진적 타입 시스템이라고 함

![점진적타입시스템](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9fa61087-f588-44dd-8ff6-29621bfb0131%2FUntitled.png?table=block&id=7dba02b4-fa17-468d-899c-4351487903ea&cache=v2)

# 타입스크립트 동작 원리

## 대다수의 프로그래밍 언어 동작

- 컴파일(Compile) = 프로그래밍 언어(JavaScript) -> 기계어(바이트 코드)로 변환

> 컴파일을 하는 녀석 = 컴파일러


- 컴파일러는 바이트 코드로 변환하기 전 AST(추상 문법 트리)라는 특별한 형태로 먼저 변환함

> AST(추상 문법 트리) = 코드의 공백이나 주석 탭 등의 코드 실행에 관계없는 요소를 전부 제거하고 트리 형태의 자료구조에 코드를 쪼개서 저장한 형태

![대다수의프로그래밍언어동작](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F514e4f15-5328-43bb-b58a-b505967179db%2FUntitled.png?table=block&id=c505f741-44a9-487b-9980-625728c387e4&cache=v2)

## 타입스크립트의 동작 과정

![타입스크립트동작과정](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F45b2f6da-ce1d-4d0a-8daf-a8bad82b83cc%2FUntitled.png?table=block&id=44d3137a-00c1-4e1d-9351-02e4bc2cf90b&cache=v2)

- 대부분의 언어를 컴파일하면 바이트 코드가 만들어지는 것과 달리, 타입스크립트를 컴파일하면 자바스크립트 코드가 만들어짐

![타입스크립트실행과정](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8d1fb73a-a374-44f0-a119-c5ed182e2a2f%2FUntitled.png?table=block&id=9fa72466-ad68-49a1-b096-ad667ab6d957&cache=v2)

- 타입스크립트에서 작성한 타입 관련 코드들은 결국 자바스크립트로 변환될 때 사라지게 되어 프로그램 실행에 영향을 미치지 않음