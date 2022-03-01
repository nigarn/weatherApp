import axios from "axios";
import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import data from "../src/service/data.json";
import "../src/styles/weather.scss";
import {
  WiCelsius,
  WiThermometer,
  WiHumidity,
  WiStrongWind,
} from "weather-icons-react";
import Swal from "sweetalert2";

const options = data.city;
const loadOptions = (inputValue /* callback */) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        options.filter((item) =>
          item.label.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }, 1000);
  });

function Weather() {
  const [value, setValue] = useState("Baku");
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=111d2fd3fe5ed63c3c387c4be0b03d21`;
    const fetchData = () => {
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "There is no information about this city",
          });
        });
    };
    fetchData();
  }, [value]);

  const handleChange = (e) => {
    setValue(e.value);
  };

  return (
    <div className="wt-window">
      <AsyncSelect
        className="select-box"
        cacheOptions
        loadOptions={loadOptions}
        onChange={handleChange}
      />
      <div className="definition">
        <div className="main">
          <p>{data.name}</p>
          <img
            src={`http://openweathermap.org/img/wn/${
              data.weather ? data.weather[0].icon : ""
            }@2x.png`}
            alt="NK"
          />

          <div className="temp">
            <div>
              <p>{data.main ? Math.floor(data.main.temp) - 273 : ""}</p>
            </div>
            <WiCelsius size={100} />
          </div>
        </div>
      </div>
      <div className="additional">
        <div className="additional__item">
          <p className="item_name">Wind</p>
          <WiStrongWind color="gray" />
          <p>{data.wind ? data.wind.speed : "XXX"}mph</p>
        </div>
        <div className="additional__item">
          <p className="item_name">Humidity</p>
          <WiHumidity color="lightblue" />
          <p>{data.main ? data.main.humidity : "XX"}%</p>
        </div>
        <div className="additional__item">
          <p className="item_name">Feeling</p>
          <WiThermometer color="pink" />
          <div className="feels">
         
            <p>{data.main ? Math.floor(data.main.feels_like) - 273 : "XXX"}</p>
            <WiCelsius size={35} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
