import './App.css';
import { useAddress } from "@thirdweb-dev/react";
import Public from './public';
import Private from './private';
import { HashRouter, Route, Routes } from 'react-router-dom';

function App() {
  const address = useAddress();
  return (
    <HashRouter>
      <Routes>
        {
          address ?
            (<Route path="/*" element={<Private />} />) :
            (<Route path="/*" element={<Public />} />)
        }
      </Routes>
    </HashRouter>
  );
}

export default App;
