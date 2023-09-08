import styles from './Tabs.module.scss';
import { FC } from 'react'
import { Row, Col } from 'antd';
import getClassNames from '@/helpers/getClassNames';

interface I {
  activeTab?: string,
  onChange: (id: string) => any
}

const Tabs:FC<I> = ({
  activeTab,
  onChange
}) => {
  return (
    <div className={styles.wrapper}>
      <Row gutter={[4,4]}>
        <Col span={8}>
          <button 
            onClick={() => onChange('1')}
            className={getClassNames([styles.item, styles.premium, activeTab == '1' && styles.active])}>
            <div className={styles.icon}></div>
            <div className={styles.label}>VIP</div>
          </button>
        </Col>
        <Col span={8}>
          <button 
            onClick={() => onChange('2')}
            className={getClassNames([styles.item, styles.subscribe, activeTab == '2' && styles.active])}>
            <div className={styles.icon}></div>
            <div className={styles.label}>Premium</div>
          </button>
        </Col>
        <Col span={8}>
          <button 
            onClick={() => onChange('3')}
            className={getClassNames([styles.item, styles.credits, activeTab == '3' && styles.active])}>
            <div className={styles.icon}></div>
            <div className={styles.label}>Credits</div>
          </button>
        </Col>
      </Row>
    </div>
  )
}

export default Tabs;