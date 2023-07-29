import { useContext } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useNavigate, useLocation } from 'react-router-dom';
import router from '../../api/base';
// import useAuth  from '../../hooks/useAuth';
import AuthContext from '../../contexts/authContext';

const _loginURL = '/api/v1/login';

function Login() {
    const { setAuth } = useContext(AuthContext);
    // const {setAuth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const responseFacebook = async (response) => {
        console.log("response", response);
        const userID = response.userID, name = response.name, email = response.email, picture = response.picture.data.url;
        const authData = { userID, name, email, picture }
        const responce = await router.post(_loginURL, authData, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        // localStorage.setItem('user', `Bearer ${responce.data.accessToken}`);
        // localStorage.setItem('user-data', JSON.stringify(responce.data));
        setAuth(responce.data);
        console.log("responce", responce);
        navigate(from, { replace: true });
    }
    // const handleLogout = () => {
    //     setUserData({});
    //     localStorage.clear();
    // };
    return (
        <>
            <div className="main-section">
                <div className="bet-logo">
                    <img src="" alt="" />
                </div>
                <FacebookLogin
                    appId="2956994187941996"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    cssClass="my-facebook-button-class"
                    icon="fa-facebook"
                />
            </div>
        </>
    )
}

export default Login;
