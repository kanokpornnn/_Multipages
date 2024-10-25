import { useRef } from 'react';
import { verifyUser } from '../../data/users';
import Form from 'react-bootstrap/Form';


import './Login.css';
function Login({ setToken, setRole }) {
    const userRef = useRef();
    const passRef = useRef();
    return (
        <div className="login-container" >

            <Form.Label htmlFor="username">&nbsp;Username</Form.Label>
            <Form.Control
                type="text"
                id="username"

                placeholder='user'
                style={{ textAlign: 'left' }}
                ref={userRef}
            />

            <Form.Label htmlFor="password">&nbsp;Password</Form.Label>
            <Form.Control
                type="password"
                id="password"

                placeholder='password'
                style={{ textAlign: 'left' }}
                ref={passRef}
            />
            <button className='btn btn-success
            mt-3'
                onClick={() => {
                    const user = userRef.current.value.trim()
                    const pass = passRef.current.value.trim()
                    const userInfo = verifyUser(user, pass)
                    userRef.current.value = ''
                    passRef.current.value = ''
                    if (userInfo === null) {
                        alert('Wrong username or password')
                        userRef.current.focus()
                    } else {
                        setToken(userInfo.token)
                        setRole(userInfo.role)
                    }
                }}>Login&nbsp;</button>
        </div>
    );
}

export default Login;