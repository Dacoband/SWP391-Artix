
import { useNavigate } from 'react-router-dom';
import '../../css/SearchResult.css';

import PaletteIcon from '@mui/icons-material/Palette';
export const SearchResultsArtWork = ({ result, resultId }) => {
  const navigate = useNavigate();

  // console.log(result);

  const handleSelect = () => {
    console.log("Xử lý chọn được kích hoạt");
    // if (result.type === "user") {
      // Nếu là userName, điều hướng đến trang profile
      navigate(`artwork/${resultId}`);
    // } else if (result.type === "artwork") {
    //   // Nếu là tên artwork, điều hướng đến trang bài post
    //   navigate(`artwork/${result.artworkID}`);
    // }
  };

  return (
    <div className="search-result" onClick={handleSelect}>
     <PaletteIcon/> {result}
    </div>
  );
};
