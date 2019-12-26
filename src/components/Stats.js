import React from 'react';
import './Stats.css';

const Stats = ({stats, total, downloadData}) => {
    if (stats.length === 0) return <div></div>;
    
    return (
        <div className="stats roundedBorder">
            <label>Stats</label>
            {
                stats.map((stat, i) => {
                    if (stat.qty === -1) return <div key={i}><strong>{stat.name}</strong></div>;
                    return <div key={i}>{stat.name} - {stat.qty}</div>;
                })
            }
            <div>Total - {total}</div>
            <a href={"data:text/csv;charset=utf-8,"+downloadData} target="_blank" download="list.csv" rel="noopener noreferrer">Download</a>
        </div>
    );
};

export default Stats;