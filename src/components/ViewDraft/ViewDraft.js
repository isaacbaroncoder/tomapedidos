// Import modules
import React from 'react';

// Import styles
import './styles/ViewDraft.css'

const ViewDraft = ({title})=>{
    return(
        <div className="viewDraftContainer">
            <h2 className='title'>
                {title}
            </h2>
        </div>
    );
}

export default ViewDraft;