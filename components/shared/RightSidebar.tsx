import React from 'react';

export default function RightSidebar() {
	return (
		<section className='custom-scrollbar sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l border-l-[#1F1F22] bg-[#121417] px-10 pb-6 pt-28 max-xl:hidden'>
			<div className='flex flex-1 flex-col justify-start'>
				<h3 className='text-xl font-medium text-white'>
					Suggested Communities
				</h3>
			</div>
			<div className='flex flex-1 flex-col justify-start'>
				<h3 className='text-xl font-medium text-white'>Suggested Users</h3>
			</div>
		</section>
	);
}
