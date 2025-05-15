import clsx from "clsx";
import css from "./Button.module.css";

interface ButtonProps {
    variant?: "primary" | "secondary";
    text: string;
}

const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    console.log(event.target);
}


export default function Button({ variant, text }: ButtonProps) {
    return (
        <button className={clsx(css.button, variant && css[variant])} onClick={handleClick}>{text}</button>
    );
}