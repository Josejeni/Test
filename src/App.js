import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyCKEditor from './CkeditPageSize';
// import Ckeditor from './CkeditPageSize';

function App() {
  return (
    <BrowserRouter>
    <Routes>

      <Route path="/ckeditor" element={<MyCKEditor />} />
      {/* <Route path="/ckeditorpage" element={<Ckeditor />} /> */}

    </Routes>
  </BrowserRouter>
  );
}

export default App;
