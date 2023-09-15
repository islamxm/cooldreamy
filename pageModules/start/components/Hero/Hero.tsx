import styles from './Hero.module.scss';
import { ChangeEvent, FC, useEffect } from 'react';
import Container from '@/components/Container/Container';
import { useState } from 'react';
import {Row, Col} from 'antd';
import Link from 'next/link';
import {container, item} from '../../../../helpers/variantsOrderAnim';
import { motion, useScroll, useTransform } from "framer-motion";
import { useAppSelector } from '@/hooks/useTypesRedux';
import Router from 'next/router';
import Button from '@/components/Button/Button';
import LoginModal from '@/components/LoginModal/LoginModal';
import Input from '@/components/Input/Input';
import BirthdaySelect from '@/pageModules/signup/components/BirthdaySelect/BirthdaySelect';
import getClassNames from '@/helpers/getClassNames';
import ApiService from '@/service/apiService';
import { useAppDispatch } from '@/hooks/useTypesRedux';
import { updateUserData, updateToken } from '@/store/actions';
import LOCAL_STORAGE from '@/helpers/localStorage';
import { useRouter } from 'next/router';
const service = new ApiService()

const Hero: FC = ({}) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {scrollYProgress} = useScroll()
    const {locale} = useAppSelector(s => s)
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const [loginModal, setLoginModal] = useState(false)

    const [install, setInstall] = useState<any>(null)
    const [load, setLoad] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthday, setBirthday] = useState<any>()
    const [sex, setSex] = useState<'male' | 'female'>('male')

    const [registered, setRegistered] = useState(false)
    
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



    const onSubmit = () => {
        if(email && password && birthday && sex && name) {
            setLoad(true)
            service.register({
                name,
                password,
                email,
            }).then(res => {
                if(res?.token) {
                    service.updateMyProfile({
                        gender: sex,
                        birthday
                    }, res?.token).then(data => {
                        if(data?.id) {
                            dispatch(updateToken(res?.token))
                            dispatch(updateUserData(data))
                            LOCAL_STORAGE?.setItem('cooldate-web-user-id', res?.id)
                            LOCAL_STORAGE?.setItem('cooldate-web-token', res?.token)
                            Router?.push('/signup?signup_step=1', undefined, {shallow: true})
                        }
                    })
                }
            })
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
                                    {/* <SelectSex
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
                                        /> */}
                                    <div className={styles.sex}>
                                        <Row gutter={[4,4]}>
                                            <Col span={12}>
                                                <div onClick={() => setSex('male')} className={getClassNames([styles.sex_item, sex === 'male' && styles.active, styles.male])}>
                                                    I am a man
                                                </div>
                                            </Col>
                                            <Col span={12}>
                                                <div onClick={() => setSex('female')} className={getClassNames([styles.sex_item, sex === 'female' && styles.active, styles.female])}>
                                                    I am a woman
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <Input
                                        placeholder='Username'
                                        value={name}
                                        onChange={(e:ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                        />
                                </Col>
                                <Col span={24}>
                                    <Input
                                        placeholder='E-mail'
                                        value={email}
                                        onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                        />
                                </Col>
                                <Col span={24}>
                                    <Input
                                        placeholder='Password'
                                        type='password'
                                        value={password}
                                        onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                        />
                                </Col>
                                <Col span={24}>
                                    <BirthdaySelect
                                        minAge={18}
                                        maxAge={70}
                                        setValue={setBirthday}
                                        value={birthday}
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
                                            load={load}
                                            onClick={onSubmit}
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
                                
                            </motion.div>
                        </div> */}
                    </div>
                    <div className={styles.action}>
                        <Row gutter={[15,15]}>
                            <Col span={24}>
                                <Button 
                                    // onClick={() => Router.push('/signup')} 
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