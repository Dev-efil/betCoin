import { privateRoute } from "../api/base";
import { useContext, useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import AuthContext from "../contexts/authContext";

// this hook is going to return privateRoute instance and 
// it will have the interceptors added to handle the JWT tokens that we need to request our data and retry and get a new accessToken.
const usePrivateRoute = () => {
    const refresh = useRefreshToken();
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const requestIntercept = privateRoute.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) { // if Authorization not exist means, it's not a retry it will be the first attempt
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`; // this could be the access token we were given initially, when we signed in.
                }
                return config;
            }, (error) => {
                Promise.reject(error)
            }
        );
        const responseIntercept = privateRoute.interceptors.response.use(
            response => response, // intercept response is good then return the response
            async (error) => { // intercept error: if token is invalid or expired then async error will be thrown
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent) { // if status is 403 and sent does not exist
                    // this is because we don't want to get in this endless loop that could happen of 403 so we need to retry once and the sent property indicates that.
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return privateRoute(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        return () => {
            privateRoute.interceptors.request.eject(requestIntercept);
            privateRoute.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh]);

    return privateRoute;
}

export default usePrivateRoute;