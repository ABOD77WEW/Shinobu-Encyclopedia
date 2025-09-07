import React from 'react';
import { EntitySymbol } from '../types';

const emojiMap: Record<number, string> = {
    [EntitySymbol.NarutoUzumaki]: '🍥',
    [EntitySymbol.SasukeUchiha]: '⚡️',
    [EntitySymbol.SakuraHaruno]: '🌸',
    [EntitySymbol.KakashiHatake]: '📖',
    [EntitySymbol.ItachiUchiha]: '🐦',
    [EntitySymbol.Gaara]: '🏜️',
    [EntitySymbol.Jiraiya]: '🐸',
    [EntitySymbol.MinatoNamikaze]: '💨',
    [EntitySymbol.Tsunade]: '🐌',
    [EntitySymbol.Orochimaru]: '🐍',
    [EntitySymbol.HashiramaSenju]: '🌳',
    [EntitySymbol.TobiramaSenju]: '💧',
    [EntitySymbol.HiruzenSarutobi]: '🐒',
    [EntitySymbol.ShikamaruNara]: '🧠',
    [EntitySymbol.ChojiAkimichi]: '🦋',
    [EntitySymbol.InoYamanaka]: '💐',
    [EntitySymbol.NejiHyuga]: '🕊️',
    [EntitySymbol.RockLee]: '💪',
    [EntitySymbol.MightGuy]: '🐢',
    [EntitySymbol.MadaraUchiha]: '🔥',
    [EntitySymbol.PainNagato]: '🌀',
    [EntitySymbol.KibaInuzuka]: '🐕',
    [EntitySymbol.ShinoAburame]: '🐞',
    [EntitySymbol.AsumaSarutobi]: '🚬',
    [EntitySymbol.KurenaiYuhi]: '🌹',
    [EntitySymbol.MightDuy]: '👊',
    [EntitySymbol.Konan]: '🕊️',
    [EntitySymbol.Deidara]: '💥',
    // Arcs
    [EntitySymbol.PrologueLandOfWaves]: '🌊',
    [EntitySymbol.ChuninExams]: '📜',
    [EntitySymbol.SasukeRecoveryMission]: '🏃‍♂️',
    [EntitySymbol.KazekageRescueMission]: '⌛',
    [EntitySymbol.PainAssault]: '💥',
    [EntitySymbol.FiveKageSummit]: '👑',
    [EntitySymbol.FourthShinobiWar]: '⚔️',
};


const villageColorMap: Record<string, string> = {
    "كونوها": "bg-green-700",
    "سونا": "bg-yellow-800",
    "كيريغاكوري": "bg-blue-700",
    "إيواكاغوري": "bg-orange-800",
    "كوموغاكوري": "bg-gray-600",
    "أوتوغاكوري": "bg-purple-800",
    "أميكاغوري": "bg-indigo-700",
    "تاكيغاكوري": "bg-teal-700",
    "يوجاكوري": "bg-pink-800",
    "افتراضي": "bg-gray-800"
};

export const EntityAvatar: React.FC<{ symbol: EntitySymbol, village?: string, size?: string, title?: string, isArc?: boolean }> = ({ symbol, village, size = 'w-16 h-16', title, isArc = false }) => {
    const emoji = emojiMap[symbol] || '❓';
    const bgColor = isArc ? 'bg-scroll-gold/20' : (village ? villageColorMap[village] : villageColorMap["افتراضي"]);
    const borderColor = isArc ? 'border-scroll-gold' : 'border-seal-red';

    const getFontSizeClass = (size: string) => {
        if (size.includes('12')) return 'text-2xl';
        if (size.includes('16')) return 'text-3xl';
        if (size.includes('20')) return 'text-5xl';
        if (size.includes('32')) return 'text-7xl';
        if (size.includes('64')) return 'text-[5rem]'; // approx 9xl
        return 'text-4xl';
    };

    return (
        <div title={title} className={`${size} rounded-full flex items-center justify-center border-4 ${borderColor} ${bgColor} shadow-lg`}>
            <span className={`${getFontSizeClass(size)} leading-none`} role="img" aria-label={title || 'icon'}>{emoji}</span>
        </div>
    );
};