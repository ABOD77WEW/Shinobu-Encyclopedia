import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../data/db.ts';
import { FavoriteItem } from '../types.ts';
import { SearchIcon } from './Icons.tsx';
import { ProSharinganIcon } from './ThematicIcons.tsx';

const SearchInput: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<FavoriteItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const allItems: FavoriteItem[] = useMemo(() => [...db.characters, ...db.arcs, ...db.abilities, ...db.organizations, ...db.eyeTechniques, ...db.scrolls], []);

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            setIsOpen(false);
            return;
        }

        const filteredResults = allItems.filter(item =>
            ('name' in item ? item.name : item.title).toLowerCase().includes(query.toLowerCase())
        ).slice(0, 7);

        setResults(filteredResults);
        setIsOpen(filteredResults.length > 0);
    }, [query, allItems]);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
            setIsOpen(false);
            setQuery('');
        }
    };
    
    const getItemPath = (item: FavoriteItem): string => {
        if ('village' in item) return `/character/${item.id}`;
        if ('episodes' in item) return `/arc/${item.id}`;
        if ('type' in item) return `/ability/${item.id}`;
        if ('leader' in item) return `/organization/${item.id}`;
        if ('classification' in item) return `/eye/${item.id}`;
        if ('category' in item) return `/scroll/${item.id}`;
        return '/';
    };

    const handleSuggestionClick = () => {
        setIsOpen(false);
        setQuery('');
    };

    const getItemType = (item: FavoriteItem): string => {
        if ('village' in item) return `شخصية`;
        if ('episodes' in item) return `آرك`;
        if ('type' in item) return `قدرة`;
        if ('leader' in item) return `منظمة`;
        if ('classification' in item) return `تقنية عين`;
        if ('category' in item) return `مخطوطة`;
        return '';
    };

    return (
        <div className="relative mb-8 max-w-2xl mx-auto" ref={searchContainerRef}>
            {/* FIX: Corrected the onSubmit handler from 'handleSearch' to 'handleSearchSubmit'. */}
            <form onSubmit={handleSearchSubmit}>
                 <div className="relative">
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => { if (results.length > 0) setIsOpen(true); }}
                        placeholder="ابحث في الموسوعة..."
                        className="
                            w-full p-4 pe-12 text-lg 
                            bg-white/80 dark:bg-ink-dark backdrop-blur-sm 
                            border-2 border-gray-400 dark:border-gray-600 
                            rounded-lg 
                            focus:ring-2 focus:ring-seal-red focus:border-seal-red 
                            outline-none transition-all 
                            [.akatsuki-theme_&]:bg-black/70
                            [.akatsuki-theme_&]:border-akatsuki-red/50
                            [.akatsuki-theme_&]:focus:ring-akatsuki-red
                            [.akatsuki-theme_&]:placeholder:text-red-300/70
                        "
                        aria-label="Search"
                        aria-haspopup="listbox"
                        aria-expanded={isOpen}
                        aria-controls="search-results"
                    />
                    <button type="submit" aria-label="بحث" className="absolute top-1/2 end-3 -translate-y-1/2 group">
                        <ProSharinganIcon className="w-8 h-8 text-gray-500 group-hover:text-seal-red transition-all duration-300 group-hover:animate-pro-glow [.akatsuki-theme_&]:text-akatsuki-red" />
                    </button>
                </div>
            </form>
            {isOpen && results.length > 0 && (
                <ul id="search-results" role="listbox" className="absolute z-20 w-full mt-2 bg-parchment dark:bg-ink-dark border-2 border-gray-400 dark:border-gray-600 rounded-lg shadow-lg overflow-hidden animate-page-transition" style={{ animationDuration: '0.3s' }}>
                    {results.map(item => (
                        <li key={item.id} role="option" aria-selected="false" className="border-b border-gray-300 dark:border-gray-700 last:border-b-0">
                            <Link 
                                to={getItemPath(item)}
                                onClick={handleSuggestionClick}
                                className="flex items-center justify-between gap-4 p-3 hover:bg-seal-red/10 dark:hover:bg-seal-red/20 transition-colors"
                            >
                                <p className="font-bold text-text-dark dark:text-text-light">{('name' in item ? item.name : item.title)}</p>
                                <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full whitespace-nowrap">{getItemType(item)}</span>
                            </Link>
                        </li>
                    ))}
                     <li className="border-b border-gray-300 dark:border-gray-700 last:border-b-0">
                        <Link to={`/search?q=${encodeURIComponent(query)}`} onClick={handleSuggestionClick} className="block text-center p-3 font-bold text-seal-red dark:text-seal-red-light hover:bg-seal-red/10 dark:hover:bg-seal-red/20 transition-colors">
                            شاهد كل النتائج لـ "{query}"
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    );
};

const PageWrapper: React.FC<{ children: React.ReactNode; title: string; showSearch?: boolean }> = ({ children, title, showSearch = true }) => {
  useEffect(() => {
    document.title = `${title} | موسوعة الشينوبو`;
  }, [title]);

  return (
    <main className="container mx-auto px-4 py-8 animate-page-transition">
      <h1 className="text-4xl font-bold text-seal-red mb-4 pb-2 border-b-2 border-seal-red/30 text-right">{title}</h1>
      {showSearch && <SearchInput />}
      {children}
    </main>
  );
};

export default PageWrapper;