import styles from './Footer.module.scss';
import { FC } from 'react';
import {motion} from 'framer-motion';
import { container, item } from '@/helpers/variantsOrderAnim';
import Container from '../Container/Container';
import Image from 'next/image';
import logo from '@/public/assets/images/logo-big.svg';
import FooterPart from './components/FooterPart/FooterPart';
import { FooterPartPropsTypes } from './components/FooterPart/types';


const footerList: FooterPartPropsTypes[] = [
    {
        head: 'поддержка',
        list: [
            {label: 'О проекте', link: '/'},
            {label: 'Помощь', link: '/'},
        ]
    },
    {
        head: 'справка',
        list: [
            {label: 'Правила оплаты', link: '/'},
            {label: 'Безопасность', link: '/'},
        ]
    },
    {
        head: 'Документы',
        list: [
            {label: 'Политика приватности', link: '/'},
            {label: 'Лицензионное соглашение', link: '/'},
            {label: 'Правила сайта', link: '/'},
        ]
    }
]


const Footer:FC = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.inner}>
                    <div className={styles.main}>
                        <div className={styles.logo}>
                            <Image
                                src={logo}
                                alt={'Cool Date'}
                                />
                        </div>
                        <div className={styles.body}>
                            {
                                footerList?.map((item, index) => (
                                    <div className={styles.item} key={index}>
                                        <FooterPart
                                            head={item.head}
                                            list={item.list}
                                            />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={styles.ex}>
                        Copyright © 2022.All Rights Reserved
                    </div>
                </div>
            </Container>
        </footer>        
    )
}

export default Footer;