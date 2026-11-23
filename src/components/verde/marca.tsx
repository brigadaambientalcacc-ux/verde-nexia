export function Marca({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="20"
        r="18"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="1"
      />
      <path
        d="M6.5 25.5c6.8-1.4 10.6-6.2 13.5-14.5 2.9 8.3 6.7 13.1 13.5 14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10.5 31.5c5.3-1.3 8-4.5 9.5-9.5 1.5 5 4.2 8.2 9.5 9.5"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="21" r="2.1" fill="currentColor" />
    </svg>
  );
}

export function TopoBackdrop({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 720"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1" opacity="0.55">
        <path d="M-40 512c142-36 236-118 300-214 54-82 118-134 214-146 108-13 178 44 236 122 62 84 138 142 250 168 96 22 184 20 280 6" />
        <path d="M-40 556c158-32 262-118 330-218 58-85 126-138 226-150 112-13 186 48 244 130 60 84 140 142 250 166 96 21 186 20 280 6" />
        <path d="M-40 600c172-28 286-120 356-224 60-88 132-142 234-154 116-13 192 50 252 134 60 84 142 142 254 164 96 19 184 18 274 4" />
        <path d="M-40 644c186-24 310-122 382-230 62-92 138-146 242-158 120-13 198 52 260 138 62 84 146 142 258 162 96 17 182 16 268 2" />
        <path d="M-40 688c200-20 334-124 408-236 64-96 144-150 250-162 124-13 204 54 268 142 64 82 150 140 262 160 96 15 180 14 262 0" />
        <path d="M-40 468c126-40 210-118 270-210 50-78 110-128 202-140 104-13 170 40 226 114 60 80 134 138 244 164 96 22 186 22 282 8" />
      </g>
      <g stroke="currentColor" strokeWidth="1" opacity="0.18">
        <circle cx="960" cy="180" r="60" />
        <circle cx="960" cy="180" r="112" />
        <circle cx="960" cy="180" r="170" />
        <circle cx="960" cy="180" r="240" />
      </g>
    </svg>
  );
}

export function GradePontos({ className }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <defs>
        <pattern
          id="pontos-verde"
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.4" cy="1.4" r="1.4" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pontos-verde)" />
    </svg>
  );
}
