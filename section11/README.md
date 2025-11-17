# 목차

1. [타입스크립트 리액트 시작하기](#타입스크립트-리액트-시작하기)
2. [상태관리와 Props](#상태관리와-props)

# 타입스크립트 리액트 시작하기

## REACT앱 생성

```console
npx create-react-app
```

## 불필요한 파일 제거

/src 하위에 다음 파일들 제거

- /App.test.js
- /logo.svg
- /reportWebVitals.js
- /setupTests.js

제거된 파일과 관련된 코드 삭제

- index.js에 주석과 reportWebVitals(); 삭제
- App.js에 #App 아래에 코드 삭제

## type 선언 패키지들 설치

```console
npm i @types/node @types/react @types/react-dom @types/jest
```

## compiler 옵션 설정

- /src 아래에 tsconfig.json 새파일 추가
- 기본적인 옵션 설정

> 리액트앱이 어디에서든 잘 실행되도록 target, module을 'esnext'가 아닌 'es5', 'commonjs'로 설정합니다.

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "allowJs": true,
    "esModuleInterop": true
  },
  "include": ["src"]
}
```

타입스크립트는 js파일에서 jsx문법을 해석할 수 없으므로 App.js, index.js 파일에서 오류가 발생하여 App.js, index.js -> App.jsx, index.jsx로 확장자를 변경합니다.

## App.js, index.js를 ts 파일로 변경

### index.js -> index.tsx로 변경 후 아래와 같은 오류가 발생합니다.

#### **_모듈 '...'에는 기본 내보내기가 없습니다._**

발생 위치 : import ReactDOM from "react-dom/client";

default로 내보내기가 없을 경우에도 모듈을 불러올 수 있도록 아래 옵션을 추가합니다.

```json
{
  "compilerOptions": {
    "esModuleInterop": true
  }
}
```

#### **_'--jsx' 플래그를 제공하지 않으면 JSX를 사용할 수 없습니다._**

발생 위치 : <React.StrictMode></React.StrictMode>

타입스크립트 컴파일러는 JSX 문법을 해석할 수 없으므로 아래 옵션을 추가합니다.

```json
{
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}
```

#### **_'null' 형식은 'Element | DocumentFragment' 형식에 할당할 수 없습니다._**

발생 위치 : document.getElementById("root")

해당 코드가 HTMLElement | null을 반환할 수 있어, null을 허용하지 않는 ReactDOM.createRoot()에 null이 할당될 수 있다는 오류입니다.

Non-Null 단언으로 해결할 수 있습니다.

```typescript
document.getElementById("root")!;
```

또는

```typescript
document.getElementById("root") as HTMLElement;
```

# 상태관리와 Props
