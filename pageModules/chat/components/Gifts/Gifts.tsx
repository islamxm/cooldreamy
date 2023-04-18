import styles from './Gifts.module.scss';
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';
import {useState, useEffect, useCallback} from 'react';
import Button from '@/components/Button/Button';
import GiftCard from '@/components/GiftCard/GiftCard';
import {AiOutlineGift} from 'react-icons/ai';
import GiftMainCard from '@/components/GiftMainCard/GiftMainCard';
import {AnimatePresence} from 'framer-motion';


const service = new ApiService()

const mock = [
    {
        category: null,
        created_at: "2023-04-07T13:13:17.000000Z",
        credits:null,
        id:1,
        name: "гифт1",
        picture_url: "https://avatars.mds.yandex.net/i?id=3f648ea8dfc9b2787addacbb7f660e6ac90a9b3b-3709311-images-thumbs&ref=rim&n=33&w=173&h=150",
        updated_at: "2023-04-07T13:13:17.000000Z"
    },
    {
        category: null,
        created_at: "2023-04-07T13:13:17.000000Z",
        credits:null,
        id:1,
        name: "гифт1",
        picture_url: "https://avatars.mds.yandex.net/i?id=3f648ea8dfc9b2787addacbb7f660e6ac90a9b3b-3709311-images-thumbs&ref=rim&n=33&w=173&h=150",
        updated_at: "2023-04-07T13:13:17.000000Z"
    },
    {
        category: null,
        created_at: "2023-04-07T13:13:17.000000Z",
        credits:null,
        id:1,
        name: "гифт1",
        picture_url: "https://avatars.mds.yandex.net/i?id=3f648ea8dfc9b2787addacbb7f660e6ac90a9b3b-3709311-images-thumbs&ref=rim&n=33&w=173&h=150",
        updated_at: "2023-04-07T13:13:17.000000Z"
    },
    {
        category: null,
        created_at: "2023-04-07T13:13:17.000000Z",
        credits:null,
        id:1,
        name: "гифт1",
        picture_url: "https://avatars.mds.yandex.net/i?id=3f648ea8dfc9b2787addacbb7f660e6ac90a9b3b-3709311-images-thumbs&ref=rim&n=33&w=173&h=150",
        updated_at: "2023-04-07T13:13:17.000000Z"
    },
    {
        category: null,
        created_at: "2023-04-07T13:13:17.000000Z",
        credits:null,
        id:1,
        name: "гифт1",
        picture_url: "https://avatars.mds.yandex.net/i?id=3f648ea8dfc9b2787addacbb7f660e6ac90a9b3b-3709311-images-thumbs&ref=rim&n=33&w=173&h=150",
        updated_at: "2023-04-07T13:13:17.000000Z"
    },
    {
        category: null,
        created_at: "2023-04-07T13:13:17.000000Z",
        credits:null,
        id:1,
        name: "гифт1",
        picture_url: "https://avatars.mds.yandex.net/i?id=3f648ea8dfc9b2787addacbb7f660e6ac90a9b3b-3709311-images-thumbs&ref=rim&n=33&w=173&h=150",
        updated_at: "2023-04-07T13:13:17.000000Z"
    },
    {
        category: null,
        created_at: "2023-04-07T13:13:17.000000Z",
        credits:null,
        id:1,
        name: "гифт1",
        picture_url: "https://avatars.mds.yandex.net/i?id=3f648ea8dfc9b2787addacbb7f660e6ac90a9b3b-3709311-images-thumbs&ref=rim&n=33&w=173&h=150",
        updated_at: "2023-04-07T13:13:17.000000Z"
    },
    {
        category: null,
        created_at: "2023-04-07T13:13:17.000000Z",
        credits:null,
        id:1,
        name: "гифт1",
        picture_url: "https://avatars.mds.yandex.net/i?id=3f648ea8dfc9b2787addacbb7f660e6ac90a9b3b-3709311-images-thumbs&ref=rim&n=33&w=173&h=150",
        updated_at: "2023-04-07T13:13:17.000000Z"
    },
    {
        category: null,
        created_at: "2023-04-07T13:13:17.000000Z",
        credits:null,
        id:1,
        name: "гифт1",
        picture_url: "https://avatars.mds.yandex.net/i?id=3f648ea8dfc9b2787addacbb7f660e6ac90a9b3b-3709311-images-thumbs&ref=rim&n=33&w=173&h=150",
        updated_at: "2023-04-07T13:13:17.000000Z"
    },
    {
        category: null,
        created_at: "2023-04-07T13:13:17.000000Z",
        credits:null,
        id:1,
        name: "гифт1",
        picture_url: "https://avatars.mds.yandex.net/i?id=3f648ea8dfc9b2787addacbb7f660e6ac90a9b3b-3709311-images-thumbs&ref=rim&n=33&w=173&h=150",
        updated_at: "2023-04-07T13:13:17.000000Z"
    },
    {
        category: null,
        created_at: "2023-04-07T13:13:17.000000Z",
        credits:null,
        id:1,
        name: "гифт1",
        picture_url: "https://avatars.mds.yandex.net/i?id=3f648ea8dfc9b2787addacbb7f660e6ac90a9b3b-3709311-images-thumbs&ref=rim&n=33&w=173&h=150",
        updated_at: "2023-04-07T13:13:17.000000Z"
    },
    {
        category: null,
        created_at: "2023-04-07T13:13:17.000000Z",
        credits:null,
        id:1,
        name: "гифт1",
        picture_url: "https://avatars.mds.yandex.net/i?id=3f648ea8dfc9b2787addacbb7f660e6ac90a9b3b-3709311-images-thumbs&ref=rim&n=33&w=173&h=150",
        updated_at: "2023-04-07T13:13:17.000000Z"
    },
    {
        category: null,
        created_at: "2023-04-07T13:13:17.000000Z",
        credits:null,
        id:1,
        name: "гифт1",
        picture_url: "https://avatars.mds.yandex.net/i?id=3f648ea8dfc9b2787addacbb7f660e6ac90a9b3b-3709311-images-thumbs&ref=rim&n=33&w=173&h=150",
        updated_at: "2023-04-07T13:13:17.000000Z"
    },
    {
        category: null,
        created_at: "2023-04-07T13:13:17.000000Z",
        credits:null,
        id:1,
        name: "гифт1",
        picture_url: "https://avatars.mds.yandex.net/i?id=3f648ea8dfc9b2787addacbb7f660e6ac90a9b3b-3709311-images-thumbs&ref=rim&n=33&w=173&h=150",
        updated_at: "2023-04-07T13:13:17.000000Z"
    },
    {
        category: null,
        created_at: "2023-04-07T13:13:17.000000Z",
        credits:null,
        id:1,
        name: "гифт1",
        picture_url: "https://avatars.mds.yandex.net/i?id=3f648ea8dfc9b2787addacbb7f660e6ac90a9b3b-3709311-images-thumbs&ref=rim&n=33&w=173&h=150",
        updated_at: "2023-04-07T13:13:17.000000Z"
    },
    {
        category: null,
        created_at: "2023-04-07T13:13:17.000000Z",
        credits:null,
        id:1,
        name: "гифт1",
        picture_url: "https://avatars.mds.yandex.net/i?id=3f648ea8dfc9b2787addacbb7f660e6ac90a9b3b-3709311-images-thumbs&ref=rim&n=33&w=173&h=150",
        updated_at: "2023-04-07T13:13:17.000000Z"
    },
]


