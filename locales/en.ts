import { ILocale } from "@/models/ILocale";

const en: ILocale = {
  global: {
    prompts: {
      targets: {
        communication: "communication",
        serious_relationship: "serious relationship",
        flirt: "flirt",
        join_trip: "join trip",
        real_meetings: "real meetings"
      },
      interests: {
        sport: "sport",
        art: "art",
        it: "IT",
        finance: "finance and investments",
        science: "science",
        travel: "travel",
        restaurants: "restaurants and bars",
        extreme: "extreme",
        nature: "nature",
        film: "films",
        music: "music",
        literature: "literature",
        shopping: "shopping",
        dance: "dance",
        cars: "cars",
        cooking: "cooking"
      },
      finance: {
        abundance: "abundance",
        search_sponsor: "search sponsor",
        im_sponsor: "I can be a sponsor"
      },
      source: {
        tiktok: "TikTok",
        youtube: "YouTube",
        google: "Google",
        friends: "Друзья",
        ads: "Рекламы на сайте",
        other: "Другие"
      },
      kids: {
        no_kids: "No kids",
        dont_want_kids: "Don't want kids",
        want_kids: "Want kids",
        has_kids: "Has kids"
      },
      relationship: {
        lonely: "Lonely",
        looking: "Looking",
        widow: "Widow",
        have_a_boyfriend: "Have a boyfriend",
        have_a_girlfriend: "Have a girlfriend"
      },
      career: {
        work: "Employed",
        study: "Studying",
        unemployed: "Unemployed"
      }
    },
    user_card: {
      send_message: "Write"
    },
    header: {
      login_btn: "Log in",
      join_btn: "Register",
      logout_btn: "Log out"
    },
    footer: {
      menu: {
        part_1: {
          title: "SUPPORT",
          list: {
            item_1: "About",
            item_2: "Help"
          }
        },
        part_2: {
          title: "FAQ",
          list: {
            item_1: "Payment Rules",
            item_2: "Security"
          }
        },
        part_3: {
          title: "DOCUMENTS",
          list: {
            item_1: "Privacy Policy",
            item_2: "License Agreement",
            item_3: "Site Rules"
          }
        }
      }
    },
    menu: {
      get_premium: "Become Premium",
      search: "Search",
      chats: "My Chats",
      feed: "Dating",
      sympathy: "Sympathy",
      logout: "Log out"
    },
    my_card: {
      balance: {
        label: "credits",
        title: "Balance"
      }
    },
    notifications: {
      success_image_upload: "Photo added!",
      success_edit_profile: "Settings saved!",
      error_default: "An error occurred"
    },
    placeholders: {
      chat_empty: {
        title: "No Chats",
        text: "Select a profile to communicate in the chat",
        btn: "Go to Profiles"
      }
    }
  },
  popups: {
    select_upload_image_type: {
      title: "Select the category of the uploaded image",
      list: {
        avatar: "Avatar",
        public: "Public Image"
      }
    },
    edit_image: {
      title: "The selected area will be shown on your page",
      save_btn: "Save",
      cancel_btn: "Cancel",
      upload_btn: "Upload"
    },
    login: {
      title: 'Login',
      fields: {
          password: 'Password'
      },
      links: {
          register: 'Join us',
          forgot_password: 'Forgot password?'
      },
      login_btn: 'Login'
  }
  },
  startPage: {
    start_hero_title: "Over 16,000 users",
    start_hero_subtitle: "found their perfect match",
    start_hero_steps: "Just 3 simple steps",
    start_steps_1: "Register",
    start_steps_2: "Browse Profiles",
    start_steps_3: "Communicate",
    start_steps_btn: "Go to Dating",
    start_what_title: "What is Dating service?",
    start_what_text: "<p>It is one of the most popular and advanced services for modern men and women who are looking for love online.</p>\n <p>\n This site can help you quickly and efficiently find your soulmate thanks to modern technologies and years of experience in the dating industry!\n </p>",
    start_what_ex: "Meet new people today!",
    start_adv_1: {
      title: "Smart Filter",
      text: "Special algorithm allows you to quickly find a suitable match"
    },
    start_adv_2: {
      title: "Security",
      text: "You can be confident in the privacy of your data on the service"
    },
    start_adv_3: {
      title: "Verification",
      text: "Users are real and interested in relationships"
    },
    start_meet_title: "Start Communicating",
    start_meet_text: "In our time, dating apps have become an integral part of our lives. They allow you to check the profile of singles living near you, chat with them, get to know them, and maybe fall in love.",
    start_meet_btn: "Fill out the Profile",
    start_meet_message_1: "Join to build happy relationships",
    start_meet_message_2: "Finding your soulmate is now easier than ever!",
    start_faq_title: "Frequently Asked Questions",
    start_faq_list: {
      start_faq_item_1: {
        title: "How does partner search work?",
        text: ""
      },
      start_faq_item_2: {
        title: "How to delete a profile?",
        text: ""
      },
      start_faq_item_3: {
        title: "How to sort profiles correctly?",
        text: ""
      }
    }
  },
  searchPage: {
    filter: {
      found: "Found",
      list: {
        filter_country: {
          label: "Country",
          placeholder: "Country"
        },
        filter_state: {
          label: "Region",
          placeholder: "Region"
        },
        filter_target: {
          label: "Dating Goal"
        },
        filter_finance: {
          label: "Financial Goals"
        },
        filter_age: {
          label: "Age"
        }
      },
      action: {
        show: "Show All Filters",
        hide: "Hide",
        search_btn: 'Search',
        mobile_filter_btn: 'Filter'
      },
      tabs: {
        all: "All",
        near: "Nearby",
        new: "New",
        online: "Online"
      }
    }
  },
  chatPage: {
    type_tabs: {
      chat: "Chat",
      mail: "Mail"
    },
    filter_tabs: {},
    search: "Search",
    premium: {
      label: "Exchange Contacts!",
      btn: "Go Premium"
    },
    pricing: {
      title: "Chat Action Prices",
      list: {
        item_1: "Send Message",
        item_2: "Send Mail"
      }
    },
    action: {
      placeholder: "Type a message"
    },
    smiles_and_stickers: {
      smile: "Smiles",
      sticker: "Stickers"
    },
    gifts: {
      buy_btn: {
        first_part: "Buy",
        last_part: {
          single: "gift",
          plural: "gifts"
        }
      },
      gift_action: {
        select_btn: "Add",
        remove_btn: "Added"
      }
    }
  },
  sympathyPage: {
    tabs: {
      views: "Views",
      matches: "Matches",
      you_like: "You Like",
      likes_you: "Likes You"
    },
    description: {
      views: "A girl has viewed your profile - consider her ready to start communication. Write to her!",
      matches: "You and another person have liked each other in 'Dating'. Start communicating now",
      you_like: "This tab contains users you like",
      likes_you: "This tab contains users who like you"
    }
  },
  profilePage: {
    info: {
      name: "Name",
      about: "About",
      country: "Country/Region",
      target: "Dating Goals",
      finance: "Financial Preferences",
      career: "Career",
      relationship: "Relationship Status",
      kids: "Children"
    },
    images: {
      add_btn: "Add Photo",
      verify_btn: "Verify Photo"
    }
  },
  signupPage: {
    main: {
      title: "Registration",
      next_btn: "Next",
      end_btn: "Finish"
    },
    steps: {
      step_1: {
        name: "Name",
        password: "Password",
        birthday: "Birthday",
        privacy: {
          label: "By continuing, you accept",
          link: "the terms of service and privacy policy"
        }
      },
      upload_avatar: {
        title: "Add Photo",
        text: "Upload your best photo - it will attract more attention to your profile"
      },
      about_self: {
        title: "Tell About Yourself",
        text: "A few phrases about yourself will attract users' attention",
        placeholder: "Minimum 20 characters...",
        ex: "According to the site rules, it is prohibited to provide contact information"
      }
    }
  }
}

export default en;