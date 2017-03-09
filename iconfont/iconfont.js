;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-mulu" viewBox="0 0 1145 1024">' +
    '' +
    '<path d="M0 1024 0 843.294118 1144.470588 843.294118 1144.470588 1024 0 1024ZM0 421.647059 1144.470588 421.647059 1144.470588 602.352941 0 602.352941 0 421.647059ZM0 0 1144.470588 0 1144.470588 180.705882 0 180.705882 0 0Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-sousuo-sousuo" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M716.6003 213.800623c-138.851102-138.915088-364.020238-138.915088-502.935326 0s-138.915088 364.084225 0 502.935326a355.573996 355.573996 0 0 0 502.935326 0 355.573996 355.573996 0 0 0 0-502.935326z m-580.359212 580.359212a465.183184 465.183184 0 1 1 657.783099 0 465.183184 465.183184 0 0 1-657.783099 0z m868.939152 211.156054a63.474789 63.474789 0 0 1-89.837303 0l-89.773316-89.837303a63.410803 63.410803 0 1 1 89.773316-89.773316l89.837303 89.773316a63.346816 63.346816 0 0 1 0 89.837303z" fill="#666666" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-youbian" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M742.7 459.1L389.3 85.3c-28-29.6-74.6-30.9-104.2-2.9-29.6 28-30.9 74.6-2.9 104.2L588 510.1 282.2 833.6c-28 29.6-26.7 76.2 2.9 104.2 29.6 28 76.2 26.7 104.2-2.9l353.4-373.8c13.6-14.1 20.4-32.5 20.5-50.8-0.1-18.7-6.9-37-20.5-51.2z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)