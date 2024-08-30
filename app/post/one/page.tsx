'use client'

import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { ItemsProp } from '@/types/PostState'
import { useRouter } from 'next/navigation'
import { customIcon } from '@/utils/helper'

const Page = () => {
  const [uniquePost, setUniquePost] = useState<ItemsProp | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()


  const id = searchParams.get('id')

  useEffect(() => {
    const handleGetUniquePost = async () => {
        await axios.get(`/api/post/one`, { params: { id } })
            .then((result) => {
                setUniquePost(result.data.data)
            })
            .catch((err) => {
                throw new Error(err)
            })
    }

    handleGetUniquePost()
  }, [id])

  const handleGoogleMapsLink = () => {
    if (uniquePost?.coor && uniquePost.coor.length === 2) {
      const [lat, lng] = uniquePost.coor
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
      router.push(googleMapsUrl)
    }
  } 

  return (
    <div className="container mx-auto p-4">
      {uniquePost ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">{uniquePost.title}</h1>
          <img
            src={uniquePost.photo}
            alt={uniquePost.title}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          <p className="text-gray-500 mb-4">Bin: {uniquePost.bin}</p>

          {uniquePost.coor && uniquePost.coor.length === 2 && (
            <>
              <MapContainer
                center={uniquePost.coor}
                zoom={13}
                className="h-64 rounded-md mb-4"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={uniquePost.coor} icon={customIcon}>
                  <Popup>{uniquePost.title}</Popup>
                </Marker>
              </MapContainer>
              <button
                onClick={handleGoogleMapsLink}
                className="border border-green-600 text-green-800 px-4 py-2 rounded-md w-full"
              >
                Open in Google Maps
              </button>
            </>
          )}

          <p className="text-gray-500">Posted by User ID: {uniquePost.userId}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Page
