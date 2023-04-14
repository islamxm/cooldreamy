import styles from './ChatAction.module.scss';
import IconButton from '@/components/IconButton/IconButton';
import {AiOutlineSmile, AiOutlineGift, AiOutlineCamera} from 'react-icons/ai';
import {BsArrowUpShort} from 'react-icons/bs';
import TextareaAutosize from 'react-textarea-autosize';
import {useRef, useEffect, useState} from 'react';
import { AnimatePresence } from 'framer-motion';
import Stickers from './components/Stickers/Stickers';


const ChatAction = ({
    setHeight
}: {setHeight: (...args: any[]) => any}) => {
    const [stickers, setStickers] = useState(true)
    const [gifts, setGifts] = useState(false);
    const [drawerPos, setDrawerPos] = useState(70);
    const [text, setText] = useState('')

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

    


    return (
        <div className={styles.lt}>
            <div className={styles.wrapper}>
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
                            value={text}
                            onChange={e => setText(e.target.value)}
                            maxRows={10}
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
                        size={45}
                        icon={<BsArrowUpShort size={40}/>}
                        />
                </div>
            </div>
        </div>
       
    )
}

export default ChatAction;