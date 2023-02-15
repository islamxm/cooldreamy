import styles from './UserCard.module.scss';
import { Row, Col } from 'antd';
import Image from 'next/image';
import {FC} from 'react';
import { userCardPropsTypes } from './types';

const UserCard:FC<userCardPropsTypes> = ({
    children,
    image,
    verify,
}) => {

    return (
        <div className={styles.wrapper}>
            <Row gutter={[12,12]}>
                <Col span={24}>
                    {
                        verify ? (
                            <div className={styles.verif}></div>
                        ) : null
                    }
                    <div className={styles.main}>
                        <div className={styles.img}>
                            <Image src={image} alt=""/>
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    {children}
                </Col>
            </Row>
        </div>
    )
}

export default UserCard;