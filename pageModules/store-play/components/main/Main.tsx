import styles from './Main.module.scss';
import { FC } from 'react'

import {FiMoreVertical} from 'react-icons/fi';
import {IoMdArrowBack} from 'react-icons/io';
import {BiSearchAlt2} from 'react-icons/bi';



const Main:FC<any> = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.part}>
          <div className={styles.item}>
            <IoMdArrowBack/>
          </div>
        </div>
        <div className={styles.part}>
          <div className={styles.item}>
            <BiSearchAlt2/>
          </div>
          <div className={styles.item}>
            <FiMoreVertical/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main;