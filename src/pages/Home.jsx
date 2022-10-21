// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import { OutlineButton } from "../components/button/Button";
import MainSlider from "../components/main-slider/MainSlider";
import MovieList from "../components/movie-list/MovieList";

import { category, tvType, movieType } from "../api/tmdbApi";

const Home = () => {
    return (
        <>

            <MainSlider />
            <div className="container">
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending Movies</h2>
                        <Link to='/movie'>
                            <OutlineButton className='small'>View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList type={movieType.popular} category={category.movie} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated Movies</h2>
                        <Link to='/movie'>
                            <OutlineButton className='small'>View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList type={movieType.top_rated} category={category.movie} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending TV</h2>
                        <Link to='/tv'>
                            <OutlineButton className='small'>View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList type={tvType.popular} category={category.tv} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated TV</h2>
                        <Link to='/tv'>
                            <OutlineButton className='small'>View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList type={tvType.top_rated} category={category.tv} />
                </div>
            </div>
        </>
    )

};

export default Home;
