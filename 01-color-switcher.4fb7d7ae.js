const t={body:document.querySelector("body"),start:document.querySelector("button[data-start]"),stop:document.querySelector("button[data-stop]")};let e;const{body:o,start:r,stop:d}=t;r.addEventListener("click",(function(){e=setInterval((()=>{r.setAttribute("disabled",!0),d.removeAttribute("disabled"),o.style.background=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),d.addEventListener("click",(function(){r.removeAttribute("disabled"),d.setAttribute("disabled",!0),clearInterval(e)})),d.setAttribute("disabled",!0);
//# sourceMappingURL=01-color-switcher.4fb7d7ae.js.map
