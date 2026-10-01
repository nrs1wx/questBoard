import { STATUSES } from "../statuses.js";

const filters = ["All", ...STATUSES];

function Toolbar({ filter, onFilterChange, onReverse }) {
  console.log("Toolbar render");

  return (
    <div className="toolbar">
      <div className="filters">
        {filters.map((name) => (
          <button
            key={name}
            className={name === filter ? "filter active" : "filter"}
            onClick={() => onFilterChange(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <button className="btn secondary" onClick={onReverse}>
        Reverse list
      </button>
    </div>
  );
}

export default Toolbar;
