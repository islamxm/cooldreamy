import styles from './Sidebar.module.scss';
import { FC } from 'react';
import MyCard from './components/MyCard/MyCard';
import PremiumBtn from './components/PremiumBtn/PremiumBtn';
import { Row, Col } from 'antd';
import Menu from './components/Menu/Menu';


const Sidebar:FC = () => {
    return (
        <div className={styles.wrapper}>
            <Col span={24}>
                <Row gutter={[15, 15]}>
                    <Col span={24}>
                        <MyCard/>
                    </Col>
                    <Col span={24}>
                        <PremiumBtn/>
                    </Col>
                    <Col span={24}>
                        <Menu/>
                    </Col>
                </Row>
            </Col>
        </div>
    )
}

export default Sidebar;