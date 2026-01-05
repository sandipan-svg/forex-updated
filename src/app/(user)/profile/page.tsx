"use client";

import ProfileTabs from "./_components/tabs/Tabs";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Full-width container with horizontal centering */}
      <div className="flex-1 flex justify-center px-4 py-8">
        {/* Fixed max-width centered block */}
        <div className="w-full max-w-4xl">
          <ProfileTabs />
        </div>
      </div>
    </div>
  );
}