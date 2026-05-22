/* Page 9 refinement layer: hero, refinance copy, assumptions readability, tracking layout and calculator modal UX. */
(function(){
  function injectPage9RefinementStyles(){
    if(document.getElementById('roadmap-page9-refinement-style')) return;
    var style=document.createElement('style');
    style.id='roadmap-page9-refinement-style';
    style.textContent=`
      .rm9-hero{min-height:270px!important;padding:38px 42px!important;margin-bottom:20px!important;}
      .rm9-hero:after{opacity:.30!important;filter:saturate(.98) contrast(1)!important;}
      .rm9-hero-inner{max-width:720px!important;}
      .rm9-hero h1{font-size:clamp(42px,5.2vw,66px)!important;line-height:.96!important;letter-spacing:-.065em!important;max-width:720px!important;}
      .rm9-hero h2{margin:16px 0 0!important;color:#087a78!important;font-size:clamp(24px,2.9vw,34px)!important;line-height:1.04!important;letter-spacing:-.045em!important;max-width:690px!important;}
      .rm9-hero h2 span{display:inline!important;color:#087a78!important;}
      .rm9-hero p{margin-top:12px!important;max-width:720px!important;font-size:16.4px!important;line-height:1.5!important;font-weight:760!important;}
      .rm9-refi-card{padding:27px 28px!important;}
      .rm9-refi-card h3{font-size:26px!important;margin-bottom:7px!important;}
      .rm9-refi-subtitle{margin:0 0 9px!important;color:#071f3a!important;font-size:18px!important;line-height:1.35!important;font-weight:900!important;}
      .rm9-refi-text{margin:0!important;color:#526071!important;font-size:15.9px!important;line-height:1.52!important;font-weight:760!important;}
      .rm9-workings{font-size:15.7px!important;line-height:1.42!important;padding:13px 16px!important;}
      .rm9-track-grid{grid-template-columns:1fr!important;gap:14px!important;}
      .rm9-track{min-height:0!important;padding:20px 22px!important;}
      .rm9-track h3{font-size:21px!important;}
      .rm9-track p{font-size:15.2px!important;}

      .rm9-modal-body{display:grid!important;gap:20px!important;}
      .rm9-profile-block{position:relative!important;overflow:hidden!important;background:linear-gradient(100deg,rgba(255,255,255,.96) 0%,rgba(255,255,255,.88) 52%,rgba(234,246,245,.72) 100%)!important;border:1px solid #d7e5e4!important;border-radius:24px!important;padding:24px!important;box-shadow:0 14px 32px rgba(12,51,88,.07)!important;}
      .rm9-profile-block:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(255,255,255,.99) 0%,rgba(255,255,255,.84) 48%,rgba(255,255,255,.28) 100%),url('calculate.jpg') right center/cover no-repeat;opacity:.42;pointer-events:none;}
      .rm9-profile-block .rm9-modal-hero,.rm9-profile-block .rm9-deal-strip{position:relative!important;z-index:2!important;}
      .rm9-profile-block .rm9-modal-hero{display:block!important;margin-bottom:16px!important;}
      .rm9-profile-block .rm9-modal-title{max-width:680px!important;padding:0!important;border:0!important;box-shadow:none!important;background:transparent!important;}
      .rm9-profile-block .rm9-modal-title h2{font-size:44px!important;line-height:1!important;letter-spacing:-.055em!important;}
      .rm9-profile-block .rm9-modal-title p{max-width:620px!important;font-size:16px!important;line-height:1.48!important;}
      .rm9-profile-block .rm9-modal-photo{display:none!important;}
      .rm9-profile-block .rm9-deal-strip{margin-bottom:0!important;box-shadow:none!important;background:rgba(255,255,255,.92)!important;}
      .rm9-calculator{border-radius:24px!important;border:1px solid #d7e5e4!important;background:#fff!important;box-shadow:0 16px 34px rgba(12,51,88,.08)!important;}
      .rm9-inputs{border-bottom:1px solid rgba(8,122,120,.18)!important;background:#fff!important;}
      .rm9-inputs h3{margin-bottom:4px!important;}
      .rm9-input-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:18px 24px!important;}
      .rm9-control-group{background:#f7fbfb!important;border:1px solid #d7e5e4!important;border-radius:18px!important;padding:16px 16px 14px!important;}
      .rm9-select{display:none!important;}
      .rm9-slider-head{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:12px!important;margin-bottom:12px!important;}
      .rm9-slider-head label{margin:0!important;color:#071f3a!important;font-size:16px!important;font-weight:900!important;}
      .rm9-slider-value{min-width:94px;text-align:center;border:1px solid #d7e5e4;border-radius:14px;background:#fff;color:#071f3a;padding:9px 12px;font-size:17px;font-weight:950;letter-spacing:-.025em;}
      .rm9-slider{width:100%;appearance:none;background:transparent;cursor:pointer;}
      .rm9-slider::-webkit-slider-runnable-track{height:8px;border-radius:999px;background:linear-gradient(90deg,#087a78 0%,#087a78 var(--fill,50%),#d8e1e7 var(--fill,50%),#d8e1e7 100%);}
      .rm9-slider::-webkit-slider-thumb{appearance:none;width:22px;height:22px;border-radius:999px;background:#087a78;border:4px solid #fff;box-shadow:0 3px 10px rgba(7,31,58,.24);margin-top:-7px;}
      .rm9-slider::-moz-range-track{height:8px;border-radius:999px;background:#d8e1e7;}
      .rm9-slider::-moz-range-progress{height:8px;border-radius:999px;background:#087a78;}
      .rm9-slider::-moz-range-thumb{width:18px;height:18px;border-radius:999px;background:#087a78;border:4px solid #fff;box-shadow:0 3px 10px rgba(7,31,58,.24);}
      .rm9-slider-ticks{display:flex;justify-content:space-between;margin-top:8px;color:#64748b;font-size:11px;font-weight:800;}
      .rm9-outputs{background:linear-gradient(180deg,#fff 0%,#f7fbfb 100%)!important;}
      .rm9-results-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:12px!important;align-items:stretch!important;}
      .rm9-result-box{min-height:98px!important;padding:15px 14px!important;background:#fff!important;border-color:#d7e5e4!important;}
      .rm9-result-box.is-key{background:#eaf6f5!important;border-color:rgba(8,122,120,.34)!important;box-shadow:0 10px 22px rgba(8,122,120,.08)!important;}
      .rm9-result-box.is-key .rm9-result-label{color:#087a78!important;letter-spacing:.065em!important;}
      .rm9-result-box.is-key .rm9-result-value{color:#087a78!important;font-size:27px!important;font-weight:950!important;}
      .rm9-result-box:not(.is-key) .rm9-result-value{font-size:20px!important;font-weight:820!important;}
      .rm9-answer{border:0!important;background:linear-gradient(135deg,#eaf6f5 0%,#f4fbfa 100%)!important;border:1px solid rgba(8,122,120,.26)!important;border-radius:18px!important;padding:18px 20px!important;margin:0 0 18px!important;}
      .rm9-answer h3,.rm9-answer .green{color:#087a78!important;font-size:34px!important;line-height:1!important;font-weight:950!important;letter-spacing:-.045em!important;}
      .rm9-explanation{padding:24px!important;border-radius:22px!important;}
      .rm9-explanation h3{margin-bottom:14px!important;}
      .rm9-explanation p{font-weight:500!important;}
      @media(max-width:900px){.rm9-hero{min-height:auto!important;padding:30px 24px!important;}.rm9-hero:after{opacity:.16!important;}.rm9-input-grid,.rm9-results-grid{grid-template-columns:1fr!important;}.rm9-profile-block:after{opacity:.20!important;background-position:center!important;}}
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

  function enhanceCalculatorModal(){
    var modal=document.querySelector('.rm9-modal-card');
    if(!modal || modal.dataset.rm9Enhanced==='true') return;
    modal.dataset.rm9Enhanced='true';
    var body=modal.querySelector('.rm9-modal-body');
    var hero=modal.querySelector('.rm9-modal-hero');
    var deal=modal.querySelector('.rm9-deal-strip');
    if(hero){
      var title=hero.querySelector('.rm9-modal-title h2');
      if(title) title.textContent='The Numbers Behind Your Exit';
    }
    if(body && hero && deal){
      var profile=document.createElement('section');
      profile.className='rm9-profile-block';
      body.insertBefore(profile, hero);
      profile.appendChild(hero);
      profile.appendChild(deal);
    }
    convertSelectsToSliders(modal);
    reorderOutputs(modal);
    var answer=modal.querySelector('.rm9-answer');
    var explanation=modal.querySelector('.rm9-explanation');
    if(answer && explanation && answer.parentElement!==explanation){
      explanation.insertBefore(answer, explanation.firstChild);
    }
  }

  function convertSelectsToSliders(modal){
    var configs={
      year:{label:'Exit year',display:function(v){return 'Year '+v;},ticks:['Year 3','Year 4','Year 5']},
      growth:{label:'Property growth',display:function(v){return (Number(v)*100).toFixed(0)+'%';},ticks:['4%','5%','6%','7%']},
      rate:{label:'Mortgage rate',display:function(v){return (Number(v)*100).toFixed(1)+'%';},ticks:['5.5%','6.0%','6.5%','7.0%']},
      extra:{label:'Extra repayments',display:function(v){return '$'+Number(v).toLocaleString('en-AU')+'/mo';},ticks:['$0','$250','$500','$1,000']}
    };
    Array.prototype.slice.call(modal.querySelectorAll('.rm9-select')).forEach(function(select){
      var key=select.dataset.control;
      var group=select.closest('.rm9-control-group');
      if(!group || !configs[key] || group.dataset.sliderReady==='true') return;
      group.dataset.sliderReady='true';
      var values=Array.prototype.slice.call(select.options).filter(function(o){return o.value!=='custom';}).map(function(o){return o.value;});
      var cfg=configs[key];
      var header=document.createElement('div');
      header.className='rm9-slider-head';
      var lab=document.createElement('label');
      lab.textContent=cfg.label;
      var val=document.createElement('div');
      val.className='rm9-slider-value';
      header.appendChild(lab);header.appendChild(val);
      var slider=document.createElement('input');
      slider.className='rm9-slider';
      slider.type='range';slider.min='0';slider.max=String(values.length-1);slider.step='1';
      slider.value=String(Math.max(0,values.indexOf(select.value)));
      var ticks=document.createElement('div');
      ticks.className='rm9-slider-ticks';
      ticks.innerHTML=(cfg.ticks||values).map(function(t){return '<span>'+t+'</span>';}).join('');
      group.innerHTML='';
      group.appendChild(header);group.appendChild(slider);group.appendChild(ticks);group.appendChild(select);
      function sync(){
        var idx=Number(slider.value)||0;
        select.value=values[idx];
        val.textContent=cfg.display(values[idx]);
        var fill=values.length>1 ? (idx/(values.length-1))*100 : 0;
        slider.style.setProperty('--fill',fill+'%');
      }
      slider.addEventListener('input',function(){sync();select.dispatchEvent(new Event('change',{bubbles:true}));});
      sync();
    });
  }

  function reorderOutputs(modal){
    var grid=modal.querySelector('.rm9-results-grid');
    if(!grid) return;
    var boxes=Array.prototype.slice.call(grid.querySelectorAll('.rm9-result-box'));
    var keyLabels=['New repayment','New bank loan','Loan ratio','Your home equity'];
    var key=[],support=[];
    boxes.forEach(function(box){
      var labelEl=box.querySelector('.rm9-result-label');
      var label=labelEl ? labelEl.textContent.trim() : '';
      if(keyLabels.indexOf(label)!==-1){box.classList.add('is-key');key.push(box);}else{support.push(box);}
    });
    key.concat(support).forEach(function(box){grid.appendChild(box);});
  }

  function observeCalculatorModal(){
    if(window.__rm9ModalObserver) return;
    window.__rm9ModalObserver=new MutationObserver(function(){enhanceCalculatorModal();});
    window.__rm9ModalObserver.observe(document.body,{childList:true,subtree:true});
  }

  function wrapWhenReady(){
    if(typeof window.renderRoadmapPage9!=='function'){setTimeout(wrapWhenReady,30);return;}
    if(window.renderRoadmapPage9.__page9Refined) return;
    var original=window.renderRoadmapPage9;
    window.renderRoadmapPage9=function(data,root){
      original(data,root);
      injectPage9RefinementStyles();
      postProcessPage9(root);
      observeCalculatorModal();
      setTimeout(function(){postProcessPage9(root);enhanceCalculatorModal();},0);
    };
    window.renderRoadmapPage9.__page9Refined=true;
  }

  injectPage9RefinementStyles();
  observeCalculatorModal();
  wrapWhenReady();
})();
