import React, { useRef } from 'react'

const DopMaterials = ({ links, documents }) => {
	const aRef = useRef()

	const downloadFileHandler = (file, fileName) => {
		aRef.current.href = URL.createObjectURL(file)
		aRef.current.download = fileName
		aRef.current.click()
	}

	return (
		<div className='p-10 mb-32 space-y-3'>
			{links?.map((link) => (
				<div key={link?.id} className='space-x-2'>
					<span>{link?.name}: </span>
					<a className='text-blue-500' href={link?.link} alt='' target='_blank'>
						{link?.link}
					</a>
				</div>
			))}

			{documents?.map((document) => (
				<div key={document?.id} className='space-x-2'>
					<a ref={aRef} href='/hidden' className='hidden underline text-sm text-blue-500 hover:text-blue-300'></a>
					<span>{document?.data?.name}: </span>
					<span
						onClick={() => downloadFileHandler(document?.data?.document, document?.data?.fileName)}
						className='text-blue-500 cursor-pointer'
					>
						{document?.data?.fileName}
					</span>
				</div>
			))}
		</div>
	)
}

export default DopMaterials
