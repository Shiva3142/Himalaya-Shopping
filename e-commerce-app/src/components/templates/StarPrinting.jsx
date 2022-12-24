import React from 'react'

function StarPrinting(object) {
    // console.log(object);
    let stars = [];
    let emptystars = [];
    for (let index = 1; index <= 5; index++) {
        if (index<=object.rating) {
            // console.log("star");
            // console.log(index);
            stars.push(<i id="stars" className="fas fa-star" key={index}></i>)
        }
        else {
            // console.log('emptystars');
            stars.push(<i className="fas fa-star"  id="emptystars" key={index}></i>)
        }
    }
    // console.log(stars);
    // console.log(emptystars);
    return (
        <>
            {stars}
            {emptystars}
        </>
    )
}

export default StarPrinting
