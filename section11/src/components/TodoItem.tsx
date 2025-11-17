import { Todo } from "../types";

interface Props extends Todo {
  // 추가 프로퍼티
  onClickDelete: (id: number) => void;
}

export default function TodoItem(props: Props) {
  const onClickButton = () => {
    props.onClickDelete(props.id);
  };

  return (
    <div>
      {props.id}번 : {props.content}
      <button onClick={onClickButton}>삭제</button>
    </div>
  );
}
