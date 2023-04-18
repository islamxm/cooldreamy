import styles from './UserInfoAction.module.scss';
import {FiHeart} from 'react-icons/fi';
import {FaRegSmileWink} from 'react-icons/fa';
import {AiOutlineStar} from 'react-icons/ai';
import UserTitle from '@/components/UserTitle/UserTitle';
import { IUser } from '@/models/IUser';
import {FC} from 'react';
import { useAppSelector } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import Router from 'next/router';
import notify from '@/helpers/notify';


const service = new ApiService()


const UserInfoAction:FC<IUser> = ({
    name,
    age,
    state,
    country,
    id
}) => {
    const {token} = useAppSelector(s => s)


    const onLike = () => {

    }

    const onFavorite = () => {
        
    }


    const onWink = () => {
        if(id && token) {
            service.createChat({user_id: id}, token).then(res => {
                console.log(res)
                if(res?.chat_id) {
                    service.sendWink({user_id: id}, token).then(r => {
                        if(r?.error) {
                            notify('Вы уже подмигнули', 'ERROR')
                        } else {
                            Router.push(`/chat/${res?.chat_id}`)
                        }
                        
                        // условие
                        
                    })
                }
            })
        }
    }


    



    return (
        <div className={`${styles.wrapper} ${styles.online}`}>
            <div className={styles.main}>
                <div className={styles.name}>
                    <UserTitle
                        username={name}
                        age={age?.toString()}
                        isOnline={false}
                        style={{fontSize: 24}}
                        />
                </div>
                {
                    country && state ? (
                        <div className={styles.location}>
                            {country}, {state}
                        </div>
                    ) : null
                }
                
            </div>
            <div className={styles.action}>
                <button onClick={onLike} className={styles.item}>
                    <div className={styles.icon}>
                        <FiHeart/>
                    </div>
                    <div className={styles.text}>НРАВИТСЯ</div>
                </button>
                <button onClick={onWink} className={styles.item}>
                    <div className={styles.icon}>
                        <FaRegSmileWink/>
                    </div>
                    <div className={styles.text}>ПОДМИГНУТЬ</div>
                </button>
                <button onClick={onFavorite} className={styles.item}>
                    <div className={styles.icon}>
                        <AiOutlineStar/>
                    </div>
                    <div className={styles.text}>ИЗБРАННОЕ</div>
                </button>
            </div>
        </div>
    )
}

export default UserInfoAction;