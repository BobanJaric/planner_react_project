import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { useHttpClient } from './shared/hooks/http-hook';

import Auth from './user/pages/Auth';
import NewAuth from './user/pages/NewAuth';
import NewFlight from './flights/pages/NewFlight';
import NewAirport from './flights/pages/NewAirport';
import NewNews from './flights/pages/NewNews';
import NewCaa from './flights/pages/NewCaa';
import NewCrew from './flights/pages/NewCrew';
import GenDec from './flights/pages/GenDec';
import Note from './flights/pages/NewNote';
import Broker from './flights/pages/NewBroker';
import Aircraft from './flights/pages/NewAircraft';
import UserFlights from './flights/pages/UserFlights';
import UserBrokers from './flights/pages/UserBrokers';
import UserAircrafts from './flights/pages/UserAircrafts';
import UserNews from './flights/pages/UserNews';
import UserCrew from './flights/pages/UserCrew';
import UpdatePlace from './flights/pages/UpdateFlight';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import UpdateBroker from './flights/pages/UpdateBroker';
import UpdateAirport from './flights/pages/UpdateAirport';
import UpdateAircraft from './flights/pages/UpdateAircraft';
import UpdateCaa from './flights/pages/UpdateCaa';
import UpdateCrew from './flights/pages/UpdateCrew';

import './App.css';


const App = () => {

  const { token, login, logout, userId, role } = useAuth();
  const [loadedCrew, setLoadedCrew] = useState([]);
  const [aircraft, setAircraft] = useState([]);
  const { sendRequest } = useHttpClient();


  useEffect(() => {
    const fetchCrew = async () => {

      try {
        const responseData = await sendRequest(`http://localhost:5000/api/crew/`, 'GET', null,
          {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          });
          setLoadedCrew(responseData.crews); 
      } catch (err) {

      }
    };
    fetchCrew();

  }, [sendRequest, token]);

  useEffect(() => {
    const fetchAircraft = async () => {

      try {
        const responseData = await sendRequest(`http://localhost:5000/api/aircraft/`, 'GET', null,
          {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          });
        
        setAircraft(responseData.aircrafts.sort((a, b) => a._id.localeCompare(b._id)));

      } catch (err) {

      }
    };
    fetchAircraft();

  }, [sendRequest, token]);


  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/:userId/flights" exact>
          <UserFlights loadedCrew={loadedCrew} aircraft={aircraft} />
        </Route>
        <Route path="/:userId/brokers" exact>
          <UserBrokers />
        </Route>
        <Route path="/:userId/aircrafts" exact>
          <UserAircrafts />
        </Route>
        <Route path="/:userId/news" exact>
          <UserNews />
        </Route>
        <Route path="/:userId/crew" exact>
          <UserCrew />
        </Route>
        <Route path="/crew/new" exact>
          <NewCrew />
        </Route>
        <Route path='/crewby/crew/:crewId'>
          <UpdateCrew />
        </Route>
        <Route path="/auth/new" exact>
          <NewAuth />
        </Route>
        <Route path="/flight/new" exact>
          <NewFlight />
        </Route>
        <Route path="/airport/new" exact>
          <NewAirport />
        </Route>
        <Route path='/caa/:caaId'>
          <UpdateCaa />
        </Route>
        <Route path="/caas/new" exact>
          <NewCaa />
        </Route>
        <Route path="/news/new" exact>
          <NewNews />
        </Route>
        <Route path='/flight/:flightId'>
          <UpdatePlace />
        </Route>
        <Route path='/gendec'>
          <GenDec loadedCrew={loadedCrew} />
        </Route>
        <Route path='/note'>
          <Note />
        </Route>
        <Route path='/broker/:brokerId'>
          <UpdateBroker />
        </Route>
        <Route path='/broker'>
          <Broker />
        </Route>
        <Route path='/aircraft/:aircraftId'>
          <UpdateAircraft />
        </Route>
        <Route path='/aircraft'>
          <Aircraft />
        </Route>
        <Route path='/airport/:airportId'>
          <UpdateAirport />
        </Route>
        <Redirect to="/5fe46d14371ffc10f04ffec5/flights" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
         <Route path="/:userId/places" exact>
          <UserFlights />
        </Route>
        <Route path='/auth'>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }


  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, userId: userId, token: token, login: login, logout: logout, role:role }}>

      <Router>
        <div className="main-div">
          <MainNavigation />
          <main>
            {routes}
          </main>
          <footer className="footer">
            2021 <span></span> All Rights Reserved.
          </footer>
        </div>
      </Router>

    </AuthContext.Provider >
  );
};

export default App;
