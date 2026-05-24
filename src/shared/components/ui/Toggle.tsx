"use client";

type ToggleProps = {
    checked: boolean;
    onChange: () => void;
};

export default function Toggle({
                                   checked,
                                   onChange,
                               }: ToggleProps) {
    return (
        <button
            type="button"
            onClick={onChange}
            className={`
        ui-toggle
        ${checked ? "active" : ""}
      `}
        >
            <span />
        </button>
    );
}