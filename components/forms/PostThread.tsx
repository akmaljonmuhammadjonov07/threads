'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useOrganization } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { ThreadValidation } from '@/lib/validations/thread';
import { createThread } from '@/lib/actions/thread.actions';

interface Props {
	userId: string;
}

function PostThread({ userId }: Props) {
	const router = useRouter();
	const pathname = usePathname();

	const { organization } = useOrganization();

	const form = useForm<z.infer<typeof ThreadValidation>>({
		resolver: zodResolver(ThreadValidation),
		defaultValues: {
			thread: '',
			accountId: userId,
		},
	});

	const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
		await createThread({
			text: values.thread,
			author: userId,
			communityId: organization ? organization.id : null,
			path: pathname,
		});

		router.push('/');
	};

	return (
		<Form {...form}>
			<form
				className='mt-10 flex flex-col justify-start gap-10'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name='thread'
					render={({ field }) => (
						<FormItem className='flex w-full flex-col gap-3'>
							<FormLabel className='text-base font-semibold text-[#EFEFEF]'>
								Content
							</FormLabel>
							<FormControl className='focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border border-[#1F1F22] bg-[#101012] text-white'>
								<Textarea rows={15} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' className='bg-[#877EFF]'>
					Post Thread
				</Button>
			</form>
		</Form>
	);
}

export default PostThread;
