import styles from './UserInfoMain.module.scss';
import {FC, useState, useEffect} from 'react';
import Badge from '@/components/Badge/Badge';
import { Row, Col } from 'antd';
import { IUser } from '@/models/IUser';
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';

const service = new ApiService()

const UserInfoMain:FC<IUser> = (props) => {
    const {token} = useAppSelector(s => s)

    const {
        about_self,
        
        prompt_careers,
        prompt_relationships,
        prompt_finance_states,
        prompt_targets,
        prompt_want_kids
    } = props


    // const [prompt_targets_list, setPrompt_targets_list] = useState<any[]>([])
    // const [prompt_finance_states_list, setPrompt_finance_states_list] = useState<any[]>([])
    // const [prompt_want_kids_list, setPrompt_want_kids_list] = useState<any[]>([])
    // const [prompt_relationships_list, setPrompt_relationships_list] = useState<any[]>([])
    // const [prompt_careers_list, setPrompt_careers_list] = useState<any[]>([])   


    // useEffect(() => {
    //     if(token) {
    //         service.getAllPrompts(token).then(res => {
    //             setPrompt_targets_list(res?.prompt_targets)
    //             setPrompt_careers_list(res?.prompt_careers)
    //             setPrompt_finance_states_list(res?.prompt_finance_states)
    //             setPrompt_want_kids_list(res?.prompt_want_kids)
    //             setPrompt_relationships_list(res?.prompt_relationships)
    //         })
    //     }
    // }, [token])


    return (
        <div className={styles.wrapper}>
            <Row gutter={[10,10]}>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            О себе
                        </div>
                        <div className={styles.text} style={{color: about_self ? 'var(--text)' : 'var(--red)'}}>
                        {about_self ? about_self : 'Не указано'}
                        </div>
                    </div>
                </Col>
               <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Цели знакомства
                        </div>
                        <div className={styles.interests}>
                            {
                                prompt_targets?.length > 0 ? (
                                    prompt_targets?.map((item: any,index: number) => (
                                        <div className={styles.item} key={index}>
                                            <Badge/>
                                            {item.text}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.text} style={{color: 'var(--red)', marginLeft: 5}}>
                                        {'Не указано'}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Финансовые предпочтения
                        </div>
                        <div className={styles.interests}>
                            {
                                prompt_finance_states?.length > 0 ? (
                                    prompt_finance_states?.map((item: any,index: number) => (
                                        <div className={styles.item} key={index}>
                                            <Badge/>
                                            {item.text}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.text} style={{color: 'var(--red)', marginLeft: 5}}>
                                        {'Не указано'}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Карьера
                        </div>
                        <div className={styles.interests}>
                            {
                                prompt_careers?.length > 0 ? (
                                    prompt_careers?.map((item: any,index: number) => (
                                        <div className={styles.item} key={index}>
                                            <Badge/>
                                            {item.text}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.text} style={{color: 'var(--red)', marginLeft: 5}}>
                                        {'Не указано'}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Семейное положение
                        </div>
                        <div className={styles.interests}>
                            {
                                prompt_relationships?.length > 0 ? (
                                    prompt_relationships?.map((item: any,index: number) => (
                                        <div className={styles.item} key={index}>
                                            <Badge/>
                                            {item.text}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.text} style={{color: 'var(--red)', marginLeft: 5}}>
                                        {'Не указано'}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Дети
                        </div>
                        <div className={styles.interests}>
                            {
                                prompt_want_kids?.length > 0 ? (
                                    prompt_want_kids?.map((item: any,index: number) => (
                                        <div className={styles.item} key={index}>
                                            <Badge/>
                                            {item.text}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.text} style={{color: 'var(--red)', marginLeft: 5}}>
                                        {'Не указано'}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
                {/* <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Подарки
                        </div>
                        <div className={styles.text}>
                        Я надежный матрос, при шторме не сбегу с корабля.
                        </div>
                    </div>
                </Col> */}
            </Row>
        </div>
    )
}

export default UserInfoMain;