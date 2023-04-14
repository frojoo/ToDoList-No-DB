import axios from "axios";

function ToDoCard({ isDone, title, index, getToDoList }) {
  const onClickIsDone = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/todo/done/${index}`
      );

      if (response.status !== 200) {
        alert("요청을 불러오지 못했습니다");
        return;
      }

      getToDoList();
    } catch (error) {
      console.error(error);
    }
  };

  const onClickDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/todo/${index}`
      );

      if (response.status !== 200) {
        alert("요청을 불러오지 못했습니다");
        return;
      }

      getToDoList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex my-4">
      {isDone ? (
        <>
          <div className="relative">
            <div className="border-4 border-cyan-700 w-8 h-8 rounded-xl"></div>
            <div
              onClick={onClickIsDone}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-700 w-8 h-8 rounded-xl"
            ></div>
          </div>
          <div className="text-2xl ml-4 line-through">{title}</div>
        </>
      ) : (
        <>
          <div
            className="border-4 border-cyan-700 w-8 h-8 rounded-xl"
            onClick={onClickIsDone}
          ></div>
          <div className="text-2xl ml-4">{title}</div>
        </>
      )}
      <button
        onClick={onClickDelete}
        className="ml-10 text-gray-400 text-xl hover:text-black hover:scale-110"
      >
        X
      </button>
    </div>
  );
}

export default ToDoCard;
