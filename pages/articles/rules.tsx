import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from '@/pageModules/footer/FooterPage.module.scss';

const RulesPage = () => {

    return (
        <Container>
            <MainLayout>
                <Sidebar/>
                <div className={styles.wrapper}>
                    <h1 className={styles.title}>Правила сайта</h1>
                    <div className={styles.body}>
                        <h3>Общие правила</h3>
                        <p>
                        1. Пользователь имеет право подавать жалобу администрации сайта на других пользователей при условии, если последний каким-либо действием нарушил правила данного Сайта.
                        </p>
                        <p>
                        2. Пользователь может создать одну бесплатную анкету. Каждая дальнейшая анкета требует определенной платы. При отсутствии оплаты, анкета будет немедленно удалена. После удаления анкеты, новая будет активна для коммуникации только при том условии, что была произведена оплата неактивированных данных и команд. Эти правила распространяются на мужскую часть пользователей Сайта. Для того, чтобы активировать вторую анкету для девушек, необходимо ее разблокировать. При невыполнении данных условий, такая анкета будет немедленно удалена. Если такая анкета была удалена, то общение посредством новой анкеты становится доступным только при условии, что была произведена оплата неактивированных данных и команд
                        </p>
                        <p>
                        3. Администрация сайта имеет право на дальнейшие действия:Взимать штрафы согласно нарушениям;<br/>
                        Отказывать в пробном Премиум статусе пользователям, которые зарегистрировались на Сайте при помощи временных почтовых сервисов;<br/>
                        Отказывать пользователю в доступе, не оглашая причин;<br/>
                        Блокировать учетную запись при условии, что пользователь не был активен в течении определённого времени;<br/>
                        Напоминать о соблюдении правил;<br/>
                        Блокировать учетные записи без предупреждения;<br/>
                        Блокировать учетные записи без объяснения причин;<br/>
                        Удалять сообщения.
                        </p>
                        <p>
                        Следует помнить, что если ваша учетная запись была удалена, то деньги, которые были на вашем балансе, возвращены не будут. Также, при удалении учетной записи, вы не имеете права создавать еще один аккаунт на данном Сайте. При регистрации после удаления аккаунта, Администрация не несет ответственности за подобные анкеты.
                        </p>
                        <p>
                        4. Администрация сайта имеет право менять правила в любой момент.
                        </p>
                        <h3>Нарушения</h3>
                        <ul>
                            <li>За недостойное и оскорбительное поведение с другими пользователями на Сайте ваша анкета будет удалена;</li>
                            <li>Любое интернет-мошенничество также приведет к удалению анкеты;</li>
                            <li>
                            Если вы ищете партнера не для себя – это приведет к удалению учетной записи;
                            </li>
                            <li>Мужчинам запрещено совершать внутренние звонки мужчинам на Сайте;</li>
                            <li>Пользование браузером TOR – запрещено;</li>
                            <li>Фото с гениталиями будут сразу удалены, так же как и ваша учетная запись;</li>
                            <li>Рассылка спам-сообщений является серьезным нарушением, которое приведет к удалению учетной записи;</li>
                            <li>
                            Попрошайничество и вымогательство денежных средств ведут к удалению учетной записи;
                            </li>
                            <li>
                            Сбор средств на благотворительность на других сайтах, удаление с блокировкой аккаунта;
                            </li>
                            <li>Несоблюдение назначенных встреч – удаление учетной записи;</li>
                            <li>
                            Общение на политические и религиозные темы с целью разжигания дискуссии – удаление учетное записи;
                            </li>
                            <li>Оскорбительное поведение с девушками во время реальных свиданий – удаление с сайта;</li>
                            <li>Действия, связанные с проституцией или иными платными услугами (массаж, вирт в скайпе, секс по телефону и подобные) приводят к блокировке учетной записи.</li>
                        </ul>
                        <h3>Правила размещения фотографий</h3>
                        <ul>
                            <li>Допускаются фотографии:На которых изображен реальный владелец анкеты;</li>
                            <li>Сделанные в дневное время суток, без каких-либо дефектов и размытий;</li>
                            <li>Четко и полностью показывающие лицо пользователя.
                            Фото не будут размещены, если там присутствуют:Подтекст религиозного, эротического, или политического характеров;
                            </li>
                            <li>Третьи лица, а также дети;</li>
                            <li>Фото, показывающие только часть тела;</li>
                            <li>Оружие, наркотики, или другой контент, демонстрирующий правонарушения;</li>
                            <li>Контент, нарушающий авторские права;</li>
                            <li>Контент оскорбительного характера;</li>
                            <li>Контент, пропагандирующий употребление наркотиков, спиртных напитков и табакокурение;</li>
                            <li>Любой рекламный контент;</li>
                            <li>Контент, нарушающий законодательство Англии и Уэльса;</li>
                        </ul>
                        <p>
                        Также следует уточнить, что Администрация имеет право удалить любую фотографию в вашем профиле без объяснения причин.
                        </p>
                        <p>
                        Если Вы продолжаете общение и пользование функциями на Сайте, это предполагает, что вы согласны с каждым пунктом данных правил!
                        </p>
                    </div>
                </div>
            </MainLayout>
        </Container>
    )
}

export default RulesPage;