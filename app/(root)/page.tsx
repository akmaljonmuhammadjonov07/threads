import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import ThreadCard from '@/components/cards/ThreadCards';
// import Pagination from '@/components/shared/Pagination';

import { fetchPosts } from '@/lib/actions/thread.actions';
import { fetchUser } from '@/lib/actions/user.actions';

async function Home({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	if (!userInfo?.onboarded) redirect('/onboarding');

	const pageNumber = Number(searchParams) || 1;

	const result = await fetchPosts(pageNumber, 30);

	return (
		<>
			<h1 className='text-3xl font-semibold text-white text-left'>Home</h1>

			<section className='mt-9 flex flex-col gap-10'>
				{result.posts.length === 0 ? (
					<p className='no-result'>No threads found</p>
				) : (
					result.posts.map(post => (
						<ThreadCard
							key={post._id.toString()}
							id={post._id.toString()}
							currentUserId={user.id}
							parentId={post.parentId}
							content={post.text}
							author={post.author}
							community={post.community}
							createdAt={post.createdAt}
							comments={post.children}
						/>
					))
				)}
			</section>
		</>
	);
}

export default Home;
