import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";

type PasswordInputProps = Omit<ComponentPropsWithoutRef<typeof Input>, "type">;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ className, ...props }, ref) {
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative">
        <Input {...props} ref={ref} type={visible ? "text" : "password"} className={`pr-14 ${className ?? ""}`} />
        <button
          type="button"
          className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-r-md text-primary hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
          aria-label={visible ? "Hide password" : "Show password"}
          aria-controls={props.id}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
        </button>
      </div>
    );
  },
);
