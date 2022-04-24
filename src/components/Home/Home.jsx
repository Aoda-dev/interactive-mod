import React from 'react'
import { Outlet } from 'react-router-dom'
import FooterNav from './FooterNav'

import Header from './Header'
import NavMenu from './NavMenu'

const Home = () => {
	return (
		<main className='bg-gray-100 h-screen overflow-hidden relative'>
			<div className='flex items-start justify-between'>
				<NavMenu />

				<div className='flex flex-col w-full pl-0 md:p-4 md:space-y-4'>
					<Header />

					<main className='w-full bg-white pb-24 px-0 shadow-lg h-screen overflow-y-scroll'>
						<Outlet />
					</main>
				</div>

				<FooterNav />
			</div>
		</main>
	)
}

export default Home
