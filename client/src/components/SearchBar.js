import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { movieAction } from "../redux/actions/MovieAction";
import React, { useEffect, useState } from "react";
import $ from "jquery";


const SearchBar = () => {
  const dispatch = useDispatch();
  const { allMovies, loading } = useSelector((state) => state.allMovie);

  useEffect(() => {
    dispatch(movieAction.getAllMovies());
  }, []);

  const handleOnSelect = (item) => {
    $('#' + item.id).click()
  };

  const formatResult = (item) => {
    return (
      <div className="search-result" >
        <img
          src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`}
          style={{
            width: "50px",
            marginRight: "20px",
          }}
        />
        <ul
          style={{
            fontFamily: "Archivo",
          }}
        >
          <li className="white-middle-font">{item.title}</li>
          <li className="grey-small-font mt-1">★ {item.vote_average / 2}</li>
        </ul>
      </div>
    );
  };

  return (
    <>
      <div style={{ width: 400, zIndex:1}}>
        <ReactSearchAutocomplete
          items={allMovies}
          onSelect={handleOnSelect}
          // autoFocus
          formatResult={formatResult}
          showIcon={true}
          maxResults={8}
          showNoResults={false}
          fuseOptions={{ keys: ["title"] }}
          placeholder={"Please Enter the Movie Title."}
          styling={{
            backgroundColor:"#141414",
            border:"none",
            color:"white",
            hoverBackgroundColor: "#242424",
            lineColor: "#242424"
          }}
        />
      </div>
    </>
  );
};

export default SearchBar;
