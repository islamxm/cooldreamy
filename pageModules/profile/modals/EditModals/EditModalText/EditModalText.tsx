import {Modal, ModalFuncProps, Row, Col} from 'antd';
import {FC, useState, useEffect} from 'react';
import { IEditModal } from '../type';
import styles from './EditModalText.module.scss';
import Button from '@/components/Button/Button';
import Textarea from '@/components/Textarea/Textarea';
import ApiService from '@/service/apiService';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import { updateUserData } from '@/store/actions';
import { editItemT } from '@/pageModules/profile/components/UserMain/UserMain';
import notify from '@/helpers/notify';
const service = new ApiService()


interface I extends IEditModal {
    textValue?: string,
}

const EditModalText:FC<I> = (props) => {
    const {token} = useAppSelector(s => s)
    const dispatch = useAppDispatch();
    const {head, textValue, onCancel, editItemType} = props;
    const [load, setLoad] = useState(false)
    const [value, setValue] = useState<string>('')


    useEffect(() => {
        setValue(textValue ? textValue : '')
    }, [textValue])

    const onClose = () => {
        setValue('')
        onCancel && onCancel()
    }

    const onSave = (type: editItemT | '') => {
        if(token && value) {
            setLoad(true)
            switch(type) {
                case 'name':
                    service.updateMyProfile({name: value}, token).then(res => {
                        console.log(res)
                        if(res?.id) {
                            notify('Настройки успешно сохранены', 'SUCCESS')
                            dispatch(updateUserData(res))
                            onClose()
                        } else {
                            notify('Произошла ошибка, повторите еще раз', 'ERROR')
                        }
                    }).finally(() => {
                        setLoad(false)
                    })
                case 'email':
                    service.updateMyProfile({email: value}, token).then(res => {
                        console.log(res)
                        if(res?.id) {
                            notify('Настройки успешно сохранены', 'SUCCESS')
                            dispatch(updateUserData(res))
                            onClose()
                        } else {
                            notify('Произошла ошибка, повторите еще раз', 'ERROR')
                        }
                    }).finally(() => {
                        setLoad(false)
                    })
                case 'about':
                    service.updateMyProfile({about_self: value}, token).then(res => {
                        console.log(res)
                        if(res?.id) {
                            notify('Настройки успешно сохранены', 'SUCCESS')
                            dispatch(updateUserData(res))
                            onClose()
                        } else {
                            notify('Произошла ошибка, повторите еще раз', 'ERROR')
                        }
                    }).finally(() => {
                        setLoad(false)
                    })
                default:
                    return;
            }
        }

    }

    return (
        <Modal
            {...props}
            width={700}
            footer={false}
            onCancel={onClose}
            className={`modal ${styles.wrapper}`}
            >
            <Row gutter={[20,20]}>
                <Col span={24}>
                    <h3 className={styles.head}>{head}</h3>
                </Col>
                <Col span={24}>
                    <div className={styles.body}>
                        <Textarea
                            resize  
                            placeholder={head}
                            value={value}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
                            height={100}
                            />
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.action}>
                        <Row gutter={[15,15]}>
                            <Col span={12}>
                                <Button
                                    onClick={onClose}
                                    style={{width: '100%'}}
                                    text='Отмена'
                                    variant={'danger'}
                                    />
                            </Col>
                            <Col span={12}>
                                <Button
                                    disabled={!value}
                                    load={load}
                                    onClick={() => onSave(editItemType)}
                                    style={{width: '100%'}}
                                    text='Сохранить'
                                    />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Modal>
    )
}


export default EditModalText;