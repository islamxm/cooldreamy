import styles from './SubsModal.module.scss';
import { FC } from 'react'
import {Modal, ModalFuncProps, Row, Col} from 'antd'
import getClassNames from '@/helpers/getClassNames';
import Button from '@/components/Button/Button';
import { useWindowSize } from 'usehooks-ts';
import { useAppDispatch } from '@/hooks/useTypesRedux';
import { updateSubsModal } from '@/store/actions';
import Router from 'next/router';

const SubsModal:FC<ModalFuncProps> = (props) => {
  const {width} = useWindowSize()
  const dispatch = useAppDispatch()

  const onGoToStore = () => {
    if(width <= 768) {
      Router.push('/deposit-mb')
    } else {
      Router.push('/premium')
    }
    dispatch(updateSubsModal(false))
  }

  return (
    <Modal
      {...props}
      footer={null}
      className={getClassNames([styles.wrapper, 'modal', 'no-close-icon'])}
      >
      <div className={styles.in}>
        <Row gutter={[15,15]}>
          <Col span={24}>
            <div className={styles.title}>
              Unlimited Communication Subscription
            </div>
          </Col>
          <Col span={24}>
            <div className={styles.icon}>

            </div>
          </Col>
          <Col span={24}>
            <div className={styles.label}>
            Get a subscription and chat freely!
            </div>
          </Col>
          <Col span={24}>
            <div className={styles.text}>
              With your subscription, you can chat without limits and enjoy free allowances for sending and receiving photo or video content.
            </div>
          </Col>
          <Col span={24}>
            <div className={styles.action}>
              <Button
                text='Go to store'
                middle={width <= 768}
                onClick={onGoToStore}
                />
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  )
}

export default SubsModal;