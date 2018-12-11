import React, {Component} from 'react';
import './UserStats.css';
import UserTable from './UserTable';

class UserStats extends Component {
    constructor(props){
        super();
        this.state = {
            //arrays to store all data
            commentData: [],
            submissionData: [],
            
            submissionCount: 0,
            
            username: '',//'gamertag-vr',
            
            //option to ignore user profile
            ignoreProfile: false,
            
            //option to focus on a single sub
            focusSub: '',
            focusCount: 0,
            
            //arrays of objects keeping track of numbers
            domainsSubmittedFrom: [],
            subsSubmittedTo: [],
            accountsSubmittedFrom: [],
            subsCommentedTo: []
        }
        this.lock = false;
        this.queuedUsername = undefined;
    }
    
    render(){
        const {domainsSubmittedFrom, subsSubmittedTo, subsCommentedTo, accountsSubmittedFrom, username, submissionCount} = this.state;
        if (username.length === 0){
            return (
                <div></div>
            );
        }
        
        return (
            <div className="userStats roundedBorder">
                <div className="closeBtn slim button red roundedBorder" onClick={this.props.setUsername('')}>X</div>
                <div className="userSummary">
                    <h3>Available History for {username}</h3>
                    <p>{this.state.submissionCount} submissions.</p>
                    <p>{this.state.commentData.length} comments.</p>
                </div>
                <div className="userTables">
                    <UserTable username={username} headings={['Domains Submitted From', 'Count', '%']} data={domainsSubmittedFrom} type="domains" total={submissionCount} totalComments={this.state.commentData.length}/>
                    <UserTable username={username} headings={['Subreddit Submitted To', 'Count', '%']} data={subsSubmittedTo} type="subsSubmitted" total={submissionCount} totalComments={this.state.commentData.length}/>
                    <UserTable username={username} headings={['Subreddit Commented In', 'Count', '%']} data={subsCommentedTo} type="subsCommented" total={submissionCount} totalComments={this.state.commentData.length}/>
                    <UserTable username={username} headings={['Account Submitted From', 'Count', '%']} data={accountsSubmittedFrom} type="accounts" total={submissionCount} totalComments={this.state.commentData.length}/>
                </div>
            </div>
        )
    }
    
    componentDidUpdate(){
        if (this.state.username !== this.props.username){
            if (this.lock){
                this.queuedUsername = this.props.username;
                return;
            } else {
                this.setState({username: this.props.username}, this.gatherData);
            }
        }
    }
    
    componentDidMount(){
        this.gatherData();
    }
    
    getSubmissions = async (username, after = '') => {
        if (username.length === 0 || this.queuedUsername) return;
        try {
            const resp = await fetch('https://www.reddit.com/user/'+username+'/submitted.json?limit=100&after='+after);
            const json = await resp.json();
            
            const submissionData = this.state.submissionData;
            submissionData.push(...json.data.children);
            this.setState({submissionData}, this.analyse);
            
            if (json.data.after !== null){
                await this.getSubmissions(username, json.data.after);
            }
        } catch (err) {
            
        }
    }
    
    getComments = async (username, after = '') => {
        if (username.length === 0 || this.queuedUsername) return;
        try {
            const resp = await fetch('https://www.reddit.com/user/'+username+'/comments.json?limit=100&after='+after);
            const json = await resp.json();
            
            const commentData = this.state.commentData;
            commentData.push(...json.data.children);
            this.setState({commentData}, this.analyse);
            
            if (json.data.after !== null){
                await this.getComments(username, json.data.after);
            }
        } catch (err) {
            
        }
    }
    
    gatherData = async () => {
        if (this.lock) return;
        if (this.state.username.length > 0){
            this.lock = true;
            this.clearFullData();
            
            await this.getSubmissions(this.state.username);
            await this.getComments(this.state.username);
            
            this.lock = false;
            if (this.queuedUsername){
                let temp = this.queuedUsername;
                this.queuedUsername = undefined;
                this.setState({username: temp}, this.gatherData);
            }
            
        }
    }
    
