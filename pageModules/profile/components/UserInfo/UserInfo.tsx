import styles from './UserInfo.module.scss';
import {FC} from 'react';
import { Row, Col } from 'antd';
import UserInfoAction from '../UserInfoAction/UserInfoAction';
import UserImages from '../UserImages/UserImages';
import UserMain from '../UserMain/UserMain';
import { IUser } from '@/models/IUser';
import { useWindowSize } from 'usehooks-ts';


const UserInfo:FC<IUser> = (props) => {
    const {
        about_self,
        avatar_url,
        avatar_url_big_thumbnail,
        avatar_url_thumbnail,
        birthday,
        country,
        created_at,
        credits,
        disabled,
        email,
        email_verified_at,
        gender,
        id,
        is_confirmed_user,
        is_in_top,
        is_new_avatar,
        is_premium,
        last_online,
        name,
        premium_expire,
        prompt_careers,
        prompt_finance_states,
        prompt_relationships,
        prompt_sources,
        prompt_targets,
        prompt_want_kids,
        state,
        tags,
        top_expire,
        type,
        updated_at,
        profile_photos
    } = props
    const {width} = useWindowSize()


    return (
        <div className={styles.wrapper}>
            <Row gutter={[15,15]}>
                {
                    width > 1000 ? (
                        <>
                            <Col span={24}>
                                <UserInfoAction
                                    {...props}
                                    />
                            </Col>
                            
                        </>
                    ) : null
                }
                
                <Col span={24}>
                    <UserImages
                        profile_photos={profile_photos}
                        />
                </Col>
                <Col span={24}>
                    <UserMain {...props}/>
                </Col>
            </Row>
        </div>
    )
}

export default UserInfo;