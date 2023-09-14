import styles from './Steps.module.scss';
import Container from '@/components/Container/Container';
import {motion} from 'framer-motion';
import Button from '@/components/Button/Button';
import StepItem from './components/StepItem/StepItem';
import { container} from '@/helpers/variantsOrderAnim';
import Router from 'next/router';
import { useAppSelector } from '@/hooks/useTypesRedux';
import img1 from '@/public/assets/images/start-steps-1.svg'
import img2 from '@/public/assets/images/start-steps-2.svg'
import img3 from '@/public/assets/images/start-steps-3.svg'
import Image from 'next/image';

const Steps = () => {
    const {locale} = useAppSelector(s => s)

    return (
        <motion.div
            initial={{
                scale: 0
            }} 
            whileInView={{
                scale: 1,
                transition: {
                    type: 'spring',
                    
                },
                
            }}
            viewport={{once: true}}
            className={styles.steps}>
            <Container>
                <div className={styles.inner}>
                    <motion.div 
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        className={styles.main}>
                            <div className={styles.list}>
                                <div
                                    className={styles.item}
                                    >
                                    <StepItem
                                        icon={
                                            <Image
                                            src={img1}
                                            alt=""
                                            />
                                        }
                                        text={
                                            <>
                                            Cool Dreamy является <span>надежным</span> сайтом, имеет сертификат безопасности TrustedSite!
                                            </>
                                        }

                                        />
                                </div>
                                <div
                                    className={styles.item}
                                    >
                                    <StepItem
                                        icon={
                                            <Image
                                            src={img2}
                                            alt=""
                                            />
                                        }
                                        text={
                                            <>
                                            Cool Dreamy входит в <span>десятку лучших сайтов</span> знакомств по версии iDate Award!
                                            </>
                                        }
                                        />
                                </div>
                                <div
                                    className={styles.item}
                                    >
                                    <StepItem
                                        text={
                                            <>
                                            На сайте Cool Dreamy <span>нашли идеальную пару</span> более 5 000 пользователей!   
                                            </>
                                        }
                                        icon={
                                            <Image
                                            src={img3}
                                            alt=""
                                            />
                                        }
                                        />
                                </div>
                            </div>
                    </motion.div>
                    {/* <div className={styles.action}>
                        <Button
                            onClick={() => Router.push('/signup')}
                            text={locale?.startPage?.start_steps_btn}
                            />
                    </div> */}
                </div>
            </Container>
        </motion.div>
    )
}


export default Steps;
