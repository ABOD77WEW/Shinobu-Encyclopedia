// FIX: Import `useEffect` from react to resolve usage in ProRoute component.
import React, { useState, createContext, useContext, useMemo, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTheme, Theme } from './hooks/useTheme.tsx';
import { useFavorites } from './hooks/useFavorites.tsx';
import { db } from './data/db.ts';
import { Character, Arc, Ability, Organization, EyeTechnique, FavoriteItem, ChakraNature, Scroll, EntitySymbol } from './types.ts';
import { SunIcon, MoonIcon, SearchIcon, StarIcon } from './components/Icons.tsx';
import PageWrapper from './components/PageWrapper.tsx';
import { EntityAvatar } from './components/EntityIcons.tsx';
// FIX: Import `ByakuganIcon` which was missing.
import { AkatsukiCloudIcon, SharinganIcon, UchihaFanIcon, ByakuganIcon, ProSharinganIcon, VSCompareIcon, SettingsIcon } from './components/ThematicIcons.tsx';
import { ShinobiProProvider, useShinobiPro } from './hooks/useShinobiPro.tsx';
import ShinobiProPage from './components/ShinobiProPage.tsx';
import ShinobiProFeaturesPage from './components/ShinobiProFeaturesPage.tsx';


// --- App Context for data ---
interface AppContextType {
    favorites: string[];
    toggleFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

const AppContext = createContext<AppContextType | null>(null);
const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useAppContext must be used within a FavoritesProvider");
    return context;
};

// --- SVG Logo Component ---
const SharinganLogo: React.FC = () => (
    <div className="group flex items-center gap-3 cursor-pointer" aria-label="موسوعة الشينوبو">
        <svg width="44" height="44" viewBox="0 0 100 100" className="animate-spin-slow">
            <defs>
                <radialGradient id="red-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style={{stopColor: '#DC2626', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#991B1B', stopOpacity: 1}} />
                </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#red-gradient)" stroke="#121826" strokeWidth="4" />
            <circle cx="50" cy="50" r="18" fill="black" stroke="#333" strokeWidth="1" />
            
            <g transform="rotate(-15 50 50)">
                 <path d="M 50,50 C 65,30 80,30 85,20" stroke="black" strokeWidth="7" fill="none" strokeLinecap="round"/>
            </g>
             <g transform="rotate(105 50 50)">
                 <path d="M 50,50 C 65,30 80,30 85,20" stroke="black" strokeWidth="7" fill="none" strokeLinecap="round"/>
            </g>
             <g transform="rotate(225 50 50)">
                 <path d="M 50,50 C 65,30 80,30 85,20" stroke="black" strokeWidth="7" fill="none" strokeLinecap="round"/>
            </g>
        </svg>
        <span className="text-2xl font-black text-text-light group-hover:text-seal-red-light transition-colors hidden md:block">موسوعة الشينوبو</span>
    </div>
);

// --- Navbar Component ---
const Navbar: React.FC = () => {
    const { isPro } = useShinobiPro();

    return (
        <header className="bg-ink-dark/90 backdrop-blur-sm sticky top-0 z-40 border-b-4 border-seal-red shadow-navbar-glow [.akatsuki-theme_&]:border-akatsuki-red">
        <nav className="container mx-auto flex justify-between items-center p-3">
            <div className="flex items-center gap-6">
            <Link to="/"><SharinganLogo /></Link>
            <ul className="hidden md:flex gap-6 items-center">
                {['الشخصيات', 'الأركات', 'القدرات', 'العصابات', 'العيون'].map(item => {
                    const path = `/${item === 'الشخصيات' ? 'characters' : item === 'الأركات' ? 'arcs' : item === 'القدرات' ? 'abilities' : item === 'العصابات' ? 'organizations' : 'eyes'}`;
                    return (
                        <li key={item}>
                            <NavLink to={path} className={({isActive}) => `text-lg font-bold pb-1 border-b-2 transition-all duration-300 ${isActive ? 'text-seal-red-light border-seal-red-light [text-shadow:0_0_8px_theme(colors.seal-red.light)] [.akatsuki-theme_&]:text-akatsuki-red [.akatsuki-theme_&]:border-akatsuki-red' : 'text-text-light border-transparent hover:text-seal-red-light hover:border-seal-red-light/50 [.akatsuki-theme_&]:hover:text-akatsuki-red [.akatsuki-theme_&]:hover:border-akatsuki-red/50'}`}>
                                {item}
                            </NavLink>
                        </li>
                    )
                })}
                {isPro && (
                    <>
                        <li><NavLink to="/scrolls" className={({isActive}) => `text-lg font-bold pb-1 border-b-2 transition-all duration-300 ${isActive ? 'text-scroll-gold border-scroll-gold' : 'text-text-light border-transparent hover:text-scroll-gold'}`}>مخطوطات</NavLink></li>
                        <li><NavLink to="/compare" className={({isActive}) => `text-lg font-bold pb-1 border-b-2 transition-all duration-300 ${isActive ? 'text-blue-400 border-blue-400' : 'text-text-light border-transparent hover:text-blue-400'}`}>مقارنة</NavLink></li>
                    </>
                )}
            </ul>
            </div>
            <div className="flex items-center gap-4">
                 <NavLink to="/shinobi-pro" className="group flex items-center gap-3 text-lg font-bold p-2 rounded-lg transition-all duration-300 hover:bg-red-900/50">
                    <ProSharinganIcon className={`w-11 h-11 transition-all duration-300 ${isPro ? 'animate-chakra-pulse' : 'group-hover:animate-pro-glow'}`} />
                    <span className="text-text-light font-black hidden sm:block">شينوبي برو</span>
                </NavLink>
            </div>
        </nav>
        </header>
    );
};

