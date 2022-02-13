import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import UserNews from './UserNews';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';


import '../components/NewsList.css';

const NewNews = () => {
    const auth = useContext(AuthContext);
    const [values, setValues] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [show, setShow] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const history = useHistory();

    const handleOnChange = event => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const addNews = () => {
        setShowForm(true);
    }

    const removeNews = () => {
        setShowForm(false);
    }


    const noteSubmitHandler = async event => {
        event.preventDefault();

        try {
            await sendRequest(`http://localhost:5000/api/news`,
                'POST',
                JSON.stringify({
                    info: values.info,
                    country: values.country,
                    city: values.city,
                    category: values.category,
                    headline: values.headline
                }),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                }
            );
            history.push('http://185.119.90.74:3000/news/new');
        } catch (err) {

        }
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <div className="addnews-holder" onDoubleClick={removeNews} >
                {showForm && <form className="news-form-1" onSubmit={noteSubmitHandler}>
                    {isLoading && <LoadingSpinner asOverlay />}
                    <label><strong>ADD NEWS</strong></label>
                    <div className="form-control-news">
                        <div className="form-info-news-input">
                            <label>Category</label>
                            <select
                                id='category'
                                name='category'
                                onChange={handleOnChange}
                                value={values.category}
                            >
                                <option value="">--select CAT--</option>
                                <option value="country">Country</option>
                                <option value="city">City</option>
                                <option value="general">General Info</option>
                            </select>
                        </div>
                        {values.category === 'country' && <div className="form-info-news-input">
                            <label>Country</label>
                            <input
                                id='country'
                                name='country'
                                value={values.country}
                                onChange={handleOnChange}
                            />
                        </div>}
                        {values.category === 'city' && <div className="form-info-news-input">
                            <label>City</label>
                            <input
                                id='city'
                                name='city'
                                value={values.city}
                                onChange={handleOnChange}
                            />
                        </div>}
                        <div className="form-info-news-input">
                            <label>Headline</label>
                            <input
                                id='headline'
                                name='headline'
                                value={values.headline}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="form-info-news-input">
                            <label>Info</label>
                            <textarea
                                id='info'
                                name='info'
                                value={values.info}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="form-info-btn">
                        <Button type="submit"  >ADD News</Button>
                    </div>
                </form>
                }
            </div>
            <div className="news-list" >
                <div className="news-list-holder1" >
                    <div className="news-headline">News List </div>
                </div>
                <UserNews addNews={addNews} show={show} />
            </div>

        </React.Fragment>
    );
};
export default NewNews;
