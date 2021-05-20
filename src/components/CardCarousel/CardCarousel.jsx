import React from 'react';
import './CardCarousel.css';
import { Card } from 'semantic-ui-react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const CardCarousel = ({ title, description, elements }) => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    };


    return (<>
        <h2>{title}</h2>
        <h3>{description}</h3>
        <Carousel responsive={responsive}
        swipeable={true}
        draggable={true}
        dotListClass="custom-dot-list-style"
        showDots={true}>
            {
                elements.map((element, index) => (
                    <div className="carousel-padding">
                        <a href={element.url} target="_blank" rel="noreferrer">
                            <Card>
                                <Card.Content header={element.title} />
                                {
                                    element.description &&
                                    <Card.Content description={element.description} />
                                }
                            </Card>
                        </a>
                    </div>
                )
                )}
        </Carousel>
    </>
    );
};

export default CardCarousel;
