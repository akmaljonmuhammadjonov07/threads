import { currentUser } from '@clerk/nextjs/server';

import UserCard from '../cards/UserCard';

import { fetchCommunities } from '@/lib/actions/community.actions';
import { fetchUsers } from '@/lib/actions/user.actions';

async function RightSidebar() {
	const user = await currentUser();
	if (!user) return null;

	const similarMinds = await fetchUsers({
		userId: user.id,
		pageSize: 4,
	});

	const suggestedCOmmunities = await fetchCommunities({ pageSize: 4 });

	return (
		<section className='custom-scrollbar sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l border-l-[#1F1F22] bg-[#121417] px-10 pb-6 pt-28 max-xl:hidden'>
			<div className='flex flex-1 flex-col justify-start'>
				<h3 className='text-xl font-medium text-white'>
					Suggested Communities
				</h3>

				<div className='mt-7 flex w-[350px] flex-col gap-9'>
					{suggestedCOmmunities.communities.length > 0 ? (
						<>
							{suggestedCOmmunities.communities.map(community => (
								<UserCard
									key={community.id}
									id={community.id}
									name={community.name}
									username={community.username}
									imgUrl={community.image}
									personType='Community'
								/>
							))}
						</>
					) : (
						<p className='text-base font-normal text-[#7878A3]'>
							No communities yet
						</p>
					)}
				</div>
			</div>

			<div className='flex flex-1 flex-col justify-start'>
				<h3 className='text-xl font-medium text-white'>Similar Minds</h3>
				<div className='mt-7 flex w-[350px] flex-col gap-10'>
					{similarMinds.users.length > 0 ? (
						<>
							{similarMinds.users.map(person => (
								<UserCard
									key={person.id}
									id={person.id}
									name={person.name}
									username={person.username}
									imgUrl={person.image}
									personType='User'
								/>
							))}
						</>
					) : (
						<p className='text-base font-normal text-[#7878A3]'>No users yet</p>
					)}
				</div>
			</div>
		</section>
	);
}

export default RightSidebar;
