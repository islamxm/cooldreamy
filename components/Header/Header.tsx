import styles from '../Header/Header.module.scss';
import { HeaderPropsTypes } from "./types";
import Container from '../Container/Container';
import logoImage from '@/public/assets/images/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import {motion} from 'framer-motion';
import LoginModal from '../LoginModal/LoginModal';
import { useState } from 'react';


const Header: React.FC<HeaderPropsTypes> = ({auth}) => {
    const [loginModal, setLoginModal] = useState(false)

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
            <Container>
                <motion.div 
                    // сделать анимацию поочередного появления opacity: 0 => 1
                    className={styles.inner}>
                    <Link href={'/start'} className={styles.logo}>
                        <motion.div
                            whileHover={{scale: 1.2}}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}    
                            >
                            <Image src={logoImage} alt="Cool Date" />
                        </motion.div>
                    </Link>
                    <div className={styles.main}>
                        {
                            auth ? (
                                <div className={styles.auth}>
                                    <span onClick={() => setLoginModal(true)} className={styles.item}>ВХОД</span>
                                    <Link className={styles.item} href={'/signup'}>РЕГИСТРАЦИЯ</Link>
                                </div>
                            ) : null
                        }
                    </div>
                </motion.div>
            </Container>
        </motion.header>
    )
}

export default Header;