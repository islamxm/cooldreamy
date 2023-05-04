import styles from './Body.module.scss';
import { FC } from 'react';
import Container from '@/components/Container/Container';
import { Row, Col } from 'antd';
import StepLine from '../StepLine/StepLine';
import Button from '@/components/Button/Button';
import { useEffect, useState } from 'react';
import { interestTypes, targetTypes } from '../../types';
import ApiService from '@/service/apiService';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypesRedux';
import { updateToken, updateUserId, updateUserData } from '@/store/actions';
import Router from 'next/router';
import { Cookies } from 'typescript-cookie';
import { useWindowSize } from 'usehooks-ts';

//steps
import Step1 from '../../steps/Step1/Step1';
import Step2 from '../../steps/Step2/Step2';
import Step3 from '../../steps/Step3/Step3';
import Step4 from '../../steps/Step4/Step4';
import Step5 from '../../steps/Step5/Step5';
import Step6 from '../../steps/Step6/Step6';
import Step7 from '../../steps/Step7/Step7';
import Step8 from '../../steps/Step8/Step8';
import Step9 from '../../steps/Step9/Step9';
import Step10 from '../../steps/Step10/Step10';
import { IUser } from '@/models/IUser';
import notify from '@/helpers/notify';

const service = new ApiService()


