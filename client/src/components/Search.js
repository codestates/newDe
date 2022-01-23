import { useEffect } from "react";

function Search( { setSearchedItem }) {
  // 검색하면 검색창 비우기 나중 추가
  useEffect(() => {
      //axios
  }, []);

  const onSubmitHandler = (event) => {
    console.log(event.target[0].value)
    //axios
    setSearchedItem(event.target[0].value)
    event.preventDefault();
  }

  return (
    <div>
        <form onSubmit={onSubmitHandler}>
            <input type='text' placeholder={'상품명검색'} ></input>
            <div >
                <button>검색</button>
                <img />
            </div>
        </form>
    </div>
  )
}

export default Search;