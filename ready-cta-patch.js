(function(){
  function clean(value){return String(value==null?'':value).trim();}
  function currentCustomerName(){
    try{
      if(typeof scenario!=='undefined'&&scenario){
        if(scenario.preApply&&clean(scenario.preApply.name)) return clean(scenario.preApply.name);
        if(clean(scenario.name)) return clean(scenario.name);
      }
    }catch(_){ }
    var preName=document.getElementById('preName');
    if(preName&&clean(preName.value)) return clean(preName.value);
    var customerName=document.getElementById('customerName');
    if(customerName&&clean(customerName.value)) return clean(customerName.value);
    return '';
  }
  function launchRoadmap(event){
    if(event){
      event.preventDefault();
      event.stopPropagation();
      if(event.stopImmediatePropagation) event.stopImmediatePropagation();
    }
    if(window.BSRoadmap&&typeof window.BSRoadmap.captureAndOpenRoadmap==='function'){
      window.BSRoadmap.captureAndOpenRoadmap();
      return false;
    }
    alert('Roadmap launcher not loaded. Refresh and try again.');
    return false;
  }
  function patchReadyCtaCopy(){
    var saveCard=document.querySelector('#screenReady .save-card');
    if(!saveCard) return;
    var heading=saveCard.querySelector('h4');
    var copy=saveCard.querySelector('p');
    var button=document.getElementById('saveRoadmapButton')||saveCard.querySelector('button');
    var name=currentCustomerName();
    if(heading) heading.textContent=name?name+", let's look at your personalised Roadmap in more detail.":"Let's look at your personalised Roadmap in more detail.";
    if(copy){copy.textContent='';copy.style.display='none';}
    if(button){
      button.textContent='See My Roadmap';
      if(!button.dataset.readyCtaLaunchPatchBound){
        var clone=button.cloneNode(true);
        clone.dataset.readyCtaLaunchPatchBound='1';
        clone.textContent='See My Roadmap';
        clone.onclick=launchRoadmap;
        clone.addEventListener('click',launchRoadmap,true);
        button.parentNode.replaceChild(clone,button);
      }
    }
  }
  function bindOnce(){
    patchReadyCtaCopy();
    var generateButton=document.getElementById('preGenerateRoadmap');
    if(generateButton&&!generateButton.dataset.readyCtaCopyPatchBound){
      generateButton.dataset.readyCtaCopyPatchBound='1';
      generateButton.addEventListener('click',function(){
        setTimeout(patchReadyCtaCopy,5200);
        setTimeout(patchReadyCtaCopy,6200);
        setTimeout(patchReadyCtaCopy,7200);
      },false);
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bindOnce); else bindOnce();
})();
