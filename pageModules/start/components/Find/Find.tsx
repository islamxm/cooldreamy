import styles from './Find.module.scss';
import Container from '@/components/Container/Container';
import { FC } from 'react'
import img from '@/public/assets/images/start-find-img.png';
import Image from 'next/image';
import Button from '@/components/Button/Button';

const Find:FC<any> = () => {
  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.in}>
          <h2 className={styles.title}>Найди подходящую пару уже сейчас!</h2>
          <div className={styles.body}>
            <Image
              src={img}
              alt=''
              />
          </div>
          <div className={styles.action}>
            <Button
              text='Sign up'
              />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Find;