import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BarChart from "./BarChart";
import HistoricalData from "./HistoricalData";

const Data = (props) => {
  const params = useParams();
  const [status, setStatus] = useState("");
  const [data2, setData2] = useState("");
  const [chart,setChart]=useState('')
  const [timeframe, setTimeframe] = useState('No. Of Cases For Past 30 Days')

  const url2 = `https://corona.lmao.ninja/v2/countries/${params.c}?yesterday=true&strict=true&query`;
  const getData2 = () => {
    setStatus("pending");
    fetch(url2)
      .then((response) => response.json())
      .then((info) => {
        setStatus("complete");
        setData2(info);
      })
      .catch((error) => {
        setStatus("error");
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getData2();
  }, [url2]);

  if (status === "pending") {
    return "LOADING";
  }

  if (status === "error") {
    return "NO DATA FOUND";
  }
  

  const population = parseInt(data2.population);
  const cases = parseInt(data2.cases);
  const deaths = parseInt(data2.deaths);
  const recovered = parseInt(data2.recovered);
  const active = parseInt(data2.active);
  const critical = parseInt(data2.critical);
  const deathPercentage = (deaths/cases*100).toFixed(2)
  const recoveryPercentage = (recovered/cases*100).toFixed(2)
  const activePercentage = ((active / cases) * 100).toFixed(2);
  const casesPercentage = ((cases / population) * 100).toFixed(2);


  function handleChart7 () {
    setChart('8')
    setTimeframe('No. Of Cases For Past 7 Days')
  }

  function handleChart30() {
    setChart("31");
    setTimeframe("No. Of Cases For Past 30 Days");

  }
  function handleChart1() {
    setChart("366");
    setTimeframe("No. Of Cases for Past Year");

  }
  function handleChartAll() {
    setChart("all");    
    setTimeframe("All No. Of Cases");
  }

  return (
    <>
      <div className="firstDataDiv">
        <div className="dataHeader">
          <div
            style={{ backgroundImage: `url(${data2?.countryInfo?.flag})` }}
            id="flag"
          ></div>
          <h1 id="title">{params.c.toUpperCase()}</h1>
        </div>
        <div className="dataHeader" id="data2">
          <h3>Population: {population.toLocaleString()}</h3>
          <h5 style={{ color: "darkorange" }}>{casesPercentage}% infected</h5>
          <h3>Active cases: {active.toLocaleString()} </h3>
          <h5 style={{ color: "darkorange" }}>
            {activePercentage}% of total cases
          </h5>
        </div>
        <div className="dataHeader" id="data3">
          <h3>Total cases: {cases.toLocaleString()} </h3>
          <h5 style={{ color: "red" }}>
            {" "}
            {critical.toLocaleString()} critical
          </h5>
          <h3>Total deaths: {deaths.toLocaleString()} </h3>
          <h5 style={{ color: "red" }}>{deathPercentage}% of total cases</h5>

          <h3>Total recovered: {recovered.toLocaleString()} </h3>
          <h5 style={{ color: "green" }}>
            {recoveryPercentage}% of total cases
          </h5>
        </div>
      </div>
      <div className="secondDataDiv">
        <div className="dataChild1" style={{ backgroundColor: "white" }}>
          <h3 id="hData">{timeframe}:</h3>
        <HistoricalData params={params} chart={chart}/>
        </div>
        <div className="dataChild2">
          <h3 style={{ textAlign: "center" }}>Historical Graph</h3>
          <button onClick={handleChart7} className="chartButton">
            7d
          </button>
          <button onClick={handleChart30} className="chartButton">
            30d
          </button>
          <button onClick={handleChart1} className="chartButton">
            1y
          </button>
          <button onClick={handleChartAll} className="chartButton">
            All
          </button>
          <BarChart params={params} chart={chart} timeframe={timeframe} />
        </div>
      </div>
    </>
  );
};

export default Data;
