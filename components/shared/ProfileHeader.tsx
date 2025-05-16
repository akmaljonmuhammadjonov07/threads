import Image from 'next/image';
import React from 'react';

interface Props {
	accountId: string;
	authUserId: string;
	name: string;
	username: string;
	imgUrl: string;
	bio: string;
}

const ProfileHeader = ({
	// accountId,
	// authUserId,
	name,
	username,
	imgUrl,
	bio,
}: Props) => {
	return (
		<div className='flex w-full flex-col justify-start'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<div className='relative h-20 w-20 object-cover'>
						<Image
							src={imgUrl}
							alt='logo'
							fill
							className='rounded-full object-cover shadow-2xl'
						/>
					</div>

					<div className='flex-1'>
						<h2 className='text-left text-2xl font-bold text-white'>{name}</h2>
						<p className='text-base font-medium text-[#697C89]'>@{username}</p>
					</div>
				</div>
			</div>

			<p className='mt-6 max-w-lg text-base font-normal text-[#EFEFEF]'>
				{bio}
			</p>
			<div className='mt-12 h-0.5 w-full bg-[#101012]' />
		</div>
	);
};

export default ProfileHeader;
