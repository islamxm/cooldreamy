import styles from './UserMain.module.scss';
import { Row, Col } from 'antd';
import {RiPencilLine} from 'react-icons/ri';
import Badge from '@/components/Badge/Badge';
import { IUser } from '@/models/IUser';
import {FC, useEffect, useState} from 'react'
import ApiService from '@/service/apiService';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypesRedux';
import { updateUserData } from '@/store/actions';
import EditModalPl from '../../modals/EditModals/EditModalPl/EditModalPl';
import EditModalText from '../../modals/EditModals/EditModalText/EditModalText';

const service = new ApiService()

export type editItemT = 'career' | 'finance' | 'rl' | 'target' | 'kids' | 'name' | 'email' | 'about'


const UserMain:FC<IUser> = (props) => {
    const {
        about_self,
        name,
        email,

        prompt_career_id,
        prompt_relationship_id,
        prompt_finance_state_id,
        prompt_target_id,
        prompt_want_kids_id
    } = props
    

    const {token} = useAppSelector(s => s)
    const dispatch = useAppDispatch()
    const [editItemType, setEditItemType] = useState<editItemT | ''>('')

    const [promptModal, setPromptModal] = useState(false)
    const [textModal, setTextModal] = useState(false)

    const [modalHead, setModalHead] = useState('')


    const [prompt_targets, setPrompt_targets] = useState([])
    const [prompt_interests, setPrompt_interests] = useState([])
    const [prompt_finance_states, setPrompt_finance_states] = useState([])
    const [prompt_sources, setPrompt_sources] = useState([])
    const [prompt_want_kids, setPrompt_want_kids] = useState([])
    const [prompt_relationships, setPrompt_relationships] = useState([])
    const [prompt_careers, setPrompt_careers] = useState([])   




    useEffect(() => {
        console.log(props)
    }, [props])

    useEffect(() => {
        if(token) {
            service.getAllPrompts(token).then(res => {
                setPrompt_targets(res?.prompt_targets)
                setPrompt_careers(res?.prompt_careers)
                setPrompt_finance_states(res?.prompt_finance_states)
                setPrompt_sources(res?.prompt_sources)
                setPrompt_interests(res?.prompt_interests)
                setPrompt_want_kids(res?.prompt_want_kids)
                setPrompt_relationships(res?.prompt_relationships)
            })
        }
    }, [token])


    const closeEditModal = () => {
        setEditItemType('')
        setModalHead('')
        setPromptModal(false)
        setTextModal(false)

    }

    const switchHead = (type: editItemT | '') => {
        switch(type) {
            case 'name':
                return 'Редактировать имя'
            case 'email':
                return 'Редактировать e-mail'
            case 'about':
                return 'Расскажите о себе'
            default:
                return 'Заголовок'
        }
    }

    const switchPlList = (type: editItemT | '') => {
        switch(type) {
            case 'career':
                return prompt_careers
            case 'finance':
                return prompt_finance_states
            case 'kids':
                return prompt_want_kids
            case 'rl':
                return prompt_relationships
            case 'target':
                return prompt_targets
            default:
                return []
        }
    }


    const switchInitValue = (type: editItemT | '') => {
        switch(type) {
            case 'about':
                return about_self
            case 'name':
                return name
            case 'email':
                return email
            default:
                return ''
        }
    }


    const setModalProps = (type: editItemT) => {
        setModalHead(switchHead(type))
        setEditItemType(type)

    }

    const openModal = (modalType: 'prompt' | 'text') => {
        if(modalType === 'text') {
            setTextModal(true)
        }
        if(modalType === 'prompt'){
            setPromptModal(true)
        }
    }


    useEffect(() => {
        console.log(editItemType)
    }, [editItemType])


    return (
        <div className={styles.wrapper}>

            <EditModalPl 
                promptList={switchPlList(editItemType)}
                head={modalHead} 
                editItemType={editItemType}
                open={promptModal}
                onCancel={closeEditModal}
                />

            <EditModalText
                textValue={switchInitValue(editItemType)}
                head={modalHead}
                editItemType={editItemType}
                open={textModal}
                onCancel={closeEditModal}
                />

            <Row gutter={[10,10]}>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Имя
                            <button
                                onClick={() => {
                                    setModalProps('name')
                                    openModal('text')
                                }}
                                >
                                <RiPencilLine/>
                            </button>
                        </div>
                        <div className={styles.text} style={{color: name ? 'var(--text)' : 'var(--red)'}}>
                            {name ? name : 'Не указано'}
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            E-mail
                            <button
                                onClick={() => {
                                    setModalProps('email')
                                    openModal('text')
                                }}
                                >
                                <RiPencilLine/>
                            </button>
                        </div>
                        <div className={styles.text} style={{color: email ? 'var(--text)' : 'var(--red)'}}>
                            {email ? email : 'Не указано'}
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            О себе
                            <button
                                onClick={() => {
                                    setModalProps('about')
                                    openModal('text')
                                }}
                                >
                                <RiPencilLine/>
                            </button>
                        </div>
                        <div className={styles.text} style={{color: about_self ? 'var(--text)' : 'var(--red)'}}>
                            {about_self ? about_self : 'Не указано'}
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Цели знакомства
                            <button><RiPencilLine/></button>
                        </div>
                        <div className={styles.text} style={{color: prompt_target_id ? 'var(--text)' : 'var(--red)'}}>
                            {prompt_target_id ? prompt_target_id : 'Не указано'}
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Финансовые предпочтения
                            <button><RiPencilLine/></button>
                        </div>
                        <div className={styles.text} style={{color: prompt_finance_state_id ? 'var(--text)' : 'var(--red)'}}>
                            {prompt_finance_state_id ? prompt_finance_state_id : 'Не указано'}
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Карьера
                            <button><RiPencilLine/></button>
                        </div>
                        <div className={styles.text} style={{color: prompt_career_id ? 'var(--text)' : 'var(--red)'}}>
                            {prompt_career_id ? prompt_career_id : 'Не указано'}
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Семейное положение
                            <button><RiPencilLine/></button>
                        </div>
                        <div className={styles.text} style={{color: prompt_relationship_id ? 'var(--text)' : 'var(--red)'}}>
                            {prompt_relationship_id ? prompt_relationship_id : 'Не указано'}
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Дети
                            <button><RiPencilLine/></button>
                        </div>
                        <div className={styles.text} style={{color: prompt_want_kids_id ? 'var(--text)' : 'var(--red)'}}>
                            {prompt_want_kids_id ? prompt_want_kids_id : 'Не указано'}
                        </div>
                    </div>
                </Col>







                {/* //? Пример верстки множественных интересов}

                {/* <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.label}>
                            Интересы
                            <button><RiPencilLine/></button>
                        </div>
                        <div className={styles.interests} style={{color: 'var(--red)'}}>
                            <div className={styles.text} style={{color: 'var(--red)', marginLeft: 5}}>
                                {'Не указано'}
                            </div>
                            <div className={styles.item}>
                                <Badge/>
                                Музыка,
                            </div>
                            <div className={styles.item}>
                                <Badge/>
                                Путешествия
                            </div>
                        </div>
                    </div>
                </Col> */}
            </Row>
        </div>
    )
}

export default UserMain;