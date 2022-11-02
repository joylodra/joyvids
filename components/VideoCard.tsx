import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { Video } from '../types';

interface IProps {
    post: Video
};

const VideoCard = ({ post }: IProps) => {
    const [isHover, setIsHover] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);

    const onVideoPress = () => {
        if (playing) {
            videoRef?.current?.pause();
            setPlaying(false);
        } else {
            videoRef?.current?.play();
            setPlaying(true);
        }
    }

    useEffect(() => {
        if (videoRef?.current) {
            videoRef.current.muted = isVideoMuted;
        }
    }, [isVideoMuted]);

    return (
        <div className="flex flex-col border-b-2 border-gray-200 pb-6">
            <div>
                <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
                    <div className="mmd:w-18 md:h-18 w-14 h-14">
                        <Link href={`/profile/${post.postedBy._id}`}>
                            <>
                                <Image
                                    width={62}
                                    height={62}
                                    className="rounded-full"
                                    src={post.postedBy.image}
                                    alt="profile shoot"
                                />
                            </>
                        </Link>
                    </div>

                    <div>
                        <Link href={`/profile/${post.postedBy._id}`}>
                            <div className="flex flex-col gap-2">
                                <p className="flex gap-2 md:text-md font-bold text-primary items-center">{post.postedBy.userName}{" "}
                                    <GoVerified className="text-blue-400 text-md" />
                                </p>

                                <p className="font-medium text-xs text-gray-500 hidden md:block">{post.postedBy.userName}</p>


                                <p className="text-md text-gray-600 font-normal">
                                    {post.caption}
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 relative mt-3">
                <div
                    onMouseEnter={() => { setIsHover(true) }}
                    onMouseLeave={() => { setIsHover(false) }}
                    className="rounded-3xl">
                    <Link href={`/detail/${post._id}`}>
                        <video
                            ref={videoRef}
                            loop
                            className="lg:w-[600px] md:w-[400px] md:h-[400px] lg:h-[600px] w-[250px] rounded-2xl cursor-pointer bg-black"
                            src={post.video.asset.url}
                        >

                        </video>
                    </Link>

                    {isHover && (
                        <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 
                        lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3">
                            {playing ? (
                                <button onClick={onVideoPress}>
                                    <BsFillPauseFill className="text-white text-2xl lg:text-4xl" />
                                </button>
                            ) : (
                                <button onClick={onVideoPress}>
                                    <BsFillPlayFill className="text-white text-2xl lg:text-4xl" />
                                </button>
                            )}

                            {isVideoMuted ? (
                                <button onClick={() => setIsVideoMuted(false)}>
                                    <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
                                </button>
                            ) : (
                                <button onClick={() => setIsVideoMuted(true)}>
                                    <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VideoCard;