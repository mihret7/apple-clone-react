import {Routes, Route} from 'react-router-dom'
import './App.css'

import './assets/js/custom.js'

// importing components 
import Main from './Components/Main/Main.jsx';



//importing components which are dependent on route
import Iphone from './Pages/Iphone/Iphone.jsx'
import Mac from './Pages/Mac/Mac.jsx'
import Four04 from './Pages/Four04/Four04.jsx'
import Productpage from './Pages/Productpage/Productpage.jsx'
import SharedLayout from "./Pages/SharedLayout.jsx";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Main />} />
          <Route path="/mac" element={<Mac />} />
          <Route path="/iphone" element={<Iphone />} />
          <Route path="/iphone/:pid" element={<Productpage />} />
          <Route path="*" element={<Four04 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App

