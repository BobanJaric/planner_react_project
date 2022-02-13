import React, { useEffect, useState, useContext}  from 'react';
import {useParams} from 'react-router-dom';

import {useHttpClient} from '../../shared/hooks/http-hook';
import {AuthContext} from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import BrokerList from '../components/BrokerList';


const UserBrokers = () =>{
    const auth = useContext(AuthContext);
    const [loadedBrokers, setLoadedBrokers] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const userId=  useParams().userId;

useEffect(()=>{
    const fetchBrokers= async ()=>{

      try{
      const responseData = await sendRequest(`http://localhost:5000/api/broker/`,'GET', null ,
      {
       'Content-Type':'application/json',
       'Authorization': 'Bearer '+ auth.token
      });

      setLoadedBrokers(responseData.brokers);
 
      }catch(err){

      }
    };
    fetchBrokers();
    
  },[sendRequest,userId]);


return ( <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading &&( 
    <div className="center">
       <LoadingSpinner asOverlay/>
    </div>
        ) }
     {!isLoading && loadedBrokers && <BrokerList items={loadedBrokers}  />}
   </React.Fragment>
   );
};

export default UserBrokers;
