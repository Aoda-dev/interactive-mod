import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = ({ openModal, courses }) => {
	const navigate = useNavigate()

	const courseCreate = () => {
		openModal()
	}

	return (
		<div className='relative w-96 bg-slate-700 text-white'>
			<h2 className='text-xl text-center px-5 mt-5 text-blue-100'>Режим редактирование курсов</h2>

			<div className='px-5 space-y-3 my-10'>
				<h2>Мои курсы</h2>

				{courses.length > 0 ? (
					<div className='max-h-52 overflow-y-scroll scroll-smooth'>
						{courses.map((item) => (
							<div
								onClick={() => navigate(`/course/create/edit/${item.name}`)}
								key={item.id}
								className='px-5 py-2 cursor-pointer text-center border-b overflow-hidden whitespace-nowrap text-ellipsis hover:bg-blue-400'
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

				{courses.length > 0 && (
					<div className='text-center py-5'>
						<button onClick={courseCreate} className='hover:text-blue-200'>
							Создать Курс
						</button>
					</div>
				)}
			</div>

			<div className='absolute bottom-10 text-center px-5'>
				<Link to={'/home/mycourses'} className='text-sm underline underline-offset-2 cursor-pointer'>
					Выйти из режима редактирование курсов
				</Link>
			</div>
		</div>
	)
}

export default Navbar
