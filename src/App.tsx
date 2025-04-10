import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Goals from './pages/Goals';
import Pomodoro from './pages/Pomodoro';

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
      </Layout>
    </>
  );
}

export default App
