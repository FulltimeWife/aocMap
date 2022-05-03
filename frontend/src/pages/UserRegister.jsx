import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'
import { FaUser } from "react-icons/fa"
import { register, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

const UserRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })

  const {username, password, confirmPassword} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {userData, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }
    if(isSuccess || userData) {
      navigate('/')
    }

    dispatch(reset())
  }, [userData, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()

    if(password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      const user = {
        username, password
      }
      dispatch(register(user))
    }
  }
  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
    <section className="heading">
      <h1>
        <FaUser /> Register
      </h1>
      <p> Make acc here </p>
    </section>
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input 
            type="text" 
            className="form-control" 
            id="username" 
            name="username" 
            value={username} 
            placeholder='Username' 
            onChange={onChange} 
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            name="password" 
            value={password} 
            placeholder='Password' 
            onChange={onChange} 
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            className="form-control" 
            id="confirmPassword" 
            name="confirmPassword" 
            value={confirmPassword} 
            placeholder='Confirm Password' 
            onChange={onChange} 
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">Submit</button>
        </div>
      </form>
    </section>
    </>
  )
}

export default UserRegister
