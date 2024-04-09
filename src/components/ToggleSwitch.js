import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsAdmin } from '../redux/action';
import './scss/ToggleSwitch.scss';

function ToggleSwitch() {
  const isAdmin = useSelector(state => state.isAdmin);
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(setIsAdmin(!isAdmin));
  };

  return (
    <div className="toggle-switch">
      <label className="switch">
        <input type="checkbox" checked={!isAdmin} onChange={handleChange} />
        <span className="slider round" />
      </label>
    </div>
  );
}

export default ToggleSwitch;
