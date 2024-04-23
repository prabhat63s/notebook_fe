import { getInitials } from "../../utils/helper";

export default function ProfileInfo({ userInfo, onLogout }) {
  return (
    <div className="flex items-center gap-2">
      {userInfo ? (
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-200">
          {getInitials(userInfo.fullName)}
        </div>
      ) : null}
      <div className="">
        {userInfo ? (
          <>
            <p className="text-sm font-medium">{userInfo.fullName}</p>
            <button className="text-sm hover:underline" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
