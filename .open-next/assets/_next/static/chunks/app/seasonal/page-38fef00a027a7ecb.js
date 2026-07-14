(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5067],{21327:(e,r,a)=>{Promise.resolve().then(a.bind(a,44940))},30772:(e,r,a)=>{"use strict";a.d(r,{A:()=>i});var t=a(12115),s=a(30907);let n=e=>{let r=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,a)=>a?a.toUpperCase():r.toLowerCase());return r.charAt(0).toUpperCase()+r.slice(1)};var o=a(71265);let i=(e,r)=>{let a=(0,t.forwardRef)(({className:a,...i},l)=>(0,t.createElement)(o.default,{ref:l,iconNode:r,className:(0,s.z)(`lucide-${n(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,a),...i}));return a.displayName=n(e),a}},30907:(e,r,a)=>{"use strict";a.d(r,{z:()=>t});let t=(...e)=>e.filter((e,r,a)=>!!e&&""!==e.trim()&&a.indexOf(e)===r).join(" ").trim()},40006:(e,r,a)=>{"use strict";a.d(r,{R:()=>l});var t=a(95155),s=a(98500),n=a.n(s),o=a(95697),i=a(61010);function l({anime:e,rank:r,className:a="w-40 sm:w-44 shrink-0"}){let s=(0,i.xU)(e),d=e.coverImage.extraLarge||e.coverImage.large;return(0,t.jsxs)(n(),{href:`/anime/${e.id}`,className:`card-3d group relative flex flex-col overflow-hidden rounded-xl bg-card ${a}`,children:[(0,t.jsxs)("div",{className:"relative aspect-[2/3] w-full overflow-hidden",children:[(0,t.jsx)("img",{src:d||"/placeholder.svg?height=264&width=176&query=anime%20poster",alt:s,loading:"lazy",className:"h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"}),(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"}),"number"==typeof r&&(0,t.jsxs)("span",{className:"absolute left-2 top-2 flex h-7 min-w-7 items-center justify-center rounded-md bg-primary px-1.5 font-mono text-xs font-bold text-primary-foreground glow-primary",children:["#",r]}),null!=e.averageScore&&(0,t.jsxs)("span",{className:"absolute right-2 top-2 flex items-center gap-1 rounded-md bg-background/80 px-1.5 py-0.5 text-xs font-semibold backdrop-blur",children:[(0,t.jsx)(o.A,{className:"h-3 w-3 fill-chart-3 text-chart-3","aria-hidden":"true"}),(e.averageScore/10).toFixed(1)]})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-1 p-3",children:[(0,t.jsx)("h3",{className:"line-clamp-2 text-sm font-semibold leading-snug text-pretty",children:s}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground",children:[e.format?.replace("_"," "),e.episodes?`${e.episodes} ep`:(0,i.me)(e.status)].filter(Boolean).join(" \xb7 ")})]})]})}},44940:(e,r,a)=>{"use strict";a.r(r),a.d(r,{default:()=>h});var t=a(95155),s=a(12115),n=a(98500),o=a.n(n),i=a(73321),l=a(40006),d=a(59153),c=a(61010);let u=["WINTER","SPRING","SUMMER","FALL"];function m(e){return e.charAt(0)+e.slice(1).toLowerCase()}function g(){return(0,t.jsx)("div",{className:"grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",children:Array.from({length:18}).map((e,r)=>(0,t.jsx)("div",{className:"aspect-[2/3] w-full animate-pulse rounded-xl bg-card"},r))})}function p({season:e,year:r,page:a}){let[n,o]=(0,s.useState)(null),[i,u]=(0,s.useState)(!0);return((0,s.useEffect)(()=>{let t=!0;return u(!0),(0,c.zu)(e,r,a,24).then(e=>{t&&(o(e),u(!1))}).catch(e=>{console.error(e),t&&u(!1)}),()=>{t=!1}},[e,r,a]),i)?(0,t.jsx)(g,{}):n&&0!==n.media.length?(0,t.jsxs)("div",{className:"flex flex-col gap-10",children:[(0,t.jsx)("div",{className:"grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",children:n.media.map(e=>(0,t.jsx)(l.R,{anime:e,className:"w-full"},e.id))}),(0,t.jsx)(d.S,{basePath:"/seasonal",params:{season:e,year:String(r)},currentPage:n.pageInfo.currentPage,lastPage:n.pageInfo.lastPage})]}):(0,t.jsx)("p",{className:"py-16 text-center text-muted-foreground",children:"No anime found for this season yet."})}function f(){let e=(0,i.useSearchParams)(),r=(0,s.useMemo)(()=>(0,c.py)(),[]),a=e.get("season"),n=e.get("year"),l=e.get("page"),d=u.includes(a??"")?a:r.season,g=Number.parseInt(n??"",10)||r.year,f=Math.max(1,Number.parseInt(l??"1",10)||1),h=Array.from({length:8},(e,a)=>r.year+1-a);return(0,t.jsxs)("div",{className:"mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6",children:[(0,t.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,t.jsxs)("h1",{className:"text-3xl font-bold tracking-tight sm:text-4xl",children:[m(d)," ",g," Anime Season"]}),(0,t.jsx)("p",{className:"text-muted-foreground",children:"The full lineup for the season, ranked by popularity."})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-3 rounded-2xl border border-border bg-card p-4",children:[(0,t.jsx)("div",{className:"flex flex-wrap gap-2",role:"group","aria-label":"Select season",children:u.map(e=>(0,t.jsx)(o(),{href:`/seasonal?season=${e}&year=${g}`,"aria-current":e===d?"page":void 0,className:`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${e===d?"bg-primary text-primary-foreground glow-primary":"bg-secondary text-secondary-foreground hover:bg-accent"}`,children:m(e)},e))}),(0,t.jsx)("div",{className:"flex flex-wrap gap-2",role:"group","aria-label":"Select year",children:h.map(e=>(0,t.jsx)(o(),{href:`/seasonal?season=${d}&year=${e}`,"aria-current":e===g?"page":void 0,className:`rounded-full px-4 py-1.5 font-mono text-xs transition-colors ${e===g?"bg-foreground text-background":"bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground"}`,children:e},e))})]}),(0,t.jsx)(p,{season:d,year:g,page:f})]})}function h(){return(0,t.jsx)(s.Suspense,{fallback:(0,t.jsx)("div",{className:"p-8 text-center text-muted-foreground",children:"Loading seasonal catalog..."}),children:(0,t.jsx)(f,{})})}},59153:(e,r,a)=>{"use strict";a.d(r,{S:()=>l});var t=a(95155),s=a(98500),n=a.n(s),o=a(78780),i=a(76721);function l({basePath:e,params:r,currentPage:a,lastPage:s}){function d(a){let t=new URLSearchParams({...r,page:String(a)});return`${e}?${t.toString()}`}let c=Math.min(s,500);return(0,t.jsxs)("nav",{className:"flex items-center justify-center gap-3","aria-label":"Pagination",children:[a>1?(0,t.jsxs)(n(),{href:d(a-1),className:"flex items-center gap-1 rounded-full border border-border bg-secondary px-4 py-2 text-sm transition-colors hover:bg-accent",children:[(0,t.jsx)(o.A,{className:"h-4 w-4","aria-hidden":"true"})," Prev"]}):(0,t.jsxs)("span",{className:"flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground opacity-50",children:[(0,t.jsx)(o.A,{className:"h-4 w-4","aria-hidden":"true"})," Prev"]}),(0,t.jsxs)("span",{className:"font-mono text-sm text-muted-foreground",children:["Page ",a," of ",c]}),a<c?(0,t.jsxs)(n(),{href:d(a+1),className:"flex items-center gap-1 rounded-full border border-border bg-secondary px-4 py-2 text-sm transition-colors hover:bg-accent",children:["Next ",(0,t.jsx)(i.A,{className:"h-4 w-4","aria-hidden":"true"})]}):(0,t.jsxs)("span",{className:"flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground opacity-50",children:["Next ",(0,t.jsx)(i.A,{className:"h-4 w-4","aria-hidden":"true"})]})]})}},61010:(e,r,a)=>{"use strict";a.d(r,{GR:()=>m,KH:()=>o,WY:()=>d,bA:()=>f,gp:()=>x,ii:()=>l,k8:()=>i,me:()=>y,oP:()=>p,py:()=>c,xU:()=>h,zu:()=>u});let t=`
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
`;async function s(e,r={},a=3600){let t={method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",...!1},body:JSON.stringify({query:e,variables:r})},n=await fetch("https://graphql.anilist.co",t);if(!n.ok)throw Error(`AniList API error: ${n.status} ${n.statusText}`);let o=await n.json();if(o.errors?.length)throw Error(`AniList GraphQL error: ${o.errors[0].message}`);return o.data}let n=`
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
        ${t}
      }
    }
  }
`;async function o(e,r=3600){return(await s(n,{page:e.page??1,perPage:e.perPage??20,sort:e.sort??["POPULARITY_DESC"],search:e.search||void 0,season:e.season||void 0,seasonYear:e.seasonYear||void 0,genre:e.genre||void 0,format:e.format||void 0,status:e.status||void 0,minScore:e.minScore||void 0,episodesGreater:e.episodesGreater||void 0,episodesLesser:e.episodesLesser||void 0},r)).Page}async function i(e=20){return(await o({sort:["TRENDING_DESC"],perPage:e},1800)).media}async function l(e=20){return(await o({sort:["POPULARITY_DESC"],perPage:e})).media}async function d(e=20){return(await o({sort:["SCORE_DESC"],perPage:e})).media}function c(){let e=new Date,r=e.getMonth()+1;return{season:r<=3?"WINTER":r<=6?"SPRING":r<=9?"SUMMER":"FALL",year:e.getFullYear()}}async function u(e,r,a=1,t=24){return o({season:e,seasonYear:r,sort:["POPULARITY_DESC"],page:a,perPage:t})}async function m(e,r=1,a=24){return o({genre:e,sort:["SCORE_DESC"],page:r,perPage:a})}let g=`
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      ${t}
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
            ${t}
          }
        }
      }
      relations {
        edges {
          relationType
          node {
            ${t}
          }
        }
      }
    }
  }
