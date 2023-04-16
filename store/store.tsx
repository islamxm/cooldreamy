import { createStore, Store } from "redux";
import reducer from "./reducer";
import {createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import { IGlobalState } from "./reducer";


const store = createStore(reducer)
export default store;
// const makeStore = (context: Context) => createStore(reducer);
// const wrapper = createWrapper<Store<IGlobalState>>(makeStore, {debug: true})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;