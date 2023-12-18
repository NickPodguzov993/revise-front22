import React from "react";
import "./LoginForm.css";
import { useNavigate } from 'react-router-dom';
import { login } from "./entities/revise-object/api";


const LoginForm: React.FC = () => {
    const navigate = useNavigate();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('username:', username);
        console.log('password:', password);
        // console.log(document.cookie);
        // localStorage.getItem(document.cookie)
        // localStorage.setItem()
        // Authorization
        login(username, password);
        navigate('/home')
    };

    return (
        <div className="login-form">
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Имя пользователя" required value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Пароль" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default LoginForm;
