import {Modal, ModalFuncProps, Row, Col} from 'antd';
import {FC, useEffect, useState} from 'react';
import { IEditModal } from '../type';
import styles from './EditModalPl.module.scss';
import Button from '@/components/Button/Button';
import SelectCard from '@/components/SelectCard/SelectCard';
import { editItemT } from '@/pageModules/profile/components/UserMain/UserMain';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import notify from '@/helpers/notify';
import { updateUserData } from '@/store/actions';

const service = new ApiService()

interface I extends IEditModal {
    promptList: any[],
    activeId?: number | null
}


const EditModalPl:FC<I> = (props) => {
    const {token} = useAppSelector(s => s)
    const dispatch = useAppDispatch()
    const [load, setLoad] = useState(false)
    const {head, activeId, promptList, onCancel, editItemType} = props;
    const [active, setActive] = useState<number>(0)

    useEffect(() => {
        setActive(activeId ? activeId : 0)
    }, [activeId])


    useEffect(() => {

    }, [promptList])


    const onClose = () => {
        setActive(0)
        onCancel && onCancel()
    }


    const onSave = (type: editItemT | '') => {
        if(type && token) {
            setLoad(true)
            if(type === 'target') {
                service.updateMyProfile({prompt_target_id: active}, token).then(res => {
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
            }
            if(type === 'finance') {
                service.updateMyProfile({prompt_finance_state_id: active}, token).then(res => {
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
            }
            if(type === 'career') {
                service.updateMyProfile({prompt_career_id: active}, token).then(res => {
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
            }
            if(type === 'kids') {
                service.updateMyProfile({prompt_want_kids_id: active}, token).then(res => {
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
            }
            if(type === 'rl') {
                service.updateMyProfile({prompt_relationship_id: active}, token).then(res => {
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
                        {
                            promptList?.map((item,index) => (
                                <div className={styles.item} key={index}>
                                    <SelectCard
                                        label={item?.text}
                                        value={item?.id?.toString()}
                                        onSelect={() => setActive(Number(item?.id))}
                                        isSelect={active === item?.id}
                                        />
                                </div>
                            ))
                        }
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.action}>
                        <Row gutter={[15,15]}>
                            <Col span={12}>
                                <Button
                                    style={{width: '100%'}}
                                    text='Отмена'
                                    variant={'danger'}
                                    onClick={onClose}
                                    />
                            </Col>
                            <Col span={12}>
                                <Button
                                    load={load}
                                    disabled={!active}
                                    style={{width: '100%'}}
                                    text='Сохранить'
                                    onClick={() => onSave(editItemType)}
                                    />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Modal>
    )
}


export default EditModalPl;