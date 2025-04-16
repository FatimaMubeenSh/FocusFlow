import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Goals from './pages/Goals';
import Pomodoro from './pages/Pomodoro';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={2000} pauseOnHover hideProgressBar={false} theme="colored" />
      </Layout>
    </>
  );
}

export default App
