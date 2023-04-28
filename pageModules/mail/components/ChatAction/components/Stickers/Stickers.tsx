import styles from './Stickers.module.scss';
import {motion} from 'framer-motion';
import {useState, useEffect, useCallback} from 'react';
import ApiService from '@/service/apiService';
import Sticker from '@/components/Sticker/Sticker';
import emojiData from '@/helpers/emojiData';
import Smile from '@/components/Smile/Smile';
import { useAppSelector } from '@/hooks/useTypesRedux';

const service = new ApiService()


const tabs = [
    {value: 1, label: 'Смайлы'},
    {value: 2, label: 'Стикеры'},
]







const Stickers = ({
    pos,
    onSmileSelect,
    onStickerSelect
}: {
    pos?: number,
    onSmileSelect?: (label: string) => any,
    onStickerSelect?: (id: number) => any
}) => {
    const {token} = useAppSelector(s => s)

    const [activeTab, setActiveTab] = useState<number>(1)
    const [list, setList] = useState<any[]>()

        
    useEffect(() => {
        if(token) {
            service.getStickers(token).then(res => {
                setList(res)
            })
        }
       
    }, [])


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


    return (
        <motion.div
            initial={{height: 0}}
            animate={{height: 275}}
            exit={{height: 0}}
            transition={{
                type: 'spring'
            }} 
            style={{bottom: pos}} 
            className={`${styles.wrapper}`}>
                
            <div className={styles.in}>
                <div className={styles.tabs}>
                    {
                        tabs?.map((item ,index) => (
                            <div 
                            onClick={() => setActiveTab(item.value)}    
                            className={`${styles.tab} ${activeTab === item.value ? styles.active : ''}`} key={item.value}>{item.label}</div>
                        ))
                    }
                </div>
                {switchTabContent()}
            </div>
            
        </motion.div>
    )
}





export default Stickers;