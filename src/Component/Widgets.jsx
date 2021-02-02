import React  from 'react';


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

export const FormGroup = (props) => {

    return(
        <div className={"form-group"}>
            <label htmlFor={props.id}
                   style={{color:"#00635a"}}>
                {props.show}
            </label>
            <input
                value={props.inputValue}
                className={`form-control ${props.className}`}
                type={props.type}
                id={props.id}
                name={props.id} // to pair label
                onChange={props.change}
            />
            <div className={props.promptClassname}>
                {props.promptText}
            </div>
        </div>
    )
}

export const ArrayInputTags = (props) => {
    return(
        <div>
            <label htmlFor={props.id} style={{color:"#00635a"}}>{props.show}</label>
            <div className={"d-flex"}>
                <input
                    className={"form-control"}
                    value={props.inputValue}
                    type={"input"}
                    id={props.id} // should be the same as the key in the formValue of state
                    name={props.id} // to pair label
                    onChange={props.changeFunc}
                />
                <button
                    type={"button"}
                    id={props.arrayKey}
                    className={"btn btn-outline-primary btn-sm active"}
                    disabled={!props.buttonEnable}
                    name={props.id} // should be the same as the key in the formValue of state
                    onClick={props.addFunc}>+</button>
            </div>
            <div className={"container"} id={"tagGroup"}>
                <div className={"row"}>
                    {(props.arrayValues || []).map(item => (
                        <button
                            key={props.id + "-" + item}
                            className="btn btn-outline-success col-6-sm"
                            name={props.arrayKey} // should be the same as the key in the state
                            onClick={props.removeFunc}
                            value={item}>{item}</button>
                    ))}
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