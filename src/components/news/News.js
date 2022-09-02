import { motion } from 'framer-motion/dist/es';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import useConnector from '../../hooks/useConnector';
import { FetchNews, SearchNews } from '../../services/actions/News';
import { loader } from '../../static';

const News = () => {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [loadmore, setLoadmore] = useState(false);
    const [mode, setMode] = useState(false);
    const [query, setQuery] = useState('');
    const { fetchNews, searchNews } = useConnector();
    const News = useSelector(state => state.News);
    const { news } = News;
    const dispatch = useDispatch();
    const { location } = useHistory();
    const observer = useRef();
    const lastNews = useCallback((node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !mode) {
                setLoadmore(true);
                return setPage(prev => prev + 1);
            }
        })
        if (node) observer.current.observe(node)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    const getNews = async () => {
        const fetch = await fetchNews(page);
        if (fetch === 500) {
            return alert('Internal Server Error');
        }
        setLoading(false); setMode(false); setLoadmore(false);
        const data = fetch?.response?.results;
        return dispatch(FetchNews(data));
    }

    const refreshNews = async () => {
        setLoading(true);
        const fetch = await fetchNews(1);
        if (fetch === 500) {
            return alert('Internal Server Error');
        }
        setLoading(false); setMode(false);
        const data = fetch?.response?.results;
        return dispatch(SearchNews(data));
    }

    const search = async (e) => {
        e.preventDefault();
        if (!query.trim()) {
            return;
        }
        setPage(1); setLoading(true); setMode(true);
        const fetch = await searchNews(page, query);
        if (fetch === 500) {
            return alert('Internal Server Error');
        }
        setLoading(false);
        const data = fetch?.response?.results;
        if (data.length ===0) {
            return alert('No matching records found');
        }
        setQuery('');
        return dispatch(SearchNews(data));
    }

    useEffect(() => {
        return !mode && getNews();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, setPage]);
    return (
        <section id="news">
            <div className="container">

                <>
                { 
                    loading ? <img src={loader} alt="Data Loading" />
                    :
                    <>
                        <form onSubmit={search}>
                            <input value={query} onChange={(e) => setQuery(e.target.value)} type="search" className="form-controller" placeholder="Type and hit enter . . ." />
                            <button onClick={refreshNews} title="Refresh" className="refresh-btn" type="button"><i className="fa fa-refresh"></i></button>
                        </form>
                        {
                            news.map((item, i) => (
                                <div key={i+1}>
                                {
                                    news.length === i + 1 ?

                                    <div ref={lastNews}>
                                        <div className="col-md-4 col-sm-6 content-card">
                                            <div className="news-thumb">
                                                <a href={item.webUrl} target="_blank" rel="noreferrer">
                                                    <motion.img className="img-responsive" src={item.fields?.thumbnail ? item.fields?.thumbnail : 'https://stories.butler.edu/wp-content/uploads/2021/03/in-the-news-thumbnail-8.jpg'} alt={item.webTitle} 
                                                        initial={{y:"-100vh"}} animate={{y: 0}}
                                                    />
                                                </a>
                                                <div className="news-info">
                                                    <span>{item.webPublicationDate.substring(0, 10)}</span>
                                                    <h3><Link to={location.pathname}>{item.sectionName}</Link></h3>
                                                    <p>{item.webTitle}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            (i+1)%3 ===0 && <div className="clearfix" />
                                        }
                                    </div>
                                    :
                                    <div>
                                        <div id={i+1} className="col-md-4 col-sm-6 content-card">
                                            <div className="news-thumb">
                                                <a href={item.webUrl} target="_blank" rel="noreferrer">
                                                    <motion.img className="img-responsive" src={item.fields?.thumbnail ? item.fields?.thumbnail : 'https://stories.butler.edu/wp-content/uploads/2021/03/in-the-news-thumbnail-8.jpg'} alt={item.webTitle} 
                                                        initial={{y:"-100vh"}} animate={{y: 0}}
                                                    />
                                                </a>
                                                <div className="news-info">
                                                    <span>{item.webPublicationDate.substring(0, 10)}</span>
                                                    <h3><Link to={location.pathname}>{item.sectionName}</Link></h3>
                                                    <p>{item.webTitle}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            (i+1)%3 ===0 && <div className="clearfix" />
                                        }
                                    </div>
                                }
                                </div>
                            ))
                        }
                    </>
                }
                    {
                        loadmore && <img src={loader} className="mt-2" alt="Data loading" />
                    }
                </>
            </div>
        </section>
    )
}

export default News
