import React, { Component } from 'react';
import './App.css';
import Input from './components/Input';
import Region from './components/Region';
import Winners from './components/Winners';
import Stats from './components/Stats';

class App extends Component {
    constructor(){
        super();
        this.state = {
            regions: [
                {name: 'EU', qty: 1, variations: ['EU', 'Eu', 'eU', 'Europe']},
                {name: 'NA', qty: 1, variations: ['NA', 'Na', 'nA', 'North American', 'North America', 'North america', 'north america', 'N.A', 'N A']}
            ],
            ignoredUsers: [],
            url: 'https://www.reddit.com/r/PSVR/comments/9gykgl/transference_playstation_vr_game_key_giveaway_we/',
            accountAge: 4,
            winners: [],
            stats: [],
            total: 0,
            processText: 'Process',
            downloadData: '',
        };
        
        this.totalComments = 0;
    }
    
    render() {        
        return (
            <div className="App">
                <h1>Reddit Competition Parser</h1>
                <div className="grid">
                    <div className="url">
                        <label>URL</label>
                        <Input onChange={this.setUrl} value={this.state.url}/>
                    </div>
                    <div className="ignored">
                        <label>Users to Ignore</label>
                        <textarea onChange={this.setIgnored}></textarea>
                    </div>
                    <div className="regions">
                        <label>
                            Regions 
                            <span onClick={this.addRegion} className="addRegionBtn button green">+</span>
                            <span onClick={this.removeRegion} className="addRegionBtn button red">-</span>
                        </label>
                        {
                            this.state.regions.map((region, i) => {
                                return <Region setName={this.setRegionName} setVariations={this.setRegionVariations} setQty={this.setRegionQty} 
                                                name={region.name} variations={region.variations} qty={region.qty} index={i} key={i}/>
                            })
                        }
                    </div>
                    <div className="processBtn">
                        <button onClick={this.getComments} className="button green">{this.state.processText}</button>
                    </div>
                    <Stats stats={this.state.stats} total={this.state.total} downloadData={this.state.downloadData}/>
                    <Winners winners={this.state.winners}/>
                    
                </div>
            </div>
        );
    }
    
    setUrl = (e) => {
        this.setState({url: e.target.value});
    }
    
    setRegionName = (e) => {
        const regions = this.state.regions;
        const index = e.target.getAttribute('index');
        regions[index].name = e.target.value;
        
        //just to make it easier if someone removes a region but then wants it back
        if (regions[index].variations.length === 0 && regions[index].name === 'NA'){
            regions[index].variations.push(...['NA', 'Na', 'nA', 'North American', 'North America', 'North america', 'north america', 'N.A', 'N A']);
        }
        
        else if (regions[index].variations.length === 0 && regions[index].name === 'EU'){
            regions[index].variations.push(...['EU', 'Eu', 'eU', 'Europe']);
        }
        
        this.setState({regions});
    }
    
    setRegionVariations = (e) => {
        const regions = this.state.regions;
        const index = e.target.getAttribute('index');
        regions[index].variations = e.target.value.split(',').map(val => val.trim());
        this.setState({regions});
    }
    
    setRegionQty = (e) => {
        const regions = this.state.regions;
        const index = e.target.getAttribute('index');
        regions[index].qty = e.target.value;
        this.setState({regions});
    };
    
    setIgnored = (e) => {
        this.setState({ignoredUsers: e.target.value.split('\n')});
    };
    
    addRegion = () => {
        const regions = this.state.regions;
        regions.push({name: '', qty: 1, variations: []});
        this.setState({regions});
    }
    
    removeRegion = () => {
        const regions = this.state.regions;
        regions.pop();
        this.setState({regions});
    }
    
    getComments = () => {
        if (this.state.url.length === 0) return;
        //get json data from Reddit
        this.totalComments = 0;
        this.setState({total: 0, winners: [], percentage: 0});
        let allComments = [];
        
        fetch(this.state.url+'.json').then(response => response.json()).then(data => {
            let comments = data[1].data.children;
            
            //keep track of percentage
            this.totalComments = comments.length;
            if (comments[comments.length-1].kind === 'more'){
                this.totalComments += comments[comments.length-1].data.count;
            }

            let array = [];
            
            //add each comments (including replies) to allComments array
            comments.forEach((comment) => {
                this.parseChild(comment, allComments, array);
            });
                        
            //if more comments exist, then recursively gather these too
            // array = [];//REMOVE WHEN DONE TESTING
            if (array && array.length > 0){
                let link_id = 't3_'+data[0].data.children[0].data.id;
                this.getMoreComments(array, link_id, allComments);
            } else {
                this.onComplete(allComments);
            }
        })
    }
    
    updatePercentage = (comments) => {
        this.setState({processText: 'Loading - ' + ((comments.length / this.totalComments) * 100).toFixed(0) + '%'});
    }
    
