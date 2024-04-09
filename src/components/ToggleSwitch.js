import './scss/ToggleSwitch.scss';

function ToggleSwitch() {
  return (
    <div className="toggle-switch">
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round" />
      </label>
    </div>
  );
}

export default ToggleSwitch;