import styles from './EditModalRegion.module.scss';
import {Modal, ModalFuncProps, Row, Col} from 'antd';
import {FC, useState, useEffect} from 'react';
import { IEditModal } from '../type';
import ApiService from '@/service/apiService';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import SelectDef from '@/components/SelectDef/SelectDef';
import { selectOptionType } from '@/components/SelectDef/types';
import Button from '@/components/Button/Button';
import notify from '@/helpers/notify';
import { updateUserData } from '@/store/actions';

const service = new ApiService()

interface I extends IEditModal {
    state?: string,
    country?: string
}


const EditModalRegion:FC<I> = (props) => {
    const dispatch = useAppDispatch()
    const {onCancel, head} = props
    const {token} = useAppSelector(s => s)
    const [load, setLoad] = useState(false)
    const [state, setState] = useState<selectOptionType>()
    const [country, setCountry] = useState<selectOptionType>()



    const [countryList, setCountryList] = useState<selectOptionType[]>([])
    const [stateList, setStateList] = useState<selectOptionType[]>([])

    const onClose = () => {
        onCancel && onCancel()
    }

    useEffect(() => {
        if(token) {
            service.getCountries(token).then(res => {
                setCountryList(res?.map((i:any) => ({id: i.id, value: i.id.toString(), label: i.title})))
            })
        }
    }, [token])


    // ** определить страну если она уже выдрана
    useEffect(() => {
        if(props?.country && countryList?.length > 0) {
            const f = countryList.find(i => i.label === props?.country)
            if(f) setCountry(f)
        }
    }, [props, countryList])

    // ** определить регион если изначально выбрана страна
    useEffect(() => {
        if(props?.state && stateList?.length > 0) {
            const f = stateList.find(i => i.label === props?.state)
            if(f) setState(f)
        } 
    }, [props, stateList])


    useEffect(() => {
        if(!country) {
            setState(undefined)
        }
    }, [country])
    
    


    // ** получить список регионов после выбора страны
    useEffect(() => {
        if(country?.id && token) {
            service.getStates(country?.id, token).then(res => {
                setStateList(res?.map((i: any) => ({id: i.id, value: i.id.toString(), label: i.title})))
            })
        }
    }, [country, token])


    const onSave = () => {
        if(token) {
            setLoad(true)
            const body = {
                state: state?.label ? state?.label : null,
                country: country?.label ? country?.label : null
            }
            service.updateMyProfile(body, token).then(res => {
                
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
                        <Row gutter={[20,20]}>
                            <Col span={24}>
                                <SelectDef
                                    label='Выберите страну'
                                    width={'100%'}
                                    placeholder='Страна'
                                    list={countryList}
                                    value={country?.label}
                                    onChange={(e, v) => {
                                        setCountry(v)
                                    }}
                                    />
                            </Col>
                            {
                                country && stateList?.length > 0 ? (
                                    <Col span={24}>
                                        <SelectDef
                                            label='Выберите регион'
                                            width={'100%'}
                                            placeholder='Регион'
                                            list={stateList}
                                            value={state?.label}
                                            onChange={(e, v) => {
                                                setState(v)
                                            }}
                                            />
                                    </Col>
                                ) : null
                            }
                        </Row>
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
                                    // disabled={}
                                    load={load}
                                    onClick={onSave}
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

export default EditModalRegion;