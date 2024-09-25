import { Description, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function CommonTextField({
  title,
  value,
  onChange,
  name,
  isPassword,
  errors,
  type,
  touched,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full max-w-md px-1">
      <Field>
        <Label className="text-sm/6 font-medium text-white text-transform-capitalize">
          {title}
        </Label>
        {/* <Description className="text-sm/6 text-white/50">Use your real name so people will recognize you.</Description> */}
        <div className="relative display-flex" style={{ display: "flex" }}>
          <Input
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            type={showPassword ? type  ? type : "text" : isPassword && "password"}
            onChange={(e) => {
              onChange(e);
              // setShowPassword(false);
            }}
            value={value}
            //   onClick={() => setShowPassword(!showPassword)}
            style={{ paddingRight: "2.5rem" }}
            touched={touched}
            errors={errors}
            name={name}
            
            //   value={value}
            //   onChange={onChange}
            //   type='password'
          />
          {isPassword && (
            <button
              type="button"
              style={{ position: "absolute", right: "0.5rem", top: "0.5rem" }}
              className="text-white/50 hover:text-white transition-colors position-absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => isPassword && setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
              ) : (
                <EyeIcon className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
        {touched && errors && (
          <p className="text-sm/6 text-red-500">{errors}</p>
        )}
      </Field>
    </div>
  );
}
