import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'

const CourseContent = () => {
	return (
		<div className='space-y-6 px-10 sm:px-14'>
			<h2 className='text-2xl font-bold'>Контент курса</h2>

			<div className='w-full p-0 bg-white rounded-2xl md:p-2'>
				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button className='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
								<span>Знакомство с технологиями</span>
								<ChevronUpIcon className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-white`} />
							</Disclosure.Button>
							<Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
								<ul className='list-decimal list-inside'>
									<li className='p-2 font-semibold'>Что такое React Native</li>
									<li className='p-2 font-semibold'>ASDe</li>
									<li className='p-2 font-semibold'>Rfr</li>
									<li className='p-2 font-semibold'>Что такое React Native</li>
								</ul>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
				<Disclosure as='div' className='mt-2'>
					{({ open }) => (
						<>
							<Disclosure.Button className='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
								<span>Разработка своего приложения</span>
								<ChevronUpIcon className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-white`} />
							</Disclosure.Button>
							<Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
								<ul className='list-decimal list-inside'>
									<li className='p-2 font-semibold'>Что такое React Native</li>
									<li className='p-2 font-semibold'>ASDe</li>
									<li className='p-2 font-semibold'>Rfr</li>
									<li className='p-2 font-semibold'>Что такое React Native</li>
								</ul>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
		</div>
	)
}

export default CourseContent
