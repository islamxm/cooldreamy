import styles from './Hero.module.scss';
import { FC, useEffect } from 'react';
import Container from '@/components/Container/Container';
import SelectSex from '@/components/SelectSex/SelectSex';
import { useState } from 'react';
import {Row, Col} from 'antd';
import {container, item} from '../../../../helpers/variantsOrderAnim';
import Image from 'next/image';
import phone1 from '@/public/assets/images/phone-1.svg';
import phone2 from '@/public/assets/images/phone-2.svg';
import { motion, useScroll, useTransform } from "framer-motion";
import { useAppSelector } from '@/hooks/useTypesRedux';
import Router from 'next/router';
import Button from '@/components/Button/Button';
import LoginModal from '@/components/LoginModal/LoginModal';
import parse from 'html-react-parser';
import cloud1 from '@/public/assets/images/hero-cloud-1.svg'
import cloud2 from '@/public/assets/images/hero-cloud-2.svg'
import cloud3 from '@/public/assets/images/hero-cloud-3.svg'
import cloud4 from '@/public/assets/images/hero-cloud-4.svg'
import cloud5 from '@/public/assets/images/hero-cloud-5.svg'
import cloud6 from '@/public/assets/images/hero-cloud-6.svg'
import cloud7 from '@/public/assets/images/hero-cloud-7.svg'
import cloud8 from '@/public/assets/images/hero-cloud-8.svg'
import stars from '@/public/assets/images/hero-stars.svg'
import heart1 from '@/public/assets/images/hero-heart-1.svg';
import heart2 from '@/public/assets/images/hero-heart-2.svg';
import arrow1 from '@/public/assets/images/hero-arrow-1.svg';
import arrow2 from '@/public/assets/images/hero-arrow-2.svg';



