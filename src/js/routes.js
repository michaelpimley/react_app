import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app.js';
import Board from './containers/container_board';
import Shipping from './containers/container_shipping';
import OrderSchedule from './containers/container_order_schedule';
import Calendar from './containers/container_calendar';
import Status from './containers/container_cab_status';
import Gl from './containers/container_gl';
import MatchCreator from './containers/container_color_match_create';
import ColorViewer from './containers/container_color_match_viewer';
import ColorInventory from './containers/container_color_inventory';
import Maps from './containers/container_map';

export default (
  <Route path='/' component={App}>
    <Route path='dept/:department' component={Board}/>
    <Route path='shipping' component={Shipping}/>
    <Route path='orderSchedule' component={OrderSchedule} />
    <Route path='calendar/:area' component={Calendar} />
    <Route path='totalStatus' component={Status} />
    <Route path='gl' component={Gl} />
    <Route path='createMatch' component={MatchCreator} />
    <Route path='viewMatch' component={ColorViewer} />
    <Route path='inventory' component={ColorInventory} />
    <Route path='maps' component={Maps} />
  </Route>
);
