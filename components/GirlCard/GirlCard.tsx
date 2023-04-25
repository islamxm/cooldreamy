import styles from './GirlCard.module.scss';
import {FC, useState, useEffect} from 'react';
import Image from 'next/image';
import { Row, Col } from 'antd';
import { girlCardType } from './types';
import {FaRegSmileWink} from 'react-icons/fa';
import {FiMail} from 'react-icons/fi';
import {AiOutlineStar} from 'react-icons/ai';
import {BsCamera, BsCheck} from 'react-icons/bs';
import Link from 'next/link';
import logo from '@/public/assets/images/logo.svg'
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import placeholder from '@/public/assets/images/logo.svg';
import notify from '@/helpers/notify';

const service = new ApiService();

const GirlCard:FC<girlCardType> = ({
    // image,
    // name,
    // location,
    // online,
    // photoCount,
    // verified,
    // age,
    // link = '/users/user_id'

    age,
    avatar_url,
    avatar_url_thumbnail,
    birthday,
    country,
    created_at,
    id,
    name,
    online,
    state,
    winkable
}) => {
    const {token} = useAppSelector(s => s)
    
    useEffect(() => {
        console.log(winkable)
    }, [winkable])

    // const goToMail = () => {
        
    // }

    // const addToFav = () => {

    // }


    const createChat = () => {
        if(id && token) {
            service.createChat({user_id: id}, token).then(res => {
                if(res?.chat_id) {
                    Router.push(`/chat/${res?.chat_id}`)
                }
            })
        }
    }
    

    const sendWink = () => {
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
        <div className={styles.card}>
            <div className={styles.main}>
                <div className={styles.badges}>
                    {/* <div className={styles.photo_count}><BsCamera/>{photoCount}</div> */}
                        {/* {
                            verified ? (
                                <div className={styles.verif}><BsCheck/></div>
                            ) : null
                        } */}
                </div>
                
                
                <Link href={`/users/${id}`} className={styles.img}>
                    <Image
                        loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''}
                        placeholder={!avatar_url_thumbnail ? 'blur' : 'empty'} 
                        src={avatar_url_thumbnail ? avatar_url_thumbnail : placeholder} 
                        width={300}
                        height={300}
                        alt=""/>
                </Link>
            </div>
            <div className={styles.body}>
                <div className={styles.action}>
                    <Row gutter={[2,2]}>
                        {
                            winkable === 1 ? (
                                <Col span={7}>
                                    <button onClick={sendWink} className={styles.button}><FaRegSmileWink/></button>
                                </Col>
                            ) : null
                        }
                        
                        <Col span={winkable === 1 ? 7 : 12}>
                            <button className={styles.button}><AiOutlineStar/></button>
                        </Col>
                        <Col span={winkable === 1 ? 10 : 12}>
                            <button 
                                onClick={createChat}
                                className={styles.button}>
                                <span>Написать</span> <FiMail/>
                            </button>
                        </Col>
                    </Row>
                </div>
                <div className={styles.info}>
                    <Col span={24}>
                        <Row gutter={[2,2]}>
                            <Col span={24}>
                                <div className={`${styles.name} ${online ? styles.online : ''}`}>{name}, {age}</div>
                            </Col>
                            <Col span={24}>
                                <div className={styles.loc}>{`${country} ${state ? ',' + state : ''}`}</div>
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>
        </div>
    )
}

export default GirlCard;