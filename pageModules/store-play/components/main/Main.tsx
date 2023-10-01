import styles from './Main.module.scss';
import { FC } from 'react'
import Head from '../head/Head';
import List from '../list/List';
import Image from 'next/image';
import Card from '../card/Card';

import {FiMoreVertical} from 'react-icons/fi';
import {IoMdArrowBack} from 'react-icons/io';
import {BiSearchAlt2} from 'react-icons/bi';

import avatar1 from '@/public/assets/images/store-avatar-1.png'
import avatar2 from '@/public/assets/images/store-avatar-2.png'
import avatar3 from '@/public/assets/images/store-avatar-3.png'


import item1 from '@/public/assets/images/store-list-1.png';
import item2 from '@/public/assets/images/store-list-2.png';
import item3 from '@/public/assets/images/store-list-3.png';
import item4 from '@/public/assets/images/store-list-4.png';
import item5 from '@/public/assets/images/store-list-5.png';
import item6 from '@/public/assets/images/store-list-6.png';
import item7 from '@/public/assets/images/store-list-7.png';
import item8 from '@/public/assets/images/store-list-8.png';
import item9 from '@/public/assets/images/store-list-9.png';
import item10 from '@/public/assets/images/store-list-10.png';
import item11 from '@/public/assets/images/store-list-11.png';
import item12 from '@/public/assets/images/store-list-12.png';
import item13 from '@/public/assets/images/store-list-13.png';
import item14 from '@/public/assets/images/store-list-14.png';
import item15 from '@/public/assets/images/store-list-15.png';
import item16 from '@/public/assets/images/store-list-16.png';
import item17 from '@/public/assets/images/store-list-17.png';
import { ListItem } from '../item/Item';

const firstList:ListItem[] = [
  {
    img: item1,
    name: '1win',
    size: 44
  },
  {
    img: item2,
    name: 'KatsuBet Casino',
    size: 47
  },
  {
    img: item3,
    name: 'Champion Casino',
    size: 35
  },
  {
    img: item4,
    name: 'Stay Casino',
    size: 56
  },
  {
    img: item5,
    name: 'Rocket Play Casino',
    size: 49
  },
  {
    img: item6,
    name: 'Red Dog',
    size: 52
  },
  {
    img: item7,
    name: 'Bet Tilt',
    size: 45
  },
  {
    img: item8,
    name: 'Cherry Gold',
    size: 26
  },
  {
    img: item9,
    name: 'GunsBet',
    size: 37
  }
  
]

const secondList:ListItem[] = [
  {
    img: item10,
    name: 'GGBet',
    size: 49
  },
  {
    img: item11,
    name: 'Freespin Casino',
    size: 35
  },
  {
    img: item12,
    name: 'Golden Star',
    size:44
  },
  {
    img: item13,
    name: 'Champion Casino',
    size: 35
  },
  {
    img: item14,
    name: '7Bit Casino',
    size: 32
  },
  {
    img: item15,
    name: 'Sloto Zen',
    size: 61
  },
  {
    img: item16,
    name: 'BoVegas Casino',
    size: 42
  },
  {
    img: item17,
    name: 'BitStarz Casino',
    size: 51
  }
]