// Floating controls
const FloatingControls: React.FC<{ theme: Theme, setTheme: (theme: Theme) => void }> = ({ theme, setTheme }) => {
    const { isPro } = useShinobiPro();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleThemeToggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    
    return (
        <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-3">
            {isSettingsOpen && (
                 <div className="flex flex-col gap-3 p-3 rounded-xl bg-ink-dark/80 backdrop-blur-sm border-2 border-text-light/20 mb-1">
                     <Link to="/favorites" aria-label="المفضلة" className="p-3 rounded-full bg-ink-dark/80 hover:bg-scroll-gold/80 transition-colors">
                        <StarIcon className="w-7 h-7 text-scroll-gold" isFilled={true} />
                    </Link>
                    <button onClick={handleThemeToggle} aria-label={`تفعيل الوضع ${theme === 'dark' ? 'النهاري' : 'الليلي'}`} className="p-3 rounded-full bg-ink-dark/80 hover:bg-scroll-gold/80 transition-colors">
                        {theme === 'dark' || theme === 'akatsuki' ? <SunIcon className="w-7 h-7 text-yellow-400" /> : <MoonIcon className="w-7 h-7 text-blue-400" />}
                    </button>
                 </div>
            )}
             <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} aria-label="الإعدادات" className="p-3 rounded-full bg-ink-dark/80 backdrop-blur-sm hover:bg-scroll-gold/80 transition-colors border-2 border-text-light/20">
                <SettingsIcon className="w-8 h-8 text-white" />
            </button>
            {isPro && (
                <button onClick={() => setTheme(theme === 'akatsuki' ? 'dark' : 'akatsuki')} aria-label="تفعيل مظهر الأكاتسوكي" className={`p-3 rounded-full bg-ink-dark/80 backdrop-blur-sm transition-colors border-2 ${theme === 'akatsuki' ? 'border-akatsuki-red' : 'border-text-light/20 hover:border-akatsuki-red'}`}>
                    <ProSharinganIcon className="w-8 h-8 animate-pro-glow" />
                </button>
            )}
        </div>
    );
};


// --- Card Components ---
const CardWrapper: React.FC<{ children: React.ReactNode, to: string }> = ({ children, to }) => (
    <Link to={to} className="block bg-parchment/80 dark:bg-ink-dark/80 rounded-lg shadow-lg border-2 border-text-dark/20 dark:border-text-light/20 transform hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden hover:shadow-glow-red-dark [.akatsuki-theme_&]:bg-black/50 [.akatsuki-theme_&]:border-akatsuki-red/40 [.akatsuki-theme_&]:hover:shadow-glow-red">
        {children}
    </Link>
);

