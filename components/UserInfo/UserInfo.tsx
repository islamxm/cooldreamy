import styles from './UserInfo.module.scss';
import {FC} from 'react';
import { Row, Col } from 'antd';
import UserImageSlider from './components/UserImageSlider/UserImageSlider';
import UserInfoMain from './components/UserInfoMain/UserInfoMain';
import UserInfoAction from './components/UserInfoAction/UserInfoAction';
import { IUser } from '@/models/IUser';




const UserInfo:FC<IUser> = (props) => {
    const {profile_photo} = props

    return (
        <div className={styles.wrapper}>
            <Row gutter={[15,15]}>
                <Col span={24}>
                    <UserInfoAction {...props}/>
                </Col>
                {
                    profile_photo && profile_photo?.length > 0 ? (
                        <Col span={24}>
                            <UserImageSlider {...props}/>
                        </Col> 
                    ) : null
                }
                   
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