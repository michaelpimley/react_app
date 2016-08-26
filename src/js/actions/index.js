import axios from 'axios';
import ReduxThunk from 'redux-thunk';

const PULL_MAIN = '/deptBoards';
const PULL_COUNT = '/deptFlowScans';
const PULL_FINISH = '/deptBoardFinish';
const PULL_CNC = '/deptBoardCNC';
const PULL_FRAME = '/deptScansFrameTables';
const PULL_SHIP = '/shippingMain';
const PULL_DELAY = '/shippingDelay';
const PULL_TRUCK = '/truckInfo';
const PULL_ORDER = '/orderSchedule/';
const PULL_INSTALL = '/installcal';
const PULL_DELIVERY = '/deliveryCal';
const PULL_RETURN = '/returnCal';
const PULL_EMP = '/employeeColor';
const PULL_STATUS = '/totalStatus/';
const PULL_GL = '/glCodeDisplay';
const PULL_MATCH = '/getMatchData/';
const PULL_VIEW_MATCH = "/viewMatch/";
const CHECK_OUT = '/checkOut';
const CREATE_MATCH = '/createMatch';
const PULL_INV_MATCH = '/inventoryMatch/';
const PUSH_INV = '/createInventory';
const PULL_GEOLOC = '/geoloc'
const PULL_GEOCODE = '/allJobs';
const CREATE_MAP = '/mapTable';

export const GET_MAIN = 'GET_MAIN';
export const GET_COUNT = 'GET_COUNT';
export const GET_FINISH = 'GET_FINISH';
export const GET_CNC = 'GET_CNC';
export const GET_FRAME = 'GET_FRAME';
export const GET_SHIP = 'GET_SHIP';
export const GET_DELAY = 'GET_DELAY';
export const GET_TRUCK = 'GET_TRUCK';
export const GET_ORDER = 'GET_ORDER';
export const GET_ALL = 'GET_ALL';
export const GET_INSTALL = 'GET_INSTALL';
export const GET_DELIVERY = 'GET_DELIVERY';
export const GET_RETURN = 'GET_RETURN';
export const GET_EMPLOYEE = 'GET_EMPLOYEE';
export const GET_STATUS = 'GET_STATUS';
export const GET_GL = 'GET_GL';
export const GET_MATCH = 'GET_MATCH';
export const POST_MATCH = 'POST_MATCH';
export const PUSH_CREATE = 'PUSH_CREATE';
export const PUSH_CHECK_OUT = 'PUSH_CHECK_OUT';
export const GET_ALL_MATCH = 'GET_ALL_MATCH';
export const GET_INV_MATCH = 'GET_INV_MATCH';
export const PUSH_INVENTORY = 'PUSH_INVENTORY';
export const GET_GEOLOC = 'GET_GEOLOC';
export const GET_ADDRESS = 'GET_ADDRESS';
export const GET_GEOCODE = 'GET_GEOCODE';
export const GET_FULL_INFO = 'GET_FULL_INFO';
export const CREATE_TABLE = 'CREATE_TABLE';