const CharacterCard: React.FC<{ char: Character }> = ({ char }) => {
    const { toggleFavorite, isFavorite } = useAppContext();
    const { isPro } = useShinobiPro();
    const navigate = useNavigate();

    return (
        <div className="bg-parchment/80 dark:bg-text-dark/80 rounded-lg shadow-lg border-2 border-text-dark/20 dark:border-text-light/20 transform hover:-translate-y-2 transition-all duration-300 group relative hover:shadow-glow-red-dark [.akatsuki-theme_&]:bg-black/50 [.akatsuki-theme_&]:border-akatsuki-red/40 [.akatsuki-theme_&]:hover:shadow-glow-red">
            <Link to={`/character/${char.id}`} className="block p-4">
                <div className="flex items-center gap-4">
                    <EntityAvatar symbol={char.symbol} village={char.village} size="w-20 h-20" />
                    <div>
                        <h3 className="text-xl font-bold text-text-dark dark:text-text-light">{char.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{char.village}</p>
                        <span className="text-xs bg-scroll-gold text-white px-2 py-0.5 rounded-full mt-1 inline-block [.akatsuki-theme_&]:bg-akatsuki-red">{char.rank}</span>
                    </div>
                </div>
            </Link>
            <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">
                <button onClick={(e) => { e.preventDefault(); toggleFavorite(char.id); }} aria-label={`إضافة ${char.name} للمفضلة`} className="p-2 rounded-full bg-black/20 hover:bg-seal-red transition-colors">
                    <StarIcon className={`w-5 h-5 ${isFavorite(char.id) ? 'text-yellow-400' : 'text-gray-400'}`} isFilled={isFavorite(char.id)} />
                </button>
                {isPro && (
                     <button onClick={(e) => { e.preventDefault(); navigate(`/compare/${char.id}`); }} aria-label={`مقارنة ${char.name}`} className="p-2 rounded-full bg-black/20 hover:bg-blue-600 transition-colors">
                        <VSCompareIcon className="w-5 h-5 text-white" />
                    </button>
                )}
            </div>
        </div>
    )
};

const GenericCard: React.FC<{ item: FavoriteItem }> = ({ item }) => {
    if ('village' in item) return <CharacterCard char={item as Character} />;

    let name = 'name' in item ? item.name : ('title' in item ? item.title : '');
    let path = '';
    let icon: React.ReactNode = null;
    let details: React.ReactNode = null;

    if ('episodes' in item) { 
        path = `/arc/${item.id}`; 
        icon = <EntityAvatar symbol={item.symbol} village="كونوها" size="w-16 h-16" isArc={true} />;
        details = <p className="text-sm">الحلقات: {item.episodes.from}-{item.episodes.to}</p>;
    }
    if ('type' in item) { path = `/ability/${item.id}`; icon = <span className="text-3xl">✨</span>; details = <p className="font-bold text-blue-400">{item.type}</p>; }
    if ('leader' in item) { path = `/organization/${item.id}`; icon = <item.symbol className="w-8 h-8 text-gray-400"/>; details = <p className="text-sm">القائد: {item.leader}</p>; }
    if ('classification' in item) { path = `/eye/${item.id}`; icon = <item.symbol className="w-8 h-8 text-purple-400"/>; details = <p className="text-sm">{item.classification}</p>; }
    if ('category' in item) { path = `/scroll/${item.id}`; icon = <span className="text-3xl">📜</span>; details = <p className="text-sm">{item.category}</p>; }
    
    return (
      <CardWrapper to={path}>
        <div className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center">{icon}</div>
            <div>
              <h3 className="text-xl font-bold text-text-dark dark:text-text-light">{name}</h3>
              {details}
            </div>
        </div>
      </CardWrapper>
    );
}

// --- Pages ---
const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if(query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    }
    
    return (
        <div className="animate-page-transition">
             <div className="relative h-[calc(60vh)] flex items-center justify-center text-center p-4">
                <div className="z-10 bg-parchment/80 dark:bg-ink-dark/80 p-10 rounded-xl max-w-4xl mx-auto border-4 border-seal-red shadow-2xl [.akatsuki-theme_&]:bg-black/60 [.akatsuki-theme_&]:border-akatsuki-red">
                    <h1 className="text-5xl md:text-7xl font-black text-seal-red mb-4 [.akatsuki-theme_&]:text-akatsuki-red">موسوعة الشينوبو</h1>
                    <p className="text-lg md:text-xl text-text-dark dark:text-text-light mb-8">دليلك الكامل لاستكشاف عالم النينجا العظيم</p>
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                        <div className="relative">
                            <input 
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="ابحث في مخطوطات الموسوعة..." 
                                className="w-full p-4 pe-12 text-lg bg-white dark:bg-ink-dark border-2 border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-seal-red focus:border-seal-red outline-none transition-all [.akatsuki-theme_&]:focus:ring-akatsuki-red [.akatsuki-theme_&]:focus:border-akatsuki-red"
                            />
                            <button type="submit" aria-label="بحث" className="absolute top-1/2 end-4 -translate-y-1/2 text-gray-500 hover:text-seal-red [.akatsuki-theme_&]:hover:text-akatsuki-red">
                                <SearchIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8 z-10 relative">
                <h2 className="text-3xl font-bold text-center text-seal-red mb-8 [.akatsuki-theme_&]:text-akatsuki-red">استكشاف سريع</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link to="/characters" className="block bg-parchment/80 dark:bg-ink-dark/80 p-4 rounded-lg text-center border-2 border-text-dark/20 dark:border-text-light/20 hover:border-seal-red transition-all duration-300 hover:shadow-glow-red-dark hover:-translate-y-2 [.akatsuki-theme_&]:bg-black/50 [.akatsuki-theme_&]:border-akatsuki-red/40 [.akatsuki-theme_&]:hover:shadow-glow-red">
                        <h3 className="text-2xl font-bold mb-4">الشخصيات البارزة</h3>
                        <div className="flex justify-center -space-x-4">
                            {db.characters.slice(0, 5).map(c => <EntityAvatar key={c.id} symbol={c.symbol} village={c.village} size="w-12 h-12" title={c.name} />)}
                        </div>
                    </Link>
                     <Link to="/arcs" className="block bg-parchment/80 dark:bg-ink-dark/80 p-4 rounded-lg text-center border-2 border-text-dark/20 dark:border-text-light/20 hover:border-seal-red transition-all duration-300 hover:shadow-glow-red-dark hover:-translate-y-2 [.akatsuki-theme_&]:bg-black/50 [.akatsuki-theme_&]:border-akatsuki-red/40 [.akatsuki-theme_&]:hover:shadow-glow-red">
                        <h3 className="text-2xl font-bold mb-4">أركات مشهورة</h3>
                         <p className="font-bold text-gray-700 dark:text-gray-300">{db.arcs[1].title}</p>
                         <p className="font-bold text-gray-700 dark:text-gray-300 mt-2">{db.arcs[4].title}</p>
                    </Link>
                    <Link to="/abilities" className="block bg-parchment/80 dark:bg-ink-dark/80 p-4 rounded-lg text-center border-2 border-text-dark/20 dark:border-text-light/20 hover:border-seal-red transition-all duration-300 hover:shadow-glow-red-dark hover:-translate-y-2 [.akatsuki-theme_&]:bg-black/50 [.akatsuki-theme_&]:border-akatsuki-red/40 [.akatsuki-theme_&]:hover:shadow-glow-red">
                        <h3 className="text-2xl font-bold mb-4">قدرات مميزة</h3>
                        <p className="font-bold text-gray-700 dark:text-gray-300">{db.abilities[0].name}</p>
                        <p className="font-bold text-gray-700 dark:text-gray-300 mt-2">{db.abilities[4].name}</p>
                    </Link>
                    <Link to="/organizations" className="block bg-parchment/80 dark:bg-ink-dark/80 p-4 rounded-lg text-center border-2 border-text-dark/20 dark:border-text-light/20 hover:border-seal-red transition-all duration-300 hover:shadow-glow-red-dark hover:-translate-y-2 [.akatsuki-theme_&]:bg-black/50 [.akatsuki-theme_&]:border-akatsuki-red/40 [.akatsuki-theme_&]:hover:shadow-glow-red">
                        <h3 className="text-2xl font-bold mb-4">أخطر العصابات</h3>
                        <p className="font-bold text-gray-700 dark:text-gray-300">{db.organizations[0].name}</p>
                        <p className="font-bold text-gray-700 dark:text-gray-300 mt-2">{db.organizations[2].name}</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

// --- List Pages ---
const createListPage = (title: string, items: FavoriteItem[]) => () => (
    <PageWrapper title={title}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => <GenericCard key={item.id} item={item} />)}
        </div>
    </PageWrapper>
);

