import styles from './SignupSearch.module.scss';
import { FC } from 'react'
import {motion} from 'framer-motion';
import { Row, Col } from 'antd';
import RangeSlider from '@/components/RangeSlider/RangeSlider';
import SelectSex from '@/components/SelectSex/SelectSex';

interface I {
    
}

const SignupSearch:FC<I> = ({

}) => {
  return (
    <motion.div
      initial={{
        y: '20px',
        scale: 0.8,
        opacity: 0
      }}
      animate={{
          y: 0,
          scale: 1,
          opacity: 1
      }}
      transition={{type: 'spring', stiffness: 400, damping: 17 }} className={styles.wrapper}>
      <Row gutter={[50,50]}>
        <Col span={24}>
          <div className={styles.field}>
            <Row gutter={[20, 20]}>
              {/* <Col span={24}>
                <div className={styles.num}></div>
              </Col> */}
              <Col span={24}>
                <div className={styles.label}>
                  Укажите возраст, который Вас интересует
                </div>
              </Col>
              <Col span={24}>
                <div className={styles.range}>
                  <RangeSlider
                    range={true}
                    min={18}
                    max={80}
                    style={{width: '100%'}}
                    />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={24}>
          <div className={styles.gender}>
            <Row gutter={[20,20]}>
              <Col span={24}>
                <div className={styles.label}>
                  Кого Вы ищете?
                </div>
              </Col>
              <Col span={24}>
                <div className={styles.body}>
                  <SelectSex
                  onSelect={() => {}}
                  value='male'
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </motion.div>
  )
}

export default SignupSearch;