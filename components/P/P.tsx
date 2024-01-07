import { PProps } from "./P.props";
import cn from "classnames";
import styles from "./P.module.css";

export default function P({ sizeM = "16px", children, className, ...props}: PProps): JSX.Element {
  return (
    <p
      className={cn(styles.size, className, {
        [styles.size14]: sizeM == "14px",
        [styles.size16]: sizeM == "16px",
        [styles.size18]: sizeM == "18px",
      })}
      {...props}
    >
      {children}
    </p>
  );
}
