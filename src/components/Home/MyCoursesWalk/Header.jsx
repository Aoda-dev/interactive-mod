import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { ArrowNarrowLeft } from '../../../assets/svg/icons'
import { getOneCourse } from '../../../firebase/firebase'

const Header = () => {
	let navigate = useNavigate()
	const { state } = useLocation()
	const [course, setCourse] = useState({})

	useEffect(() => {
		getOneCourse(state?.courseId).then((res) => setCourse(res))
	}, [state?.courseId])

	return (
		<>
			<div className='flex items-center justify-between p-5'>
				<div className='flex items-center space-x-3'>
					<button onClick={() => navigate(-1)} className='cursor-pointer p-2 '>
						<ArrowNarrowLeft className='h-6 w-6 stroke-gray-400' />
					</button>
					<h2 className='-mt-0.5 text-lg'>{course?.course?.name}</h2>
				</div>
			</div>
		</>
	)
}

export default Header
