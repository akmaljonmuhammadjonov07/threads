import ProfileHeader from '@/components/shared/ProfileHeader';
import ThreadsTab from '@/components/shared/ThreadsTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { profileTabs } from '@/constants';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';

async function Page({ params }: { params: Promise<{ id: string }> }) {
	const resolvedParams = await params;
	if (!resolvedParams.id) return null;

	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	if (!userInfo?.onboarded) redirect('/onboarding');

	return (
		<section>
			<ProfileHeader
				accountId={userInfo.id}
				authUserId={user.id}
				name={userInfo.name}
				username={userInfo.username}
				imgUrl={userInfo.image}
				bio={userInfo.bio}
			/>

			<div className='mt-9'>
				<Tabs defaultValue='threads' className='w-full'>
					<TabsList className='tab'>
						{profileTabs.map(tab => (
							<TabsTrigger key={tab.label} value={tab.value} className='tab'>
								<Image
									src={tab.icon}
									alt={tab.label}
									width={24}
									height={24}
									className='object-contain'
								/>
								<p className='max-sm:hidden'>{tab.label}</p>

								{tab.label === 'Threads' && (
									<p className='ml-1 rounded-sm bg-[#5C5C7B] px-2 py-1 text-[10px] font-medium text-[#EFEFEF]'>
										{userInfo.threads.length}
									</p>
								)}
							</TabsTrigger>
						))}
					</TabsList>
					{profileTabs.map(tab => (
						<TabsContent
							key={`content-${tab.label}`}
							value={tab.value}
							className='w-full text-white'
						>
							<ThreadsTab
								currentUserId={user.id}
								accountId={userInfo.id}
								accountType='User'
							/>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
}

export default Page;
