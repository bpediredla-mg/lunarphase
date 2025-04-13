import React, { useState, useEffect } from 'react';
import SunCalc from 'suncalc';
import MoonPhase from './MoonPhase';

function App() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("20:00");
  const [moonInfo, setMoonInfo] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLon(pos.coords.longitude);
      },
      () => {
        fetch("https://ipapi.co/json")
          .then(res => res.json())
          .then(data => {
            setLat(data.latitude);
            setLon(data.longitude);
          });
      }
    );
  }, []);

  useEffect(() => {
    if (lat !== null && lon !== null) {
      const dateTime = new Date(`${date}T${time}:00`);
      const moonIllum = SunCalc.getMoonIllumination(dateTime);
      const moonTimes = SunCalc.getMoonTimes(dateTime, lat, lon);
      setMoonInfo({ ...moonIllum, ...moonTimes });
    }
  }, [date, time, lat, lon]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>LunarLens 🌕</h1>
      <p>Your location: {lat && lon ? `${lat.toFixed(2)}, ${lon.toFixed(2)}` : "Locating..."}</p>
      <label>Date: </label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <label>Time: </label>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      {moonInfo && (
        <div style={{ marginTop: '20px' }}>
          <MoonPhase phase={moonInfo.phase} fraction={moonInfo.fraction} />
          <p><strong>Illumination:</strong> {(moonInfo.fraction * 100).toFixed(1)}%</p>
          <p><strong>Moonrise:</strong> {moonInfo.rise?.toLocaleTimeString() || "No moonrise"}</p>
          <p><strong>Moonset:</strong> {moonInfo.set?.toLocaleTimeString() || "No moonset"}</p>
        </div>
      )}
    </div>
  );
}

export default App;
