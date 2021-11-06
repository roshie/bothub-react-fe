import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function Product(props) {
    return (
            <Carousel>
                <div>
                    <img src="IOT.jfif" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="IOT.jfif" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="IOT.jfif" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        );
    }

    ReactDOM.render(<Product/>, document.getElementById('root'));
