// @ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import Input from "../input/Input";
import Button from '../button/Button'
import { useNavigate } from "react-router-dom";
import { category } from "../../api/tmdbApi";

import './movie-search.scss'

const MovieSearch = (props) => {
    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");
    const navigate = useNavigate();

    const goToSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
            navigate(`/${category[props.category]}/search/${keyword}`);
        }
    }, [props.category, keyword, navigate]);

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        };
        document.addEventListener("keyup", enterEvent);
        return () => {
            document.removeEventListener("keyup", enterEvent);
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="enter keyword"
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className='small' onClick={goToSearch}>Search</Button>
        </div>
    );
};

export default MovieSearch;
