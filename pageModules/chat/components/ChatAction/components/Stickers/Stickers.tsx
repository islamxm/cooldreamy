import styles from './Stickers.module.scss';
import {motion} from 'framer-motion';
import {useState, useEffect, useCallback, useRef} from 'react';
import ApiService from '@/service/apiService';
import Sticker from '@/components/Sticker/Sticker';
import emojiData from '@/helpers/emojiData';
import Smile from '@/components/Smile/Smile';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { useRouter } from 'next/router';




const service = new ApiService()


const tabs = [
    {value: 1, label: 'Смайлы'},
    {value: 2, label: 'Стикеры'},
]



// const useOutsideClick = (ref: any, handler: any, attached: boolean = true) => {
   
//     useEffect(() => {
//         if(!attached) return;
        
//         const handleClick = (e: any) => {
//             if (!ref?.current) return;
//             if (!ref?.current?.contains(e.target)) {
//                 handler()
//             } else {
//                 console.log('click in')
//             }
//         }

//         document.addEventListener('click', handleClick)
//         return () => {
//             document.removeEventListener('click', handleClick)
//         }

//     }, [ref, handler, attached])
// }



const Stickers = ({
    pos,
    onSmileSelect,
    onStickerSelect,
    onClose,
    isOpened
}: {
    pos?: number,
    onSmileSelect?: (label: string) => any,
    onStickerSelect?: (id: number) => any
    onClose: (...args: any[]) => any,
    isOpened?: boolean
}) => {
    const {token} = useAppSelector(s => s)
    const {query} = useRouter()
    const {type} = query || null

    const [activeTab, setActiveTab] = useState<number>(1)
    const [list, setList] = useState<any[]>()

    

        
    useEffect(() => {
        if(token) {
            service.getStickers(token).then(res => {
                setList(res)
            })
        }
       
    }, [token])


    const switchTabContent = useCallback(() => {
        switch(activeTab) {
            case 1:
                return (
                    <div className={styles.body}>

                    {
                        emojiData?.map((item, index) => (
                            <div className={styles.item}  key={item.code}>
                                <Smile 
                                    onSelect={onSmileSelect}
                                    label={item.label}
                                    code={item.code}/>
                            </div>
                        ))
                    }
                    </div>
                )
            case 2:
                return (
                    <div className={styles.body}>

                        {
                            list?.map((item, index) => (
                                <div className={styles.item}  key={item.id}>
                                    <Sticker 
                                        {...item}
                                        onSelect={onStickerSelect}
                                        />
                                </div>
                            ))
                        }
                    </div>
                )
        }
    }, [activeTab, list, emojiData])
    


    if(!isOpened) {
        return null
    }


    return (
        <div
            
            // initial={{height: 0}}
            // animate={{height: 275}}
            // exit={{height: 0}}
            // transition={{
            //     type: 'spring'
            // }} 
            style={{bottom: pos}} 
            className={`${styles.wrapper}`}
            >
                
            <div className={styles.in}>
                <div className={styles.tabs}>
                    {
                        tabs?.map((item ,index) => {
                            if(index === 1 && type === 'mail') {
                                return (
                                    null
                                ) 
                            } else {
                                return (
                                    <div 
                                    onClick={() => setActiveTab(item.value)}    
                                    className={`${styles.tab} ${activeTab === item.value ? styles.active : ''}`} key={item.value}>{item.label}</div>
                                )
                            }
                        })
                    }
                </div>
                {switchTabContent()}
            </div>
            
        </div>
    )
}





export default Stickers;