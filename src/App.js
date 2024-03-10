import { useEffect, useState } from "react";
import "./App.css"
import axios from "axios";

const App = () => {
  // const a=window.location.href.includes("localhost")
  // if(!a){
  //   baseUrl=`https://zealous-moccasins-duck.cyclic.app/`
  // }
  const baseUrl = `https://zealous-moccasins-duck.cyclic.app/`

  const [inpValue, setInpValue] = useState("");
  const [finalInpValue, setFinalInpValue] = useState("");
  const [todoData, setTodoData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/todos`)
      console.log(response)
      setTodoData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const addTodoHandler = () => {
    if (inpValue) {
      setFinalInpValue(inpValue)
    }
  };
  const editTodoHandler = async (i) => {
    let updatedValue = prompt("Enter Updated Value");
    todoData[i] = updatedValue;
    try {
      const response = await axios.put(`${baseUrl}/todos/${i}`, {
        text: updatedValue
      })
      getData()
    } catch (error) {
      console.log(error)
    }
    setTodoData([...todoData]);
  };
  const deleteTodoHandler = async (index) => {
    console.log(index);
    let data = todoData.filter((e, i) => i !== index);
    try {
      const response = await axios.delete(`${baseUrl}/todos/${index}`, index)
      getData()
    } catch (error) {
      console.log(error)
    }
    setTodoData(data);
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          `${baseUrl}/todos`,
          {
            text: finalInpValue
          }
        );
        console.log(response);
        getData()
      } catch (error) {
        console.log(error);

      }
    })();
  }, [finalInpValue])

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="mainContainer">
      <h1>Todo List Using React</h1>
      <div className="parentDiv">
        <section className="container">
          <h1>Todo List</h1>
          <div className="inp">

            <input
              onChange={(e) => setInpValue(e.target.value)}
              placeholder="Enter Todo"
              value={inpValue}
            /><br />
          </div>
          <div className="btn">
            <button className="btn-add" onClick={addTodoHandler}>Add</button>
          </div>
          <ul>
            {todoData?.map((e, i) => (
              <li key={i}>
                {e?.text}
                <div className="btn-li">
                  <button className="editBtn" onClick={() => editTodoHandler(e._id)}>Edit</button>
                  <button className="delBtn" onClick={() => deleteTodoHandler(e._id)}>Delete</button>
                </div>
              </li>
            ))
            }
          </ul>
        </section>
      </div>
    </div>
  );
};
export default App;
