import styles from './Body.module.scss';
import { FC } from 'react';
import Container from '@/components/Container/Container';
import { Row, Col } from 'antd';
import StepLine from '../StepLine/StepLine';
import Button from '@/components/Button/Button';
import { useEffect, useState } from 'react';
import { interestTypes, targetTypes } from '../../types';
import ApiService from '@/service/apiService';
import { useAppDispatch } from '@/hooks/useTypesRedux';
import { updateToken, updateUserId } from '@/store/actions';
import Router from 'next/router';
import { Cookies } from 'typescript-cookie';

//steps
import Step1 from '../../steps/Step1/Step1';
import Step2 from '../../steps/Step2/Step2';
import Step3 from '../../steps/Step3/Step3';
import Step4 from '../../steps/Step4/Step4';
import Step5 from '../../steps/Step5/Step5';
import Step6 from '../../steps/Step6/Step6';
import Step7 from '../../steps/Step7/Step7';
import Step8 from '../../steps/Step8/Step8';

const service = new ApiService()


const Body:FC = () => {
    const dispatch = useAppDispatch()
    const [currentStep, setCurrentStep] = useState(0)
    const [nextBtn, setNextBtn] = useState(false)

    // 1 STEP
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [city, setCity] = useState('')
    const [dob, setDob] = useState('')
    const [sex, setSex] = useState<'male' | 'female'>('male')


    // 2 STEP
    const [target, setTarget] = useState<targetTypes>('');
    

    // 3 STEP
    const [interests, setInterests] = useState<interestTypes[]>([''])
    
    
    // 4 STEP





    const switchStep = (step: number) => {
        switch(step) {
            case 0: 
                return (
                    <Step1
                        sex={sex}
                        email={email}
                        password={password}
                        name={name}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setName={setName}
                        setSex={setSex}
                        />
                )
            case 1:
                return <Step2/>
            case 2:
                return <Step3/>
            case 3:
                return <Step4/>
            case 4:
                return <Step5/>
            case 5:
                return <Step6/>
            case 6:
                return <Step7/>
            case 7:
                return <Step8/>
            default:
                return null; 
                
        }
    }

    useEffect(() => {
        setNextBtn(false)
    }, [currentStep])



    const onRegister = () => {
        const body = {
            email,
            name,
            password,
            gender: sex
        }
        service.register(body).then(res => {
            console.log(res)
            if(res?.token && res?.id) {
                dispatch(updateToken(res?.token))
                dispatch(updateUserId(res?.id))
                Cookies.set('cooldate-web-user-id', res?.id)
                Cookies.set('cooldate-web-token', res?.token)
                
                Router.push('/search')
            }
        })
    }



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
                                            total={8}
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
                                                        // disabled={nextBtn}
                                                        // onClick={() => setCurrentStep(s => s < 7 ? ++s : 7)}
                                                        disabled={!(email && name && password && sex)}
                                                        onClick={onRegister}
                                                        text='Регистрация'
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