import { ILocale } from "@/models/ILocale";

const ru: ILocale = {
    global: {
        prompts: {
            targets: {
                communication: 'общение',
                serious_relationship: 'Серьезные отношение',
                flirt: 'Флирт',
                join_trip: 'совместное путешествие',
                real_meetings: 'Реальные встречи'
            },
            interests: {
                sport: 'Спорт',
                art: 'Искусство',
                it: 'IT',
                finance: 'Финансы и инвестиции',
                science: 'Наука',
                travel: 'Путешествие',
                restaurants: 'Рестораны и бары',
                extreme: 'Экстрим',
                nature: 'Природа',
                film: 'Фильмы',
                music: 'Музыка',
                literature: 'Литература',
                shopping: 'Шоппинг',
                dance: 'Танцы',
                cars: 'Машины',
                cooking: 'Кулинария'
            },
            finance: {
                abundance: 'Ни в чем не нуждаюсь',
                search_sponsor: 'Ищу спонсора',
                im_sponsor: 'Могу быть спонсором'
            },
            source: {
                tiktok: 'TikTok',
                youtube: 'YouTube',
                google: 'Google',
                friends: 'Друзья',
                ads: 'Рекламы на сайте',
                other: 'Другие'
            },
            kids: {
                no_kids: 'Нет детей',
                dont_want_kids: 'Не хочу детей',
                want_kids: 'Хочу детей',
                has_kids: 'Дети есть'
            },
            relationship: {
                lonely: 'Одинок',
                looking: 'В поиске',
                widow: 'Вдова',
                have_a_boyfriend: 'Есть парень',
                have_a_girlfriend: 'Есть девушка'
            },
            career: {
                work: 'Работаю',
                study: 'Учусь',
                unemployed: 'Безработный',
            }
        },
        user_card: {
            send_message: 'Написать'
        },
        header: {
            login_btn: 'вход',
            join_btn: 'регистрация',
            logout_btn: 'выход'
        },
        footer: {
            menu: {
                part_1: {
                    title: 'ПОДДЕРЖКА',
                    list: {
                        item_1: 'О проекте',
                        item_2: 'Помощь'
                    }
                },
                part_2: {
                    title: 'СПРАВКА',
                    list: {
                        item_1: 'Правила оплаты',
                        item_2: 'Безопасность'
                    }
                },
                part_3: {
                    title: 'ДОКУМЕНТЫ',
                    list: {
                        item_1: 'Политика приватности',
                        item_2: 'Лицензионное соглашение',
                        item_3: 'Правила сайта'
                    }
                }
            }
        },
        menu: {
            get_premium: 'стань премиум',
            search: 'поиск',
            chats: 'мои переписки',
            feed: 'знакомства',
            sympathy: 'симпатии',
            logout: 'выход',
            buy_credits: 'Купить кредиты'
        },
        my_card: {
            balance: {
                label: 'кредитов',
                title: 'баланс'
            }
        },
        notifications: {
            success_image_upload: 'Фотография добавлена!',
            success_edit_profile: 'Настройки сохранены!',
            error_default: 'Произошла ошибка',
            success_delete_chat: 'Чат удален!',
            success_report: 'Жалоба отправлена!',
            error_wink: 'Вы уже подмигнули данному пользователю',
            success_add_chat_to_fav: 'Чат добавлен в избранные',
            success_socket: 'Соединение установлено!',
            error_socket: 'Соединение прервано!',
            success_email_verify: 'Почта подтверждена!',
            error_email_verify: 'Почта не подтверждена!',

            add_to_fav: 'Вы добавили в избранное',
            already_added_to_fav: 'Вы уже добавили данного пользователя в избранные',

            liked: 'Вы поставили лайк',
            already_liked: 'Вы уже поставили лайк данному пользователю',
            already_wink: 'Вы уже подмигнули данному пользователю',

            get_gift: 'Вы получили подарок',
            get_pic: 'Фотография',
            get_sticker: 'Вы получили стикер',
            get_wink: 'Вам подмигнули'
        },
        placeholders: {
            chat_empty: {
                title: 'Нет переписок',
                text: 'Выберите анкету для общения в чате',
                btn: 'перейти к анкетам'
            },
            nd: 'Не указано'
        },
        select_gender: {
            male: 'Я - Мужчина',
            female: 'Я - Девушка'
        },
        start_gift: {
            title: 'Начните общение с подарка!',
            btn: 'Подарить'
        },
        back_btn: 'Вернуться',
        back_to_site_btn: 'Вернуться на сайт',
        user_action: {
            like: 'НРАВИТСЯ',
            wink: 'ПОДМИГНУТЬ',
            fav: 'ИЗБРАННОЕ',
            open_profile_btn: 'Открыть профиль'
        },
        yes: 'Да',
        no: 'Нет',
        push: {
            settings: {
                success: 'Настройки сохранены',
                error: 'Не удалось сохранить настройки'
            },
            socket: {
                success: 'Соединение установлено',
                error: 'Соединение прервано'
            },
            profile_photo: {
                success: 'Фотография добавлена',
                error: 'Не удалось загрузить фотографию'
            }
        },
        unavailable: 'Проходят технические работы, подождите не много.'
    },
    popups: {
        select_upload_image_type: {
            title: 'Выберите категорию загружаемой картинки',
            list: {
                avatar: 'Аватар',
                public: 'Публичная картинка'
            }
        },
        edit_image: {
            title: 'Выбранная область будет показана на Вашей странице',
            save_btn: 'сохранить',
            cancel_btn: 'отменить',
            upload_btn: 'загрузить'
        },
        login: {
            title: 'Войти',
            fields: {
                password: 'Пароль'
            },
            links: {
                register: 'Регистрация',
                forgot_password: 'Забыли пароль?'
            },
            login_btn: 'Войти'
        },
        logout: {
            title: 'Вы уверены что хотите выйти?'
        },
        nocredit_chat_message: {
            title: 'Вам не хватает кредитов...',
            text_part_1: 'К сожалению сообщение к ',
            text_part_2: ' не доставлено. Пополните баланс. Стоимость действия:'
        },
        nocredit_chat_picture: {
            title: 'Вам не хватает кредитов...',
            text_part_1: 'К сожалению картинка к ',
            text_part_2: ' не доставлено. Пополните баланс. Стоимость действия:'
        },
        nocredit_mail_message: {
            title: 'Вам не хватает кредитов...',
            text_part_1: 'К сожалению письмо к ',
            text_part_2: ' не доставлено. Пополните баланс. Стоимость действия:'
        },
        nocredit_sticker_message: {
            title: 'Вам не хватает кредитов...',
            text_part_1: "К сожалению стикер к ",
            text_part_2: " не доставлено. Пополните баланс. Стоимость действия:"
        },
        nocredit_gift: {
            title: 'Вам не хватает кредитов...',
            text_part_1: "К сожалению подарок к ",
            text_part_2: ' не доставлено. Пополните баланс. Стоимость действия:'
        },
        nocredit_global_chat: 'Your credits are depleted, my friend! To continue chatting, you need to recharge them.',
        profile_modal: {
            open_btn: 'Открыть профиль'
        },
        promo: {
            credits: 'кредитов',
            benefit: 'Выгода',
            buy: 'Купить',
            title: 'Специальное предложение для Вас!',
            open_market: 'Открыть магазин'
        }
    },
    startPage: {
        start_hero_title: 'Ваша история любви начинается здесь! ',
        start_hero_subtitle: 'Если вы ищете серьезные отношения, тогда наш сайт  идеально подходит для вас. Проверьте сами!',
        start_hero_steps: 'Всего за 3 простых шага',
        start_hero_adv: '<ul><li>Быстрая и простая регистрация</li><li>Проверенные пользователи</li><li>Большая база данных пользователей</li></ul>',
        start_steps_1: 'Регистрируйся',
        start_steps_2: 'Смотри анкеты',
        start_steps_3: 'Общайся',
        start_steps_btn: 'Перейти к знакомствам',

        start_what_title: 'Что такое Dating service?',
        start_what_text: `<p>Это один из самых популярных и развитых сервисов для современных знакомств женщин и мужчин, которые ищут любовь в Интернете.</p>
        <p>
        Этот сайт может помочь Вам быстро и эффективно найти свою половинку благодаря современным технологиям и многолетнему опыту работы в сфере знакомств!
        </p>`,
        start_what_ex: 'Знакомься с новыми людьми уже сегодня!',

        start_adv_1: {
            title: 'Умный фильтр',
            text: 'Специальный алгоритм позволит быстро найти подходящую пару'
        },
        start_adv_2: {
            title: 'Безопасность',
            text: 'Вы можете быть уверенны за приватность данных на сервисе'
        },
        start_adv_3: {
            title: 'Проверка',
            text: 'Пользователи существуют и заинтересованы в отношениях'
        },


        start_meet_title: 'Начни общение',
        start_meet_text: 'В наше время приложения для знакомств стали неотъемлемой частью нашей жизни. Они позволяют вам проверить профиль одиночек, живущих рядом с вами, пообщаться с ними, познакомиться с ними и, возможно, влюбиться.',
        start_meet_btn: 'Заполнить анкету',
        start_meet_message_1: 'Присоединяйся, чтобы построить счастливые отношения',
        start_meet_message_2: 'Найти половинку стало просто!',

        start_faq_title: 'Популярные вопросы',
        start_faq_list: {
            start_faq_item_1: {
                title: 'Чем наш сайт знакомств отличается от других?',
                text: 'Мы отличаемся своим огромным сообществом реальных пользователей, которые ищут серьезные отношения. Наша команда активно работает над проверкой профилей и обеспечением безопасности, чтобы вы могли наслаждаться комфортным и приятным опытом знакомств'
            },
            start_faq_item_2: {
                title: 'Какой успех у пользователей нашего сайта?',
                text: 'Благодаря нашему сайту знакомств уже более 560 000 пользователей нашли свою идеальную пару. Мы гордимся этими историями успеха и стремимся помочь вам найти свою счастливую историю.'
            },
            start_faq_item_3: {
                title: 'Какая гарантия, что пользователи реальные?',
                text: 'Мы придаем большое значение проверке профилей и борьбе с фейковыми аккаунтами. Наша команда тщательно проверяет каждый профиль, чтобы убедиться в подлинности пользователей и создать доверительную среду для знакомств.'
            }
        }
    },
    searchPage: {
        filter: {
            found: 'Найдено',
            list: {
                filter_country: {
                    label: 'Страна',
                    placeholder: 'Страна'
                },
                filter_state: {
                    label: 'Регион',
                    placeholder: 'Регион',
                },
                filter_target: {
                    label: 'Цель знакомства'
                },
                filter_finance: {
                    label: 'Финансовые цели'
                },
                filter_age: {
                    label: 'Возраст'
                }
            },
            action: {
                show: 'Все фильтры',
                hide: 'Скрыть',
                search_btn: 'Найти',
                mobile_filter_btn: 'Фильтр',
                clear: 'Очистить фильтр'
            },
            tabs: {
                all: 'Все',
                near: 'Рядом',
                new: 'Новые',
                online: 'Онлайн',
            },
            title: 'Фильтр'
        }
    },
    chatPage: {
        type_tabs: {
            chat: 'чат',
            mail: 'письма'
        },
        filter_tabs: {
            all: 'Все переписки',
            notread: 'Не прочитанные',
            favs: 'Избранные',
            ignored: 'Игнорируемые'
        },
        search: 'поиск',
        premium: {
            label: 'Обменяйся контактами!',
            btn: 'стань premium'
        },
        pricing: {
            title: 'Стоимость действий в чате',
            list: {
                item_1: 'Отправить сообщение',
                item_2: 'Отправить письмо'
            }
        },
        action: {
            placeholder: 'Напишите сообщение'
        },
        smiles_and_stickers: {
            smile: 'Смайлы',
            sticker: 'Стикеры'
        },
        gifts: {
            buy_btn: {
                first_part: 'Купить',
                last_part: {
                    single: 'подарок',
                    plural: 'подарка'
                }
            },
            gift_action: {
                select_btn: 'Добавить',
                remove_btn: 'Добавлен'
            }
        },
        menu: {
            wink: 'Подмигнуть',
            fav: 'В избранное',
            ignore: 'Игнорировать',
            report: 'Пожаловаться'
        }
    },
    sympathyPage: {
        tabs: {
            views: 'просмотры',
            matches: 'совпадения',
            you_like: 'вам нравятся',
            likes_you: 'вы нравитесь'
        },
        description: {
            views: 'Девушка просмотрела Вашу анету - считайте, она уже готова начать общение. Напишите ей!',
            matches: 'Вы поставили друг другу лайк в “Знакомства”. Начните общение прямо сейчас',
            you_like: 'В этой вкладке находятся пользователи, которым Вы ставите лайк',
            likes_you: 'В этой вкладке находятся пользователи, которым Вы нравитесь'
        }
    },
    profilePage: {
        info: {
            name: 'Имя',
            about: 'О себе',
            country: 'Страна/Регион',
            target: 'Цели знакомства',
            finance: 'Финансовые предпочтения',
            career: 'Карьера',
            relationship: 'Семейное положение',
            kids: 'Дети'
        },
        images: {
            add_btn: 'Добавить фото',
            verify_btn: 'Подтвердить фото'
        },
        action: {
            message_btn: 'Сообщение'
        }
    },
    signupPage: {
        main: {
            title: 'Регистрация',
            next_btn: 'Дальше',
            end_btn: 'Завершить'
        },
        steps: {
            step_1: {
                name: 'Имя',
                password: 'Пароль',
                birthday: 'День рождения',
                privacy: {
                    label: 'Продолжив, Вы принимаете',
                    link: 'Условия пользовательского соглашения и конфидициальности'
                }
            },
            step_2: {
                title:'Расскажите о своих целях на сайте'
            },
            step_3: {
                title: 'Расскажите о своих интересах'
            },
            step_4: {
                title: 'Материальное состояние'
            },
            step_5: {
                title: 'Откуда вы узнали о нас?'
            },
            step_6: {
                title: 'Дети'
            },
            step_7: {
                title: 'Семейное положение'
            },
            step_8: {
                title: 'Род деятельности'
            },
            step_9: {
                title: 'Добавьте фото',
                text: 'Загрузите свое лучшее фото - это привлечет больше внимания пользователей к профилю'
            },
            step_10: {
                title: 'Расскажите о себе',
                text: 'Пара фраз о себе привлечет внимание пользователей',
                placeholder: 'Не менее 20 символов...',
                ex: 'Согласно правилам сайта запрещено указывать контактные данные'
            },
            upload_avatar: {
                title: 'Добавьте фото',
                text: 'Загрузите свое лучшее фото - это привлечет больше внимания пользователей к профилю',
            },
            about_self: {
                title: 'Расскажите о себе',
                text: 'Пара фраз о себе привлечет внимание пользователей',
                placeholder: 'Не менее 20 символов...',
                ex: 'Согласно правилам сайта запрещено указывать контактные данные'
            }
        }
    },
    depositPage: {
        main: {
            title: 'Пополнение баланса',
            my_balance: 'Ваш баланс:',
        },
        card: {
            price: 'цена',
            credits: 'кредитов',
            discount: 'со скидкой',
            popular: 'популярный',
            spec_offer: 'выгодный'
        },
        select_btn: 'Купить тариф за ',
        form: {
            title: 'Оплата',
            subtitle: 'Введите данные карты',
            btn: 'Оплатить'
        }
    }

}

export default ru;