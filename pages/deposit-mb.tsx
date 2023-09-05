import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useEffect, useState, useRef } from "react";
import Tabs from "@/pageModules/deposit-mob/components/Tabs/Tabs";
import {Row, Col} from 'antd';
import CardPremium from "@/pageModules/premium/CardPremium/CardPremium";
import CardAdv from "@/pageModules/premium/CardAdv/CardAdv";
import { loadStripe } from "@stripe/stripe-js";
import ApiService from "@/service/apiService";
import { useAppSelector } from "@/hooks/useTypesRedux";
import notify from "@/helpers/notify";
import { Elements } from "@stripe/react-stripe-js";
import PayForm from "@/pageModules/deposit/components/PayForm/PayForm";
import { useWindowSize } from "usehooks-ts";
import Main from "@/pageModules/deposit/components/Main/Main";
import Router from "next/router";

const service = new ApiService()

const PUBLIC_KEY = 'pk_live_51MzlPfFjkPZRdnX1xG5oZ2f5LVylisRVV2O6Ym7c20knPF5GsjuKfcdl6fE3oXmqLIKwjhNNw4id48bpOXOC4n3R00zouqX2k9';
const PUBLIC_KEY_TEST = 'pk_test_51MzlPfFjkPZRdnX1dn6HeooarP7ShRYGfBoSNMCAfPRZPl4tCPcAljK4pn3p7W2VRm6t7VG2lB0oP6HyY7WRYDOp00ZOqNBbUJ'

const DepositPage = () => {
  const {width} = useWindowSize()
  const payRef = useRef<HTMLDivElement>(null)
  const {token, locale, userData} = useAppSelector(s => s)
  const [activeTab, setActiveTab] = useState<any>('')
  
  const [selected, setSelected] = useState<{value: string | number, type: string} | null>(null)

  const [listPrem, setListPrem] = useState<any[]>([])
  const [listSub, setListSub] = useState<any[]>([])
  const [listCred, setListCred] = useState<any[]>([])

  const [stripePromise, setStripePromise] = useState<any>(loadStripe(PUBLIC_KEY))
  const [secretKey, setSecretKey] = useState<string>('')
  const [load, setLoad] = useState<boolean>(false)

  const [type, setType] = useState<string>('')
  const [list, setList] = useState<any[]>([])
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [promo, setPromo] = useState<any>(null)

  const getPlans = () => {
    if(token) {
        service.getPayPlans(token).then(res => {
            setList(res)
            setType('credit')
        })
    }
  }

  const getPromo = () => {
      if(token) {
          service.getPromo(token).then(res => {
              if(res?.data?.length > 0) {
                  setPromo(res?.data[0]?.promotion)
                  setType('promotion')
              } else {
                  getPlans()
                  setType('credit')
              }
          })
      }
  }

  const getPrem = () => {
    if(token) {
      service.getPayPrems(token).then(res => {
          setListPrem(res)
      })
    }
  }

  const getSub = () => {
    if(token) {
      service.getPaySubs(token).then(res => {
          const m = res;
          const rm = m.splice(0,1)
          setListSub([...m])
      })
    }
  }
  const getCred = () => {
    if(token) {
      service.getPayPlans(token).then(res => {
          const m = res;
          const rm = m.splice(0, 2)
          setListCred([...m])
      })
    }
  }

  const onAccept = () => {
    if(token && selected) {
        setLoad(true)
        if(selected?.type === 'credit') {
            service.pay(token, {
                list_type: selected?.type,
                list_id: selected?.value
            }).then(res => {
                const clientSecret = res?.clientSecret;
                setSecretKey(clientSecret)
            }).finally(() => setLoad(false))
        }
        if(selected?.type === 'premium') {
            service.payS(token, {
                list_type: selected?.type,
                list_id: selected?.value
            }).then(res => {
                if(res?.message === 'success') {
                    if(selected?.value == 1) process?.browser && window.location?.replace(window?.location?.origin + '/pay_success_prem1')
                    
                    if(selected?.value == 2) process?.browser && window.location?.replace(window?.location?.origin + '/pay_success_prem2')
                    
                    if(selected?.value == 3) process?.browser && window.location?.replace(window?.location?.origin + '/pay_success_prem3')
                } else {
                    notify(locale?.global?.notifications?.error_default, 'ERROR')
                }
            }).finally(() => setLoad(false))
        }
        if(selected?.type === 'subscription') {
            service.payS(token, {
                list_type: selected?.type,
                list_id: selected?.value
            }).then(res => {
                if(res?.message === 'success') {
                    if(selected?.value == 4) process?.browser && window.location?.replace(window?.location?.origin + '/pay_success_sub2')
                    if(selected?.value == 5) process?.browser && window.location?.replace(window?.location?.origin + '/pay_success_sub3')
                    if(selected?.value == 6) process?.browser && window.location?.replace(window?.location?.origin + '/pay_success_sub4')
                } else {
                    notify(locale?.global?.notifications?.error_default, 'ERROR')
                }
            }).finally(() => setLoad(false))
        }
       
    }
  }

  useEffect(() => {
    if(width > 768) {
      // Router.replace('/deposit')
    }
  }, [width])

  const goToPayment = () => {
    if(width <= 768) {
        const top = payRef?.current?.getBoundingClientRect()?.top;
        if(typeof top === 'number') {
            document.documentElement.scrollTo(0, top)
        }
    }
  }
  useEffect(() => {
    if(userData && userData?.is_donate === 1) {
        getPlans()
    } 
    if(userData && userData?.is_donate === 0) {
        getPromo()
    }
  }, [token, userData])


  useEffect(() => {
    if(token) {
      getSub()
      getCred()
      getPrem()
    }
  }, [token])

  useEffect(() => {
    setSecretKey('')
  }, [selectedPlan])

  const switchTabs = () => {
    switch(activeTab) {
      case '1':
        return <CardPremium 
                  load={load}
                  onAccept={onAccept}
                  onSelect={setSelected}
                  selected={selected}
                  list={listPrem}
                  />
      case '2':
        return <CardAdv 
                  load={load}
                  onAccept={onAccept}
                  onSelect={setSelected}
                  selected={selected}
                  list={listSub}
                  />
      case '3':
        return <Main/>
      default:
        return null
    }
  }

  return (
    <Container>
      <MainLayout>
        <Sidebar/>
        <div style={{width: '100%'}}>
          <Row gutter={[20,20]}>
            <Col span={24}>
              <Tabs
                activeTab={activeTab}
                onChange={setActiveTab}
                />
            </Col>
            <Col span={24}>
              {switchTabs()}
            </Col>
            {
              <Col span={24}>
                <div>
                  {
                      !load && (
                          (secretKey && stripePromise && selected?.type === 'credit') && (
                              <Elements
                                  stripe={stripePromise}
                                  options={{clientSecret: secretKey, locale: 'en'}}
                                  >
                                  <PayForm type={selected?.type} plan={selected?.value}/>
                              </Elements>
                          ) 
                      )
                  }
                </div>
              </Col>
            }
          </Row>
        </div>
      </MainLayout>
    </Container>
  )
}

export default DepositPage;