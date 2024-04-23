import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export default function PasswordInput({ value, onChange, placeholder, autoComplete }) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center bg-slate-100  border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
      <input
        type={isShowPassword ? "text" : "password"}
        name="password"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "••••••••"}
        className="w-full outline-none bg-transparent"
        autoComplete={autoComplete}
      />
      {isShowPassword ? (
        <FaRegEye
          size={18}
          onClick={() => toggleShowPassword()}
          className="text-neutral-600"
        />
      ) : (
        <FaRegEyeSlash
          size={18}
          onClick={() => toggleShowPassword()}
          className="text-neutral-600"
        />
      )}
    </div>
  );
}
