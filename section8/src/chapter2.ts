/**
 * keyof 연산자
 */

interface Person {
  name: string;
  age: number;
}

function getPropertyKey(person: Person, key: keyof Person) {
  return person[key];
}

const person: Person = {
  name: "이정환",
  age: 27,
};

getPropertyKey(person, "name");

// typeof
const person2 = {
  name: "이정화",
  location: "부산",
};

type Person2 = typeof person2;

// keyof + typeof
function getPropertyKey2(person: Person, key: keyof typeof person2) {
  return person2[key];
}
