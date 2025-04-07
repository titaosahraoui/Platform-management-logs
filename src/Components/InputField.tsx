import React, { useState } from 'react';
// import { ReactComponent as PasswordOn } from '../assets/passwordOn.svg';
import PasswordOn from '../assets/passwordOn.svg';
// import { ReactComponent as PasswordOff } from '../assets/passwordOff.svg';
import PasswordOff from '../assets/passwordOff.svg';


interface InputProps {
  fieldName: string;
  minDate?: string;
  readOnly?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldValue?: any;
  label: string;
  disable?: boolean;
  type: "text" | "number" | "password" | "email" | "checkbox" | "color" | "range" | "date" | "enum";
  placeholder: string;
  width?: string;
  height?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
  Icon?: React.ReactNode;
  borderStyle?: string;
  labelStyles?: string;
  options?: string[];
}

const InputField = ({
  fieldName,
  minDate,
  readOnly,
  fieldValue,
  label,
  disable,
  type,
  placeholder,
  formik,
  width,
  height,
  Icon,
  borderStyle,
  labelStyles,
  options,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative group">
      {type !== "checkbox" ? (
        <>
          <label
            className={` text-primaryBlack font-bold capitalize ${disable && "text-gray-400"}  flex justify-start ${labelStyles ? labelStyles : "text-[12px] lg:text-sm"}`}
            htmlFor={fieldName}
          >
            {label}
          </label>
          {type === "enum" ? (
            // Dropdown enum 
            <select
              className={` font-normal rounded-2xl text-base px-8 my-1 relative border-neutral-100 ${borderStyle ? `${borderStyle}` : "border-transparent"} w-${width || "full"} h-${height || "12"}  duration-200 bg-neutral-100 disabled:bg-gray-200  outline-none disabled:bg-transparent border ${formik.touched[fieldName] && formik.errors[fieldName] && 'border-primaryRed'}`}
              id={fieldName}
              name={fieldName}
              disabled={disable}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={disable ? "" : formik.values[fieldName] || ""}
            >
              <option defaultValue={undefined} >
                {"status"}
              </option>
              {options &&
                options.map((opt, index) => (
                  <option key={index} value={opt}>
                    {opt}
                  </option>
                ))}
            </select>
          ) : (
            // Other input types
            <input
              className={` font-normal capitalize rounded-2xl text-base py-4 px-8 my-1 relative border-neutral-100 ${borderStyle ? `${borderStyle}` : "border-transparent"} w-${width || "full"} h-${height || "12"}  duration-200 bg-neutral-100 disabled:bg-gray-200  outline-none disabled:bg-transparent border ${formik.touched[fieldName] && formik.errors[fieldName] && 'border-primaryRed'}`}
              type={type === "password" ? showPassword ? "text" : "password" : type}
              placeholder={`${disable ? "" : placeholder}`}
              id={fieldName}
              name={fieldName}
              disabled={disable}
              onBlur={formik.handleBlur}
              min={minDate}
              readOnly={readOnly}
              onChange={formik.handleChange}
              value={disable ? "" : !isNaN(fieldValue) ? fieldValue : formik.values[fieldName] ?? ""}
            />
          )}
          {Icon}
          {type === "password" && (
            // Password toggle 
            showPassword ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              // <PasswordOn onClick={(e: any) => { e.preventDefault(); setShowPassword(false); }} className={`end-4 absolute text-gray-600 w-5 h-5 bottom-5 cursor-pointer`} />
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <img src={PasswordOn} alt="" onClick={(e: any) => { e.preventDefault(); setShowPassword(false); }} className={`end-4 absolute text-gray-600 w-5 h-5 bottom-5 cursor-pointer`} />
            ) : (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              // <PasswordOff onClick={(e: any) => { e.preventDefault(); setShowPassword(true); }} className={` end-4 absolute text-gray-600 w-5 h-5 bottom-5 cursor-pointer`} />
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <img src={PasswordOff} alt="" onClick={(e: any) => { e.preventDefault(); setShowPassword(true); }} className={` end-4 absolute text-gray-600 w-5 h-5 bottom-5 cursor-pointer`} />
            )
          )}
          {formik.touched[fieldName] && formik.errors[fieldName] && (
            // Error message
            <p className={`absolute text-primaryRed -bottom-4 start-0 text-xs md:text-sm flex`}>
              {formik.errors[fieldName]}
            </p>
          )}
        </>
      ) : (
        // Checkbox input
        <div className="flex items-center gap-2 -translate-y text-xs md:text-base">
          <input
            name={fieldName}
            type="checkbox"
            checked={formik.values[fieldName]}
            onChange={formik.handleChange}
            className="w-6 h-6 mt-3"
          />
          <p className="translate-y-[7px] md:translate-y-[5px]">{label}</p>
          {formik.touched[fieldName] && formik.errors[fieldName] && (
            <p className={`absolute text-primaryRed bottom-[-22px] start-0 text-sm flex `}>
              {formik.errors[fieldName]}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default InputField;
