import styles from './ImageCropModal.module.scss';
import { Modal } from 'antd';
import {FC} from 'react';
import { modalPropsType } from '@/models/modalTypes';
import Button from '@/components/Button/Button';
import {Row, Col} from 'antd';


const ImageCropModal:FC<modalPropsType> = ({
    open,
    onClose
}) => {

    const onCancel = () => {
        onClose()
    }



    return (
        <Modal
            open={open}
            width={620}
            onCancel={onCancel}
            className={`${styles.wrapper} modal`}
            >
            <div className={styles.head}>Выбранная область будет показана на Вашей странице</div>
            <div className={styles.main}></div>
            <div className={styles.action}>
                <Row gutter={[10, 10]}>
                    <Col span={12}>
                        <Button
                            text='Сохранить'
                            style={{padding: '8px 10px', fontSize: 18}}
                            />
                    </Col>
                    <Col span={12}>
                        <Button
                            style={{padding: '8px 10px', fontSize: 18}}
                            text='Отменить'
                            variant={'bordered'}
                            />
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}

export default ImageCropModal;