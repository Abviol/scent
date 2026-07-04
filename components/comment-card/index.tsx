/* lib */
import {CommentCardType} from "@/lib/types";
/* icons */
import Rating from "../ui/rating";
import Avatar from "../ui/avatar";

export default function CommentCard({
	userAvatarUrl,
	userName,
	dateCommentLeft,
	rating,
	text,
}: CommentCardType) {
	return (
		<div className="w-full flex flex-col gap-y-5 py-[46px] px-8 bg-white border-2 border-gray-200 rounded-lg">
			<div className="flex gap-x-4 justify-between items-center">
				<div className="flex gap-x-5 items-center">
					<Avatar
						src={userAvatarUrl}
						alt={userName}
						size="md"
					></Avatar>
					<h5 className="my-text-h5">{userName}</h5>
					<span className="text-gray-500">{dateCommentLeft}</span>
				</div>
				<Rating rating={rating}></Rating>
			</div>

			<p className="wrap-break-word">{text}</p>
		</div>
	);
}
