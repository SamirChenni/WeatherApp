const OutlookTile = ({ icon, label, value, subtext }) => (
  // Added "forecast-tile" here to target this design specifically
  <div className="stat-tile">
    <p className="stat-label">{label}</p>
    <div className="outlook-icon">
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={label} />
    </div>
    <h3 className="stat-value">{value}</h3>
    <p className="stat-subtext">{subtext}</p>
  </div>
);

export default OutlookTile;