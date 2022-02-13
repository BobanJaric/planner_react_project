import React, { useEffect, useState} from 'react';
import openSocket from 'socket.io-client';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import UsersList from '../components/UsersList';
import {useHttpClient} from '../../shared/hooks/http-hook';


const Users= () =>{
  
  const [loadedUsers, setLoadedUsers] = useState();
 
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(()=>{
    const fetchUsers= async ()=>{

      try{
      const responseData = await sendRequest(`http://localhost:5000/api/users`);

      setLoadedUsers(responseData.users);
      openSocket(`http://localhost:5000`);
      }catch(err){

      }
    };
    fetchUsers();
    
  },[sendRequest]);


  return ( <React.Fragment>
     <ErrorModal error={error} onClear={clearError} />
     {isLoading &&( 
     <div className="center">
        <LoadingSpinner asOverlay/>
     </div>
         ) }
      {!isLoading && loadedUsers && <UsersList items={ loadedUsers } />}
    </React.Fragment>
    );
 };

export default Users;
