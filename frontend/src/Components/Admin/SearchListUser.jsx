// dung cho searchuser
import '../../css/SearchResultsList.css'
import { SearchResult } from './SearchResult'
import { Link } from 'react-router-dom';
export const SearchResultsList = ({ dataCreator }) => {
  console.log(dataCreator);
    return (
      <div className="results-list">
        {dataCreator.map((dataCreator, id) => {
          return  <SearchResult result={dataCreator.userName} resultId={dataCreator.creatorID} resultIdkey={id} />;
        })}
        </div>
  );
};

