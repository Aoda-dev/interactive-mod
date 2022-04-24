import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
	const { user } = useSelector((state) => state.user)
	const { pathname } = useLocation()

	if (!user?.accessToken) {
		return <Navigate to='/login' replace state={pathname} />
	}

	return children
}

export default ProtectedRoute
