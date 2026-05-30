import "./Input.css";
import type { ChangeEvent } from "react";

type InputProps = {
    label: string;
    type?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
    label,
    type = "text",
    value,
    onChange,
}: InputProps) {
    return (
        <div className="input-container">
            <label>{label}</label>

            <div className="input-wrapper">
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}