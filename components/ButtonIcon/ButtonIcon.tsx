import { ButtonIconProps, icons } from "./ButtonIcon.props";
import cn from "classnames";
import style from "./ButtonIcon.module.css";

export default function ButtonIcon({
  appearance,
  icon,
  className,
  ...props
}: ButtonIconProps): JSX.Element {
  const IconComp = icons[icon];

  return (
    <button
      className={cn(style.button, className, {
        [style.primary]: appearance == "primary",
        [style.white]: appearance == "white",
      })}
      {...props}
    >
      <IconComp />
    </button>
  );
}
