import styles from './Sidebar.module.scss';
import { FC, useEffect, useState } from 'react';
import MyCard from './components/MyCard/MyCard';
import PremiumBtn from './components/PremiumBtn/PremiumBtn';
import { Row, Col } from 'antd';
import Menu from './components/Menu/Menu';
import { IUser } from '@/models/IUser';
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';


const Sidebar:FC = () => {
    const {userData} = useAppSelector(s => s)

    return (
        <div className={styles.wrapper}>
            <Col span={24}>
                <Row gutter={[15, 15]}>
                    <Col span={24}>
                        <MyCard
                            {...userData}
                            />
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