import { useContext } from 'react';
import AuthContext from '../contexts/authContext';
import router from '../api/base';

const _refreshURL = '/api/v1/refresh';

const useRefreshToken = () => {
    const { setAuth } = useContext(AuthContext);

    const refresh = async () => {
        const response = await router.get(_refreshURL, {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        })
        console.log("refresh response.data.accessToken",response.data.accessToken);
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken;