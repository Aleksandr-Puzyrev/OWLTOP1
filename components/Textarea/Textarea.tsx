import { TextareaProps } from "./Textarea.props";
import cn from "classnames";
import styles from "./Textarea.module.css";
import { ForwardedRef, forwardRef } from "react";

const Textarea = forwardRef(({ className, error, ...props}: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
  return (
    <div className={cn(styles.textareaWrapper, className)}>
      <textarea className={cn(styles.textarea, {
        [styles.error]: error
      })} ref={ref} {...props}/>
      {error && <span role="alert" className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});

export default Textarea;