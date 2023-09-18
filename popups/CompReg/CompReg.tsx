import styles from './CompReg.module.scss';
import { FC } from 'react'
import {Modal, ModalFuncProps} from 'antd'
import Image from 'next/image';
import {Row, Col} from 'antd';
import img from '@/public/assets/images/comp-reg.svg';
import Button from '@/components/Button/Button';
import { useWindowSize } from 'usehooks-ts';

const CompReg:FC<ModalFuncProps> = (props) => {
  const {width} = useWindowSize()
  return (
    <Modal
      {...props}
      >
      <Row gutter={[20,20]}>
        <Col span={24}>
          <Image
            src={img}
            alt=''
            />
        </Col>
        <Col span={24}>
          <h3 className={styles.title}>Complete Your Registration</h3>
        </Col>
        <Col span={24}>
          <div className={styles.text}>
          To send messages, you need to complete your registration!
          </div>
        </Col>
        <Col span={24}>
          <div className={styles.action}>
            <Button
              text='Complete registration'
              middle={width <= 768}
              />
          </div>
        </Col>
      </Row>
    </Modal>
  )
}

export default CompReg;