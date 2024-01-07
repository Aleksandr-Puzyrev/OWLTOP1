import { ButtonProps } from "./Button.props";
import cn from "classnames";
import style from "./Button.module.css";
import ArrowIcon from "./arrow.svg";
import { motion } from "framer-motion";

export default function Button({
  appearance,
  arrow = "none",
  children,
  className,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <motion.button
    whileHover={{scale: 1.05}}
      className={cn(style.button, className, {
        [style.primary]: appearance == "primary",
        [style.ghost]: appearance == "ghost",
      })}
      {...props}
    >
      {children}
      {arrow != "none" && (
        <span className={cn(style.arrow, { [style.down]: arrow == "down" })}>
          <ArrowIcon />
        </span>
      )}
    </motion.button>
  );
}
