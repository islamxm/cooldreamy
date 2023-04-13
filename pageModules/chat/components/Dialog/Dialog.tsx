import styles from './Dialog.module.scss';
import ApiService from '@/service/apiService';
import { useRouter } from 'next/router';
import {useState, useEffect} from 'react';
import DialogItem from './components/DialogItem/DialogItem';
import { dialogItemType } from '../../types';

const service = new ApiService()


const Dialog = () => {
    const [id, setId] = useState<string>('')
    const [list, setList] = useState<dialogItemType[]>([])

    


    return (
        <div className={styles.wrapper}>
            {
                list?.map((item, index) => (
                    <DialogItem {...item} key={index}/>
                ))
            }
        </div>
    )
}

export default Dialog;