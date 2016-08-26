import { combineReducers } from 'redux';

import MainReducer from './reducer_main';
import CncReducer from './reducer_cnc';
import CountReducer from './reducer_count';
import FinishReducer from './reducer_finish';
import FrameReducer from './reducer_frame';
import ShippingReducer from './reducer_shipping';
import DelayReducer from './reducer_delay';
import OrderReducer from './reducer_order';
import InstallReducer from './reducer_install';
import DeliveryReducer from './reducer_delivery';
import ReturnReducer from './reducer_return';
import EmployeeReducer from './reducer_employee';
import StatusReducer from './reducer_status';
import GlReducer from './reducer_gl';
import MatchReducer from './reducer_match';
import CreateReducer from './reducer_create';
import CheckOutReducer from './reducer_check_out';
import AllMatchReducer from './reducer_all_matches';
import TruckInfoReducer from './reducer_truck';
import InventoryMatch from './reducer_inv_match';
import PushInventory from './reducer_push_inventory';
import Geoloc from './reducer_geoloc';
import GetAddress from './reducer_geo_address';
import GetCode from './reducer_geocode';
import FullInfo from './reducer_itemInfo';

const rootReducer = combineReducers({
  main: MainReducer,
  cnc: CncReducer,
  count: CountReducer,
  finish: FinishReducer,
  frame: FrameReducer,
  shipping: ShippingReducer,
  delay: DelayReducer,
  order: OrderReducer,
  install: InstallReducer,
  delivery: DeliveryReducer,
  return: ReturnReducer,
  employee: EmployeeReducer,
  status: StatusReducer,
  gl: GlReducer,
  match: MatchReducer,
  create: CreateReducer,
  checkOut: CheckOutReducer,
  allMatch: AllMatchReducer,
  truck: TruckInfoReducer,
  inv: InventoryMatch,
  pushInv: PushInventory,
  geoloc: Geoloc,
  geoAddress: GetAddress,
  geoCode: GetCode,
  fullInfo: FullInfo
});

export default rootReducer;
