import { Description, Field, Input, Label, Select } from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import {
  ChevronDownIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { expirenceArray } from "@/app/utilities/requiredData";

export default function CommonDropDown({
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
        <div
          className="relative display-flex"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Select
            className={clsx(
              " block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
              // Make the text of each option black on Windows
              "*:text-black"
            )}
          >
            {expirenceArray.map((item) => (
              <option
                key={item}
                value={item.value}
                // selected={item === value}
                onChange={(e) => onChange(e.target.value)}
              >
                {item.label}
              </option>
            ))}
          </Select>
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
            aria-hidden="true"
          />
        </div>
        {errors && (
          <p className="text-sm/6 text-red-500">{errors}</p>
        )}
      </Field>
    </div>
  );
}
