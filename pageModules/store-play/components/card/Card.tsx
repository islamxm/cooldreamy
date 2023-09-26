import styles from './Card.module.scss';
import { FC, useEffect, useState } from 'react'
import logo from '@/public/assets/images/app-logo.png';
import Image from 'next/image';
import Button from '../button/Button';
import { useWindowSize } from 'usehooks-ts';
import {Row, Col} from 'antd';
import getClassNames from '@/helpers/getClassNames';

type statusType = 'INIT' | 'WAIT' | 'LOADING' | 'INSTALL' | 'DONE';
type progressType = 1 | 2 | 3;

const Card:FC<any> = () => {
  const [status, setStatus] = useState<statusType>('INIT')
  const {width} = useWindowSize()

  const [progress, setProgress] = useState<progressType>(1)


  const switchVendorPlace = () => {
    switch(status) {
      case 'INIT':
        return 'Casino Baden-Baden inc.'
      case 'WAIT':
        return <><span>Wait...</span></>
      case 'LOADING':
        return <><span> of 28,84 MB</span></>
      case "INSTALL":
        return <><span>Installation...</span></>
      case 'DONE':
        return 'Casino Baden-Baden inc.'
    }
  }


  useEffect(() => {
    let tm:any;
    clearTimeout(tm)
    if(status && status !== 'INIT' && status !== 'DONE') {
      tm = setTimeout(() => {
        if(status === 'WAIT') {
          setStatus('LOADING')
        }
        if(status === 'LOADING') {
          setStatus('INSTALL')
        }
        if(status === 'INSTALL') {
          setStatus('DONE')
        }
      }, 5000)
    }   

    return () => {
      clearTimeout(tm)
    }
  }, [status])

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.app}>
          <div className={getClassNames([styles.icon, (status !== 'INIT' && status !== 'DONE') && styles.active])}>
            {
              (status !== 'INIT' && status !== 'DONE') && (
                <div className={getClassNames([
                  styles.circle,
                  status === 'WAIT' && styles.wait,
                  status === 'LOADING' && styles.loading,
                  status === 'INSTALL' && styles.install
                ])}>
                  {
                    status === 'LOADING' && (
                      <svg width="100" height="100" viewBox="0 0 100 100">
                        <circle stroke-linecap="round"  cx="50" cy="50" r="48" stroke="#00875F" stroke-width="4" fill="none" stroke-dasharray="315" stroke-dashoffset="100" stroke-mitterlimit="0" transform="rotate(-90 ) translate(-100 0)" />
                      </svg>
                    )
                  }
                </div>
              )
            }
            <div className={styles.icon_img}>
              <Image
                src={logo}
                alt=''
                />
            </div>
          </div>
          <div className={styles.app_descr}>
            <div className={styles.app_name}>Casino Baden-Baden</div>
            <div className={styles.app_vendor}>
              {
                status === 'LOADING' && (
                  <span>75%</span>
                )
              }
              {switchVendorPlace()}
            </div>
            <div className={styles.app_opt}>Casino</div>
          </div>
        </div>
        {
          status === 'INIT' && (
            <div className={styles.main_action}>
              <Button onClick={() => setStatus('WAIT')}>
                Install
              </Button>
            </div>
          )
        }
      </div>
      <div className={styles.ex}>
        <div className={styles.ex_part}>
          <div className={styles.ex_top}>
            <div className={styles.ex_label}>4.7</div>
            <div className={styles.ex_icon}></div>
          </div>
          <div className={styles.ex_text}>364 577 rezensionen</div>
        </div>
        <div className={styles.ex_part}>
          <div className={styles.ex_top}>
            <div className={styles.ex_icon}></div>
          </div>
          <div className={styles.ex_text}>39 МB</div>
        </div>
        <div className={styles.ex_part}>
          <div className={styles.ex_top}>
            <div className={styles.ex_icon}></div>
          </div>
          <div className={styles.ex_text}>18+ </div>
        </div>
        <div className={styles.ex_part}>
          <div className={styles.ex_top}>
            <div className={styles.ex_label}>1M+</div>
          </div>
          <div className={styles.ex_text}>Downloads</div>
        </div>
      </div>
      <div className={styles.action}>
        {
          (status === 'INIT' && width <= 768) && <Button onClick={() => setStatus('WAIT')} isFill>Install</Button>
        }
        {
          (status === 'WAIT' || status === 'LOADING') && (
            <Row gutter={[12,12]}>
              <Col span={12}>
                <Button isFill variant={'outlined'}>Open</Button>
              </Col>
              <Col span={12}>
                <Button isFill disabled>Delete</Button>
              </Col>
            </Row>
          )
        }
        {
          status === 'INSTALL' && (
            <Row gutter={[12,12]}>
              <Col span={12}>
                <Button isFill variant={'outlined'} disabled>Open</Button>
              </Col>
              <Col span={12}>
                <Button isFill disabled>Delete</Button>
              </Col>
            </Row>
          )
        }
        {
          status === 'DONE' && (
            <Row gutter={[12,12]}>
              <Col span={12}>
                <Button isFill variant={'outlined'}>Open</Button>
              </Col>
              <Col span={12}>
                <Button isFill>Delete</Button>
              </Col>
            </Row>
          )
        }
      </div>
    </div>
  )
}

export default Card;