import './App.css';
import Layout from './components/layout';
import Home from './pages/home';
import Detail from './pages/detail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InsertLibro from './pages/insertLibro';
import InsertAutor from './pages/InsertAutor';
import InsertCupon from './pages/InsertCupon';
import Autores from './pages/autores';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/:slug' element={<Detail />} />
          <Route path='/insertLibro' element={<InsertLibro/>}/>
          <Route path='/insertAutor' element={<InsertAutor/>}/>
          <Route path='/insertCupon' element={<InsertCupon/>}/>
          <Route path='/autores' element={<Autores/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

