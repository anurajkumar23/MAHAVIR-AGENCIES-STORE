import React from 'react'
import Marquee from './marquee'

const ClientPage = () => {
    return (
        <div className="flex flex-col items-center justify-center ">
            <h1 className="text-4xl font-bold mb-8">Welcome to My Next.js App</h1>
            <Marquee />
        </div>
    )
}

export default ClientPage