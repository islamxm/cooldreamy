import styles from './UserMain.module.scss';
import { Row, Col } from 'antd';
import {RiPencilLine} from 'react-icons/ri';
import Badge from '@/components/Badge/Badge';
import { IUser } from '@/models/IUser';
import {FC} from 'react'

const UserMain:FC<IUser> = (props) => {

    const {
        about_self,
        prompt_target_id
    } = props

    return (
        <div className={styles.wrapper}>
            <Row gutter={[10,10]}>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            О себе
                            <button><RiPencilLine/></button>
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
                            <button><RiPencilLine/></button>
                        </div>
                        <div className={styles.text} style={{color: prompt_target_id ? 'var(--text)' : 'var(--red)'}}>
                            {prompt_target_id ? prompt_target_id : 'Не указано'}
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Личные расходы
                            <button><RiPencilLine/></button>
                        </div>
                        <div className={styles.text} style={{color: 'var(--red)'}}>
                            {'Не указано'}
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Внешность
                            <button><RiPencilLine/></button>
                        </div>
                        <div className={styles.text} style={{color: 'var(--red)'}}>
                            {'Не указано'}
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Личная информация
                            <button><RiPencilLine/></button>
                        </div>
                        <div className={styles.text} style={{color: 'var(--red)'}}>
                            {'Не указано'}
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Интересы
                            <button><RiPencilLine/></button>
                        </div>
                        <div className={styles.interests} style={{color: 'var(--red)'}}>
                            <div className={styles.text} style={{color: 'var(--red)', marginLeft: 5}}>
                                {'Не указано'}
                            </div>
                            {/* <div className={styles.item}>
                                <Badge/>
                                Музыка,
                            </div>
                            <div className={styles.item}>
                                <Badge/>
                                Путешествия
                            </div> */}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default UserMain;