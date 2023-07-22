import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from '@/pageModules/footer/FooterPage.module.scss';
import {useAppSelector} from "@/hooks/useTypesRedux";
import {useEffect, useState} from "react";
import ApiService from "@/service/apiService";
import {useRef} from "react/index";
const service = new ApiService()

const RulesPage = () => {
    const {token, unreadChatCount, userData} = useAppSelector(s => s)
    const spanRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        service.getArticle(token , 'terms_of_use').then(res => {
            if (res) {
                if (spanRef.current) {
                    spanRef.current.innerHTML = res.text_en;
                }
            }
        })
    }, [spanRef.current]);

    return (
        <Container>
            <MainLayout>
                {/* <Sidebar/> */}
                <div className={styles.wrapper}>
                    <h1 className={styles.title}>Правила сайта</h1>
                    <div className={styles.body} ref={spanRef}>
                    </div>
                </div>
            </MainLayout>
        </Container>
    )
}

export default RulesPage;