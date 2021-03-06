import {
  createElement
} from "../createElement/createElement";

let insertCreative = (creativeId, targetAtt, width, height) => {
  let
    content = `<!DOCTYPE html>
<html>
<head>
<script type="text/javascript">
  var apntag = apntag || {};
  apntag.anq = apntag.anq || [
    function () {
      apntag.debug = true;
      apntag.defineTag({
        tagId:13144370,
        forceCreativeId: ${creativeId},
        targetId: 'apn_ad_slot_1'
      });
      apntag.onEvent('adLoaded', 'apn_ad_slot_1', function(adLoaded, adObj){
        if(adLoaded&&adLoaded.banner){
          let {
            width=false,
            height=false
          }=adLoaded.banner;
          if(width && height){
            let parentElem=window.parent.document.getElementById("${targetAtt}");
            parentElem.style.width=\`\${width}px\`;
            parentElem.style.height=\`\${height}px\`;
            parentElem.setAttribute("height",height);
            parentElem.setAttribute("width",width);
          }
        }
        console.log('callback executed');
        console.log(adObj,adLoaded);
      });
      apntag.loadTags();
    }
  ];
</script>
<script src="https://acdn.adnxs.com/ast/ast.js" async="async"></script>
</head>
<body style="padding:0px;margin:0px;">
<div id="apn_ad_slot_1">
  <script type="text/javascript">
    apntag.anq.push(function () {
      apntag.showTag('apn_ad_slot_1');
    });
  </script>
</div>
</body>
</html>`,
    targetElement = document.querySelector(`[wmstarget='${targetAtt}']`),
    destinyIframe;
  if (targetElement.tagName != "DIV") {
    var adframe = createElement("iframe", {
      height,
      width,
      frameBorder: 0,
      scrolling: "no",
      id: targetAtt,
      src: "about:blank"
    });
    targetElement.parentNode.insertBefore(adframe, targetElement.nextSibling);
    targetElement.parentNode.removeChild(targetElement);
    destinyIframe = adframe;
    // alert(targetElement.tagName);

  } else {
    targetElement.innerHTML = `<iframe id='${targetAtt}' src="about:blank" framespacing='0' frameborder='no' scrolling='no' width='100%' height='100%'></iframe>`;
    destinyIframe = document.getElementById(targetAtt);
  }
  if (destinyIframe) {
    var iframeContent = (destinyIframe.contentWindow) ? destinyIframe.contentWindow : (destinyIframe.contentDocument.document) ? destinyIframe.contentDocument.document : destinyIframe.contentDocument;
    iframeContent.document.open();
    iframeContent.document.write(content);
    iframeContent.document.close();
  }
};
export {
  insertCreative
};