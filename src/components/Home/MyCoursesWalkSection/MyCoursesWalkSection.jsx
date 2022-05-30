import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getAllMyDocuments, getOneCourse, getOneCourseSection } from '../../../firebase/firebase'

import Loader from '../../Loader/Loader'
import Content from './Content'
import DopMaterials from './DopMaterials'
import Header from './Header'
import Video from './Video'

const MyCoursesWalkSection = () => {
	const { id, sectionid } = useParams()
	const [loading, setLoading] = useState(true)
	const [section, setSection] = useState()
	const [documents, setDocuments] = useState([])

	useEffect(() => {
		getOneCourse(id).then((res) => {
			if (res) {
				getOneCourseSection(sectionid).then((result) => {
					setSection(result)
					setLoading(false)
				})

				getAllMyDocuments(sectionid).then((res) => {
					setDocuments(res)
				})
			}
		})
	}, [id, sectionid])

	return (
		<div className='pb-20 w-full h-full relative'>
			{loading && <Loader className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />}

			{!loading && (
				<div className='pb-32'>
					<Header title={section?.name} />
					{section?.videoLink && <Video title={section?.name} link={section?.videoLink} />}
					<Content content={section?.content} />
					<DopMaterials links={section?.links} documents={documents} />
				</div>
			)}
		</div>
	)
}

export default MyCoursesWalkSection
