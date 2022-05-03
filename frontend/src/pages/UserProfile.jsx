import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const UserDashboard = () => {
  const navigate = useNavigate()

  const {userData} = useSelector((state) => state.auth)

  useEffect(() => {
    if(!userData) {
      navigate('/login')
    }
  }, [userData, navigate])
  return (
    <>
    <section className="heading" >
      <h1> {userData && userData.username} </h1>
      <h2> {userData && userData._id} </h2>
    </section>
    </>
  )
}

export default UserDashboard