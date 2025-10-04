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

![동적타입시스템](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F09507af6-a38a-4609-b8fc-c0cb970e4aba%2FUntitled.png?table=block&id=3ddfe43d-171c-46eb-82b1-9ae2b39c8c78&cache=v2)

![동적타입시스템의장점](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F126e2121-481f-4cdf-bc96-de8cff6200aa%2FUntitled.png?table=block&id=a428e240-f3ab-418c-ac9b-200eeb97d883&cache=v2)

![동적타입시스템의오류](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F59ce432a-f8c4-414e-bcf7-ab28ae7570a2%2FUntitled.png?table=block&id=016932fc-e0c0-4737-b445-ea220e6beb91&cache=v2)

- 실행은 되지만 오류가 발생하고 프로그램이 비정상적으로 종료됨
- 복잡한 프로그램인 경우, 오류가 실행과 동시에 발생하지 않고 이후에 발생하여 서비스가 마비될 수 있음
- 따라서 런타임에 오류가 발생하게 되면 아주 치명적인 문제가 될 수 있음