    clearFullData = () => {
        this.setState({commentData: [], submissionData: [], domainsSubmittedFrom: [], subsSubmittedTo: [], accountsSubmittedFrom: [], subsCommentedTo: [], submissionCount: 0});
    }
    
    clearArrays = () => {
        this.setState({domainsSubmittedFrom: [], subsSubmittedTo: [], accountsSubmittedFrom: [], subsCommentedTo: [], submissionCount: 0});
    }
    
    analyse = () => {
        this.clearArrays();
        const {submissionData, commentData, ignoreProfile, username, focusSub} = this.state;
        
        let submissionCount = 0;
        const domainsSubmittedFrom = [];
        const subsSubmittedTo = [];
        const accountsSubmittedFrom = [];
        const subsCommentedTo = [];
        
        submissionData.forEach(submission => {
            let data = submission.data;
            if (ignoreProfile && data.subreddit.toLowerCase() === 'u_'+username.toLowerCase()) return;
            submissionCount++;
            this.addSubSubmitted(data, subsSubmittedTo);
            if (focusSub.length > 0 && data.subreddit.toLowerCase() !== focusSub.toLowerCase()) return;
            this.addDomain(data, domainsSubmittedFrom);                    
            this.addAccount(data, accountsSubmittedFrom);
        });
        
        commentData.forEach(comment => {
            let data = comment.data;
            this.addSubCommentedTo(data, subsCommentedTo);
        });
        
        domainsSubmittedFrom.sort((a,b) => b.count-a.count);
        subsSubmittedTo.sort((a,b) => b.count-a.count);
        accountsSubmittedFrom.sort((a,b) => b.count-a.count);
        subsCommentedTo.sort((a,b) => b.count-a.count);
        
        this.setState({submissionCount, domainsSubmittedFrom, subsSubmittedTo, accountsSubmittedFrom, subsCommentedTo});
    }
    
    addDomain = (data, domainsSubmittedFrom) => {
        let domain = data.domain;
        let existingObj = domainsSubmittedFrom.find(obj => obj.domain === domain);
        if (existingObj === undefined){
            domainsSubmittedFrom.push({domain, count:1});
        } else {
            existingObj.count++;
        }
    }
    
    addSubSubmitted = (data, subsSubmittedTo) => {
        let sub = data.subreddit;
        let existingObj = subsSubmittedTo.find(obj => obj.sub === sub);
        if (existingObj === undefined){
            subsSubmittedTo.push({sub, count:1});
        } else {
            existingObj.count++;
        }
    }
    
    addAccount = (data, accountsSubmittedFrom) => {
        let account, accountLink, provider;
        
        if (data.media && data.media.type === 'youtube.com'){
            account = data.media.oembed.author_name;
            accountLink = data.media.oembed.author_url;
            provider = data.media.oembed.provider_name;
        } else if (data.domain === 'twitter.com') {
            account = data.url.replace('https://twitter.com/','');
            let end = account.indexOf('/');
            account = account.slice(0, end);
            accountLink = data.url;
            provider = 'Twitter';
        } else if (data.media && data.media.type === 'twitch.tv'){
            account = data.media.oembed.title.replace(' - Twitch', '');
            provider = data.media.oembed.provider_name;
            accountLink = data.url;
        } else {
            return;
        }
        
        let existingObj = accountsSubmittedFrom.find(obj => obj.account === account);
        if (existingObj === undefined){
            accountsSubmittedFrom.push({account, count:1, url: accountLink, provider});
        } else {
            existingObj.count++;
        }
    }
    
    addSubCommentedTo = (data, subsCommentedTo) => {
        let sub = data.subreddit;
        let existingObj = subsCommentedTo.find(obj => obj.sub === sub);
        if (existingObj === undefined){
            subsCommentedTo.push({sub, count:1});
        } else {
            existingObj.count++;
        }
    }
    
    
}

export default UserStats;