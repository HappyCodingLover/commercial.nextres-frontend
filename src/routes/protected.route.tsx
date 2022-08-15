import { logout } from 'actions'
import jwt from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const dispatch = useDispatch()
  const auth = useSelector((state: any) => state.auth)
  let success = false

  try {
    const payload: any = jwt(auth.token)
    if (payload.exp * 1000 > Date.now()) {
      success = true
    } else {
      dispatch(logout())
    }
  } catch {}
  const location = useLocation()
  return !success ? <Navigate to={'/home'} state={{ from: location }} replace /> : children
}
