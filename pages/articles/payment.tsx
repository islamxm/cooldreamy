import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from '@/pageModules/footer/FooterPage.module.scss';
import {useAppSelector} from "@/hooks/useTypesRedux";
import ApiService from "@/service/apiService";
import {useEffect, useState} from "react";

const service = new ApiService()

const PaymentPage = () => {
    const {token, unreadChatCount, userData} = useAppSelector(s => s)
    const [data, setData] = useState('');

    useEffect(() => {
        service.getArticle(token , 'terms_of_pay').then(res => {
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
                    <h1 className={styles.title}>Правила оплаты</h1>
                    <div className={styles.body}>
                        {data}
                    </div>
                </div>
            </MainLayout>
        </Container>
    )
}

export default PaymentPage;