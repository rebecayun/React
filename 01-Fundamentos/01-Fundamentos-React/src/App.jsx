import { Header } from "./components/Header";
import { Post } from "./Post";
import { Sidebar } from "./components/Sidebar";

import styles from "./App.module.css";

import "./global.css"

export function App() {

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <aside>
          <Sidebar />
        </aside>
        <main>
          <Post
            author="Diego Fernandes"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos dolor velit vero impedit reiciendis error facere, soluta sint nam deleniti amet facilis accusantium voluptates corrupti nemo similique necessitatibus, doloribus quis."
          />
          <Post
            author="Rebeca Yun"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos dolor velit vero impedit reiciendis error facere, soluta sint nam deleniti amet facilis accusantium voluptates corrupti nemo similique necessitatibus, doloribus quis."
          />
        </main>
      </div>
    </div>
  )
}
