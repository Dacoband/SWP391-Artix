
// dungf cho searchuser
// import { useNavigate } from 'react-router-dom';
// import '../../css/SearchResult.css';

// export const SearchResult = ({ accountID, result }) => {
//   const navigate = useNavigate()

//   const handleSelect = () =>{
//     navigate(`profile/${accountID}`)
//   }


//     return (
//       <div
//         className="search-result"
//         // onClick={(e) => alert(`You selected ${result}!`)}
//         onClick={(e)=> handleSelect(e)}
//       >
//         {result}
//       </div>
//     );
//   };
import { useNavigate } from 'react-router-dom';
import '../../css/SearchResult.css';
import PersonIcon from '@mui/icons-material/Person';
export const SearchResultUser = ({ result, resultId }) => {
  const navigate = useNavigate();

  // console.log(result);

  const handleSelect = () => {
    console.log("Xử lý chọn được kích hoạt");
    // if (result.type === "user") {
      // Nếu là userName, điều hướng đến trang profile
      navigate(`profile/${resultId}`);
    // } else if (result.type === "artwork") {
    //   // Nếu là tên artwork, điều hướng đến trang bài post
    //   navigate(`artwork/${result.artworkID}`);
    // }
  };

  return (
    <div className="search-result" onClick={handleSelect}>
     <PersonIcon/> {result}
    </div>
  );
};
