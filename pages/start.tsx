import Container from "@/components/Container/Container";
import Hero from "@/pageModules/start/components/Hero/Hero";
import Steps from "@/pageModules/start/components/Steps/Steps";
import Descr from "@/pageModules/start/components/Descr/Descr";
import Adv from "@/pageModules/start/components/Adv/Adv";
import Last from "@/pageModules/start/components/Last/Last";
import Faq from "@/pageModules/start/components/Faq/Faq";


const StartPage: React.FC = () => {
    return (
        <>
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