/* Page 10 refinement layer: FAQ hero, accordion readability and bottom callout copy. */
(function(){
  function injectPage10RefinementStyles(){
    var old=document.getElementById('roadmap-page10-refinement-style');
    if(old) old.remove();
    var style=document.createElement('style');
    style.id='roadmap-page10-refinement-style';
    style.textContent=`
      .rm10-hero{
        min-height:310px!important;
        padding:48px 52px!important;
        margin-bottom:28px!important;
      }
      .rm10-hero:after{
        opacity:.34!important;
        filter:saturate(.98) contrast(1)!important;
        width:46%!important;
      }
      .rm10-hero-inner{
        max-width:780px!important;
      }
      .rm10-hero h1{
        font-size:clamp(40px,4.85vw,60px)!important;
        line-height:1.03!important;
        letter-spacing:-.055em!important;
        max-width:760px!important;
      }
      .rm10-hero h2{
        margin-top:20px!important;
        font-size:clamp(24px,2.8vw,34px)!important;
        line-height:1.12!important;
      }
      .rm10-hero p{
        margin-top:14px!important;
        font-size:17.5px!important;
        line-height:1.5!important;
        max-width:680px!important;
      }
      .rm10-faq-card{
        margin-top:4px!important;
      }
      .rm10-faq-header{
        padding:30px 32px 26px!important;
      }
      .rm10-faq-header h2{
        font-size:32px!important;
        line-height:1.08!important;
      }
      .rm10-faq-header p{
        font-size:16px!important;
        line-height:1.5!important;
      }
      .rm10-print-note{
        display:none!important;
      }
      .rm10-accordion{
        padding:16px 26px 28px!important;
      }
      .rm10-acc{
        padding-top:3px!important;
        padding-bottom:3px!important;
      }
      .rm10-acc-btn{
        padding:24px 4px!important;
      }
      .rm10-acc-btn h3{
        font-size:25px!important;
        line-height:1.14!important;
      }
      .rm10-acc-btn p{
        font-size:15px!important;
        line-height:1.45!important;
      }
      .rm10-more{
        min-width:98px!important;
        background:#eaf6f5!important;
        color:#087a78!important;
        border:1px solid rgba(8,122,120,.28)!important;
        padding:10px 14px!important;
      }
      .rm10-acc.is-open .rm10-more{
        background:#dff3f1!important;
        color:#087a78!important;
        border-color:rgba(8,122,120,.34)!important;
      }
      .rm10-qa-grid{
        gap:18px!important;
      }
      .rm10-qa{
        padding:22px 22px!important;
      }
      .rm10-qa h4{
        font-size:18px!important;
        line-height:1.3!important;
        margin-bottom:10px!important;
      }
      .rm10-qa p{
        font-size:15.5px!important;
        line-height:1.6!important;
        font-weight:680!important;
      }
      .rm10-bottom{
        padding:34px 38px!important;
      }
      .rm10-bottom h2{
        font-size:34px!important;
        line-height:1.06!important;
      }
      .rm10-bottom p{
        font-size:18px!important;
        line-height:1.5!important;
        color:#071f3a!important;
        font-weight:760!important;
      }
      @media(max-width:900px){
        .rm10-hero{min-height:auto!important;padding:30px 24px!important;}
        .rm10-hero:after{opacity:.16!important;width:72%!important;}
      }
    `;
    document.head.appendChild(style);
  }

  function postProcessPage10(root){
    if(!root) return;
    var hero=root.querySelector('.rm10-hero');
    if(hero){
      var h1=hero.querySelector('h1');
      var h2=hero.querySelector('h2');
      var p=hero.querySelector('p');
      var customer='';
      if(h1){
        customer=h1.textContent
          .replace(/^Customer FAQ’s for\s*/i,'')
          .replace(/^Customer FAQs for\s*/i,'')
          .replace(/^FAQ’s for\s*/i,'')
          .replace(/^FAQs for\s*/i,'')
          .trim();
        h1.textContent='FAQs for '+customer;
      }
      if(h2) h2.textContent='Clear answers before you move forward.';
      if(p) p.textContent='These questions explain how BuySooner works in plain English.';
    }

    var header=root.querySelector('.rm10-faq-header p');
    if(header){
      header.textContent='Open each section to review the answers. The full FAQ is included when printed or saved.';
    }

    var bottom=root.querySelector('.rm10-bottom');
    if(bottom){
      var h2=bottom.querySelector('h2');
      var p=bottom.querySelector('p');
      if(h2) h2.textContent='With BuySooner, you get the keys today.';
      if(p) p.textContent='Build equity sooner and move toward a standard mortgage when the numbers are ready.';
    }
  }

  function wrapWhenReady(){
    if(typeof window.renderRoadmapPage10!=='function'){
      setTimeout(wrapWhenReady,30);
      return;
    }
    if(window.renderRoadmapPage10.__page10Refined) return;
    var original=window.renderRoadmapPage10;
    window.renderRoadmapPage10=function(data,root){
      original(data,root);
      injectPage10RefinementStyles();
      postProcessPage10(root);
      setTimeout(function(){postProcessPage10(root);},0);
    };
    window.renderRoadmapPage10.__page10Refined=true;
  }

  injectPage10RefinementStyles();
  wrapWhenReady();
})();
