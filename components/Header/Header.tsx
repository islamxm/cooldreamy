import styles from '../Header/Header.module.scss';
import { HeaderPropsTypes } from "./types";
import Container from '../Container/Container';
import logoImage from '@/public/assets/images/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import {motion} from 'framer-motion';
import LoginModal from '../LoginModal/LoginModal';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import { Cookies } from 'typescript-cookie';
import { updateToken, updateUserId, updateSocket, updateMenu } from '@/store/actions';
import Router from 'next/router';
import PromptModal from '@/popups/PromptModal/PromptModal';
import { useWindowSize } from 'usehooks-ts';



const Header: React.FC<HeaderPropsTypes> = ({auth}) => {
    const dispatch = useAppDispatch()
    const {token, socketChannel, isMenuOpen} = useAppSelector(s => s)
    const [loginModal, setLoginModal] = useState(false)
    const {width} = useWindowSize()
    const [logoutModal, setLogoutModal] = useState(false)


    const onLogout = () => {
        socketChannel?.unsubscribe()

        dispatch(updateToken(''))
        dispatch(updateUserId(null))
        dispatch(updateSocket(null))

        Cookies.remove('cooldate-web-user-id')
        Cookies.remove('cooldate-web-token')
        
        Router.push('/')

        setLogoutModal(false)
        
    }


    return (
        <motion.header 
            initial={{y: '-100%'}}
            animate={{y: '0%'}}
            transition={{type: 'spring'}}
            className={styles.header}>

            <LoginModal
                open={loginModal}
                onCancel={() => setLoginModal(false)}
                />

            <PromptModal
                text='Вы уверены что хотите выйти?'
                open={logoutModal}
                onCancel={() => setLogoutModal(false)}
                onAccept={onLogout}
                onReject={() => setLogoutModal(false)}
                />

            <Container>
                <motion.div 
                    // сделать анимацию поочередного появления opacity: 0 => 1
                    className={styles.inner}>
                    {
                        token ? (
                            <button className={`${styles.burger} ${isMenuOpen ? styles.active : ''}`} onClick={() => dispatch(updateMenu())}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        ) : null
                    }
                    <div className={styles.logo}>
                        <motion.div
                            whileHover={{scale: 1.2}}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}    
                            >
                            <Image src={logoImage} alt="Cool Date" />
                        </motion.div>
                    </div>
                    {
                        !token ? (
                            <div className={styles.main}>
                                {
                                    !token ? (
                                        <div className={styles.auth}>
                                            <span onClick={() => setLoginModal(true)} className={styles.item}>ВХОД</span>
                                            <Link className={styles.item} href={'/signup'}>РЕГИСТРАЦИЯ</Link>
                                        </div>
                                    ) : (
                                        width > 768 ? (
                                            <div className={styles.auth}>
                                                <span onClick={() => setLogoutModal(true)} className={styles.item}>ВЫХОД</span>
                                            </div>
                                        ) : null
                                    )
                                }
                            </div>
                        ) : (
                            width <= 768 ? (
                                null
                            ) : (
                                <div className={styles.main}>
                                    {
                                        !token ? (
                                            <div className={styles.auth}>
                                                <span onClick={() => setLoginModal(true)} className={styles.item}>ВХОД</span>
                                                <Link className={styles.item} href={'/signup'}>РЕГИСТРАЦИЯ</Link>
                                            </div>
                                        ) : (
                                            width > 768 ? (
                                                <div className={styles.auth}>
                                                    <span onClick={() => setLogoutModal(true)} className={styles.item}>ВЫХОД</span>
                                                </div>
                                            ) : null
                                        )
                                    }
                                </div>
                            )
                            
                        )
                    }
                    
                </motion.div>
            </Container>
        </motion.header>
    )
}

export default Header;