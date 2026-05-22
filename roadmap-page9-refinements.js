/* Page 9 refinement layer: hero, refinance copy, assumptions readability and tracking layout. */
(function(){
  function injectPage9RefinementStyles(){
    if(document.getElementById('roadmap-page9-refinement-style')) return;
    var style=document.createElement('style');
    style.id='roadmap-page9-refinement-style';
    style.textContent=`
      .rm9-hero{
        min-height:270px!important;
        padding:38px 42px!important;
        margin-bottom:20px!important;
      }
      .rm9-hero:after{
        opacity:.30!important;
        filter:saturate(.98) contrast(1)!important;
      }
      .rm9-hero-inner{
        max-width:720px!important;
      }
      .rm9-hero h1{
        font-size:clamp(42px,5.2vw,66px)!important;
        line-height:.96!important;
        letter-spacing:-.065em!important;
        max-width:720px!important;
      }
      .rm9-hero h2{
        margin:16px 0 0!important;
        color:#087a78!important;
        font-size:clamp(24px,2.9vw,34px)!important;
        line-height:1.04!important;
        letter-spacing:-.045em!important;
        max-width:690px!important;
      }
      .rm9-hero h2 span{display:inline!important;color:#087a78!important;}
      .rm9-hero p{
        margin-top:12px!important;
        max-width:720px!important;
        font-size:16.4px!important;
        line-height:1.5!important;
        font-weight:760!important;
      }
      .rm9-refi-card{
        padding:27px 28px!important;
      }
      .rm9-refi-card h3{
        font-size:26px!important;
        margin-bottom:7px!important;
      }
      .rm9-refi-subtitle{
        margin:0 0 9px!important;
        color:#071f3a!important;
        font-size:18px!important;
        line-height:1.35!important;
        font-weight:900!important;
      }
      .rm9-refi-text{
        margin:0!important;
        color:#526071!important;
        font-size:15.9px!important;
        line-height:1.52!important;
        font-weight:760!important;
      }
      .rm9-workings{
        font-size:15.7px!important;
        line-height:1.42!important;
        padding:13px 16px!important;
      }
      .rm9-track-grid{
        grid-template-columns:1fr!important;
        gap:14px!important;
      }
      .rm9-track{
        min-height:0!important;
        padding:20px 22px!important;
      }
      .rm9-track h3{
        font-size:21px!important;
      }
      .rm9-track p{
        font-size:15.2px!important;
      }
      @media(max-width:900px){
        .rm9-hero{min-height:auto!important;padding:30px 24px!important;}
        .rm9-hero:after{opacity:.16!important;}
      }
    `;
    document.head.appendChild(style);
  }

  function postProcessPage9(root){
    if(!root) return;
    var hero=root.querySelector('.rm9-hero');
    if(hero){
      var h1=hero.querySelector('h1');
      var h2=hero.querySelector('h2');
      var p=hero.querySelector('p');
      if(h1) h1.textContent='Your Exit Path: The Bridge to Full Ownership';
      if(h2) h2.textContent='BuySooner is your stepping stone to homeownership, not a forever loan.';
      if(p) p.textContent='The goal is simple: get you into your home today, help you build equity, and seamlessly transition you to a standard bank mortgage the moment the numbers stack up. We succeed when you move on to standard financing.';
    }

    var refi=root.querySelector('.rm9-refi-card');
    if(refi){
      var h3=refi.querySelector('h3');
      if(h3) h3.textContent='The Refinance Moment';
      var firstP=refi.querySelector(':scope > p');
      if(firstP){
        firstP.outerHTML='<p class="rm9-refi-subtitle">It’s not just about hitting a specific date — it’s about readiness.</p><p class="rm9-refi-text">Once a standard bank approves a loan to cover the full position, they take over, BuySooner steps out, and you move to a traditional mortgage.</p>';
      }
    }
  }

  function wrapWhenReady(){
    if(typeof window.renderRoadmapPage9!=='function'){
      setTimeout(wrapWhenReady,30);
      return;
    }
    if(window.renderRoadmapPage9.__page9Refined) return;
    var original=window.renderRoadmapPage9;
    window.renderRoadmapPage9=function(data,root){
      original(data,root);
      injectPage9RefinementStyles();
      postProcessPage9(root);
      setTimeout(function(){postProcessPage9(root);},0);
    };
    window.renderRoadmapPage9.__page9Refined=true;
  }

  injectPage9RefinementStyles();
  wrapWhenReady();
})();
