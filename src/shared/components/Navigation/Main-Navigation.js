import React from 'react';
import serbia from './serbia.jpg'; 
import russia from './russia.jpg'; 
import italy from './italy.jpg'; 

import './Main-Navigation.css';

const MainNavigation= props =>{

  function refreshPage() {
    window.location.reload(false);
  }
    return  (
        <React.Fragment>
          <div className="container-img">
            <ul > 
              <li className="list-reset" >
                <button className="button-img" onClick={refreshPage}  >
                  <div>
                  <span>GenDec</span>
                   <img className="flag" src={serbia} alt="serbia" />
                  </div>
                </button>
              </li>
              <li className="list-reset" >
                <button className="button-img" onClick={props.onClick}>
                  {props.rusApi ? <div>
                                      <img className="flag" src={italy} alt="serbia" /><span>RusAPI / ItalApi</span>
                                      <img className="flag" src={russia} alt="serbia" /> 
                                  </div>
                                : 
                                  <div>Return to GenDec</div>
                  }
                </button>
              </li>
            </ul>
          </div>
        </React.Fragment>
  );

};

export default MainNavigation;

