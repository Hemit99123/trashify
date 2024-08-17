import React from "react";
import Image from "next/image";
import LinkItem from "./LinkItem";



interface HeaderProps {
  user: any;
}

const Header: React.FC<HeaderProps> = ({user}) => {

  const default_user = 'https://cdn.icon-icons.com/icons2/2622/PNG/512/gui_user_slash_icon_157553.png'
  console.log(user)

  return (
    <div className="flex items-center justify-between mt-3">
      <Image
        src="/trashify.png"
        className="rounded-full ml-10"
        width={40}
        height={40}
        alt="Trashify Logo"
      />
      <div className="flex">
        <LinkItem title="Home" target_path="/" />
        <LinkItem title="Post" target_path="/post" />
        <LinkItem title="Manage" target_path="/manage" />
        {user ? (
          <LinkItem title="Sign out" target_path="/api/auth/logout" />
        ) : (
          <LinkItem title="Sign in" target_path="/api/auth/login" />
        )}
      </div>
      <img className="rounded-full w-7 h-7 mr-10" src={user?.picture || default_user} />
    </div>
  );
};

export default Header;
