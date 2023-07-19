
import Login from './pages/Login';
import Header from './components/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import User from './pages/UserManegement';
import { ToastContainer} from 'react-toastify';
import Category from './pages/CategoryPackage';
import Packages from './pages/PackageItemupload';
import Categorylist from './pages/categorylist';
import Packagelists from './pages/packageItemlist';
import AddcustomeItem from './pages/addcustomeItems';
import CustomeList from './pages/CustomList';
import EditcustomeItem from './pages/EditCustomeItem';
import EditPackages from "./pages/EditPackageItem";
import Dashboard from './pages/Dashboard';
import Order from './pages/Orderlist';
import EditCategories from "./pages/EditCategoryPackage"
import Map from "./pages/Livelocation"



function App() {
  return (
    <>   
    <ToastContainer />
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
       <Route path="/admin/home" element={<User />} />
       <Route path='/admin/categoryadd' element={<Category/>}/>
       <Route path="/admin/editcategory/:id" element={<EditCategories/>}/>
       <Route path='/admin/addpackage' element={<Packages/>}/>
       <Route path='/admin/categorylist' element={<Categorylist/>}/>
       <Route path='/admin/packagelist' element={<Packagelists/>}/>
       <Route path='/admin/EditPackage/:id' element={<EditPackages/>}/>
       <Route path="/admin/addcustomeitem" element={<AddcustomeItem/>}/>
       <Route path='/admin/editcustomeitem/:id' element={<EditcustomeItem/>}/>
       <Route path='/admin/customlist' element={<CustomeList/>}/>
       <Route path='/admin/orderlist' element={<Order/>}/>
       <Route path='/admin/livelocation/:latitude/:longitude' element={<Map/>}/>
      </Routes>
    </Router>
    </> 
  );
}
export default App;

