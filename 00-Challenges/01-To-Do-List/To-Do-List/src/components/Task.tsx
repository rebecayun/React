import { Trash } from "phosphor-react";
import styles from './Task.module.css'

interface TaskProps {
  check: boolean;
  task: string;
  onDeleteTask: (taskToDelete: string) => void;
}



export function Task({ check, task, onDeleteTask }: TaskProps) {

  function handleDeleteTask() {
    onDeleteTask(task)
  }


  return (
    <div className={styles.taskContainer}>
      <div className={styles.task}>
        <span>{check}</span>
        <p>{task}</p>
        <button onClick={handleDeleteTask}>

          <Trash />
        </button>
      </div>
    </div>
  )
}
