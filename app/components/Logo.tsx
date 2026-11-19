// The ಅ mark (11b): the Kannada letter A as a spiral, cut from a burgundy seal.
export default function Logo({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="14" y="14" width="172" height="172" rx="22" fill="var(--burgundy)" />
      <g transform="translate(100 104) scale(0.78) translate(-100 -114)">
        <path
          d="M60,86 C60,96 76,96 76,82 C76,68 66,58 54,58 C40,58 30,70 30,86 C30,140 60,170 100,170 C142,170 170,140 170,104 C170,76 152,58 130,58 C114,58 104,68 104,82 L104,112 L150,112"
          fill="none"
          stroke="var(--background)"
          strokeWidth="17"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <circle cx="161" cy="39" r="7" fill="var(--apricot)" />
      <circle cx="100" cy="170" r="4.6" fill="var(--apricot)" />
      <circle cx="86" cy="166" r="3.2" fill="var(--apricot)" />
      <circle cx="114" cy="166" r="3.2" fill="var(--apricot)" />
    </svg>
  );
}