const CharactersPage: React.FC = () => {
    const { isPro } = useShinobiPro();
    const [villageFilter, setVillageFilter] = useState<string>('all');
    const [natureFilter, setNatureFilter] = useState<ChakraNature | 'all'>('all');

    const villages = useMemo(() => ['all', ...Array.from(new Set(db.characters.map(c => c.village)))], []);
    const natures = useMemo(() => ['all', ...Object.values(ChakraNature)], []);

    const filteredCharacters = useMemo(() => {
        return db.characters.filter(char => {
            const villageMatch = villageFilter === 'all' || char.village === villageFilter;
            const natureMatch = natureFilter === 'all' || char.natureType.includes(natureFilter);
            return villageMatch && natureMatch;
        });
    }, [villageFilter, natureFilter]);

    return (
        <PageWrapper title="سجلات الشخصيات">
            {isPro && (
                <div className="bg-parchment/80 dark:bg-ink-dark/80 p-6 rounded-lg mb-8 border-2 border-text-dark/20 dark:border-text-light/20 [.akatsuki-theme_&]:bg-black/50 [.akatsuki-theme_&]:border-akatsuki-red/40">
                    <div className="flex items-center gap-4 mb-4">
                        <ByakuganIcon className="w-12 h-12 flex-shrink-0" />
                        <h3 className="text-2xl font-bold text-seal-red [.akatsuki-theme_&]:text-akatsuki-red">تفعيل رؤية البياكوغان</h3>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <select value={villageFilter} onChange={e => setVillageFilter(e.target.value)} className="w-full p-2 rounded bg-white dark:bg-ink-dark border border-gray-400 dark:border-gray-600">
                          {villages.map(v => <option key={v} value={v}>{v === 'all' ? 'كل القرى' : v}</option>)}
                      </select>
                       <select value={natureFilter} onChange={e => setNatureFilter(e.target.value as ChakraNature | 'all')} className="w-full p-2 rounded bg-white dark:bg-ink-dark border border-gray-400 dark:border-gray-600">
                          {natures.map(n => <option key={n} value={n}>{n === 'all' ? 'كل أنواع التشاكرا' : n}</option>)}
                      </select>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCharacters.map(char => <CharacterCard key={char.id} char={char} />)}
            </div>
        </PageWrapper>
    );
};
const ArcsPage = createListPage("مخطوطات الأركات", db.arcs);
const AbilitiesPage = createListPage("فنون وتقنيات النينجا", db.abilities);
const OrganizationsPage = createListPage("العصابات والمنظمات", db.organizations);
const EyesPage = createListPage("تقنيات العيون (دوجتسو)", db.eyeTechniques);
const ScrollsPage = createListPage("المخطوطات الحصرية", db.scrolls);


// --- Search & Favorites ---
const SearchPage: React.FC = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q') || '';
    
    const allItems: FavoriteItem[] = [...db.characters, ...db.arcs, ...db.abilities, ...db.organizations, ...db.eyeTechniques, ...db.scrolls];
    const results = allItems.filter(item => ('name' in item ? item.name : item.title).toLowerCase().includes(query.toLowerCase()));
    
    return (
        <PageWrapper title={`نتائج البحث عن: "${query}"`} showSearch={false}>
            {results.length === 0 ? (
                <p className="text-center text-xl">لم يتم العثور على أي مخطوطات تطابق بحثك.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map(item => <GenericCard key={item.id} item={item} />)}
                </div>
            )}
        </PageWrapper>
    );
};

const FavoritesPage: React.FC = () => {
    const { favorites } = useAppContext();
    const allItems: FavoriteItem[] = [...db.characters, ...db.arcs, ...db.abilities, ...db.organizations, ...db.eyeTechniques, ...db.scrolls];
    const favoriteItems = allItems.filter(item => favorites.includes(item.id));
    
    return (
        <PageWrapper title="المفضلة" showSearch={false}>
            {favoriteItems.length === 0 ? (
                <p className="text-center text-xl">لم تقم بإضافة أي شيء إلى المفضلة بعد.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteItems.map(item => <GenericCard key={item.id} item={item} />)}
                </div>
            )}
        </PageWrapper>
    );
};

// --- Detail Pages ---

const DetailSection: React.FC<{title: string; icon?: React.ReactNode; children: React.ReactNode}> = ({ title, icon, children }) => (
    <div>
        <h2 className="text-2xl font-bold text-seal-red mb-4 flex items-center gap-3 [.akatsuki-theme_&]:text-akatsuki-red">
            {icon}{title}
        </h2>
        {children}
    </div>
);

