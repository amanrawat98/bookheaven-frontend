import { Link, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear("id");
    localStorage.clear("token");
    localStorage.clear("role");
    navigate("/");
    dispatch(authActions.logOut());
  };

  const handleBookEdit = () => {
    dispatch(authActions.changeAddNewBookFalse());
    console.log("clicked");
  };

  return (
    <>
      <div className="bg-zinc-800 rounded p-4 flex flex-col items-center  h-[100%] justify-between ">
        <div className="flex items-center  flex-col justify-center">
          <img src={data.avatar} alt="avatar" className="h-[17vh]" />
          <p className="mt-3 text-xl text-zinc-100 font-semibold">
            {data.username}
          </p>
          <p className="mt-1 text-normal text-zinc-300">{data.email}</p>
          <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block "></div>
        </div>

        <div className="w-full flex-col items-center justify-center hidden lg:flex mt-2">
          {role === "user" ? (
            <>
              {" "}
              <Link
                to="/profile"
                className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all "
              >
                Favourites{" "}
              </Link>
              <Link
                to="/profile/orderHistory"
                className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all "
              >
                Order History{" "}
              </Link>
              <Link
                to="/profile/settings"
                className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all "
              >
                Setting{" "}
              </Link>{" "}
            </>
          ) : (
            <>
              {" "}
              <Link
                to="/profile"
                className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all "
                onClick={handleBookEdit}

              >
                Add New Book{" "}
              </Link>{" "}
              <Link
                to="/profile/all-user-order-history"
                className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all "
              >
                All Users History{" "}
              </Link>
            </>
          )}
        </div>

        <div
          className="bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center cursor-pointer justify-center gap-2 py-4 px-4"
          onClick={handleLogout}
        >
          Logout <IoMdLogOut />
        </div>
      </div>

      <div className="block md:hidden w-full py-3 bg-zinc-700 px-3 ">
        <div className="w-full flex flex-row items-center justify-between lg:flex mt-2 gap-2">
          {role === "user" ? (
            <>
              {" "}
              <Link
                to="/profile"
                className="text-zinc-100 font-semibold w-full text-base text-center p-2 hover:bg-zinc-900 rounded transition-all "
              >
                Favourites{" "}
              </Link>
              <Link
                to="/profile/orderHistory"
                className="text-zinc-100 font-semibold w-full text-base text-center p-2 hover:bg-zinc-900 rounded transition-all "
              >
                Order History{" "}
              </Link>
              <Link
                to="/profile/settings"
                className="text-zinc-100 font-semibold w-full text-base text-center p-2 hover:bg-zinc-900 rounded transition-all "
              >
                Setting{" "}
              </Link>{" "}
            </>
          ) : (
            <>
              {" "}
              <Link
                to="/profile"
                className="text-zinc-100 font-semibold w-full py-2 text-center p-2 hover:bg-zinc-900 rounded transition-all " 
                onClick={handleBookEdit}
              >
                Add New Book{" "}
              </Link>{" "}
              <Link
                to="/profile/all-user-order-history"
                className="text-zinc-100 font-semibold w-full py-2 text-center p-2 hover:bg-zinc-900 rounded transition-all "
              >
                All Users History{" "}
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
