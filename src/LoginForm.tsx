import "./LoginForm.css";

import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate('/home')
    }

    return (
        <div className="login-form">
            <h2>Log in</h2>
            <form>
                <input type="text" placeholder="Имя пользователя" required/>
                    <input type="password" placeholder="Пароль" required/>
                        <button onClick={onClick} type="submit">Войти</button>
            </form>
        </div>
    );
};

export default LoginForm;
