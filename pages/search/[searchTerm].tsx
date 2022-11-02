import React, { useState } from 'react';
import { GoVerified } from 'react-icons/go';
import Image from 'next/image';
import axios from 'axios';
import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../types';
import Link from 'next/link';
import { BASE_URL } from '../../utils';
import { useRouter } from 'next/router';
import useAuthStore from '../../store/authStore';

const Search = ({ videos }: { videos: Video[] }) => {
    const [showAccount, setShowAccount] = useState(true);

    const router = useRouter();
    const { searchTerm }: any = router.query;
    const { allUsers } = useAuthStore();

    const isAccount = showAccount ? 'border-b-2 border-black' : 'text-gray-400';
    const isVideo = !showAccount ? 'border-b-2 border-black' : 'text-gray-400';

    const searchedAccounts = allUsers.filter((user: IUser) =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="w-full">
            <div className="flex gap-5 mb-4 mt-10 border-b-2 border-gray-200 bg-white w-full">
                <p
                    className={`text-xl font-semibold mt-2 cursor-pointer ${isAccount}`}
                    onClick={() => setShowAccount(true)}
                >
                    Accounts
                </p>

                <p
                    className={`text-xl font-semibold mt-2 cursor-pointer ${isVideo}`}
                    onClick={() => setShowAccount(false)}
                >
                    Videos
                </p>
            </div>

            {showAccount
                ? (<div>
                    {searchedAccounts.length > 0
                        ? (searchedAccounts.map((user: IUser, idx: number) => (
                            <Link href={`/profile/${user._id}`}>
                                <div className="flex gap-3 p-2 cursor-pointer font-semibold 
                                rounded border-b-2 border-gray-200">
                                    <div>
                                        <Image
                                            src={user.image}
                                            width={50}
                                            height={50}
                                            className="rounded-full"
                                            alt="profile picture"
                                        />
                                    </div>

                                    <div>
                                        <p className="flex gap-2 items-center text-md font-bold text-primary lowercase">
                                            {user.userName.replaceAll(' ', ' ')} <GoVerified className="text-blue-400" />
                                        </p>
                                        <p className="capitalize text-gray-400 text-xs">
                                            {user.userName}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        )))
                        : (<NoResults text={`No video results for ${searchTerm}`} />)
                    }
                </div>)
                : (
                    <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
                        {videos.length ? (
                            videos.map((video: Video, idx: number) => (
                                <VideoCard post={video} key={idx} />
                            ))
                        ) : (
                            <NoResults text={`No video results for ${searchTerm}`} />
                        )}
                    </div>
                )
            }
        </div>
    )
}

export const getServerSideProps = async (
    { params: { searchTerm } }: { params: { searchTerm: string } }
) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

    return {
        props: { videos: res.data }
    }
};

export default Search;