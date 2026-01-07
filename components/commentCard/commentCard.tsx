import Image from "next/image";
import Rating from "../ui/rating";

export interface CommentCardProps {
	user_avatar_url: string;
	user_name: string;
	date_comment_left: string;
	rating: number;
	comment_text: string;
}

export default function CommentCard({ user_avatar_url, user_name, date_comment_left, rating, comment_text}: CommentCardProps) {
	return (
		<div className="w-full flex flex-col gap-y-5 py-[46px] px-8 bg-white border-2 border-gray-200 rounded-lg">
			<div className="flex gap-x-4 justify-between items-center">
				<div className="flex gap-x-5 items-center">
					{/* <Avatar></Avatar> */}
					<Image
						src={user_avatar_url}
						alt={user_name}
                  width={40}
                  height={40}
						className="relative size-12 rounded-full overflow-hidden shrink-0"
						loading="eager"
						priority={false}
					></Image>
               <h5 className="my-text-h5">{user_name}</h5>
            <span className="text-gray-500">{date_comment_left}</span>
				</div>
            <Rating rating={rating}></Rating>
			</div>

         <p className="wrap-break-word">{comment_text}</p>
		</div>
	);
}
