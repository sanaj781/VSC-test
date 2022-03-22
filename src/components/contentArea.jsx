import React from "react";
import { Routes, Route } from "react-router-dom";
import Post from "./post";
import AllNews from "./allNews";
import NewPost from "./newPost";
const ContentArea = () => {
  return (
    <div className="container-xxl ">
      <Routes>
        <Route exact path="/" element={<AllNews />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/new-post" element={<NewPost />} />
      </Routes>
    </div>
  );
};

export default ContentArea;
