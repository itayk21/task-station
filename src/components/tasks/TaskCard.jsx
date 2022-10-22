import React from 'react'

const TaskCard = ({ data, onClickTitle }) => {

    const { titleName, description, date, time } = data;


    return (
        <div>
            <div className='card' >
                <div className='titleCardFrame' onClick={e => onClickTitle()}>
                    <p className='titleCard'>{titleName}</p>
                </div>
                <div className='descriptionFrame'>
                    <p className='description'>{description}</p>
                </div>

                <div className='dateTime'>
                    <span className='date'>{date}</span>
                    <span className='time'>{time}</span>
                </div>
            </div>
        </div>
    )
}

export default TaskCard