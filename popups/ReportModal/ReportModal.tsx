import styles from './ReportModal.module.scss';
import { Modal, ModalFuncProps, Col, Row } from 'antd';
import {FC, useState} from 'react';
import Textarea from '@/components/Textarea/Textarea';
import { useAppSelector } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import Button from '@/components/Button/Button';

const service = new ApiService()

interface I {
    chatId?: string | number
}


const ReportModal:FC<I & ModalFuncProps> = (props) => {
    const {chatId, onCancel} = props || {}
    const [text, setText] = useState('')
    const {token} = useAppSelector(s => s)
    const [load, setLoad] = useState(false)

    const onReport = () => {
        if(token && chatId) {
            setLoad(true)
            service.chatReport(token, chatId, {text}).then(res => {
                console.log(res)
            }).finally(() => {
                setLoad(false)
            })
        }
    }

    const onClose = () => {
        setText('')
        onCancel && onCancel()
    }


    return (
        <Modal
            {...props}
            className={`${styles.wrapper} modal`}
            >
            <Row gutter={[15,15]}>
                <Col span={24}>
                    <h2>Напишите жалобу</h2>
                </Col>
                <Col span={24}>
                    <Textarea
                        placeholder='Текст...'
                        value={text}
                        onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                        />
                </Col>  
                <Col span={24}>
                    <Row gutter={[10,10]}>
                        <Col span={12}>
                            <Button
                                text='Отмена'
                                variant={'danger'}
                                onClick={onClose}
                                fill
                                />
                        </Col>
                        <Col span={12}>
                            <Button
                                text='Отправить'
                                fill
                                load={load}
                                onClick={onReport}
                                />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Modal>
    )
}



export default ReportModal;