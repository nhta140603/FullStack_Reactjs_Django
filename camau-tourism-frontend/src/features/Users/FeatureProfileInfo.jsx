import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import ProfileSidebar from "../../components/Users/ProfileSidebar";
import ProfileMain from "../../components/Users/ProfileMain";
import { getInfoUser, updateInfoUser } from "../../api/user_api";

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTab, setSelectedTab] = useState("profile");

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError('');
      try {
        const data = await getInfoUser();
        setUserData({
          ...data,
          name: `${data.user.first_name} ${data.user.last_name}`.trim(),
          email: data.user.email,
        });
      } catch (err) {
        setError(err.message || 'Lỗi khi tải thông tin người dùng');
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  const handleSaveInfo = async (data) => {
    try {
      const updated = await updateInfoUser(data);
      setUserData(prev => ({
        ...prev,
        ...updated,
        name: `${updated.user.first_name} ${updated.user.last_name}`.trim(),
        email: updated.user.email,
      }));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <MainLayout><div className="text-center py-20">Đang tải thông tin...</div></MainLayout>;
  if (error) return <MainLayout><div className="text-center py-20 text-red-500">{error}</div></MainLayout>;
  if (!userData) return null;

  return (
    <MainLayout>
      <div className="flex min-h-screen">
        <ProfileSidebar
          selected={selectedTab}
          onSelect={setSelectedTab}
          avatar={userData.avatar}
          name={userData.name}
        />
        <main className="flex-1 p-6 bg-[#f5f7fb]">
          {selectedTab === "profile" &&
            <ProfileMain userData={userData} onSaveInfo={handleSaveInfo} />
          }
        </main>
      </div>
    </MainLayout>
  );
}