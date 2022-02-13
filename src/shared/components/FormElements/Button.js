import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const Button = props =>{
  if(props.href ){
    return (
      <a className="button" >
      {props.children}
      
    </a>
    );
  }
   if(props.to){
    return (
    <Link
    to={props.to}
    exact={props.exact}
    className="button"
  >
    {props.children}
  </Link>
    );
   }
   return (
     <button className={props.option ? `button${props.option} button` : "button"}
      type={props.type} 
      id={props.id} 
      onClick={props.onClick} 
      disabled={props.disabled}>
       {props.children}
     </button>
   )
    
  }

export default Button;
