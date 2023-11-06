import styles from './styles.module.scss';
import { FC } from 'react'
import {Modal, ModalFuncProps, Row, Col} from 'antd'
import getClassNames from '@/helpers/getClassNames';
import Button from '@/components/Button/Button';
import Router from 'next/router';
import img from '@/public/assets/images/download-app-modal-img.svg';
import Image from 'next/image';

const DownloadAppModal:FC<ModalFuncProps> = (props) => {
  return (
    <Modal
      {...props}
      className={getClassNames([styles.wrapper, 'modal'])}
      >
      <Row gutter={[25,25]}>
        <Col span={24}>
          <div className={styles.img}>
            <Image 
              src={img}
              alt=''
              />
          </div>
        </Col>
        <Col span={24}>
          <Row gutter={[10,10]}>
            <Col span={24}>
              <h3 className={styles.title}>Get more messages</h3>
            </Col>
            <Col span={24}>
              <div className={styles.text}>
                <p>
                Install the app and get more messages.
                </p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{justifyContent: 'center'}}>
          <Button
            text='Install'
            middle
            fill
            onClick={() => Router.push('/store-play')}
            />
        </Col>
      </Row>
    </Modal>
  )
}

export default DownloadAppModal;