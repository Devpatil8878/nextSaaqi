import { useState, useEffect } from 'react';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';

const UserListCard = async ({ userData, isDarkMode }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  // const userinfo = useSelector(state => state.rootReducer.user);

  const [userinfo,setuserinfo] = useState();

  useEffect(() => {

    const find = async () => {
      const res = await axios.get(`/api/finduserbyid?id=${userData._id}`)
      setuserinfo(res.data.user)
      console.log("USER INFORMATION:", res.data.user)

    }

    find()
    
  
    
  }, [])
  




  useEffect(() => {
    const checkIsFollowing = async () => {
      try {

        const newUserinfo = await axios.get(`api/findUserByEmail?email=${userinfo.email}`)
        const newVal = await axios.get(`api/findUserByEmail?email=${userData.email}`)

        // Make an API call to check if the logged-in user is following this user
        const response = await axios.get(`/api/checkuserfollowing?currentUserId=${newUserinfo.data.user._id}&followingId=${newVal.data.user._id}`);

        if(response.status == 200)
            setIsFollowing(true);
        else if(response.status == 201)
            setIsFollowing(false);
      } catch (error) {
        console.error('Error checking following status:', error);
      }
    };

    checkIsFollowing(); 
  }, [userData.id]); 

  
  const handleFollowClick = async () => {
    try {
        
        const newUserinfo = await axios.get(`api/findUserByEmail?email=${userinfo.email}`)
        const newVal = await axios.get(`api/findUserByEmail?email=${userData.email}`)

      if (!isFollowing) {
        const resFollow = await axios.put('/api/followUser', {
            currentUserId: newUserinfo.data.user._id,
            followingId: newVal.data.user._id,
          });
          console.log("followed: ", newVal.data.user._id)
          setIsFollowing(true);
    } else {   
        const resUnfollow = await axios.delete('/api/followUser', {
            data: {
            currentUserId: newUserinfo.data.user._id,
            followingId: newVal.data.user._id,
            }
        });
        console.log("unfollowed: ", newVal.data.user._id)
        setIsFollowing(false);
     }
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  return (
    <div className={`${isDarkMode ? "dark-mode-component-bg" : "light-mode-component-bg"} hover:drop-shadow-[0_20px_20px_rgba(58,20,80,0.65)]  friends-animation users w-[95%] h-24 rounded `}>
      <div className="flex">
        <div className="profile">
          <button className='w-12 h-12 flex justify-center items-center rounded-full m-5 ml-8 mr-3 min-w-12'>
            <img className="object-cover overflow-hidden w-full h-full rounded-full" src={userData.profilePicture} alt={`Profile of ${userData.username}`} />    
          </button>
        </div>
        <div className="flex-col">
          <h1 className='text-semibold mt-3'>{userData.fullname}</h1>
          <h4 className='text-xs'>{userData.bio}</h4>
          <button onClick={handleFollowClick} className='w-16 h-6 mt-2 rounded text-[10px] global-theme-color text-white'>
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserListCard;
