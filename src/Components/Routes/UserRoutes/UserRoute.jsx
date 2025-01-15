import React, { useContext } from 'react'
import { Contex } from '../ContexApi/Contex'
import { Navigate, useLocation } from 'react-router-dom'

const UserRoute = ({ children }) => {
    const { user, loading } = useContext(Contex)
    const location = useLocation()

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
            </div>
        )
    }

    if (user) {
        return children
    }
    return <Navigate to="/login" state={{ from: location.pathname }} />
}

export default UserRoute