(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7826],{6923:(e,t,r)=>{"use strict";r.d(t,{A:()=>a});let a=(0,r(30772).A)("clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]])},7434:(e,t,r)=>{Promise.resolve().then(r.bind(r,78477))},30772:(e,t,r)=>{"use strict";r.d(t,{A:()=>o});var a=r(12115),s=r(30907);let i=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var n=r(71265);let o=(e,t)=>{let r=(0,a.forwardRef)(({className:r,...o},l)=>(0,a.createElement)(n.default,{ref:l,iconNode:t,className:(0,s.z)(`lucide-${i(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,r),...o}));return r.displayName=i(e),r}},30907:(e,t,r)=>{"use strict";r.d(t,{z:()=>a});let a=(...e)=>e.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim()},61010:(e,t,r)=>{"use strict";r.d(t,{GR:()=>g,KH:()=>n,WY:()=>d,bA:()=>h,gp:()=>y,ii:()=>l,k8:()=>o,me:()=>x,oP:()=>p,py:()=>c,xU:()=>f,zu:()=>u});let a=`
  id
  title { romaji english native }
  coverImage { extraLarge large color }
  bannerImage
  description(asHtml: false)
  averageScore
  popularity
  episodes
  duration
  genres
  format
  season
  seasonYear
  status
  nextAiringEpisode { episode airingAt }
  trailer { id site thumbnail }
`;async function s(e,t={},r=3600){let a={method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",...!1},body:JSON.stringify({query:e,variables:t})},i=await fetch("https://graphql.anilist.co",a);if(!i.ok)throw Error(`AniList API error: ${i.status} ${i.statusText}`);let n=await i.json();if(n.errors?.length)throw Error(`AniList GraphQL error: ${n.errors[0].message}`);return n.data}let i=`
  query (
    $page: Int = 1, $perPage: Int = 20, $sort: [MediaSort], $search: String,
    $season: MediaSeason, $seasonYear: Int, $genre: String, $format: MediaFormat, $status: MediaStatus,
    $minScore: Int, $episodesGreater: Int, $episodesLesser: Int
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { total currentPage lastPage hasNextPage }
      media(
        type: ANIME, isAdult: false, sort: $sort, search: $search,
        season: $season, seasonYear: $seasonYear, genre: $genre, format: $format, status: $status,
        averageScore_greater: $minScore, episodes_greater: $episodesGreater, episodes_lesser: $episodesLesser
      ) {
        ${a}
      }
    }
  }
`;async function n(e,t=3600){return(await s(i,{page:e.page??1,perPage:e.perPage??20,sort:e.sort??["POPULARITY_DESC"],search:e.search||void 0,season:e.season||void 0,seasonYear:e.seasonYear||void 0,genre:e.genre||void 0,format:e.format||void 0,status:e.status||void 0,minScore:e.minScore||void 0,episodesGreater:e.episodesGreater||void 0,episodesLesser:e.episodesLesser||void 0},t)).Page}async function o(e=20){return(await n({sort:["TRENDING_DESC"],perPage:e},1800)).media}async function l(e=20){return(await n({sort:["POPULARITY_DESC"],perPage:e})).media}async function d(e=20){return(await n({sort:["SCORE_DESC"],perPage:e})).media}function c(){let e=new Date,t=e.getMonth()+1;return{season:t<=3?"WINTER":t<=6?"SPRING":t<=9?"SUMMER":"FALL",year:e.getFullYear()}}async function u(e,t,r=1,a=24){return n({season:e,seasonYear:t,sort:["POPULARITY_DESC"],page:r,perPage:a})}async function g(e,t=1,r=24){return n({genre:e,sort:["SCORE_DESC"],page:t,perPage:r})}let m=`
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      ${a}
      startDate { year month day }
      studios(isMain: true) { nodes { name } }
      streamingEpisodes { title thumbnail url site }
      characters(sort: ROLE, perPage: 12) {
        edges {
          role
          node { id name { full } image { large } }
          voiceActors(language: JAPANESE, sort: RELEVANCE) { id name { full } image { large } }
        }
      }
      recommendations(sort: RATING_DESC, perPage: 12) {
        nodes {
          mediaRecommendation {
            ${a}
          }
        }
      }
      relations {
        edges {
          relationType
          node {
            ${a}
          }
        }
      }
    }
  }
