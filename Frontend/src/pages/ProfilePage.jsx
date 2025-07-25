import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import avatarLogo from "../assets/avatar.png";
function ProfilePage() {
  const { authUser, isUpdateProfile, updateProfile } = useAuthStore();

  const [selectedImg, setSelectedImg] = useState(null);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    await updateProfile(formData);
  };

  return (
    <div className="h-[100%] pt-10 overflow-hidden">
      <div className="max-w-2xl mx-auto p-4 py-1">
        <div className="bg-base-300 rounded-xl p-6 space-y-5">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img
                src={selectedImg || authUser?.data?.profilePic || avatarLogo}
                alt="Profile"
                className="size-25 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdateProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-4 h-4 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUpdateProfile}
                  disabled={isUpdateProfile}
                />
              </label>
            </div>
            <p
              className={`text-sm font-bold transition-colors duration-300 ${
                isUpdateProfile ? "text-yellow-500" : "text-zinc-400"
              }`}
            >
              {isUpdateProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <div className="text-sm font-semibold  text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4"  />
                Full Name
              </div>
              <p className="px-4 py-2 bg-base-200 rounded-lg border">
                {authUser?.data?.firstName} {authUser?.data?.lastName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm font-semibold text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address 
              </div>
              <p className="px-4 py-2 bg-base-200 rounded-lg border">
                {authUser?.data?.email}
              </p>
            </div>
          </div>

          <div className="mt-3 bg-base-300 rounded-xl p-3">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser?.data?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
