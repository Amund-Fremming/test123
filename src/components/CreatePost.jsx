import React, { useState } from "react";
import Navbar from "./Navbar";
import { styles } from "../util/styles";
import { addDoc , collection} from "firebase/firestore";
import { db } from "../firebase";
import { v4 } from "uuid";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AuthContextProvider } from '../util/AuthContext';
import { useNavigate } from "react-router-dom";

const CreatePost = () => {

    const [header, setHeader] = useState("");
    const [intro, setIntro] = useState("");
    const [dato, setDato] = useState("");
    const [blogpost, setBlogpost] = useState("");
    const [imageUpload, setImageUpload] = useState(null);

    const postsCollectionRef = collection(db, "posts");
    const navigate = useNavigate();

    /**
     * Denne laster opp ett bilde/fil til firebase storage.
     * Bruker Promise slik at vi må vente på funksjonen til å sende tilbake resolve eller reject
     * slik at vi kan kalle på add doc for å laste opp tekst til databasen sammen med bilde urlen vi får her.
     */
    const uploadImage = () => {
        return new Promise((resolve, reject) => {
            if(imageUpload == null) return;
            const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
            uploadBytes(imageRef, imageUpload).then(snapshot => {
                getDownloadURL(snapshot.ref).then(url => {
                    resolve(url);
                })
            }).catch(error => {
                console.error("Failed to upload image:", error);
                reject(error);
            });
        });
    }    

    /**
     * bruker addDoc fra firebase for å lagre data til databasen.
     */
    const createPost = async () => {
        const imageURL = await uploadImage();

        await addDoc(postsCollectionRef, {
            header: header,
            intro: intro,
            blogpost: blogpost,
            dato: dato,
            url: imageURL
        });

        navigate("/aktivitet");
    }

    return(
        <>
            <AuthContextProvider>
                <Navbar bg={"[#E09A32]"} />
            </AuthContextProvider>

            <div className="justify-center bg-[#E2DFD2] items-center flex h-screen w-full">
                <div className="shadow-md rounded-md bg-gray-200 w-[600px] h-[600px] p-6 flex flex-col">
                    <h1 className={`p-2 ${styles.heroHeadText}`}>
                        Create
                    </h1>
                    <input onChange={e => setHeader(e.target.value)} type="text" placeholder="Header" className="my-1 p-2 text-sm rounded-md border-gray-200 border-2" />
                    <input onChange={e => setIntro(e.target.value)} type="text" placeholder="Blogpost intro" className="my-1 p-2 text-sm rounded-md border-gray-200 border-2" />
                    <input onChange={e => setDato(e.target.value)} type="date" placeholder="dato (dd-mm-åååå)" className="my-1 p-2 text-sm rounded-md border-gray-200 border-2" />
                    <textarea onChange={e => setBlogpost(e.target.value)} rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border-gray-200 border-2" placeholder="Blog post ..."></textarea>
                    <input type="file" className="my-2 text-sm" onChange={e => setImageUpload(e.target.files[0])} />
                    <button type="button" class="w-20 justify-center flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={() => createPost()}>Submit</button>
                </div>
            </div>
        </>
    );
};

export default CreatePost;