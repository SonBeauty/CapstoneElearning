import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import { Routes, Route, Outlet } from 'react-router-dom'
import AdminLayout from "components/AdminLayout"
import { lazy, Suspense } from "react";



import Home from "./modules/Home/pages/Home";
import AuthLayout from 'components/AuthLayout';
import Login from 'modules/Authentication/pages/Login';
import Register from 'modules/Authentication/pages/Register';
import CourseList from "modules/AdminCourse/pages/CourseList"
import User from "modules/AdminCourse/pages/User"
import AddCourse from 'modules/AdminCourse/pages/AddCourse'
import CourseReg from 'modules/AdminCourse/pages/CourseReg';



function BasicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}


function App() {
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route
            path="/admin" element={<AdminLayout />

            }
          >

            <Route path="user" element={<User />} />
            <Route path="courses" element={<CourseList />} />
            <Route path="course/:courseId" element={<CourseReg />} />
            <Route path="addCourse" element={<AddCourse />} />

          </Route>

          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>


          <Route path='/' element={<BasicLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
