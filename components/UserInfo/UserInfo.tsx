import styles from './UserInfo.module.scss';
import {FC} from 'react';
import { Row, Col } from 'antd';
import UserImageSlider from './components/UserImageSlider/UserImageSlider';
import UserInfoMain from './components/UserInfoMain/UserInfoMain';
import UserInfoAction from './components/UserInfoAction/UserInfoAction';
const UserInfo:FC = () => {
    return (
        <div className={styles.wrapper}>
            <Row gutter={[15,15]}>
                <Col span={24}>
                    <UserInfoAction/>
                </Col>
                <Col span={24}>
                    <UserImageSlider/>
                </Col>    
                <Col span={24}>
                    <UserInfoMain/>
                </Col>
                <Col span={24}>
                    <div className={styles.action}>
                        <button>ПОЖАЛОВАТЬСЯ</button>
                    </div>
                </Col>
            </Row>            
        </div>
    )
}

export default UserInfo;