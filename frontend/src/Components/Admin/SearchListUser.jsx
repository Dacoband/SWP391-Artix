// dung cho searchuser
import '../../css/SearchResultsList.css'
import { SearchResult } from './SearchResult'
import { Link } from 'react-router-dom';
export const SearchResultsList = ({ results }) => {
  console.log( results);
  return (
    <div className="results-list">
     
      {results.map((result, id) => {
        return <SearchResult accountID={result.creatorID} result={result.userName} key={id} />;
      })}
    </div>
  );
};


