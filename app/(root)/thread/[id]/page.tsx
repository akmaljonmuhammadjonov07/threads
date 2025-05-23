import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

import Comment from '@/components/forms/Comment';
import ThreadCard from '@/components/cards/ThreadCards';

import { fetchUser } from '@/lib/actions/user.actions';
import { fetchThreadById } from '@/lib/actions/thread.actions';

export const revalidate = 0;

type ThreadChild = {
	_id: string;
	parentId: string;
	text: string;
	author: {
		// author obyektining maydonlari, misol uchun
		id: string;
		name: string;
		image: string;
	};
	community: {
		// community obyektining maydonlari
		id: string;
		name: string;
		image: string;
	};
	createdAt: string;
	children: ThreadChild[];
};

async function Page({ params }: { params: Promise<{ id: string }> }) {
	const resolvedParams = await params;
	if (!resolvedParams.id) return null;

	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	if (!userInfo?.onboarded) redirect('/onboarding');

	const thread = await fetchThreadById(resolvedParams.id);

	return (
		<section className='relative'>
			<div>
				<ThreadCard
					id={thread._id}
					currentUserId={user.id}
					parentId={thread.parentId}
					content={thread.text}
					author={thread.author}
					community={thread.community}
					createdAt={thread.createdAt}
					comments={thread.children}
				/>
			</div>

			<div className='mt-7'>
				<Comment
					threadId={resolvedParams.id}
					currentUserImg={user.imageUrl}
					currentUserId={JSON.stringify(userInfo._id)}
				/>
			</div>

			<div className='mt-10'>
				{thread.children.map((childItem: ThreadChild) => (
					<ThreadCard
						key={childItem._id}
						id={childItem._id}
						currentUserId={user.id}
						parentId={childItem.parentId}
						content={childItem.text}
						author={childItem.author}
						community={childItem.community}
						createdAt={childItem.createdAt}
						comments={childItem.children}
						isComment
					/>
				))}
			</div>
		</section>
	);
}

export default Page;
