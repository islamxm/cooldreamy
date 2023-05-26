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


const Hero: FC = ({}) => {
    const [sex, setSex] = useState<'male' | 'female'>()
    const {scrollYProgress} = useScroll()
    const {locale} = useAppSelector(s => s)
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const [loginModal, setLoginModal] = useState(false)

    const sexChange = (value: 'male' | 'female') => {
        setSex(value)
    }

    


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
                            <div className={styles.clouds}>

                            </div>
                            <motion.div 
                                className={styles.phones}
                                style={{scale}}
                                >
                                <motion.div  
                                    variants={item} 
                                    className={styles.item}>
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
                                    className={styles.item}>
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
                            </motion.div>
                    </div>
                    <div className={styles.action}>
                        <Row gutter={[15,15]}>
                            <Col span={24}><Button onClick={() => Router.push('/signup')} text={locale?.global?.header.join_btn} fill middle/></Col>
                            <Col span={24}><Button onClick={() => setLoginModal(true)} text={locale?.global?.header?.login_btn} fill middle/></Col>
                        </Row>
                    </div>
                </motion.div>
            </Container>
        </div>
    )
}

export default Hero;