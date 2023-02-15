import styles from './UserInfoMain.module.scss';
import {FC} from 'react';
import Badge from '@/components/Badge/Badge';
import { Row, Col } from 'antd';

const UserInfoMain:FC = () => {

    return (
        <div className={styles.wrapper}>
            <Row gutter={[10,10]}>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            О себе
                        </div>
                        <div className={styles.text}>
                        Я надежный матрос, при шторме не сбегу с корабля.
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Подарки
                        </div>
                        {/* <div className={styles.text}>
                        Я надежный матрос, при шторме не сбегу с корабля.
                        </div> */}
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Цели знакомства
                        </div>
                        <div className={styles.text}>
                        Путешествовать вместе, постоянные отношения
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Личные расходы
                        </div>
                        <div className={styles.text}>
                            Обсуждаемые
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Интересы
                        </div>
                        <div className={styles.interests}>
                            <div className={styles.item}>
                                <Badge/>
                                Музыка,
                            </div>
                            <div className={styles.item}>
                                <Badge/>
                                Путешествия.,
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Личная информация
                        </div>
                        <div className={styles.text}>
                            Детей нет, работаю в IT
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default UserInfoMain;