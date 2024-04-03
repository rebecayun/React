import { Header } from "./components/Header"

import styles from './App.module.css'
import "./global.css"
import { Task } from "./components/Task"
import { ChangeEvent, FormEvent, useState } from "react"

export function App() {
  const [tasks, setTask] = useState([])

  const [newTaskText, setNewTaskText] = useState('');

  function handleCreateTask(event:FormEvent) {
    event.preventDefault();
    setTask([...tasks, newTaskText]);
    setNewTaskText('')
  }

  function handleNewTaskText(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewTaskText(event.target.value);
  }

  function deleteTask(taskToDelete: string) {
    const taskWithoutDelete = tasks.filter(task => {
      return task != taskToDelete
    })

    setTask(taskWithoutDelete)
  }

  return (
    <div>
      <Header />

      <div className={styles.wrapper}
        onSubmit={handleCreateTask}>
        <form className={styles.form} >
          <textarea
            placeholder="Add a new to do task"
            onChange={handleNewTaskText}
            value={newTaskText}
          />

          <button>
            Create

          </button>
        </form>

        <div className={styles.taskInfo}>
          <p className={styles.createdTask}>Created tasks <span>5</span></p>
          <p className={styles.completedTask}>Completed <span>2 of 5</span></p>
        </div>

        <div>
          {tasks.map(task => {
            return (
              <Task
                key={task}
                // check={}
                task={task}
                onDeleteTask={deleteTask}
              />

            )
          })}

        </div>

      </div>
    </div>
  )
}
