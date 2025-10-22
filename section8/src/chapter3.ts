/**
 * 맵드 타입
 */

interface User {
  id: number;
  name: string;
  age: number;
}

// 맵드 타입은 interface에서 사용할 수 없으므로 type 별칭 사용!
type PartialUser = {
  //   [key in "id" | "name" | "age"]?: User[key];
  [key in keyof User]?: User[key];
};

type BooleanUser = {
  [key in "id" | "name" | "age"]: boolean;
};

type ReadonlyUser = {
  readonly [key in keyof User]: User[key];
};

// 한명의 유저 정보 불러오기
function fetchUser(): ReadonlyUser {
  return {
    id: 1,
    name: "이정환",
    age: 27,
  };
}

const user = fetchUser();
// user.id = 1;

// 한명의 유저 정보 수정
function updateUser(user: PartialUser) {}

updateUser({
  //   id: 1,
  //   name: "이정환",
  age: 25,
});
