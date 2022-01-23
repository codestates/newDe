import { Link } from 'react-router-dom';

function Nav () {
  return (
    <div>
      <span>
        <Link to='/'>Main  </Link>
      </span>
      <span>
        <Link to='/login'>Login  </Link>
      </span>
      <span>
        <Link to='/signup'>SignUp  </Link>
      </span>
    </div>
  );
}

export default Nav;