`;async function p(e){return(await s(m,{id:e},3600)).Media}async function h(){return(await s("query { GenreCollection }",{},86400)).GenreCollection.filter(e=>"Hentai"!==e)}function f(e){return e.title.english||e.title.romaji||e.title.native||"Unknown"}function y(e,t=0){if(!e)return"No description available.";let r=e.replace(/<br\s*\/?>/gi," ").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();return t>0&&r.length>t&&(r=r.slice(0,t).trimEnd()+"…"),r}function x(e){return e?({RELEASING:"Airing",FINISHED:"Finished",NOT_YET_RELEASED:"Upcoming",CANCELLED:"Cancelled",HIATUS:"Hiatus"})[e]??e:"Unknown"}},71265:(e,t,r)=>{"use strict";r.d(t,{default:()=>o});var a=r(12115),s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},i=r(30907);let n=(0,a.createContext)({}),o=(0,a.forwardRef)(({color:e,size:t,strokeWidth:r,absoluteStrokeWidth:o,className:l="",children:d,iconNode:c,...u},g)=>{let{size:m=24,strokeWidth:p=2,absoluteStrokeWidth:h=!1,color:f="currentColor",className:y=""}=(0,a.useContext)(n)??{},x=o??h?24*Number(r??p)/Number(t??m):r??p;return(0,a.createElement)("svg",{ref:g,...s,width:t??m??s.width,height:t??m??s.height,stroke:e??f,strokeWidth:x,className:(0,i.z)("lucide",y,l),...!d&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(u)&&{"aria-hidden":"true"},...u},[...c.map(([e,t])=>(0,a.createElement)(e,t)),...Array.isArray(d)?d:[d]])})},78477:(e,t,r)=>{"use strict";r.d(t,{ScheduleView:()=>g});var a=r(95155),s=r(12115),i=r(98500),n=r.n(i);let o=(0,r(30772).A)("timer",[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]]);var l=r(6923),d=r(61010);let c=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function u({airingAt:e}){let[t,r]=(0,s.useState)(()=>1e3*e-Date.now());if((0,s.useEffect)(()=>{let t=setInterval(()=>r(1e3*e-Date.now()),1e3);return()=>clearInterval(t)},[e]),t<=0)return(0,a.jsx)("span",{className:"rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground",children:"Aired"});let i=Math.floor(t/36e5),n=Math.floor(t%36e5/6e4),l=Math.floor(t%6e4/1e3);return(0,a.jsxs)("span",{className:"flex items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-primary",children:[(0,a.jsx)(o,{className:"h-2.5 w-2.5"}),i>0&&`${i}h `,n,"m ",String(l).padStart(2,"0"),"s"]})}function g({schedules:e}){let t=(0,s.useMemo)(()=>{let t=new Date,r=t.toDateString(),a=[];for(let s=0;s<7;s++){let i=new Date(t);i.setDate(t.getDate()+s);let n=i.toDateString(),o=0===s?"Today":1===s?"Tomorrow":c[i.getDay()],l=e.filter(e=>new Date(1e3*e.airingAt).toDateString()===n).sort((e,t)=>e.airingAt-t.airingAt);a.push({key:n,label:o,isToday:n===r,items:l})}return a},[e]),[r,i]=(0,s.useState)(()=>t[0]?.key??""),n=t.find(e=>e.key===r)??t[0];return(0,a.jsxs)("div",{className:"flex flex-col gap-6",children:[(0,a.jsx)("div",{className:"flex gap-2 overflow-x-auto pb-1",role:"tablist","aria-label":"Day of week",children:t.map(e=>(0,a.jsxs)("button",{type:"button",role:"tab","aria-selected":e.key===n?.key,onClick:()=>i(e.key),className:`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${e.key===n?.key?"bg-primary text-primary-foreground glow-primary":"bg-secondary text-muted-foreground hover:text-foreground"}`,children:[e.label,(0,a.jsx)("span",{className:"ml-2 text-xs opacity-70",children:e.items.length})]},e.key))}),n&&0===n.items.length?(0,a.jsx)("p",{className:"py-16 text-center text-muted-foreground",children:"No episodes scheduled for this day."}):(0,a.jsx)("div",{className:"grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",children:n?.items.map(e=>(0,a.jsx)(m,{item:e},e.id))})]})}function m({item:e}){let t=e.media,r=(0,d.xU)(t),s=t.coverImage.large||t.coverImage.extraLarge,i=new Date(1e3*e.airingAt).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return(0,a.jsxs)(n(),{href:`/anime/${t.id}`,className:"card-3d group flex gap-4 overflow-hidden rounded-xl border border-border bg-card p-3",children:[s?(0,a.jsx)("img",{src:s,alt:"",className:"h-24 w-16 shrink-0 rounded-lg object-cover",loading:"lazy"}):(0,a.jsx)("div",{className:"h-24 w-16 shrink-0 rounded-lg bg-secondary","aria-hidden":"true"}),(0,a.jsxs)("div",{className:"flex min-w-0 flex-col justify-center gap-1.5",children:[(0,a.jsx)("p",{className:"truncate text-sm font-semibold group-hover:text-primary transition-colors",children:r}),(0,a.jsxs)("p",{className:"text-xs text-muted-foreground",children:["Episode ",e.episode,t.episodes?` / ${t.episodes}`:""," \xb7 ",(0,d.me)(t.status)]}),(0,a.jsxs)("p",{className:"flex items-center gap-1.5 text-xs font-medium text-accent-foreground",children:[(0,a.jsx)(l.A,{className:"h-3.5 w-3.5 text-primary","aria-hidden":"true"}),i]}),(0,a.jsx)("div",{children:(0,a.jsx)(u,{airingAt:e.airingAt})})]})]})}}},e=>{e.O(0,[8500,8441,3794,7358],()=>e(e.s=7434)),_N_E=e.O()}]);