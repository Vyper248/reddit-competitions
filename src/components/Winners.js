import React from 'react';
import './Winners.css';

const Winners = ({winners, pickWinners, selectWinner, total, method, status}) => {
    let buttonText = 'Pick Winners';
    if (status === 0) buttonText = 'Loading...';
    
    if (winners.length === 0 && total > 0) {
        return <div className="winners roundedBorder"><button className="button green" onClick={pickWinners}>{buttonText}</button></div>;
    } else if (winners.length === 0) {
        return <div></div>;
    }

    return (
        <div className="winners roundedBorder">
            <button className="button green" onClick={pickWinners}>{buttonText}</button>
            <p>Method used for random numbers: {method}</p>
            <label>Winners</label>
            <p>(Select one for user history)</p>
            <div className="winnerRegions">
                {
                    winners.map((region, i) => {
                        return (
                            <div className="winnerRegion roundedBorder" key={i}>
                                <label>{region.name}</label>
                                {
                                    region.arr.map((winner, i) => {
                                        return (
                                            <div key={i}>
                                                <input type="radio" name="winner" onClick={selectWinner(winner.author)}/><a href={"https://www.reddit.com/user/"+winner.author} target="_blank" rel="noopener noreferrer">{winner.author}</a>
                                            </div>
                                        )
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