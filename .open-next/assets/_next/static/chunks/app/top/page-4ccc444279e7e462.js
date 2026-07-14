(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3058],{59153:(e,r,a)=>{"use strict";a.d(r,{S:()=>l});var s=a(95155),t=a(98500),n=a.n(t),i=a(78780),o=a(76721);function l({basePath:e,params:r,currentPage:a,lastPage:t}){function d(a){let s=new URLSearchParams({...r,page:String(a)});return`${e}?${s.toString()}`}let c=Math.min(t,500);return(0,s.jsxs)("nav",{className:"flex items-center justify-center gap-3","aria-label":"Pagination",children:[a>1?(0,s.jsxs)(n(),{href:d(a-1),className:"flex items-center gap-1 rounded-full border border-border bg-secondary px-4 py-2 text-sm transition-colors hover:bg-accent",children:[(0,s.jsx)(i.A,{className:"h-4 w-4","aria-hidden":"true"})," Prev"]}):(0,s.jsxs)("span",{className:"flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground opacity-50",children:[(0,s.jsx)(i.A,{className:"h-4 w-4","aria-hidden":"true"})," Prev"]}),(0,s.jsxs)("span",{className:"font-mono text-sm text-muted-foreground",children:["Page ",a," of ",c]}),a<c?(0,s.jsxs)(n(),{href:d(a+1),className:"flex items-center gap-1 rounded-full border border-border bg-secondary px-4 py-2 text-sm transition-colors hover:bg-accent",children:["Next ",(0,s.jsx)(o.A,{className:"h-4 w-4","aria-hidden":"true"})]}):(0,s.jsxs)("span",{className:"flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground opacity-50",children:["Next ",(0,s.jsx)(o.A,{className:"h-4 w-4","aria-hidden":"true"})]})]})}},61010:(e,r,a)=>{"use strict";a.d(r,{GR:()=>u,KH:()=>i,WY:()=>d,bA:()=>x,gp:()=>f,ii:()=>l,k8:()=>o,me:()=>N,oP:()=>h,py:()=>c,xU:()=>g,zu:()=>m});let s=`
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
`;async function t(e,r={},a=3600){let s={method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",...!1},body:JSON.stringify({query:e,variables:r})},n=await fetch("https://graphql.anilist.co",s);if(!n.ok)throw Error(`AniList API error: ${n.status} ${n.statusText}`);let i=await n.json();if(i.errors?.length)throw Error(`AniList GraphQL error: ${i.errors[0].message}`);return i.data}let n=`
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
        ${s}
      }
    }
  }
`;async function i(e,r=3600){return(await t(n,{page:e.page??1,perPage:e.perPage??20,sort:e.sort??["POPULARITY_DESC"],search:e.search||void 0,season:e.season||void 0,seasonYear:e.seasonYear||void 0,genre:e.genre||void 0,format:e.format||void 0,status:e.status||void 0,minScore:e.minScore||void 0,episodesGreater:e.episodesGreater||void 0,episodesLesser:e.episodesLesser||void 0},r)).Page}async function o(e=20){return(await i({sort:["TRENDING_DESC"],perPage:e},1800)).media}async function l(e=20){return(await i({sort:["POPULARITY_DESC"],perPage:e})).media}async function d(e=20){return(await i({sort:["SCORE_DESC"],perPage:e})).media}function c(){let e=new Date,r=e.getMonth()+1;return{season:r<=3?"WINTER":r<=6?"SPRING":r<=9?"SUMMER":"FALL",year:e.getFullYear()}}async function m(e,r,a=1,s=24){return i({season:e,seasonYear:r,sort:["POPULARITY_DESC"],page:a,perPage:s})}async function u(e,r=1,a=24){return i({genre:e,sort:["SCORE_DESC"],page:r,perPage:a})}let p=`
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      ${s}
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
            ${s}
          }
        }
      }
      relations {
        edges {
          relationType
          node {
            ${s}
          }
        }
      }
    }
  }
