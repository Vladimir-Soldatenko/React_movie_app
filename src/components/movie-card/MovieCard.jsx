// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import { category } from "../../api/tmdbApi";
import Button from '../button/Button'
import { ImDisplay } from 'react-icons/im'

import "./movie-card.scss";

const MovieCard = (props) => {
    const link = `/${category[props.category]}/${props.item.id}`;
    const bg = apiConfig.w500Image(props.item.backdrop_path || props.item.poster_path);

    return (
        <Link to={link}>
            <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
                <span className="vote">{props.item.vote_average.toFixed(1)}</span>
                <Button>
                    <ImDisplay />
                </Button>
            </div>
            <h3>{props.item.title || props.item.name}</h3>
        </Link>
    );
};

export default MovieCard;
