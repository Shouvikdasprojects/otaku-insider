(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3367],{30772:(e,r,t)=>{"use strict";t.d(r,{A:()=>o});var a=t(12115),s=t(30907);let i=e=>{let r=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,t)=>t?t.toUpperCase():r.toLowerCase());return r.charAt(0).toUpperCase()+r.slice(1)};var n=t(71265);let o=(e,r)=>{let t=(0,a.forwardRef)(({className:t,...o},l)=>(0,a.createElement)(n.default,{ref:l,iconNode:r,className:(0,s.z)(`lucide-${i(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,t),...o}));return t.displayName=i(e),t}},30907:(e,r,t)=>{"use strict";t.d(r,{z:()=>a});let a=(...e)=>e.filter((e,r,t)=>!!e&&""!==e.trim()&&t.indexOf(e)===r).join(" ").trim()},61010:(e,r,t)=>{"use strict";t.d(r,{GR:()=>g,KH:()=>n,WY:()=>d,bA:()=>h,gp:()=>x,ii:()=>l,k8:()=>o,me:()=>E,oP:()=>m,py:()=>c,xU:()=>f,zu:()=>u});let a=`
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
`;async function s(e,r={},t=3600){let a={method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",...!1},body:JSON.stringify({query:e,variables:r})},i=await fetch("https://graphql.anilist.co",a);if(!i.ok)throw Error(`AniList API error: ${i.status} ${i.statusText}`);let n=await i.json();if(n.errors?.length)throw Error(`AniList GraphQL error: ${n.errors[0].message}`);return n.data}let i=`
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
`;async function n(e,r=3600){return(await s(i,{page:e.page??1,perPage:e.perPage??20,sort:e.sort??["POPULARITY_DESC"],search:e.search||void 0,season:e.season||void 0,seasonYear:e.seasonYear||void 0,genre:e.genre||void 0,format:e.format||void 0,status:e.status||void 0,minScore:e.minScore||void 0,episodesGreater:e.episodesGreater||void 0,episodesLesser:e.episodesLesser||void 0},r)).Page}async function o(e=20){return(await n({sort:["TRENDING_DESC"],perPage:e},1800)).media}async function l(e=20){return(await n({sort:["POPULARITY_DESC"],perPage:e})).media}async function d(e=20){return(await n({sort:["SCORE_DESC"],perPage:e})).media}function c(){let e=new Date,r=e.getMonth()+1;return{season:r<=3?"WINTER":r<=6?"SPRING":r<=9?"SUMMER":"FALL",year:e.getFullYear()}}async function u(e,r,t=1,a=24){return n({season:e,seasonYear:r,sort:["POPULARITY_DESC"],page:t,perPage:a})}async function g(e,r=1,t=24){return n({genre:e,sort:["SCORE_DESC"],page:r,perPage:t})}let p=`
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
`;async function m(e){return(await s(p,{id:e},3600)).Media}async function h(){return(await s("query { GenreCollection }",{},86400)).GenreCollection.filter(e=>"Hentai"!==e)}function f(e){return e.title.english||e.title.romaji||e.title.native||"Unknown"}function x(e,r=0){if(!e)return"No description available.";let t=e.replace(/<br\s*\/?>/gi," ").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();return r>0&&t.length>r&&(t=t.slice(0,r).trimEnd()+"…"),t}function E(e){return e?({RELEASING:"Airing",FINISHED:"Finished",NOT_YET_RELEASED:"Upcoming",CANCELLED:"Cancelled",HIATUS:"Hiatus"})[e]??e:"Unknown"}},67416:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>d});var a=t(95155),s=t(12115),i=t(98500),n=t.n(i),o=t(90467),l=t(61010);function d(){let[e,r]=(0,s.useState)([]),[t,i]=(0,s.useState)(!0);return(0,s.useEffect)(()=>{let e=!0;return i(!0),(0,l.bA)().then(t=>{e&&(r(t),i(!1))}).catch(r=>{console.error(r),e&&i(!1)}),()=>{e=!1}},[]),(0,a.jsxs)("div",{className:"mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6",children:[(0,a.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,a.jsx)("h1",{className:"text-3xl font-bold tracking-tight sm:text-4xl",children:"Browse by Genre"}),(0,a.jsx)("p",{className:"text-muted-foreground",children:"Find the top-rated anime in every genre."})]}),t?(0,a.jsx)("div",{className:"grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",children:Array.from({length:16}).map((e,r)=>(0,a.jsx)("div",{className:"h-20 animate-pulse rounded-2xl bg-card"},r))}):(0,a.jsx)("div",{className:"grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",children:e.map(e=>(0,a.jsxs)(n(),{href:`/genre/${encodeURIComponent(e)}`,className:"card-3d group flex items-center justify-between rounded-2xl border border-border bg-card p-5",children:[(0,a.jsx)("span",{className:"text-lg font-semibold",children:e}),(0,a.jsx)(o.A,{className:"h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary","aria-hidden":"true"})]},e))})]})}},71265:(e,r,t)=>{"use strict";t.d(r,{default:()=>o});var a=t(12115),s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},i=t(30907);let n=(0,a.createContext)({}),o=(0,a.forwardRef)(({color:e,size:r,strokeWidth:t,absoluteStrokeWidth:o,className:l="",children:d,iconNode:c,...u},g)=>{let{size:p=24,strokeWidth:m=2,absoluteStrokeWidth:h=!1,color:f="currentColor",className:x=""}=(0,a.useContext)(n)??{},E=o??h?24*Number(t??m)/Number(r??p):t??m;return(0,a.createElement)("svg",{ref:g,...s,width:r??p??s.width,height:r??p??s.height,stroke:e??f,strokeWidth:E,className:(0,i.z)("lucide",x,l),...!d&&!(e=>{for(let r in e)if(r.startsWith("aria-")||"role"===r||"title"===r)return!0;return!1})(u)&&{"aria-hidden":"true"},...u},[...c.map(([e,r])=>(0,a.createElement)(e,r)),...Array.isArray(d)?d:[d]])})},87139:(e,r,t)=>{Promise.resolve().then(t.bind(t,67416))},90467:(e,r,t)=>{"use strict";t.d(r,{A:()=>a});let a=(0,t(30772).A)("arrow-right",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]])}},e=>{e.O(0,[8500,8441,3794,7358],()=>e(e.s=87139)),_N_E=e.O()}]);