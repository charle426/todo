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
          <div className="">
            <label className="container">
              <input
                checked={item.complete}
                type="checkbox"
                id=""
                className="checkedTodo "
                onChange={() => checked(index)}
              />
              <div className="checkmark"></div>
            </label>

            {/* <label htmlFor="cbx" className="cbx"></label> */}
          </div>
          <div>
            <p>{item.text}</p>
          </div>
        </div>
        <div
          className="relative flex justify-end cursor-pointer items-center"
          onClick={() => setTodoArr(todoArr.filter((task, id) => index !== id))}
        >
          <button className="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 69 14"
              className="svgIcon bin-top"
            >
              <g clipPath="url(#clip0_35_24)">
                <path
                  fill="black"
                  d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_35_24">
                  <rect fill="white" height="14" width="69"></rect>
                </clipPath>
              </defs>
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 69 57"
              className="svgIcon bin-bottom"
            >
              <g clipPath="url(#clip0_35_22)">
                <path
                  fill="black"
                  d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_35_22">
                  <rect fill="white" height="57" width="69"></rect>
                </clipPath>
              </defs>
            </svg>
          </button>
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
      <div>
        <h1 className="text-[4rem]">
          TO DO
        </h1>
      </div>
      <div className="flex items-center justify-between p-2 ring ring-gray-400">
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
          className=""
          onClick={addTodo}
        >
          <button
            title="Add New Todo"
            className="group cursor-pointer outline-none hover:rotate-90 duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50px"
              height="50px"
              viewBox="0 0 24 24"
              className="stroke-zinc-400 fill-none  group-active:stroke-zinc-200 group-active:fill-zinc-100 group-active:duration-0 duration-300"
            >
              <path
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                strokeWidth="1.5"
              ></path>
              <path d="M8 12H16" strokeWidth="1.5"></path>
              <path d="M12 16V8" strokeWidth="1.5"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="divide-y flex flex-col gap-3 items-center w-[600px] justify-center">
        <div className="flex flex-col items-center divide-y justify-center *:my-2 *:w-full w-full">
          {checkedOut.length ? mappedArr : <p>No tasks here</p>}
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
