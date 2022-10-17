import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import { Routes, Route, Outlet } from 'react-router-dom'
import AdminLayout from "components/AdminLayout"
import { lazy, Suspense } from "react";



import Home from "./modules/Home/pages/Home";
import AuthLayout from 'components/AuthLayout';
import Login from 'modules/Authentication/pages/Login';
import Register from 'modules/Authentication/pages/Register';
const User = lazy(() => import("modules/AdminCourse/pages/User"));
const MovieList = lazy(() => import("modules/AdminCourse/pages/MovieList"));
const CreateShowTime = lazy(() => import('modules/AdminCourse/pages/CreateShowTime'));
const AddMovie = lazy(() => import('modules/AdminCourse/pages/AddMovie'));



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
            <Route path="movies" element={<MovieList />} />
            <Route path="showtime/:movieId" element={<CreateShowTime />} />
            <Route path="addmovie" element={<AddMovie />} />

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
