(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,,,function(e,t,n){e.exports=n(34)},,,,,,function(e,t,n){},,,,function(e,t,n){},,function(e,t,n){},,function(e,t,n){},,function(e,t,n){},,function(e,t,n){},,function(e,t,n){},,function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(10),o=n.n(s),i=(n(18),n(1)),u=n.n(i),c=n(2),l=n(3),m=n(4),d=n(6),h=n(5),p=n(7),f=n(11),b=(n(22),n(24),function(e){var t=e.onChange,n=e.value,a=e.index,s=e.placeholder;return 0===n&&(n=""),r.a.createElement("div",null,r.a.createElement("input",{className:"input roundedBorder",type:"text",onChange:t,value:n,index:a,placeholder:s}))}),g=(n(26),function(e){var t=e.setName,n=e.setVariations,a=e.setQty,s=e.name,o=e.variations,i=e.qty,u=e.index;return r.a.createElement("div",{className:"region"},r.a.createElement(b,{onChange:t,value:s,index:u,placeholder:"Region"}),r.a.createElement(b,{onChange:n,value:o.join(","),index:u,placeholder:"Words to look for"}),r.a.createElement(b,{onChange:a,value:i,index:u,placeholder:"Qty"}))}),v=(n(28),function(e){var t=e.winners,n=e.pickWinners,a=e.selectWinner,s=e.total,o=e.method,i="Pick Winners";return 0===e.status&&(i="Loading..."),0===t.length&&s>0?r.a.createElement("div",{className:"winners roundedBorder"},r.a.createElement("button",{className:"button green",onClick:n},i)):0===t.length?r.a.createElement("div",null):r.a.createElement("div",{className:"winners roundedBorder"},r.a.createElement("button",{className:"button green",onClick:n},i),r.a.createElement("p",null,"Method used for random numbers: ",o),r.a.createElement("label",null,"Winners"),r.a.createElement("div",{className:"winnerRegions"},t.map(function(e,t){return r.a.createElement("div",{className:"winnerRegion roundedBorder",key:t},r.a.createElement("label",null,e.name),e.arr.map(function(e,t){return r.a.createElement("div",{key:t,onClick:a(e.author)},e.author)}))})))}),E=(n(30),function(e){var t=e.stats,n=e.total,a=e.downloadData;return 0===t.length?r.a.createElement("div",null):r.a.createElement("div",{className:"stats roundedBorder"},r.a.createElement("label",null,"Stats"),t.map(function(e,t){return r.a.createElement("div",{key:t},e.name," - ",e.qty)}),r.a.createElement("div",null,"Total - ",n),r.a.createElement("a",{href:"data:text/csv;charset=utf-8,"+a,target:"_blank",download:"list.csv",rel:"noopener noreferrer"},"Download"))}),y=n(8),w=(n(32),function(e){var t=e.headings,n=e.data,a=e.type,s=e.total,o=e.username,i=e.totalComments;return r.a.createElement("div",{className:"tableDiv"},r.a.createElement("table",{className:"userTable"},r.a.createElement("thead",null,r.a.createElement("tr",null,t.map(function(e,t){return r.a.createElement("td",{key:t},e)}))),n&&n.length>0?r.a.createElement("tbody",null,n.map(function(e,t){return function(e,t){return"domains"===a?r.a.createElement("tr",{key:t},r.a.createElement("td",null,e.domain),r.a.createElement("td",null,e.count),r.a.createElement("td",null,(e.count/s*100).toFixed(0),"%")):"subsSubmitted"===a?r.a.createElement("tr",{key:t},r.a.createElement("td",null,r.a.createElement("a",{href:"https://www.reddit.com/r/"+e.sub+"/search?q=author%3A"+o+"&restrict_sr=on&sort=new&feature=legacy_search",target:"_blank",rel:"noopener noreferrer"},e.sub)),r.a.createElement("td",null,e.count),r.a.createElement("td",null,(e.count/s*100).toFixed(0),"%")):"subsCommented"===a?r.a.createElement("tr",{key:t},r.a.createElement("td",null,e.sub),r.a.createElement("td",null,e.count),r.a.createElement("td",null,(e.count/i*100).toFixed(0),"%")):"accounts"===a?r.a.createElement("tr",{key:t},r.a.createElement("td",null,r.a.createElement("a",{href:e.url,target:"_blank",rel:"noopener noreferrer"},e.account+" - "+e.provider)),r.a.createElement("td",null,e.count),r.a.createElement("td",null,(e.count/s*100).toFixed(0),"%")):r.a.createElement("tr",{key:t})}(e,t)})):r.a.createElement("tbody",null)))}),k=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(d.a)(this,Object(h.a)(t).call(this))).getSubmissions=function(){var e=Object(c.a)(u.a.mark(function e(t){var a,r,s,o,i=arguments;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a=i.length>1&&void 0!==i[1]?i[1]:"",0!==t.length&&!n.queuedUsername){e.next=3;break}return e.abrupt("return");case 3:return e.prev=3,e.next=6,fetch("https://www.reddit.com/user/"+t+"/submitted.json?limit=100&after="+a);case 6:return r=e.sent,e.next=9,r.json();case 9:if(s=e.sent,(o=n.state.submissionData).push.apply(o,Object(y.a)(s.data.children)),n.setState({submissionData:o},n.analyse),null===s.data.after){e.next=16;break}return e.next=16,n.getSubmissions(t,s.data.after);case 16:e.next=20;break;case 18:e.prev=18,e.t0=e.catch(3);case 20:case"end":return e.stop()}},e,this,[[3,18]])}));return function(t){return e.apply(this,arguments)}}(),n.getComments=function(){var e=Object(c.a)(u.a.mark(function e(t){var a,r,s,o,i=arguments;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a=i.length>1&&void 0!==i[1]?i[1]:"",0!==t.length&&!n.queuedUsername){e.next=3;break}return e.abrupt("return");case 3:return e.prev=3,e.next=6,fetch("https://www.reddit.com/user/"+t+"/comments.json?limit=100&after="+a);case 6:return r=e.sent,e.next=9,r.json();case 9:if(s=e.sent,(o=n.state.commentData).push.apply(o,Object(y.a)(s.data.children)),n.setState({commentData:o},n.analyse),null===s.data.after){e.next=16;break}return e.next=16,n.getComments(t,s.data.after);case 16:e.next=20;break;case 18:e.prev=18,e.t0=e.catch(3);case 20:case"end":return e.stop()}},e,this,[[3,18]])}));return function(t){return e.apply(this,arguments)}}(),n.gatherData=Object(c.a)(u.a.mark(function e(){var t;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.lock){e.next=2;break}return e.abrupt("return");case 2:if(!(n.state.username.length>0)){e.next=11;break}return n.lock=!0,n.clearFullData(),e.next=7,n.getSubmissions(n.state.username);case 7:return e.next=9,n.getComments(n.state.username);case 9:n.lock=!1,n.queuedUsername&&(t=n.queuedUsername,n.queuedUsername=void 0,n.setState({username:t},n.gatherData));case 11:case"end":return e.stop()}},e,this)})),n.clearFullData=function(){n.setState({commentData:[],submissionData:[],domainsSubmittedFrom:[],subsSubmittedTo:[],accountsSubmittedFrom:[],subsCommentedTo:[],submissionCount:0})},n.clearArrays=function(){n.setState({domainsSubmittedFrom:[],subsSubmittedTo:[],accountsSubmittedFrom:[],subsCommentedTo:[],submissionCount:0})},n.analyse=function(){n.clearArrays();var e=n.state,t=e.submissionData,a=e.commentData,r=e.ignoreProfile,s=e.username,o=e.focusSub,i=0,u=[],c=[],l=[],m=[];t.forEach(function(e){var t=e.data;r&&t.subreddit.toLowerCase()==="u_"+s.toLowerCase()||(i++,n.addSubSubmitted(t,c),o.length>0&&t.subreddit.toLowerCase()!==o.toLowerCase()||(n.addDomain(t,u),n.addAccount(t,l)))}),a.forEach(function(e){var t=e.data;n.addSubCommentedTo(t,m)}),u.sort(function(e,t){return t.count-e.count}),c.sort(function(e,t){return t.count-e.count}),l.sort(function(e,t){return t.count-e.count}),m.sort(function(e,t){return t.count-e.count}),n.setState({submissionCount:i,domainsSubmittedFrom:u,subsSubmittedTo:c,accountsSubmittedFrom:l,subsCommentedTo:m})},n.addDomain=function(e,t){var n=e.domain,a=t.find(function(e){return e.domain===n});void 0===a?t.push({domain:n,count:1}):a.count++},n.addSubSubmitted=function(e,t){var n=e.subreddit,a=t.find(function(e){return e.sub===n});void 0===a?t.push({sub:n,count:1}):a.count++},n.addAccount=function(e,t){var n,a,r;if(e.media&&"youtube.com"===e.media.type)n=e.media.oembed.author_name,a=e.media.oembed.author_url,r=e.media.oembed.provider_name;else if("twitter.com"===e.domain){var s=(n=e.url.replace("https://twitter.com/","")).indexOf("/");n=n.slice(0,s),a=e.url,r="Twitter"}else{if(!e.media||"twitch.tv"!==e.media.type)return;n=e.media.oembed.title.replace(" - Twitch",""),r=e.media.oembed.provider_name,a=e.url}var o=t.find(function(e){return e.account===n});void 0===o?t.push({account:n,count:1,url:a,provider:r}):o.count++},n.addSubCommentedTo=function(e,t){var n=e.subreddit,a=t.find(function(e){return e.sub===n});void 0===a?t.push({sub:n,count:1}):a.count++},n.state={commentData:[],submissionData:[],submissionCount:0,username:"",ignoreProfile:!1,focusSub:"",focusCount:0,domainsSubmittedFrom:[],subsSubmittedTo:[],accountsSubmittedFrom:[],subsCommentedTo:[]},n.lock=!1,n.queuedUsername=void 0,n}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.state,t=e.domainsSubmittedFrom,n=e.subsSubmittedTo,a=e.subsCommentedTo,s=e.accountsSubmittedFrom,o=e.username,i=e.submissionCount;return 0===o.length?r.a.createElement("div",null):r.a.createElement("div",{className:"userStats roundedBorder"},r.a.createElement("div",{className:"closeBtn slim button red roundedBorder",onClick:this.props.setUsername("")},"X"),r.a.createElement("div",{className:"userSummary"},r.a.createElement("h3",null,"Available History for ",o),r.a.createElement("p",null,this.state.submissionCount," submissions."),r.a.createElement("p",null,this.state.commentData.length," comments.")),r.a.createElement("div",{className:"userTables"},r.a.createElement(w,{username:o,headings:["Domains Submitted From","Count","%"],data:t,type:"domains",total:i,totalComments:this.state.commentData.length}),r.a.createElement(w,{username:o,headings:["Subreddit Submitted To","Count","%"],data:n,type:"subsSubmitted",total:i,totalComments:this.state.commentData.length}),r.a.createElement(w,{username:o,headings:["Subreddit Commented In","Count","%"],data:a,type:"subsCommented",total:i,totalComments:this.state.commentData.length}),r.a.createElement(w,{username:o,headings:["Account Submitted From","Count","%"],data:s,type:"accounts",total:i,totalComments:this.state.commentData.length})))}},{key:"componentDidUpdate",value:function(){if(this.state.username!==this.props.username){if(this.lock)return void(this.queuedUsername=this.props.username);this.setState({username:this.props.username},this.gatherData)}}},{key:"componentDidMount",value:function(){this.gatherData()}}]),t}(a.Component),S=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(d.a)(this,Object(h.a)(t).call(this))).setUrl=function(t){e.setState({url:t.target.value}),t.target.value!==e.currentURL?e.setState({processBlock:!1,processText:"Process"}):e.setState({processBlock:!0,processText:"Process"})},e.setRegionName=function(t){var n,a=e.state.regions,r=t.target.getAttribute("index");if(a[r].name=t.target.value,0===a[r].variations.length&&"NA"===a[r].name)(n=a[r].variations).push.apply(n,["NA","Na","nA","North American","North America","North america","north america","N.A","N A","US"]);else if(0===a[r].variations.length&&"EU"===a[r].name){var s;(s=a[r].variations).push.apply(s,["EU","Eu","eU","Europe","UK"])}e.setState({regions:a})},e.setRegionVariations=function(t){var n=e.state.regions;n[t.target.getAttribute("index")].variations=t.target.value.split(",").map(function(e){return e.trim()}),e.setState({regions:n},function(){e.comments.length>0&&e.onComplete(e.comments)})},e.setRegionQty=function(t){var n=e.state.regions;n[t.target.getAttribute("index")].qty=parseInt(t.target.value)||"",e.setState({regions:n})},e.setIgnored=function(t){e.setState({ignoredUsers:t.target.value.split("\n")},function(){e.comments.length>0&&e.onComplete(e.comments)})},e.addRegion=function(){var t=e.state.regions;t.push({name:"",qty:1,variations:[]}),e.setState({regions:t})},e.removeRegion=function(){var t=e.state.regions;t.pop(),e.setState({regions:t})},e.selectWinner=function(t){return function(){e.setState({selectedWinner:t})}},e.getComments=function(){if(0!==e.state.url.length&&1!==e.state.status&&!e.state.processBlock){e.totalComments=0,e.setState({total:0,winners:[],stats:[],percentage:0,processText:"Loading..",status:1});var t=[];fetch(e.state.url+".json").then(function(e){return e.json()}).then(function(n){var a=n[1].data.children;e.totalComments=a.length,"more"===a[a.length-1].kind&&(e.totalComments+=a[a.length-1].data.count);var r=[];if(a.forEach(function(n){e.parseChild(n,t,r)}),r&&r.length>0){var s="t3_"+n[0].data.children[0].data.id;e.getMoreComments(r,s,t)}else e.onComplete(t)})}},e.updatePercentage=function(t){e.setState({processText:"Loading - "+(t.length/e.totalComments*100).toFixed(0)+"%"})},e.getMoreComments=function(t,n,a){var r="";if(t.length>0){for(var s=t[0],o=0;o<50&&s.length>0;o++)r+=s[0]+",",s.shift();0===s.length&&t.shift()}var i=(r=r.slice(0,r.length-1)).split(",");fetch("https://www.reddit.com/api/morechildren.json?api_type=json&link_id="+n+"&children="+r).then(function(e){return e.json()}).then(function(r){r.json.data.things.forEach(function(n){-1!==i.indexOf(n.data.id)&&i.splice(i.indexOf(n.data.id),1),e.parseChild(n,a,t)}),t.length>0?e.getMoreComments(t,n,a):e.onComplete(a)})},e.parseChild=function(t,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if("t1"===t.kind){var r=t.data;n.push(r),e.updatePercentage(n),"object"===typeof r.replies&&r.replies.data.children.forEach(function(t){e.parseChild(t,n,a)})}else"more"===t.kind&&a&&a.push(t.data.children)},e.testValue=function(e,t){var n=!1;return t.forEach(function(t){0!==t.length&&-1!==e.indexOf(t)&&(n=!0)}),n},e.testRegions=function(t,n,a,r){var s={};Object.keys(n).forEach(function(a){s[a]=e.testValue(t.body,n[a].conditions)});var o=0;Object.values(s).forEach(function(e){e&&o++}),o>1||o<1?a.others.push(t):Object.keys(s).forEach(function(e){s[e]&&(n[e].array.push(t),r[t.author]=!0)})},e.sortComments=function(t,n,a,r){var s=e.state.ignoredUsers;t.forEach(function(t){var o=t.body,i=t.author;o=(o=o.replace(/,/g,". ")).replace(/\n/g,". "),-1===s.indexOf(i)?"[deleted]"!==i?r[i]?a.duplicates.push({author:i,body:o}):e.testRegions({author:i,body:o},n,a,r):a.others.push({author:i,body:o}):a.ignored.push({author:i,body:o})})},e.onComplete=function(t){e.comments=t,e.currentURL=e.state.url;var n={};e.state.regions.forEach(function(e){0!==e.name.length&&(n[e.name]={name:e.name,conditions:e.variations,array:[],qty:e.qty})});var a={others:[],duplicates:[],ignored:[]},r="ID,Username,Type,Text\n";function s(e,t,n){t=t[0].toUpperCase()+t.slice(1),e.forEach(function(e,a){r+=n?a+1+",":",",r+=e.author+","+t+","+e.body,r+="\n"})}e.sortComments(t,n,a,{});var o=[],i=0;Object.values(n).forEach(function(e){s(e.array,e.name,!0),o.push({name:e.name,qty:e.array.length}),i+=e.array.length}),Object.keys(a).forEach(function(e){s(a[e],e,!1),o.push({name:e,qty:a[e].length}),i+=a[e].length}),e.results=n,e.setState({stats:o,total:i,status:0,processText:"Process",downloadData:encodeURI(r),processBlock:!0})},e.pickWinners=Object(c.a)(u.a.mark(function t(){var n,a,r,s,o,i,c,l,m,d,h,p,b,g;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:n=[],e.state.regions.forEach(function(t){0!==t.name.length&&(e.results[t.name].qty=t.qty)}),a=Object.values(e.results),r=!0,s=!1,t.prev=5,i=Object(f.a)(a);case 7:return t.next=9,i.next();case 9:return c=t.sent,r=c.done,t.next=13,c.value;case 13:if(l=t.sent,r){t.next=25;break}return d={name:(m=l).name,arr:[]},t.next=19,e.getRandomNumbers(m.qty,m.array.length);case 19:for(h=t.sent,p=0;p<m.qty;p++)b=h.shift(),(g=m.array[b])&&d.arr.push(g);n.push(d);case 22:r=!0,t.next=7;break;case 25:t.next=31;break;case 27:t.prev=27,t.t0=t.catch(5),s=!0,o=t.t0;case 31:if(t.prev=31,t.prev=32,r||null==i.return){t.next=36;break}return t.next=36,i.return();case 36:if(t.prev=36,!s){t.next=39;break}throw o;case 39:return t.finish(36);case 40:return t.finish(31);case 41:e.setState({winners:n});case 42:case"end":return t.stop()}},t,this,[[5,27,31,41],[32,,36,40]])})),e.getRandomNumbers=function(){var t=Object(c.a)(u.a.mark(function t(n,a){var r,s,o;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.setState({winnersStatus:0}),t.prev=1,t.next=4,fetch("https://api.random.org/json-rpc/1/invoke",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json; charset=utf-8"},referrer:"no-referrer",body:JSON.stringify({jsonrpc:"2.0",method:"generateIntegers",params:{apiKey:"68ae5679-2cbb-4b25-8ab0-f0da1a524c21",n:n,min:1,max:a},id:1})});case 4:return r=t.sent,t.next=7,r.json();case 7:if(s=t.sent,e.setState({winnersStatus:1}),!s.error){t.next=14;break}return e.setState({winnersMethod:"Math.random()"}),t.abrupt("return",e.randomNumberFallback(n,a));case 14:return o=s.result.requestsLeft,e.setState({winnersMethod:"Random.org - Requests remaining: "+o}),t.abrupt("return",s.result.random.data);case 17:t.next=24;break;case 19:return t.prev=19,t.t0=t.catch(1),e.setState({winnersMethod:"Math.random()"}),e.setState({winnersStatus:1}),t.abrupt("return",e.randomNumberFallback(n,a));case 24:case"end":return t.stop()}},t,this,[[1,19]])}));return function(e,n){return t.apply(this,arguments)}}(),e.randomNumberFallback=function(e,t){for(var n=[],a=0;a<e;a++){for(var r=parseInt(Math.random()*t);n.includes(r);)r=parseInt(Math.random()*t);n.push(r)}return n},e.state={regions:[{name:"EU",qty:1,variations:["EU","Eu","eU","Europe","UK"]},{name:"NA",qty:1,variations:["NA","Na","nA","North American","North America","North america","north america","N.A","N A","US"]},{name:"",qty:0,variations:[]}],ignoredUsers:[],url:"https://www.reddit.com/r/PSVR/comments/9gykgl/transference_playstation_vr_game_key_giveaway_we/",winners:[],winnersMethod:"Random.org",winnersStatus:1,selectedWinner:"",stats:[],total:0,processText:"Process",processBlock:!1,downloadData:"",status:0},e.totalComments=0,e.results={},e.comments=[],e.currentURL="",e}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t="button green";return this.state.processBlock&&(t="button disabled"),r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"Reddit Competition Parser"),r.a.createElement("div",{className:"grid"},r.a.createElement("div",{className:"url"},r.a.createElement("label",null,"URL"),r.a.createElement(b,{onChange:this.setUrl,value:this.state.url,placeholder:"URL"})),r.a.createElement("div",{className:"ignored"},r.a.createElement("label",null,"Users to Ignore"),r.a.createElement("textarea",{onChange:this.setIgnored,placeholder:"Such as previous winners. (Must be separated by a new line)"})),r.a.createElement("div",{className:"regions"},r.a.createElement("label",null,"Regions",r.a.createElement("span",{onClick:this.addRegion,className:"slim button green"},"+"),r.a.createElement("span",{onClick:this.removeRegion,className:"slim button red"},"-")),this.state.regions.map(function(t,n){return r.a.createElement(g,{setName:e.setRegionName,setVariations:e.setRegionVariations,setQty:e.setRegionQty,name:t.name,variations:t.variations,qty:t.qty,index:n,key:n})})),r.a.createElement("div",{className:"processBtn"},r.a.createElement("button",{onClick:this.getComments,className:t},this.state.processText)),r.a.createElement(E,{stats:this.state.stats,total:this.state.total,downloadData:this.state.downloadData}),r.a.createElement(v,{winners:this.state.winners,pickWinners:this.pickWinners,selectWinner:this.selectWinner,total:this.state.total,method:this.state.winnersMethod,status:this.state.winnersStatus}),r.a.createElement(k,{username:this.state.selectedWinner,setUsername:this.selectWinner})))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[12,2,1]]]);
//# sourceMappingURL=main.fd6cce80.chunk.js.map