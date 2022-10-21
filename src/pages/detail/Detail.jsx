// @ts-nocheck
import React, { useEffect, useState } from "react";
import CastsList from "./CastsList";
import VideoList from "./VideoList";
import MovieList from "../../components/movie-list/MovieList";

import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import "./detail.scss";

const Detail = () => {
    const [data, setData] = useState();

    const { category, id } = useParams();

    useEffect(() => {
        const getDetail = async () => {
            const params = { language: "ru" };
            let res = await tmdbApi.detail(category, id, { params });
            setData(res);
            window.scrollTo(0, 0);
        };
        getDetail();
    }, [category, id]);

    return (
        <>
            {data && (
                <>
                    <div
                        className="banner"
                        style={{
                            backgroundImage: `url(${apiConfig.originalImage(
                                data.backdrop_path || data.poster_path
                            )})`,
                        }}
                    ></div>
                    <div className="mb-3 movie-content container">
                        <div className="movie-content__poster">
                            <div
                                className="movie-content__poster__img"
                                style={{
                                    backgroundImage: `url(${apiConfig.originalImage(
                                        data.poster_path || data.backdrop_path
                                    )})`,
                                }}
                            ></div>
                        </div>
                        <div className="movie-content__info">
                            <h1 className="title">
                                {data.title || data.name}
                            </h1>
                            <div className="genres">
                                {data.genres && data.genres.slice(0, 5).map((genre) => <span className="genres__item" key={genre.id}>{genre.name}</span>)}
                            </div>
                            <p className="vote">Рейтинг: {data.vote_average.toFixed(1)}</p>
                            <p className="release">Дата выхода: {data.release_date || data.first_air_date}</p>
                            <p className="overview">{data.overview}</p>
                            <div className="cast">
                                <div className="">
                                    <h2>Casts</h2>
                                    <CastsList id={id} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="section mb-3">
                            <VideoList id={id} />
                        </div>
                        <div className="section mb-3">
                            <div className="section__header mb-2">
                                <h2>Similar</h2>
                            </div>
                            <MovieList id={id} category={category} type='similar' />
                        </div>
                    </div>

                </>
            )}
        </>
    );
};

export default Detail;