const SRankInfoSection: React.FC<{info: string}> = ({ info }) => (
    <div className="mt-8 p-4 border-2 border-akatsuki-red rounded-lg bg-black/50">
         <h2 className="text-2xl font-bold text-akatsuki-red mb-4 flex items-center gap-3">
            <AkatsukiCloudIcon className="w-8 h-8" /> معلومات S-Rank
        </h2>
        <p className="text-lg text-red-100 leading-relaxed">{info}</p>
    </div>
);

const CharacterDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { isPro } = useShinobiPro();
    const navigate = useNavigate();
    const char = db.characters.find(c => c.id === id);

    if (!char) return <PageWrapper title="خطأ"><p>الشخصية غير موجودة.</p></PageWrapper>;
    
    const natureIcons: {[key: string]: string} = { "نار": '🔥', "ماء": '💧', "ريح": '💨', "أرض": '🌍', "برق": '⚡️' };

    return (
        <PageWrapper title={char.name}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 flex flex-col items-center">
                    <EntityAvatar symbol={char.symbol} village={char.village} size="w-64 h-64" />
                     <div className="flex flex-wrap justify-center gap-2 items-center mt-4">
                        <span className="bg-scroll-gold text-white px-3 py-1 rounded-full text-sm font-bold [.akatsuki-theme_&]:bg-akatsuki-red">{char.village}</span>
                        <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-bold">{char.rank}</span>
                    </div>
                    <p className="text-center italic text-lg mt-6 p-4 border-r-4 border-seal-red bg-parchment/50 dark:bg-ink-dark/50 rounded-md [.akatsuki-theme_&]:border-akatsuki-red">"{char.quote}"</p>
                    {isPro && (
                        <button onClick={() => navigate(`/compare/${char.id}`)} className="mt-6 flex items-center gap-3 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300">
                            <VSCompareIcon className="w-6 h-6" />
                            <span>مقارنة هذه الشخصية</span>
                        </button>
                    )}
                </div>
                <div className="lg:col-span-2 bg-parchment/50 dark:bg-ink-dark/50 p-6 rounded-lg border-2 border-gray-300 dark:border-gray-700 [.akatsuki-theme_&]:bg-black/50 [.akatsuki-theme_&]:border-akatsuki-red/40">
                    <div className="space-y-8">
                        <DetailSection title="السيرة الذاتية" icon={<span className="text-3xl">🏘️</span>}> <p className="text-lg leading-relaxed">{char.bio}</p> </DetailSection>
                        <DetailSection title="طبيعة التشاكرا" icon={<span className="text-3xl">🖐️</span>}>
                            <div className="flex flex-wrap gap-4"> {char.natureType.map(nature => (<div key={nature} className="flex flex-col items-center gap-1 p-2 bg-gray-200 dark:bg-gray-700 rounded-lg"> <span className="text-3xl">{natureIcons[nature]}</span> <span className="font-semibold">{nature}</span> </div>))} </div>
                        </DetailSection>
                        <DetailSection title="ترسانة التقنيات" icon={<span className="text-3xl">📜</span>}> <div className="flex flex-wrap gap-3"> {char.jutsu.map(j => <span key={j} className="bg-gray-200 dark:bg-gray-700 text-text-dark dark:text-text-light px-3 py-1 rounded-md font-semibold">{j}</span>)} </div> </DetailSection>
                        <DetailSection title="الانتماءات" icon={<AkatsukiCloudIcon className="w-8 h-8"/>}> <div className="flex flex-wrap gap-3"> {char.affiliation.map(a => <span key={a} className="bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full font-semibold">{a}</span>)} </div> </DetailSection>
                    </div>
                    {isPro && char.sRankInfo && <SRankInfoSection info={char.sRankInfo} />}
                </div>
            </div>
        </PageWrapper>
    );
}

const ArcDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const arc = db.arcs.find(a => a.id === id);
    if (!arc) return <PageWrapper title="خطأ"><p>الآرك غير موجود.</p></PageWrapper>;
    const charactersInArc = db.characters.filter(c => arc.notableCharacters.includes(c.id));
    return(
        <PageWrapper title={arc.title}>
            <div className="bg-parchment/80 dark:bg-ink-dark/80 p-8 rounded-lg border-2 border-scroll-gold/50 space-y-8 [.akatsuki-theme_&]:bg-black/50 [.akatsuki-theme_&]:border-akatsuki-red/50">
                <DetailSection title="ملخص الأحداث" icon={<EntityAvatar symbol={arc.symbol} isArc={true} size="w-12 h-12" />}> <p className="text-lg">{arc.summary}</p> <p className="mt-2 font-bold">الحلقات: {arc.episodes.from} - {arc.episodes.to}</p> </DetailSection>
                <DetailSection title="الأحداث الرئيسية" icon={<span className="text-3xl">📜</span>}> <ul className="list-disc list-inside space-y-2 text-lg"> {arc.keyEvents.map(event => <li key={event}>{event}</li>)} </ul> </DetailSection>
                <DetailSection title="شخصيات بارزة" icon={<span className="text-3xl">👥</span>}>
                     <div className="flex flex-wrap gap-4"> {charactersInArc.map(char => ( <Link to={`/character/${char.id}`} key={char.id} className="flex flex-col items-center text-center group"> <EntityAvatar symbol={char.symbol} village={char.village} size="w-20 h-20" /> <span className="font-bold mt-2 group-hover:text-seal-red transition-colors [.akatsuki-theme_&]:group-hover:text-akatsuki-red">{char.name}</span> </Link> ))} </div>
                </DetailSection>
            </div>
        </PageWrapper>
    );
};

const ScrollDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const scroll = db.scrolls.find(s => s.id === id);
    if (!scroll) return <PageWrapper title="خطأ"><p>المخطوطة غير موجودة.</p></PageWrapper>;
    return (
        <PageWrapper title={scroll.title}>
            <div className="bg-parchment/80 dark:bg-ink-dark/80 p-8 rounded-lg border-2 border-scroll-gold/50 [.akatsuki-theme_&]:bg-black/50 [.akatsuki-theme_&]:border-akatsuki-red/50">
                 <span className="bg-scroll-gold text-white px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">{scroll.category}</span>
                 <p className="text-lg leading-loose whitespace-pre-line">{scroll.content}</p>
            </div>
        </PageWrapper>
    );
}

// Cinematic Comparison Page
const CinematicComparisonPage: React.FC = () => {
    const { char1Id: initialChar1Id } = useParams<{ char1Id: string }>();
    const [char1Id, setChar1Id] = useState<string>(initialChar1Id || db.characters[0].id);
    const [char2Id, setChar2Id] = useState<string>(db.characters.find(c => c.id !== (initialChar1Id || db.characters[0].id))?.id || db.characters[1].id);
    const [stage, setStage] = useState<'select' | 'animate' | 'result'>('select');
    const [winner, setWinner] = useState<Character | null | 'draw'>(null);

    const char1 = useMemo(() => db.characters.find(c => c.id === char1Id), [char1Id]);
    const char2 = useMemo(() => db.characters.find(c => c.id === char2Id), [char2Id]);
    
    useEffect(() => {
        if (initialChar1Id) {
            setChar1Id(initialChar1Id);
             if (initialChar1Id === char2Id) {
                const newChar2 = db.characters.find(c => c.id !== initialChar1Id);
                if (newChar2) setChar2Id(newChar2.id);
            }
        }
    }, [initialChar1Id, char2Id]);


    const handleFight = () => {
        if(!char1 || !char2 || char1Id === char2Id) return;
        
        if (char1.powerScore > char2.powerScore) {
            setWinner(char1);
        } else if (char2.powerScore > char1.powerScore) {
            setWinner(char2);
        } else {
            setWinner('draw');
        }

        setStage('animate');
        setTimeout(() => setStage('result'), 3000);
    };

    const renderCharInfo = (char?: Character, isWinner?: boolean) => {
        if (!char) return null;
        return (
            <div className={`flex flex-col items-center p-4 bg-parchment/50 dark:bg-ink-dark/50 rounded-lg border-2 w-full transition-all duration-500 [.akatsuki-theme_&]:bg-black/50 [.akatsuki-theme_&]:border-akatsuki-red/40 ${isWinner ? 'border-scroll-gold shadow-glow-gold animate-eight-gates-aura' : 'border-gray-300 dark:border-gray-700'}`}>
                {isWinner && <span className="text-2xl font-black text-scroll-gold mb-2">الفائز</span>}
                <EntityAvatar symbol={char.symbol} village={char.village} size="w-32 h-32" />
                <h2 className="text-2xl font-bold mt-4">{char.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{char.rank}</p>
                <div className="mt-4 text-right w-full space-y-2">
                    <p><strong>القرية:</strong> {char.village}</p>
                    <p><strong>أبرز التقنيات:</strong> {char.jutsu.slice(0,3).join(', ')}</p>
                    <p><strong>نقاط القوة:</strong> <span className="font-bold text-lg text-seal-red dark:text-seal-red-light">{char.powerScore}</span></p>
                </div>
            </div>
        );
    };
    
    const ChakraAnimation: React.FC = () => (
         <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="absolute left-0 w-1/2 h-64 bg-gradient-to-r from-blue-500/70 to-transparent animate-chakra-flow-left"></div>
            <div className="absolute right-0 w-1/2 h-64 bg-gradient-to-l from-purple-500/70 to-transparent animate-chakra-flow-right"></div>
            <div className="relative text-9xl font-black text-akatsuki-red animate-chakra-clash" style={{animationDelay: '1s'}}>
                <VSCompareIcon />
            </div>
        </div>
    );
    
    const ResultSummary: React.FC<{ winner: Character | 'draw' | null, char1?: Character, char2?: Character }> = ({ winner, char1, char2 }) => {
        if (!char1 || !char2) return null;

        let message = "";
        if (winner === 'draw') {
            message = `بعد معركة أسطورية، لم يتمكن أي من ${char1.name} و ${char2.name} من حسم النزال. قوتهما متكافئة بشكل لا يصدق!`;
        } else if (winner) {
            const powerDiff = Math.abs(char1.powerScore - char2.powerScore);
            let reason = "";
            if (powerDiff > 10) reason = "بفارق قوة ساحق";
            else if (powerDiff > 5) reason = "بأفضلية واضحة في القوة القتالية";
            else reason = "بعد معركة متقاربة وصعبة";
            
            message = `${reason}، يتوقع أن ${winner.name} هو من سيخرج منتصرًا من هذه المواجهة.`;
        }

        return (
            <div className="col-span-1 md:col-span-2 text-center p-6 bg-parchment/80 dark:bg-ink-dark/80 rounded-lg mt-8 border-2 border-seal-red/30">
                <h3 className="text-3xl font-bold text-seal-red mb-4">تحليل المعركة</h3>
                <p className="text-xl">{message}</p>
            </div>
        );
    };


    if (stage === 'animate' && char1 && char2) {
        return (
            <div className="fixed inset-0 bg-ink-dark z-50 flex items-center justify-between p-8 overflow-hidden">
                <div className="animate-slide-in-left">
                    <EntityAvatar symbol={char1.symbol} village={char1.village} size="w-64 h-64" />
                    <h2 className="text-4xl font-black text-center text-white mt-4">{char1.name}</h2>
                </div>
                <ChakraAnimation />
                 <div className="animate-slide-in-right">
                    <EntityAvatar symbol={char2.symbol} village={char2.village} size="w-64 h-64" />
                    <h2 className="text-4xl font-black text-center text-white mt-4">{char2.name}</h2>
                </div>
            </div>
        );
    }
    
    if (stage === 'result') {
         return (
             <PageWrapper title="نتائج المواجهة" showSearch={false}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {renderCharInfo(char1, winner !== 'draw' && winner?.id === char1?.id)}
                    {renderCharInfo(char2, winner !== 'draw' && winner?.id === char2?.id)}
                    <ResultSummary winner={winner} char1={char1} char2={char2} />
                </div>
                <div className="text-center mt-12">
                     <button onClick={() => { setStage('select'); setWinner(null); }} className="bg-seal-red text-white font-bold py-3 px-8 rounded-lg text-xl hover:bg-seal-red-dark transition-all duration-300 [.akatsuki-theme_&]:bg-akatsuki-red [.akatsuki-theme_&]:hover:bg-red-500">
                        مواجهة جديدة
                    </button>
                </div>
             </PageWrapper>
         );
    }

    return (
        <PageWrapper title="مقارنة المقاتلين" showSearch={false}>
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
                <p className="text-2xl text-center mb-4">اختر الشينوبي الأسطوريين لبدء المواجهة</p>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="flex flex-col items-center gap-4">
                       {char1 && <EntityAvatar symbol={char1.symbol} village={char1.village} size="w-32 h-32" />}
                       <select value={char1Id} onChange={e => setChar1Id(e.target.value)} className="w-full p-3 text-lg rounded bg-white dark:bg-ink-dark border border-gray-400 dark:border-gray-600">
                           {db.characters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                       </select>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        {char2 && <EntityAvatar symbol={char2.symbol} village={char2.village} size="w-32 h-32" />}
                       <select value={char2Id} onChange={e => setChar2Id(e.target.value)} className="w-full p-3 text-lg rounded bg-white dark:bg-ink-dark border border-gray-400 dark:border-gray-600">
                            {db.characters.filter(c => c.id !== char1Id).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                       </select>
                    </div>
                </div>
                <button onClick={handleFight} disabled={char1Id === char2Id} className="bg-seal-red text-white font-bold py-4 px-12 rounded-lg text-2xl hover:bg-seal-red-dark transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed [.akatsuki-theme_&]:bg-akatsuki-red [.akatsuki-theme_&]:hover:bg-red-500">
                    ابــــــــدأ النــــــزال
                </button>
            </div>
        </PageWrapper>
    );
};

// Generic Detail Page
const ItemDetailPageWrapper: React.FC<{
    findItem: (id: string) => Ability | Organization | EyeTechnique | undefined;
    typeLabel: string;
    children: (item: any) => React.ReactNode;
}> = ({ findItem, typeLabel, children }) => {
    const { id } = useParams<{ id: string }>();
    const { isPro } = useShinobiPro();
    const item = id ? findItem(id) : undefined;
    
    const IconComponent = (() => {
        if (!item) return 'div';
        if ('symbol' in item) return item.symbol;
        // Fallback for Abilities which dont have a symbol, return a component that renders an emoji
        return (props: {className?:string}) => <span className={`${props.className} flex items-center justify-center text-4xl`}>✨</span>;
    })();

    if (!item) return <PageWrapper title="خطأ"><p>العنصر غير موجود.</p></PageWrapper>;
    
    return (
        <PageWrapper title={item.name}>
             <div className="bg-parchment/80 dark:bg-ink-dark/80 p-8 rounded-lg border-2 border-scroll-gold/50 [.akatsuki-theme_&]:bg-black/50 [.akatsuki-theme_&]:border-akatsuki-red/50">
                <div className="flex items-center gap-4 border-b-2 border-gray-300 dark:border-gray-700 pb-4">
                    <IconComponent className="w-12 h-12" />
                    <div> <span className="text-scroll-gold font-bold">{typeLabel}</span> <h1 className="text-4xl font-bold">{item.name}</h1> </div>
                </div>
                <div className="pt-6"> {children(item)} </div>
                {isPro && 'sRankInfo' in item && item.sRankInfo && <SRankInfoSection info={item.sRankInfo} />}
             </div>
        </PageWrapper>
    );
};


// Pro Route Guard
const ProRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
    const { isPro } = useShinobiPro();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isPro) {
            navigate('/shinobi-pro');
        }
    }, [isPro, navigate]);
    return isPro ? <>{children}</> : null;
};


