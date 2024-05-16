/**
 * A component that displays the left navigation bar in the ConnectYou app.
 * Allows the user to edit their profile, upload a profile picture, and sign out.
 * @returns {JSX.Element} The JSX element that displays the left navigation bar.
 */
import { useAuth } from "@/context/authContext";
import { useChatContext } from "@/context/chatContext";
import { useScreenSize } from "@/context/screenSizeContext";
import { auth, db, storage } from "@/firebase/firebase";
import { profileColors } from "@/utils/constants";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { BiCheck, BiEdit } from "react-icons/bi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { IoClose, IoLogOutOutline, IoWalletOutline } from "react-icons/io5";
import { MdAddAPhoto, MdDeleteForever, MdPhotoCamera } from "react-icons/md";
import { toast } from "react-toastify";
import Avatar from "./Avatar";
import Icon from "./Icon";
import ToastMessage from "./ToastMessage";
import AddMoneyPopup from "./popup/AddMoneyPopup";
import UsersPopup from "./popup/UsersPopup";

const LeftNav = () => {
    const [userPopup, setUserPopup] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [nameEdited, setNameEdited] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);

    const { signOut, currentUser, setCurrentUser } = useAuth();
    const { data } = useChatContext();
    const { openLeftNav, isSmallScreen } = useScreenSize();

    const authUser = auth.currentUser;

    const handleUpdateProfile = async (type, value) => {
        let obj = { ...currentUser };
        switch (type) {
            case "color":
                obj.color = value;
                break;
            case "name":
                obj.displayName = value;
                break;
            case "photo":
                obj.photoURL = value;
                break;
            case "photo-remove":
                obj.photoURL = null;
                break;
            default:
                break;
        }

        try {
            toast.promise(
                async () => {
                    const userDocRef = doc(db, "users", currentUser.uid);
                    await updateDoc(userDocRef, obj);
                    setCurrentUser(obj);

                    if ("photo-remove") {
                        await updateProfile(authUser, {
                            photoURL: null,
                        });
                    }

                    if (type === "name") {
                        await updateProfile(authUser, {
                            displayName: value,
                        });
                        setNameEdited(false);
                    }
                },
                {
                    pending: "Updating profile.",
                    success: "Profile updated successfully.",
                    error: "Profile udpate failed.",
                },
                {
                    autoClose: 3000,
                }
            );
        } catch (error) {
            // console.error(error);
        }
    };

    const uploadImageToFirebase = async (file) => {
        try {
            if (file) {
                const storageRef = ref(storage, currentUser.displayName);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => { },
                    (error) => {
                        // console.error(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            async (downloadURL) => {
                                handleUpdateProfile("photo", downloadURL);
                                await updateProfile(authUser, {
                                    photoURL: downloadURL,
                                });
                            }
                        );
                    }
                );
            }
        } catch (error) {
            // console.error(error);
        }
    };

    const onkeyup = (event) => {
        if (event.target.innerText.trim() !== currentUser.displayName) {
            setNameEdited(true);
        } else {
            setNameEdited(false);
        }
    };
    const onkeyDown = (event) => {
        if (event.key === "Enter" && event.keyCode === 13)
            event.preventDefault();
    };

    const editProfileContainer = () => {
        return (
            <div className="flex flex-col items-center relative ">
                <ToastMessage />
                <Icon
                    size="small"
                    className="absolute -top-3 md:top-0 -right-3 md:right-5 hover:bg-c2"
                    icon={<IoClose size={20} />}
                    onClick={() => setEditProfile(false)}
                />
                <div className="relative group cursor-pointer">
                    <Avatar
                        size="xx-large"
                        user={currentUser}
                        onClick={() => setEditProfile(true)}
                    />
                    <div className="w-full h-full rounded-full bg-black/[0.5] absolute top-0 left-0 justify-center items-center hidden group-hover:flex">
                        <label htmlFor="fileUpload">
                            {currentUser.photoURL ? (
                                <MdPhotoCamera size={34} />
                            ) : (
                                <MdAddAPhoto size={34} />
                            )}
                        </label>
                        <input
                            id="fileUpload"
                            type="file"
                            onChange={(e) =>
                                uploadImageToFirebase(e.target.files[0])
                            }
                            style={{ display: "none" }}
                        />
                    </div>

                    {currentUser.photoURL && (
                        <div
                            className="w-6 h-6 rounded-full bg-red-500 flex justify-center items-center absolute right-0 bottom-0"
                            onClick={() => handleUpdateProfile("photo-remove")}
                        >
                            <MdDeleteForever size={14} />
                        </div>
                    )}
                </div>
                <div className="mt-5 flex flex-col items-center">
                    <div className="flex items-center gap-2">
                        {!nameEdited && <BiEdit className="text-c3" />}
                        {nameEdited && (
                            <BsFillCheckCircleFill
                                className="cursor-pointer text-c4"
                                onClick={() =>
                                    handleUpdateProfile(
                                        "name",
                                        document.getElementById(
                                            "displayNameEdit"
                                        ).innerText
                                    )
                                }
                            />
                        )}
                        <div
                            contentEditable
                            className="bg-transparent outline-none border-none text-center"
                            type="text"
                            id="displayNameEdit"
                            onKeyUp={onkeyup}
                            onKeyDown={onkeyDown}
                        >
                            {currentUser.displayName}
                        </div>
                    </div>
                    <span className="text-c3 text-sm">{currentUser.email}</span>
                </div>
                <div className="grid grid-cols-5 gap-4 mt-5">
                    {profileColors.map((color, index) => (
                        <span
                            key={index}
                            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-125"
                            style={{ backgroundColor: color }}
                            onClick={() => handleUpdateProfile("color", color)}
                        >
                            {color === currentUser.color && (
                                <BiCheck size={24} />
                            )}
                        </span>
                    ))}
                </div>
            </div>
        );
    };
    return (
        <div
            className={`${editProfile ? `${isSmallScreen ? " shadow-lg shadow-gray-600 absolute top-[4.1rem] px-5 rounded-r-xl h-[100vh] bg-c1 z-50" : "w-[350px] h-[100vh] md:h-auto z-50 bg-c1"}` : ` ${openLeftNav ? "left-0" : "-left-[80vw]"} z-50 bg-c1 transition-all ease-in-out duration-500 w-[284px] md:w-[80px] h-[100vh] md:h-auto overflow-hidden items-center ${isSmallScreen ? "shadow-lg shadow-gray-600 absolute top-[4.1rem] rounded-r-xl" : ""}`
                } flex flex-col justify-between py-5 shrink-0 transition-all`}
        >
            {openPopup && <AddMoneyPopup setOpenPopup={setOpenPopup} />}

            {editProfile ? (
                editProfileContainer()
            ) : (
                <>
                    {currentUser && (
                        <>
                            <div
                                className="relative group cursor-pointer"
                                onClick={() => setEditProfile(true)}
                            >
                                <Avatar size={`${isSmallScreen ? "xx-large" : "large"}`} user={currentUser} />
                                <div className="w-full h-full rounded-full bg-black/[0.5] absolute top-0 left-0 justify-center items-center hidden group-hover:flex">
                                    <BiEdit size={14} />
                                </div>


                            </div>
                            {isSmallScreen ? (
                                <div className="h-full mt-3 text-center font-light">

                                    <div className="text-c3 font-medium text-sm flex items-center justify-center gap-1 mb-1 italic">
                                        <div className={`h-2 w-2 rounded-full ${currentUser.isOnline ? "bg-green-500" : "bg-yellow-600"}`}></div>
                                        {currentUser.isOnline ? "Online" : "Last seen at 10:30"}
                                    </div>

                                    <p className="text-gray-100">{currentUser.displayName}</p>
                                    <p className="text-gray-100">{currentUser.email}</p>
                                </div>
                            ) : (
                                <div className="h-full mt-5" onClick={() => setOpenPopup(true)}>
                                    <Icon size="large"
                                        icon={<IoWalletOutline size={30} className="text-white" />} />
                                </div>
                            )}
                        </>
                    )}
                </>
            )}

            <div
                className={`flex  gap-5 ${editProfile ? "ml-5" : "flex-col items-center "
                    }`}
            >
                {!isSmallScreen && (
                    <Icon
                        size="x-large"
                        className={`bg-green-500 hover:bg-green-600 `}
                        icon={<FiPlus size={24} />}
                        onClick={() => setUserPopup(!userPopup)}
                    />
                )}
                {isSmallScreen ? (
                    <div className={`${editProfile ? "w-[225px]" : "w-[240px]"} mb-5 flex flex-col justify-center gap-3 text-sm`}>
                        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-10 rounded-md cursor-pointer p-[1.5px] overflow-hidden" onClick={() => setOpenPopup(true)}>
                            <div className="rounded-md h-full bg-c1 text-center flex items-center justify-center">Add Money</div>
                        </div>

                        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-10 rounded-md           cursor-pointer p-[1.5px] overflow-hidden" onClick={signOut}>
                            <div className="rounded-md h-full bg-c1 text-center flex items-center justify-center">Log Out</div>
                        </div>

                    </div>
                ) : (
                    <Icon
                        size="x-large"
                        className="hover:bg-c2"
                        icon={<IoLogOutOutline size={24} />}
                        onClick={signOut}
                    />
                )}
            </div>

            {userPopup && <UsersPopup onHide={() => setUserPopup(false)} />}
        </div>
    );
};

export default LeftNav;
