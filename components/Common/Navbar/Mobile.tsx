'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Menu, X } from 'lucide-react'

const Mobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isLoading } = useUser()
  const defaultUser = 'https://cdn.icon-icons.com/icons2/2622/PNG/512/gui_user_slash_icon_157553.png'

  const NAV_ITEMS = [
    { title: "Home", target_path: "/" },
    { title: "Post", target_path: "/post" },
    { title: "Manage", target_path: "/manage" },
    { title: "Nearest Bin", target_path: "/nearest-location" }
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <>
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <img
            src="/trashify.png"
            className="rounded-full w-8 h-8"
            alt="Trashify Logo"
          />
        </div>
        <button
          onClick={toggleMenu}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <X className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="block h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.title}
              href={item.target_path}
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              {item.title}
            </Link>
          ))}
          {!isLoading && (
            <Link
              href={user ? "/api/auth/logout" : "/api/auth/login"}
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              {user ? "Sign out" : "Sign in"}
            </Link>
          )}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  className="rounded-full h-10 w-10"
                  src={user?.picture || defaultUser}
                  alt="User profile"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user?.name || 'Guest'}</div>
                <div className="text-sm font-medium text-gray-500">{user?.email || 'Not signed in'}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Mobile