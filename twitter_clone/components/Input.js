import React from 'react'
import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef } from "react";
import { addDoc, collection, doc, serverTimestamp ,  updateDoc} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { uploadString, ref, getDownloadURL } from 'firebase/storage';
import { XIcon } from '@heroicons/react/solid';

export default function Input() {
    const { data: session } = useSession();
    const [input, setInput] = useState("");
    const [selectedPic, setSelectedPic] = useState(null);
    const [loading, setLoading] = useState(false);
    const uploadPicture = useRef(null);
    //console.log("session", session)

    const sendPost = async () => {
        if (loading)
            return;
        setLoading(true);
        const docRef = await addDoc(collection(db, "posts"), {
            id: session.user.uid,
            text: input,
            userImg: session.user.image,
            timestamp: serverTimestamp(),
            name: session.user.name,
            username: session.user.username,
        });
        //ref is a method from the storage 
        const imageRef = ref(storage, `posts/${docRef.id}/image`)
        if (selectedPic) {
            await uploadString(imageRef, selectedPic, "data_url")
                .then(async () => {
                    const downloadURL = await getDownloadURL(imageRef);
                    await updateDoc(doc(db, "posts", docRef.id), {
                        image: downloadURL,
                    });
                })

        }
        setInput("");
        setSelectedPic(null)
        setLoading(false);

    }


    const addImageToPost = (e) => {
        const reader = new FileReader(); //built in method from JS
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setSelectedPic(readerEvent.target.result)
        }

    }
    return (
        <>
            {session && (
                <div className="flex  border-b border-gray-200 p-3 space-x-3">
                    <img
                        onClick={signOut}
                        src={session.user.image}
                        alt="user-img"
                        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
                    />
                    <div className="w-full divide-y divide-gray-200">
                        <div className="">
                            <textarea
                                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                                rows="2"
                                placeholder="What's happening?"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            ></textarea>
                        </div>
                        {selectedPic && (
                            <div className='flex justify-center relative'>
                                <XIcon onClick={() => setSelectedPic(null)} className="h-7 text-black  place-self-end absolute bg-sky-100 cursor-pointer shadow-md shadow-white rounded-full" />
                                <img src={selectedPic} alt="picture" className={`${loading && "animate-pulse"}`} />
                            </div>
                        )}
                        <div className="flex items-center justify-between pt-2.5">
                            {!loading && <>
                                <div className="flex" >
                                    <div onClick={() => uploadPicture.current.click()}>
                                        <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                                        <input type="file" hidden ref={uploadPicture} onChange={addImageToPost} />
                                    </div>
                                    <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                                </div>
                                <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                                    onClick={sendPost}>
                                    Tweet
                                </button>
                            </>}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
