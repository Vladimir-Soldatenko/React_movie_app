// @ts-nocheck
import React, { useEffect, useState } from "react";
import tmdbApi, { movieType, category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import Button, { OutlineButton } from "../button/Button";
import TrailerModal from "../modal/TrailerModal";
import { useNavigate } from "react-router-dom";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "./main_slider.scss";

const MainSlider = () => {
    const [movies, setMovies] = useState([]);

    SwiperCore.use([Autoplay]);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1, language: "ru" };
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, {
                    params,
                });
                setMovies(response.results.slice(0, 4));
            } catch (error) {
                console.log(error);
            }
        };
        getMovies();
    }, []);

    return (
        <div className="main-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
            // autoplay={{ delay: 5000 }}
            >
                {movies.map((movie, i) => (
                    <SwiperSlide key={movie.id}>
                        {({ isActive }) => (
                            <MainSliderItem
                                item={movie}
                                className={`${isActive ? "active" : ""}`}
                            />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
            {movies.map((item) => (
                <TrailerModal item={item} key={item.id} />
            ))}
        </div>
    );
};

const MainSliderItem = ({ item, className }) => {
    const background = apiConfig.originalImage(
        item.backdrop_path ? item.backdrop_path : item.poster_path
    );
    const navigate = useNavigate();

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);
        const videos = await tmdbApi.getVideos(category.movie, item.id);

        if (videos.results.length > 0) {
            const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector(".modal__content > iframe").setAttribute("src", videoSrc);
        } else {
            modal.querySelector(".modal__content").innerHTML =
                "Trailer not found ...";
        }

        modal.classList.toggle('active')
    };

    return (
        <div
            className={`main-slide__item  ${className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="main-slide__item__content container">
                <div className="main-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => navigate("/movie/" + item.id)}>
                            Watch now
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="main-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt={item.title} />
                </div>
            </div>
        </div>
    );
};



export default MainSlider;
