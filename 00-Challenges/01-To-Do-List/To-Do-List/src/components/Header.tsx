import styles from './Header.module.css'

import rocket from '../assets/Rocket.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={rocket} alt="Rocket icon" />
      <p className={styles.to}>to</p>
      <p className={styles.do}>do</p>
    </header>
  )
}
