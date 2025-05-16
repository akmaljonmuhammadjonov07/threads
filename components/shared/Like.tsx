'use client';
import { UnlikeLogo } from '@/public/heart/heart';
import { Heart } from 'lucide-react';
import React, { useState } from 'react';

function Like() {
	const [liked, setLiked] = useState(false);
	const [likes, setLikes] = useState(0);

	const handleLike = () => {
		if (liked) {
			setLiked(false);
			setLikes(likes - 1);
		} else {
			setLiked(true);
			setLikes(likes + 1);
		}
	};
	return (
		<div>
			<button onClick={handleLike} className='cursor-pointer'>
				{!liked ? <Heart /> : <UnlikeLogo />}
				<p className='text-xs text-gray-400/95 pt-1 font-semibold'>
					{likes} likes
				</p>
			</button>
		</div>
	);
}

export default Like;
