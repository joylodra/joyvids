import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(true);

    const router = useRouter();

    const activeLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center lg:justify-start cursor-pointer font-semibold text-[#F51997] rounded';
    const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center lg:justify-start cursor-pointer font-semibold rounded';

    return (
        <div>
            <div
                className="block lg:hidden m-2 ml-4 mt-3 text-xl"
                onClick={() => setShowSidebar((prev) => !prev)}
            >
                {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
            </div>

            {showSidebar && (
                <div className="w-20 flex flex-col justify-start mb-10 
                border-r-2 p-3 border-gray-100 lg:w-400 lg:border-0">

                    <div className="lg:border-b-2 border-gray-200 lg:pb-4">
                        <Link href="/">
                            <div className={router.asPath === '/' ? activeLink : normalLink}>
                                <span className="font-bold text-2xl lg:text-md">
                                    <AiFillHome />
                                </span>
                                <span className="text-xl hidden lg:block">For You</span>
                            </div>
                        </Link>
                    </div>

                    <Discover />
                    <SuggestedAccounts />
                    <Footer />
                </div>
            )}
        </div>
    )
}

export default Sidebar;