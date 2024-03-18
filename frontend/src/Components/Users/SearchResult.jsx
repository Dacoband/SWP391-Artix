
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

export const SearchResult = ({ result }) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    console.log("Xử lý chọn được kích hoạt");
    if (result.type === "user") {
      // Nếu là userName, điều hướng đến trang profile
      navigate(`profile/${result.accountID}`);
    } else if (result.type === "artwork") {
      // Nếu là tên artwork, điều hướng đến trang bài post
      navigate(`artwork/${result.artworkID}`);
    }
  };

  return (
    <div className="search-result" onClick={handleSelect}>
      {result.name}
    </div>
  );
};
