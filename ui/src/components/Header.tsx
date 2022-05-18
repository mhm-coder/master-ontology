import { Link } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Header = () => {
  const {user} = useSelector((state: RootState) => state.auth)
  return <header className='header'>
    <div className='logo'>
      <Link to='/'>MasterOntology</Link>
    </div>

    {user ? <ul>
        <li>
          Welcome {user.name}
        </li>
        <li>
          <Link to='/login'>
            <FaSignOutAlt/> Logout
          </Link>
        </li>
      </ul> :
      <ul>
        <li>
          <Link to='/login'>
            <FaSignInAlt/> Login
          </Link>
        </li>

        <li>
          <Link to='/register'>
            <FaUser/> Register
          </Link>
        </li>
      </ul>}
  </header>
}

export default Header