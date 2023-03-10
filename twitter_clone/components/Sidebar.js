import Image from 'next/image'
import React from 'react'
import SidebarMenuItem from './SidebarMenuItem'
import { HomeIcon } from '@heroicons/react/solid'
import {
    BellIcon,
    BookmarkIcon,
    ClipboardIcon,
    DotsCircleHorizontalIcon,
    DotsHorizontalIcon,
    HashtagIcon,
    InboxIcon,
    UserIcon,
} from '@heroicons/react/outline'
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Sidebar() {
    const { data: session } = useSession();
    console.log("session", session?.user);
    const router = useRouter();

    function goToProfile() {
        router.push(`/profile`);
        console.log("hfkjy")
    }

    function handleSignOut() {
        router.push("/");
        signOut();
    }

    return (
        <div className='hidden sm:flex flex-col p-2 mx-[2%] xl:items-start fixed h-full  xl:ml-24'>
            {/*Logo*/}
            <div className='hoverEffect p-0 hover:bg-blue-200 xl:px-2 rounded-full'>
                <Image width="50" height="50" src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png" alt="twitter-logo"></Image>
            </div>


            {/*Menu*/}
            <div className="mt-4 mb-2.5 space-y-2 xl:items-start">
                <SidebarMenuItem text="Home" Icon={HomeIcon} active />
                <p onClick={() => { router.push('/') }}><SidebarMenuItem text="Explore" Icon={HashtagIcon} /></p>
                {session && (
                    <>
                        <SidebarMenuItem text="Notifications" Icon={BellIcon} />
                        <SidebarMenuItem text="Messages" Icon={InboxIcon} />
                        <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
                        <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
                        <button onClick={goToProfile}><SidebarMenuItem text="Profile" Icon={UserIcon} /></button>
                        <SidebarMenuItem text="More" Icon={DotsCircleHorizontalIcon} />
                    </>
                )}
            </div>

            {/*Button*/}
            {session ? (
                <>
                    <button onClick={handleSignOut} className="mt-2 bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow hover:brightness-90 text-lg hidden xl:inline">Log out</button>

                    {/*Buttom Profile Section */}
                    <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
                        <img
                            src={session.user.image}
                            alt="user-img"
                            className="h-10 w-10 rounded-full xl:mr-2"
                        />
                        <div className="leading-5 hidden xl:inline">
                            <h4 className="font-bold">{session.user.name}</h4>
                            <p className="text-gray-500">@{session.user.username}</p>
                        </div>
                        <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
                    </div>
                </>
            ) : (
                <button
                    onClick={signIn}
                    className="bg-blue-400 text-white rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
                >
                    Sign in
                </button>
            )}
        </div>
    )
}