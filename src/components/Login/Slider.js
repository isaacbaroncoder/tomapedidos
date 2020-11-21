// Import modules
import React from 'react';
import SlideOne from '../../assets/slider01.png';
import SlideTwo from '../../assets/slider02.png';

// Import styles
import './styles/Slider.css';

const Slider = ()=>{
    return(
        <div className='slider'>
            <div className='slide'>
                <img src={SlideOne} alt=""/>
                <h3>Lorem ipsum dolor sit ame</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu felis eget felis pharetra posuere. Vestibulum venenatis est nec mauris vehicula consectetur.</p>
            </div>
            <div className='slide'>
                <img src={SlideTwo} alt=""/>
                <h3>Lorem ipsum dolor sit ame</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu felis eget felis pharetra posuere. Vestibulum venenatis est nec mauris vehicula consectetur.</p>
            </div>
        </div>
    );
}

export default Slider;