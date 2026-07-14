(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[301],{5445:(e,a,r)=>{"use strict";r.d(a,{A:()=>t});let t=(0,r(30772).A)("smile",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]])},21931:(e,a,r)=>{Promise.resolve().then(r.bind(r,76704))},24413:(e,a,r)=>{"use strict";r.d(a,{A:()=>t});let t=(0,r(30772).A)("compass",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}]])},36083:(e,a,r)=>{"use strict";r.d(a,{A:()=>t});let t=(0,r(30772).A)("trophy",[["path",{d:"M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978",key:"1n3hpd"}],["path",{d:"M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978",key:"rfe1zi"}],["path",{d:"M18 9h1.5a1 1 0 0 0 0-5H18",key:"7xy6bh"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",key:"1mhfuq"}],["path",{d:"M6 9H4.5a1 1 0 0 1 0-5H6",key:"tex48p"}]])},39979:(e,a,r)=>{"use strict";r.d(a,{A:()=>t});let t=(0,r(30772).A)("film",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M7 3v18",key:"bbkbws"}],["path",{d:"M3 7.5h4",key:"zfgn84"}],["path",{d:"M3 12h18",key:"1i2n21"}],["path",{d:"M3 16.5h4",key:"1230mu"}],["path",{d:"M17 3v18",key:"in4fa5"}],["path",{d:"M17 7.5h4",key:"myr1c1"}],["path",{d:"M17 16.5h4",key:"go4c1d"}]])},41703:(e,a,r)=>{"use strict";r.d(a,{W:()=>n,t:()=>d});var t=r(61010);let s=`
  id
  title { romaji english }
  coverImage { extraLarge large }
  bannerImage
  description(asHtml: false)
  averageScore
  genres
  episodes
  format
`,i=`
  query YearlyAwards($year: Int!) {
    overall: Page(perPage: 3) {
      media(type: ANIME, seasonYear: $year, sort: SCORE_DESC, format_in: [TV, ONA], isAdult: false, averageScore_greater: 1) {
        ${s}
      }
    }
    action: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Action", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT], isAdult: false) {
        ${s}
      }
    }
    romance: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Romance", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT], isAdult: false) {
        ${s}
      }
    }
    fantasy: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Fantasy", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT], isAdult: false) {
        ${s}
      }
    }
    comedy: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Comedy", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT], isAdult: false) {
        ${s}
      }
    }
    drama: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Drama", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT], isAdult: false) {
        ${s}
      }
    }
    psychological: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Psychological", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT, MOVIE], isAdult: false) {
        ${s}
      }
    }
    movie: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, sort: SCORE_DESC, format_in: [MOVIE], isAdult: false) {
        ${s}
      }
    }
    scifi: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Sci-Fi", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT, MOVIE], isAdult: false) {
        ${s}
      }
    }
    sliceoflife: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Slice of Life", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT], isAdult: false) {
        ${s}
      }
    }
    horror: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Horror", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT, MOVIE], isAdult: false) {
        ${s}
      }
    }
    supernatural: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Supernatural", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT], isAdult: false) {
        ${s}
      }
    }
    adventure: Page(perPage: 1) {
      media(type: ANIME, seasonYear: $year, genre: "Adventure", sort: SCORE_DESC, format_in: [TV, ONA, TV_SHORT], isAdult: false) {
        ${s}
      }
    }
  }
`;function o(e){let a=e.title.romaji,r=e.title.english;return{id:e.id,title:r||a,englishTitle:r&&r!==a?r:null,coverImage:e.coverImage.extraLarge||e.coverImage.large||"",bannerImage:e.bannerImage,averageScore:e.averageScore,genres:e.genres??[],episodes:e.episodes,format:e.format,description:(0,t.gp)(e.description,220)}}function l(e){return e.length>0?o(e[0]):null}async function n(e){let a=await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","User-Agent":"OtakuInsider/1.0 (https://github.com/Shouvikdasprojects)"},body:JSON.stringify({query:i,variables:{year:e}}),next:{revalidate:21600}});if(!a.ok)throw Error(`AniList error: ${a.status}`);let r=await a.json();if(r.errors?.length)throw Error(r.errors[0].message);let t=r.data;return{year:e,overall:t.overall.media.slice(0,3).map(o),action:l(t.action.media),romance:l(t.romance.media),fantasy:l(t.fantasy.media),comedy:l(t.comedy.media),drama:l(t.drama.media),psychological:l(t.psychological.media),movie:l(t.movie.media),scifi:l(t.scifi.media),sliceOfLife:l(t.sliceoflife.media),horror:l(t.horror.media),supernatural:l(t.supernatural.media),adventure:l(t.adventure.media)}}let d=Array.from({length:new Date().getFullYear()-2013},(e,a)=>new Date().getFullYear()-a)},49804:(e,a,r)=>{"use strict";r.d(a,{A:()=>t});let t=(0,r(30772).A)("zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]])},54757:(e,a,r)=>{"use strict";r.d(a,{A:()=>t});let t=(0,r(30772).A)("heart",[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]])},61010:(e,a,r)=>{"use strict";r.d(a,{GR:()=>p,KH:()=>o,WY:()=>d,bA:()=>h,gp:()=>y,ii:()=>n,k8:()=>l,me:()=>f,oP:()=>x,py:()=>c,xU:()=>u,zu:()=>m});let t=`
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
`;async function s(e,a={},r=3600){let t={method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",...!1},body:JSON.stringify({query:e,variables:a})},i=await fetch("https://graphql.anilist.co",t);if(!i.ok)throw Error(`AniList API error: ${i.status} ${i.statusText}`);let o=await i.json();if(o.errors?.length)throw Error(`AniList GraphQL error: ${o.errors[0].message}`);return o.data}let i=`
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
`;async function o(e,a=3600){return(await s(i,{page:e.page??1,perPage:e.perPage??20,sort:e.sort??["POPULARITY_DESC"],search:e.search||void 0,season:e.season||void 0,seasonYear:e.seasonYear||void 0,genre:e.genre||void 0,format:e.format||void 0,status:e.status||void 0,minScore:e.minScore||void 0,episodesGreater:e.episodesGreater||void 0,episodesLesser:e.episodesLesser||void 0},a)).Page}async function l(e=20){return(await o({sort:["TRENDING_DESC"],perPage:e},1800)).media}async function n(e=20){return(await o({sort:["POPULARITY_DESC"],perPage:e})).media}async function d(e=20){return(await o({sort:["SCORE_DESC"],perPage:e})).media}function c(){let e=new Date,a=e.getMonth()+1;return{season:a<=3?"WINTER":a<=6?"SPRING":a<=9?"SUMMER":"FALL",year:e.getFullYear()}}async function m(e,a,r=1,t=24){return o({season:e,seasonYear:a,sort:["POPULARITY_DESC"],page:r,perPage:t})}async function p(e,a=1,r=24){return o({genre:e,sort:["SCORE_DESC"],page:a,perPage:r})}let g=`
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
`;async function x(e){return(await s(g,{id:e},3600)).Media}async function h(){return(await s("query { GenreCollection }",{},86400)).GenreCollection.filter(e=>"Hentai"!==e)}function u(e){return e.title.english||e.title.romaji||e.title.native||"Unknown"}function y(e,a=0){if(!e)return"No description available.";let r=e.replace(/<br\s*\/?>/gi," ").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();return a>0&&r.length>a&&(r=r.slice(0,a).trimEnd()+"…"),r}function f(e){return e?({RELEASING:"Airing",FINISHED:"Finished",NOT_YET_RELEASED:"Upcoming",CANCELLED:"Cancelled",HIATUS:"Hiatus"})[e]??e:"Unknown"}},76704:(e,a,r)=>{"use strict";r.d(a,{AwardsClient:()=>_});var t=r(95155),s=r(12115),i=r(98500),o=r.n(i),l=r(5772),n=r(49804),d=r(54757),c=r(86272),m=r(5445),p=r(39979),g=r(30772);let x=(0,g.A)("brain-circuit",[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4",key:"10igwf"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M12 13h4",key:"1ku699"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1",key:"105ag5"}],["path",{d:"M12 8h8",key:"1lhi5i"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2",key:"u6izg6"}],["circle",{cx:"16",cy:"13",r:".5",key:"ry7gng"}],["circle",{cx:"18",cy:"3",r:".5",key:"1aiba7"}],["circle",{cx:"20",cy:"21",r:".5",key:"yhc1fs"}],["circle",{cx:"20",cy:"8",r:".5",key:"1e43v0"}]]),h=(0,g.A)("clapperboard",[["path",{d:"m12.296 3.464 3.02 3.956",key:"qash78"}],["path",{d:"M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z",key:"1h7j8b"}],["path",{d:"M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"4lm6w1"}],["path",{d:"m6.18 5.276 3.1 3.899",key:"zjj9t3"}]]),u=(0,g.A)("rocket",[["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}],["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09",key:"u4xsad"}],["path",{d:"M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z",key:"676m9"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05",key:"92ym6u"}]]),y=(0,g.A)("flower-2",[["path",{d:"M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1",key:"3pnvol"}],["circle",{cx:"12",cy:"8",r:"2",key:"1822b1"}],["path",{d:"M12 10v12",key:"6ubwww"}],["path",{d:"M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z",key:"9hd38g"}],["path",{d:"M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z",key:"ufn41s"}]]),f=(0,g.A)("skull",[["path",{d:"m12.5 17-.5-1-.5 1h1z",key:"3me087"}],["path",{d:"M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z",key:"1o5pge"}],["circle",{cx:"15",cy:"12",r:"1",key:"1tmaij"}],["circle",{cx:"9",cy:"12",r:"1",key:"1vctgf"}]]),b=(0,g.A)("wand-sparkles",[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]]);var v=r(24413),k=r(95697),N=r(36083),j=r(78780),A=r(76721);let w=(0,g.A)("medal",[["path",{d:"M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",key:"143lza"}],["path",{d:"M11 12 5.12 2.2",key:"qhuxz6"}],["path",{d:"m13 12 5.88-9.8",key:"hbye0f"}],["path",{d:"M8 7h8",key:"i86dvs"}],["circle",{cx:"12",cy:"17",r:"5",key:"qbz8iq"}],["path",{d:"M12 18v-2h-.5",key:"fawc4q"}]]);var S=r(41703);let E=[{key:"action",label:"Best Action",Icon:n.A,ring:"ring-orange-400/40",bg:"from-orange-500/15 to-orange-900/5",text:"text-orange-400"},{key:"romance",label:"Best Romance",Icon:d.A,ring:"ring-pink-400/40",bg:"from-pink-500/15 to-pink-900/5",text:"text-pink-400"},{key:"fantasy",label:"Best Fantasy",Icon:c.A,ring:"ring-purple-400/40",bg:"from-purple-500/15 to-purple-900/5",text:"text-purple-400"},{key:"comedy",label:"Best Comedy",Icon:m.A,ring:"ring-yellow-400/40",bg:"from-yellow-500/15 to-yellow-900/5",text:"text-yellow-400"},{key:"drama",label:"Best Drama",Icon:p.A,ring:"ring-teal-400/40",bg:"from-teal-500/15 to-teal-900/5",text:"text-teal-400"},{key:"psychological",label:"Best Psychological",Icon:x,ring:"ring-violet-400/40",bg:"from-violet-600/15 to-violet-900/5",text:"text-violet-400"},{key:"movie",label:"Best Movie",Icon:h,ring:"ring-amber-400/40",bg:"from-amber-500/15 to-amber-900/5",text:"text-amber-400"},{key:"scifi",label:"Best Sci-Fi",Icon:u,ring:"ring-cyan-400/40",bg:"from-cyan-500/15 to-cyan-900/5",text:"text-cyan-400"},{key:"sliceOfLife",label:"Best Slice of Life",Icon:y,ring:"ring-emerald-400/40",bg:"from-emerald-500/15 to-emerald-900/5",text:"text-emerald-400"},{key:"horror",label:"Best Horror",Icon:f,ring:"ring-red-500/40",bg:"from-red-900/20 to-red-950/5",text:"text-red-400"},{key:"supernatural",label:"Best Supernatural",Icon:b,ring:"ring-indigo-400/40",bg:"from-indigo-500/15 to-indigo-900/5",text:"text-indigo-400"},{key:"adventure",label:"Best Adventure",Icon:v.A,ring:"ring-orange-300/40",bg:"from-amber-400/15 to-orange-900/5",text:"text-orange-300"}];function M({score:e}){return e?(0,t.jsxs)("span",{className:`flex items-center gap-1 font-bold ${e>=85?"text-emerald-400":e>=70?"text-primary":"text-orange-400"}`,children:[(0,t.jsx)(k.A,{className:"h-3.5 w-3.5 fill-current","aria-hidden":"true"}),(e/10).toFixed(1)]}):null}function $({anime:e,label:a,Icon:r,ring:s,bg:i,text:n}){return e?(0,t.jsxs)(o(),{href:`/anime/${e.id}`,className:`group flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br ${i}
        ring-0 transition-all duration-300 hover:ring-1 ${s} hover:scale-[1.02] hover:shadow-2xl`,children:[(0,t.jsxs)("div",{className:`flex items-center gap-2 px-4 pt-4 pb-3 text-[10px] font-bold uppercase tracking-[0.12em] ${n}`,children:[(0,t.jsx)(r,{className:"h-3.5 w-3.5"}),a]}),(0,t.jsxs)("div",{className:"flex gap-3 px-4 pb-4",children:[(0,t.jsx)("div",{className:"relative h-20 w-14 shrink-0 overflow-hidden rounded-xl shadow-lg ring-1 ring-white/10",children:(0,t.jsx)(l.default,{src:e.coverImage,alt:e.title,fill:!0,className:"object-cover transition-transform duration-500 group-hover:scale-110",unoptimized:!0})}),(0,t.jsxs)("div",{className:"min-w-0 flex-1 flex flex-col justify-center gap-1",children:[(0,t.jsx)("p",{className:"line-clamp-2 text-sm font-semibold leading-tight text-foreground group-hover:text-primary transition-colors",children:e.title}),(0,t.jsxs)("div",{className:"flex items-center gap-2 flex-wrap",children:[(0,t.jsx)(M,{score:e.averageScore}),e.format&&(0,t.jsx)("span",{className:"text-[10px] text-muted-foreground uppercase tracking-wide",children:e.format.replace("_"," ")})]}),e.genres.slice(0,2).map(e=>(0,t.jsx)("span",{className:"inline-block w-fit text-[10px] px-1.5 py-0.5 rounded-full border border-white/10 text-muted-foreground",children:e},e))]})]})]}):(0,t.jsxs)("div",{className:`group flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br ${i} p-4 opacity-50`,children:[(0,t.jsxs)("div",{className:`mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${n}`,children:[(0,t.jsx)(r,{className:"h-3.5 w-3.5"}),a]}),(0,t.jsx)("p",{className:"text-sm text-muted-foreground",children:"No data for this year"})]})}function I({anime:e,rank:a}){return(0,t.jsxs)(o(),{href:`/anime/${e.id}`,className:"group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-all hover:bg-white/[0.05] hover:scale-[1.01]",children:[(0,t.jsxs)("span",{className:"w-6 text-center text-lg font-black text-muted-foreground/60",children:["#",a]}),(0,t.jsx)("div",{className:"relative h-12 w-9 shrink-0 overflow-hidden rounded-lg",children:(0,t.jsx)(l.default,{src:e.coverImage,alt:e.title,fill:!0,className:"object-cover",unoptimized:!0})}),(0,t.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,t.jsx)("p",{className:"truncate text-sm font-medium group-hover:text-primary transition-colors",children:e.title}),(0,t.jsx)(M,{score:e.averageScore})]})]})}function _({year:e}){let[a,r]=(0,s.useState)(null),[i,n]=(0,s.useState)(!0);(0,s.useEffect)(()=>{let a=!0;return n(!0),(0,S.W)(e).then(e=>{a&&(r(e),n(!1))}).catch(e=>{console.error(e),a&&n(!1)}),()=>{a=!1}},[e]);let d=e-1,c=e+1,m=d>=S.t[S.t.length-1],p=c<=S.t[0];return(0,t.jsxs)("div",{className:"min-h-screen bg-background",children:[(0,t.jsxs)("section",{className:"relative overflow-hidden border-b border-white/[0.06]",style:{background:"radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.88 0.11 90 / 10%), transparent)"},children:[(0,t.jsxs)("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden","aria-hidden":"true",children:[(0,t.jsx)("div",{className:"h-[500px] w-[500px] rounded-full border border-primary/10 opacity-50"}),(0,t.jsx)("div",{className:"absolute h-[700px] w-[700px] rounded-full border border-primary/5"}),(0,t.jsx)("div",{className:"absolute h-[900px] w-[900px] rounded-full border border-primary/[0.03]"})]}),(0,t.jsxs)("div",{className:"relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 text-center",children:[(0,t.jsx)("div",{className:"mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/80",style:{boxShadow:"0 0 40px oklch(0.88 0.11 90 / 30%), 0 0 80px oklch(0.88 0.11 90 / 10%)"},children:(0,t.jsx)(N.A,{className:"h-9 w-9 text-primary","aria-hidden":"true"})}),(0,t.jsx)("p",{className:"mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground",children:"Otaku Insider Presents"}),(0,t.jsx)("h1",{className:"text-4xl font-black tracking-tight sm:text-6xl",children:(0,t.jsx)("span",{className:"bg-gradient-to-r from-primary via-yellow-300 to-primary bg-clip-text text-transparent",style:{backgroundSize:"200% auto",animation:"shimmer 3s linear infinite"},children:"Anime Awards"})}),(0,t.jsx)("p",{className:"mt-3 text-5xl font-black tabular-nums text-foreground/80 sm:text-7xl",children:e}),(0,t.jsxs)("p",{className:"mt-4 text-sm text-muted-foreground",children:["The best anime of ",e,", ranked by AniList community scores"]}),(0,t.jsxs)("div",{className:"mt-10 flex items-center justify-center gap-3",children:[m?(0,t.jsx)(o(),{href:`/awards?year=${d}`,className:"flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-foreground","aria-label":`Go to ${d} awards`,children:(0,t.jsx)(j.A,{className:"h-4 w-4"})}):(0,t.jsx)("div",{className:"h-9 w-9"}),(0,t.jsx)("div",{className:"flex flex-wrap justify-center gap-1.5 max-w-lg",children:S.t.slice(0,10).map(a=>(0,t.jsx)(o(),{href:`/awards?year=${a}`,className:`rounded-full px-3 py-1 text-xs font-semibold transition-all
                    ${a===e?"bg-primary text-primary-foreground shadow-[0_0_12px_oklch(0.88_0.11_90_/_35%)]":"border border-border bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground"}`,children:a},a))}),p?(0,t.jsx)(o(),{href:`/awards?year=${c}`,className:"flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-foreground","aria-label":`Go to ${c} awards`,children:(0,t.jsx)(A.A,{className:"h-4 w-4"})}):(0,t.jsx)("div",{className:"h-9 w-9"})]})]})]}),(0,t.jsxs)("div",{className:"mx-auto max-w-5xl px-4 py-12 sm:px-6 space-y-14",children:[i||!a?(0,t.jsxs)("div",{className:"flex flex-col items-center justify-center space-y-6 py-20 text-muted-foreground",children:[(0,t.jsx)("div",{className:"h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"}),(0,t.jsxs)("p",{children:["Gathering the winners for ",e,"..."]})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("section",{"aria-labelledby":"aoty-heading",children:[(0,t.jsxs)("div",{className:"mb-6 flex items-center gap-3",children:[(0,t.jsx)(N.A,{className:"h-5 w-5 text-primary","aria-hidden":"true"}),(0,t.jsx)("h2",{id:"aoty-heading",className:"text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground",children:"Anime of the Year"})]}),a.overall[0]?(0,t.jsxs)("div",{className:"group relative overflow-hidden rounded-3xl border border-white/[0.08] shadow-2xl",children:[(0,t.jsxs)("div",{className:"absolute inset-0",children:[a.overall[0].bannerImage?(0,t.jsx)(l.default,{src:a.overall[0].bannerImage,alt:"",fill:!0,className:"object-cover opacity-30",unoptimized:!0,priority:!0}):(0,t.jsx)("div",{className:"h-full w-full",style:{background:"radial-gradient(ellipse at top, oklch(0.88 0.11 90 / 15%), transparent 70%)"}}),(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40"}),(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"})]}),(0,t.jsxs)(o(),{href:`/anime/${a.overall[0].id}`,className:"relative flex flex-col sm:flex-row items-start sm:items-center gap-6 p-8",children:[(0,t.jsxs)("div",{className:"absolute right-6 top-6 flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 backdrop-blur-sm",children:[(0,t.jsx)(N.A,{className:"h-3.5 w-3.5 text-primary","aria-hidden":"true"}),(0,t.jsx)("span",{className:"text-[10px] font-bold uppercase tracking-widest text-primary",children:"Winner"})]}),(0,t.jsx)("div",{className:"relative h-52 w-36 sm:h-60 sm:w-44 shrink-0 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-[1.02]",style:{boxShadow:"0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px oklch(0.88 0.11 90 / 20%)"},children:(0,t.jsx)(l.default,{src:a.overall[0].coverImage,alt:a.overall[0].title,fill:!0,className:"object-cover",unoptimized:!0,priority:!0})}),(0,t.jsxs)("div",{className:"flex-1 space-y-3",children:[(0,t.jsx)("p",{className:"text-xs font-semibold uppercase tracking-widest text-muted-foreground",children:a.overall[0].genres.slice(0,3).join(" \xb7 ")}),(0,t.jsx)("h3",{className:"text-3xl font-black leading-tight text-foreground group-hover:text-primary transition-colors sm:text-4xl",children:a.overall[0].title}),a.overall[0].englishTitle&&(0,t.jsx)("p",{className:"text-sm text-muted-foreground",children:a.overall[0].englishTitle}),(0,t.jsxs)("div",{className:"flex flex-wrap items-center gap-4 pt-1",children:[a.overall[0].averageScore&&(0,t.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,t.jsx)(k.A,{className:"h-5 w-5 fill-primary text-primary","aria-hidden":"true"}),(0,t.jsx)("span",{className:"text-2xl font-black text-primary",children:(a.overall[0].averageScore/10).toFixed(1)}),(0,t.jsx)("span",{className:"text-sm text-muted-foreground",children:"/10"})]}),a.overall[0].episodes&&(0,t.jsxs)("span",{className:"text-sm text-muted-foreground",children:[a.overall[0].episodes," episodes"]}),a.overall[0].format&&(0,t.jsx)("span",{className:"rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground",children:a.overall[0].format.replace("_"," ")})]}),a.overall[0].description&&(0,t.jsx)("p",{className:"text-sm text-muted-foreground leading-relaxed line-clamp-3 max-w-xl",children:a.overall[0].description})]})]})]}):(0,t.jsxs)("div",{className:"rounded-3xl border border-white/[0.06] bg-secondary/30 p-12 text-center text-muted-foreground",children:["No data available for ",e]}),a.overall.slice(1).length>0&&(0,t.jsx)("div",{className:"mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2",children:a.overall.slice(1).map((e,a)=>(0,t.jsx)(I,{anime:e,rank:a+2},e.id))})]}),(0,t.jsxs)("section",{"aria-labelledby":"categories-heading",children:[(0,t.jsxs)("div",{className:"mb-6 flex items-center gap-3",children:[(0,t.jsx)(w,{className:"h-5 w-5 text-primary","aria-hidden":"true"}),(0,t.jsx)("h2",{id:"categories-heading",className:"text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground",children:"Category Awards"})]}),(0,t.jsx)("div",{className:"grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",children:E.map(({key:e,label:r,Icon:s,ring:i,bg:o,text:l})=>(0,t.jsx)($,{anime:a[e],label:r,Icon:s,ring:i,bg:o,text:l},e))})]})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between rounded-2xl border border-white/[0.06] bg-secondary/20 px-6 py-4",children:[m?(0,t.jsxs)(o(),{href:`/awards?year=${d}`,className:"flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground",children:[(0,t.jsx)(j.A,{className:"h-4 w-4"}),d," Awards"]}):(0,t.jsx)("div",{}),(0,t.jsx)("span",{className:"text-xs text-muted-foreground",children:"Data powered by AniList"}),p?(0,t.jsxs)(o(),{href:`/awards?year=${c}`,className:"flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground",children:[c," Awards",(0,t.jsx)(A.A,{className:"h-4 w-4"})]}):(0,t.jsx)("div",{})]})]})]})}},76721:(e,a,r)=>{"use strict";r.d(a,{A:()=>t});let t=(0,r(30772).A)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]])},78780:(e,a,r)=>{"use strict";r.d(a,{A:()=>t});let t=(0,r(30772).A)("chevron-left",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]])},86272:(e,a,r)=>{"use strict";r.d(a,{A:()=>t});let t=(0,r(30772).A)("sparkles",[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]])}},e=>{e.O(0,[8500,5232,8441,3794,7358],()=>e(e.s=21931)),_N_E=e.O()}]);