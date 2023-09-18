import Hero from "@/pageModules/start/components/Hero/Hero";
import Steps from "@/pageModules/start/components/Steps/Steps";
import Descr from "@/pageModules/start/components/Descr/Descr";
import Adv from "@/pageModules/start/components/Adv/Adv";
import Last from "@/pageModules/start/components/Last/Last";
import Faq from "@/pageModules/start/components/Faq/Faq";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useWindowSize } from "usehooks-ts";
import { useAppSelector } from "@/hooks/useTypesRedux";
import Head from "next/head";
import Header from "@/components/Header/Header";
import Find from "@/pageModules/start/components/Find/Find";
import PrivateRoute from "@/hoc/PrivateRoute";

const StartPage: React.FC = () => {
    const {width} = useWindowSize()
    const {token} = useAppSelector(s => s)

    return (
        <PrivateRoute>
            <Head>
                <meta name="verification" content="34dda10c8f41dd109f446ea1555c563c"/>
            </Head>
            <Header/>
            {
                token && width <= 768 ? (
                    <Sidebar/>
                ) : null
            }
            <Hero/>
            <Steps/>
            <Descr/>
            <Find/>
            <Adv/>
            <Last/>
            <Faq/>
        </PrivateRoute>
    )
}

export default StartPage;