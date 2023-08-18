import styles from '../Header/Header.module.scss';
import Container from '../Container/Container';
import logoImage from '@/public/assets/images/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import {motion} from 'framer-motion';
import LoginModal from '../LoginModal/LoginModal';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import { updateToken, updateUserId, updateSocket, updateMenu } from '@/store/actions';
import Router, { useRouter } from 'next/router';
import PromptModal from '@/popups/PromptModal/PromptModal';
import { useWindowSize } from 'usehooks-ts';
import PremiumBtn from '../Sidebar/components/PremiumBtn/PremiumBtn';
import ApiService from '@/service/apiService';
import notify from '@/helpers/notify';
import LOCAL_STORAGE from '@/helpers/localStorage';

const service = new ApiService()

const Header: React.FC<any> = () => {
    const dispatch = useAppDispatch()
    const {token, socketChannel, isMenuOpen, locale, premiumData} = useAppSelector(s => s)
    const {is_premium} = premiumData
    const [loginModal, setLoginModal] = useState(false)
    const {width} = useWindowSize()
    const router = useRouter()
    const [logoutModal, setLogoutModal] = useState(false)

    
    const onLogout = () => {
        if(token) {
            service.logout(token).then(res => {
                if(res?.message === 'success') {
                    socketChannel?.unsubscribe()

                    dispatch(updateToken(''))
                    dispatch(updateUserId(null))
                    dispatch(updateSocket(null))
                    LOCAL_STORAGE?.removeItem('cooldate-web-user-id')
                    LOCAL_STORAGE?.removeItem('cooldate-web-token')
                    
                    Router.push('/')
                    setLogoutModal(false)
                    window.location.reload()
                } else {
                    notify(locale?.global?.notifications?.error_default, 'ERROR')
                }
            })
        }
    }

    const testGtag = () => {
        window.gtag('event', 'conversion', {
            send_to: 'AW-992358861/FuW7CJr87aMYEM3jmNkD'
        })
        Router.push('/signup')
    }
    

    return (
        <motion.header 
            initial={{y: '-100%'}}
            animate={{y: '0%'}}
            transition={{type: 'spring'}}
            className={`${styles.header} ${width <= 768 && (router?.pathname === '/' || router?.pathname === '/start') ? styles.show : ''}`}>
            <LoginModal
                open={loginModal}
                onCancel={() => setLoginModal(false)}
                />
            <PromptModal
                text={locale?.popups.logout.title}
                open={logoutModal}
                onCancel={() => setLogoutModal(false)}
                onAccept={onLogout}
                onReject={() => setLogoutModal(false)}
                />
            <Container>
                <motion.div 
                    className={styles.inner}>
                    {
                        token ? (
                            <button className={`${styles.burger} ${isMenuOpen ? styles.active : ''}`} onClick={() => dispatch(updateMenu(!isMenuOpen))}>
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
                            <Image style={{'cursor': 'pointer'}} onClick={() => Router.push('/')} src={logoImage} alt="Cool Date" />
                        </motion.div>
                    </div>
                    {
                        !token ? (
                            <div className={styles.main}>
                                <div className={styles.locale}>
                                    {/*<SelectDef*/}
                                    {/*    clearIcon={false}*/}
                                    {/*    onChange={(e) => {*/}
                                    {/*        if(e === '1') {*/}
                                    {/*            router.push(router.asPath, undefined, {locale: 'ru'})*/}
                                    {/*        } */}
                                    {/*        if(e === '2') {*/}
                                    {/*            router.push(router.asPath, undefined, {locale: 'en'})*/}
                                    {/*        }*/}
                                    {/*    }}*/}
                                    {/*    list={locales}*/}
                                    {/*    placeholder='Выбор языка'*/}
                                    {/*    value={router?.locale === 'ru' ? '1' : '2'}*/}
                                    {/*    />*/}
                                </div>
                                {
                                    !token ? (
                                        <div className={styles.auth}>
                                            <span onClick={() => setLoginModal(true)} className={styles.item}>{locale?.global?.header?.login_btn}</span>
                                            <Link className={styles.item} href={'/signup'}>{locale?.global?.header?.join_btn}</Link>
                                        </div>
                                    ) : (
                                        width > 768 ? (
                                            <div className={styles.auth}>
                                                <span onClick={() => setLogoutModal(true)} className={styles.item}>{locale?.global?.header?.logout_btn}</span>
                                            </div>
                                        ) : null
                                    )
                                }
                            </div>
                        ) : (
                            width > 768 && (
                                <div className={styles.main}>
                                    {
                                        !is_premium && <div className={styles.prem}>
                                            <PremiumBtn/>
                                        </div>
                                    }
                                    <div className={styles.locale}>
                                        {/*<SelectDef*/}
                                        {/*    clearIcon={false}*/}
                                        {/*    onChange={(e) => {*/}
                                        {/*        if(e === '1') {*/}
                                        {/*            // dispatch(updateLocale(ru))*/}
                                        {/*            router.push(router.asPath, undefined, {locale: 'ru'})*/}
                                        {/*        } */}
                                        {/*        if(e === '2') {*/}
                                        {/*            // dispatch(updateLocale(en))*/}
                                        {/*            router.push(router.asPath, undefined, {locale: 'en'})*/}
                                        {/*        }*/}
                                        {/*    }}*/}
                                        {/*    list={locales}*/}
                                        {/*    placeholder='Выбор языка'*/}
                                        {/*    value={router?.locale === 'ru' ? '1' : '2'}*/}
                                        {/*    />*/}
                                    </div>
                                    {
                                        !token ? (
                                            <div className={styles.auth}>
                                                <span onClick={() => setLoginModal(true)} className={styles.item}>{locale?.global?.header?.join_btn}</span>
                                                <div className={styles.item} onClick={testGtag}>{locale?.global?.header?.login_btn}</div>
                                            </div>
                                        ) : (
                                            width > 768 ? (
                                                <div className={styles.auth}>
                                                    <span onClick={() => setLogoutModal(true)} className={styles.item}>{locale?.global?.header?.logout_btn}</span>
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