import React from 'react'

const DopMaterials = ({ links }) => {
	console.log(links)

	return (
		<div className='p-10 space-y-3'>
			{links?.map((link) => (
				<div key={link?.id} className='space-x-2'>
					<span>{link?.name}: </span>
					<a className='text-blue-500' href={link?.link} alt='' target='_blank'>
						{link?.link}
					</a>
				</div>
			))}
		</div>
	)
}

export default DopMaterials
