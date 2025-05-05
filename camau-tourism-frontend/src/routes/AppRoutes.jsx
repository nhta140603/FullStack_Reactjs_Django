import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Tours from '../pages/Tours';
import Destinations from '../pages/Destinations';
import Hotels from '../pages/Hotels';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import PersonalTrip from '../pages/PersonalTrips';
import UserProfile from '../pages/User-profile';
import DestinationDetailPage from '../pages/DestinationDetailPage';
import ArticlesDetailPage from '../pages/ArticlesDetailPage';
import Event from '../pages/Festivals'
import FestivalDetailPage from '../pages/FestivalDetailPage'
import CuisineListPage from '../pages/CuisinePage';
import CuisineDetailPage from '../pages/CuisineDetailPage';
import TourDetailPage from "../pages/TourDetailPage"
import ArticlesPage from '../pages/ArticlesPage';
import PublicRoute from '../routes/PublicRoute'
import ProtectedRoute from '../routes/ProtectedRoute'
import HotelDetail from '../pages/HotelDetail';
function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/danh-sach-chuyen-du-lich" element={<Tours />} />
        <Route path="/chuyen-du-lich/:slug" element={<TourDetailPage />} />

        <Route path="/danh-sach-dia-diem" element={<Destinations />} />
        <Route path="/dia-diem/:slug" element={<DestinationDetailPage />} />


        <Route path="/danh-sach-le-hoi" element={<Event />} />

        <Route path="/tin-tuc-su-kien" element={<ArticlesPage />} />
        
        <Route path="/le-hoi/:slug" element={<FestivalDetailPage />} />

        <Route path="/khach-san/:slug" element={<HotelDetail />} />
        <Route path="/tim-khach-san" element={<Hotels />} />

        <Route path="/am-thuc" element={<CuisineListPage />} />
        <Route path="/am-thuc/:slug" element={<CuisineDetailPage />} />

        <Route path="/su-kien/:slug" element={<ArticlesDetailPage />} />
        <Route path="/tin-tuc/:slug" element={<ArticlesDetailPage />} />   
             
        <Route element={<PublicRoute/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/personaltrip" element={<PersonalTrip />} />
        <Route element={<ProtectedRoute/>}>
        <Route path="/user-profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;