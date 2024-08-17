import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface LinkItemProps {
    target_path: string
    title: string;
}
const LinkItem: React.FC<LinkItemProps> = ({target_path, title}) => {
    const pathname = usePathname()

  return (
    <Link href={target_path} className={`cursor-pointer text-sm ${pathname === target_path ? "font-bold": "font-light"} text-gray-500 duration-100 hover:bg-gray-100 px-4 py-2 rounded-full`}>
        {title}
    </Link>
  )
}

export default LinkItem