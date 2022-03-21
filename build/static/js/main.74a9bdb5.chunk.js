(this["webpackJsonpfire-nearby"]=this["webpackJsonpfire-nearby"]||[]).push([[0],{24:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),o=a(10),c=a.n(o),i=(a(16),a(8),a(9),a(11)),r=a(1),l=a(4),d=a.n(l),p=a(6),h=a(2);d.a.accessToken="pk.eyJ1IjoiY2FzZXltbWlsZXIiLCJhIjoiY2lpeHY1bnJ1MDAyOHVkbHpucnB1dGRmbyJ9.TzUoCLwyeDoLjh3tkDSD4w";class u extends n.Component{constructor(e){super(e),this.state={lng:-98.78320225360663,lat:40.45646421496375,zoom:3.5},this.mapContainer=s.a.createRef()}componentDidMount(){const{lng:e,lat:t,zoom:a}=this.state,n=new d.a.Map({container:this.mapContainer.current,style:"mapbox://styles/caseymmiler/cl11818ga000216ng2az1efhm",center:[e,t],zoom:a}),s=new d.a.ScaleControl({maxWidth:150,unit:"imperial"});n.addControl(s),s.setUnit("imperial"),async function(){const e=await fetch("https://firenearby.s3.amazonaws.com/latest.json");return await e.json()}().then((e=>{console.log("ran load"),n.addSource("data-json",{type:"geojson",data:e}),n.addLayer({id:"data-json-layer",type:"circle",source:"data-json",layout:{},paint:{"circle-radius":5,"circle-color":"#fc9403","circle-stroke-color":"#ffffff","circle-stroke-width":2}});const t=p.bbox(e);n.fitBounds(t,{padding:100,duration:0})}))}render(){return Object(h.jsx)("div",{children:Object(h.jsx)("div",{ref:this.mapContainer,className:"map-container"})})}}var m=e=>Object(h.jsx)(u,{});d.a.accessToken="pk.eyJ1IjoiY2FzZXltbWlsZXIiLCJhIjoiY2lpeHY1bnJ1MDAyOHVkbHpucnB1dGRmbyJ9.TzUoCLwyeDoLjh3tkDSD4w";class j extends n.Component{constructor(e){super(e),this.state={lng:-98.78320225360663,lat:40.45646421496375,zoom:3.5},this.mapContainer=s.a.createRef()}componentDidMount(){const{lng:e,lat:t,zoom:a}=this.state;let n=!1;const s=new d.a.Map({container:this.mapContainer.current,style:"mapbox://styles/caseymmiler/cl11818ga000216ng2az1efhm",center:[e,t],zoom:a}),o=new d.a.ScaleControl({maxWidth:150,unit:"imperial"});s.addControl(o);const c=window.location.search.slice(1).split("&").map((e=>e.split("="))).reduce(((e,[t,a])=>({...e,[t]:a})),{}),i=e=>{let t=e.split(",");return console.log(t),[parseFloat(t[0]),parseFloat(t[1])]};console.log(c);const r={type:"FeatureCollection",features:[{type:"Feature",properties:{category:"userLoc"},geometry:{type:"Point",coordinates:i(c.userLoc)}},{type:"Feature",properties:{category:"fireLoc"},geometry:{type:"Point",coordinates:i(c.fireLoc)}}]};s.on("load",(function(){console.log("ran load"),n=!0,s.addSource("data-json",{type:"geojson",data:r}),s.addLayer({id:"data-json-layer",type:"circle",source:"data-json",layout:{},paint:{"circle-radius":7,"circle-color":["match",["get","category"],"userLoc","#5444e3","fireLoc","#fc9403","#ccc"],"circle-stroke-color":"#ffffff","circle-stroke-width":2}});const e=p.bbox(r);s.fitBounds(e,{padding:100,duration:0}),setTimeout((function(){console.log("brb crying"),(()=>{console.log("loaded");const e=document.createElement("div");e.id="hidden",document.getElementsByClassName("map-container")[0].appendChild(e)})()}),5e3)}))}render(){return Object(h.jsx)("div",{children:Object(h.jsx)("div",{ref:this.mapContainer,className:"map-container"})})}}var b=e=>Object(h.jsx)(j,{});class y extends s.a.Component{constructor(e){super(e),this.state={username:"",location:"",phone:"",radius:"",coordinates:""},this.handleChange=this.handleChange.bind(this),this.handleSubmit=this.handleSubmit.bind(this)}handleChange(e){this.setState({[e.target.name]:e.target.value})}handleSubmit(e){(async function(e){const t="pk.eyJ1IjoiY2FzZXltbWlsZXIiLCJhIjoiY2lpeHY1bnJ1MDAyOHVkbHpucnB1dGRmbyJ9.TzUoCLwyeDoLjh3tkDSD4w";console.log(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e}.json?types=place%2Cpostcode%2Caddress&access_token=${t}`);const a=await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e}.json?types=place%2Cpostcode%2Caddress&access_token=${t}`);return await a.json()})(this.state.location).then((e=>{this.state.coordinates=e.features[0].center,fetch("https://rlepoghcjh.execute-api.us-west-2.amazonaws.com/dev/users",{method:"POST",body:JSON.stringify(this.state)}).then((e=>{alert("Your information has been submitted")}))})),e.preventDefault()}render(){return Object(h.jsxs)("div",{className:"signup",children:[Object(h.jsx)("h1",{children:"Sign up for alerts"}),Object(h.jsx)("p",{children:"Please submit this form to sign up for text alerts of fires near your specified location."}),Object(h.jsxs)("form",{onSubmit:this.handleSubmit,children:[Object(h.jsxs)("label",{children:["Name:",Object(h.jsx)("input",{type:"text",name:"username",value:this.state.username,onChange:this.handleChange})]}),Object(h.jsxs)("label",{children:["Phone number:",Object(h.jsx)("input",{type:"text",name:"phone",value:this.state.phone,onChange:this.handleChange})]}),Object(h.jsxs)("label",{children:["Address (please include city and state):",Object(h.jsx)("input",{type:"text",name:"location",value:this.state.location,onChange:this.handleChange})]}),Object(h.jsxs)("label",{children:["Max distance (in miles):",Object(h.jsx)("input",{type:"text",name:"radius",value:this.state.radius,onChange:this.handleChange})]}),Object(h.jsx)("input",{className:"submit",type:"submit",value:"Submit"})]})]})}}var x=e=>Object(h.jsx)(y,{});class g extends s.a.PureComponent{render(){return Object(h.jsx)(i.a,{children:Object(h.jsxs)(r.c,{children:[Object(h.jsx)(r.a,{exact:!0,path:"/",element:Object(h.jsx)(m,{})}),Object(h.jsx)(r.a,{exact:!0,path:"/sign-up",element:Object(h.jsx)(x,{})}),Object(h.jsx)(r.a,{exact:!0,path:"/screenshot",element:Object(h.jsx)(b,{})})]})})}}console.log(Object({NODE_ENV:"production",PUBLIC_URL:"/fire-nearby",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_MAPBOX_KEY:"pk.eyJ1IjoiY2FzZXltbWlsZXIiLCJhIjoiY2lpeHY1bnJ1MDAyOHVkbHpucnB1dGRmbyJ9.TzUoCLwyeDoLjh3tkDSD4w",REACT_APP_API_URL:"https://rlepoghcjh.execute-api.us-west-2.amazonaws.com/dev/users"})),c.a.render(Object(h.jsx)(s.a.StrictMode,{children:Object(h.jsx)(g,{})}),document.getElementById("root"))},8:function(e,t,a){}},[[24,1,2]]]);
//# sourceMappingURL=main.74a9bdb5.chunk.js.map