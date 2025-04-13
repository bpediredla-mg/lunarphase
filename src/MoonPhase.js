import React from 'react';
import './MoonPhase.css';

const getPhaseName = (phase) => {
  if (phase < 0.03 || phase > 0.97) return "New Moon";
  if (phase < 0.22) return "Waxing Crescent";
  if (phase < 0.28) return "First Quarter";
  if (phase < 0.47) return "Waxing Gibbous";
  if (phase < 0.53) return "Full Moon";
  if (phase < 0.72) return "Waning Gibbous";
  if (phase < 0.78) return "Last Quarter";
  return "Waning Crescent";
};

function MoonPhase({ phase, fraction }) {
  const phaseName = getPhaseName(phase);

  return (
    <div className="moon-container">
      <div className="moon">
        <div
          className="shadow"
          style={{
            transform: `translateX(${(1 - fraction) * 100}%)`
          }}
        />
      </div>
      <p>{phaseName}</p>
    </div>
  );
}

export default MoonPhase;
