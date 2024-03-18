// dung cho searchuser
// import '../../css/SearchResultsList.css'
// import { SearchResult } from "./SearchResult"
// import { Link } from 'react-router-dom';
// export const SearchResultsList = ({ results }) => {
//   console.log( results);
//   return (
//     <div className="results-list">
     
//       {results.map((result, id) => {
//         return <SearchResult accountID={result.creatorID} result={result.userName} key={id} />;
//       })}
//     </div>
//   );
// };

import '../../css/SearchResultsList.css';
import { SearchResult } from "./SearchResult";
import { Link } from 'react-router-dom';

export const SearchResultsList = (props) => {
  const {dataCreator, dataTag} = props
  console.log(dataTag);
  return (
    <div className="results-list">
      {dataCreator.map((dataCreator, id) => {
        return  <SearchResult result={dataCreator.userName} key={id} />;
      })}
      {dataCreator.map((dataTag, id) => {
         return <SearchResult result={dataTag.tagName} key={id} />;
      })}
    </div>
  );
};
