import {Modal, ModalFuncProps, Row, Col} from 'antd';
import {FC, useState, useEffect} from 'react';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import Router from 'next/router';
import styles from './LimitModal.module.scss';
import img from '@/public/assets/images/limit-img.png';


interface I extends ModalFuncProps {
    head?: string,
    text?: string,
    action?: {
        link: string,
        label: string
    }
}

const LimitModal:FC<I> = (props) => {
    const {head, text, action, onCancel} = props;


    const onClose = () => {
        onCancel && onCancel()
    }


    return (
        <Modal
            {...props}
            footer={false}
            onCancel={onClose}
            width={385}
            className={`modal ${styles.wrapper}`}
            >
            <Row gutter={[20,20]}>
                <Col span={24}>
                    <div className={styles.img}>
                        <Image src={img} alt='' width={172} height={172}/>
                    </div>
                </Col>
                <Col span={24}>
                    <h4 className={styles.title}>{head}</h4>
                </Col>
                <Col span={24}>
                    <div className={styles.text}>{text}</div>
                </Col>
                {
                    action ? (
                        <Col span={24}>
                            <div className={styles.action}>
                                <Button
                                    text={action.label}
                                    small
                                    onClick={() => Router.push(action.link)}
                                    />
                            </div>
                        </Col>
                    ) : null
                }
            </Row>
        </Modal>
    )
}


export default LimitModal