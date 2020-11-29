// Import modules
import React from 'react';
import Footer from '../Footer/Footer'

// Import styles
import './styles/ViewDraft.css'

const ViewDraft = ({title})=>{
    return(
        <div className="viewDraftContainer">
            <h2 className='title'>
                {title}
            </h2>
            <Footer />
        </div>
    );
}

export default ViewDraft;