const Main:FC<any> = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.part}>
          <div className={styles.item}>
            <IoMdArrowBack/>
          </div>
        </div>
        <div className={styles.part}>
          <div className={styles.item}>
            <BiSearchAlt2/>
          </div>
          <div className={styles.item}>
            <FiMoreVertical/>
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <Card/>
      </div>
      <div className={styles.descr}>
        <div className={styles.head}>
          <Head>
            Über diese App
          </Head>
        </div>
        <div className={styles.text}>
          <p>
            Erhalten Sie exklusive Boni und beste Aktionen mit nur einem Klick - Installieren Sie die Casino Cooldreamy App auf Ihrem Handy und spielen Sie um
            echtes Geld.
          </p>
        </div>
        <div className={styles.badges}>
          <div className={styles.item}>#1 top win apps</div>
        </div>
      </div>
      <div className={styles.revs}>
        <div className={styles.head}>
          <Head>
            Bewertungen und Rezensionen
          </Head>
        </div>
        <div className={styles.rating}>
          <div className={styles.main}>
            <div className={styles.value}>4.7</div>
            <div className={styles.stars}></div>
            <div className={styles.count}>364 577</div>
          </div>
          <div className={styles.body}>
            <div className={styles.item}>
              <div className={styles.num}>5</div>
              <div className={styles.line}>
                <div className={styles.fill} style={{width: '55%'}}></div>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.num}>4</div>
              <div className={styles.line}>
                <div className={styles.fill} style={{width: '25%'}}></div>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.num}>3</div>
              <div className={styles.line}>
                <div className={styles.fill} style={{width: '20%'}}></div>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.num}>2</div>
              <div className={styles.line}>
                <div className={styles.fill} style={{width: '5%'}}></div>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.num}>1</div>
              <div className={styles.line}>
                <div className={styles.fill} style={{width: '10%'}}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rev_list}>
          <div className={styles.item}>
            <div className={styles.head}>
              <div className={styles.user}>
                <div className={styles.avatar}>
                  <Image
                    src={avatar1}
                    placeholder='blur'
                    alt=''
                    />
                </div>
                <div className={styles.name}>Simens Nomi</div>
              </div>
              <div className={styles.list_icon}><FiMoreVertical/></div>
            </div>
            <div className={styles.info}>
              <div className={styles.rating}></div>
              <div className={styles.date}>23.09.23</div>
            </div>
            <div className={styles.text}>
            I really like the variety with the slots
            </div>
            <div className={styles.ex}>
              <div className={styles.label}>War diese Rezension fur dich</div>
              <div className={styles.action}>
                <div className={styles.action_item}>Ja</div>
                <div className={styles.action_item}>Nein</div>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.head}>
              <div className={styles.user}>
                <div className={styles.avatar}>
                  <Image
                    src={avatar2}
                    placeholder='blur'
                    alt=''
                    />
                </div>
                <div className={styles.name}>Rob Fowler</div>
              </div>
              <div className={styles.list_icon}><FiMoreVertical/></div>
            </div>
            <div className={styles.info}>
              <div className={styles.rating}></div>
              <div className={styles.date}>23.09.23</div>
            </div>
            <div className={styles.text}>
            Love playing with my wife and lot&qpos;s of fun and very good amount win. good work!
            </div>
            <div className={styles.ex}>
              <div className={styles.label}>War diese Rezension fur dich</div>
              <div className={styles.action}>
                <div className={styles.action_item}>Ja</div>
                <div className={styles.action_item}>Nein</div>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.head}>
              <div className={styles.user}>
                <div className={styles.avatar}>
                  <Image
                    src={avatar3}
                    placeholder='blur'
                    alt=''
                    />
                </div>
                <div className={styles.name}>Inisemu</div>
              </div>
              <div className={styles.list_icon}><FiMoreVertical/></div>
            </div>
            <div className={styles.info}>
              <div className={styles.rating}></div>
              <div className={styles.date}>23.09.23</div>
            </div>
            <div className={styles.text}>
            Really well done game/app! I think that you can play this for hours just on the first deposit!
            </div>
            <div className={styles.ex}>
              <div className={styles.label}>War diese Rezension fur dich</div>
              <div className={styles.action}>
                <div className={styles.action_item}>Ja</div>
                <div className={styles.action_item}>Nein</div>
              </div>
            </div>
          </div>
          <div className={styles.action}>
            <div className={styles.action_item}>
            Alle Rezensionen anzeigen
            </div>
          </div>
        </div>
      </div>
      <div className={styles.list}>
        <div className={styles.part}>
          <List
            head={'Ähnliche Spiele'}
            list={firstList}
            />
        </div>
        <div className={styles.part}>
          <List
            head={'Werbeanzeigen'}
            list={secondList}
            />
        </div>
      </div>
      <div className={styles.ex}>
        <div className={styles.icon}></div> 
        <div className={styles.label}>Erstattungsrichtlinien von Play Store</div>
      </div>
    </div>
  )
}

export default Main;