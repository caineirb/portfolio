import Link from 'next/link'
import React from 'react'


export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-white text-2xl font-bold">Page Not Found</h2>
      <p className="text-gray-600">Could not find requested resource</p>
      <Link href="/" className="text-blue-500 underline mt-4">
        Return Home
      </Link>
    </div>
  )
}

