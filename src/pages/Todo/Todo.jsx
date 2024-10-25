import { useState, useEffect, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

import { fetchTodos } from "../../data/todos";
import "./Todo.css";
import { Form } from "react-bootstrap";
function Todo() {
  const [todosRaw, setTodosRaw] = useState([]);
  const [onlyWating, setOnlyWating] = useState(false);
  const [itenPerPage, setItenPerPage] = useState(5);
  const [todos, setTodos] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const [curPage, setCurPage] = useState(1);

  useEffect(() => {
    if (numPages <= 0) setCurPage(0)
    else if (curPage === 0) setCurPage(1)
    else if (curPage > numPages) setCurPage(numPages)

  }, [numPages]);

  useEffect(() => {
    console.log(`curPage: ${curPage}`);
  }, [curPage]);

  useEffect(() => {
    // console.log(`itenPerPage: ${itenPerPage}`);
    setNumPages(Math.ceil(todos.length / itenPerPage));
  }, [itenPerPage, todos]);

  useEffect(() => {
    console.log(`onlyWating: ${onlyWating}`);
  }, [onlyWating]);

  useEffect(() => {
    setTodosRaw(fetchTodos());
    setCurPage(1);
  }, []);

  // useEffect(() => {
  //   console.log(todosRaw);
  //   setTodos(todosRaw);
  // }, [todosRaw]);

  useEffect(() => {
    if (onlyWating) {
      setTodos(todosRaw.filter((todo) => !todo.completed));
    } else {
      setTodos(todosRaw);
    }
  }, [todosRaw, onlyWating]);

  function deleteClick(id) {
    setTodosRaw(todosRaw.filter((todo) =>
      todo.id !== id));
  }
  function waitingClick(id) {
    const todoSelected = todosRaw.find((todo) => todo.id === id)


    todoSelected.completed = true
    // setTodosRaw(todosRaw)
    setTodosRaw([...todosRaw])

  }

  function AddClick(id, title) {
    const newItem ={
       id,
      title,
      completed: false,
      userId: 1,
    }

    setTodosRaw([...todosRaw, newItem])
  }


  const [show, setShow] = useState(false);

const newIdRef = useRef()
const newTitleRef = useRef()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="todo-container">

      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title><span className="bi bi-plus-lg">&nbsp;ADD TODO</span> </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID : </Form.Label>
              <Form.Control
                type="text"
                autoFocus disabled value={Number(todosRaw.reduce(
                  (prev,todo)=>
                  (todo.id > prev ? todo.id : prev),0 )) + 1 
                }
                  ref={newIdRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Title : </Form.Label>
              <Form.Control
                type="text"
                autoFocus ref={newTitleRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <span className="bi bi-x-lg">&nbsp;
              Cancel
            </span>
          </Button>
          
          <Button variant="primary" onClick={() => {
            const id = newIdRef.current.value
            const title = newTitleRef.current.value.trim()
            if(title===''){
              alert ('กรุณาใส่ข้อมูล')
              newTitleRef.current.value = ''
              newTitleRef.current.focus()

            }else{
              AddClick(id, title)
              handleClose()
            }
           
          }

            }>
            <span className="bi bi-plus-lg">&nbsp;
              Add
            </span>
          </Button>
        </Modal.Footer>

      </Modal>




      <div className="todo-filter-container">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            onClick={(e) => {
              setOnlyWating(e.target.checked);
            }}
          />

          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            show only watting &nbsp;
            <button className="btn btn-warning">
              waiting &nbsp;
              <span className="bi bi-clock"></span>
            </button>
          </label>
        </div>

        <select
          classname="form-select"
          aria-label="Default select example"
          style={{ width: "200px" }}
          onClick={(e) => {
            setItenPerPage(e.target.value);
          }}
        >
          <option value={5} selected>
            5 items per page
          </option>
          <option value={10}>10 items per page</option>
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </select>
      </div>

      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th style={{ textAlign: "right" }}>Completed&nbsp;
              <button className="btn btn-primary" onClick={() => { handleShow() }}>
                <span className="bi bi-plus-lg"></span>
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {todos
            .filter((todo, index) => {
              const min = (curPage - 1) * itenPerPage;
              const max = curPage * itenPerPage - 1;
              return index >= min && index <= max;
            })

            .map((todo) => {
              return (
                <tr key={todo.id}>
                  <td>
                    <span
                      className="badge bg-secondary"
                      style={{ width: "3rem" }}
                    >
                      {todo.id}
                    </span>
                  </td>
                  <td style={{ textAlign: "left" }}>{todo.title} </td>
                  <td style={{ textAlign: "right" }}>
                    {todo.completed ? (
                      <span
                        className='badge bg-success'>
                        done&nbsp;

                        <span className='bi bi-check'></span>

                      </span>
                    ) : (


                      <button className="btn btn-warning" onClick={() => {
                        waitingClick(todo.id)
                      }} >
                        waiting&nbsp;
                        <span className='bi bi-clock'></span>
                      </button>

                    )}
                    &nbsp;
                    <button className="btn btn-danger" onClick={() => {
                      deleteClick(todo.id)
                    }}>
                      <span className="bi bi-trash"></span>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div>
        <button
          className="btn btn-outline-primary todo-spacing"
          onClick={() => {
            setCurPage(1);
          }}
          disabled={curPage === 1}
        >
          First
        </button>

        <button
          className="btn btn-outline-primary todo-spacing"
          onClick={() => curPage > 1 && setCurPage(curPage - 1)}
        >
          Previous
        </button>

        <span className="todo-spacing">
          {curPage}&nbsp;/&nbsp;{numPages}
        </span>

        <button
          className="btn btn-outline-primary todo-spacing"
          onClick={() => {
            curPage < numPages && setCurPage(curPage + 1);
          }}
          disabled={curPage === numPages}
        >
          Next
        </button>

        <button
          className="btn btn-outline-primary todo-spacing"
          onClick={() => {
            setCurPage(numPages);
          }}
          disabled={curPage === numPages}
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default Todo;