export const CourseSectionPlusIcon = ({ ...rest }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		{...rest}
		fill='none'
		viewBox='0 0 24 24'
		stroke='currentColor'
		strokeWidth={1}
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
		/>
	</svg>
)

export const CourseSectionDeleteIcon = ({ ...rest }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		{...rest}
		fill='none'
		viewBox='0 0 24 24'
		stroke='currentColor'
		strokeWidth={2}
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
		/>
	</svg>
)

export const CourseCreatePlusIcon = ({ ...rest }) => (
	<svg xmlns='http://www.w3.org/2000/svg' {...rest} viewBox='0 0 20 20' fill='currentColor'>
		<path
			fillRule='evenodd'
			d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
			clipRule='evenodd'
		/>
	</svg>
)

export const CreateQuizButtonIcon = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='h-9 w-9'
			fill='rgb(37, 99, 235)'
			viewBox='0 0 24 24'
			stroke='white'
			strokeWidth={1}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
			/>
		</svg>
	)
}

export const NavIconMain = ({ stroke = 2 }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='h-6 w-6'
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			strokeWidth={stroke}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
			/>
		</svg>
	)
}

export const NavIconMainActive = () => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' viewBox='0 0 20 20' fill='currentColor'>
			<path d='M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z' />
		</svg>
	)
}

export const NavQuizIcon = ({ stroke = 2 }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='h-6 w-6'
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			strokeWidth={stroke}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
			/>
		</svg>
	)
}

export const NavQuizIconActive = () => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' viewBox='0 0 20 20' fill='currentColor'>
			<path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z' />
			<path
				fillRule='evenodd'
				d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z'
				clipRule='evenodd'
			/>
		</svg>
	)
}

export const NavMyCoursesIcon = ({ stroke = 2 }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='h-6 w-6'
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			strokeWidth={stroke}
		>
			<path d='M12 14l9-5-9-5-9 5 9 5z' />
			<path d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' />
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
			/>
		</svg>
	)
}

export const NavMyCoursesIconActive = () => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' viewBox='0 0 20 20' fill='currentColor'>
			<path d='M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z' />
		</svg>
	)
}

export const NavLogout = () => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' viewBox='0 0 20 20' fill='currentColor'>
			<path
				fillRule='evenodd'
				d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
				clipRule='evenodd'
			/>
		</svg>
	)
}

export const NavAboutProject = ({ stroke = 2 }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='h-6 w-6'
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			strokeWidth={stroke}
		>
			<path strokeLinecap='round' strokeLinejoin='round' d='M13 10V3L4 14h7v7l9-11h-7z' />
		</svg>
	)
}

export const QuizTimerIcon = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='h-6 w-6'
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			strokeWidth={2}
		>
			<path strokeLinecap='round' strokeLinejoin='round' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
		</svg>
	)
}

export const QuizEndClockIcon = () => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-blue-500' viewBox='0 0 20 20' fill='currentColor'>
			<path
				fillRule='evenodd'
				d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
				clipRule='evenodd'
			/>
		</svg>
	)
}

export const QuizResultStart = ({ ...rest }) => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' {...rest} fill='none' viewBox='0 0 24 24' stroke='#F7CA18' strokeWidth={1}>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
			/>
		</svg>
	)
}

export const FooterHomeIcon = ({ ...rest }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			{...rest}
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			strokeWidth={2}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
			/>
		</svg>
	)
}

export const CraeteQuizXicon = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='h-6 w-6'
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			strokeWidth={2}
		>
			<path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
		</svg>
	)
}

export const CreateQuizArrowIcon = ({ ...rest }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			{...rest}
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			strokeWidth={2}
		>
			<path strokeLinecap='round' strokeLinejoin='round' d='M17 8l4 4m0 0l-4 4m4-4H3' />
		</svg>
	)
}

export const ArrowNarrowLeft = ({ ...rest }) => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' {...rest} viewBox='0 0 24 24' stroke='gray' strokeWidth={2}>
			<path strokeLinecap='round' strokeLinejoin='round' d='M7 16l-4-4m0 0l4-4m-4 4h18' />
		</svg>
	)
}

export const PlayButtonIcon = ({ ...rest }) => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' {...rest} viewBox='0 0 20 20' fill='currentColor'>
			<path
				fillRule='evenodd'
				d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
				clipRule='evenodd'
			/>
		</svg>
	)
}

export const HumburgerMenuIcon = ({ ...rest }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			{...rest}
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			strokeWidth={2}
		>
			<path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
		</svg>
	)
}

export const Xicon = ({ ...rest }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			{...rest}
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			strokeWidth={2}
		>
			<path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
		</svg>
	)
}

export const DownloadFileIcon = ({ ...rest }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			{...rest}
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			strokeWidth={2}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
			/>
		</svg>
	)
}

export const AuthorIcon = ({ stroke = 2 }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='h-6 w-6'
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			strokeWidth={stroke}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
			/>
		</svg>
	)
}

export const AuthorIconActive = () => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' viewBox='0 0 20 20' fill='currentColor'>
			<path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd' />
		</svg>
	)
}
