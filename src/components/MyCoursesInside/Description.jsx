import React from 'react'

const Description = () => {
	return (
		<div className='space-y-6 p-10 sm:p-14'>
			<div className='flex flex-col space-y-5'>
				<h2 className='text-2xl font-bold'>Описание</h2>

				<div className='space-y-3 text-sm text-gray-500'>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam rerum voluptatibus ab qui odio consequuntur
						mollitia illum possimus rem tempore voluptate voluptas corrupti consequatur a, aut atque laborum commodi?
						Dolorum, quisquam aspernatur. Ea nisi minus consectetur ipsum libero quam dolore voluptas voluptatum? Culpa
						eligendi voluptas voluptates numquam, obcaecati harum inventore. Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Magnam aperiam vel culpa veniam, nisi libero optio animi incidunt perspiciatis officia
						sunt velit voluptatem reprehenderit voluptate, vero quam labore. Voluptates perspiciatis natus dignissimos
						harum reiciendis sint vero nobis reprehenderit eveniet ratione excepturi dicta sunt voluptatem itaque,
						recusandae delectus iure, atque quas repudiandae dolor? Neque, enim molestias sunt distinctio quasi
						exercitationem ipsam!
					</p>
				</div>
			</div>

			<div className='flex flex-col space-y-5'>
				<h2 className='text-2xl font-bold'>Для кого этот курс:</h2>

				<ul className='list-disc px-3 list-inside text-gray-700'>
					<li>Cookers</li>
					<li>It Managers</li>
					<li>Tehnich</li>
					<li>Cookers</li>
					<li>Cookers</li>
				</ul>
			</div>
		</div>
	)
}

export default Description
