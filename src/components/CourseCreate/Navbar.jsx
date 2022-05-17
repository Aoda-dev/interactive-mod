import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Xicon } from '../../assets/svg/icons'

const Navbar = ({ navbar, setNavbar, openModal, myCourses }) => {
	const navigate = useNavigate()

	const courseCreate = () => {
		openModal()
		setNavbar(true)
	}

	return (
		<div
			className={`w-72 h-screen z-40 ${
				navbar ? '-translate-x-full' : 'translate-x-0'
			} fixed bg-slate-700 text-white transition-all sm:translate-x-0 sm:relative sm:block sm:w-96`}
		>
			<div className='flex justify-around items-center mt-5'>
				<h2 className='text-base text-center text-blue-100 sm:text-xl'>Режим редактирование курсов</h2>
				<Xicon onClick={() => setNavbar(true)} className='w-8 h-8 cursor-pointer sm:hidden' />
			</div>

			<div className='px-5 space-y-3 my-10'>
				<h2>Мои курсы</h2>

				{myCourses.length > 0 ? (
					<div className='max-h-52 overflow-y-scroll scroll-smooth'>
						{myCourses.map((item) => (
							<div
								onClick={() => {
									navigate(`/course/create/edit/${item.id}`, { state: { id: item.id } })
									setNavbar(true)
								}}
								key={item.id}
								className='px-5 py-2 cursor-pointer text-center border-b overflow-hidden whitespace-nowrap text-ellipsis transition-all hover:bg-blue-400'
							>
								{item.name}
							</div>
						))}
					</div>
				) : (
					<div onClick={courseCreate} className='text-center text-sm border p-5 cursor-pointer hover:bg-blue-400'>
						Вы еще не создали курс. Нажмите сюда что бы создать курс
					</div>
				)}

				{myCourses.length > 0 && (
					<div className='text-center py-5'>
						<button onClick={courseCreate} className='hover:text-blue-200'>
							Создать Курс
						</button>
					</div>
				)}
			</div>

			<div className='absolute bottom-10 text-center px-5'>
				<Link
					to={'/home/mycourses'}
					className='text-sm underline underline-offset-2 cursor-pointer hover:text-blue-200'
				>
					Выйти из режима редактирование курсов
				</Link>
			</div>
		</div>
	)
}

export default Navbar
