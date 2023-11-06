import { FC } from 'react';
import styles from './styles.module.scss';
import {Modal, ModalFuncProps, Row, Col} from 'antd'
import getClassNames from '@/helpers/getClassNames';
import Button from '@/components/Button/Button';

const AppDownloadInfoModal:FC<ModalFuncProps> = (props) => {
  const {onCancel} = props || {}
  return (
    <Modal
      {...props}
      width={485}
      footer={null}
      className={getClassNames([styles.wrapper, 'modal'])}
      >
      <Row gutter={[25,25]}>
        <Col span={24}>
          <h3 className={styles.title}>Install the app</h3>
        </Col>
        <Col span={24}>
          <div className={styles.text}>
            <p>
              This function is only available on your phone. To get the reward, log in with your cell phone and complete the task.
            </p>
          </div>
        </Col>
        <Col style={{justifyContent: 'center'}} span={24}>
          <Button
            text='Ok'
            middle
            onClick={onCancel}
            />
        </Col>
      </Row>
    </Modal>
  )
}

export default AppDownloadInfoModal;