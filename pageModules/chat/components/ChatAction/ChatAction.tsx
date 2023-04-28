import styles from './ChatAction.module.scss';
import IconButton from '@/components/IconButton/IconButton';
import {AiOutlineSmile, AiOutlineGift, AiOutlineCamera} from 'react-icons/ai';
import {BsArrowUpShort} from 'react-icons/bs';
import TextareaAutosize from 'react-textarea-autosize';
import {useRef, useEffect, useState, useCallback} from 'react';
import { AnimatePresence } from 'framer-motion';
import Stickers from './components/Stickers/Stickers';
import ApiService from '@/service/apiService';
import { useRouter } from 'next/router';
import { PulseLoader } from 'react-spinners';
import { useAppSelector } from '@/hooks/useTypesRedux';
import moment from 'moment';


const service = new ApiService()

const ChatAction = ({
    setHeight,
    updateChat,
    getGifts,
    updateDialogsList,
}: {
    setHeight: (...args: any[]) => any, 
    updateChat: (...args: any[]) => any,
    getGifts: (type: 'gift') => any,
    updateDialogsList?: (...args: any[]) => any
}) => {
    const {token} = useAppSelector(s => s)
    const {query} = useRouter()
    const {type} = query

    
    const [stickers, setStickers] = useState(false)
    const [gifts, setGifts] = useState(false);
    const [drawerPos, setDrawerPos] = useState(70);
    const [text, setText] = useState('')
    const [load, setLoad] = useState(false)

    useEffect(() => {
        if(gifts) setStickers(false)
        if(stickers) setGifts(false)
    }, [stickers, gifts])


    const onStickerSelect = (id: number) => {
        console.log(id)
    }

    const onSmileSelect = (label: string) => {
        setText(s => `${s}${label}`)
    }



    // !!отправка сообщения временно будет локализовано в этом компоненте
    const sendMessage = useCallback(() => {
        if(token) {
            if(query?.id && typeof query?.id === 'string') {
                if(type === 'chat') {
                    setLoad(true)
                    service.sendMessage_text({
                        chat_id: Number(query?.id),
                        text
                    }, token).then(res => {
                        updateDialogsList && updateDialogsList((s: any) => {
                            const m = s;
                            const rm = m.splice(m.findIndex((i: any) => i.id === res?.chat?.id), 1, res?.chat)
                            return [...m].sort((a, b) => moment(a?.last_message?.updated_at).valueOf() < moment(b?.last_message?.updated_at).valueOf() ? 1 : -1)
                        })
                        
                        updateChat(res?.chat?.last_message)

                    }).finally(() => {
                        setLoad(false)
                        setText('')
                    })
                }
                if(type === 'mail') {
                    setLoad(true)
                    service.sendMail_text({
                        letter_id: Number(query?.id),
                        text
                    }, token).then(res => {
                        updateDialogsList && updateDialogsList((s: any) => {
                            const m = s;
                            const rm = m.splice(m.findIndex((i: any) => i.id === res?.chat?.id), 1, res?.chat)
                            return [...m].sort((a, b) => moment(a?.last_message?.updated_at).valueOf() < moment(b?.last_message?.updated_at).valueOf() ? 1 : -1)
                        })

                        updateChat(res?.chat?.last_message)
                    }).finally(() => {
                        setLoad(false)
                        setText('')
                    })
                }
            }
        }
    }, [text, query, token, type])


    





    return (
        <div className={styles.lt}>
            {
                load ? (
                    <div className={styles.load}><PulseLoader color='var(--violet)'/></div>
                ) : null
            }
            <div className={`${styles.wrapper} ${load ? styles.disabled : ''}`}>
                <AnimatePresence>
                    {
                        stickers ? (
                            <Stickers 
                                onStickerSelect={onStickerSelect}
                                onSmileSelect={onSmileSelect}
                                pos={drawerPos}/>
                        ) : null
                    }
                    {
                        gifts ? (
                            null
                        ) : null
                    }
                </AnimatePresence>
                
                <div className={styles.main}>
                    <div className={styles.input}>
                        <TextareaAutosize 
                            // onKeyDown={(e) => {
                            //     if(e.key === 'Enter' && text) {
                            //         sendMessage()
                            //     } 
                            // }}
                            value={text}
                            onChange={e => setText(e.target.value)}
                            maxRows={8}
                            onHeightChange={e => {
                                setHeight(e + 47)
                                setDrawerPos(e + 47)
                            }}
                            placeholder='Напишите сообщение...'
                            />
                    </div>
                    <div className={styles.action}>
                        <div className={styles.item}>
                            <IconButton
                                onClick={() => setStickers(s => !s)}
                                variant={'bordered'}
                                size={30}
                                icon={<AiOutlineSmile size={20}/>}
                                />
                        </div>
                        <div className={styles.item}>
                            <IconButton
                                onClick={getGifts}
                                variant={'bordered'}
                                size={30}
                                icon={<AiOutlineGift size={20}/>}
                                />
                        </div>
                        <div className={styles.item}>
                            <IconButton
                                variant={'bordered'}
                                size={30}
                                icon={<AiOutlineCamera size={20}/>}
                                />
                        </div>
                    </div>
                </div>
                <div className={styles.send}>
                    <IconButton
                        disabled={!text}
                        onClick={sendMessage}
                        size={45}
                        icon={<BsArrowUpShort size={40}/>}
                        />
                </div>
            </div>
        </div>
       
    )
}

export default ChatAction;