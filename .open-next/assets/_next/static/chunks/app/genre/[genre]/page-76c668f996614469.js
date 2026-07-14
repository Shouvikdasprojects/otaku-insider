(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7922],{30772:(e,r,t)=>{"use strict";t.d(r,{A:()=>i});var a=t(12115),s=t(30907);let n=e=>{let r=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,t)=>t?t.toUpperCase():r.toLowerCase());return r.charAt(0).toUpperCase()+r.slice(1)};var o=t(71265);let i=(e,r)=>{let t=(0,a.forwardRef)(({className:t,...i},l)=>(0,a.createElement)(o.default,{ref:l,iconNode:r,className:(0,s.z)(`lucide-${n(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,t),...i}));return t.displayName=n(e),t}},30907:(e,r,t)=>{"use strict";t.d(r,{z:()=>a});let a=(...e)=>e.filter((e,r,t)=>!!e&&""!==e.trim()&&t.indexOf(e)===r).join(" ").trim()},40006:(e,r,t)=>{"use strict";t.d(r,{R:()=>l});var a=t(95155),s=t(98500),n=t.n(s),o=t(95697),i=t(61010);function l({anime:e,rank:r,className:t="w-40 sm:w-44 shrink-0"}){let s=(0,i.xU)(e),d=e.coverImage.extraLarge||e.coverImage.large;return(0,a.jsxs)(n(),{href:`/anime/${e.id}`,className:`card-3d group relative flex flex-col overflow-hidden rounded-xl bg-card ${t}`,children:[(0,a.jsxs)("div",{className:"relative aspect-[2/3] w-full overflow-hidden",children:[(0,a.jsx)("img",{src:d||"/placeholder.svg?height=264&width=176&query=anime%20poster",alt:s,loading:"lazy",className:"h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"}),(0,a.jsx)("div",{className:"absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"}),"number"==typeof r&&(0,a.jsxs)("span",{className:"absolute left-2 top-2 flex h-7 min-w-7 items-center justify-center rounded-md bg-primary px-1.5 font-mono text-xs font-bold text-primary-foreground glow-primary",children:["#",r]}),null!=e.averageScore&&(0,a.jsxs)("span",{className:"absolute right-2 top-2 flex items-center gap-1 rounded-md bg-background/80 px-1.5 py-0.5 text-xs font-semibold backdrop-blur",children:[(0,a.jsx)(o.A,{className:"h-3 w-3 fill-chart-3 text-chart-3","aria-hidden":"true"}),(e.averageScore/10).toFixed(1)]})]}),(0,a.jsxs)("div",{className:"flex flex-col gap-1 p-3",children:[(0,a.jsx)("h3",{className:"line-clamp-2 text-sm font-semibold leading-snug text-pretty",children:s}),(0,a.jsx)("p",{className:"text-xs text-muted-foreground",children:[e.format?.replace("_"," "),e.episodes?`${e.episodes} ep`:(0,i.me)(e.status)].filter(Boolean).join(" \xb7 ")})]})]})}},59153:(e,r,t)=>{"use strict";t.d(r,{S:()=>l});var a=t(95155),s=t(98500),n=t.n(s),o=t(78780),i=t(76721);function l({basePath:e,params:r,currentPage:t,lastPage:s}){function d(t){let a=new URLSearchParams({...r,page:String(t)});return`${e}?${a.toString()}`}let c=Math.min(s,500);return(0,a.jsxs)("nav",{className:"flex items-center justify-center gap-3","aria-label":"Pagination",children:[t>1?(0,a.jsxs)(n(),{href:d(t-1),className:"flex items-center gap-1 rounded-full border border-border bg-secondary px-4 py-2 text-sm transition-colors hover:bg-accent",children:[(0,a.jsx)(o.A,{className:"h-4 w-4","aria-hidden":"true"})," Prev"]}):(0,a.jsxs)("span",{className:"flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground opacity-50",children:[(0,a.jsx)(o.A,{className:"h-4 w-4","aria-hidden":"true"})," Prev"]}),(0,a.jsxs)("span",{className:"font-mono text-sm text-muted-foreground",children:["Page ",t," of ",c]}),t<c?(0,a.jsxs)(n(),{href:d(t+1),className:"flex items-center gap-1 rounded-full border border-border bg-secondary px-4 py-2 text-sm transition-colors hover:bg-accent",children:["Next ",(0,a.jsx)(i.A,{className:"h-4 w-4","aria-hidden":"true"})]}):(0,a.jsxs)("span",{className:"flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground opacity-50",children:["Next ",(0,a.jsx)(i.A,{className:"h-4 w-4","aria-hidden":"true"})]})]})}},61010:(e,r,t)=>{"use strict";t.d(r,{GR:()=>m,KH:()=>o,WY:()=>d,bA:()=>h,gp:()=>x,ii:()=>l,k8:()=>i,me:()=>N,oP:()=>p,py:()=>c,xU:()=>f,zu:()=>u});let a=`
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
`;async function s(e,r={},t=3600){let a={method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",...!1},body:JSON.stringify({query:e,variables:r})},n=await fetch("https://graphql.anilist.co",a);if(!n.ok)throw Error(`AniList API error: ${n.status} ${n.statusText}`);let o=await n.json();if(o.errors?.length)throw Error(`AniList GraphQL error: ${o.errors[0].message}`);return o.data}let n=`
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
`;async function o(e,r=3600){return(await s(n,{page:e.page??1,perPage:e.perPage??20,sort:e.sort??["POPULARITY_DESC"],search:e.search||void 0,season:e.season||void 0,seasonYear:e.seasonYear||void 0,genre:e.genre||void 0,format:e.format||void 0,status:e.status||void 0,minScore:e.minScore||void 0,episodesGreater:e.episodesGreater||void 0,episodesLesser:e.episodesLesser||void 0},r)).Page}async function i(e=20){return(await o({sort:["TRENDING_DESC"],perPage:e},1800)).media}async function l(e=20){return(await o({sort:["POPULARITY_DESC"],perPage:e})).media}async function d(e=20){return(await o({sort:["SCORE_DESC"],perPage:e})).media}function c(){let e=new Date,r=e.getMonth()+1;return{season:r<=3?"WINTER":r<=6?"SPRING":r<=9?"SUMMER":"FALL",year:e.getFullYear()}}async function u(e,r,t=1,a=24){return o({season:e,seasonYear:r,sort:["POPULARITY_DESC"],page:t,perPage:a})}async function m(e,r=1,t=24){return o({genre:e,sort:["SCORE_DESC"],page:r,perPage:t})}let g=`
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
`;async function p(e){return(await s(g,{id:e},3600)).Media}async function h(){return(await s("query { GenreCollection }",{},86400)).GenreCollection.filter(e=>"Hentai"!==e)}function f(e){return e.title.english||e.title.romaji||e.title.native||"Unknown"}function x(e,r=0){if(!e)return"No description available.";let t=e.replace(/<br\s*\/?>/gi," ").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();return r>0&&t.length>r&&(t=t.slice(0,r).trimEnd()+"…"),t}function N(e){return e?({RELEASING:"Airing",FINISHED:"Finished",NOT_YET_RELEASED:"Upcoming",CANCELLED:"Cancelled",HIATUS:"Hiatus"})[e]??e:"Unknown"}},61015:(e,r,t)=>{Promise.resolve().then(t.bind(t,70267))},70267:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>m});var a=t(95155),s=t(12115),n=t(73321),o=t(40006),i=t(59153),l=t(61010);function d(){return(0,a.jsx)("div",{className:"grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",children:Array.from({length:18}).map((e,r)=>(0,a.jsx)("div",{className:"aspect-[2/3] w-full animate-pulse rounded-xl bg-card"},r))})}function c({genre:e,page:r}){let[t,n]=(0,s.useState)(null),[u,m]=(0,s.useState)(!0);return((0,s.useEffect)(()=>{let t=!0;return m(!0),(0,l.GR)(e,r,24).then(e=>{t&&(n(e),m(!1))}).catch(e=>{console.error(e),t&&m(!1)}),()=>{t=!1}},[e,r]),u)?(0,a.jsx)(d,{}):t&&0!==t.media.length?(0,a.jsxs)("div",{className:"flex flex-col gap-10",children:[(0,a.jsx)("div",{className:"grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",children:t.media.map((e,t)=>(0,a.jsx)(o.R,{anime:e,className:"w-full",rank:(r-1)*24+t+1},e.id))}),(0,a.jsx)(i.S,{basePath:`/genre/${encodeURIComponent(e)}`,params:{},currentPage:t.pageInfo.currentPage,lastPage:t.pageInfo.lastPage})]}):(0,a.jsx)("p",{className:"py-16 text-center text-muted-foreground",children:"No anime found for this genre."})}function u({genreParam:e}){let r=(0,n.useSearchParams)(),t=decodeURIComponent(e),s=Math.max(1,Number.parseInt(r.get("page")??"1",10)||1);return(0,a.jsxs)("div",{className:"mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6",children:[(0,a.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,a.jsxs)("h1",{className:"text-3xl font-bold tracking-tight sm:text-4xl",children:["Best ",(0,a.jsx)("span",{className:"text-primary",children:t})," Anime"]}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["The highest-rated ",t.toLowerCase()," anime, ranked by score."]})]}),(0,a.jsx)(c,{genre:t,page:s})]})}function m({params:e}){let{genre:r}=(0,s.use)(e);return(0,a.jsx)(s.Suspense,{fallback:(0,a.jsxs)("div",{className:"mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6",children:[(0,a.jsx)("div",{className:"h-24 animate-pulse rounded-2xl bg-card"}),(0,a.jsx)(d,{})]}),children:(0,a.jsx)(u,{genreParam:r})})}},71265:(e,r,t)=>{"use strict";t.d(r,{default:()=>i});var a=t(12115),s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},n=t(30907);let o=(0,a.createContext)({}),i=(0,a.forwardRef)(({color:e,size:r,strokeWidth:t,absoluteStrokeWidth:i,className:l="",children:d,iconNode:c,...u},m)=>{let{size:g=24,strokeWidth:p=2,absoluteStrokeWidth:h=!1,color:f="currentColor",className:x=""}=(0,a.useContext)(o)??{},N=i??h?24*Number(t??p)/Number(r??g):t??p;return(0,a.createElement)("svg",{ref:m,...s,width:r??g??s.width,height:r??g??s.height,stroke:e??f,strokeWidth:N,className:(0,n.z)("lucide",x,l),...!d&&!(e=>{for(let r in e)if(r.startsWith("aria-")||"role"===r||"title"===r)return!0;return!1})(u)&&{"aria-hidden":"true"},...u},[...c.map(([e,r])=>(0,a.createElement)(e,r)),...Array.isArray(d)?d:[d]])})},73321:(e,r,t)=>{"use strict";var a=t(74645);t.o(a,"useParams")&&t.d(r,{useParams:function(){return a.useParams}}),t.o(a,"usePathname")&&t.d(r,{usePathname:function(){return a.usePathname}}),t.o(a,"useRouter")&&t.d(r,{useRouter:function(){return a.useRouter}}),t.o(a,"useSearchParams")&&t.d(r,{useSearchParams:function(){return a.useSearchParams}})},76721:(e,r,t)=>{"use strict";t.d(r,{A:()=>a});let a=(0,t(30772).A)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]])},78780:(e,r,t)=>{"use strict";t.d(r,{A:()=>a});let a=(0,t(30772).A)("chevron-left",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]])},95697:(e,r,t)=>{"use strict";t.d(r,{A:()=>a});let a=(0,t(30772).A)("star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]])}},e=>{e.O(0,[8500,8441,3794,7358],()=>e(e.s=61015)),_N_E=e.O()}]);