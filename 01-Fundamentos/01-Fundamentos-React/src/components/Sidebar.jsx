import { PencilLine } from "phosphor-react";

import styles from './Sidebar.module.css'

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img className={styles.cover} src="https://images.unsplash.com/photo-1711539924834-06816347ff2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D" />

      <div className={styles.profile}>
        <img className={styles.avatar} src="https://github.com/rebecayun.png" />

        <strong>Rebeca Yun</strong>
        <span>Web Developer</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={16}/>
          Editar seu perfil
        </a>
      </footer>
    </aside>
  );
}
