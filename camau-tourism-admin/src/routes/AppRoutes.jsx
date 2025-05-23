import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import ClientListPage from '../pages/clients/ClientListPage';
import DestinationsListPage from '../pages/destinations/DestinationsListPage';
import HotelsListPage from '../pages/hotels/HotelsListPage';
import HotelRoomListPage from '../pages/hotel-rooms/HotelRoomListPage';
import ToursListPage from '../pages/tours/ToursListPage';
import TourGuide from '../pages/tours/TourGuideListPage';
import ReviewPage from '../pages/reviews/ReviewsListPage';
import TransportationsListPage from '../pages/transportations/TransportationListPage';
import TicketListPage from '../pages/transportations/TicketListPage';
import VeihicalListPage from '../pages/transportations/VehicalRentListPage'
import PersonalTripListPage from '../pages/clients/PersonalTripListPage';
import PersonalTourGuideBookingPageListPage from '../pages/clients/PersonalTourGuideBookingListPage';
import DestinationToursPage from '../pages/destinations/DestinationsTourDetail';
import VehicleListPage from '../pages/transportations/VehicalListPage'
import RoomTypeListPage from '../pages/hotel-rooms/RoomTypeListPage';
import AmenitiesListPage from '../pages/hotels/AmentiesListPage';
import FestivalListPage from '../pages/festivals/FestivalListPage';
import FestivalCreatePage from '../pages/festivals/FestivalCreatePage'
import DestinationCreatePage from '../pages/destinations/DestinationCreatePage'
import TourCreatePage from '../pages/tours/TourCreatePage';
import CuisineListPage from '../pages/cuisines/CuisineListPage';
import CuisineCreatePage from '../pages/cuisines/CuisineCreatePage ';
import EventsNewsListPage from '../pages/news-events/NewEventListPage';
import EventNewCreatePage from '../pages/news-events/NewEventCreatePage';
import LoginPage from '../pages/LoginPage';
import ProtectedRoute from '../routes/ProtectedRoutes'
import PublicRoute from './PublicRoutes';
function AppRoutes() {
  return (
    <Router>
      <Routes>
      <Route element={<PublicRoute/>}>
        <Route path="/loginAdmin" element={<LoginPage />} />
      </Route>
        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/destinations/detail_page/:id" element={<DestinationCreatePage />} />
          <Route path="/tours/detail_page/:id" element={<TourCreatePage />} />
          <Route path="/dashboard"  element={<Dashboard />} />
          <Route path="/clients" element={<ClientListPage />} />

          <Route path="/cuisines" element={<CuisineListPage />} />
          <Route path="/cuisines-create" element={<CuisineCreatePage />} />
          
          <Route path="/destinations" element={<DestinationsListPage />} />
          <Route path="/hotels" element={<HotelsListPage />} />
          <Route path="/hotel-rooms" element={<HotelRoomListPage />} />
          <Route path="/amenties" element={<AmenitiesListPage />} />
          <Route path="/room-types" element={<RoomTypeListPage />} />
          <Route path="/tours" element={<ToursListPage />} />
          <Route path="/tours-destinations" element={<DestinationToursPage />} />
          <Route path="/tour-guides" element={<TourGuide />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/transportations" element={<TransportationsListPage />} />
          <Route path="/tickets" element={<TicketListPage />} />
          <Route path="/vehicle-rentals" element={<VeihicalListPage />} />
          <Route path="/vehicle" element={<VehicleListPage />} />
          <Route path="/personal-trips" element={<PersonalTripListPage />} />
          <Route path="/personal-tour-guide-bookings" element={<PersonalTourGuideBookingPageListPage />} />
          <Route path="/festivals" element={<FestivalListPage />} />
          <Route path="/festivals/detail_page/:id" element={<FestivalCreatePage />} />
          <Route path="/articles" element={<EventsNewsListPage />} />
          <Route path="/articles-create" element={<EventNewCreatePage />} />
          <Route path="/articles-edit/:id" element={<EventNewCreatePage />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;