`;async function h(e){return(await t(p,{id:e},3600)).Media}async function x(){return(await t("query { GenreCollection }",{},86400)).GenreCollection.filter(e=>"Hentai"!==e)}function g(e){return e.title.english||e.title.romaji||e.title.native||"Unknown"}function f(e,r=0){if(!e)return"No description available.";let a=e.replace(/<br\s*\/?>/gi," ").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();return r>0&&a.length>r&&(a=a.slice(0,r).trimEnd()+"…"),a}function N(e){return e?({RELEASING:"Airing",FINISHED:"Finished",NOT_YET_RELEASED:"Upcoming",CANCELLED:"Cancelled",HIATUS:"Hiatus"})[e]??e:"Unknown"}},67236:(e,r,a)=>{Promise.resolve().then(a.bind(a,79925))},73321:(e,r,a)=>{"use strict";var s=a(74645);a.o(s,"useParams")&&a.d(r,{useParams:function(){return s.useParams}}),a.o(s,"usePathname")&&a.d(r,{usePathname:function(){return s.usePathname}}),a.o(s,"useRouter")&&a.d(r,{useRouter:function(){return s.useRouter}}),a.o(s,"useSearchParams")&&a.d(r,{useSearchParams:function(){return s.useSearchParams}})},76721:(e,r,a)=>{"use strict";a.d(r,{A:()=>s});let s=(0,a(30772).A)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]])},78780:(e,r,a)=>{"use strict";a.d(r,{A:()=>s});let s=(0,a(30772).A)("chevron-left",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]])},79925:(e,r,a)=>{"use strict";a.r(r),a.d(r,{default:()=>x});var s=a(95155),t=a(12115),n=a(5772),i=a(98500),o=a.n(i),l=a(73321);let d=(0,a(30772).A)("tv",[["path",{d:"m17 2-5 5-5-5",key:"16satq"}],["rect",{width:"20",height:"15",x:"2",y:"7",rx:"2",key:"1e6viu"}]]);var c=a(95697),m=a(61010),u=a(59153);function p(){return(0,s.jsx)("div",{className:"mt-8 flex flex-col gap-3",children:Array.from({length:25}).map((e,r)=>(0,s.jsx)("div",{className:"flex h-24 w-full animate-pulse items-center gap-4 rounded-xl bg-card p-3"},r))})}function h(){let e=Math.min(Math.max(Number((0,l.useSearchParams)().get("page"))||1,1),4),[r,a]=(0,t.useState)(null),[i,h]=(0,t.useState)(!0);return(0,t.useEffect)(()=>{let r=!0;return h(!0),(0,m.KH)({sort:["SCORE_DESC"],page:e,perPage:25}).then(e=>{r&&(a(e),h(!1))}).catch(e=>{console.error(e),r&&h(!1)}),()=>{r=!1}},[e]),(0,s.jsxs)("div",{className:"mx-auto max-w-5xl px-4 py-10 sm:px-6",children:[(0,s.jsxs)("h1",{className:"text-3xl font-bold tracking-tight text-balance",children:["Top 100 ",(0,s.jsx)("span",{className:"text-primary",children:"Anime"})]}),(0,s.jsx)("p",{className:"mt-2 text-muted-foreground",children:"The highest-rated series of all time, ranked by community score."}),i||!r?(0,s.jsx)(p,{}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("ol",{className:"mt-8 flex flex-col gap-3",children:r.media.map((r,a)=>{let t=(e-1)*25+a+1;return(0,s.jsx)("li",{children:(0,s.jsxs)(o(),{href:`/anime/${r.id}`,className:"group flex items-center gap-4 rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-accent",children:[(0,s.jsx)("span",{className:`w-12 shrink-0 text-center text-2xl font-bold tabular-nums ${t<=3?"text-primary":"text-muted-foreground"}`,children:t}),(0,s.jsx)("div",{className:"relative h-20 w-14 shrink-0 overflow-hidden rounded-md",children:(0,s.jsx)(n.default,{src:r.coverImage.large||"/placeholder.svg?height=80&width=56",alt:(0,m.xU)(r),fill:!0,sizes:"56px",className:"object-cover"})}),(0,s.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,s.jsx)("h2",{className:"truncate font-semibold group-hover:text-primary",children:(0,m.xU)(r)}),(0,s.jsxs)("div",{className:"mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground",children:[(0,s.jsxs)("span",{className:"flex items-center gap-1",children:[(0,s.jsx)(d,{className:"h-3.5 w-3.5","aria-hidden":"true"}),r.format??"—",r.episodes?` \xb7 ${r.episodes} ep`:""]}),(0,s.jsx)("span",{children:(0,m.me)(r.status)}),(0,s.jsx)("span",{className:"hidden sm:inline",children:r.seasonYear??""})]}),(0,s.jsx)("p",{className:"mt-1 hidden truncate text-sm text-muted-foreground sm:block",children:r.genres.slice(0,4).join(" \xb7 ")})]}),null!=r.averageScore&&(0,s.jsxs)("span",{className:"flex shrink-0 items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-sm font-semibold",children:[(0,s.jsx)(c.A,{className:"h-4 w-4 fill-primary text-primary","aria-hidden":"true"}),(r.averageScore/10).toFixed(1)]})]})},r.id)})}),(0,s.jsx)("div",{className:"mt-10",children:(0,s.jsx)(u.S,{currentPage:e,lastPage:Math.min(r.pageInfo.lastPage,4),basePath:"/top",params:{}})})]})]})}function x(){return(0,s.jsx)(t.Suspense,{fallback:(0,s.jsxs)("div",{className:"mx-auto max-w-5xl px-4 py-10 sm:px-6",children:[(0,s.jsxs)("h1",{className:"text-3xl font-bold tracking-tight text-balance",children:["Top 100 ",(0,s.jsx)("span",{className:"text-primary",children:"Anime"})]}),(0,s.jsx)(p,{})]}),children:(0,s.jsx)(h,{})})}}},e=>{e.O(0,[8500,5232,8441,3794,7358],()=>e(e.s=67236)),_N_E=e.O()}]);