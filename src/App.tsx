import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import MoviePage from "./MoviePage";
import NavBar from "./NavBar";

type Props = {};

export default function App({}: Props) {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
    </div>
  );
}
