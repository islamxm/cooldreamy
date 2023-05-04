import styles from './Sidebar.module.scss';
import { FC, useEffect, useState } from 'react';
import MyCard from './components/MyCard/MyCard';
import PremiumBtn from './components/PremiumBtn/PremiumBtn';
import { Row, Col } from 'antd';
import Menu from './components/Menu/Menu';
import { IUser } from '@/models/IUser';
import ApiService from '@/service/apiService';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypesRedux';
import { useWindowSize } from 'usehooks-ts';
import { updateMenu } from '@/store/actions';


const Sidebar:FC = () => {
    const {userData, isMenuOpen} = useAppSelector(s => s)
    const dispatch = useAppDispatch()
    const {width} = useWindowSize()



    return (
        <div className={`${styles.wrapper} ${isMenuOpen ? styles.active : ''}`}>
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