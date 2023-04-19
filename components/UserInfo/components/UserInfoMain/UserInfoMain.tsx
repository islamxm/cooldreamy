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

        prompt_career_id,
        prompt_relationship_id,
        prompt_finance_state_id,
        prompt_target_id,
        prompt_want_kids_id
    } = props


    const [prompt_targets, setPrompt_targets] = useState<any[]>([])
    const [prompt_finance_states, setPrompt_finance_states] = useState<any[]>([])
    const [prompt_want_kids, setPrompt_want_kids] = useState<any[]>([])
    const [prompt_relationships, setPrompt_relationships] = useState<any[]>([])
    const [prompt_careers, setPrompt_careers] = useState<any[]>([])   


    useEffect(() => {
        if(token) {
            service.getAllPrompts(token).then(res => {
                setPrompt_targets(res?.prompt_targets)
                setPrompt_careers(res?.prompt_careers)
                setPrompt_finance_states(res?.prompt_finance_states)
                setPrompt_want_kids(res?.prompt_want_kids)
                setPrompt_relationships(res?.prompt_relationships)
            })
        }
    }, [token])



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
                        <div className={styles.text} style={{color: prompt_target_id ? 'var(--text)' : 'var(--red)'}}>
                            {prompt_target_id && prompt_targets ? prompt_targets.find(i => i?.id === prompt_target_id)?.text : 'Не указано'}
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Финансовые предпочтения
                        </div>
                        <div className={styles.text} style={{color: prompt_finance_state_id ? 'var(--text)' : 'var(--red)'}}>
                            {prompt_finance_state_id && prompt_finance_states ? prompt_finance_states.find(i => i?.id === prompt_finance_state_id)?.text : 'Не указано'}
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Карьера
                        </div>
                        <div className={styles.text} style={{color: prompt_career_id ? 'var(--text)' : 'var(--red)'}}>
                            {prompt_career_id && prompt_careers ? prompt_careers.find(i => i?.id === prompt_career_id)?.text : 'Не указано'}
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Семейное положение
                        </div>
                        <div className={styles.text} style={{color: prompt_relationship_id ? 'var(--text)' : 'var(--red)'}}>
                            {prompt_relationship_id && prompt_relationships ? prompt_relationships.find(i => i?.id === prompt_relationship_id)?.text : 'Не указано'}
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Дети
                        </div>
                        <div className={styles.text} style={{color: prompt_want_kids_id ? 'var(--text)' : 'var(--red)'}}>
                            {prompt_want_kids_id && prompt_want_kids ? prompt_want_kids.find(i => i?.id === prompt_want_kids_id)?.text : 'Не указано'}
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