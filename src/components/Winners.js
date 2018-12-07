import React from 'react';
import './Winners.css';

const Winners = ({winners, pickWinners}) => {
    if (winners.length === 0){
        return <div></div>;
    }
    
    return (
        <div className="winners roundedBorder">
            <label>Winners - <span className="slim button green" onClick={pickWinners}>Pick Again</span></label>
            <div className="winnerRegions">
                {
                    winners.map((region, i) => {
                        return (
                            <div className="winnerRegion roundedBorder" key={i}>
                                <label>{region.name}</label>
                                {
                                    region.arr.map((winner, i) => {
                                        return <div key={i}>{winner.author}</div>
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default Winners;