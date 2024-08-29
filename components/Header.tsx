import React from "react";
import LinkItem from "./LinkItem";
import { getSession } from "@auth0/nextjs-auth0";

const Header: React.FC = async () => {
  const default_user = 'https://cdn.icon-icons.com/icons2/2622/PNG/512/gui_user_slash_icon_157553.png'
  const session = await getSession()

  return (
    <div className="flex items-center justify-between mt-3">
      <img
        src="/trashify.png"
        className="rounded-full ml-10 w-10 h-10 " // Adjusted size
        alt="Trashify Logo"
      />
      <div className="flex space-x-4"> {/* Added space between links */}
        <LinkItem title="Home" target_path="/" />
        <LinkItem title="Post" target_path="/post" />
        <LinkItem title="Manage" target_path="/manage" />
        {session?.user.email ? (
          <LinkItem title="Sign out" target_path="/api/auth/logout" />
        ) : (
          <LinkItem title="Sign in" target_path="/api/auth/login" />
        )}
      </div>
      <img 
        className="rounded-full w-10 h-10 mr-10" // Adjusted size
        src={session?.user.picture || default_user} 
        alt="User profile"
      />
    </div>
  );
};

export default Header;
