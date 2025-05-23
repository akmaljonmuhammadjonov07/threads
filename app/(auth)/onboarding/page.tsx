import AccountProfile from '@/components/forms/AccountProfile';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Page() {
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	if (userInfo?.onboarded) redirect('/');

	const userData = {
		id: user.id,
		objectId: userInfo?._id,
		username: userInfo ? userInfo?.username : user.username,
		name: userInfo ? userInfo?.name : user.firstName ?? '',
		bio: userInfo ? userInfo?.bio : '',
		image: userInfo ? userInfo?.image : user.imageUrl,
	};
	return (
		<main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
			<h1 className='text-3xl font-bold text-white'>Onboarding</h1>
			<p className='mt-3 text-base font-normal text-[#EFEFEF]'>
				Complete your profile now, to use Threds.
			</p>

			<section className='mt-9 bg-[#121417] p-10'>
				<AccountProfile user={userData} btnTitle='Continue' />
			</section>
		</main>
	);
}
