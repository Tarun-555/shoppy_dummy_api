import filledStar from '../assets/icons/filled.svg';
import unfilledStar from '../assets/icons/unfilled.svg';

// const renderStars = (stars: any) => {
//     return(
//     <div>
//       {stars.map((star) => {
//         if(star.filled){
//             <FontAwesomeIcon icon={faStar} color={"#ffb703"}/>
//         }else
//             <FontAwesomeIcon icon={faStarHalfAlt} color={"#ffb703"}/>
//       })}
//     </div>
//     )
// }

const Rating = (props: any) => {
  const stars = new Array(5).fill(null).map((_, idx) => {
    if (idx < props.count) return { filled: true };
    else return { filled: false };
  });

  return (
    <div>
      {stars.map((star) => {
        if (star.filled) {
          return (
            <img src={filledStar} style={{ height: '20px', width: '20px' }} />
          );
        } else
          return (
            <img src={unfilledStar} style={{ height: '20px', width: '20px' }} />
          );
      })}
    </div>
  );
};

export default Rating;
