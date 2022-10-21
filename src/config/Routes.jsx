import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Catalog = lazy(() => import("../pages/Catalog"));
const Detail = lazy(() => import("../pages/detail/Detail"));

const RoutesApp = () => {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:category/search/:keyword" element={<Catalog />} />
                <Route path="/:category" element={<Catalog />} />
                <Route path="/:category/:id" element={<Detail />} />
            </Routes>
        </Suspense>
    );
};

export default RoutesApp;
