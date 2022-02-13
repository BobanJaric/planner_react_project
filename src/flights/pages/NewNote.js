import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './newNote.css';

const NewNotes = () => {
  const auth = useContext(AuthContext);
  const [values, setValues] = useState({
    note: '',
          date: ''
  });
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const history = useHistory();

  const handleOnChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };


  const noteSubmitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(`http://localhost:5000/api/flights/note`,
        'POST',
        JSON.stringify({
          note: values.note,
          date: values.date

        }),
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        }
      );
      history.push('/' + auth.userId + '/flights');
    } catch (err) {
console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form onSubmit={noteSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="white-holder">
          <div className="note-wrap">
            <div className="buttonSub">
              <button type="submit" className="btn">ADD NOTE</button>
            </div>
            <div className="col-md-2 fake-input">
              <input
                placeholder="Date" 
                className="form-control6"
                id="date"
                name="date"
                type="date"
                data-date-format="DD MMMM YYYY"
                value={values.date}
                onChange={handleOnChange}
              />
            </div>
            <div className="header-wrap">
              <h1>Note</h1>
              <div className="picture-input3"></div>
            </div>
            <textarea
              className="note2"
              id='note'
              name='note'
              rows={18}
              value={values.note}
              onChange={handleOnChange}
            />
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};
export default NewNotes;


