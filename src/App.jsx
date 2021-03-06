import { useState, useEffect } from "react";
import "./App.css";
import Map from "./Map";
import Countries from "./Countries";
import Home from './Home'
import Data from './Data'
import Compare from './Compare'
import Local from "./Local";
import { Route, Routes, Link } from "react-router-dom";

function App() {
  const [country, setCountry] = useState([]);
  const [global, setGlobal] = useState("");
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('')

  const getData = () => {
    setStatus('pending')
    fetch("https://api.covid19api.com/summary")
      .then((response) => response.json())
      .then((data) => {
        // console.log('api',data)
        setStatus("complete");
        setCountry(data.Countries);
        setGlobal(data.Global);
        setDate(data.Global.Date)
        // console.log(country);
      })
    .catch((error) => {
      setStatus("error");
    });
  };

  useEffect(() => {
    getData();
  }, []);

   if (status === "pending") {
     return "LOADING";
   }

   if (status === "error") {
     return "NO DATA FOUND";
   }


  return (
    <div id="home">
      <nav>
        <Link to="/"><h1>Covid-19</h1></Link>
        <Link to="/Local">Local Info</Link>
        <Link to="/Countries">Countries</Link>
        <Link to="/Compare">Compare Countries</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home global={global} date={date} country={country} />} />
          <Route path="/Countries" element={<Countries country={country} />} />
          <Route path="/data/:c" element={<Data country={country} />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/local" element={<Local />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
