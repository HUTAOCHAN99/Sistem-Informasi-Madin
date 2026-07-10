export default function IslamicPattern({
  className = "",
  color = "#F7941D",
  opacity = 0.08,
  id = "islamic-star-pattern",
}: {
  className?: string;
  color?: string;
  opacity?: number;
  id?: string;
}) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width="56" height="56" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth="1" opacity={opacity}>
            <rect x="14" y="14" width="28" height="28" />
            <rect x="14" y="14" width="28" height="28" transform="rotate(45 28 28)" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
