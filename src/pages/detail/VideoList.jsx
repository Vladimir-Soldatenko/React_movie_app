// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";

const VideoList = ({ id }) => {
    const [videoList, setVideoList] = useState([]);
    const { category } = useParams();

    useEffect(() => {
        const getVideoList = async () => {
            let res = await tmdbApi.getVideos(category, id);
            setVideoList(res.results.slice(0, 3));
        };
        getVideoList();
    }, [category, id]);

    return (
        <>
            {videoList.map((item) => (
                <Video key={item.id} item={item} />
            ))}
        </>
    );
};

const Video = ({ item }) => {
    const iframeRef = useRef(null);

    useEffect(() => {
        const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
        iframeRef.current.setAttribute("height", height);
    }, []);

    return (
        <div className="video">
            <div className="video__title">
                <h2>{item.name}</h2>
            </div>
            <iframe
                src={`https://www.youtube.com/embed/${item.key}`}
                ref={iframeRef}
                width="100%"
                title="video"
            ></iframe>
        </div>
    );
};

export default VideoList;
