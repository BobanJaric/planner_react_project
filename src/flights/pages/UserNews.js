import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import NewsList from '../components/NewsList';


const UserNews = ({ show, addNews }) => {
    
    const auth = useContext(AuthContext);
    const [loadedNews, setLoadedNews] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const userId = useParams().userId;

    useEffect(() => {
        const fetchNews = async () => {

            try {
                const responseData = await sendRequest(`http://localhost:5000/api/news/`, 'GET', null,
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth.token
                    });

                setLoadedNews(responseData.news);

            } catch (err) {

            }
        };
        fetchNews();

    }, [sendRequest, userId]);

    return (<React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
            <div className="center">
                <LoadingSpinner asOverlay />
            </div>
        )}
        {!isLoading && loadedNews && <NewsList items={loadedNews} key={loadedNews.id} addNews={addNews} show={show} />}
    </React.Fragment>
    );
};

export default UserNews;
