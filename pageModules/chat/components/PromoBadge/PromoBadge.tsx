import styles from './PromoBadge.module.scss';
import { Row, Col } from 'antd';
import Button from '@/components/Button/Button';


const PromoBadge = () => {

    return (
        <div className={styles.wrapper}>
            <Row gutter={[8, 8]}>
                <Col span={24}>
                    <div className={styles.label}>
                        Обменяйся контактами!
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.action}>
                        <Button
                            text='Стань premium'
                            variant={'white'}
                            small
                            />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default PromoBadge;