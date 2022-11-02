import React, { useState, useEffect } from 'react';
import { MdFavorite } from 'react-icons/md';
import useAuthStore from '../store/authStore';

interface IProps {
    handleLike: () => void;
    handleDislike: () => void;
    likes: any[];
};

const LikeButton = ({ handleLike, handleDislike, likes }: IProps) => {
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const { userProfile }: any = useAuthStore();
    const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

    useEffect(() => {
        if (filterLikes?.length > 0) {
            setAlreadyLiked(true);
        } else {
            setAlreadyLiked(false);
        }
    }, [filterLikes, likes])

    return (
        <div className="mt-4 flex space-x-2 justify-center 
            items-center cursor-pointer">
            <p className="text-md font-semibold">{likes?.length || 0}</p>

            {alreadyLiked
                ? (
                    <div
                        className="bg-primary rounded-full p-2 md:p-4 text-[#F51998]"
                        onClick={handleDislike}
                    >
                        <MdFavorite className="text-lg md:text-2xl" />
                    </div>
                )
                : (
                    <div
                        className="bg-primary rounded-full p-2 md:p-4"
                        onClick={handleLike}
                    >
                        <MdFavorite className="text-lg md:text-2xl" />
                    </div>
                )}
        </div>
    )
}

export default LikeButton;