import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneCourse, getOneCourseSection } from '../../../firebase/firebase'
import Content from './Content'
import DopMaterials from './DopMaterials'
import Header from './Header'
import Video from './Video'

const MyCoursesWalkSection = () => {
	const { id, sectionid } = useParams()
	const [section, setSection] = useState()

	useEffect(() => {
		getOneCourse(id).then((res) => {
			if (res) {
				getOneCourseSection(sectionid).then((result) => {
					setSection(result)
				})
			}
		})
	}, [id, sectionid])

	return (
		<div className='pb-20'>
			<Header title={section?.name} />
			{section?.videoLink && <Video title={section?.name} link={section?.videoLink} />}
			<Content content={section?.content} />
			<DopMaterials links={section?.links} />
		</div>
	)
}

export default MyCoursesWalkSection