`;async function p(e){return(await s(g,{id:e},3600)).Media}async function f(){return(await s("query { GenreCollection }",{},86400)).GenreCollection.filter(e=>"Hentai"!==e)}function h(e){return e.title.english||e.title.romaji||e.title.native||"Unknown"}function x(e,r=0){if(!e)return"No description available.";let a=e.replace(/<br\s*\/?>/gi," ").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();return r>0&&a.length>r&&(a=a.slice(0,r).trimEnd()+"…"),a}function y(e){return e?({RELEASING:"Airing",FINISHED:"Finished",NOT_YET_RELEASED:"Upcoming",CANCELLED:"Cancelled",HIATUS:"Hiatus"})[e]??e:"Unknown"}},71265:(e,r,a)=>{"use strict";a.d(r,{default:()=>i});var t=a(12115),s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},n=a(30907);let o=(0,t.createContext)({}),i=(0,t.forwardRef)(({color:e,size:r,strokeWidth:a,absoluteStrokeWidth:i,className:l="",children:d,iconNode:c,...u},m)=>{let{size:g=24,strokeWidth:p=2,absoluteStrokeWidth:f=!1,color:h="currentColor",className:x=""}=(0,t.useContext)(o)??{},y=i??f?24*Number(a??p)/Number(r??g):a??p;return(0,t.createElement)("svg",{ref:m,...s,width:r??g??s.width,height:r??g??s.height,stroke:e??h,strokeWidth:y,className:(0,n.z)("lucide",x,l),...!d&&!(e=>{for(let r in e)if(r.startsWith("aria-")||"role"===r||"title"===r)return!0;return!1})(u)&&{"aria-hidden":"true"},...u},[...c.map(([e,r])=>(0,t.createElement)(e,r)),...Array.isArray(d)?d:[d]])})},73321:(e,r,a)=>{"use strict";var t=a(74645);a.o(t,"useParams")&&a.d(r,{useParams:function(){return t.useParams}}),a.o(t,"usePathname")&&a.d(r,{usePathname:function(){return t.usePathname}}),a.o(t,"useRouter")&&a.d(r,{useRouter:function(){return t.useRouter}}),a.o(t,"useSearchParams")&&a.d(r,{useSearchParams:function(){return t.useSearchParams}})},76721:(e,r,a)=>{"use strict";a.d(r,{A:()=>t});let t=(0,a(30772).A)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]])},78780:(e,r,a)=>{"use strict";a.d(r,{A:()=>t});let t=(0,a(30772).A)("chevron-left",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]])},95697:(e,r,a)=>{"use strict";a.d(r,{A:()=>t});let t=(0,a(30772).A)("star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]])}},e=>{e.O(0,[8500,8441,3794,7358],()=>e(e.s=21327)),_N_E=e.O()}]);