const Gifts = ({
    pb,
    onSend,
    onClose
}: {
    pb: number,
    onSend: (list: string) => any,
    onClose: (...args: any[]) => any
}) => {
    const {token} = useAppSelector(s => s);
    const [list, setList] = useState<any[]>([])
    const [selected, setSelected] = useState<number[]>([])


    useEffect(() => {
        if(token) {
            service.getGifts(token).then(res => {
                console.log(res)
                setList(res)
            })
        }
    }, [token]) 


    const selectItem = (type: 'remove' | 'add', id: number) => {
        console.log(type)
        if(type === 'add') {
            setSelected(s => [...s, id])
        }
        if(type === 'remove') {
            const m = selected;
            const rm = m.splice(m.findIndex(i => i === id), 1)
            setSelected([...m])
        }
    }


    const onSubmit = useCallback(() => {
        if(selected?.length > 0) {
            const mod = `[${selected.join(',')}]`
            onSend(mod)
            onClose()
        }
    }, [selected, onSend])


    return (
        <div className={`${styles.wrapper}`} style={{height: `calc(100% - ${pb}px)`}}>
            <div className={styles.list}>
                {
                    list?.map((item,index) => (
                        <div className={styles.item} key={index}>
                            <GiftMainCard
                                onSelect={selectItem}
                                active={selected?.find(i => i === item.id) ? true : false}
                                id={item?.id}
                                label={item?.name}
                                image={item?.picture_url}
                                />
                        </div>
                    ))
                }
            </div>
            <AnimatePresence>
                {
                    selected?.length > 0 ? (
                        <div 
                            className={styles.action}>
                            <Button
                                onClick={onSubmit}
                                after={<AiOutlineGift/>}
                                text={`Купить ${selected?.length} ${selected?.length > 1 ? 'подарка' : 'подарок'}`}
                            />
                        </div>  
                    ) : null
                }
            </AnimatePresence>
            
           
        </div>
    )
}

export default Gifts;