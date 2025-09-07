import React from 'react';

// Generic UI Icons
export const VSCompareIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor">
        <text
            x="50"
            y="65"
            fontFamily="Cairo, sans-serif"
            fontSize="80"
            fontWeight="900"
            textAnchor="middle"
            dominantBaseline="middle"
        >
            VS
        </text>
    </svg>
);
export const SettingsIcon: React.FC<{className?: string}> = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>;


// Generic Dojutsu Icons
export const SharinganIcon: React.FC<{className?: string; style?: React.CSSProperties}> = ({className, style}) => <svg className={className} style={style} viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#B91C1C"/><circle cx="50" cy="50" r="15" fill="black"/><circle cx="50" cy="20" r="8" fill="black"/><g transform="rotate(120 50 50)"><circle cx="50" cy="20" r="8" fill="black"/></g><g transform="rotate(240 50 50)"><circle cx="50" cy="20" r="8" fill="black"/></g></svg>;
export const ProSharinganIcon: React.FC<{className?: string; style?: React.CSSProperties}> = ({className, style}) => (
    <svg className={className} style={style} viewBox="0 0 100 100">
        <defs>
            <radialGradient id="pro-red-gradient-realistic" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#fca5a5" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="80%" stopColor="#b91c1c" />
                <stop offset="100%" stopColor="#450a0a" />
            </radialGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#pro-red-gradient-realistic)" />
        <circle cx="50" cy="50" r="20" fill="black" />
        
        {/* Itachi Mangekyou Blades */}
        <g filter="url(#glow)">
            <g transform="rotate(0 50 50)">
                <path d="M50 22.5 C 65 22.5 70 42.5 50 50 C 30 42.5 35 22.5 50 22.5 Z" fill="black" />
            </g>
            <g transform="rotate(120 50 50)">
                <path d="M50 22.5 C 65 22.5 70 42.5 50 50 C 30 42.5 35 22.5 50 22.5 Z" fill="black" />
            </g>
            <g transform="rotate(240 50 50)">
                <path d="M50 22.5 C 65 22.5 70 42.5 50 50 C 30 42.5 35 22.5 50 22.5 Z" fill="black" />
            </g>
        </g>

        {/* Glint */}
        <path d="M 60 25 A 30 30 0 0 0 40 35 A 15 15 0 0 1 60 25" fill="white" opacity="0.2"/>
    </svg>
);
export const RinneganIcon: React.FC<{className?: string; style?: React.CSSProperties}> = ({className, style}) => <svg className={className} style={style} viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#d1c4e9" opacity="0.8"/><circle cx="50" cy="50" r="38" stroke="#4a148c" strokeWidth="4" fill="none"/><circle cx="50" cy="50" r="30" stroke="#4a148c" strokeWidth="4" fill="none"/><circle cx="50" cy="50" r="22" stroke="#4a148c" strokeWidth="4" fill="none"/><circle cx="50" cy="50" r="14" stroke="#4a148c" strokeWidth="4" fill="none"/></svg>;
export const ByakuganIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 100 100">
        <defs>
            <radialGradient id="byakugan-iris" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f1e6ff" />
                <stop offset="100%" stopColor="#d1c4e9" />
            </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="#f1f5f9" />
        <circle cx="50" cy="50" r="40" fill="url(#byakugan-iris)" />
        <circle cx="50" cy="50" r="12" fill="#e0e7ff" opacity="0.8" />
        {/* Veins */}
        <g stroke="#b39ddb" strokeWidth="2" opacity="0.7">
            <path d="M 50 10 C 60 20, 65 35, 68 42" fill="none" />
            <path d="M 70 18 C 65 25, 62 35, 60 41" fill="none" />
            <path d="M 90 50 C 80 55, 65 58, 58 60" fill="none" transform="rotate(45 50 50)" />
            <path d="M 15 25 C 25 30, 38 35, 45 38" fill="none" transform="rotate(-30 50 50)" />
            <path d="M 50 90 C 40 80, 35 65, 32 58" fill="none" />
            <path d="M 30 82 C 35 75, 38 65, 40 59" fill="none" />
             <path d="M 10 50 C 20 45, 35 42, 42 40" fill="none" transform="rotate(120 50 50)" />
        </g>
    </svg>
);
export const MangekyouSharinganIcon: React.FC<{className?: string}> = ({className}) => <svg className={className} viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#B91C1C"/><circle cx="50" cy="50" r="15" fill="black"/><path d="M50 5 A 45 45 0 0 1 95 50 L 50 50 Z" fill="black" transform="rotate(0 50 50)"/><path d="M50 5 A 45 45 0 0 1 95 50 L 50 50 Z" fill="black" transform="rotate(120 50 50)"/><path d="M50 5 A 45 45 0 0 1 95 50 L 50 50 Z" fill="black" transform="rotate(240 50 50)"/></svg>;
export const TenseiganIcon: React.FC<{className?: string}> = ({className}) => <svg className={className} viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#80deea"/><circle cx="50" cy="50" r="15" fill="#ffffff"/><path d="M50,5 L50,95 M5,50 L95,50 M18.35,18.35 L81.65,81.65 M18.35,81.65 L81.65,18.35" stroke="white" strokeWidth="4"/></svg>;
export const KetsuryuganIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#580b13"/>
        <circle cx="50" cy="50" r="45" fill="#8c111c"/>
        <path d="M 50 15 a 35 35 0 1 1 0 70 a 35 35 0 1 1 0 -70" fill="#dc2626"/>
        <circle cx="50" cy="50" r="15" fill="#f87171"/>
        <path d="M 50 25 L 75 50 L 50 75 L 25 50 Z" fill="#000"/>
    </svg>
);


