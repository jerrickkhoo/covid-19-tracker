import React from "react";
import Map from "./Map";
import Chart from "./BarChart";
import { useState, useEffect } from "react";

const Home = (props) => {
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);

  const confirmed = parseInt(props.global.TotalConfirmed);
  const deaths = parseInt(props.global.TotalDeaths);
  const date = props.date.slice(0, 10);

  const url = "https://corona.lmao.ninja/v2/countries?yesterday&sort";
  const getData = () => {
    setStatus("pending");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setStatus("complete");
        setData(data);
      })
      .catch((error) => {
        setStatus("error");
      });
  };
  
  useEffect(() => {
    getData();
  }, [url]);
  
  if (status === "pending") {
    return "LOADING";
  }
  
  if (status === "error") {
    return "NO DATA FOUND";
  }
  
  const highestConfirmed = data
  console.log(data)
  highestConfirmed?.sort((a, b) => b?.cases - a?.cases);
  const top5C = highestConfirmed.slice(0, 10);
  console.log(highestConfirmed);
  let topConfirmed = top5C.map((item)=>{
      return (
        <div className='homeC'>
          <div
            style={{ backgroundImage: `url(${item?.countryInfo?.flag})` }}
            id="flagg"
            className="homeChildChildChild1"
          ></div>
          <h3 className="homeChildChildChild2" style={{textAlign:'left'}}>{item?.country}</h3>
          <h3 className="homeChildChildChild3">
            {item?.cases.toLocaleString()} cases
          </h3>
        </div>
      );})
    

      let recoveredPercentage = []
      for(let i = 0; i<data.length; i++){
        recoveredPercentage[i] = {'country': data?.[i]?.country,'percentage':parseInt((data?.[i]?.recovered/data?.[i]?.cases)*100).toFixed(0),'img':data?.[i]?.countryInfo?.flag}
      }
      
      
      const highestRecovered = recoveredPercentage.sort(function(a, b){return b.percentage - a.percentage;});
      const top5R = highestRecovered.slice(0, 10);
      console.log(highestRecovered);
      let topRecovered = top5R.map((item) => {
        return (
          <div className="homeC">
            <div
              style={{ backgroundImage: `url(${item?.img})` }}
              id="flagg"
              className="homeChildChildChild1"
            ></div>
            <h3 className="homeChildChildChild2" style={{ textAlign: "left" }}>
              {item?.country}
            </h3>
            <h3 className="homeChildChildChild3">
              {item?.percentage}%
            </h3>
          </div>
        );
  });
  
  console.log(highestRecovered)

   let deathPercentage = []
      for(let i = 0; i<data.length; i++){
        deathPercentage[i] = {
          country: data?.[i]?.country,
          percentage: parseInt(
            (data?.[i]?.deaths / data?.[i]?.cases) * 100
          ).toFixed(),
          img: data?.[i]?.countryInfo?.flag,
        };
      }
      // console.log(recoveredPercentage[0]?.country)
  

  const highestDeaths = deathPercentage.sort(function(a, b){return b.percentage - a.percentage;});
  const top5D = highestDeaths.slice(0, 10);
  // console.log(highestDeaths);
  let topDeaths = top5D.map((item) => {
    return (
      <div className="homeC">
        <div
          style={{ backgroundImage: `url(${item?.img})` }}
          id="flagg"
          className="homeChildChildChild1"
        ></div>
        <h3 className="homeChildChildChild2" style={{ textAlign: "left" }}>
          {item?.country}
        </h3>
        <h3 className="homeChildChildChild3">{item?.percentage}%</h3>
      </div>
    );
  });

  return (
    <div id="home">
      <h3 className="homepage" style={{fontSize:'180%'}}>Global stats as of {date}</h3>
      <h3 className="homepage">
        Confirmed cases: {confirmed.toLocaleString()}
      </h3>
      <h3 className="homepage">Death count: {deaths.toLocaleString()}</h3>
     
      <div id="home2">

        <div id="homeChild">
          <h3>Top 10 Countries with highest cases: </h3>
          <div className='homeChildChild'>
          {topConfirmed}
          </div>
        </div>

        <div id="homeChild">
          <h3>Top 10 Countries with highest recovery rate: </h3>
          <h4 style={{ color: "green" }}>{topRecovered}</h4>
        </div>

        <div id="homeChild">
          <h3>Top 10 Countries with highest death rate: </h3>
          <h4 style={{ color: "red" }}>{topDeaths}</h4>
        </div>

      </div>
    </div>
  );
};

export default Home;
