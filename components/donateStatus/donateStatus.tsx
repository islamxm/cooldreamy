import styles from './donateStatus.module.scss';
import { FC, useEffect } from 'react'
import { useAppSelector } from '@/hooks/useTypesRedux';
import getClassNames from '@/helpers/getClassNames';
import Button from '../Button/Button';
import ApiService from '@/service/apiService';
import moment from 'moment';
import Router from 'next/router';
const service = new ApiService()


//SUBSCRIBE
export const StatusPremium:FC<any> = () => {
  const {userData, token} = useAppSelector(s => s)
  const {
    
  } = userData || {}


  return (
    <div className={getClassNames([styles.wrapper, styles.premium])}>
      <div className={styles.main}>
        <div className={styles.icon}>
          
        </div>
        <div className={styles.body}>
          <div className={styles.title}>Premium</div>
          <div className={styles.value}>Not active</div>
        </div>
      </div>
      <div className={styles.action}>
        {/* <Button
          middle
          style={{padding: '7px 5px', backgroundColor: '#F5F5F5'}}
          fill
          variant={'white'}
          text={'3 д. 18:33'}
          /> */}
        <Button
          text="Activate"
          variant={'gold'}
          middle
          style={{padding: '7px 5px'}}
          onClick={() => Router.push('/premium')}
          fill
          />
      </div>
    </div>
  )
}


//PREMIUM
export const StatusVip:FC<any> = () => {
  const {userData} = useAppSelector(s => s)
  const {
    is_premium,
    premium_expire
  } = userData || {}

  return (
    <div className={getClassNames([styles.wrapper, styles.vip])}>
      <div className={styles.main}>
        <div className={styles.icon}>
          
        </div>
        <div className={styles.body}>
          <div className={styles.title}>VIP-status</div>
          <div className={styles.value}>
            {is_premium == 1 ? 'Active' : 'Not active'}
          </div>
        </div>
      </div>
      <div className={styles.action}>
        {
          is_premium == 1 ? (
            <Button
              variant={'white'}
              style={{padding: '7px 5px', backgroundColor: '#F5F5F5'}}
              text='Active'
              middle
              fill
              />
          ) : (
            <Button
              text='Activate'
              onClick={() => Router.push('/premium')}
              middle
              style={{padding: '7px 5px', backgroundColor: '#1E85FE', color: '#fff'}}
              variant={'white'}
              fill
              />
          )
        }
      </div>
    </div>
  )
}


//CREDITS
export const StatusCredits:FC<any> = () => {
  const {userData} = useAppSelector(s => s)
  const {
    credits
  } = userData || {}

  return (
    <div className={getClassNames([styles.wrapper, styles.credits])}>
      <div className={styles.main}>
        <div className={styles.icon}>
          
        </div>
        <div className={styles.body}>
          <div className={styles.title}>Кредиты</div>
          <div className={styles.value}><b>{credits}</b></div>
        </div>
      </div>
      <div className={styles.action}>
        <Button
          text='Buy'
          style={{padding: '7px 5px'}}
          onClick={() => Router.push('/deposit')}
          middle
          fill
          />
      </div>
    </div>
  )
}