# 목차

1. [자바스크립트의 클래스](#자바스크립트의-클래스)
2. [타입스크립트의 클래스](#타입스크립트의-클래스)

## 자바스크립트의 클래스

동일한 모양의 객체를 쉽게 생성하도록 도와주는 문법

### 클래스 선언

```javascript
class Student {
  // 필드
  name;
  age;
  grade;

  // 생성자
  constructor(name, grade, age) {
    this.name = name;
    this.grade = grade;
    this.age = age;
  }

  // 메서드
  study() {
    console.log("열심히 공부함");
  }

  introduce() {
    console.log(`안녕하세요! ${this.name} 입니다.`);
  }
}
```

#### 필드

- 클래스가 생성할 객체가 갖는 프로퍼티

#### 생성자

- 객체를 생성하는 함수
- 매개변수로 프로퍼티의 값을 받아 this.프로퍼티의 값으로 할당함
- 이때 this는 현재 만들고 있는 개체를 의미함

#### 객체 생성

```javascript
const studentB = new Student("홍길동", "A+", 27);
```

### this 활용

```javascript
class Student {
  (...)

  introduce() {
    console.log(`안녕하세요 ${this.name} 입니다!`);
  }
}

let studentB = new Student("홍길동", "A+", 27);

studentB.introduce(); // 안녕하세요 이정환 입니다!
```

### 상속

- 상속을 이용하여 앞서 만든 클래스를 기반으로 추가적인 필드와 메서드를 갖는 클래스를 선언할 수 있음
- 인터페이스의 확장과 기본적으로 비슷하며, 상속받은 클래스의 모든 필드와 메서드를 자동으로 가지게 됨

```javascript
class StudentDeveloper extends Student {}
```

- 새로운 필드나 메서드도 같이 정의할 수 있음

```javascript
class StudentDeveloper extends Student {
  // 필드
  favoriteSkill;

  // 생성자
  constructor(name, grade, age, favoriteSkill) {
    super(name, grade, age); // Student 클래스의 생성자 호출
    this.favoriteSkill = favoriteSkill;
  }

  // 메서드
  programming() {
    console.log(`${this.favoriteSkill}로 프로그래밍 함`);
  }
}
```

> 이때 Student 클래스의 생성자를 호출하지 않으면 name, grade, age 값이 제대로 설정되지 않음

## 타입스크립트의 클래스

타입스크립트에서는 클래스의 필드를 선언할 때 타입을 정의하지 않는 경우, 암시적 any 타입으로 추론되어 엄격한 타입 검사 모드에서 오류가 발생함.

- 생성자에서 각 필드의 값을 초기화하지 않을 경우 초기값도 함께 명시해야 함.

```typescript
class Employee {
  // 필드
  name: string = "";
  age: number = 0;
  position: string = "";

  // 메서드
  work() {
    console.log("일함");
  }
}
```

- 생성자 함수에서 필드 값을 초기화한다면 필드에서는 선언 생략이 가능함
- 특정 프로퍼티를 선택적 프로퍼티로 만들고 싶다면 물음표 추가

```typescript
class Employee {
  // 필드
  name: string;
  age: number;
  position?: string;

  // 생성자
  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  // 메서드
  work() {
    console.log("일함");
  }
}
```

### 클래스는 타입

클래스틑 타입으로 사용하면 해당 클래스가 생성하는 객체의 타입과 동일한 타입이 됨

```typescript
class Employee {
  (...)
}

const employeeC: Employee = {
  name: "",
  age: 0,
  position: "",
  work() {},
};
```

### 상속

- 파생 클래스에서 생성자를 정의했다면 반드시 super 메서드를 호출하여 생성자를 호출해야 함
- 호출 위치는 생성자의 최상단

```typescript
class ExecutiveOfficer extends Employee {
  officeNumber: number;

  constructor(
    name: string,
    age: number,
    position: string,
    officeNumber: number
  ) {
    super(name, age, position);
    this.officeNumber = officeNumber;
  }
}
```

## 접근 제어자 (Access Modifier)

클래스의 특정 필드나 메서드에 접근할 수 있는 범위를 설정하는 기능

- public : 모든 범위 접근 가능
- private : 클래스 내부에서만 접근 가능
- protected: 클래스 내부, 파생 클래스 내부에서만 접근 가능

### public

- '공공의' 라는 뜻
- 어디서든지 접근 가능
- 접근 제어자를 지정하지 않으면 기본적으로 할당

```typescript
class Employee {
  // 필드
  name: string; // 자동으로 public
  age: number; // 자동으로 public
  public position: string; // 직접 public으로 명시

  // 생성자
  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  // 메서드
  work() {
    console.log("일함");
  }
}

const employee = new Employee("이정환", 27, "devloper");

employee.name = "홍길동";
employee.age = 30;
employee.position = "디자이너";
```

### private

- '제한된', '사적인'
- 클래스 내부에서만 필드에 접근 가능

```typescript
class Employee {
  // 필드
  private name: string; // private 접근 제어자 설정
  public age: number;
  public position: string;

  ...

  // 메서드
  work() {
    console.log(`${this.name}이 일함`); // 여기서는 접근 가능
  }
}

const employee = new Employee("이정환", 27, "devloper");

employee.name = "홍길동"; // ❌ 오류
employee.age = 30;
employee.position = "디자이너";
```

### protected

- private과 public의 중간
- 클래스 외부에서는 접근이 안되지만 클래스 내부, 파생 클래스에서 접근 가능

```typescript
class Employee {
  // 필드
  private name: string; // private 접근 제어자 설정
  protected age: number;
  public position: string;

  ...

  // 메서드
  work() {
    console.log(`${this.name}이 일함`); // 여기서는 접근 가능
  }
}

class ExecutiveOfficer extends Employee {
 // 메서드
  func() {
    this.name; // ❌ 오류
    this.age; // ✅ 가능
  }
}

const employee = new Employee("이정환", 27, "devloper");

employee.name = "홍길동"; // ❌ 오류
employee.age = 30; // ❌ 오류
employee.position = "디자이너";
```

### 필드 생략

접근 제어자는 생성자의 매개변수에도 설정 가능

```typescript
class Employee {
  // 생성자
  constructor(
    private name: string, // 생성자의 매개변수에 접근 제어자 설정
    protected age: number, // 생성자의 매개변수에 접근 제어자 설정
    public position: string // 생성자의 매개변수에 접근 제어자 설정
  ) {
    this.name = name;
    this.age = age;
    this.position = position;
  }
}
```

자동으로 필드에도 함께 선언되어, 필드에 직접 선언하는 경우 오류 발생함

```typescript
class Employee {
  // 필드
  private name: string; // 오류 발생 (삭제 필요)
  protected age: number; // 오류 발생 (삭제 필요)
  public position: string; // 오류 발생 (삭제 필요)

  // 생성자
  constructor(
    private name: string,
    protected age: number,
    public position: string
  ) {
    this.name = name;
    this.age = age;
    this.position = position;
  }
}
```

접근 제어자가 설정된 매개변수들은 'this.필드 = 매개변수'가 자동 수행되므로, 아래와 같이 생성자 내부의 코드를 제거할 수 있음

```typescript
class Employee {
  // 생성자
  constructor(
    private name: string,
    protected age: number,
    public position: string
  ) {}

  // 메서드
  work() {
    console.log(`${this.name} 일함`);
  }
}
```