    getMoreComments = (array, link_id, allComments) => {
        //create string of ids to use with get request
        let string = '';
        if (array.length > 0){
            let subArray = array[0];
            for (let i = 0; i < 50; i++){
                if (subArray.length > 0){
                    string += subArray[0] + ',';
                    subArray.shift();
                } else {
                    //array.shift();
                    break;
                }
            }
            if (subArray.length === 0) array.shift();
        }
        
        string = string.slice(0,string.length-1);
        let idsThisTime = string.split(',');

        //use Reddit API to fetch comments based on id strings
        fetch('https://www.reddit.com/api/morechildren.json?api_type=json&link_id='+link_id+'&children='+string).then(resp => resp.json()).then(data => {
            let comments = data.json.data.things;

            comments.forEach((comment) => {
                if (idsThisTime.indexOf(comment.data.id) !== -1) idsThisTime.splice(idsThisTime.indexOf(comment.data.id),1);
                this.parseChild(comment, allComments, array);
            });
            
            //if comments weren't retrieved, add back to array to try again
            //if (idsThisTime.length < lengthBefore) array.push(idsThisTime);
            
            if (array.length > 0){
                this.getMoreComments(array, link_id, allComments);
            } else {
                this.onComplete(allComments);
            }
        });
    }
    
    parseChild = (child, allComments, stringsArr = null) => {
        if (child.kind === 't1'){
            let data = child.data;
            allComments.push(data);
            this.updatePercentage(allComments);
            
            if (typeof data.replies === 'object'){
                data.replies.data.children.forEach((child) => {
                    this.parseChild(child, allComments, stringsArr);
                });
            }
        } else if (child.kind === 'more' && stringsArr){
            stringsArr.push(child.data.children);
        }
    }
    
    testValue = (value, conditions) => {
        let match = false;
        conditions.forEach((condition) => {
            if (value.indexOf(condition) !== -1) match = true;
        });
        return match;
    }
    
    testRegions = (comment, regions, extras) => {
        //first, check value against each region and set to true or false
        let result = {};
        Object.keys(regions).forEach((region) => {
            result[region] = this.testValue(comment.body, regions[region].conditions);
        });
        
        //count how many regions value tested against
        let count = 0;
        Object.values(result).forEach((val) => {
            if (val) count++;
        });
        
        //if multiple regions, put in others array, otherwise put in region array
        if (count > 1 || count < 1) {
            extras.others.push(comment);
        } else {
            Object.keys(result).forEach((region) => {
                if (result[region]) regions[region].array.push(comment);
            });
        }
    }
    
    sortComments = (comments, regions, extras, map) => {
        let previousWinners = this.state.ignoredUsers;
        
        comments.forEach((comment) => {
            let body = comment.body;
            let author = comment.author;
                    
            //replace commas and new lines with full stop - otherwise affect the csv formatting
            body = body.replace(/,/g, '. ');
            body = body.replace(/\n/g, '. ');
            
            //check if author is a previous winner and skip if true
            if (previousWinners.indexOf(author) !== -1){
                extras.ignored.push({author, body});
                return;
            }
            
            //if authors name is unkonwn, add to extras array
            if (author === '[deleted]'){
                extras.others.push({author, body});
                return;
            }
            
            //if author hasn't already posted a comment, then add to correct list
            if (!map[author]) {
                map[author] = true;
                this.testRegions({author, body}, regions, extras);
            } else {
                extras.duplicates.push({author, body});
            }
        });
    };
    
    onComplete = (comments) => {        
        let regions = {};
        
        this.state.regions.forEach(region => {
            regions[region.name] = {
                name: region.name,
                conditions: region.variations,
                array: [],
                qty: region.qty
            };
        });
        
        let extras = {
            others: [],
            duplicates: [],
            ignored: []
        };
        
        let map = {};
        let downloadData = "ID,Username,Type,Text\n";
                
        //loop through each comment posted
        this.sortComments(comments, regions, extras, map);
            
        //convert each list to csv format
        function parseList(list, type, hasId){
            type = type[0].toUpperCase() + type.slice(1);
            list.forEach((item, index) => {
                if (hasId) downloadData += (index+1) + ','; else downloadData += ',';
                downloadData += item.author + ',' + type + ',' + item.body;
                downloadData += '\n';
            });
        }
        
        let stats = [];
        let total = 0;
        
        //parse all regions and extras
        Object.values(regions).forEach((region) => {
            parseList(region.array, region.name, true);
            stats.push({
                name: region.name,
                qty: region.array.length
            });
            total += region.array.length;
        });
        Object.keys(extras).forEach((extra) => {
            parseList(extras[extra], extra, false);
            stats.push({
                name: extra,
                qty: extras[extra].length
            });
            total += extras[extra].length;
        });
        
        //pick some winners
        const winners = [];
        Object.values(regions).forEach(region => {
            let obj = {name: region.name, arr: []};
            let numbers = [];
            for (let i = 0; i < region.qty; i++){
                let random = parseInt(Math.random()*region.array.length);
                while (numbers.includes(random)) random = parseInt(Math.random()*region.array.length);
                numbers.push(random);
                const chosen = region.array[random];
                obj.arr.push(chosen);
            }
            winners.push(obj);
        });
                
        this.setState({stats, total, processText: 'Process', downloadData: encodeURI(downloadData), winners});
    }
}

export default App;
