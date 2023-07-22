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
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import placeholder from '@/public/assets/images/avatar-placeholder.png';
import notify from '@/helpers/notify';
import { IUser } from '@/models/IUser';
import { updateCurrentProfileId } from '@/store/actions';
import replaceSpace from '@/helpers/replaceSpace';


const service = new ApiService();

const GirlCard:FC<IUser> = ({
    age,
    avatar_url,
    avatar_url_thumbnail,
    birthday,
    user_avatar_url,
    user_thumbnail_url,
    country,
    created_at,
    id,
    name,
    state,
    winkable
    
}) => {
    const {token, locale} = useAppSelector(s => s)
    const dispatch = useAppDispatch()




    const createChat = () => {
        if(id && token) {
            service.createChat({user_id: id}, token).then(res => {
                if(res?.chat_id) {
                    Router.push(`/chat/${res?.chat_id}?type=chat`)
                }
            })

            // !! параллельное создание чата писем
            service.createMail({user_id: id}, token).then(res => {
                console.log(res)
            })
        }
    }


    
    
    

    const sendWink = () => {
        if(id && token) {
            service.createChat({user_id: id}, token).then(res => {
                if(res?.chat_id) {
                    service.sendWink({user_id: id}, token).then(r => {
                        if(r?.error) {
                            notify('Вы уже подмигнули', 'ERROR')
                        } else {
                            Router.push(`/chat/${res?.chat_id}?type=chat`)
                        }
                        
                        // условие
                        
                    })
                }
            })

            // !! параллельное создание чата писем
            service.createMail({user_id: id}, token).then(res => {
                console.log(res)
            })
        }
    }
    

    const addToFav = () => {
        if(id && token) {
            service.addUserToFav({user_id: id}, token).then(res => {
                console.log(res?.status)
                if(res?.status === 200) {
                    res?.json().then(r => {
                    })
                    notify('Пользователь добавлен в избранные', 'SUCCESS')
                } else {
                    notify('Не удалось добавить пользователя в избранные', 'ERROR')
                    res?.json().then(r => {
                        console.log(r)
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
                
                
                <div onClick={() => id && dispatch(updateCurrentProfileId(id))} className={styles.img}>
                    <Image
                        loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''}
                        src={user_thumbnail_url ? replaceSpace(user_thumbnail_url) : placeholder} 
                        width={300}
                        height={300}
                        alt=""/>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.action}>
                    <Row gutter={[2,2]}>
                        {
                            winkable === 1 ? (
                                <Col span={8} md={7}>
                                    <button onClick={sendWink} className={styles.button}><FaRegSmileWink/></button>
                                </Col>
                            ) : null
                        }
                        
                        <Col span={winkable === 1 ? 8 : 12} md={winkable === 1 ? 7 : 12}>
                            <button 
                                onClick={addToFav}
                                className={styles.button}><AiOutlineStar/></button>
                        </Col>
                        <Col span={winkable === 1 ? 8 : 12} md={winkable === 1 ? 10 : 12}>
                            <button 
                                onClick={createChat}
                                className={styles.button}>
                                <span>{locale?.global.user_card.send_message}</span> <FiMail/>
                            </button>
                        </Col>
                    </Row>
                </div>
                <div className={styles.info}>
                    <Col span={24}>
                        <Row gutter={[2,2]}>
                            <Col span={24}>
                                <div className={`${styles.name} ${styles.online}`}>{name}, {age}</div>
                            </Col>
                            {
                                !(!state && !country) && (
                                    <Col span={24}>
                                        <div className={styles.loc}>{`${country} ${state ? ',' + state : ''}`}</div>
                                    </Col>
                                )
                            }
                            
                        </Row>
                    </Col>
                </div>
            </div>
        </div>
    )
}

export default GirlCard;