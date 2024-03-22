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
import { SearchResultUser } from "./SearchResultUser";
import { Link } from 'react-router-dom';
// import { SearchResultTag } from './SearchResultTag';
import{SearchResultsArtWork} from'./SearchResultArtWork'
export const SearchResultsList = (props) => {
  const {dataCreator, dataArt} = props
  console.log(dataArt);
  return (
    <div className="results-list">
      {dataCreator.map((dataCreator, id) => {
        return  <SearchResultUser result={dataCreator.userName} resultId={dataCreator.creatorID} resultIdkey={id} />;
      })}
      {/* Kiểm tra dataArt có phải là mảng không */}
      {dataArt.map((dataArt, id) => {
        return  <SearchResultsArtWork result={dataArt.artworkName} resultId={dataArt.artworkID} resultIdkey={id} />;
      })}
    </div>
  );
};
