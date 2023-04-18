import {Modal, ModalFuncProps, Row, Col} from 'antd';
import {FC} from 'react';
import { IEditModal } from '../type';
import styles from './EditModalPl.module.scss';
import Button from '@/components/Button/Button';


interface I extends IEditModal {
    promptList: any[]
}


const EditModalPl:FC<I> = (props) => {
    const {head} = props;

    return (
        <Modal
            {...props}
            width={700}
            footer={false}
            className={`modal ${styles.wrapper}`}
            >
            <Row gutter={[20,20]}>
                <Col span={24}>
                    <h3 className={styles.head}>{head}</h3>
                </Col>
                <Col span={24}>
                    <div className={styles.body}>

                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.action}>
                        <Row gutter={[15,15]}>
                            <Col span={12}>
                                <Button
                                    style={{width: '100%'}}
                                    text='Отмена'
                                    variant={'danger'}
                                    />
                            </Col>
                            <Col span={12}>
                                <Button
                                    style={{width: '100%'}}
                                    text='Сохранить'
                                    />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Modal>
    )
}


export default EditModalPl;