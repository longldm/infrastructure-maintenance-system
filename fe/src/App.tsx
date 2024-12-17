import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ThemeLoader from './components/common/ThemeLoader';
import PrivateRoute from './components/auth/PrivateRoute';
import UserContainer from './components/user/UserContainer';
import ManagerContainer from './components/manager/ManagerContainer';
import ExecutorContainer from './components/executor/ExecutorContainer';
import AdminContainer from './components/admin/AdminContainer';
import Login from './components/auth/Login';
import BaseLayout from './components/common/BaseLayout';
import Home from './components/home/Home';
import { ReactNotifications } from 'react-notifications-component';

function App() {
  return (
    <>
      <ReactNotifications />
      <BrowserRouter>
        <Routes>
          <Route element={<ThemeLoader />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route element={<BaseLayout />}>
                <Route path="/user" element={<UserContainer />} />
                <Route path="/manager" element={<ManagerContainer />} />
                <Route path="/executor" element={<ExecutorContainer />} />
                <Route path="/admin" element={<AdminContainer />} />
              </Route>
            </Route>
            <Route element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
