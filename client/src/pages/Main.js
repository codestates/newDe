import dummyItems from '../dummy/dummyItems';
import Nav from '../components/Nav';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Search from '../components/Search';
import Item from '../components/Item';

function Main () {
  const [searchedItem, setSearchedItem] = useState([]);

  return (
    <div>
      <Search setSearchedItem={setSearchedItem} />
      <button>리뷰작성</button>
      <section>
        {/* 나중에 dummydata 대신에 searchedItem으로 렌더링 */}
        {dummyItems.map((item, idx) => {
          return (          
            <Link to='/iteminfo' key={idx}><Item item={item} /></Link>
          )
        })}
      </section>      

    </div>
  );
}

export default Main;
