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
import ColorLensIcon from '@mui/icons-material/ColorLens';
import '../../css/SearchResultsList.css';
import { SearchResult } from "./SearchResult";
import { Link } from 'react-router-dom';
import { SearchResultTag } from './SearchResultTag';

export const SearchResultsList = (props) => {
  const {dataCreator, dataTag} = props
  console.log(dataTag);
  return (
    <div className="results-list">
      {dataCreator.map((dataCreator, id) => {
        return  <SearchResult result={dataCreator.userName} resultId={dataCreator.creatorID} resultIdkey={id} />;
      })}
      {dataTag.map((dataTag, id) => {
         return  <SearchResultTag result={dataTag.tagName} resultId={dataTag.tagID} key={id} />;
      })}
    </div>
  );
};
