import { useEffect, useState } from "react";

function App() {
  const [dark, setDark] = useState(true);
  const [todoArr, setTodoArr] = useState([]);
  const [checkedOut, setCheckedOut] = useState(todoArr);
  const [completedTasks, setCompletedTasks] = useState([])
  const [filterArr, setFilterArr] = useState("All")
  const [text, setText] = useState({
    todoText: "",
  });
  const local = JSON.parse(localStorage.getItem("ARR"))
  useEffect(() => {
    setTodoArr(local)
  }, [])


  useEffect(() => {
    if (filterArr === "Completed")
    {
      setCheckedOut(todoArr.filter((tasks) => {
        return tasks.complete === true;
      }))
    } else if (filterArr === "Active")
    {
      console.log("active");
      setCheckedOut(
        todoArr.filter((tasks) => {
          return tasks.complete === false
          
        })
      );
    } else
    {
      setCheckedOut(todoArr)
    }

  }, [filterArr, todoArr])

  const sortedArr = checkedOut.sort((a, b) => b.date - a.date);
  const mappedArr = sortedArr.map((item, index) => {
    return (
      <div
        key={index}
        className={
          dark
            ? "flex justify-between items-center p-5 todo dark relative rounded-lg"
            : "flex justify-between items-center max-w-[500px] p-5  todo light relative rounded-lg"
        }
      >
        <div className="flex gap-4 items-center w-full">
          <div>
            <input
              type="checkbox"
              className="checkedTodo"
              checked={item.complete}
              onChange={() => checked(index)}
            />
          </div>
          <div>
            <p>{item.text}</p>
          </div>
        </div>
        <div
          className="relative flex justify-end cursor-pointer items-center"
          onClick={() => setTodoArr(todoArr.filter((task, id) => index !== id))}
        >
          <div className="h-[25px] w-[2px] bg-slate-800 -translate-y-[4px] translate-x-[2px] -rotate-[40deg]"></div>
          <div className="h-[25px] w-[2px] -translate-y-[2px] bg-slate-800 rotate-[40deg]"></div>
        </div>
      </div>
    );
  });

  // const checkedTodo = document.querySelectorAll(".checkedTodo")

  function checked(id) {
    setTodoArr(
      todoArr.map((todo, index) => {
        if(index === id) {
          return {
              ...todo,
             complete : !todo.complete
            }
          }
        return todo
      })
    )
  }

  const addTodo = () => {
    setTodoArr((prev) => ([
      ...prev,
      { 
        text: text.todoText,
        date: Date.now(),
        complete: false,
      },
    ]));
    setText({
       todoText : ""
    })
    setFilterArr("All");
   
  }

  useEffect(() => {
    localStorage.setItem("ARR", JSON.stringify(todoArr));
    setCompletedTasks(
      todoArr.filter((tasks) => {
        return tasks.complete === false;
      })
    );
  }, [todoArr]);

  function handleChange(e) {
    const { name, value } = e.target;
    setText((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <section className="flex gap-5 flex-col justify-center items-center min-h-[100vh]">
      <div className="flex items-center justify-between p-2 ring ring-blue-900">
        <div>
          <input
            type="text"
            value={text.todoText}
            name="todoText"
            onChange={handleChange}
            className="outline-none p-5"
          />
        </div>
        <div
          className="hover:ring-1 hover:ring-blue-900 p-3 bg-blue-700"
          onClick={addTodo}
        >
          Add Todo
        </div>
      </div>
      <div className="divide-y flex flex-col gap-3 items-center w-[600px] justify-center">
        <div className="flex flex-col items-center divide-y justify-center *:my-2 *:w-full w-full">
          {checkedOut.length  ? mappedArr : <p>No tasks here</p>}
        </div>
      </div>
      <div className="flex justify-between space-x-11 items-center p-5">
        <div>{completedTasks.length} items left </div>
        <div className="flex items-center gap-3">
          <p
            onClick={() => setFilterArr("All")}
            className={filterArr === "All" ? "text-blue-800" : "text-slate-700"}
          >
            All
          </p>
          <p
            onClick={() => setFilterArr("Active")}
            className={
              filterArr === "Active" ? "text-blue-800" : "text-slate-700"
            }
          >
            Active
          </p>
          <p
            onClick={() => setFilterArr("Completed")}
            className={
              filterArr === "Completed" ? "text-blue-800" : "text-slate-700"
            }
          >
            Completed
          </p>
        </div>
        <div
          className="cursor-pointer"
          onClick={() =>
            setTodoArr(
              todoArr.filter((tasks) => {
                return tasks.complete !== true;
              })
            )
          }
        >
          Clear Completed
        </div>
      </div>
    </section>
  );
}

export default App;
