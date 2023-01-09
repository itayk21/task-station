import React from 'react';
import './Specializations.css';

const Specializations = ({}) => {
    return (
        <divn className="specializations_container">
            <div className="specializations_list">
                <div className="specializations_item">
                    <div>
                        <p>text</p>
                    </div>
                    <div className="specializations_item_actions">
                        <span>🗑</span>
                    </div>
                </div>
                <div className="specializations_item">item</div>
            </div>
            <div>
                <input type="text" />
                <button>Send</button>
            </div>
        </divn>
    );
}

export default Specializations;