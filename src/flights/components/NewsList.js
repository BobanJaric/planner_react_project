import React, { useState, useContext } from "react";

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';


import './NewsList.css';

const NewsList = props => {


    const [options, setOptions] = useState(props.items);
    const { sendRequest } = useHttpClient();

    const auth = useContext(AuthContext);

    options.sort((b, a) => a.updatedAt.localeCompare(b.updatedAt));

    const showNews = (e) => {
        const newOption = [...props.items];
        if (e.target.name === 'ALL') {
            setOptions(newOption);
        } else {
            const onlyCapt = newOption.filter(option => {
                return option.category === e.target.name;
            });
            setOptions(onlyCapt);
        }

    };

    const deleteHandler = async (id) => {

        try {
            await sendRequest(`http://185.119.90.74:5000/api/news/${id}`, 'DELETE', null, { Authorization: 'Bearer ' + auth.token });
            setOptions(prevNews => prevNews.filter(news => news._id !== id));
        } catch (err) {

        }
    };

    function detectURLs(message) {
        var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        return message.match(urlRegex)
    }


    return (

        <div className="news-list">
            <div className="crew-form-2">
                <div className="crew-form-3" >
                    <button type="button" name="ALL" className="btn-news" onClick={(e) => showNews(e)}>All</button>
                    <button type="button" name="general" className="btn-news" onClick={(e) => showNews(e)}>General</button>
                </div>
                <div className="crew-form-3" >
                    <button type="button" name="country" className="btn-news" onClick={(e) => showNews(e)} >Country</button>
                    <button type="button" name="city" className="btn-news" onClick={(e) => showNews(e)} >City</button>
                    {props.show && <button className="btn-news" onClick={props.addNews}  >ADD NEWS</button>}
                </div>
            </div>
            {options
                .map((value, i) => {
                    let daysLeft = ((Date.now() - Date.parse(value.updatedAt)) / (1000 * 3600 * 24)).toFixed(0);
                    return (
                        <React.Fragment key={i.toString()}>
                            <div className="form-info-news"  >
                                <div className="form-info-news-inner"  >
                                    <p>Category:<br />{value.category}</p>
                                    {value.category === 'country' && <p className="news-country" >Country:<br />{value.country}</p>}
                                    {value.category === 'city' && <p className="news-country" >City:<br />{value.city}</p>}
                                    <p className="news-country">Category:<br />{value.headline}</p>
                                    <div id="news-info" style={{ whiteSpace: 'pre-wrap', color: 'white' }}  >
                                        <span id="span-info">INFO</span>:<br />
                                        <p >{value.info}</p>
                                        {detectURLs(value.info) !== '' && <React.Fragment>

                                            <a id="link" href={detectURLs(value.info)} >{detectURLs(value.info) !== null ? detectURLs(value.info).toString().substring(0, 50) : ''}</a>
                                        </React.Fragment>}
                                    </div>

                                    <button type="button" className="btn btn-link" onClick={() => deleteHandler(value._id)}  >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-archive" viewBox="0 0 16 16">
                                            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                                        </svg>
                                    </button>
                                </div>
                                {daysLeft === '0' ? <div id="paraf">created today</div> :
                                    daysLeft === '1' ? <div id="paraf">created {daysLeft} day ago</div> :
                                        <div id="paraf">created {daysLeft} days ago</div>
                                }
                            </div>

                        </React.Fragment>
                    )
                })
            }

        </div>


    )
};

export default NewsList;
