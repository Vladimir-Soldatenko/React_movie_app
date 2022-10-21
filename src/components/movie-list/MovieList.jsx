// @ts-nocheck
import React, { useState, useEffect } from "react";
import tmdbApi, { category } from "../../api/tmdbApi";
import MovieCard from "../movie-card/MovieCard";

import { Swiper, SwiperSlide } from "swiper/react";

import "./movie-list.scss";

const MovieList = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getList = async () => {
            const params = { language: 'ru' };
            let res = null;

            if (props.type !== "similar") {
                switch (props.category) {
                    case category.movie:
                        res = await tmdbApi.getMoviesList(props.type, { params });
                        break;
                    default: {
                        res = await tmdbApi.getTvList(props.type, { params });
                    }
                }
            } else {
                res = await tmdbApi.similar(props.category, props.id);
            }

            setData(res.results);
        };
        getList();
    }, [props.type, props.category, props.id]);

    return (
        <div className="movie-list">
            <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
                {data.map((item) => (
                    <SwiperSlide key={item.id}>
                        <MovieCard key={item.id} item={item} category={props.category} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MovieList;
