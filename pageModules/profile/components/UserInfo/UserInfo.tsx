import styles from './UserInfo.module.scss';
import {FC} from 'react';
import { Row, Col } from 'antd';
import UserInfoAction from '../UserInfoAction/UserInfoAction';
import UserImages from '../UserImages/UserImages';
import UserMain from '../UserMain/UserMain';


const UserInfo:FC = () => {
    
    return (
        <div className={styles.wrapper}>
            <Row gutter={[15,15]}>
                <Col span={24}>
                    <UserInfoAction/>
                </Col>
                <Col span={24}>
                    <UserImages/>
                </Col>
                <Col span={24}>
                    <UserMain/>
                </Col>
            </Row>
        </div>
    )
}

export default UserInfo;