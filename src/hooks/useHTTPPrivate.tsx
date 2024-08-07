import { http } from "../utils/http"
import { useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

export const useHTTPPrivate = () => {
    const { token } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const requestIntercept = http.interceptors.request.use(
            config => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${token}`
                }
                return config
            }, (error) => Promise.reject(error)
        )

        const responseIntercept = http.interceptors.response.use(
            response => response,
            async error => {
                if (error?.response?.status === 403 || error?.response?.status === 401) {
                    navigate("/login")
                }
                return Promise.reject(error)
            }
        )

        return () => {
            http.interceptors.request.eject(requestIntercept)
            http.interceptors.response.eject(responseIntercept)
        }
    }, [token, navigate])
}