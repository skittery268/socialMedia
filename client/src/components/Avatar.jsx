// Shared avatar primitive.
// Renders the user's image when available, otherwise a branded gradient
// fallback with the first initial. Keeps avatars consistent everywhere.
//
// Pass a numeric `size` for a fixed avatar, or `fill` to stretch to the
// parent container (used for grid tiles).
const Avatar = ({
    src,
    name = "?",
    size = 40,
    shape = "circle",
    fill = false,
    className = "",
}) => {
    const radius = shape === "square" ? "rounded-2xl" : "rounded-full";
    const initial = name?.[0]?.toUpperCase() || "?";
    const sizeStyle = fill ? undefined : { width: size, height: size };
    const dims = fill ? "h-full w-full" : "";

    return src ? (
        <img
            src={src}
            alt={name}
            style={sizeStyle}
            className={`${radius} ${dims} bg-surface-muted object-cover ${className}`}
            draggable={false}
        />
    ) : (
        <div
            style={{
                ...sizeStyle,
                fontSize: fill ? undefined : Math.round(size * 0.4),
            }}
            className={`${radius} ${dims} flex items-center justify-center bg-linear-to-br from-avatar-from to-avatar-to font-semibold text-white select-none ${
                fill ? "text-3xl" : ""
            } ${className}`}
        >
            {initial}
        </div>
    );
};

export default Avatar;
