import Loader from "@/components/Loader";
import { useAuth } from "@/context/authContext";
import { profileColors } from "@/utils/constants";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithPopup,
    updateProfile
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { IoLogoGoogle } from "react-icons/io";
import { auth, db, storage } from "../firebase/firebase";
import { toast } from "react-toastify";
import ToastMessage from "@/components/ToastMessage";

const gProvider = new GoogleAuthProvider();

const Register = () => {
    const router = useRouter();
    const { currentUser, isLoading } = useAuth();

    const pushToHome = useCallback(() => {
        router.push("/");
    }, [router]);

    useEffect(() => {
        if (!isLoading && currentUser) {
            pushToHome();
        }
    }, [currentUser, isLoading, pushToHome]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const confirmPassword = e.target[3].value;
        const file = e.target[4]?.files?.[0];
        const colorIndex = Math.floor(Math.random() * profileColors.length);
        
        const validEmailDomains = ["@gmail.com", "@yahoo.com", "@outlook.com", "@icloud.com"];
        const isValidEmail = validEmailDomains.some((domain) => email.endsWith(domain));

        if (!isValidEmail) {
            toast.error("Invalid email domain");
            return;
        }

        if (password.length < 6) {
            toast.error("Password should be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Password and Confirm Password doesn't match");
            return;
        }

        /**
         * Registers a new user with email/password and additional profile data.
         *
         * Creates user with Firebase auth.
         * Uploads profile photo if provided.
         * Writes user profile data to Firestore.
         * Navigates to home page on success.
         */
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            if (file) {
                const storageRef = ref(storage, displayName);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        switch (snapshot.state) {
                            case "paused":
                                break;
                            case "running":
                                break;
                        }
                    },
                    (error) => {
                        console.error(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            async (downloadURL) => {
                                await updateProfile(user, {
                                    displayName,
                                    photoURL: downloadURL,
                                });

                                await setDoc(doc(db, "users", user.uid), {
                                    uid: user.uid,
                                    displayName,
                                    email,
                                    photoURL: downloadURL,
                                    color: profileColors[colorIndex],
                                    credits: 0,
                                });

                                await setDoc(
                                    doc(db, "userChats", user.uid),
                                    {}
                                );

                                router.push("/");
                            }
                        );
                    }
                );
            } else {
                await updateProfile(user, {
                    displayName,
                });
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    displayName,
                    email,
                    color: profileColors[colorIndex],
                    credits: 100,
                });
                await setDoc(doc(db, "userChats", user.uid), {});
                router.push("/");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, gProvider);
        } catch (error) {
            console.error("An error occured", error);
        }
    };

    return isLoading || (!isLoading && !!currentUser) ? (
        <Loader />
    ) : (
        <div className="min-h-screen flex justify-center items-center bg-c1">
            <ToastMessage />

            <div className="flex items-center flex-col">
                <div className="text-center">
                    <div className="text-4xl font-bold">Create New Account</div>
                    <div className="mt-3 text-c3">
                        Connect and chat with anyone, anywhere
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2 w-full mt-10 mb-5">
                    <div
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-14 rounded-md cursor-pointer p-[1px]"
                        onClick={signInWithGoogle}
                    >
                        <div className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md">
                            <IoLogoGoogle size={24} />
                            <span>Create with Google</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-5 h-[1px] bg-c3"></span>
                    <span className="text-c3 font-semibold">OR</span>
                    <span className="w-5 h-[1px] bg-c3"></span>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-3 w-full max-w-md mt-5 px-5"
                >
                    <input
                        type="text"
                        placeholder="Display Name"
                        className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
                        autoComplete="off"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
                        autoComplete="off"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
                        autoComplete="off"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
                        autoComplete="off"
                        required
                    />
                    <button className="mt-4 w-full h-14 rounded-xl outline-none text-base font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition duration-300 transform hover:scale-105">
                        Sign Up
                    </button>
                </form>
                <div className="flex justify-center gap-1 text-c3 mt-5">
                    <span>Already have an account?</span>
                    <Link
                        href="/login"
                        className="font-semibold text-white underline underline-offset-2 cursor-pointer"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
