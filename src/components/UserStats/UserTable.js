import React from 'react';

const UserTable = ({headings, data, type, total, username, totalComments}) => {
    return (
        <div className="tableDiv">
            <table className="userTable">
                <thead>
                    <tr>
                        {
                            headings.map((heading,i) => <td key={i}>{heading}</td>)
                        }
                    </tr>
                </thead>
                {
                    data && data.length > 0 ? (
                        <tbody>
                            {
                                data.map((obj, i) => {
                                    return getCells(obj, i);
                                })
                            }
                        </tbody>
                        
                    ) : <tbody></tbody>
                }
            </table>
        </div>
    );
    
    function getCells(obj, i){
        if (type === 'domains'){
            return (
                <tr key={i}>
                    <td>{obj.domain}</td>
                    <td>{obj.count}</td>
                    <td>{((obj.count/total)*100).toFixed(0)}%</td>
                </tr>
            )
        } else if (type === 'subsSubmitted'){
            return (
                <tr key={i}>
                    <td><a href={"https://www.reddit.com/r/"+obj.sub+"/search?q=author%3A"+username+"&restrict_sr=on&sort=new&feature=legacy_search"} target="_blank" rel="noopener noreferrer">{obj.sub}</a></td>
                    <td>{obj.count}</td>
                    <td>{((obj.count/total)*100).toFixed(0)}%</td>
                </tr>
            )
        } else if (type === 'subsCommented'){
            return (
                <tr key={i}>
                    <td>{obj.sub}</td>
                    <td>{obj.count}</td>
                    <td>{((obj.count/totalComments)*100).toFixed(0)}%</td>
                </tr>
            )
        } else if (type === 'accounts'){
            return (
                <tr key={i}>
                    <td><a href={obj.url} target="_blank" rel="noopener noreferrer">{obj.account+' - '+obj.provider}</a></td>
                    <td>{obj.count}</td>
                    <td>{((obj.count/total)*100).toFixed(0)}%</td>
                </tr>
            )
        } else {
            return (
                <tr key={i}></tr>
            )
        }
    }
};

export default UserTable;