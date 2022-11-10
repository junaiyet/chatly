import React,{useState} from 'react'
import {AiOutlineHome,AiFillMessage} from 'react-icons/ai'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {FiSettings} from 'react-icons/fi'
import {RiLogoutBoxRLine} from 'react-icons/ri'
import {FaCloudUploadAlt} from 'react-icons/fa'
import { getAuth, signOut,updateProfile } from "firebase/auth";
import {useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { userLoginInfo } from '../../slices/userSlice';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getStorage, ref, uploadString ,getDownloadURL} from "firebase/storage";


function Sidebar() {
    const auth = getAuth();
    const storage = getStorage();
   let navigate = useNavigate()
   let dispatch = useDispatch()
  let data = useSelector(state=> state.userLoginInfo.userInfo)



   const [image, setImage] = useState("");
   const [cropData, setCropData] = useState("#");
   const [cropper, setCropper] = useState();
   const [imguploadmodal, setImgUploadModal] = useState(false);







    let handleLogOut =()=>{
        console.log("logout")
        signOut(auth).then(() => {
            dispatch(userLoginInfo(null))
            localStorage.removeItem("userInfo")
            navigate("/login")
          }).catch((error) => {
            // An error happened.
          });
    }

    let handleImageUpload = ()=>{
      setImgUploadModal(true);
    }
 let handleImgUploadModal = ()=>{
  setImgUploadModal(false);
  setImage("")
  setCropData("")
  setCropper("")
 }


    const handleProfileUpload = (e) => {
      e.preventDefault();
      let files;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }
      console.log(files)
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
      if (typeof cropper !== "undefined") {
        setCropData(cropper.getCroppedCanvas().toDataURL());
        
        const storageRef = ref(storage, auth.currentUser.uid);
        const message4 = cropper.getCroppedCanvas().toDataURL();
        uploadString(storageRef, message4, 'data_url').then((snapshot) => {
          getDownloadURL(storageRef).then((downloadURL) => {
            updateProfile(auth.currentUser, {
               photoURL: downloadURL,
            }).then(()=>{
              setImgUploadModal(false);
              setImage("")
              setCropData("")
              setCropper("")
            });
          });
        });
      }

    };
  return (
    <div className='w-full bg-primary h-screen rounded-2xl p-9'>
     <div className="group w-24 h-24 rounded-full	relative ">
        <img className="mx-auto w-full h-full rounded-full" src={data.photoURL} alt="" />
     <div onClick={handleImageUpload} className=" w-full h-full opacity-0 group-hover:opacity-100 rounded-full bg-[rgba(0,0,0,.4)]   absolute left-0 top-0 flex justify-center items-center">
     <FaCloudUploadAlt className='text-white text-xl'/>
     </div>
     </div>
     <h2 className='font-nunito text-center mt-4 font-bold text-xl  text-white '>{data.displayName}</h2>

     <div className="mt-16 relative z-[1] after:z-[-1]	 after:bg-white after:w-[137%] after:h-[89px] after:content-[''] after:absolute after:top-[-16px] after:left-0 after:rounded-tl-lg after:rounded-bl-lg before:w-[8px] before:h-[185%] before:bg-primary before:absolute before:top-[-16px] before:right-[-35px] before:content-[''] before:rounded-tl-lg before:rounded-bl-lg ">
     <AiOutlineHome className='text-5xl text-[#5F35F5] mx-auto'/>
     </div>
     <div className="mt-24 relative z-[1] after:z-[-1]	 after:bg-none after:w-[137%] after:h-[89px] after:content-[''] after:absolute after:top-[-16px] after:left-0 after:rounded-tl-lg after:rounded-bl-lg before:w-[8px] before:h-[185%] before:bg-none before:absolute before:top-[-16px] before:right-[-35px] before:content-[''] before:rounded-tl-lg before:rounded-bl-lg ">
     <AiFillMessage className='text-5xl text-[#BAD1FF] mx-auto'/>
     </div>
     <div className="mt-24 relative z-[1] after:z-[-1]	 after:bg-none after:w-[137%] after:h-[89px] after:content-[''] after:absolute after:top-[-16px] after:left-0 after:rounded-tl-lg after:rounded-bl-lg before:w-[8px] before:h-[185%] before:bg-none before:absolute before:top-[-16px] before:right-[-35px] before:content-[''] before:rounded-tl-lg before:rounded-bl-lg ">
     <IoMdNotificationsOutline className='text-5xl text-[#BAD1FF] mx-auto'/>
     </div>
     <div className="mt-24 relative z-[1] after:z-[-1]	 after:bg-none after:w-[137%] after:h-[89px] after:content-[''] after:absolute after:top-[-16px] after:left-0 after:rounded-tl-lg after:rounded-bl-lg before:w-[8px] before:h-[185%] before:bg-none before:absolute before:top-[-16px] before:right-[-35px] before:content-[''] before:rounded-tl-lg before:rounded-bl-lg ">
     <FiSettings className='text-5xl text-[#BAD1FF] mx-auto'/>
     </div>
     <div onClick={handleLogOut} className="mt-24 relative z-[1] after:z-[-1]	 after:bg-none after:w-[137%] after:h-[89px] after:content-[''] after:absolute after:top-[-16px] after:left-0 after:rounded-tl-lg after:rounded-bl-lg before:w-[8px] before:h-[185%] before:bg-none before:absolute before:top-[-16px] before:right-[-35px] before:content-[''] before:rounded-tl-lg before:rounded-bl-lg ">
     <RiLogoutBoxRLine className='text-5xl text-[#BAD1FF] mx-auto'/>
     </div>
     {imguploadmodal && 
     <div className="h-screen bg-primary absolute top-0 left-0 w-full z-50 flex justify-center items-center">
     <div className="w-2/4 bg-white rounded-lg p-5">
       <h2 className='font-nunito text-center md:text-left font-bold text-3xl lg:text-4xl text-heading mb-2 md:mb-3.5'>Upload Your Profile</h2>
       {image ?
            <div className="group w-24 h-24 rounded-full	 mx-auto">
            <div className="img-preview w-full h-full overflow-hidden rounded-full"/>
          </div>
        : 
        <div className="group w-24 h-24 rounded-full	 mx-auto">
       <img className="mx-auto w-full h-full rounded-full" src={data.photoURL} alt="" />
      </div>
      

        }
  
       <input onChange={handleProfileUpload} className='mt-8' type="file" />
       <br />
       <br />

       { image ?      <Cropper
       style={{ height: 400, width: "100%" }}
       zoomTo={0.5}
       initialAspectRatio={1}
       preview=".img-preview"
       src={image}
       viewMode={1}
       minCropBoxHeight={10}
       minCropBoxWidth={10}
       background={false}
       responsive={true}
       autoCropArea={1}
       checkOrientation={false} 
       onInitialized={(instance) => {
         setCropper(instance);
       }}
       guides={true}
     />:
                  ""
       }
     
 
       <button onClick={getCropData} className='  bg-primary font-nunito font-semibold text-xl rounded-lg text-white  mt-8	py-2.5 px-5'>Upload</button>             
       <button className='  bg-red-500 font-nunito font-semibold text-xl rounded-lg text-white  mt-8	py-2.5 px-5 ml-8' onClick={handleImgUploadModal}>Cancle</button>             
     </div>
    </div>
    
    
    }
       
    </div>
  )
}

export default Sidebar