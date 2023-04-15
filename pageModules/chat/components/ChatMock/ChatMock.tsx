import styles from './ChatMock.module.scss';
import {Row, Col} from 'antd';
import Button from '@/components/Button/Button';
import Radio from '@/components/Radio/Radio';
import {useState, useEffect} from 'react';



const mockList = [
    {
        id: 'mock1',
        value: '1',
        text: 'Привет, познакомимся?'
    },
    {
        id: 'mock2',
        value: '2',
        text: 'Каких отношений ты ищешь на этом сайте?'
    },
    {
        id: 'mock3',
        value: '3',
        text: 'Привет, тебе говорили, что ты просто сногшибательная?'
    },
    {
        id: 'mock4',
        value: '4',
        text: 'Здравствуй! Отличные фотографии!'
    },
    {
        id: 'mock5',
        value: '5',
        text: 'У тебя великолепная внешность. Я поражен...'
    },
]


const ChatMock = () => {
    const [selectValue, setSelectValue] = useState('') 


    useEffect(() => {
        console.log(selectValue)
    }, [selectValue])

    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                <h3 className={styles.title}>Отправить сообщение</h3>
                <div className={styles.main}>
                    {
                        mockList?.map((item,index) => (
                            <div className={styles.item} key={index}>
                                <Radio
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        if(e.target.checked) {
                                            setSelectValue(item.text)
                                        }
                                    }}
                                    id={item.id}
                                    name='mock'
                                    value={item.value}
                                    text={item.text}
                                    />
                            </div>
                        ))
                    }
                   
                </div>
                <div className={styles.action}>
                    <Row gutter={[10,10]}>
                        <Col span={12}>
                            <Button
                                disabled={!selectValue}
                                text='Отправить'
                                />
                        </Col>
                        <Col span={12}>
                            <Button
                                variant={'bordered'}
                                text='Назад'
                                />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}


export default ChatMock;