// @ts-nocheck
import React, { useEffect, useState } from "react";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { useParams } from "react-router-dom";


const CastsList = ({ id }) => {
    const [casts, setCasts] = useState([]);

    const { category } = useParams();

    useEffect(() => {
        const getCredits = async () => {
            let res = await tmdbApi.credits(category, id);
            setCasts(res.cast.slice(0, 5));
        };
        getCredits();
    }, [category, id]);

    return (
        <div className="casts">
            {casts.map((item) => (
                <div key={item.id} className="casts__item">
                    <div
                        className="casts__item__img"
                        style={{
                            backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`,
                        }}
                    ></div>
                    <p className="casts__item__name">{item.name}</p>
                </div>
            ))}
        </div>
    );
};

export default CastsList;