const Hero: FC = ({}) => {
    const [sex, setSex] = useState<'male' | 'female'>()
    const {scrollYProgress} = useScroll()
    const {locale} = useAppSelector(s => s)
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const [loginModal, setLoginModal] = useState(false)
    const [enableInstall, setEnableInstall] = useState(true)
    const [installEvent, setInstallEvent] = useState<any>(null)

    const sexChange = (value: 'male' | 'female') => {
        setSex(value)
    }


    const openInstall = (e: any) => {
        console.log(e)
        setEnableInstall(false)
        setInstallEvent(e)
    }


    useEffect(() => {
        process?.browser && window.addEventListener('beforeinstallprompt', openInstall)

        return () => {
            window.removeEventListener('beforeinstallprompt', openInstall)
        }
    }, [])

    


    return (
        <div className={styles.hero}>
            <LoginModal
                open={loginModal}
                onCancel={() => setLoginModal(false)}
                />
            <Container>
                <motion.div
                    initial="hidden"
                    animate="visible" 
                    variants={container} 
                    className={styles.inner}>
                    <div className={styles.main} >
                        <motion.h1 variants={item} className={styles.title}>
                        {locale?.startPage?.start_hero_title}
                        <br></br>
                        <span>{locale?.startPage?.start_hero_subtitle}</span>  
                        </motion.h1>
                        <motion.div variants={item} className={styles.subtitle}>
                            {locale?.startPage?.start_hero_steps}
                        </motion.div>
                        <div className={styles.adv}>
                        {parse(locale?.startPage?.start_hero_adv)}
                        </div>
                        <div className={styles.selects}>
                            <motion.div variants={item}>
                                <SelectSex
                                    value={sex}
                                    onSelect={(e) => {
                                        sexChange(e)
                                        if(e === 'male') {
                                            Router.push('/signup?gender=male')
                                        }
                                        if(e === 'female') {
                                            Router.push('/signup?gender=female')
                                        }
                                    }}
                                    />
                            </motion.div>
                        </div>
                        
                    </div>
                    <div className={styles.motion}>
                           
                            <motion.div 
                                className={styles.phones}
                                style={{scale}}
                                >
                                <motion.div animate={{
                                            y: ['0px', '-20px', '0px']
                                        }}
                                        transition={{
                                        duration: 2,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1],
                                        repeat: Infinity,
                                        repeatDelay: 0
                                        }} className={`${styles.cloud} ${styles.cloud_1}`}><Image src={cloud1} alt=''/></motion.div >
                                <motion.div animate={{
                                            y: ['0px', '-20px', '0px']
                                        }}
                                        transition={{
                                        duration: 2.4,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1],
                                        repeat: Infinity,
                                        }} className={`${styles.cloud} ${styles.cloud_2}`}><Image src={cloud2} alt=''/></motion.div >
                                <motion.div animate={{
                                            y: ['0px', '-20px', '0px']
                                        }}
                                        transition={{
                                        duration: 2.4,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1],
                                        repeat: Infinity,
                                        }} className={`${styles.cloud} ${styles.cloud_3}`}><Image src={cloud3} alt=''/></motion.div >
                                <motion.div animate={{
                                            y: ['0px', '-20px', '0px']
                                        }}
                                        transition={{
                                        duration: 2,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1],
                                        repeat: Infinity,
                                        repeatDelay: 0
                                        }} className={`${styles.cloud} ${styles.cloud_4}`}><Image src={cloud4} alt=''/></motion.div >
                                <motion.div animate={{
                                            y: ['0px', '-20px', '0px']
                                        }}
                                        transition={{
                                        duration: 2.4,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1],
                                        repeat: Infinity,
                                        }} className={`${styles.cloud} ${styles.cloud_5}`}><Image src={cloud5} alt=''/></motion.div >
                                <motion.div animate={{
                                            y: ['0px', '-20px', '0px']
                                        }}
                                        transition={{
                                        duration: 2,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1],
                                        repeat: Infinity,
                                        repeatDelay: 0
                                        }} className={`${styles.cloud} ${styles.cloud_6}`}><Image src={cloud6} alt=''/></motion.div >
                                <motion.div animate={{
                                            y: ['0px', '-20px', '0px']
                                        }}
                                        transition={{
                                        duration: 2.4,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1],
                                        repeat: Infinity,
                                        }} className={`${styles.cloud} ${styles.cloud_7}`}><Image src={cloud7} alt=''/></motion.div >
                                <motion.div animate={{
                                            y: ['0px', '-20px', '0px']
                                        }}
                                        transition={{
                                        duration: 2,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1],
                                        repeat: Infinity,
                                        repeatDelay: 0
                                        }} className={`${styles.cloud} ${styles.cloud_8}`}><Image src={cloud8} alt=''/></motion.div >
                                <motion.div animate={{
                                            y: ['0px', '-20px', '0px']
                                        }}
                                        transition={{
                                        duration: 2.4,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1],
                                        repeat: Infinity,
                                        }} className={`${styles.hero_stars}`}><Image src={stars} alt=''/></motion.div >
                                    <motion.div animate={{
                                            y: ['0px', '-20px', '0px']
                                        }}
                                        transition={{
                                        duration: 2.4,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1],
                                        repeat: Infinity,
                                        }} className={`${styles.hero_stars_2}`}><Image src={stars} alt=''/></motion.div >
                                <motion.div animate={{
                                            y: ['0px', '-20px', '0px']
                                        }}
                                        transition={{
                                        duration: 2,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1],
                                        repeat: Infinity,
                                        repeatDelay: 0
                                        }} className={`${styles.heart_2}`}><Image src={heart2} alt=''/></motion.div >
                                     <motion.div animate={{
                                            y: ['0px', '-20px', '0px']
                                        }}
                                        transition={{
                                        duration: 2,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1],
                                        repeat: Infinity,
                                        repeatDelay: 0
                                        }} className={`${styles.arrow_1}`}><Image src={arrow1} alt=''/></motion.div >
                                     <motion.div animate={{
                                            y: ['0px', '-20px', '0px']
                                        }}
                                        transition={{
                                        duration: 2,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1],
                                        repeat: Infinity,
                                        repeatDelay: 0
                                        }} className={`${styles.arrow_2}`}><Image src={arrow2} alt=''/></motion.div >
                                <motion.div  
                                    variants={item} 
                                    className={`${styles.item} ${styles.item_1}`}>
                                    <motion.div
                                        animate={{
                                            y: ['0px', '-20px', '0px']
                                        }}
                                        transition={{
                                        duration: 2.4,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1],
                                        repeat: Infinity,
                                        }}
                                        >
                                        <Image
                                            src={phone1}
                                            alt={'phone 1'}
                                            />
                                    </motion.div>
                                </motion.div>
                                <motion.div 
                                    variants={item}
                                    className={`${styles.item} ${styles.item_2}`}>
                                    <motion.div
                                        animate={{
                                            y: ['0px', '-20px', '0px']
                                        }}
                                        transition={{
                                        duration: 2,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1],
                                        repeat: Infinity,
                                        repeatDelay: 0
                                        }}
                                        >
                                        <Image
                                            src={phone2}
                                            alt={'phone 2'}
                                            />
                                    </motion.div>
                                    
                                </motion.div>
                                {/* <motion.div
                                    className={styles.}
                                    >

                                </motion.div> */}
                            </motion.div>
                    </div>
                    <div className={styles.action}>
                        <Row gutter={[15,15]}>
                            <Col span={24}><Button onClick={() => Router.push('/signup')} text={locale?.global?.header.join_btn} fill middle/></Col>
                            <Col span={24}><Button onClick={() => setLoginModal(true)} text={locale?.global?.header?.login_btn} fill middle/></Col>
                            <Col span={24}><Button load={enableInstall ? true : false} onClick={() => installEvent?.prompt && installEvent?.prompt()} className='get-pwa-btn' text={'Get App'} fill middle/></Col>
                        </Row>
                    </div>
                </motion.div>
            </Container>
        </div>
    )
}

export default Hero;