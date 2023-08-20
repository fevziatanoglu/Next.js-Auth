import Link from 'next/link'
import React from 'react'

export default function NonUserHeader() {
  return (
    <nav className="bg-blue-800">
    <div className="p-5  flex flex-row justify-between  items-center ">
      {/* title */}
      <Link href={"/"}>
        <h1 className="font-bold text-2xl text-gray-300 hover:text-white">
          NEXTJS AUTH
        </h1>
      </Link>

      {/*buttons*/}
      <div>
       
      </div>
    </div>
  </nav>
  )
}
