/* eslint-disable @typescript-eslint/ban-types */
import { FC, ComponentType, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHTTPPrivate } from '../hooks/useHTTPPrivate'
import { useNavigate } from 'react-router-dom'

const withAuth = <P extends {}>(Component: ComponentType<P>): FC<P> => {
    return function WithAuth(props: P) {
        const { user } = useAuth();
        const navigate = useNavigate();

        useHTTPPrivate()

        useEffect(() => {
            if (!user) {
                navigate("/login")
            }
        }, [user, navigate])

        return <Component {...props} />
    }
}

export default withAuth