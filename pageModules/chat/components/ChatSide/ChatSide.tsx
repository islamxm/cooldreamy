import styles from './ChatSide.module.scss';
import {Row, Col} from 'antd';
import Input from '@/components/Input/Input';
import {FiSearch} from 'react-icons/fi';
import ChatList from '../ChatList/ChatList';
const ChatSide = () => {

    return (
        <div className={styles.wrapper}>
            <Row>
                <Col span={24} style={{padding: '5px'}}>
                    <Input
                        style={{
                            borderRadius: 8,
                            paddingTop: 5,
                            paddingBottom: 5,
                        }}
                        placeholder='Поиск...'
                        afterIcon={<FiSearch color='#888888'/>}

                        //beforeIcon={<FiSearch/>}
                        />
                </Col>
                <Col span={24}>
                    <ChatList/>
                </Col>
            </Row>
        </div>
    )
}

export default ChatSide;