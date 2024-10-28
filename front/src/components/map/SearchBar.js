import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // 필요한 아이콘 가져오기
import './Map.css';

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState('');

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearchClick = () => {
    if (keyword.trim()) {
      onSearch(keyword); // 부모 컴포넌트로 검색어 전달
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={keyword}
        onChange={handleInputChange}
        placeholder="검색어를 입력하세요"
      />
     <button onClick={handleSearchClick}>
     <FontAwesomeIcon icon={faSearch} /> {/* Font Awesome React 컴포넌트 사용 */}    </button>
    </div>
  );
}

export default SearchBar;
