import React, { Component } from 'react';
import './App.css';
import Input from './components/Input';
import Region from './components/Region';
import Winners from './components/Winners';
import Stats from './components/Stats';
import UserStats from './components/UserStats/UserStats';

class App extends Component {
    constructor(){
        super();
        this.state = {
            regions: [
                {name: 'EU', qty: 1, variations: ['EU', 'Eu', 'eU', 'Europe', 'UK']},
                {name: 'NA', qty: 1, variations: ['NA', 'Na', 'nA', 'North American', 'North America', 'North america', 'north america', 'N.A', 'N A', 'US', 'N/A']},
                {name: '', qty: 0, variations: []}
            ],
            ignoredUsers: [],
            url: '',
            winners: [],
            winnersMethod: 'Random.org',
            winnersStatus: 1,
            selectedWinner: '',
            stats: [],
            total: 0,
            processText: 'Process',
            processBlock: false,
            downloadData: '',
            status: 0
        };
        
        this.totalComments = 0;
        this.results = {};
        this.comments = [];
        this.currentURL = '';
    }
    
    render() {    
        
        let processClass = 'button green';
        if (this.state.processBlock) processClass = 'button disabled';
        
        return (
            <div className="App">
                <h1>Reddit Competition Parser</h1>
                <div className="grid">
                    <div className="url">
                        <label>URL</label>
                        <div className="example">Example: <input type="test" value="https://www.reddit.com/r/PSVR/comments/9gykgl/transference_playstation_vr_game_key_giveaway_we/" readOnly/></div>
                        <Input onChange={this.setUrl} value={this.state.url} placeholder='URL'/>
                    </div>
                    <div className="ignored">
                        <label>Users to Ignore</label>
                        <textarea onChange={this.setIgnored} placeholder="Such as previous winners. (Must be separated by a new line)"></textarea>
                    </div>
                    <div className="regions">
                        <label>
                            Regions 
                            <span onClick={this.addRegion} className="slim button green">+</span>
                            <span onClick={this.removeRegion} className="slim button red">-</span>
                        </label>
                        {
                            this.state.regions.map((region, i) => {
                                return <Region setName={this.setRegionName} setVariations={this.setRegionVariations} setQty={this.setRegionQty} 
                                                name={region.name} variations={region.variations} qty={region.qty} index={i} key={i}/>
                            })
                        }
                    </div>
                    <div className="processBtn">
                        <button onClick={this.getComments} className={processClass}>{this.state.processText}</button>
                    </div>
                    <Stats stats={this.state.stats} total={this.state.total} downloadData={this.state.downloadData}/>
                    <Winners winners={this.state.winners} pickWinners={this.pickWinners} selectWinner={this.selectWinner} total={this.state.total} method={this.state.winnersMethod} status={this.state.winnersStatus}/>
                    <UserStats username={this.state.selectedWinner} setUsername={this.selectWinner}/>
                </div>
            </div>
        );
    }
    
    setUrl = (e) => {
        this.setState({url: e.target.value});
        if (e.target.value !== this.currentURL){
            this.setState({processBlock: false, processText: 'Process'});
        } else {
            this.setState({processBlock: true, processText: 'Process'});
        }
    }
    
    setRegionName = (e) => {
        const regions = this.state.regions;
        const index = e.target.getAttribute('index');
        regions[index].name = e.target.value;
        
        //just to make it easier if someone removes a region but then wants it back
        if (regions[index].variations.length === 0 && regions[index].name === 'NA'){
            regions[index].variations.push(...['NA', 'Na', 'nA', 'North American', 'North America', 'North america', 'north america', 'N.A', 'N A', 'US', 'N/A']);
        }
        
        else if (regions[index].variations.length === 0 && regions[index].name === 'EU'){
            regions[index].variations.push(...['EU', 'Eu', 'eU', 'Europe', 'UK']);
        }
        
        this.setState({regions});
    }
    
    setRegionVariations = (e) => {
        const regions = this.state.regions;
        const index = e.target.getAttribute('index');
        regions[index].variations = e.target.value.split(',').map(val => val.trim());
        this.setState({regions}, () => {
            if (this.comments.length > 0) this.onComplete(this.comments);
        });
    }
    
