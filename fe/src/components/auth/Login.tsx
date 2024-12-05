import { useState } from "react";
import { getUserInfo, ILoginPayload, loginRequest, testApiT,  } from "./loginApi";
import { useAppDispatch } from "../../app/hooks";
import { showAlert } from "../../utils/showAlert";
import { useNavigate } from "react-router";

function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (!username || !password) {
        setError('Vui lòng nhập tên đăng nhập và mật khẩu.');
        return;
      }
  
      // Handle login logic here
    //   alert(`Đăng nhập thành công với tài khoản: ${username}`);
      setError(null); // Clear errors
      // const payload: ILoginPayload = { 
      //   "username": "reporter1", 
      //   "password": "duong2002" 
      // };
      const res = await dispatch(loginRequest({username: username.trim(), password: password.trim()}));
      if (res.meta.requestStatus === 'fulfilled') {
        // showAlert(`Đăng nhập thành công`, 'success');
        await dispatch(getUserInfo())
        navigate('/');
      } else {
        // showAlert(`Sai tài khoản hoặc mật khẩu`, 'danger');
      }
    };
  
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow" style={{ width: '24rem' }}>
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Đăng Nhập</h3>
            <form onSubmit={handleLogin}>
              {/* Username Field */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
  
              {/* Password Field */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
  
              {/* Error Message */}
              {error && <div className="alert alert-danger">{error}</div>}
  
              {/* Login Button */}
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  

export default Login;