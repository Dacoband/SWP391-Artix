
// dungf cho searchuser
import { useNavigate } from 'react-router-dom';
import '../../css/SearchResult.css';

export const SearchResult = ({ result, resultId }) => {
  const navigate = useNavigate()

  // const handleSelect = () =>{
  //   navigate(`profile/${accountID}`)
  // }


    return (
      <div
        className="search-result"
        onClick={(e) => alert(`You selected ${result}!`)}
        // onClick={(e)=> handleSelect(e)}
      >
        {result}
      </div>
    );}