const Body:FC = () => {
    const {width} = useWindowSize()
    // !! для теста
    const {token} = useAppSelector(s => s)
    const [load, setLoad] = useState(false)


    const dispatch = useAppDispatch()
    const [currentStep, setCurrentStep] = useState(8)
    const [nextBtn, setNextBtn] = useState(false)

    // 1 STEP
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [city, setCity] = useState('')
    const [dob, setDob] = useState('')
    const [sex, setSex] = useState<'male' | 'female'>('male')
    const [avatar, setAvatar] = useState<File | null | undefined>(null)
    const [about, setAbout] = useState('')
    const [birthday, setBirthday] = useState<any>('')


    const [errors, setErrors] = useState<{name: string[], email: string[], password: string[]}>({
        name: [],
        email: [],
        password: []
    })


    
    const [prompt_targets, setPrompt_targets] = useState([])
    const [prompt_interests, setPrompt_interests] = useState([])
    const [prompt_finance_states, setPrompt_finance_states] = useState([])
    const [prompt_sources, setPrompt_sources] = useState([])
    const [prompt_want_kids, setPrompt_want_kids] = useState([])
    const [prompt_relationships, setPrompt_relationships] = useState([])
    const [prompt_careers, setPrompt_careers] = useState([])   


    const [selectedTargets, setSelectedTargets] = useState<any[]>([])
    const [selectedInterests, setSelectedIntersets] = useState<any[]>([])
    const [selectedFinance, setSelectedFinance] = useState<any[]>([])
    const [selectedSources, setSelectedSources] = useState<any[]>([])
    const [selectedKids, setSelectedKids] = useState<any[]>([])
    const [selectedRl, setSelectedRl] = useState<any[]>([])
    const [selectedCareers, setSelectedCareers] = useState<any[]>([])





    useEffect(() => {
        if('35|UZnCuTbIOcO4liLohFqV6QjMxT09XjCs59huCCPh') {
            service.getAllPrompts('35|UZnCuTbIOcO4liLohFqV6QjMxT09XjCs59huCCPh').then(res => {
                setPrompt_targets(res?.prompt_targets)
                setPrompt_careers(res?.prompt_careers)
                setPrompt_finance_states(res?.prompt_finance_states)
                setPrompt_sources(res?.prompt_sources)
                setPrompt_interests(res?.prompt_interests)
                setPrompt_want_kids(res?.prompt_want_kids)
                setPrompt_relationships(res?.prompt_relationships)
            })
        }
    }, [token])


    const switchStep = (step: number) => {
        switch(step) {
            case 0: 
                return (
                    <Step1
                        sex={sex}
                        email={email}
                        password={password}
                        name={name}
                        birthday={birthday}

                        setEmail={setEmail}
                        setPassword={setPassword}
                        setName={setName}
                        setSex={setSex}
                        setBirthday={setBirthday}
                        
                        errors={errors}
                        />
                )
            case 1:
                return <Step2 list={prompt_targets} selectedList={selectedTargets} setSelectedList={setSelectedTargets}/>
            case 2:
                return <Step3 list={prompt_interests} selectedList={selectedInterests} setSelectedList={setSelectedIntersets}/>
            case 3:
                return <Step4 list={prompt_finance_states} selectedList={selectedFinance} setSelectedList={setSelectedFinance}/>
            case 4:
                return <Step5 list={prompt_sources} selectedList={selectedSources} setSelectedList={setSelectedSources}/>
            case 5:
                return <Step6 list={prompt_want_kids} selectedList={selectedKids} setSelectedList={setSelectedKids}/>
            case 6:
                return <Step7 list={prompt_relationships} selectedList={selectedRl} setSelectedList={setSelectedRl}/>
            case 7:
                return <Step8 list={prompt_careers} selectedList={selectedCareers} setSelectedList={setSelectedCareers}/>
            case 8:
                return <Step9 nextStep={() => setCurrentStep(s => s + 1)}/>
            case 9:
                return <Step10 about={about} setAbout={setAbout}/>
            default:
                return null; 
                
        }
    }

    useEffect(() => {
        setNextBtn(false)
    }, [currentStep])




    const stepChange = () => {
        if(currentStep === 0) {
            
            setLoad(true)
            const body = {
                email,
                name,
                password,
                gender: sex
            }
            service.register(body).then(res => {
                if(res?.error) {
                    setErrors(s => ({
                        ...s,
                        ...res?.error
                    }))
                }
                if(res?.token && res?.id) {
                    setErrors({
                        email: [],
                        name: [],
                        password: []
                    })
                    dispatch(updateToken(res?.token))
                    dispatch(updateUserId(res?.id))
                    Cookies.set('cooldate-web-user-id', res?.id)
                    Cookies.set('cooldate-web-token', res?.token)

                    setCurrentStep(s => s + 1)
                }
            }).finally(() => setLoad(false))
        }
        if(currentStep > 0 && currentStep < 9 && currentStep !== 8) {
            setCurrentStep(s => s + 1)
        }
        if(currentStep === 8) {
            
        }
        if(currentStep === 9) {
            setLoad(true)
            const updateBody: IUser = {
                prompt_careers: `[${selectedCareers?.join(',')}]`,
                prompt_finance_states: `[${selectedFinance?.join(',')}]`,
                prompt_sources: `[${selectedSources?.join(',')}]`,
                prompt_targets: `[${selectedTargets?.join(',')}]`,
                prompt_want_kids: `[${selectedKids?.join(',')}]`,
                prompt_relationships: `[${selectedRl?.join(',')}]`,
                about_self: about
            }
            if(token) {
                service.updateMyProfile(updateBody, token).then(res => {
                    if(res?.id) {
                        notify('Настройки сохранены', 'SUCCESS')
                        dispatch(updateUserData(res))
                        Router.push(`/profile`)
                    }

                }).finally(() => setLoad(false))
            }
        }
    }


    useEffect(() => {
        if(currentStep === 1 && token && birthday) {
            service.updateMyProfile({birthday: birthday}, token).then(res => {
                //
            })
        }
    }, [currentStep, token, birthday, about])


    return (
        <div className={styles.body}>
            <Container>
                <div className={styles.inner}>
                    <Col span={24}>
                        <Row gutter={[24,24]}>
                            <Col span={24}>
                                <h2 className="block-title center">
                                    Регистрация
                                </h2>
                            </Col>
                            <Col span={24}>
                                <div className={styles.panel}>
                                    <div className={styles.head}>
                                        <StepLine
                                            total={10}
                                            currentIndex={currentStep}
                                            />
                                    </div>
                                    <div className={styles.content}>
                                        {/* STEPS */}
                                        <Row gutter={[12,12]}>
                                            <Col span={24}>
                                                {/* <Step1/> */}
                                                {switchStep(currentStep)}
                                            </Col>
                                            <Col span={24}>
                                                <div className={styles.action}>
                                                    <Button
                                                        load={load}
                                                        //disabled={nextBtn}
                                                        middle={width <= 768}
                                                        onClick={stepChange}
                                                        disabled={!(email && name && password && sex && birthday)}
                                                        text={currentStep === 9 ? 'Завершить' : 'Дальше'}
                                                        />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                   
                </div>
            </Container>
        </div>
    )
}

export default Body;

