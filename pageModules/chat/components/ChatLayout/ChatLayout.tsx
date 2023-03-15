import styles from './ChatLayout.module.scss';
import { Row, Col } from 'antd';
import Filter from '../Filter/Filter';
import ChatBody from '../ChatBody/ChatBody';
const ChatLayout = () => {

    return (
        <div className={styles.wrapper}>
            <Row>
                <Col span={24}>
                    <div className={styles.top}>
                        <Filter/>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.main}>
                        <ChatBody/>
                    </div>
                </Col>
            </Row>
        </div>
    )
}


export default ChatLayout;