import styles from './VerifyEmailModal.module.scss';
import {Modal, ModalFuncProps, Row, Col} from 'antd'
import {FC} from 'react'
import { useAppSelector } from '@/hooks/useTypesRedux';
import Link from 'next/link';
import Button from '@/components/Button/Button';

const VerifyEmailModal:FC<ModalFuncProps> = (props) => {
    const {userData} = useAppSelector(s => s)


    return (
        <Modal
            {...props}
            footer={null}
            className={`${styles.wrapper} modal`}
            >
            <Row gutter={[35,35]}>
                <Col span={24}>
                    <div className={styles.head}>
                        <div className={styles.title}>
                            Подтвердите электронную почту
                        </div>
                        <div className={styles.subtitle}>
                            Данный функционал доступен только для пользователей которые подтвердили свою почту
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.body}>
                        <div className={styles.label}>Письмо отправлено на</div>
                        <div className={styles.email}>{userData?.email}</div>
                        <div className={styles.edit}><Link href={'/profile'}>Изменить email</Link></div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.action}>
                        <div className={styles.item}>
                            <Button
                                middle
                                text='Перейти в почту'
                                />
                        </div>
                        <div className={styles.item}>
                            <Button
                                middle
                                text='Отправить письмо повторно'
                                variant={'bordered'}
                                />
                        </div>
                    </div>
                </Col>
            </Row>
        </Modal>
    )
}

export default VerifyEmailModal;