import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { loginWithGoogle, signOutGoogle } from '../../firebase/firebase'
import { HumburgerMenuIcon, Xicon } from '../../assets/svg/icons'

const Navbar = () => {
	const { user } = useSelector(state => state.user)
	const [openMenu, setOpenMenu] = useState(false)
	let navigate = useNavigate()

	const signInWithGoogle = () => {
		loginWithGoogle()
	}

	const signOut = () => {
		setOpenMenu(false)
		signOutGoogle()
	}

	return (
		<nav className='relative container mx-auto p-6'>
			<div className='flex items-center justify-between'>
				<div>
					<span className='font-bold'>InteractiveMod</span>
				</div>
				<div className='hidden space-x-6 md:flex'>
					<a href='#' className='hover:text-amber-600'>
						Главная
					</a>
					<a href='#' className='hover:text-amber-600'>
						Продукт
					</a>
					<a href='#' className='hover:text-amber-600'>
						Кто я
					</a>
					<a href='#' className='hover:text-amber-600'>
						Careers
					</a>
					<a href='#' className='hover:text-amber-600'>
						Community
					</a>
				</div>

				{openMenu && (
					<div className='flex absolute w-[80%] border border-slate-500 mt-10 flex-col items-center py-8 font-bold space-y-6 z-30 bg-white top-10 left-1/2 -translate-x-1/2 sm:w-full md:hidden'>
						{user?.uid && <a href='/home/dashboard'>Меню</a>}
						{!user?.uid && (
							<a onClick={signInWithGoogle} href='#'>
								Войти
							</a>
						)}

						<a href='#'>Главная</a>
						<a href='#'>Продукт</a>
						<a href='#'>Кто я</a>
						<a href='#'>Еще что то</a>
						{user?.uid && (
							<a onClick={signOut} href='#'>
								Выйти
							</a>
						)}
					</div>
				)}

				{user?.uid ? (
					<a
						href='#'
						className='hidden p-3 px-6 pt-2 text-white bg-blue-500 rounded-full align-baseline hover:bg-blue-400 md:block'
						onClick={() => navigate('/home/dashboard')}
					>
						Перейти в меню
					</a>
				) : (
					<a
						href='#'
						className='hidden p-3 px-6 pt-2 text-white bg-brightRed rounded-full align-baseline hover:bg-brightRedLight md:block'
						onClick={signInWithGoogle}
					>
						Начать
					</a>
				)}

				<button
					className='md:hidden'
					onClick={() => setOpenMenu(prev => !prev)}
				>
					{!openMenu ? (
						<HumburgerMenuIcon className='h-8 w-8' />
					) : (
						<Xicon className='h-8 w-8' />
					)}
				</button>
			</div>
		</nav>
	)
}

export default Navbar
