import Container from "@/components/Container/Container";
import Hero from "@/pageModules/start/components/Hero/Hero";
import Steps from "@/pageModules/start/components/Steps/Steps";
import Descr from "@/pageModules/start/components/Descr/Descr";
import Adv from "@/pageModules/start/components/Adv/Adv";
import Last from "@/pageModules/start/components/Last/Last";
import Faq from "@/pageModules/start/components/Faq/Faq";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useWindowSize } from "usehooks-ts";
import { useAppSelector } from "@/hooks/useTypesRedux";
import ru from "@/helpers/localeMock";
import { useEffect } from "react";

const StartPage: React.FC = () => {
    const {width} = useWindowSize()
    const {token} = useAppSelector(s => s)

    useEffect(() => {
        console.log(JSON.stringify(ru))
    }, [])

    return (
        <>
            {
                token && width <= 768 ? (
                    <Sidebar/>
                ) : null
            }
            <Hero/>
            <Steps/>
            <Descr/>
            <Adv/>
            <Last/>
            <Faq/>
        </>
    )
}

export default StartPage;