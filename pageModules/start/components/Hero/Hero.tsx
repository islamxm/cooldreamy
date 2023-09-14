import styles from './Hero.module.scss';
import { FC, useEffect } from 'react';
import Container from '@/components/Container/Container';
import SelectSex from '@/components/SelectSex/SelectSex';
import { useState } from 'react';
import {Row, Col} from 'antd';
import Link from 'next/link';
import {container, item} from '../../../../helpers/variantsOrderAnim';
import Image from 'next/image';
import phone1 from '@/public/assets/images/phone-1.svg';
import phone2 from '@/public/assets/images/phone-2.svg';
import { motion, useScroll, useTransform } from "framer-motion";
import { useAppSelector } from '@/hooks/useTypesRedux';
import Router from 'next/router';
import Button from '@/components/Button/Button';
import LoginModal from '@/components/LoginModal/LoginModal';
import Input from '@/components/Input/Input';
import BirthdaySelect from '@/pageModules/signup/components/BirthdaySelect/BirthdaySelect';
import img from '@/public/assets/images/start-hero-bg.png';
import getClassNames from '@/helpers/getClassNames';


const Hero: FC = ({}) => {
    const [sex, setSex] = useState<'male' | 'female'>()
    const {scrollYProgress} = useScroll()
    const {locale} = useAppSelector(s => s)
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const [loginModal, setLoginModal] = useState(false)

    const [install, setInstall] = useState<any>(null)
    

    const sexChange = (value: 'male' | 'female') => {
        setSex(value)
    }

    const getInstallEvent = (e:any) => {
        e?.preventDefault()
        setInstall(e)
    }

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', getInstallEvent)
    }, [])

    

    

    const onInstall = () => {
        if(install) {
            install?.prompt()
            install?.userChoice.then((choiceResult:any) => {
                if (choiceResult?.outcome === 'accepted') {
                  console.log('User accepted the A2HS prompt');
                } else {
                  console.log('User dismissed the A2HS prompt');
                }
                setInstall(null)
              });
        }
    }


    return (
        <div className={getClassNames([styles.hero])}>
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
                        </motion.h1>
                        <motion.div variants={item} className={styles.subtitle}>
                            {locale?.startPage?.start_hero_subtitle}
                        </motion.div>
                        <motion.div className={styles.form}>
                            <Row gutter={[10,10]}>
                                <Col span={24}>
                                    <Input
                                        placeholder='Username'
                                        />
                                </Col>
                                <Col span={24}>
                                    <Input
                                        placeholder='E-mail'
                                        />
                                </Col>
                                <Col span={24}>
                                    <Input
                                        placeholder='Password'
                                        type='password'
                                        />
                                </Col>
                                <Col span={24}>
                                    <BirthdaySelect
                                        
                                        />
                                </Col>
                                <Col span={24}>
                                    <div className={styles.terms}>
                                        Продолжив, Вы принимаете <Link href={'/'}>условия пользовательского соглашения и конфидициальности</Link>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className={styles.action}>
                                        <Button
                                            text='Найти свою пару'
                                            middle
                                            />
                                    </div>
                                </Col>
                            </Row>
                        </motion.div>
                        {/* <div className={styles.adv}>
                        {parse(locale?.startPage?.start_hero_adv)}
                        </div> */}
                        {/* <div className={styles.selects}>
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
                        </div> */}
                    </div>
                    <div className={styles.action}>
                        <Row gutter={[15,15]}>
                            <Col span={24}>
                                <Button 
                                    onClick={() => Router.push('/signup')} 
                                    text={locale?.global?.header.join_btn} 
                                    fill 
                                    middle/>
                            </Col>
                            <Col span={24}>
                                <Button 
                                    onClick={() => setLoginModal(true)} 
                                    text={locale?.global?.header?.login_btn} 
                                    fill 
                                    middle/>
                            </Col>
                            {/* <Col span={24}>
                                <Button
                                    disabled={!install}
                                    onClick={onInstall}
                                    text='Install'
                                    middle
                                    fill
                                    />
                            </Col> */}
                        </Row>
                    </div>
                </motion.div>
            </Container>
        </div>
    )
}

export default Hero;