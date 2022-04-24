import React, { useEffect } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { setLoading, setUser } from '../../features/user/userSlice'

const Login = () => {
	const location = useLocation()
	const { user } = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const provider = new GoogleAuthProvider()
	const auth = getAuth()

	useEffect(() => {
		if (!user) {
			signInWithPopup(auth, provider)
				.then((result) => {
					dispatch(setLoading(true))
					dispatch(setUser(result.user))
					dispatch(setLoading(false))

					navigate(location.state)
				})
				.catch(() => {
					navigate('/')
				})
		}
	}, [])

	return <div>Login PAGE</div>
}

export default Login
