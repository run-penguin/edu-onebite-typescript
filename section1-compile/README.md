# 컴파일러 옵션

- 타입스크립트의 컴파일은 작성한 코드에 타입 오류가 없는지 검사하고 오류가 없다면 자바스크립트 코드로 변환함
- 컴파일 과정에 옵션을 세부적으로 설정할 수 있음
- 타입스크립트는 타언어에 비해 컴파일러 옵션을 자유롭고 쉽게 설정할 수 있음


## 컴파일러 옵션 자동 생성

- 패키지 루트 폴더 아래에 tsconfig.json 파일에 설정
- Node.js 패키지 단위로 설정
- tsc를 이용하면 기본 옵션이 설정된 컴파일러 옵션 파일을 자동 생성할 수 있음

```bash
tsc --init
```


## 컴파일러 옵션 직접 설정

### include
컴파일 대상 위치 지정

```json
{
  "include": ["src"]
}
```

### target
컴파일 결과 생성되는 자바스크립트 코드의 버전 설정

```json
{
  "compilerOptions": {
    "target": "ES5"
  },
}
```

```json
{
  "compilerOptions": {
    "target": "ESNext"
  },
}
```

- 구버전의 자바스크립트를 사용하는 구형 브라우저, 예전의 서버 환경에서 동작해야 되는 경우 등 이전 버전을 사용해야되는 환경이 있음
- TypeScript -> JavaScript 변환하는 과정이나 타입 검사 등의 상세한 설정은 compilerOptions의 하위에 설정함

> @types 버전이 20 버전 이상으로 업데이트되면서 undici-types 모듈을 찾을 수 없다는 오류가 발생하므로 아래 코드 추가해야 함!!

```json
{
  "compilerOptions": {
    "skipLibCheck": true,
  },
}
```

### module

- ES 모듈 시스템 = ECMAScript Module System = 리액트, Vue에서 사용 = "ESNext"
- CJS 모듈 시스템 = Node.js에서 사용 = "CommonJS"

```json
{
  "compilerOptions": {
    "module": "esnext"
  },
}
```

### outDir
컴파일 결과 생성할 자바스크립트 코드의 위치 설정

```json
{
  "compilerOptions": {
    "outDir": "dist"
  },
}
```

## strict
타입스크립트 컴파일러의 타입 검사 엄격함 수준을 설정

```json
{
  "compilerOptions": {
    "strict": true
  },
}
```

## ModuleDetection

타입스크립트의 모든 파일은 기본적으로 전역 파일(모듈)로 취급하여 다음과 같이 a.ts, b.ts 두 파일에 동일한 이름의 변수를 선언하면 오류가 발생함

```typescript
// a.ts
const a = 1;

// b.ts
const a = 1;
```

각 파일에 모듈 시스템 키워드(export, import)를 최소 하나 이상 사용해 해당 파일을 로컬(독립) 모듈로 취급되도록 만들어야 하는데, 이를 자동화하는 옵션임

```json
{
  "compilerOptions": {
    "moduleDetection": "force"
  },
}
```