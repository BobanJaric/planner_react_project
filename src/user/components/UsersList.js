import React from 'react';

import './UserList.css';
import Card from '../../shared/components/UIElements/Card';
import UserItem from './UserItem';

const UsersList= props =>{
    if(props.items.length === 0){
        return (<div>
            <Card><h2>No users found</h2></Card>   
        </div>
    );
}

  return (
        <ul className="user-list">
            {props.items.map(user=>{
                return <UserItem 
                key={user.id } 
                id={user.id} 
                name ={ user.name} 
                placeCount={ user.places.length} />    
            })}
        </ul>
  );
 
};

export default UsersList;