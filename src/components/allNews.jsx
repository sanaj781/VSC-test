import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
const API_ALL_NEWS = "https://jsonplaceholder.typicode.com/posts";
const AllNews = () => {
  const [allNews, setAllNews] = useState([]);
  const [error, setErrors] = useState();
  //For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  //Fetching data from the API
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let isApiSubscribed = true;
    axios({
      method: "GET",
      url: API_ALL_NEWS,
      signal: signal,
    })
      .then((res) => {
        if (isApiSubscribed) {
          setAllNews(res.data);
        }
      })
      .catch((error) =>
        signal.aborted
          ? console.log("successfully aborted")
          : setErrors(error.message)
      );
    return () => {
      isApiSubscribed = false;
      controller.abort();
    };
  }, []);
  //Pagination
  const news = paginate(allNews, currentPage, pageSize);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  if (error) console.log(error);
  return (
    <React.Fragment>
      <h3 className="text-center">Wszystkie Newsy</h3>
      <div className="row my-5">
        {news.map((n) => (
          <NavLink
            key={n.id}
            className="link col-md-6 col-12 post border p-3 my-2"
            to={`/post/${n.id}`}
          >
            <div className="border-bottom text-uppercase fs-5 text-center">
              {n.title}{" "}
            </div>

            <div className="m-2"> {n.body}</div>
          </NavLink>
        ))}
      </div>
      <Pagination
        itemsCount={allNews.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </React.Fragment>
  );
};

export default AllNews;
