import styles from './Body.module.scss';
import { FC, useState } from 'react';
import Container from '@/components/Container/Container';
import { Row, Col } from 'antd';
import StepLine from '../StepLine/StepLine';
import Button from '@/components/Button/Button';

const Body:FC = () => {
    const [currentStep, setCurrentStep] = useState(0)


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
                                        {
                                            currentStep > 0 && (
                                                <button 
                                                    onClick={() => {
                                                        if(currentStep < 7) {
                                                            setCurrentStep(s => ++s)
                                                        }
                                                    }}
                                                    className={styles.skip}>
                                                    Пропустить
                                                </button>
                                            )
                                        }
                                    </div>
                                    <div className={styles.content}>
                                        {/* STEPS */}
                                        <Button
                                            text='Тест перехода на след.шаг'
                                            onClick={() => {
                                                if(currentStep < 7) {
                                                    setCurrentStep(s => ++s)
                                                }
                                            }}
                                            />
                                            <Button
                                            text='Тест перехода на пред.шаг'
                                            onClick={() => {
                                                if(currentStep > 0) {
                                                    setCurrentStep(s => --s)
                                                }
                                            }}
                                            />
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