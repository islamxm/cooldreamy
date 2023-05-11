import styles from './DialogEmpty.module.scss';
import Image from 'next/image';
import img from '@/public/assets/images/chat-empty.svg';
import Button from '@/components/Button/Button';
import Router from 'next/router';

const DialogEmpty = ({height, absolute} : {height?: number | string, absolute?:boolean}) => {


    return (
        <div className={styles.wrapper} style={{height, position: absolute ? 'absolute' : 'static'}}>
            
            <div className={styles.body}>
                <div className={styles.img}>
                    <Image src={img} alt=''/>
                </div>
                <div className={styles.head}>Нет переписок</div>
                <div className={styles.text}>Выберете анкету для общения в чате</div>
                <div className={styles.action}>
                    <Button middle text='Перейти к анкетам' onClick={() => Router.push('/feed')} variant={'bordered'}/>
                </div>
            </div>

        </div>
    )
}


export default DialogEmpty;