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
                    <div className={styles.head}></div>
                </Col>
            </Row>
        </Modal>
    )
}

export default VerifyEmailModal;