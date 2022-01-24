import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BarChart from './BarChart'

const Data = (props) => {
  const params = useParams();
  const [status, setStatus] = useState("");
  const [data, setData] = useState("");
  const [data2, setData2] = useState("");
  const [h, setH] = useState("");

  const url = `https://corona.lmao.ninja/v2/historical/${params.c}?lastdays=all`;

  const getData = () => {
    setStatus("pending");
    fetch(url)
      .then((response) => response.json())
      .then((info) => {
        setStatus("complete");
        setData(info);
        setH(info.timeline.cases);
      })
      .catch((error) => {
        setStatus("error");
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getData();
  }, [url]);

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
    return "ERROR";
  }


  let keys = Object.keys(h);
  keys.shift()
  //   console.log("k", keys);
  let value = Object.values(h);
  let values = [];
  for (let i = 0; i < value.length; i++) {
    values[i] = value[i] - value[i - 1];
  }
  values.shift();
  
  let arr = []
  for (let i = 0; i < keys.length; i++) {
  arr[i] = [keys[i],values[i]]
  }
  arr=arr.reverse()
  // console.log("v", arr);
  

  

  let list = arr.map((item) => {
    return (
      <h3>
        {item[0]}: {item[1].toLocaleString()} cases
      </h3>
    );
  });

  const population = parseInt(data2.population);
  const cases = parseInt(data2.cases);
  const deaths = parseInt(data2.deaths);
  const recovered = parseInt(data2.recovered);
  const active = parseInt(data2.active)
  const critical = parseInt(data2.critical)



  return (
    <>
      <div
        style={{ backgroundImage: `url(${data2?.countryInfo?.flag})` }}
        id="flag"
      ></div>
      <h1 id="title">{params.c.toUpperCase()}</h1>
      <div className="data">
        <div className="dataChild" style={{ backgroundColor: "white" }}>
          <h3 id="hData">Historical Daily Cases:</h3>
          <h4>{list}</h4>
        </div>
        <div className="dataChild" id="data2">
          <h3>Population: {population.toLocaleString()}</h3>
          <h3>Total cases: {cases.toLocaleString()} </h3>
          <h3>Total deaths: {deaths.toLocaleString()} </h3>
          <h3>Total recovered: {recovered.toLocaleString()} </h3>
          <h3>Active cases: {active.toLocaleString()} </h3>
          <h3>Critical cases: {critical.toLocaleString()} </h3>
        </div>
        <div className='dataChild'>
        <BarChart params={params} />
        </div>
      </div>
    </>
  );
  }

export default Data;
