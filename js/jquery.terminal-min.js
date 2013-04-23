/*

 |       __ _____                     ________                              __
 |      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 |  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 | /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 | \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 |           \/              /____/                              version 0.6.3
 http://terminal.jcubic.pl

 Licensed under GNU LGPL Version 3 license
 Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>

 Includes:

 Storage plugin Distributed under the MIT License
 Copyright (c) 2010 Dave Schindler

 jQuery Timers licenced with the WTFPL
 <http://jquery.offput.ca/every/>

 Cross-Browser Split 1.1.1
 Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 Available under the MIT License

 Date: Tue, 23 Apr 2013 14:45:16 +0000
*/
(function(g,K){function fa(d,k){var i;if(typeof d==="string"&&typeof k==="string"){localStorage[d]=k;return true}else if(typeof d==="object"&&typeof k==="undefined"){for(i in d)if(d.hasOwnProperty(i))localStorage[i]=d[i];return true}return false}function ca(d,k){var i,f;i=new Date;i.setTime(i.getTime()+31536E6);i="; expires="+i.toGMTString();if(typeof d==="string"&&typeof k==="string"){document.cookie=d+"="+k+i+"; path=/";return true}else if(typeof d==="object"&&typeof k==="undefined"){for(f in d)if(d.hasOwnProperty(f))document.cookie=
f+"="+d[f]+i+"; path=/";return true}return false}function ga(d){return localStorage[d]}function ha(d){var k,i,f;d+="=";k=document.cookie.split(";");for(i=0;i<k.length;i++){for(f=k[i];f.charAt(0)===" ";)f=f.substring(1,f.length);if(f.indexOf(d)===0)return f.substring(d.length,f.length)}return null}function ia(d){return delete localStorage[d]}function ja(d){return ca(d,"",-1)}function Z(d,k){var i=[],f=d.length;if(f<k)return[d];for(var j=0;j<f;j+=k)i.push(d.substring(j,j+k));return i}function ka(d){var k=
d?[d]:[];g.extend(this,{size:function(){return k.length},pop:function(){if(k.length===0)return null;else{var i=k[k.length-1];k=k.slice(0,k.length-1);return i}},push:function(i){k=k.concat([i]);return i},top:function(){return k.length>0?k[k.length-1]:null}})}function la(d,k){var i=true;if(typeof d==="string"&&d!=="")d+="_";var f=g.Storage.get(d+"commands");f=f?(new Function("return "+f+";"))():[];var j=f.length-1;g.extend(this,{append:function(n){if(i)if(f[f.length-1]!==n){f.push(n);j=f.length-1;if(k&&
f.length>k)f=f.slice(-k);g.Storage.set(d+"commands",g.json_stringify(f))}},data:function(){return f},next:function(){j<f.length-1&&++j;if(j!==-1)return f[j]},reset:function(){j=f.length-1},last:function(){return f[length-1]},end:function(){return j===f.length-1},position:function(){return j},previous:function(){var n=j;j>0&&--j;if(n!==-1)return f[n]},clear:function(){f=[];g.Storage.remove(d+"commands")},enable:function(){i=true},disable:function(){i=false}})}function da(d){return g("<div>"+g.terminal.strip(d)+
"</div>").text().length}g.omap=function(d,k){var i={};g.each(d,function(f,j){i[f]=k.call(d,f,j)});return i};var X=typeof window.localStorage!=="undefined";g.extend({Storage:{set:X?fa:ca,get:X?ga:ha,remove:X?ia:ja}});jQuery.fn.extend({everyTime:function(d,k,i,f,j){return this.each(function(){jQuery.timer.add(this,d,k,i,f,j)})},oneTime:function(d,k,i){return this.each(function(){jQuery.timer.add(this,d,k,i,1)})},stopTime:function(d,k){return this.each(function(){jQuery.timer.remove(this,d,k)})}});jQuery.extend({timer:{guid:1,
global:{},regex:/^([0-9]+)\s*(.*s)?$/,powers:{ms:1,cs:10,ds:100,s:1E3,das:1E4,hs:1E5,ks:1E6},timeParse:function(d){if(d===K||d===null)return null;var k=this.regex.exec(jQuery.trim(d.toString()));return k[2]?parseInt(k[1],10)*(this.powers[k[2]]||1):d},add:function(d,k,i,f,j,n){var u=0;if(jQuery.isFunction(i)){j||(j=f);f=i;i=k}k=jQuery.timer.timeParse(k);if(!(typeof k!=="number"||isNaN(k)||k<=0)){if(j&&j.constructor!==Number){n=!!j;j=0}j=j||0;n=n||false;if(!d.$timers)d.$timers={};d.$timers[i]||(d.$timers[i]=
{});f.$timerID=f.$timerID||this.guid++;var l=function(){if(!(n&&l.inProgress)){l.inProgress=true;if(++u>j&&j!==0||f.call(d,u)===false)jQuery.timer.remove(d,i,f);l.inProgress=false}};l.$timerID=f.$timerID;d.$timers[i][f.$timerID]||(d.$timers[i][f.$timerID]=window.setInterval(l,k));this.global[i]||(this.global[i]=[]);this.global[i].push(d)}},remove:function(d,k,i){var f=d.$timers,j;if(f){if(k){if(f[k]){if(i){if(i.$timerID){window.clearInterval(f[k][i.$timerID]);delete f[k][i.$timerID]}}else for(var n in f[k])if(f[k].hasOwnProperty(n)){window.clearInterval(f[k][n]);
delete f[k][n]}for(j in f[k])if(f[k].hasOwnProperty(j))break;if(!j){j=null;delete f[k]}}}else for(var u in f)f.hasOwnProperty(u)&&this.remove(d,u,i);for(j in f)if(f.hasOwnProperty(j))break;if(!j)d.$timers=null}}}});if(jQuery.browser&&jQuery.browser.msie||/(msie) ([\w.]+)/.exec(navigator.userAgent.toLowerCase()))jQuery(window).one("unload",function(){var d=jQuery.timer.global,k;for(k in d)if(d.hasOwnProperty(k))for(var i=d[k],f=i.length;--f;)jQuery.timer.remove(i[f],k)});(function(d){if(String.prototype.split.toString().match(/\[native/)){var k=
String.prototype.split,i=/()??/.exec("")[1]===d,f;f=function(j,n,u){if(Object.prototype.toString.call(n)!=="[object RegExp]")return k.call(j,n,u);var l=[],D=(n.ignoreCase?"i":"")+(n.multiline?"m":"")+(n.extended?"x":"")+(n.sticky?"y":""),x=0,I,y,z;n=RegExp(n.source,D+"g");j+="";i||(I=RegExp("^"+n.source+"$(?!\\s)",D));for(u=u===d?4294967295:u>>>0;y=n.exec(j);){D=y.index+y[0].length;if(D>x){l.push(j.slice(x,y.index));!i&&y.length>1&&y[0].replace(I,function(){for(var M=1;M<arguments.length-2;M++)if(arguments[M]===
d)y[M]=d});y.length>1&&y.index<j.length&&Array.prototype.push.apply(l,y.slice(1));z=y[0].length;x=D;if(l.length>=u)break}n.lastIndex===y.index&&n.lastIndex++}if(x===j.length){if(z||!n.test(""))l.push("")}else l.push(j.slice(x));return l.length>u?l.slice(0,u):l};String.prototype.split=function(j,n){return f(this,j,n)};return f}})();g.json_stringify=function(d,k){var i="",f;k=k===K?1:k;switch(typeof d){case "function":i+=d;break;case "boolean":i+=d?"true":"false";break;case "object":if(d===null)i+=
"null";else if(d instanceof Array){i+="[";var j=d.length;for(f=0;f<j-1;++f)i+=g.json_stringify(d[f],k+1);i+=g.json_stringify(d[j-1],k+1)+"]"}else{i+="{";for(j in d)if(d.hasOwnProperty(j))i+='"'+j+'":'+g.json_stringify(d[j],k+1);i+="}"}break;case "string":j=d;var n={"\\\\":"\\\\",'"':'\\"',"/":"\\/","\\n":"\\n","\\r":"\\r","\\t":"\\t"};for(f in n)if(n.hasOwnProperty(f))j=j.replace(RegExp(f,"g"),n[f]);i+='"'+j+'"';break;case "number":i+=String(d)}i+=k>1?",":"";if(k===1)i=i.replace(/,([\]}])/g,"$1");
return i.replace(/([\[{]),/g,"$1")};g.fn.cmd=function(d){function k(){E.toggleClass("inverted")}function i(){B="(reverse-i-search)`"+z+"': ";N()}function f(e){var h=b.data(),L=h.length;if(e&&M>0)L-=M;if(z.length>0)for(var O=z.length;O>0;O--){e=RegExp("^"+z.substring(0,O));for(var S=L;S--;)if(e.test(h[S])){M=h.length-S;p=0;l.set(h[S],true);G();if(z.length!==O){z=z.substring(0,O);i()}return}}}function j(e){var h=e.substring(0,x-I);e=e.substring(x-I);return[h].concat(Z(e,x))}function n(){D.focus();l.oneTime(1,
function(){l.insert(D.val());D.blur().val("")})}function u(e){if(typeof d.keydown=="function"){var h=d.keydown(e);if(h!==K)return h}if(H){if(y&&(e.which===35||e.which===36||e.which===37||e.which===38||e.which===39||e.which===40||e.which===13||e.which===27)){B=Q;y=false;M=null;z="";N();if(e.which===27)o="";G();u.call(this,e)}else if(e.altKey){if(e.which===68){l.set(o.slice(0,p)+o.slice(p).replace(/[^ ]+ |[^ ]+$/,""),true);return false}return true}else if(e.keyCode===13){if(b&&o&&(d.historyFilter&&
d.historyFilter(o)||!d.historyFilter))b.append(o);e=o;b.reset();l.set("");d.commands&&d.commands(e);typeof B==="function"&&N()}else if(e.which===32)if(y){z+=" ";i()}else l.insert(" ");else if(e.which===8)if(y){z=z.slice(0,-1);i()}else{if(o!==""&&p>0){o=o.slice(0,p-1)+o.slice(p,o.length);--p;G()}}else if(e.which===9&&!(e.ctrlKey||e.altKey))l.insert("\t");else if(e.which===46){if(o!==""&&p<o.length){o=o.slice(0,p)+o.slice(p+1,o.length);G()}return true}else if(b&&e.which===38||e.which===80&&e.ctrlKey){if(b.end())Y=
o;l.set(b.previous())}else if(b&&e.which===40||e.which===78&&e.ctrlKey)l.set(b.end()?Y:b.next());else if(e.which===37||e.which===66&&e.ctrlKey)if(e.ctrlKey&&e.which!==66){h=p-1;e=0;for(o[h]===" "&&--h;h>0;--h)if(o[h]===" "&&o[h+1]!==" "){e=h+1;break}else if(o[h]==="\n"&&o[h+1]!=="\n"){e=h;break}l.position(e)}else{if(p>0){--p;G()}}else if(e.which===82&&e.ctrlKey)if(y)f(true);else{Q=B;i();Y=o;o="";G();y=true}else if(e.which==71&&e.ctrlKey){if(y){B=Q;N();o=Y;G();y=false}}else if(e.which===39||e.which===
70&&e.ctrlKey)if(e.ctrlKey&&e.which!==70){o[p]===" "&&++p;e=o.slice(p).match(/\S[\n\s]{2,}|[\n\s]+\S?/);if(!e||e[0].match(/^\s+$/))p=o.length;else if(e[0][0]!==" ")p+=e.index+1;else{p+=e.index+e[0].length-1;e[0][e[0].length-1]!==" "&&--p}G()}else{if(p<o.length){++p;G()}}else if(e.which===123)return true;else if(e.which===36)l.position(0);else if(e.which===35)l.position(o.length);else if(e.shiftKey&&e.which==45){n();return true}else if(e.ctrlKey||e.metaKey)if(e.shiftKey){if(e.which===84)return true}else if(e.which===
87){if(o!==""){e=o.slice(0,p);h=o.slice(p+1);var L=e.match(/([^ ]+ *$)/);p=e.length-L[0].length;o=e.slice(0,p)+h;G()}}else if(e.which===72){if(o!==""&&p>0){o=o.slice(0,--p);if(p<o.length-1)o+=o.slice(p);G()}}else if(e.which===65)l.position(0);else if(e.which===69)l.position(o.length);else if(e.which===88||e.which===67||e.which===84)return true;else if(e.which===86){n();return true}else if(e.which===75)if(p===0)l.set("");else p!==o.length&&l.set(o.slice(0,p));else{if(e.which===85){l.set(o.slice(p,
o.length));l.position(0)}}else return true;return false}}var l=this;l.addClass("cmd");l.append('<span class="prompt"></span><span></span><span class="cursor">&nbsp;</span><span></span>');var D=g("<textarea/>").addClass("clipboard").appendTo(l);d.width&&l.width(d.width);var x,I,y=false,z="",M=null,Q,J=d.mask||false,o="",p=0,B,H=d.enabled,W=d.historySize||60,T,b,E=l.find(".cursor"),G=function(e){function h(v,w){if(w===v.length){R.html(g.terminal.encode(v));E.html("&nbsp;");U.html("")}else if(w===0){R.html("");
E.html(g.terminal.encode(v.slice(0,1)));U.html(g.terminal.encode(v.slice(1)))}else{var A=g.terminal.encode(v.slice(0,w));R.html(A);A=v.slice(w,w+1);E.html(A===" "?"&nbsp;":g.terminal.encode(A));w===v.length-1?U.html(""):U.html(g.terminal.encode(v.slice(w+1)))}}function L(v){return"<div>"+g.terminal.encode(v)+"</div>"}function O(v){var w=U;g.each(v,function(A,q){w=g(L(q)).insertAfter(w).addClass("clear")})}function S(v){g.each(v,function(w,A){R.before(L(A))})}var R=E.prev(),U=E.next();return function(){var v=
J?o.replace(/./g,"*"):o,w,A;e.find("div").remove();R.html("");if(v.length>x-I-1||v.match(/\n/)){var q,r=v.match(/\t/g),a=r?r.length*3:0;if(r)v=v.replace(/\t/g,"\u0000\u0000\u0000\u0000");if(v.match(/\n/)){var c=v.split("\n");A=x-I-1;for(w=0;w<c.length-1;++w)c[w]+=" ";if(c[0].length>A){q=[c[0].substring(0,A)];q=q.concat(Z(c[0].substring(A),x))}else q=[c[0]];for(w=1;w<c.length;++w)if(c[w].length>x)q=q.concat(Z(c[w],x));else q.push(c[w])}else q=j(v);if(r)q=g.map(q,function(t){return t.replace(/\x00\x00\x00\x00/g,
"\t")});A=q[0].length;if(p<A){h(q[0],p);O(q.slice(1))}else if(p===A){R.before(L(q[0]));h(q[1],0);O(q.slice(2))}else{w=q.length;if(p<A){h(q[0],p);O(q.slice(1))}else if(p===A){R.before(L(q[0]));h(q[1],0);O(q.slice(2))}else{r=q.slice(-1)[0];c=v.length-p;var m=r.length;v=0;if(c<=m){S(q.slice(0,-1));h(r,(m===c?0:m-c)+a)}else if(w===3){R.before("<div>"+g.terminal.encode(q[0])+"</div>");h(q[1],p-A-1);U.after('<div class="clear">'+g.terminal.encode(q[2])+"</div>")}else{v=p;for(w=0;w<q.length;++w){A=q[w].length;
if(v>A)v-=A;else break}A=q[w];a=w;if(v===A.length){v=0;A=q[++a]}h(A,v);S(q.slice(0,a));O(q.slice(a+1))}}}}else if(v===""){R.html("");E.html("&nbsp;");U.html("")}else h(v,p)}}(l),Y,N=function(){var e=l.find(".prompt");return function(){if(typeof B==="string"){I=da(B);e.html(g.terminal.format(B))}else B(function(h){I=da(h);e.html(g.terminal.format(h))})}}();g.extend(l,{name:function(e){if(e!==K){T=e;b=new la(e,W)}else return T},history:function(){return b},set:function(e,h){if(e!==K){o=e;if(!h)p=o.length;
G();if(typeof d.onCommandChange==="function")d.onCommandChange(o)}},insert:function(e,h){if(p===o.length)o+=e;else o=p===0?e+o:o.slice(0,p)+e+o.slice(p);h||(p+=e.length);G();if(typeof d.onCommandChange==="function")d.onCommandChange(o)},get:function(){return o},commands:function(e){if(e)d.commands=e;else return e},destroy:function(){g(document.documentElement).unbind(".commandline");l.find(".prompt").remove()},prompt:function(e){if(e===K)return B;else{if(typeof e==="string"||typeof e==="function")B=
e;else throw"prompt must be a function or string";N();G()}},position:function(e){if(typeof e==="number"){p=e<0?0:e>o.length?o.length:e;G()}else return p},visible:function(){var e=l.visible;return function(){e.apply(l,[]);G();N()}}(),show:function(){var e=l.show;return function(){e.apply(l,[]);G();N()}}(),resize:function(e){if(e)x=e;else{e=l.width();var h=E.innerWidth();x=Math.floor(e/h)}G()},enable:function(){if(!H){E.addClass("inverted");l.everyTime(500,"blink",k);H=true}},isenabled:function(){return H},
disable:function(){if(H){l.stopTime("blink",k);E.removeClass("inverted");H=false}},mask:function(e){if(typeof e==="boolean"){J=e;G()}else return J}});l.name(d.name||"");B=d.prompt||"> ";N();if(d.enabled===K||d.enabled===true)l.enable();g(document.documentElement||window).keypress(function(e){var h;if(e.ctrlKey&&e.which===99)return true;if(!y&&typeof d.keypress==="function")h=d.keypress(e);if(h===K||h){if(H)if(g.inArray(e.which,[38,32,13,0,8])>-1&&e.keyCode!==123&&!(e.which===38&&e.shiftKey))return false;
else if(!e.ctrlKey&&!(e.altKey&&e.which===100)){if(y){z+=String.fromCharCode(e.which);f();i()}else l.insert(String.fromCharCode(e.which));return false}else if(e.altKey)if(y){z+=String.fromCharCode(e.which);f();i()}else l.insert(String.fromCharCode(e.which))}else return h}).keydown(u);return l};var ma=/(\[\[[gbius]*;[^;]*;[^\]]*\](?:[^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?)/,$=/\[\[([gbius]*);([^;]*);([^;\]]*;|[^\]]*);?([^;\]]*;|[^\]]*);?([^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g;$=
/\[\[([gbius]*);([^;]*);([^;\]]*);?([^;\]]*);?([^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g;var ea=/#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})/,na=/https?:\/\/(?:(?!&[^;]+;)[^\s:"'<>)])+/g,oa=/((([^<>('")[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))/g;g.terminal={split_equal:function(d,k){var i=/\[\[([gbius]*;[^;]*;[^;\]]*;|[^\]]*;?[^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g,f=/(\[\[[gbius]*;[^;]*;[^\]]*\])/,
j=/\[\[[gbius]*;?[^;]*;?[^\]]*\]?$/,n=false,u=false,l="",D=[],x=d.replace(i,function(H,W,T){H=W.match(/;/g).length;return"[["+W+(H==2?";;":H==3?";":"")+T.replace(/\\\]/g,"&#93;").replace(/\n/g,"\\n")+"]"+T+"]"}).split(/\n/g);console.log(x);for(var I=0,y=x.length;I<y;++I)if(x[I]==="")D.push("");else for(var z=x[I],M=0,Q=0,J=0,o=z.length;J<o;++J){if(z[J]==="["&&z[J+1]==="[")n=true;else if(n&&z[J]==="]")if(u)u=n=false;else u=true;else if(n&&u||!n)if(z[J]==="&"){var p=z.substring(J).match(/^(&[^;]+;)/);
if(!p)throw"Unclosed html entity at char "+J;J+=p[1].length-1;++Q;J==o-1&&D.push(B+p[1]);continue}else if(z[J]==="]"&&z[J-1]==="\\")--Q;else++Q;if(Q===k||J===o-1){var B=z.substring(M,J+1);if(l){B=l+B;if(B.match("]"))l=""}M=J+1;Q=0;if(p=B.match(i)){p=p[p.length-1];if(p[p.length-1]!=="]"){l=p.match(f)[1];B+="]"}else if(B.match(j)){B=B.replace(j,"");l=p.match(f)[1]}}D.push(B)}}return D},encode:function(d){return d.replace(/&(?!#[0-9]+;|[a-zA-Z]+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,
"<br/>").replace(/ /g,"&nbsp;").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;")},format:function(d){if(typeof d==="string"){d=g.terminal.encode(g.terminal.from_ansi(d));var k=d.split(ma);if(k&&k.length>1)d=g.map(k,function(i){return i===""?i:i.substring(0,1)==="["?i.replace($,function(f,j,n,u,l,D,x){if(x==="")return"<span>&nbsp;</span>";x=x.replace(/\\]/g,"]");f="";if(j.indexOf("b")!==-1)f+="font-weight:bold;";var I="text-decoration:";if(j.indexOf("u")!==-1)I+="underline ";if(j.indexOf("s")!==-1)I+="line-through";
if(j.indexOf("s")!==-1||j.indexOf("u")!==-1)f+=I+";";if(j.indexOf("i")!==-1)f+="font-style:italic;";if(n.match(ea)){f+="color:"+n+";";if(j.indexOf("g")!==-1)f+="text-shadow: 0 0 5px "+n+";"}if(u.match(ea))f+="background-color:"+u;return'<span style="'+f+'"'+(l!==""?' class="'+l+'"':"")+' data-text="'+(D===""?x:D.replace(/&#93;/g,"]")).replace('"',"&quote;")+'">'+x+"</span>"}):"<span>"+i+"</span>"}).join("");return g.map(d.split(/(<\/?span[^>]*>)/g),function(i){return i.match(/span/)?i:i.replace(na,
function(f){var j=f.match(/\.$/);f=f.replace(/\.$/,"");return'<a target="_blank" href="'+f+'">'+f+"</a>"+(j?".":"")}).replace(oa,'<a href="mailto:$1">$1</a>')}).join("").replace(/<span><br\/?><\/span>/g,"<br/>")}else return""},strip:function(d){return d.replace($,"$6")},active:function(){return V.front()},ansi_colors:{normal:{black:"#000",red:"#AA0000",green:"#008400",yellow:"#AA5500",blue:"#0000AA",magenta:"#AA00AA",cyan:"#00AAAA",white:"#fff"},bold:{white:"#fff",red:"#FF5555",green:"#44D544",yellow:"#FFFF55",
blue:"#5555FF",magenta:"#FF55FF",cyan:"#55FFFF",black:"#000"}},from_ansi:function(){function d(f){var j=f.split(";"),n;f=[];var u="",l="",D;for(D in j){n=parseInt(j[D],10);n===1&&f.push("b");n===4&&f.push("u");if(i[n])l=i[n];if(k[n])u=k[n]}n=j=g.terminal.ansi_colors.normal;for(D=f.length;D--;)if(f[D]=="b"){if(u=="")u="white";n=g.terminal.ansi_colors.bold;break}return"[["+[f.join(""),n[u],j[l]].join(";")+"]"}var k={30:"black",31:"red",32:"green",33:"yellow",34:"blue",35:"magenta",36:"cyan",37:"white"},
i={40:"black",41:"red",42:"green",43:"yellow",44:"blue",45:"magenta",46:"cyan",47:"white"};return function(f){var j=f.split(/(\[[0-9;]*m)/g);if(j.length==1)return f;f=[];if(j.length>3&&j.slice(0,3).join("")=="[0m")j=j.slice(3);for(var n=false,u=0;u<j.length;++u){var l=j[u].match(/^\[([0-9;]*)m$/);if(l){if(l[1]!="")if(n){f.push("]");if(l[1]=="0")n=false;else f.push(d(l[1]))}else{n=true;f.push(d(l[1]))}}else f.push(j[u])}n&&f.push("]");return f.join("")}}()};g.fn.visible=function(){return this.css("visibility",
"visible")};g.fn.hidden=function(){return this.css("visibility","hidden")};g.jrpc=function(d,k,i,f,j,n){k=g.json_stringify({jsonrpc:"2.0",method:i,params:f,id:k});return g.ajax({url:d,data:k,success:j,error:n,contentType:"application/json",dataType:"json",async:true,cache:false,type:"POST"})};X=/ {13}$/;var pa=[["jQuery Terminal","(c) 2011-2012 jcubic"],["jQuery Terminal Emulator v. 0.6.3","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>".replace(/ *<.*>/,"")],["jQuery Terminal Emulator version version 0.6.3",
"Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>"],["      _______                 ________                        __","     / / _  /_ ____________ _/__  ___/______________  _____  / /"," __ / / // / // / _  / _/ // / / / _  / _/     / /  \\/ / _ \\/ /","/  / / // / // / ___/ // // / / / ___/ // / / / / /\\  / // / /__","\\___/____ \\\\__/____/_/ \\__ / /_/____/_//_/ /_/ /_/  \\/\\__\\_\\___/","         \\/          /____/                                   ".replace(X,"")+"version 0.6.3",
"Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>"],["      __ _____                     ________                              __","     / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /"," __ / // // // // // _  // _// // / / // _  // _//     // //  \\/ // _ \\/ /","/  / // // // // // ___// / / // / / // ___// / / / / // // /\\  // // / /__","\\___//____ \\\\___//____//_/ _\\_  / /_//____//_/ /_/ /_//_//_/ /_/ \\__\\_\\___/","          \\/              /____/                                          ".replace(X,
"")+"version 0.6.3","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>"]],aa=[],V=new function(d){var k=d?[d]:[],i=0;g.extend(this,{get:function(){return k},rotate:function(){if(k.length===1)return k[0];else{if(i===k.length-1)i=0;else++i;return k[i]}},length:function(){return k.length},set:function(f){for(var j=k.length;j--;)if(k[j]===f){i=j;return}this.append(f)},front:function(){return k[i]},append:function(f){k.push(f)}})};g.fn.terminal=function(d,k){function i(){return b.get(0).scrollHeight>
b.innerHeight()}function f(){var a=b.find(".cursor").width(),c=Math.floor(b.width()/a);if(i()){var m=b.innerWidth()-b.width();c-=Math.ceil((20-m/2)/(a-1))}return c}function j(a,c){if(h.displayExceptions){b.error("&#91;"+c+"&#93;: "+(typeof a==="string"?a:typeof a.fileName==="string"?a.fileName+": "+a.message:a.message));if(typeof a.fileName==="string"){b.pause();g.get(a.fileName,function(m){b.resume();var t=a.lineNumber-1;(m=m.split("\n")[t])&&b.error("&#91;"+a.lineNumber+"&#93;: "+m)})}a.stack&&
b.error(a.stack)}}function n(){var a=H.prop?H.prop("scrollHeight"):H.attr("scrollHeight");H.scrollTop(a)}function u(a,c){try{if(typeof c==="function")c(function(){});else if(typeof c!=="string")throw a+" must be string or function";}catch(m){j(m,a.toUpperCase());return false}return true}function l(a){a=typeof a==="string"?a:String(a);var c,m;if(a.length>N||a.match(/\n/)){var t=g.terminal.split_equal(a,N);a=g("<div></div>");c=0;for(m=t.length;c<m;++c)t[c]===""||t[c]==="\r"?a.append("<div>&nbsp;</div>"):
g("<div/>").html(g.terminal.format(t[c])).appendTo(a)}else a=g("<div/>").html("<div>"+g.terminal.format(a)+"</div>");G.append(a);a.width("100%");n();return a}function D(){if(h.greetings===K)b.echo(b.signature);else h.greetings&&b.echo(h.greetings)}function x(a,c){var m=1,t=function(s,F){c.pause();g.jrpc(a,m++,s,F,function(C){if(C.error)c.error("&#91;RPC&#93; "+C.error.message);else if(typeof C.result==="string")c.echo(C.result);else if(C.result instanceof Array)c.echo(g.map(C.result,function(P){return g.json_stringify(P)}).join(" "));
else typeof C.result==="object"&&c.echo(g.json_stringify(C.result));c.resume()},function(C,P){P!=="abort"&&c.error("&#91;AJAX&#93; "+P+" - Server reponse is: \n"+C.responseText);c.resume()})};return function(s,F){if(s!==""){var C,P;if(s.match(/^[^ ]+ /)){s=p(s);C=s[0];P=s.slice(1)}else{C=s;P=[]}if(!h.login||C==="help")t(C,P);else{var ba=F.token();ba?t(C,[ba].concat(P)):F.error("&#91;AUTH&#93; Access denied (no token)")}}}}function I(a){a=a.replace(/\[/g,"&#91;").replace(/\]/g,"&#93;");var c=r.prompt();
if(r.mask())a=a.replace(/./g,"*");typeof c==="function"?c(function(m){b.echo(m+a)}):b.echo(c+a)}function y(a,c){try{W=a;var m=q.top();if(a==="exit"&&h.exit)if(q.size()===1)if(h.login)M();else{c||I(a);b.echo("You can't exit from main interpeter")}else b.pop("exit");else{c||I(a);var t=E.length-1;if(a==="clear"&&h.clear)b.clear();else{var s=m.eval(a,b);if(s!==K){if(t===E.length-1){E.pop();s!==false&&b.echo(s)}else E=s===false?E.slice(0,t).concat(E.slice(t+1)):E.slice(0,t).concat([s]).concat(E.slice(t+
1));b.resize()}}}}catch(F){j(F,"USER");b.resume();throw F;}}function z(){var a=null;r.prompt("login: ");h.history&&r.history().disable();r.commands(function(c){try{I(c);if(a){r.mask(false);b.pause();if(typeof h.login!=="function")throw"Value of login property must be a function";h.login(a,c,function(t){if(t){var s=h.name;s=s?"_"+s:"";g.Storage.set("token"+s,t);g.Storage.set("login"+s,a);r.commands(y);J()}else{b.error("Wrong password try again");r.prompt("login: ");a=null}b.resume();h.history&&r.history().enable()},
b)}else{a=c;r.prompt("password: ");r.mask(true)}}catch(m){j(m,"LOGIN",b);throw m;}})}function M(){if(typeof h.onBeforelogout==="function")try{if(h.onBeforelogout(b)==false)return}catch(a){j(a,"onBeforelogout");throw a;}var c=h.name;c=c?"_"+c:"";g.Storage.remove("token"+c,null);g.Storage.remove("login"+c,null);h.history&&r.history().disable();z();if(typeof h.onAfterlogout==="function")try{h.onAfterlogout(b)}catch(m){j(m,"onAfterlogout");throw m;}}function Q(){var a=q.top(),c="";if(a.name!==K&&a.name!==
"")c+=a.name+"_";c+=Y;r.name(c);typeof a.prompt=="function"?r.prompt(function(m){a.prompt(m,b)}):r.prompt(a.prompt);h.history&&r.history().enable();r.set("");if(typeof a.onStart==="function")a.onStart(b)}function J(){Q();D();if(typeof h.onInit==="function")try{h.onInit(b)}catch(a){j(a,"OnInit");throw a;}}function o(a){var c=q.top();if(g.type(c.keydown)==="function"){c=c.keydown(a,b);if(c!==K)return c}var m;b.oneTime(10,function(){U()});if(g.type(h.keydown)==="function"){c=h.keydown(a,b);if(c!==K)return c}if(b.paused()){if(a.which===
68&&a.ctrlKey){for(m=aa.length;m--;){a=aa[m];if(4!==a.readyState)try{a.abort()}catch(t){b.error("error in aborting ajax")}}b.resume();return false}}else{if(a.which!==9)T=0;if(a.which===68&&a.ctrlKey){if(r.get()==="")if(q.size()>1||h.login!==K)b.pop("");else{b.resume();b.echo("")}else b.set_command("");return false}else if(h.tabcompletion&&a.which===9){++T;var s=r.get().substring(0,r.position());a=s.split(" ");if(a.length==1)c=a[0];else{c=a[a.length-1];for(m=a.length-1;m>0;m--)if(a[m-1][a[m-1].length-
1]=="\\")c=a[m-1]+" "+c;else break}var F=RegExp("^"+c);q.top().completion(b,c,function(C){var P=[];for(m=C.length;m--;)F.test(C[m])&&P.push(C[m]);if(P.length===1)b.insert(P[0].replace(F,""));else if(P.length>1)if(T>=2){I(s);b.echo(P.join("\t"));T=0}});return false}else if(a.which===86&&a.ctrlKey)b.oneTime(1,function(){n()});else if(a.which===9&&a.ctrlKey){if(V.length()>1){b.focus(false);return false}}else if(a.which===34)b.scroll(b.height());else a.which===33?b.scroll(-b.height()):b.attr({scrollTop:b.attr("scrollHeight")})}}
function p(a){return g.map(a.match(/('[^']*'|"(\\"|[^"])*"|\/(\\\/|[^\/])*\/|(\\ |[^ ])+|[\w-]+)/g),function(c){if(c[0]==="'"&&c[c.length-1]==="'")return c.replace(/^'|'$/g,"");else if(c[0]==='"'&&c[c.length-1]==='"'){c=c.replace(/^"|"$/g,"").replace(/\\([" ])/g,"$1");return h.processArguments?c.replace(/\\\\|\\t|\\n/g,function(m){return m[1]==="t"?"\t":m[1]==="n"?"\n":"\\"}):c}else return h.processArguments?c[0]==="/"&&c[c.length-1]=="/"?RegExp(c.replace(/^\/|\/$/g,"")):c.match(/^-?[0-9]+$/)?parseInt(c,
10):c.match(/^-?[0-9]*\.[0-9]+$/)?parseFloat(c):c.replace(/\\ /g," "):c[0]==="/"&&c[c.length-1]=="/"?c:c.replace(/\\ /g," ")})}function B(a){return function(c){if(c!==""){c=p(c);var m=c[0];c=c.slice(1);var t=a[m],s=g.type(t);if(s==="function")return t.apply(b,c);else if(s==="object"||s==="string"){var F=[];if(s==="object"){for(var C in t)t.hasOwnProperty(C)&&F.push(C);t=B(t)}b.push(t,{prompt:m+"> ",name:m,completion:s==="object"?function(P,ba,qa){qa(F)}:K})}else b.error("Command '"+m+"' Not Found")}}}
var H,W,T=0,b=this;if(this.length>1)return this.each(function(){g.fn.terminal.call(g(this),d,g.extend({name:b.selector},k))});else{var E=[],G,Y=V.length(),N,e=[],h=g.extend({name:b.selector,prompt:"> ",history:true,exit:true,clear:true,enabled:true,historySize:60,displayExceptions:true,cancelableAjax:true,processArguments:true,login:null,tabcompletion:null,historyFilter:null,onInit:g.noop,onClear:g.noop,onBlur:g.noop,onFocus:g.noop,onTerminalChange:g.noop,onExit:g.noop,keypress:g.noop,keydown:g.noop},
k||{});h.width&&b.width(h.width);h.height&&b.height(h.height);H=!navigator.userAgent.toLowerCase().match(/(webkit)[ \/]([\w.]+)/)&&b[0].tagName.toLowerCase()=="body"?g("html"):b;var L=!h.enabled;if(b.length===0)throw'Sorry, but terminal said that "'+b.selector+'" is not valid selector!';b.ajaxSend(function(a,c){aa.push(c)});if(b.data("terminal"))return b.data("terminal");G=g("<div>").addClass("terminal-output").appendTo(b);b.addClass("terminal").append("<div/>");if("ontouchstart"in window||window.DocumentTouch&&
document instanceof DocumentTouch){b.click(function(){b.find("textarea").focus()});b.find("textarea").focus()}var O,S,R=[];g.extend(b,g.omap({clear:function(){G.html("");r.set("");E=[];try{h.onClear(b)}catch(a){j(a,"onClear");throw a;}b.attr({scrollTop:0});return b},export_view:function(){return{prompt:b.get_prompt(),command:b.get_command(),position:r.position(),lines:E.slice(0)}},import_view:function(a){b.set_prompt(a.prompt);b.set_command(a.command);r.position(a.position);E=a.lines;b.resize();return b},
exec:function(a,c){L?R.push([a,c]):y(a,c);return b},commands:function(){return q.top().eval},greetings:function(){D();return b},paused:function(){return L},pause:function(){if(r){L=true;b.disable();r.hidden()}return b},resume:function(){if(r){b.enable();var a=R;for(R=[];a.length;){var c=a.shift();b.exec.apply(b,c)}r.visible();n()}return b},cols:function(){return N},rows:function(){return Math.floor(b.height()/b.find(".cursor").height())},history:function(){return r.history()},next:function(){if(V.length()===
1)return b;else{var a=b.offset().top;b.height();b.scrollTop();var c=b,m=g(window).scrollTop(),t=m+g(window).height(),s=g(c).offset().top;if(s+g(c).height()>=m&&s<=t){V.front().disable();a=V.rotate().enable();c=a.offset().top-50;g("html,body").animate({scrollTop:c},500);try{h.onTerminalChange(a)}catch(F){j(F,"onTerminalChange");throw F;}return a}else{b.enable();g("html,body").animate({scrollTop:a-50},500);return b}}},focus:function(a,c){b.oneTime(1,function(){if(V.length()===1)if(a===false)try{!c&&
h.onBlur(b)!==false&&b.disable()}catch(m){j(m,"onBlur");throw m;}else try{!c&&h.onFocus(b)!==false&&b.enable()}catch(t){j(t,"onFocus");throw t;}else if(a===false)b.next();else{var s=V.front();if(s!=b){s.disable();if(!c)try{h.onTerminalChange(b)}catch(F){j(F,"onTerminalChange");throw F;}}V.set(b);b.enable()}});return b},enable:function(){N===K&&b.resize();if(L)if(r){r.enable();L=false}return b},disable:function(){if(r){L=true;r.disable()}return b},enabled:function(){return L},signature:function(){var a=
b.cols();a=a<15?null:a<35?0:a<55?1:a<64?2:a<75?3:4;return a!==null?pa[a].join("\n")+"\n":""},version:function(){return"0.6.3"},get_command:function(){return r.get()},insert:function(a){if(typeof a==="string"){r.insert(a);return b}else throw"insert function argument is not a string";},set_prompt:function(a){if(u("prompt",a)){typeof a=="function"?r.prompt(function(c){a(c,b)}):r.prompt(a);q.top().prompt=a}return b},get_prompt:function(){return q.top().prompt},set_command:function(a){r.set(a);return b},
set_mask:function(a){r.mask(a);return b},get_output:function(a){return a?E:g.map(E,function(c,m){return typeof m=="function"?m():m}).join("\n")},resize:function(a,c){if(a&&c){b.width(a);b.height(c)}a=b.width();c=b.height();N=f();r.resize(N);var m=G.detach();G.html("");g.each(E,function(t,s){l(s&&typeof s=="function"?s():s)});b.prepend(m);n();if(g.type(h.onResize)==="function"&&(S!==c||O!==a))h.onResize(b);if(S!==c||O!==a){S=c;O=a}return b},echo:function(a){E.push(a);l(g.type(a)==="function"?a():a);
U();return b},error:function(a){return b.echo("[[;#f00;]"+a.replace(/\[/g,"&#91;").replace(/\]/g,"&#93;")+"]")},scroll:function(a){var c;a=Math.round(a);if(H.prop){a>H.prop("scrollTop")&&a>0&&H.prop("scrollTop",0);c=H.prop("scrollTop")}else{a>H.attr("scrollTop")&&a>0&&H.attr("scrollTop",0);c=H.attr("scrollTop")}H.scrollTop(c+a);return b},logout:h.login?function(){for(;q.size()>1;)q.pop();M();return b}:function(){throw"You don't have login function";},token:h.login?function(){var a=h.name;return g.Storage.get("token"+
(a?"_"+a:""))}:g.noop,login_name:h.login?function(){var a=h.name;return g.Storage.get("login"+(a?"_"+a:""))}:g.noop,name:function(){return q.top().name},push:function(a,c){if(c&&(!c.prompt||u("prompt",c.prompt))||!c){c=c||{};c.name=c.name||W;q.top().mask=r.mask();if(g.type(a)==="string")a=x(a,b);else if(g.type(a)==="object"){var m=[],t;for(t in a)m.push(t);a=B(a);c=c||{};c.completion=function(s,F,C){C(m)}}else if(g.type(a)!="function")throw"Invalid value as eval in push command";q.push(g.extend({eval:a},
c));Q()}return b},pop:function(a){a!==K&&I(a);if(q.top().name===h.name){if(h.login){M();if(g.type(h.onExit)==="function")try{h.onExit(b)}catch(c){j(c,"onExit");throw c;}}}else{a=q.pop();Q();if(g.type(a.onExit)==="function")try{a.onExit(b)}catch(m){j(m,"onExit");throw m;}b.set_mask(q.top().mask)}return b},level:function(){return q.size()},reset:function(){for(b.clear();q.size()>1;)q.pop();J()}},function(a,c){return function(){try{return c.apply(this,Array.prototype.slice.apply(arguments))}catch(m){a!==
"exec"&&j(m,"TERMINAL");throw m;}}}));var U=function(){var a=i();return function(){if(a!==i()){b.resize();a=i()}}}(),v;if(h.login&&g.type(h.onBeforeLogin)==="function")try{h.onBeforeLogin(b)}catch(w){j(w,"onBeforeLogin");throw w;}if(g.type(d)==="string"){v=d;d=x(d,b)}else if(g.type(d)==="array")throw"You can't use array as eval";else if(g.type(d)==="object"){for(var A in d)d.hasOwnProperty(A)&&e.push(A);d=B(d)}else if(g.type(d)!=="function")throw'Unknow object "'+String(d)+'" passed as eval';if(v&&
(g.type(h.login)==="string"||h.login))h.login=function(a){var c=1;return function(m,t,s){b.pause();g.jrpc(v,c++,a,[m,t],function(F){b.resume();!F.error&&F.result?s(F.result):s(null)},function(F,C){b.resume();b.error("&#91;AJAX&#92; Response: "+C+"\n"+F.responseText)})}}(g.type(h.login)==="boolean"?"login":h.login);if(u("prompt",h.prompt)){var q=new ka({name:h.name,eval:d,prompt:h.prompt,completion:h.completion?h.completion:function(a,c,m){m(e)},greetings:h.greetings}),r=b.find(".terminal-output").next().cmd({prompt:h.prompt,
history:h.history,historyFilter:h.historyFilter,historySize:h.historySize,width:"100%",keydown:o,keypress:h.keypress?function(a){return h.keypress(a,b)}:null,onCommandChange:function(a){if(g.type(h.onCommandChange)==="function")try{h.onCommandChange(a,b)}catch(c){j(c,"onCommandChange");throw c;}n()},commands:y});N=f();V.append(b);h.enabled===true?b.focus(K,true):b.disable();g(document).click(function(a){!g(a.target).parents().hasClass("terminal")&&h.onBlur(b)!==false&&b.disable()});g(window).resize(function(){var a=
b.width(),c=b.height();if(S!==c||O!==a)b.resize()});b.click(function(){b.focus()});k.login&&b.token&&!b.token()&&b.login_name&&!b.login_name()?z():J();g.type(g.fn.init.prototype.mousewheel)==="function"&&b.mousewheel(function(a,c){c>0?b.scroll(-40):b.scroll(40);return false},true)}b.data("terminal",b);return b}}})(jQuery);
