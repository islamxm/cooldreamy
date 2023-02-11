import styles from './Faq.module.scss';
import { FC } from 'react';
import Container from '@/components/Container/Container';
import {motion} from 'framer-motion';
import Image from 'next/image';
import bg from '@/public/assets/images/faq-bg.png';
import { Row, Col } from 'antd';
import FaqItem from './components/FaqItem/FaqItem';
import { useState } from 'react';
import { FaqItemPropsTypes } from './components/FaqItem/types';
import { container, item } from '@/helpers/variantsOrderAnim';


const faqItems:FaqItemPropsTypes[] = [
    {head: 'Как работает поиск партнера?', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, pariatur inventore. Cum iusto ut ipsum provident eveniet tempora in voluptate, quis eaque fugit, perspiciatis harum dolore illum pariatur, sapiente voluptatibus.', index: 1, isOpen: false, onChange: () => {}},
    {head: 'Как удалить анкету?', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, pariatur inventore. Cum iusto ut ipsum provident eveniet tempora in voluptate, quis eaque fugit, perspiciatis harum dolore illum pariatur, sapiente voluptatibus.', index: 2, isOpen: false, onChange: () => {}},
    {head: 'Как правильно сортировать анкеты?', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, pariatur inventore. Cum iusto ut ipsum provident eveniet tempora in voluptate, quis eaque fugit, perspiciatis harum dolore illum pariatur, sapiente voluptatibus.', index: 3, isOpen: false, onChange: () => {}},
]




const Faq:FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);


    return (
        <div className={styles.wrapper}>
            <div className={styles.bg}>
                <Image
                    src={bg}
                    alt={'bg'}
                    />
            </div>
            <Container>
                <motion.div 
                    variants={container}
                    initial="hidden"
                    whileInView={'visible'}
                    viewport={{once: true}}
                    className={styles.inner}>
                    <Col span={24}>
                        <Row gutter={[40,40]}>
                            <Col span={24}>
                                <motion.h2 variants={item} className='block-title'>Популярные вопросы</motion.h2>
                            </Col>
                            <Col span={24}>
                                <div className={styles.body}>
                                    {
                                        faqItems?.map(item => (
                                            <div className={styles.item} key={item.index}>
                                                <FaqItem
                                                    onChange={setActiveIndex}
                                                    text={item.text}
                                                    head={item.head}
                                                    index={item.index}
                                                    isOpen={activeIndex == item.index}
                                                    />
                                            </div>
                                        ))
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    
                </motion.div>
            </Container>
        </div>
    )
}

export default Faq;