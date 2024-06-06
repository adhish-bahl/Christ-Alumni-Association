import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import '../style/ImageCarousel.css'
import Pic1 from '../images/pic1.jpg'
import Pic2 from '../images/pic2.jpg'
import Pic3 from '../images/pic3.jpg'
import Pic4 from '../images/pic4.jpg'
import Pic5 from '../images/pic5.jpg'

function ImageCarousel() {

    const image = [Pic1, Pic2, Pic3, Pic4, Pic5]

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 === image.length ? 0 : prevIndex + 1
        );
    };
    
    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex - 1 < 0 ? image.length - 1 : prevIndex - 1
        );
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="carousel">
            <img
                key={currentIndex}
                src={image[currentIndex]}
                // src={Pic1}
            /><div className="slide_direction">
                <div className="left" onClick={handlePrevious}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 96 960 960"
                        width="20"
                    >
                        <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
                    </svg>
                </div>
                <div className="right" onClick={handleNext}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 96 960 960"
                        width="20"
                    >
                        <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
                    </svg>
                </div>
            </div>
            <div className="indicator">
                {image.map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${currentIndex === index ? "active" : ""}`}
                        onClick={() => handleDotClick(index)}
                    ></div>
                ))}
            </div>
        </div>
    )
}

export default ImageCarousel
