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
import Router, { useRouter } from 'next/router';
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
import StepEx from '../../steps/StepEx/StepEx';
import StepMail from '../../steps/StepMail/StepMail';
import { IUser } from '@/models/IUser';
import notify from '@/helpers/notify';




const service = new ApiService()


const Body:FC = () => {
    const {width} = useWindowSize()
    // !! для теста
    const {token, locale} = useAppSelector(s => s)
    const [load, setLoad] = useState(false)
    const router = useRouter()

    const dispatch = useAppDispatch()
    const [currentStep, setCurrentStep] = useState(0)
    const [nextBtn, setNextBtn] = useState(false)

    // 1 STEP
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    const [sex, setSex] = useState<'male' | 'female'>('male')
    const [avatar, setAvatar] = useState<File | null | undefined>(null)
    const [about, setAbout] = useState('')
    const [birthday, setBirthday] = useState<any>('')

    const [countryDef, setCountryDef] = useState<any>(null)
    const [stateDef, setStateDef] = useState<any>(null)
    const [country, setCountry] = useState<any>()
    const [state, setState] = useState<any>()
    const [language, setLanguage] = useState<any>(null)
    const [btnDisable, setBtnDisable] = useState(false)


    const [errors, setErrors] = useState<{name: string[], email: string[], password: string[]}>({
        name: [],
        email: [],
        password: []
    })


    useEffect(() => {
        service.getLocation().then(res => {
            setCountryDef(res?.country)
            setStateDef(res?.state)
        })
    }, [])


    useEffect(() => {
        if(router?.query?.gender && typeof router?.query?.gender === 'string' && (router?.query?.gender === 'male' || router?.query?.gender === 'female')) {
            setSex(router?.query?.gender)
        }
    }, [router])

    
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
        //'738|abgZ1qn50aw7aV1Ebu0CniaWwoKNe2ldnukOCVZM'
        if(token && router?.locale) {
            service.getAllPrompts(token, router.locale).then(res => {
                setPrompt_targets(res?.prompt_targets)
                setPrompt_careers(res?.prompt_careers)
                setPrompt_finance_states(res?.prompt_finance_states)
                setPrompt_sources(res?.prompt_sources)
                setPrompt_interests(res?.prompt_interests)
                setPrompt_want_kids(res?.prompt_want_kids)
                setPrompt_relationships(res?.prompt_relationships)
            })
        }
        
        
    }, [token, router])


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
                return <StepEx language={language} setLanguage={setLanguage} country={country} setCountry={setCountry} state={state} setState={setState}/>
            case 2:
                return <Step2 list={prompt_targets} selectedList={selectedTargets} setSelectedList={setSelectedTargets}/>
            case 3:
                return <Step3 list={prompt_interests} selectedList={selectedInterests} setSelectedList={setSelectedIntersets}/>
            case 4:
                return <Step4 list={prompt_finance_states} selectedList={selectedFinance} setSelectedList={setSelectedFinance}/>
            case 5:
                return <Step5 list={prompt_sources} selectedList={selectedSources} setSelectedList={setSelectedSources}/>
            case 6:
                return <Step6 list={prompt_want_kids} selectedList={selectedKids} setSelectedList={setSelectedKids}/>
            case 7:
                return <Step7 list={prompt_relationships} selectedList={selectedRl} setSelectedList={setSelectedRl}/>
            case 8:
                return <Step8 list={prompt_careers} selectedList={selectedCareers} setSelectedList={setSelectedCareers}/>
            case 9:
                return <Step9 nextStep={() => setCurrentStep(s => s + 1)}/>
            case 10:
                return <Step10 about={about} setAbout={setAbout}/>
            // case 11:
            //     return <StepMail/>
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
     
        if(currentStep > 0 && currentStep < 10) {
            setCurrentStep(s => s + 1)
        }
      
        if(currentStep === 10) {
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
                        // 
                        service.getMyProfile(token).then(profile => {
                            console.log(profile)
                            if(!profile?.avatar_url) {
                                Router.push(`/profile`)
                            } else Router.push(`/search`)
                        })
                    }
                    
                }).then(() => {
                    service.signupEnd(token).finally(() => setLoad(false))
                })
            }
        }
    }


    useEffect(() => {
        if(currentStep === 1 && token && birthday) {
            service.updateMyProfile({birthday: birthday}, token)
        }
    }, [currentStep, token, birthday, about])

    useEffect(() => {
        if(currentStep === 2 && token) {
            service.setExUserData(token, {
                language: language ? language : 'en',
                country: country?.label ? country?.label : countryDef,
                state: (country?.label && state?.label) ? state?.label : (state?.label ? state?.label : stateDef)
            }).then(res => {
                console.log(res)
            })
        }
    }, [currentStep, token, countryDef, country, stateDef, state])

    

    useEffect(() => {
        if(currentStep === 0) {
            if(!(email && name && password && sex && birthday)) {
                setBtnDisable(true)
            } else {
                setBtnDisable(false)
            }
        }
        if(currentStep === 2) {
            if(selectedTargets?.length < 1 || selectedTargets?.length > 3) {
                setBtnDisable(true)
            } else setBtnDisable(false)
        }
        if(currentStep === 3) {
            if(selectedInterests?.length < 5 || selectedCareers?.length > 5) {
                setBtnDisable(true)
            } else setBtnDisable(false)
        }
        if(currentStep === 4) {
            if(selectedFinance?.length !== 1) {
                setBtnDisable(true)
            } else setBtnDisable(false)
        }
        if(currentStep === 5) {
            if(selectedSources?.length !== 1) {
                setBtnDisable(true)
            } else setBtnDisable(false)
        }
        if(currentStep === 6) {
            if(selectedKids?.length !== 1) {
                setBtnDisable(true)
            } else setBtnDisable(false)
        }
        if(currentStep === 7) {
            if(selectedRl?.length !== 1) {
                setBtnDisable(true)
            } else setBtnDisable(false)
        }
        if(currentStep === 8) {
            if(selectedCareers?.length !== 1) {
                setBtnDisable(true)
            } else setBtnDisable(false)
        }
        if(currentStep === 10) {
            if(about?.length < 20 || about?.length > 200) {
                setBtnDisable(true)
            } else setBtnDisable(false)
        }

    }, [currentStep, selectedCareers, selectedTargets, selectedSources, selectedFinance, selectedInterests, selectedKids, selectedRl, email, name, password, birthday, about])

   

    return (
        <div className={styles.body}>
            <Container>
                <div className={styles.inner}>
                    <Col span={24}>
                        <Row gutter={[24,24]}>
                            <Col span={24}>
                                <h2 className="block-title center">
                                    {locale?.signupPage.main.title}
                                </h2>
                            </Col>
                            <Col span={24}>
                                <div className={styles.panel}>
                                    <div className={styles.head}>
                                        <StepLine
                                            total={11}
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
                                                        middle={width <= 768}
                                                        onClick={stepChange}
                                                        disabled={btnDisable}
                                                        text={currentStep === 10 ? locale?.signupPage.main.end_btn : locale?.signupPage.main.next_btn}
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

