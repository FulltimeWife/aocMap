import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { userLogout, reset } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {userData} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(userLogout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/map"> View Map </Link>
      </div>
      <div>
        <Link to ="/"> Blank Screen</Link>
      </div>
      <ul>
        {userData ? (
          <>
          <li>
            <Link to="/profile">
              <FaUser /> Profile
            </Link>
          </li>
          <li>
            <button className="btn" onClick={onLogout}> 
            <FaSignOutAlt /> Logout
            </button>
          </li>
          </>
        ) : 
        (<>
          <li>
          <Link to="/login">
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link to="/register">
            <FaUser /> Register
          </Link>
        </li>
        </>)}
      </ul>
    </header>
  )
}

export default Header