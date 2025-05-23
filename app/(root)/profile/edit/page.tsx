import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { fetchUser } from '@/lib/actions/user.actions';
import AccountProfile from '@/components/forms/AccountProfile';

// Copy paste most of the code as it is from the /onboarding

async function Page() {
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	if (!userInfo?.onboarded) redirect('/onboarding');

	const userData = {
		id: user.id,
		objectId: userInfo?._id?.toString(),
		username: userInfo ? userInfo?.username : user.username,
		name: userInfo ? userInfo?.name : user.firstName ?? '',
		bio: userInfo ? userInfo?.bio : '',
		image: userInfo ? userInfo?.image : user.imageUrl,
	};

	return (
		<>
			<h1 className='head-text text-white font-bold text-3xl'>Edit Profile</h1>
			<p className='mt-3 text-base font-normal text-[#EFEFEF]'>
				Make any changes
			</p>

			<section className='mt-12'>
				<AccountProfile user={userData} btnTitle='Save Changes' />
			</section>
		</>
	);
}

export default Page;
