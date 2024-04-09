import ToggleSwitch from './ToggleSwitch.js';
import './scss/UserAccess.scss';

function UserAccess() {
  return (
    <div className="user-access">
      <div>
        Admin
      </div>
      <ToggleSwitch />
      <div>
        User
      </div>
    </div>
  );
}

export default UserAccess;