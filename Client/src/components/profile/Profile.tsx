import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";


const Profile = () => {
    const user =  useSelector(selectCurrentUser)
  console.log(user)
  return (
    <div className="flex items-center gap-2 justify-end">
      <span className="bg-gray-300 w-10 h-10 rounded-full"></span>
      <span className="hidden md:block">hello,{user.username}</span>
    </div>
  );
};

export default Profile;
