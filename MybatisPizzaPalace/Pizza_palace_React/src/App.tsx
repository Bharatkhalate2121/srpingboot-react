import './App.css'
import Header from "./Components/Header"
import Body from "./Components/Body"
import AdminPizzaHome from "./Components/AdminView/AdminPizzaHome"
import FetchData, { ctx, auth,Orders } from './Utils/FetchData';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ALlPizza from './Components/CustomerView/AllPizza';
import Data from './Utils/Data';
import Footer from './Components/Footer';
import AuthForm from './Components/AuthForm';
import MyOrders from './Components/CustomerView/MyOrders';
import Admin from './Components/AdminView/Admin';
import CheckLog from './Components/CustomerView/CheckLog';
import NothingHere from './Components/NothingHere';
import AllOrders from './Components/AdminView/AllOrders';





function App() {
  const val = FetchData();
  const values = Data();
  const user = auth();
  const o=Orders();
  return (
    <>
      <ctx.Provider value={{ ...val, ...values, ...user,...o}}>

        <BrowserRouter>
          <Routes >
            <Route path='/' element={<><Header /><Footer /></>}>
              <Route index element={<><Body/></>} />
              <Route path="allpizzas" element={<ALlPizza />} />
              <Route path="login" element={<AuthForm />} />
              <Route path='user' element={<CheckLog/>}>
                <Route path='myorders' element={<><MyOrders/></>} /> 
              </Route>
              <Route path="admin" element={<Admin />}>
                <Route path='manage' element={<><AdminPizzaHome /></>} />
                <Route path='viewallorders' element={<><AllOrders /></>} />
              </Route>
              <Route path='*' element={<NothingHere/>}/>
            </Route>
          </Routes>

        </BrowserRouter>

      </ctx.Provider>
    </>
  )
}

export default App









