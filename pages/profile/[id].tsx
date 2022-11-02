import React, { useState, useEffect } from 'react';
import { GoVerified } from 'react-icons/go';
import Image from 'next/image';
import axios from 'axios';
import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../types';
import Link from 'next/link';
import { BASE_URL } from '../../utils';

interface IProps {
    data: {
        user: IUser,
        userVideos: Video[],
        userLikedVideos: Video[],
    }
};

const Profile = ({ data }: IProps) => {
    const [showUserVideos, setShowUserVideos] = useState(true);
    const [videosList, setVideosList] = useState<Video[]>([]);

    const { user, userVideos, userLikedVideos } = data;

    const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
    const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';

    useEffect(() => {
        if (showUserVideos) {
            setVideosList(userVideos);
        } else {
            setVideosList(userLikedVideos);
        }
    }, [showUserVideos, userLikedVideos, userVideos]);

    return (
        <div className="w-full">
            <div className="flex-gap-6 md:gap-10 mb-4 bg-white w-full">
                <div className="flex items-center gap-3 p-2 font-semibold rounded">
                    <div className="w-16 h-16 md:w-20 md:h-20">
                        <Image
                            src={user.image}
                            width={120}
                            height={120}
                            className="rounded-full"
                            alt="profile picture"
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                        <p className="flex gap-2 items-center text-md md:text-2xl tracking-wider font-bold text-primary lowercase">
                            {user.userName.replaceAll(' ', '')} <GoVerified className="text-blue-400" />
                        </p>
                        <p className="capitalize md:text-xl text-gray-400 text-xs">
                            {user.userName}
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex gap-5 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
                    <p
                        className={`text-xl font-semibold mt-2 cursor-pointer ${videos}`}
                        onClick={() => setShowUserVideos(true)}
                    >
                        Video
                    </p>

                    <p
                        className={`text-xl font-semibold mt-2 cursor-pointer ${liked}`}
                        onClick={() => setShowUserVideos(false)}
                    >
                        Liked
                    </p>
                </div>

                <div className="flex gap-6 flex-wrap md:justify-start">
                    {videosList.length > 0
                        ? (videosList.map((post: Video, idx: number) => (
                            <VideoCard post={post} key={idx} />
                        )))
                        : (<NoResults text={`No ${showUserVideos ? '' : 'liked'} videos yet.`} />)
                    }
                </div>
            </div>
        </div >
    )
};

export const getServerSideProps = async (
    { params: { id } }: { params: { id: string } }
) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

    return {
        props: { data: res.data }
    }
};

export default Profile;