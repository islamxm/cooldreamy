import styles from './UserMain.module.scss';
import { Row, Col } from 'antd';
import {RiPencilLine} from 'react-icons/ri';
import Badge from '@/components/Badge/Badge';

const UserMain = () => {
    return (
        <div className={styles.wrapper}>
            <Row gutter={[10,10]}>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            О себе
                            <button><RiPencilLine/></button>
                        </div>
                        <div className={styles.text} style={{color: 'var(--red)'}}>
                            Не указано
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Цели знакомства
                            <button><RiPencilLine/></button>
                        </div>
                        <div className={styles.text}>
                            Постоянные отношения
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Личные расходы
                            <button><RiPencilLine/></button>
                        </div>
                        <div className={styles.text}>
                            Обсуждаемые
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Внешность
                            <button><RiPencilLine/></button>
                        </div>
                        <div className={styles.text}>
                            Рост 180
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Личная информация
                            <button><RiPencilLine/></button>
                        </div>
                        <div className={styles.text}>
                            Близнецы
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Интересы
                            <button><RiPencilLine/></button>
                        </div>
                        <div className={styles.interests}>
                            <div className={styles.item}>
                                <Badge/>
                                Музыка,
                            </div>
                            <div className={styles.item}>
                                <Badge/>
                                Путешествия
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default UserMain;