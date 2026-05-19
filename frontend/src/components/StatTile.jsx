const StatTile = ({ icon, label, value, subtext }) => (
  <div className="stat-tile">
    <div className="stat-icon">{icon}</div>
    <p className="stat-label">{label}</p>
    <h3 className="stat-value">{value}</h3>
    <p className="stat-subtext">{subtext}</p>
  </div>
);

export default StatTile;