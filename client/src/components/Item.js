function Item ( { item }) {
    const review = item.review;
    
    return (
      <div>
        <div>
            {/*<img src={item.photo}/>*/}
            <div>{item.photo}</div>
            <span>{item.score}</span>
        </div>
        <div>
            <div>
                <span>{item.itemname}</span>
                <span>{item.price}</span>
            </div>
            <div>
                <span>{review.nickname}</span>
                <span>{review.score}</span>
            </div>            
            <div>{review.content}</div>
        </div>
      </div>
    );
  }

export default Item;