    setRegionQty = (e) => {
        const regions = this.state.regions;
        const index = e.target.getAttribute('index');
        regions[index].qty = parseInt(e.target.value) || '';
        this.setState({regions});
    };
    
    setIgnored = (e) => {
        this.setState({ignoredUsers: e.target.value.split('\n')}, ()=>{
            if (this.comments.length > 0) this.onComplete(this.comments);
        });
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
    
    selectWinner = (selectedWinner) => {
        return () => {
            this.setState({selectedWinner});
        };
    };
    
    getComments = () => {
        if (this.state.url.length === 0 || this.state.status === 1 || this.state.processBlock) return;
        //get json data from Reddit
        this.totalComments = 0;
        this.setState({total: 0, winners: [], stats: [], percentage: 0, processText: 'Loading..', status: 1});
        let allComments = [];
        
        fetch(this.state.url+'.json').then(this.handleErrors).then(response => response.json()).then(data => {
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
        }).catch(err => {
            this.setState({status: 0, processText: 'Process', processBlock: false});
        });
    }
    
    handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
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
            if (condition.length === 0) return;
            if (value.indexOf(condition) !== -1) match = true;
            if (value.toLowerCase() === condition.toLowerCase()) match = true; // test for exact match ignoring case
        });
        return match;
    }
    
    testRegions = (comment, regions, extras, map) => {
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
                if (result[region]) {
                    regions[region].array.push(comment);
                    map[comment.author] = true;
                }
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
                this.testRegions({author, body}, regions, extras, map);
            } else {
                extras.duplicates.push({author, body});
            }
        });
    };
    
    onComplete = (comments) => {        
        this.comments = comments;
        this.currentURL = this.state.url;
        let regions = {};
        
        this.state.regions.forEach(region => {
            if (region.name.length === 0) return;
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
                hasId ? downloadData += (index+1) + ',' : downloadData += ',';
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
        
        this.results = regions;
        
        //pick some winners
        //this.pickWinners();
                
        this.setState({stats, total, status: 0, processText: 'Process', downloadData: encodeURI(downloadData), processBlock: true});
    }
    
    pickWinners = async () => {
        const winners = [];
        
        this.state.regions.forEach(region => {
            if (region.name.length === 0) return;
            this.results[region.name].qty = region.qty;
        });
        
        const regions = Object.values(this.results);
        for await (let region of regions){
            let obj = {name: region.name, arr: []};
            let randomNumbers = await this.getRandomNumbers(region.qty, region.array.length);
            for (let i = 0; i < region.qty; i++){
                let random = randomNumbers.shift();
                const chosen = region.array[random];
                chosen.id = random+1;
                if (chosen) obj.arr.push(chosen);
            }
            winners.push(obj);
        }    
        
        this.setState({winners});
    }
    
    getRandomNumbers = async (qty, max) => {
        // fetching from Random.org
        this.setState({winnersStatus: 0});
        try {
            const resp = await fetch('https://api.random.org/json-rpc/1/invoke', {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                referrer: "no-referrer",
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'generateIntegers',
                    params: {
                        apiKey: '68ae5679-2cbb-4b25-8ab0-f0da1a524c21',
                        n: qty,
                        min: 1,
                        max: max,
                        replacement: false,
                    },
                    id: 1
                })
            });
            const data = await resp.json();
            
            this.setState({winnersStatus: 1});

            if (data.error){
                this.setState({winnersMethod: 'Math.random()'});
                return this.randomNumberFallback(qty, max);
            } else {
                const requestsLeft = data.result.requestsLeft;
                this.setState({winnersMethod: 'Random.org - Requests remaining: '+requestsLeft});
                return data.result.random.data;
            }
        } catch(err) {
            this.setState({winnersMethod: 'Math.random()'});
            this.setState({winnersStatus: 1});
            return this.randomNumberFallback(qty, max);
        }
    };
    
    randomNumberFallback = (qty, max) => {
        let numbers = [];
        for (let i = 0; i < qty; i++){
            let random = parseInt(Math.random()*max);
            while (numbers.includes(random)) random = parseInt(Math.random()*max);
            numbers.push(random);
        }
        return numbers;
    }
}

export default App;
