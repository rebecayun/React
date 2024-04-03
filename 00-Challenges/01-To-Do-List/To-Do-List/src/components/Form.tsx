import styles from './Form.module.css'

export function Form() {
  return (
    <div  >
      <form className={styles.form} >
        <textarea
          placeholder="Add a new to do task"
        />

        <button>
          Create

        </button>
      </form>
    </div>
  )
}
