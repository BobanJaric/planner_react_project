import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import {AuthContext} from '../../shared/context/auth-context';
import {useHttpClient} from '../../shared/hooks/http-hook'; 
import Button from '../../shared/components/FormElements/Button';

import './GenDec.css';


const UpdateBroker = () => {
  const auth = useContext(AuthContext);
  const { isLoading,error, sendRequest, clearError }= useHttpClient();
  const [values, setValues] = useState({});

  const brokerId = useParams().brokerId;

  const history = useHistory();

  useEffect(()=>{
    const fetchBroker= async ()=>{

      try{
      const responseData = await sendRequest(`http://localhost:5000/api/broker/${brokerId}`,'GET', null ,
      {
       'Content-Type':'application/json',
       'Authorization': 'Bearer '+ auth.token
      });

      setValues(responseData.broker); 

      }catch(err){

      }
    };
    fetchBroker();
    
  },[sendRequest, brokerId, auth.token]);


  const brokerUpdateSubmitHandler =  async  event => {
    event.preventDefault();
    try{ 
      await sendRequest(`http://localhost:5000/api/broker/${brokerId}`, 'PATCH',
    JSON.stringify({
        brokerName: values.brokerName,
        company:values.company,
        email:values.email,
        telephone:values.telephone ,    
      creator:auth.userId
     }),
     {
       'Content-Type':'application/json',
       Authorization: 'Bearer '+ auth.token
      
      }
     );
     history.push('/');
    }catch(err){

    }
    
  }; 

  
  const handleOnChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
      };
      

  if(isLoading){
    return (
        <div>
           <LoadingSpinner />
        </div>
    );
}

    if(!values && !error){
        return (
            <div>
              <Card>
              <h2>Could not find broker</h2>
              </Card>
            </div>
        );
    }

    return (
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
           <form className="place-form1 " onSubmit={brokerUpdateSubmitHandler}>
           {isLoading && <LoadingSpinner asOverlay/>}
           <label><strong>CLIENT</strong></label>
           <div className="form-control5">
           <div className="form-info5">
           <label>Broker Name</label>
               <input 
                   id='name'
                   name='brokerName'
                   value={values.brokerName}
                   onChange= {handleOnChange}
               />  
               </div>
               <div className="form-info5">
            <label>Broker company</label>
               <input 
                   id='company'
                   name='company'
                   value={values.company}
                   onChange= {handleOnChange}
               />  
               </div>
               <div className="form-info5">
               <label>E-mail</label>
                <input 
                   id='email'
                   name='email'
                   value={values.email}
                   onChange= {handleOnChange}
               />  
               </div>
               <div className="form-info5">
               <label>Telephone</label>
                <input 
                   id='telephone'
                   name='telephone'
                   value={values.telephone}
                   onChange= {handleOnChange}
               />  
               </div>
               </div>
               <div className="form-info5">
                <Button type="submit"  >ADD BROKER</Button>
               </div>
          </form>
      </React.Fragment>
         );
 
};

export default UpdateBroker;