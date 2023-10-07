import { ChangeEvent, FC, useState } from 'react';
import styles from './ResetPassModal.module.scss';
import {Modal, ModalFuncProps, Row, Col} from 'antd'
import getClassNames from '@/helpers/getClassNames';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { useAppSelector } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import { useWindowSize } from 'usehooks-ts';

type statusType = 'INIT' | 'SENT' | 'NEWPASS'

const service = new ApiService()

const ResetPassModal:FC<ModalFuncProps> = (props) => {
  const {width} = useWindowSize()
  const [status, setStatus] = useState<statusType>('INIT')

  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [load, setLoad] = useState(false)
  const [token, setToken] = useState('')


  const onSubmit = () => {
    setLoad(true)
    if(status === 'INIT') {
      service.getResetCode({body: {email}}).then(res => {
        console.log(res)
      }).finally(() => {
        setLoad(false)
      })
    }
    if(status === 'SENT') {
      service.sendReestCode({body: {email, code}}).then(res => {
        console.log(res)
      }).finally(() => {
        setLoad(false)
      })
      
    }
    if(status === 'NEWPASS') {
      if(token) {
        service.changePassword({token, body: {password, password_confirmation: password}}).then(res => {
          console.log(res)
        }).finally(() => {
          setLoad(false)
        })
      }
    }
   
  }

  const setDisabled = () => {
    if(status === 'INIT' && !email) {
      return true
    } else if(status === 'SENT' && !code) {
      return true
    } else if(status === 'NEWPASS' && !password) {
      return true
    } else {
      return false
    }
  }


  return (
    <Modal
      {...props}
      className={getClassNames([styles.wrapper, 'modal'])}
      width={360}
      footer={false}
      >
      <Row gutter={[20,20]}>
        <Col span={24}>
          <div className={styles.head}>
            <Row gutter={[10,10]}>
              <Col span={24}>
                <div className={styles.title}>Восстановление пароля</div>
              </Col>
              <Col span={24}>
                <div className={styles.text}>
                  {status === 'INIT' && 'Введите вашу электронную почту, мы отправим на него письмо.'}
                  {status === 'SENT' && 'Введите код из письма. Если письмо не пришло проверьте страницу ”Спам”.'}
                  {status === 'NEWPASS' && 'Пароль должен содержать не менее 6 символов.'}
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={24}>
          {status === 'INIT' && (
            <Input
              type='email'
              value={email}
              onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder='E-mail'
              />
          )}
          {status === 'SENT' && (
            <Input
              type='number'
              placeholder='Code'
              value={code}
              onChange={(e:ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
              />
          )}
          {status === 'NEWPASS' && (
            <Input
              placeholder='Password'
              value={password}
              type='password'
              onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
          )}
        </Col>
        <Col span={24}>
          <Button
            fill
            text='Done'
            onClick={onSubmit}
            disabled={setDisabled()}
            load={load}
            middle={width > 0 && width <= 768}
            />
        </Col>
      </Row>
    </Modal>
  )
}

export default ResetPassModal;