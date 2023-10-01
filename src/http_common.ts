import axios from "axios";
import { APP_ENV } from "./env";
import { IsLoadingActionTypes, IsLoadingTypes } from "./store/reducers/IsLoadingReducer";
import { store } from "./store/store";


const http_common = axios.create({
    baseURL: APP_ENV.BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
    },
});

// http_common.interceptors.request.use(
//     (config: any) => {
//       const action: IsLoadingTypes = {
//         payload: true,
//         type: IsLoadingActionTypes.SET_LOADING,
//       };
//       store.dispatch(action);
//       return config;
//     },
//     (error) => {
//       const action: IsLoadingTypes = {
//         payload: false,
//         type: IsLoadingActionTypes.SET_LOADING,
//       };
//       store.dispatch(action);
//     }
//   );
  
  // http_common.interceptors.response.use(
  //   (config: any) => {
  //     const action: IsLoadingTypes = {
  //       payload: false,
  //       type: IsLoadingActionTypes.SET_LOADING,
  //     };
  //     store.dispatch(action);
  
  //   //   const notificationAction: NotificationSetShowed = {
  //   //     payload: true,
  //   //     type: NotificationActionTypes.SET_SHOWED,
  //   //   };
  //   //   store.dispatch(notificationAction);
  //     return config;
  //   },
  //   (error) => {
  //     const action: IsLoadingTypes = {
  //       payload: false,
  //       type: IsLoadingActionTypes.SET_LOADING,
  //     };
  //     store.dispatch(action);
  //   }
  // );
export default http_common;