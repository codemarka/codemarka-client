import React from "react";

export default props => {
  return (
      <div className="mb-4">
          <div>
              <label className="form-control-label">{props.label}</label>
          </div>
          <select class="form-control" data-toggle="select">
              {props.options.map(opt => {
          return (
              <option value={ opt.value } key={ opt.value }>
                  {opt.label}
              </option>
          );
        })}
          </select>
      </div>
  );
};
