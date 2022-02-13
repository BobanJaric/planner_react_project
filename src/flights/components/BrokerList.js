import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';

import './BrokerList.css';

const BrokerList = props =>{
    const [display, setDisplay] = useState(false);
    const options = props.items;
    const [search, setSearch] = useState();
    const wrapperRef = useRef(null);

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
          window.removeEventListener("mousedown", handleClickOutside);
        };
      });
    
      const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
          setDisplay(false);
        }
      };
    
      const updatePokeDex = poke => {
        setSearch(poke);
        setDisplay(false);
      };
    

return (
    <div className="broker-search">
        <div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <div className="row1-2" >  
        <input
          autoComplete="off"
          onClick={() => setDisplay(!display)}
          placeholder="Type to search"
          value={search} 
          onChange={event => {
            let nameSerach = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
              setSearch(nameSerach)}
          }
        ></input>
      </div>
      {display && (
        <div className="autoContainer-2">
          {options
            .filter(({ brokerName }) => brokerName.indexOf(search) > -1)
            .map((value, i) => {
              return (
                <div
                  onClick={() => updatePokeDex([ value.brokerName])}
                  className="option-2"
                  key={i}
                  tabIndex="0"
                >
                  <span>
                  <Link to={ `/broker/${value._id}`}>
                           < h6  key={Math.random()}  id={value._id} >
                               {value.brokerName}({value.company})
                           </h6>
                           </Link>
                  </span>
             </div>
              );
            })}
        </div>
      )}
    </div>
    </div> 
)
    
};

export default BrokerList;
/* 

{props.items.map(item=>{
    return(
             <tbody>
                 <td>{props.items.indexOf(item)+1}</td>
                 <td className="link"  key={Math.random()}>
                     <Link to={ `/broker/${item._id}`}>
                     < h6  key={Math.random()}  id={item._id} >
                         {item.brokerName}({item.company})
                     </h6>
                     </Link>
                 </td>
             </tbody>
        )
      }
     ) 
   } */
