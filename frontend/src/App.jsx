import axios from "axios";
import CreateToDo from "./components/CreateToDo";
import ToDoCard from "./components/ToDoCard";
import { useEffect, useState } from "react";

function App() {
  const [toDoList, setToDoList] = useState();

  const getToDoList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/todo`
      );

      if (response.status !== 200) {
        alert("데이터를 불러오지 못했습니다.");
        return;
      }

      setToDoList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getToDoList();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-start items-center pt-16">
      <h1 className="text-4xl font-bold">MY TO DO LIST 😎</h1>
      <div>
        <div className="mt-8 text-sm font-semibold">Believe in your self</div>
        <div className="text-xs">자신을 믿어라</div>
      </div>
      <CreateToDo getToDoList={getToDoList} />
      <ul className="mt-16 flex flex-col w-1/2">
        {toDoList &&
          toDoList.map((v, i) => {
            return (
              <ToDoCard
                key={i}
                isDone={v.isDone}
                title={v.title}
                index={i}
                getToDoList={getToDoList}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default App;