export function getAddress(lat,lng) {
  const request = axios.get(`${GEO_URL}${lat},${lng}${GEO_KEY}`);

  return {
    type: GET_ADDRESS,
    payload: request
  }
}
export function getJobs(array) {
  const request = axios.get(`${TEST_URL}${PULL_GEOCODE}`);

  return {
    type: GET_GEOCODE,
    payload: request
  }
}
export function pushJob(array) {
  //console.log(`${GEO_CODE}`, array);
  const request = axios.post(`${GEO_CODE}`, array);
  return {
    type: GET_FULL_INFO,
    payload: request
  }
}
export function createMap(array){
  const request = axios.post(`${TEST_URL}${CREATE_MAP}`, array);
  return {
    type: CREATE_TABLE,
    payload: request
  }
}
export function getAll() {
  return function(dispatch, getState) {
    axios.get(`${ROOT_URL}${PULL_MAIN}`).then(response => {
      if(response.status == 200){
        dispatch(fetchMain(response));
        axios.get(`${ROOT_URL}${PULL_FINISH}`).then(response => {
          if(response.status == 200){
            dispatch(fetchFinish(response));
            axios.get(`${ROOT_URL}${PULL_CNC}`).then(response => {
              if(response.status == 200){
                dispatch(fetchCnc(response));
              }
            }).catch(err => {
              dispatch(getAll());
            })
          }
        }).catch(err => {
          dispatch(getAll());
        })
      }
    }).catch(err => {
      dispatch(getAll());
    })
  }
}
export function getReload() {
  return function(dispatch, getState) {
    axios.get(`${ROOT_URL}${PULL_COUNT}`).then(response => {
      if(response.status == 200){
        dispatch(fetchCount(response));
        axios.get(`${ROOT_URL}${PULL_FRAME}`).then(response => {
          if(response.status == 200){
            dispatch(fetchFrame(response));
          }
        }).catch(err => {
          dispatch(getReload());
        })
      }
    }).catch(err => {
      dispatch(getReload());
    })
  }
}
export function getShipping() {
  return function(dispatch, getState) {
    axios.get(`${ROOT_URL}${PULL_DELAY}`).then(response => {
      if(response.status == 200){
        dispatch(fetchDelay(response));
        axios.get(`${ROOT_URL}${PULL_SHIP}`).then(response => {
          if(response.status == 200) {
            dispatch(fetchShip(response));
            axios.get(`${ROOT_URL}${PULL_TRUCK}`).then(response => {
              if(response.status == 200) {
                dispatch(fetchTruck(response));
              }
            }).catch(err => {
              dispatch(getShipping());
            })
          }
        }).catch(err => {
          dispatch(getShipping());
        })
      }
    }).catch(err => {
      dispatch(getShipping());
    })
  }
}
export function getCalendar() {
  return function(dispatch, getState) {
    axios.get(`${ROOT_URL}${PULL_EMP}`).then(response => {
      if(response.status == 200){
        dispatch(fetchEmployee(response));
        axios.get(`${ROOT_URL}${PULL_INSTALL}`).then(response => {
          if(response.status == 200){
            dispatch(fetchInstall(response));
            axios.get(`${ROOT_URL}${PULL_DELIVERY}`).then(response => {
              if(response.status == 200){
                dispatch(fetchDelivery(response));
                axios.get(`${ROOT_URL}${PULL_RETURN}`).then(response => {
                  if(response.status == 200){
                    dispatch(fetchReturn(response));
                  }
                }).catch(err => {
                  dispatch(getCalendar());
                })
              }
            }).catch(err => {
              dispatch(getCalendar());
            })
          }
        }).catch(err => {
          dispatch(getCalendar());
        })
      }
    }).catch(err => {
      dispatch(getCalendar());
    })
  }
}
export function postCreate(props,bin,today){
  const arrayToPass = [{props: props, bin: bin, login: today}];

  return function(dispatch, getState) {
    axios.post(`${ROOT_URL}${CREATE_MATCH}`, {arrayToPass}).then(response => {
      if(response.status == 200){
        dispatch(pushCreate(true));
      } else {
        dispatch(pushCreate(false));
      }
      }).catch(err => {
    })
  }
}
export function postInventory(array){
  return function(dispatch, getState) {
    const request = axios.post(`${ROOT_URL}${PUSH_INV}`, {array}).then(response => {
      if(response.status == 200) {
        dispatch(pushInventory(true));
      } else {
        dispatch(pushInventory(false));
      }
      }).catch(err => {

    })
  }
}
export function pushInventory(resp){
  return {
    type: PUSH_INVENTORY,
    payload: resp
  }
}
export function fetchInvMatch(props){
  return function(dispatch, getState){
    const request = axios.get(`${ROOT_URL}${PULL_INV_MATCH}${props}`).then(response => {
      if(response.status == 200) {
        dispatch(getInvMatch(response));
      }
    }).catch(err => {

    })
  }
}
export function getInvMatch(resp){
  return {
    type: GET_INV_MATCH,
    payload: resp
  }
}
export function postCheckOut(props,today){
  const arrayToPass = [{props: props, logOut: today}];
  return function(dispatch, getState) {
    axios.post(`${ROOT_URL}${CHECK_OUT}`, {arrayToPass}).then(response => {
      if(response.status == 200){
        dispatch(pushCheckOut(true));
      } else {
        dispatch(pushCheckOut(false));
      }
    }).catch(err => {

    })
  }
}
export function fetchAllMatch(ordNo){
  const request = axios.get(`${ROOT_URL}${PULL_VIEW_MATCH}${ordNo}`);

  return {
    type: GET_ALL_MATCH,
    payload: request
  }
}
export function pushCreate(resp){
  return {
    type: PUSH_CREATE,
    payload: resp
  }
}
export function pushCheckOut(resp){
  return {
    type: PUSH_CHECK_OUT,
    payload: resp
  }
}
export function fetchMatch(icn){
  const request = axios.get(`${ROOT_URL}${PULL_MATCH}${icn}`);

  return {
    type: GET_MATCH,
    payload: request
  }
}
export function fetchGl(){
  const request = axios.get(`${ROOT_URL}${PULL_GL}`);

  return {
    type: GET_GL,
    payload: request
  }
}
export function fetchStatus(jobNo, cabNo){
  const request = axios.get(`${ROOT_URL}${PULL_STATUS}${jobNo}/${cabNo}`);

  return {
    type: GET_STATUS,
    payload: request
  }
}
export function fetchEmployee(emp){
  return {
    type: GET_EMPLOYEE,
    payload: emp
  }
}
export function fetchInstall(install){
  return {
    type: GET_INSTALL,
    payload: install
  }
}
export function fetchDelivery(delivery){
  return {
    type: GET_DELIVERY,
    payload: delivery
  }
}
export function fetchReturn(ret){
  return {
    type: GET_RETURN,
    payload: ret
  }
}
export function fetchOrder(props) {
  const request = axios.get(`${ROOT_URL}${PULL_ORDER}${props}`);
  return {
    type: GET_ORDER,
    payload: request
  }
}
export function fetchGeoloc() {
  const request = axios.get(`${ROOT_URL}${PULL_GEOLOC}`);

  return {
    type: GET_GEOLOC,
    payload: request
  }
}
export function fetchShip(mainShip) {
  return {
    type: GET_SHIP,
    payload: mainShip
  }
}
export function fetchDelay(delayShip) {
  return {
    type: GET_DELAY,
    payload: delayShip
  }
}
export function fetchTruck(truckInfo) {
  return {
    type: GET_TRUCK,
    payload: truckInfo
  }
}
function fetchMain(mainData) {
  return {
    type: GET_MAIN,
    payload: mainData
  }
}
export function fetchCount(countData) {
  return {
    type: GET_COUNT,
    payload: countData
  }
}
export function fetchFinish(finishData) {
  return {
    type: GET_FINISH,
    payload: finishData
  }
}
export function fetchCnc(cncData) {
  return {
    type: GET_CNC,
    payload: cncData
  }
}
export function fetchFrame(frameData) {
  return {
    type: GET_FRAME,
    payload: frameData
  }
}
