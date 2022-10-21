// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../movie-card/MovieCard";
import { OutlineButton } from "../button/Button";
import MovieSearch from "./MovieSearch";
import tmdbApi, { movieType, tvType, category } from "../../api/tmdbApi";

import "./movie-grid.scss";

const MovieGrid = (props) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const { keyword } = useParams();

    useEffect(() => {
        const getList = async () => {
            let res = null;

            if (keyword === undefined) {
                const params = { language: "ru" };

                switch (props.category) {
                    case category.movie:
                        res = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                        break;
                    default:
                        res = await tmdbApi.getTvList(tvType.popular, { params });
                }
            } else {
                const params = {
                    query: keyword,
                    language: 'ru'
                }
                res = await tmdbApi.search(props.category, { params })
            }
            setData(res.results)
            setTotalPage(res.total_pages)
        }
        getList();
    }, [props.category, keyword]);

    // ==================== Load more =========================================================

    const loadMore = async () => {
        let res = null;

        if (keyword === undefined) {
            const params = { language: "ru", page: page + 1 };

            switch (props.category) {
                case category.movie:
                    res = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                    break;
                default:
                    res = await tmdbApi.getTvList(tvType.popular, { params });
            }
        } else {
            const params = {
                query: keyword,
                language: 'ru',
                page: page + 1
            }
            res = await tmdbApi.search(props.category, { params })
        }
        setData(x => [...x, ...res.results])
        setPage(page + 1)
    }
    // ============== Load more =================================================

    return (
        <>
            <div className="section mb-3">
                <MovieSearch keyword={keyword} category={props.category} />
            </div>
            <div className="movie-grid">
                {data.map(item => <MovieCard category={props.category} item={item} key={item.id} />)}
            </div>
            {page < totalPage ? (
                <div className="movie-grid__loadmore">
                    <OutlineButton className='small' onClick={loadMore}>Load more</OutlineButton>
                </div>
            ) : null}
        </>
    )
};

export default MovieGrid;
