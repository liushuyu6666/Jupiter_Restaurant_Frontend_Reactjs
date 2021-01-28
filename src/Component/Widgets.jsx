import React, { useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';


const DishCard = (props) => {

    return(
        <div className={"col-sm-4"} style={{height: "11rem", width: "12rem", backgroundColor: "red"}}>
            <div className="card" style={{height: "10rem", width: "12rem", backgroundColor: "green"}}>
                <img src={props.src}
                     className="card-img-top"
                     alt={props.alt}
                     style={{height: "8rem", width: "12rem"}}/>
                <div className="card-body">
                    <p className="card-text">{props.txt}</p>
                </div>
            </div>
        </div>
    )
}

// const LoginAndRegister = (props) => {
//
//     const login = (event) => {
//
//         event.preventDefault();
//
//         props.history.push('/login');
//
//     }
//
//     return(
//         <>
//             <button onClick={login}>login</button>
//             <br/>
//             <p>don't have account?register here</p>
//         </>
//     )
// }

// const CarouselLSY = (props) => {
//
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [animating, setAnimating] = useState(false);
//
//     const next = () => {
//         if (animating) return;
//         const nextIndex = activeIndex === props.items.length - 1 ? 0 : activeIndex + 1;
//         setActiveIndex(nextIndex);
//     }
//
//     const previous = () => {
//         if (animating) return;
//         const nextIndex = activeIndex === 0 ? props.items.length - 1 : activeIndex - 1;
//         setActiveIndex(nextIndex);
//     }
//
//     const goToIndex = (newIndex) => {
//         if (animating) return;
//         setActiveIndex(newIndex);
//     }
//
//     const slides = props.items.map((item) => {
//         return (
//             <CarouselItem
//                 onExiting={() => setAnimating(true)}
//                 onExited={() => setAnimating(false)}
//                 key={item.src}
//             >
//                 <img src={item.src} alt={item.altText} />
//                 <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
//             </CarouselItem>
//         );
//     });
//
//     return (
//         <Carousel
//             activeIndex={activeIndex}
//             next={next}
//             previous={previous}
//         >
//             <CarouselIndicators items={props.items} activeIndex={activeIndex} onClickHandler={goToIndex} />
//             {slides}
//             <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
//             <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
//         </Carousel>
//     );
// }

export default DishCard;