import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from '@/pageModules/footer/FooterPage.module.scss';
import {useAppSelector} from "@/hooks/useTypesRedux";
import {useEffect, useState} from "react";
import ApiService from "@/service/apiService";
const service = new ApiService()

const RulesPage = () => {
    const {token, unreadChatCount, userData} = useAppSelector(s => s)
    const [data, setData] = useState('');

    useEffect(() => {
        service.getArticle(token , 'terms_of_use').then(res => {
            if (res) {
                setData(res.text_ru);
            }
        })
    }, [token]);

    return (
        <Container>
            <MainLayout>
                {/* <Sidebar/> */}
                <div className={styles.wrapper}>
                    <h1 className={styles.title}>Правила сайта</h1>
                    <div className={styles.body}>
                        {data}
                    </div>
                </div>
            </MainLayout>
        </Container>
    )
}

export default RulesPage;