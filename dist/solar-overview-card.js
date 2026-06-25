const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(s,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:n,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:c,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,_=u.trustedTypes,$=_?_.emptyScript:"",m=u.reactiveElementPolyfillSupport,v=(t,e)=>t,g={toAttribute(t,e){switch(e){case Boolean:t=t?$:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!n(t,e),f={attribute:!0,type:String,converter:g,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=f){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??f}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...c(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:g).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:g;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??y)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[v("elementProperties")]=new Map,b[v("finalized")]=new Map,m?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,x=t=>t,A=w.trustedTypes,k=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+S,C=`<${P}>`,M=document,T=()=>M.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,H="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,D=/>/g,z=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,I=/"/g,V=/^(?:script|style|textarea|title)$/i,j=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),B=j(1),F=j(2),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),G=new WeakMap,Y=M.createTreeWalker(M,129);function J(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",a=N;for(let e=0;e<i;e++){const i=t[e];let n,l,h=-1,c=0;for(;c<i.length&&(a.lastIndex=c,l=a.exec(i),null!==l);)c=a.lastIndex,a===N?"!--"===l[1]?a=R:void 0!==l[1]?a=D:void 0!==l[2]?(V.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=z):void 0!==l[3]&&(a=z):a===z?">"===l[0]?(a=r??N,h=-1):void 0===l[1]?h=-2:(h=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?z:'"'===l[3]?I:L):a===I||a===L?a=z:a===R||a===D?a=N:(a=z,r=void 0);const d=a===z&&t[e+1].startsWith("/>")?" ":"";o+=a===N?i+C:h>=0?(s.push(n),i.slice(0,h)+E+i.slice(h)+S+d):i+S+(-2===h?e:d)}return[J(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const a=t.length-1,n=this.parts,[l,h]=K(t,e);if(this.el=Z.createElement(l,i),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Y.nextNode())&&n.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=h[o++],i=s.getAttribute(t).split(S),a=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?it:"?"===a[1]?st:"@"===a[1]?rt:et}),s.removeAttribute(t)}else t.startsWith(S)&&(n.push({type:6,index:r}),s.removeAttribute(t));if(V.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),Y.nextNode(),n.push({type:2,index:++r});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===P)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)n.push({type:7,index:r}),t+=S.length-1}r++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===W)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=O(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Q(t,r._$AS(t,e.values),r,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);Y.currentNode=s;let r=Y.nextNode(),o=0,a=0,n=i[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new tt(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new ot(r,this,t)),this._$AV.push(e),n=i[++a]}o!==n?.index&&(r=Y.nextNode(),o++)}return Y.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),O(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new Z(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new tt(this.O(T()),this.O(T()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=Q(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{const s=t;let a,n;for(t=r[0],a=0;a<r.length-1;a++)n=Q(this,s[i+a],e,a),n===W&&(n=this._$AH[a]),o||=!O(n)||n!==this._$AH[a],n===q?t=q:t!==q&&(t+=(n??"")+r[a+1]),this._$AH[a]=n}o&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class rt extends et{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??q)===W)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(Z,tt),(w.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;class lt extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new tt(e.insertBefore(T(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}lt._$litElement$=!0,lt.finalized=!0,nt.litElementHydrateSupport?.({LitElement:lt});const ht=nt.litElementPolyfillSupport;ht?.({LitElement:lt}),(nt.litElementVersions??=[]).push("4.2.2"),console.info("%c SOLAR-OVERVIEW-CARD %c v0.1.0 ","color:white;background:#0b6e4f;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px;","color:#0b6e4f;background:#e6f4ec;font-weight:700;border-radius:0 4px 4px 0;padding:2px 6px;");const ct={title:"Solar Overview",show_solar:!0,show_battery:!0,show_grid:!0,show_home:!0,show_ev:!0,battery_capacity_kwh:0,animate:!0,decimals_power:0,decimals_energy:1},dt=(t,e=0)=>{const i=Number(t);return Number.isFinite(i)?i:e},pt=(t,e=0)=>{const i=dt(t,0);return Math.abs(i)>=1e3?`${(i/1e3).toFixed(Math.max(e,1))} kW`:`${i.toFixed(e)} W`},ut=(t,e=1)=>`${dt(t,0).toFixed(e)} kWh`,_t=(t,e)=>e&&t&&t.states[e]?t.states[e]:null,$t=(t,e,i=0)=>{const s=_t(t,e);return s?dt(s.state,i):i},mt=(t,e)=>{const i=_t(t,e);if(!i)return 0;const s=dt(i.state,0);return"kw"===(i.attributes?.unit_of_measurement||"").toLowerCase()?1e3*s:s},vt=(t,e)=>{const i=_t(t,e);if(!i)return 0;const s=dt(i.state,0);return"wh"===(i.attributes?.unit_of_measurement||"").toLowerCase()?s/1e3:s};class gt extends lt{static properties={hass:{attribute:!1},_config:{state:!0}};static styles=o`
    :host {
      --so-radius-xl: 28px;
      --so-radius-lg: 22px;
      --so-radius-md: 16px;
      --so-radius-sm: 12px;
      --so-gap: 14px;
      --so-pad: 18px;

      --so-solar: var(--solar-overview-solar-color, #f5a524);
      --so-battery: var(--solar-overview-battery-color, #ec88c0);
      --so-grid: var(--solar-overview-grid-color, #ef4444);
      --so-grid-export: var(--solar-overview-grid-export-color, #22c55e);
      --so-home: var(--solar-overview-home-color, #14b8a6);
      --so-ev: var(--solar-overview-ev-color, #6366f1);

      --so-surface: var(--ha-card-background, var(--card-background-color, #fff));
      --so-surface-2: color-mix(in srgb, var(--so-surface) 85%, var(--primary-text-color) 15%);
      --so-on-surface: var(--primary-text-color);
      --so-on-surface-variant: var(--secondary-text-color);
      --so-outline: color-mix(in srgb, var(--primary-text-color) 14%, transparent);
    }

    ha-card {
      padding: var(--so-pad);
      border-radius: var(--so-radius-xl);
      overflow: hidden;
      background: var(--so-surface);
      box-shadow: var(--ha-card-box-shadow, 0 1px 2px rgba(0,0,0,.08), 0 1px 3px rgba(0,0,0,.06));
      border: 1px solid var(--so-outline);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 14px;
    }

    .title {
      font-size: 1.15rem;
      font-weight: 600;
      letter-spacing: 0.1px;
      color: var(--so-on-surface);
    }

    .subtitle {
      font-size: 0.82rem;
      color: var(--so-on-surface-variant);
    }

    .header-stats {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--so-solar) 14%, transparent);
      color: var(--so-on-surface);
      font-size: 0.78rem;
      font-weight: 600;
      border: 1px solid color-mix(in srgb, var(--so-solar) 35%, transparent);
    }
    .pill.battery { background: color-mix(in srgb, var(--so-battery) 14%, transparent); border-color: color-mix(in srgb, var(--so-battery) 35%, transparent); }
    .pill.grid { background: color-mix(in srgb, var(--so-grid) 14%, transparent); border-color: color-mix(in srgb, var(--so-grid) 35%, transparent); }
    .pill.ev { background: color-mix(in srgb, var(--so-ev) 14%, transparent); border-color: color-mix(in srgb, var(--so-ev) 35%, transparent); }

    .flow {
      width: 100%;
      height: auto;
      display: block;
      margin: 4px auto 10px;
    }

    .tiles {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: var(--so-gap);
      margin-top: 10px;
    }

    .tile {
      background: var(--so-surface-2);
      border-radius: var(--so-radius-lg);
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      border: 1px solid var(--so-outline);
      transition: transform .2s ease, box-shadow .2s ease;
    }
    .tile:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(0,0,0,.08); }

    .tile-head {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--so-on-surface-variant);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .tile-head ha-icon { --mdc-icon-size: 18px; }

    .tile-value {
      font-size: 1.4rem;
      font-weight: 600;
      color: var(--so-on-surface);
      line-height: 1.1;
    }

    .tile-sub {
      font-size: 0.8rem;
      color: var(--so-on-surface-variant);
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .bar {
      height: 8px;
      width: 100%;
      background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
      border-radius: 999px;
      overflow: hidden;
      margin-top: 4px;
    }
    .bar > span {
      display: block;
      height: 100%;
      border-radius: 999px;
      transition: width .6s ease;
    }

    .mppt-chips {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-top: 6px;
    }
    .chip {
      font-size: 0.72rem;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--so-solar) 14%, transparent);
      color: var(--so-on-surface);
      border: 1px solid color-mix(in srgb, var(--so-solar) 30%, transparent);
    }

    .clickable { cursor: pointer; }

    @media (max-width: 480px) {
      .header { flex-direction: column; align-items: flex-start; }
      .header-stats { justify-content: flex-start; }
    }
  `;setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...ct,...t,solar:{mppts:[],...t.solar||{}},battery:{...t.battery||{}},grid:{...t.grid||{}},home:{...t.home||{}},ev:{...t.ev||{}}}}getCardSize(){return 6}static getStubConfig(){return{title:"Solar Overview",solar:{total_power:"",total_today:"",predicted_remaining_today:"",mppts:[]},battery:{soc:"",power:"",daily_charge:"",daily_discharge:"",capacity_kwh:0},grid:{power:"",daily_import:"",daily_export:""},home:{power:"",daily_energy:""},ev:{power:"",session_energy:"",soc:""}}}static getConfigElement(){return document.createElement("solar-overview-card-editor")}_click(t){t&&this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}}))}_flowDot(t,e,i,s=!1){if(!this._config.animate)return q;const r=Math.abs(e);if(r<5)return q;const o=Math.max(.4,1.5-Math.min(r,8e3)/8e3*1.1).toFixed(2);return F`
      <circle r="4" fill="${i}">
        <animateMotion dur="${o}s" repeatCount="indefinite" keyPoints="${s?"1;0":"0;1"}" keyTimes="0;1">
          <mpath href="#${t}"/>
        </animateMotion>
      </circle>`}_node(t,e,i,s,r,o,a){return F`
      <g class="${o?"clickable":""}" @click=${()=>this._click(o)}>
        <circle cx="${t}" cy="${e}" r="34" fill="color-mix(in srgb, ${r} 14%, transparent)" stroke="${r}" stroke-width="2"/>
        <path transform="translate(${t-12}, ${e-18}) scale(1)" d="${a}" fill="${r}"/>
        <text x="${t}" y="${e+12}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--so-on-surface)">${s??""}</text>
        <text x="${t}" y="${e+56}" text-anchor="middle" font-size="11" font-weight="600" fill="var(--so-on-surface-variant)">${i}</text>
      </g>`}_renderFlow(){const t=this.hass,e=this._config,i=e.solar.total_power?mt(t,e.solar.total_power):(e.solar.mppts||[]).reduce((e,i)=>e+mt(t,i.power),0),s=e.battery.power?mt(t,e.battery.power):0,r=e.grid.power?mt(t,e.grid.power):0,o=e.home.power?mt(t,e.home.power):0,a=e.ev.power?mt(t,e.ev.power):0,n=350,l=170,h=n,c=60,d=80,p=l,u=n,_=280,$=500,m=l,v=640,g=l;return B`
      <svg class="flow" viewBox="0 0 ${700} ${340}" preserveAspectRatio="xMidYMid meet">
        <defs>
          <path id="p-solar-inv" d="M ${h},${c+34} C ${h},${130} ${n},${150} ${n},${l}"/>
          <path id="p-grid-inv" d="M ${d+34},${p} C ${270},${l} ${310},${l} ${n},${l}"/>
          <path id="p-inv-batt" d="M ${n},${l} C ${n},${210} ${u},${_-60} ${u},${_-34}"/>
          <path id="p-inv-home" d="M ${n},${l} C ${410},${l} ${$-60},${m} ${$-34},${m}"/>
          <path id="p-home-ev" d="M ${$+34},${m} L ${v-34},${g}"/>
        </defs>

        <!-- Inverter hub -->
        <circle cx="${n}" cy="${l}" r="26" fill="var(--so-surface-2)" stroke="var(--so-outline)" stroke-width="1.5"/>
        <text x="${n}" y="${174}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--so-on-surface-variant)">INV</text>

        <!-- Lines -->
        <use href="#p-solar-inv" stroke="${"var(--so-solar)"}" stroke-width="2.5" fill="none" opacity="${i>5?1:.25}"/>
        <use href="#p-grid-inv" stroke="${r>=0?"var(--so-grid)":"var(--so-grid-export)"}" stroke-width="2.5" fill="none" opacity="${Math.abs(r)>5?1:.25}"/>
        <use href="#p-inv-batt" stroke="${"var(--so-battery)"}" stroke-width="2.5" fill="none" opacity="${Math.abs(s)>5?1:.25}"/>
        <use href="#p-inv-home" stroke="${"var(--so-home)"}" stroke-width="2.5" fill="none" opacity="${o>5?1:.25}"/>
        <use href="#p-home-ev" stroke="${"var(--so-ev)"}" stroke-width="2.5" fill="none" opacity="${a>5?1:.25}"/>

        <!-- Animated dots -->
        ${this._flowDot("p-solar-inv",i,"var(--so-solar)")}
        ${this._flowDot("p-grid-inv",r,r>=0?"var(--so-grid)":"var(--so-grid-export)",r<0)}
        ${this._flowDot("p-inv-batt",s,"var(--so-battery)",s<0)}
        ${this._flowDot("p-inv-home",o,"var(--so-home)")}
        ${this._flowDot("p-home-ev",a,"var(--so-ev)")}

        <!-- Nodes -->
        ${!1!==e.show_solar?this._node(h,c,"Solar",pt(i,e.decimals_power),"var(--so-solar)",e.solar.total_power,"M12 4V2m0 20v-2m8-8h2M2 12h2m13.66-5.66l1.41-1.41M4.93 19.07l1.41-1.41m12.73 0l1.41 1.41M4.93 4.93l1.41 1.41M12 7a5 5 0 100 10 5 5 0 000-10z"):q}
        ${!1!==e.show_grid?this._node(d,p,r>=0?"Grid In":"Grid Out",pt(Math.abs(r),e.decimals_power),r>=0?"var(--so-grid)":"var(--so-grid-export)",e.grid.power,"M11 21l8-12h-6l2-8L7 13h6l-2 8z"):q}
        ${!1!==e.show_battery?this._node(u,_,"Battery",pt(Math.abs(s),e.decimals_power),"var(--so-battery)",e.battery.power,"M7 4h4V2h2v2h4a1 1 0 011 1v16a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1z"):q}
        ${!1!==e.show_home?this._node($,m,"Home",pt(o,e.decimals_power),"var(--so-home)",e.home.power,"M12 3l9 8h-3v9h-5v-6H11v6H6v-9H3l9-8z"):q}
        ${!1!==e.show_ev&&(e.ev.power||e.ev.soc)?this._node(v,g,"EV",pt(a,e.decimals_power),"var(--so-ev)",e.ev.power,"M5 11l1.5-4.5A2 2 0 018.4 5h7.2a2 2 0 011.9 1.5L19 11m-14 0h14m-14 0v6h2v1a1 1 0 002 0v-1h6v1a1 1 0 002 0v-1h2v-6"):q}
      </svg>
    `}_solarTile(){const t=this.hass,e=this._config;if(!1===e.show_solar)return q;const i=e.solar.total_today?vt(t,e.solar.total_today):null,s=e.solar.predicted_remaining_today?vt(t,e.solar.predicted_remaining_today):null,r=e.solar.predicted_today?vt(t,e.solar.predicted_today):null,o=e.solar.mppts||[];return B`
      <div class="tile clickable" @click=${()=>this._click(e.solar.total_today||e.solar.total_power)}>
        <div class="tile-head"><ha-icon icon="mdi:solar-power-variant"></ha-icon> Solar today</div>
        <div class="tile-value">${null!=i?ut(i,e.decimals_energy):"—"}</div>
        <div class="tile-sub">
          ${null!=s?B`<span>☀️ ${ut(s,e.decimals_energy)} expected left</span>`:q}
          ${null!=r?B`<span>📊 ${ut(r,e.decimals_energy)} forecast total</span>`:q}
        </div>
        ${o.length?B`
          <div class="mppt-chips">
            ${o.map(e=>{const i=mt(t,e.power),s=dt(e.max_power,0),r=s>0?Math.round(i/s*100):null;return B`<span class="chip" title=${e.power||""}>${e.name||e.power}: ${pt(i,0)}${null!=r?` · ${r}%`:""}</span>`})}
          </div>`:q}
      </div>
    `}_batteryTile(){const t=this.hass,e=this._config;if(!1===e.show_battery)return q;const i=e.battery.soc?$t(t,e.battery.soc):null,s=e.battery.power?mt(t,e.battery.power):null,r=e.battery.daily_charge?vt(t,e.battery.daily_charge):null,o=e.battery.daily_discharge?vt(t,e.battery.daily_discharge):null,a=dt(e.battery.capacity_kwh,0),n=e.battery.remaining_kwh?vt(t,e.battery.remaining_kwh):a>0&&null!=i?a*i/100:null,l=e.battery.time_to_full?_t(t,e.battery.time_to_full)?.state:null,h=e.battery.temperature?_t(t,e.battery.temperature):null,c=null==s?"":s>5?`Charging · ${pt(s,e.decimals_power)}`:s<-5?`Discharging · ${pt(Math.abs(s),e.decimals_power)}`:"Idle";return B`
      <div class="tile clickable" @click=${()=>this._click(e.battery.soc||e.battery.power)}>
        <div class="tile-head"><ha-icon icon="mdi:battery-charging-high"></ha-icon> Battery</div>
        <div class="tile-value">${null!=i?`${i.toFixed(0)}%`:"—"}</div>
        <div class="bar"><span style="width:${i??0}%; background: var(--so-battery);"></span></div>
        <div class="tile-sub">
          <span>${c}</span>
          ${null!=n?B`<span>🔋 ${ut(n,e.decimals_energy)}${a>0?` / ${ut(a,1)}`:""}</span>`:q}
          ${null!=r?B`<span>⬆️ ${ut(r,e.decimals_energy)}</span>`:q}
          ${null!=o?B`<span>⬇️ ${ut(o,e.decimals_energy)}</span>`:q}
          ${l?B`<span>⏱ ${l}</span>`:q}
          ${h?B`<span>🌡 ${h.state}${h.attributes?.unit_of_measurement||"°"}</span>`:q}
        </div>
      </div>
    `}_gridTile(){const t=this.hass,e=this._config;if(!1===e.show_grid)return q;const i=e.grid.power?mt(t,e.grid.power):null,s=e.grid.daily_import?vt(t,e.grid.daily_import):null,r=e.grid.daily_export?vt(t,e.grid.daily_export):null,o=e.grid.price_import?_t(t,e.grid.price_import):null,a=e.grid.price_export?_t(t,e.grid.price_export):null,n=null==i?"":i>5?`Importing ${pt(i,e.decimals_power)}`:i<-5?`Exporting ${pt(Math.abs(i),e.decimals_power)}`:"Idle";return B`
      <div class="tile clickable" @click=${()=>this._click(e.grid.power)}>
        <div class="tile-head"><ha-icon icon="mdi:transmission-tower"></ha-icon> Grid</div>
        <div class="tile-value" style="color:${null==i||i>=0?"var(--so-grid)":"var(--so-grid-export)"};">${null!=i?pt(Math.abs(i),e.decimals_power):"—"}</div>
        <div class="tile-sub">
          <span>${n}</span>
          ${null!=s?B`<span>⬇️ ${ut(s,e.decimals_energy)}</span>`:q}
          ${null!=r?B`<span>⬆️ ${ut(r,e.decimals_energy)}</span>`:q}
          ${o?B`<span>💰 ${o.state} ${o.attributes?.unit_of_measurement||""}</span>`:q}
          ${a?B`<span>📈 ${a.state} ${a.attributes?.unit_of_measurement||""}</span>`:q}
        </div>
      </div>
    `}_homeTile(){const t=this.hass,e=this._config;if(!1===e.show_home)return q;const i=e.home.power?mt(t,e.home.power):null,s=e.home.daily_energy?vt(t,e.home.daily_energy):null;return B`
      <div class="tile clickable" @click=${()=>this._click(e.home.power)}>
        <div class="tile-head"><ha-icon icon="mdi:home-lightning-bolt"></ha-icon> Home</div>
        <div class="tile-value" style="color: var(--so-home);">${null!=i?pt(i,e.decimals_power):"—"}</div>
        <div class="tile-sub">
          ${null!=s?B`<span>⚡ ${ut(s,e.decimals_energy)} today</span>`:q}
        </div>
      </div>
    `}_evTile(){const t=this.hass,e=this._config;if(!1===e.show_ev)return q;if(!e.ev.power&&!e.ev.soc&&!e.ev.session_energy)return q;const i=e.ev.power?mt(t,e.ev.power):null,s=e.ev.soc?$t(t,e.ev.soc):null,r=e.ev.session_energy?vt(t,e.ev.session_energy):null,o=e.ev.status?_t(t,e.ev.status)?.state:null,a=null!=i&&i>5;return B`
      <div class="tile clickable" @click=${()=>this._click(e.ev.power||e.ev.soc)}>
        <div class="tile-head"><ha-icon icon="mdi:car-electric"></ha-icon> EV ${o?B`· <span style="text-transform:none;font-weight:600;">${o}</span>`:""}</div>
        <div class="tile-value" style="color: var(--so-ev);">${null!=i?pt(i,e.decimals_power):null!=s?`${s.toFixed(0)}%`:"—"}</div>
        ${null!=s?B`
          <div class="bar"><span style="width:${s}%; background: var(--so-ev);"></span></div>`:q}
        <div class="tile-sub">
          ${null!=s&&null!=i?B`<span>🔋 ${s.toFixed(0)}%</span>`:q}
          ${null!=r?B`<span>🔌 ${ut(r,e.decimals_energy)} session</span>`:q}
          ${a?B`<span style="color: var(--so-ev); font-weight:600;">● Charging</span>`:q}
        </div>
      </div>
    `}render(){if(!this._config||!this.hass)return B``;const t=this._config,e=this.hass,i=t.solar.total_today?vt(e,t.solar.total_today):null,s=t.solar.predicted_remaining_today?vt(e,t.solar.predicted_remaining_today):null,r=t.battery.soc?$t(e,t.battery.soc):null,o=t.grid.price_import?_t(e,t.grid.price_import):null;return B`
      <ha-card>
        <div class="header">
          <div>
            <div class="title">${t.title||ct.title}</div>
            ${null!=i?B`<div class="subtitle">${ut(i,t.decimals_energy)} produced today</div>`:q}
          </div>
          <div class="header-stats">
            ${null!=s?B`<span class="pill">☀️ ${ut(s,t.decimals_energy)} expected</span>`:q}
            ${null!=r?B`<span class="pill battery">🔋 ${r.toFixed(0)}%</span>`:q}
            ${o?B`<span class="pill grid">💰 ${o.state} ${o.attributes?.unit_of_measurement||""}</span>`:q}
          </div>
        </div>

        ${this._renderFlow()}

        <div class="tiles">
          ${this._solarTile()}
          ${this._batteryTile()}
          ${this._gridTile()}
          ${this._homeTile()}
          ${this._evTile()}
        </div>
      </ha-card>
    `}}customElements.define("solar-overview-card",gt);class yt extends lt{static properties={hass:{attribute:!1},_config:{state:!0}};static styles=o`
    :host { display: block; }
    h3 {
      margin: 18px 0 6px;
      font-size: 0.95rem;
      color: var(--primary-text-color);
      border-top: 1px solid var(--divider-color);
      padding-top: 14px;
    }
    h3:first-of-type { border-top: none; padding-top: 0; }
    .mppt {
      display: grid;
      grid-template-columns: 1fr 1fr 90px auto;
      gap: 8px;
      align-items: end;
      margin-bottom: 8px;
    }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    ha-textfield, ha-entity-picker { width: 100%; }
    mwc-button { margin-top: 6px; }
  `;setConfig(t){this._config={...ct,...t,solar:{mppts:[],...t.solar||{}},battery:{...t.battery||{}},grid:{...t.grid||{}},home:{...t.home||{}},ev:{...t.ev||{}}}}_emit(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}_setTop(t,e){this._config={...this._config,[t]:e},this._emit()}_setSection(t,e,i){this._config={...this._config,[t]:{...this._config[t],[e]:i}},this._emit()}_entityPicker(t,e,i,s=["sensor","binary_sensor","switch","number","input_number"]){const r=null===e?this._config[i]:this._config[e]?.[i];return B`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${r||""}
        .label=${t}
        .includeDomains=${s}
        allow-custom-entity
        @value-changed=${t=>null===e?this._setTop(i,t.detail.value):this._setSection(e,i,t.detail.value)}>
      </ha-entity-picker>
    `}_addMppt(){const t=[...this._config.solar?.mppts||[],{name:"",power:"",max_power:0}];this._setSection("solar","mppts",t)}_removeMppt(t){const e=[...this._config.solar?.mppts||[]];e.splice(t,1),this._setSection("solar","mppts",e)}_updateMppt(t,e,i){const s=[...this._config.solar?.mppts||[]];s[t]={...s[t],[e]:i},this._setSection("solar","mppts",s)}render(){if(!this._config||!this.hass)return B``;const t=this._config;return B`
      <h3>General</h3>
      <ha-textfield label="Title" .value=${t.title||""} @input=${t=>this._setTop("title",t.target.value)}></ha-textfield>
      <div class="row">
        <ha-textfield label="Decimals (power)" type="number" min="0" max="3" .value=${String(t.decimals_power??0)} @input=${t=>this._setTop("decimals_power",Number(t.target.value))}></ha-textfield>
        <ha-textfield label="Decimals (energy)" type="number" min="0" max="3" .value=${String(t.decimals_energy??1)} @input=${t=>this._setTop("decimals_energy",Number(t.target.value))}></ha-textfield>
      </div>
      <ha-formfield label="Animate flow">
        <ha-switch .checked=${!1!==t.animate} @change=${t=>this._setTop("animate",t.target.checked)}></ha-switch>
      </ha-formfield>

      <h3>Solar</h3>
      ${this._entityPicker("Total PV power","solar","total_power")}
      ${this._entityPicker("Total PV energy today","solar","total_today")}
      ${this._entityPicker("Forecast: remaining today","solar","predicted_remaining_today")}
      ${this._entityPicker("Forecast: total today","solar","predicted_today")}
      <h4>MPPT strings</h4>
      ${(t.solar.mppts||[]).map((t,e)=>B`
        <div class="mppt">
          <ha-textfield label="Name" .value=${t.name||""} @input=${t=>this._updateMppt(e,"name",t.target.value)}></ha-textfield>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${t.power||""}
            .label=${"Power entity"}
            .includeDomains=${["sensor"]}
            allow-custom-entity
            @value-changed=${t=>this._updateMppt(e,"power",t.detail.value)}>
          </ha-entity-picker>
          <ha-textfield label="Max W" type="number" min="0" .value=${String(t.max_power??0)} @input=${t=>this._updateMppt(e,"max_power",Number(t.target.value))}></ha-textfield>
          <mwc-button @click=${()=>this._removeMppt(e)}>✕</mwc-button>
        </div>
      `)}
      <mwc-button raised @click=${()=>this._addMppt()}>Add MPPT</mwc-button>

      <h3>Battery</h3>
      ${this._entityPicker("SOC (%)","battery","soc")}
      ${this._entityPicker("Power","battery","power")}
      ${this._entityPicker("Daily charge","battery","daily_charge")}
      ${this._entityPicker("Daily discharge","battery","daily_discharge")}
      ${this._entityPicker("Remaining energy","battery","remaining_kwh")}
      ${this._entityPicker("Time to full","battery","time_to_full")}
      ${this._entityPicker("Temperature","battery","temperature")}
      <ha-textfield label="Capacity (kWh)" type="number" min="0" step="0.1" .value=${String(t.battery.capacity_kwh??0)} @input=${t=>this._setSection("battery","capacity_kwh",Number(t.target.value))}></ha-textfield>

      <h3>Grid</h3>
      ${this._entityPicker("Power (+ import)","grid","power")}
      ${this._entityPicker("Daily import","grid","daily_import")}
      ${this._entityPicker("Daily export","grid","daily_export")}
      ${this._entityPicker("Import price","grid","price_import")}
      ${this._entityPicker("Export price","grid","price_export")}

      <h3>Home / Load</h3>
      ${this._entityPicker("Power","home","power")}
      ${this._entityPicker("Daily energy","home","daily_energy")}

      <h3>EV Charger</h3>
      ${this._entityPicker("Charging power","ev","power")}
      ${this._entityPicker("Session energy","ev","session_energy")}
      ${this._entityPicker("Car SOC (%)","ev","soc")}
      ${this._entityPicker("Status","ev","status",["sensor","binary_sensor","switch"])}
    `}}customElements.define("solar-overview-card-editor",yt),window.customCards=window.customCards||[],window.customCards.push({type:"solar-overview-card",name:"Solar Overview Card",description:"Material You styled solar / battery / grid / EV overview",preview:!0,documentationURL:"https://github.com/chmors_microsoft/solar-overview-card"});
