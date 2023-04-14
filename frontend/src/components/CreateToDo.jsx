import axios from "axios";
import { useState } from "react";

//ToDo 생성창
function CreateToDo({ getToDoList }) {
  const [title, setTitle] = useState("");

  //ToDo 생성
  const onSubmitAdd = async (e) => {
    try {
      e.preventDefault();

      if (!title) {
        alert("타이틀을 입력해주세요!");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/todo`,
        {
          title,
          desc: `${title} 화이팅`,
          // 임시
        }
      );

      if (response.status !== 200) {
        alert("요청을 불러오지 못했습니다");
        return;
      }

      getToDoList();
      setTitle("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex mt-2" onSubmit={onSubmitAdd}>
      <input
        className="grow border-2 border-slate-400 rounded-lg focus:outline-slate-700 px-2 py-1 text-lg"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="ml-4 px-2 py-1 bg-slate-400 hover:bg-slate-700 rounded-lg text-slate-50 cursor-pointer"
        type="submit"
        value="Create"
      />
    </form>
  );
}

export default CreateToDo;
