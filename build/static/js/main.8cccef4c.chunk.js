(this["webpackJsonpcheckers-game"]=this["webpackJsonpcheckers-game"]||[]).push([[0],{25:function(e,t,n){},26:function(e,t,n){},87:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),o=n(20),i=n.n(o);n(25),n(26);const l={getRandomInt:function(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e))+e},makeId:function(e=3){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",c=0;c<e;c++)t+=n.charAt(Math.floor(62*Math.random()));return t}};n(27);var s=n(0);function j(){var e=null;Object(c.useRef)(null);const t="\u26ab\ufe0f",n="\u26aa\ufe0f",[r,o]=Object(c.useState)([]),[i,a]=Object(c.useState)([]),[u,d]=Object(c.useState)("Start Game"),[h,m]=Object(c.useState)(""),[b,f]=Object(c.useState)(t),p=()=>{let e=[];for(let c=0;c<8;c++){e[c]=[];for(let r=0;r<8;r++)e[c][r]=c<3&&(c+r)%2==1?n:c>4&&(c+r)%2==1?t:""}a(e)},g=(e,c)=>{const l=[...r];l.push({from:{i:e.i,j:e.j,player:b},to:{i:c.i,j:c.j}}),o(l);const s=[...i];var j=s[e.i][e.j];s[e.i][e.j]="",s[c.i][c.j]=j,b==t?(0===c.i&&c.j%2===1&&(s[c.i][c.j]=" \ud83c\udff4"),s[e.i-1][e.j+1]==n&&c.j==e.j+1||c.j==e.j+2?s[e.i-1][e.j+1]="":(s[e.i-1][e.j-1]==n&&c.j==e.j-1||c.j==e.j-2)&&(s[e.i-1][e.j-1]="")):b==n&&(7===c.i&&c.j%2===0&&(s[c.i][c.j]="\ud83c\udff3\ufe0f"),s[e.i+1][e.j-1]==t&&c.j==e.j-1||c.j==e.j-2?s[e.i+1][e.j-1]="":(s[e.i+1][e.j+1]==t&&c.j==e.j+1||c.j==e.j+2)&&(s[e.i+1][e.j+1]="")),a(s),f(b==t?n:t)},v=()=>{document.querySelectorAll(".mark, .selected").forEach((e=>{e.classList.remove("mark","selected")}))},O=(e,c)=>{const r=[...i];var o=r[e][c]==t?-1:1,l=[];if(!(e+o<0||e+o>8||c+1<0||c+1>8))return""===r[e+o][c+1]&&l.push({i:e+o,j:c+1}),""===r[e+o][c-1]&&l.push({i:e+o,j:c-1}),b==t?r[e+o][c+1]==n?e-2<0||c+2<0||c+2>=8||""==r[e-2][c+2]&&l.push({i:e-2,j:c+2}):r[e+o][c-1]==n&&(e-2<0||c-2<0||""==r[e-2][c-2]&&l.push({i:e-2,j:c-2})):b==n&&(r[e+o][c+1]==t?e+2>=8||c+2>j||""==r[e+2][c+2]&&l.push({i:e+2,j:c+2}):r[e+o][c-1]==t&&(e+2>=8||c-2<0||""==r[e+2][c-2]&&l.push({i:e+2,j:c-2}))),l},x=e=>{console.log(e),(null===e||void 0===e?void 0:e.length)>0&&e.forEach((e=>{document.querySelector(`#cell-${e.i}-${e.j}`).classList.add("mark")}))};return Object(c.useEffect)((()=>{p()}),[]),i?Object(s.jsxs)("div",{className:"board flex column",children:[Object(s.jsxs)("div",{className:"flex align-center space-around",children:[Object(s.jsxs)("h2",{children:["player Turn : ",b]}),Object(s.jsx)("button",{className:"simple-btn",onClick:()=>{m(""),e=null,f(t),a([]),o([]),p()},children:"restart Game"}),Object(s.jsx)("button",{className:"undo-btn",onClick:()=>{const e=[...r];if(0===e.length)return m("There were no movements yet"),void setTimeout((()=>{m("")}),2500);let c=e[e.length-1];""==i[c.from.i][c.from.j]&&((e,c)=>{const l=[...r];o(l);const s=[...i];var j=s[e.i][e.j];"\ud83c\udff4"==j?j=t:"\ud83c\udff3\ufe0f"==j&&(j=n),s[e.i][e.j]="",s[c.i][c.j]=j})(c.to,c.from),e.pop(),o(e)},children:"Undo"}),Object(s.jsx)("button",{className:"undo-btn",onClick:()=>{var e=[],n=b==t?-1:1;for(let t=0;t<i.length;t++)for(let r=0;r<i[0].length;r++)if(i[t][r]===b){if(t+n<0||t+n>8||r+1<0||r+1>8)continue;if(""===i[t+n][r+1]||""===i[t+n][r-1]){var c={i:t,j:r};e=O(t,r)}}g(c,e[l.getRandomInt(0,e.length)])},children:"Redo"})]}),Object(s.jsx)("span",{style:{color:"red"},children:h}),Object(s.jsx)("table",{children:Object(s.jsx)("tbody",{children:i.map(((t,n)=>Object(s.jsx)("tr",{children:i[0].map(((t,c)=>{var r=`cell-${n}-${c}`;return Object(s.jsx)("td",{onClick:t=>((t,n)=>{if(console.log("ij",t,n),console.log(i[t][n]),console.log("player",b),i[t][n]!==b&&""!=i[t][n])return m(`Its Not  ${i[t][n]} turn !`),void setTimeout((()=>{m("")}),2e3);if(document.querySelector(`#cell-${t}-${n}`).classList.contains("mark"))return g(e,{i:t,j:n}),void v();if(v(),""!==i[t][n]){document.querySelector(`#cell-${t}-${n}`).classList.add("selected"),e={i:t,j:n};var c=O(t,n);x(c)}})(n,c),id:r,className:(n+c)%2===0?"blue":"white",children:i[n][c]},l.makeId())}))},n)))})})]}):Object(s.jsx)("h1",{children:"Loading board..."})}var a=function(){return Object(s.jsx)("div",{className:"App flex align-center space-around column",children:Object(s.jsx)(j,{})})};var u=e=>{e&&e instanceof Function&&n.e(3).then(n.bind(null,88)).then((({getCLS:t,getFID:n,getFCP:c,getLCP:r,getTTFB:o})=>{t(e),n(e),c(e),r(e),o(e)}))};i.a.render(Object(s.jsx)(r.a.StrictMode,{children:Object(s.jsx)(a,{})}),document.getElementById("root")),u()}},[[87,1,2]]]);
//# sourceMappingURL=main.8cccef4c.chunk.js.map