// --- Main App Component ---
const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, toggleFavorite, isFavorite] = useFavorites();
    return <AppContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>{children}</AppContext.Provider>;
};

const FooterSharinganIcon: React.FC<{className?: string}> = ({className}) => (
    <svg width="100%" height="100%" viewBox="0 0 100 100" className={className}>
        <defs>
            <radialGradient id="red-gradient-footer" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{stopColor: '#DC2626', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#991B1B', stopOpacity: 1}} />
            </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#red-gradient-footer)" stroke="#121826" strokeWidth="4" />
        <circle cx="50" cy="50" r="18" fill="black" stroke="#333" strokeWidth="1" />
        
        <g transform="rotate(-15 50 50)">
             <path d="M 50,50 C 65,30 80,30 85,20" stroke="black" strokeWidth="7" fill="none" strokeLinecap="round"/>
        </g>
         <g transform="rotate(105 50 50)">
             <path d="M 50,50 C 65,30 80,30 85,20" stroke="black" strokeWidth="7" fill="none" strokeLinecap="round"/>
        </g>
         <g transform="rotate(225 50 50)">
             <path d="M 50,50 C 65,30 80,30 85,20" stroke="black" strokeWidth="7" fill="none" strokeLinecap="round"/>
        </g>
    </svg>
);


const Footer = () => {
    const [isMangekyouActive, setIsMangekyouActive] = useState(false);

    const handleDoubleClick = () => {
        if (isMangekyouActive) return;
        setIsMangekyouActive(true);
        setTimeout(() => {
            setIsMangekyouActive(false);
        }, 5000);
    };

    return (
        <footer className="py-6 mt-auto text-center border-t-2 border-seal-red/30 [.akatsuki-theme_&]:border-akatsuki-red/30 container mx-auto">
            <div onDoubleClick={handleDoubleClick} className="w-14 h-14 mx-auto mb-4 inline-block cursor-pointer" title="انقر نقرًا مزدوجًا للتفعيل">
                <FooterSharinganIcon className={isMangekyouActive ? 'animate-mangekyou-transform' : 'animate-spin-slow'} />
            </div>
            <p className="font-bold text-lg text-seal-red dark:text-seal-red-light animate-chakra-glow-text [.akatsuki-theme_&]:text-akatsuki-red">
                Created by : Abdullah Al-Shibli
            </p>
            <p className="font-bold text-lg text-seal-red dark:text-seal-red-light animate-chakra-glow-text" style={{animationDelay: '-2s'}}>
                تم الإنشاء بواسطة عبدالله الشبلي
            </p>
        </footer>
    );
};

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <div className="flex-grow">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/characters" element={<CharactersPage />} />
                <Route path="/character/:id" element={<CharacterDetailPage />} />
                <Route path="/arcs" element={<ArcsPage />} />
                <Route path="/arc/:id" element={<ArcDetailPage />} />
                <Route path="/abilities" element={<AbilitiesPage />} />
                <Route path="/ability/:id" element={<ItemDetailPageWrapper findItem={(id) => db.abilities.find(i => i.id === id)} typeLabel="قدرة / تقنية">{(item: Ability) => ( <> <p className="text-lg">{item.description}</p> <p><strong>النوع:</strong> {item.type}</p> {item.rank && <p><strong>الرتبة:</strong> {item.rank}</p>} {item.handSeals && <p><strong>أختام اليد:</strong> {item.handSeals}</p>} </> )}</ItemDetailPageWrapper>}/>
                <Route path="/organizations" element={<OrganizationsPage />} />
                <Route path="/organization/:id" element={<ItemDetailPageWrapper findItem={(id) => db.organizations.find(i => i.id === id)} typeLabel="منظمة">{(item: Organization) => ( <> <p className="text-lg">{item.goal}</p> <p><strong>القائد:</strong> {item.leader}</p> <p><strong>المقر:</strong> {item.headquarters}</p> </> )}</ItemDetailPageWrapper>}/>
                <Route path="/eyes" element={<EyesPage />} />
                <Route path="/eye/:id" element={<ItemDetailPageWrapper findItem={(id) => db.eyeTechniques.find(i => i.id === id)} typeLabel="تقنية عين / دوجتسو">{(item: EyeTechnique) => ( <> <p className="text-lg">{item.description}</p> <p><strong>التصنيف:</strong> {item.classification}</p> <DetailSection title="القدرات"> <ul className="list-disc list-inside space-y-1"> {item.abilities.map(ab => <li key={ab}>{ab}</li>)} </ul> </DetailSection> </> )}</ItemDetailPageWrapper>}/>
                <Route path="/search" element={<SearchPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/shinobi-pro" element={<ShinobiProPage />} />
                <Route path="/shinobi-pro/features" element={<ProRoute><ShinobiProFeaturesPage /></ProRoute>} />
                <Route path="/scrolls" element={<ProRoute><ScrollsPage /></ProRoute>} />
                <Route path="/scroll/:id" element={<ProRoute><ScrollDetailPage /></ProRoute>} />
                <Route path="/compare/:char1Id?" element={<ProRoute><CinematicComparisonPage /></ProRoute>} />
            </Routes>
        </div>
    );
};

const App: React.FC = () => {
  const [theme, setTheme] = useTheme();

  return (
    <FavoritesProvider>
      <ShinobiProProvider>
        <HashRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <FloatingControls theme={theme} setTheme={setTheme} />
            <AnimatedRoutes />
            <Footer />
          </div>
        </HashRouter>
      </ShinobiProProvider>
    </FavoritesProvider>
  );
};


export default App;