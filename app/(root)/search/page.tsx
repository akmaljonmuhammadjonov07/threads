import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

import UserCard from '@/components/cards/UserCard';
import Searchbar from '@/components/shared/Searchbar';
// import Pagination from "@/components/shared/Pagination";

import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import Pagination from '@/components/shared/Pagination';

async function Page({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	const query = await searchParams; // <-- Promise'ni shu yerda await qilamiz

	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	if (!userInfo?.onboarded) redirect('/onboarding');

	const result = await fetchUsers({
		userId: user.id,
		searchString: query.q,
		pageNumber: query.page ? +query.page : 1,
		pageSize: 25,
	});

	return (
		<section>
			<h1 className='head-text mb-10'>Search</h1>

			<Searchbar routeType='search' />

			<div className='mt-14 flex flex-col gap-9'>
				{result.users.length === 0 ? (
					<p className='no-result'>No Result</p>
				) : (
					<>
						{result.users.map(person => (
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
				)}
			</div>

			<Pagination
				path='search'
				pageNumber={query.page ? +query.page : 1}
				isNext={result.isNext}
			/>
		</section>
	);
}

export default Page;
