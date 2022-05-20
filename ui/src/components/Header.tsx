import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { authActions } from "../slices/authSlice";

const Header = () => {
  const {user} = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const onLogout = () => {
    dispatch(authActions.logout())
    dispatch(authActions.reset())
    navigate('/')
  }
  return <header className='header'>
    <div className='logo'>
      <Link to='/'>MasterOntology</Link>
    </div>

    <ul>
      {user ? <>
        <li>
          <span>Welcome {user.name}</span>
        </li>
        <li>
          <button className='btn' onClick={onLogout}>
            <FaSignOutAlt/> Logout
          </button>
        </li>
      </> : (
        <>
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
        </>
      )}
    </ul>

  </header>
}

export default Header