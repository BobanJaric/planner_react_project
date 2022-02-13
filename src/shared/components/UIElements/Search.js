import React, { useEffect, useState, useRef, useContext } from "react";

import { AuthContext } from '../../context/auth-context';
import { useHttpClient } from '../../hooks/http-hook';

import './Search.css';

const Search = (props) => {

  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);

  const wrapperRef = useRef(null);


  useEffect(() => {
    const fetchBrokers = async () => {

      try {
        const responseData = await sendRequest(`http://localhost:5000/api/broker`, 'GET', null,
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token
          }
        );

        setOptions(responseData.brokers);

      } catch (err) {

      }
    };
    fetchBrokers();
    return () => {
      setOptions([]);
    };

  }, [sendRequest, auth.token]);

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
    props.setSearch(poke);
    setDisplay(false);
  };

  return (
    <div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <div className="row1" >
        <input
          className="first-row1"
          autoComplete="off"
          onClick={() => setDisplay(!display)}
          placeholder="Type to search"
          value={props.search}
          onChange={event => {
            props.setSearch(event.target.value)
          }}
        ></input>
      </div>
      {display && (
        <div className="autoContainer">
          {options
            .filter(({ company }) => company.indexOf(props.search) > -1)
            .map((value, i) => {
              return (
                <div
                  onClick={() => updatePokeDex([value.company, value.brokerName, value.telephone, value.email])}
                  className="option"
                  key={i}
                  tabIndex="0"
                >
                  <span>{value.company}({value.brokerName.split(' ')[0]})</span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Search;
