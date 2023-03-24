// components/SearchBox.tsx
import React, { useState } from 'react';

type SearchResult = {
  id: string;
  preview: string;
};

interface SearchBoxProps {
  data: any[];
  onJumpTo: (id: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ data, onJumpTo }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        const results: SearchResult[] = data
            .filter((item) => {
                // Change this condition based on the JSON structure you have.
                return item.title.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .map((item) => ({
                id: item.id,
                preview: item.title,
            }));

        setSearchResults(results);
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search"
            />
            <button onClick={handleSearch}
        </div>
 	);
};

export default SearchBox