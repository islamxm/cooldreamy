import styles from './CreateChatModal.module.scss';
import {Modal, ModalFuncProps} from 'antd';
import ApiService from '@/service/apiService';
import {FC, useCallback, useState} from 'react';
import Router from 'next/router';
import Textarea from '../Textarea/Textarea';
import {Row, Col} from 'antd';
import Button from '../Button/Button';

const service = new ApiService()

interface Type extends ModalFuncProps {
    id?: number
} 


const CreateChatModal:FC<Type> = (props) => {
    const {id, onCancel} = props;
    const [load, setLoad] = useState(false);
    const [text, setText] = useState('')


    const onClose = () => {
        setText('')
        onCancel && onCancel()
    }


    const createChat = useCallback(() => {
        id && service.createChat(id).then(res => {
            console.log(res)      
        })
    }, [id])


    return (
        <Modal
            {...props}
            open
            footer={false}
            className={`modal`}
            title="Напишите сообщение"
            onCancel={onClose}
            >
            <Row gutter={[30,30]}>
                <Col span={24}>
                    <Textarea
                        value={text}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                        placeholder='Ваше сообщение'
                        />
                </Col>
                <Col span={24}>
                    <Row gutter={[20,20]}>
                        <Col span={12}>
                            <Button
                                style={{width: '100%'}}
                                text='Отмена'
                                variant='danger'
                                onClick={onClose}
                                />
                        </Col>
                        <Col span={12}>
                            <Button
                                disabled={!text}
                                onClick={createChat}
                                load={load}
                                style={{width: '100%'}}
                                text='Отправить'
                                />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Modal>
    )
}

export default CreateChatModal;
