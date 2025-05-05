import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getInfoUser } from "../api/user_api";

const PublicRoute = () => {
  const [isAuth, setIsAuth] = useState(null);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const minLoadingTime = 300;
    const startTime = Date.now();

    const checkAuth = async () => {
      try {
        await getInfoUser();
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < minLoadingTime) {
          setTimeout(() => {
            setIsAuth(true);
            setShowLoading(false);
          }, minLoadingTime - elapsedTime);
        } else {
          setIsAuth(true);
          setShowLoading(false);
        }
      } catch (error) {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < minLoadingTime) {
          setTimeout(() => {
            setIsAuth(false);
            setShowLoading(false);
          }, minLoadingTime - elapsedTime);
        } else {
          setIsAuth(false);
          setShowLoading(false);
        }
      }
    };

    checkAuth();
  }, []);

  if (showLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white/80">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
        <p className="mt-3 text-base text-gray-700 font-medium">Đang tải...</p>
      </div>
    );
  }

  return !isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;