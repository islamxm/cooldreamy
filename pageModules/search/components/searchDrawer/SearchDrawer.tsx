import styles from './SearchDrawer.module.scss';
import {FC, useState, useEffect, useRef} from 'react'
import IconButton from '@/components/IconButton/IconButton';
import {GrClose} from 'react-icons/gr';
import { searchDrawerPropsType } from './types';
import { useAnimation, motion } from 'framer-motion';
import {Row, Col} from 'antd';
import SelectDef from '@/components/SelectDef/SelectDef';
import RangeSlider from '@/components/RangeSlider/RangeSlider';
import Button from '@/components/Button/Button';
import { searchFilterType } from '../searchFilter/types';



const  usePrevious = (value: boolean) => {
    const previousValueRef = useRef<any>();
  
    useEffect(() => {
      previousValueRef.current = value;
    }, [value]);
  
    return previousValueRef.current;
}

interface I extends searchFilterType {
    isOpen: boolean,
    onClose: (...args: any[]) => any
    onOpen: (...args: any[]) => any
}



const SearchDrawer:FC<I> = ({
    isOpen,
    onClose,
    onOpen,

    targetList, 
    financeList,
    age_range_start,
    age_range_end,
    prompt_target_id,
    prompt_finance_state_id,
    
    setage_range_start,
    setage_range_end,
    setprompt_target_id,
    setprompt_finance_state_id,

    onSearch,
    load,


    countries,
    country,
    setCountry,

    states,
    state,
    setState,
    clearStates,

    clearFilter,
    onToggleDrawer
}) => {

    const prevIsOpen = usePrevious(isOpen)
    const controls = useAnimation()



    const onDragEnd = (e: any, info: any) => {
        const shouldClose = info.velocity.y > 20 || (info.velocity.y >= 0 && info.point.y > 45);

   
        if (shouldClose) {
            controls.start("hidden");
            onClose();
        } else {
            controls.start("visible");
            onOpen();
        }
    }

    useEffect(() => {
        if (prevIsOpen && !isOpen) {
          controls.start("hidden");
        } else if (!prevIsOpen && isOpen) {
          controls.start("visible");
        }
      }, [controls, isOpen, prevIsOpen]);

    return (
        <motion.div 
            drag='y'
            onDragEnd={onDragEnd}
            initial="hidden"
            animate={controls}
            transition={{
            type: "spring",
            damping: 40,
            stiffness: 400
            }}
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            variants={{
            visible: { y: 0 },
            hidden: { y: "100%" }
            }}
            className={styles.wrapper}>
            <div className={styles.head}>
                <div className={styles.title}>Фильтр</div>
                <div className={styles.close}>
                    <IconButton
                        onClick={onClose}
                        size={15}
                        icon={<GrClose/>}
                        variant={'transparent'}
                        />
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.body}>
                    <Row gutter={[10,10]}>
                        <Col span={12}>
                            <SelectDef

                                label='Страна'
                       
                                placeholder='Страна'
                                onChange={(e,v) => {
                                    setCountry(v)
                                }}
                                onClear={clearStates}
                                list={countries}
                                />
                        </Col>
                        <Col span={12}>
                            {
                                states?.length > 0 ? (
                                    <SelectDef
                                            label='Город'
                                  
                                            onChange={(e, v) => {
                                                setState(v)
                                            }}
                                            placeholder='Город'
                                            list={states}
                                            />
                                ) : null
                            }
                        </Col>
                        
                        <Col span={12}>
                            <RangeSlider
                                
                                min={18}
                                max={70}
                                onChange={e => {
                                    setage_range_start && setage_range_start(e[0])
                                    setage_range_end && setage_range_end(e[1])
                                }}
                                range={true}
                                value={[age_range_start,age_range_end]}    
                                label={'Возраст'}
                                // unit={'год'}
                                />
                        </Col>
                    </Row>
                </div>
                <div className={styles.action}>
                    <Row gutter={[10,10]}>
                        <Col span={24}>
                            <div className={styles.item}>
                                <Button
                                    text='Найти'
                                    middle
                                    onClick={() => onSearch && onSearch()}
                                    load={load}
                                    />
                            </div>
                        </Col>
                        <Col span={24}>
                            <div className={styles.item}>
                                <Button
                                    onClick={clearFilter}
                                    text='Очистить фильтр'
                                    middle
                                    variant={'bordered'}
                                    />
                            </div>
                        </Col>
                        
                    </Row>
                </div>
            </div>
        </motion.div>  
    )
}

export default SearchDrawer;


