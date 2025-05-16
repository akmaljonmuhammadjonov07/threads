import { OrganizationSwitcher, SignedIn, SignOutButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Topbar() {
	return (
		<nav className='fixed top-0 z-30 border-b border-b-[#1F1F22] flex w-full items-center justify-between bg-[#121417] px-6 py-3'>
			<Link href='/' className='flex items-center gap-4'>
				<Image src='/logo.svg' alt='logo' width={28} height={28} />
				<p className='font-bold text-2xl text-white max-xs:hidden'>Threads</p>
			</Link>

			<div className='flex items-center gap-1'>
				<div className='block md:hidden'>
					<SignedIn>
						<SignOutButton>
							<div className='flex cursor-pointer'>
								<Image
									src='/assets/logout.svg'
									alt='logout'
									width={24}
									height={24}
								/>
							</div>
						</SignOutButton>
					</SignedIn>
				</div>

				<OrganizationSwitcher
					appearance={{
						baseTheme: dark,
						elements: {
							organizationSwitcherTrigger: 'py-2 px-4',
						},
					}}
				/>
			</div>
		</nav>
	);
}
