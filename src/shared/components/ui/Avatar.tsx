type AvatarProps = {
    name: string;
    className?: string;
};

export default function Avatar({
                                   name,
                                   className = "",
                               }: AvatarProps) {
    const firstLetter =
        name.charAt(0).toUpperCase();

    return (
        <div
            className={`
        ui-avatar
        ${className}
      `}
        >
            {firstLetter}
        </div>
    );
}