// Organization & Clan Symbols (Shared)
export const UchihaFanIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" fill="#E5E7EB" stroke="none"/>
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2" fill="#B91C1C"/>
        <path d="M12 2v20" stroke="#1F2937" strokeLinecap="round"/>
    </svg>
);
export const AkatsukiCloudIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 200 120" fill="none">
      <path d="M165.7,43.3c10.8-11,9-29-3.5-39.3c-12.5-10.3-30.2-7.3-40.5,3.5c-8.7,9-13.4,21.7-12.5,33.7 c0.4,9.4-2.1,18.7-6.9,26.7c-9.5,12.7-22.9,19.3-36,19.3c-14.7,0-26.7-12-26.7-26.7c0-7.3,3-14,8-18.7 C56.4,36,62,32,68,32c4.4,0,8.7,1.2,12.4,3.5c3.6-17.2-5.8-35-22.1-42.7c-19.6-9.1-43,0.9-52.1,20.5 c-5.7,19.7,3.3,40.9,22.1,51.6c11,6.2,24.2,7.1,36,3.3c-2.7,7-3.4,14.6-1.4,22.2c4.2,16.4,19,27.3,35.3,27.3 c20,0,36.7-16.3,36.7-36.7C136.6,69.4,149.8,56.5,165.7,43.3z"
      fill="#DC2626" stroke="#FFFFFF" strokeWidth="12" strokeLinejoin="round" />
    </svg>
);
export const AlliedShinobiForcesIcon: React.FC<{className?: string}> = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1 14l-3-3 1.41-1.41L11 13.17l4.59-4.59L17 10l-6 6z"/></svg>;
export const RootAnbuIcon: React.FC<{className?: string}> = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5V13H8v-2h2.5V8.5H13V11h2.5v2H13v3.5h-2.5z"/></svg>;
export const TwelveGuardianNinjaIcon: React.FC<{className?: string}> = ({className}) => <svg className={className} viewBox="0 0 100 100"><text x="50" y="70" fontFamily="serif" fontSize="60" textAnchor="middle" fill="currentColor">護</text></svg>;
export const KonohaPoliceIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l-1.45 2.91l-3.2.47l2.32 2.25l-.55 3.19L12 10l2.88 1.82l-.55-3.19l2.32-2.25l-3.2-.47z" />
            <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
            <path d="M3 7l9 5l9-5" />
        </g>
    </svg>
);
export const SamuraiIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L4.5 5L6 22h12l1.5-17L12 2zm1 4h-2v11h2V6zm4.82 1.55L16 9.24V8l1.82-1.45zM7.18 6.55L9 8v1.24l-1.82-1.69z" />
    </svg>
);
export const SevenSwordsmenIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H18l-2.5 5" />
        <path d="M9.5 2H6l2.5 5" />
        <path d="M12 2v20" />
        <path d="M3 11h18" />
        <path d="M4 17h16" />
    </svg>
);
export const SoundFourIcon: React.FC<{className?: string}> = ({className}) => <svg className={className} viewBox="0 0 100 100"><text x="50" y="70" fontFamily="serif" fontSize="60" textAnchor="middle" fill="currentColor">音</text></svg>;
export const KonohaAnbuIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 60 80" fill="none">
        <path d="M30 0 C10 0, 0 20, 0 40 C0 70, 15 80, 30 80 C45 80, 60 70, 60 40 C60 20, 50 0, 30 0 Z" fill="#E5E7EB"/>
        <path d="M15 30 C20 25, 40 25, 45 30" stroke="#B91C1C" strokeWidth="3" strokeLinecap="round"/>
        <path d="M18 45 C15 55, 25 60, 30 60 C35 60, 45 55, 42 45" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="40" r="4" fill="#1F2937"/>
        <circle cx="40" cy="40" r="4" fill="#1F2937"/>
    </svg>
);