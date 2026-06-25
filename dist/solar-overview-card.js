const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let s=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=r.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(i,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const r=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new s(r,e,i)},a=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:n,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,m=u.trustedTypes,g=m?m.emptyScript:"",v=u.reactiveElementPolyfillSupport,_=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},f=(e,t)=>!n(e,t),$={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:f};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&l(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:s}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const o=r?.call(this);s?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,t=[...d(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,r)=>{if(t)i.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of r){const r=document.createElement("style"),s=e.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=t.cssText,i.appendChild(r)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=r;const o=s.fromAttribute(t,e.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(e,t,i,r=!1,s){if(void 0!==e){const o=this.constructor;if(!1===r&&(s=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??f)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==s||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[_("elementProperties")]=new Map,b[_("finalized")]=new Map,v?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,x=e=>e,k=w.trustedTypes,A=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+S,C=`<${P}>`,M=document,T=()=>M.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,U=Array.isArray,N="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,I=/>/g,R=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,L=/"/g,j=/^(?:script|style|textarea|title)$/i,B=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),V=B(1),F=B(2),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),G=new WeakMap,J=M.createTreeWalker(M,129);function K(e,t){if(!U(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const Y=(e,t)=>{const i=e.length-1,r=[];let s,o=2===t?"<svg>":3===t?"<math>":"",a=z;for(let t=0;t<i;t++){const i=e[t];let n,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===z?"!--"===l[1]?a=H:void 0!==l[1]?a=I:void 0!==l[2]?(j.test(l[2])&&(s=RegExp("</"+l[2],"g")),a=R):void 0!==l[3]&&(a=R):a===R?">"===l[0]?(a=s??z,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?R:'"'===l[3]?L:D):a===L||a===D?a=R:a===H||a===I?a=z:(a=R,s=void 0);const h=a===R&&e[t+1].startsWith("/>")?" ":"";o+=a===z?i+C:c>=0?(r.push(n),i.slice(0,c)+E+i.slice(c)+S+h):i+S+(-2===c?t:h)}return[K(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class Z{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,o=0;const a=e.length-1,n=this.parts,[l,c]=Y(e,t);if(this.el=Z.createElement(l,i),J.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=J.nextNode())&&n.length<a;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(E)){const t=c[o++],i=r.getAttribute(e).split(S),a=/([.?@])?(.*)/.exec(t);n.push({type:1,index:s,name:a[2],strings:i,ctor:"."===a[1]?ie:"?"===a[1]?re:"@"===a[1]?se:te}),r.removeAttribute(e)}else e.startsWith(S)&&(n.push({type:6,index:s}),r.removeAttribute(e));if(j.test(r.tagName)){const e=r.textContent.split(S),t=e.length-1;if(t>0){r.textContent=k?k.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],T()),J.nextNode(),n.push({type:2,index:++s});r.append(e[t],T())}}}else if(8===r.nodeType)if(r.data===P)n.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(S,e+1));)n.push({type:7,index:s}),e+=S.length-1}s++}}static createElement(e,t){const i=M.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,r){if(t===W)return t;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const o=O(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(e),s._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(t=Q(e,s._$AS(e,t.values),s,r)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??M).importNode(t,!0);J.currentNode=r;let s=J.nextNode(),o=0,a=0,n=i[0];for(;void 0!==n;){if(o===n.index){let t;2===n.type?t=new ee(s,s.nextSibling,this,e):1===n.type?t=new n.ctor(s,n.name,n.strings,this,e):6===n.type&&(t=new oe(s,this,e)),this._$AV.push(t),n=i[++a]}o!==n?.index&&(s=J.nextNode(),o++)}return J.currentNode=M,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),O(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>U(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Z.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new X(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new Z(e)),t}k(e){U(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new ee(this.O(T()),this.O(T()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=x(e).nextSibling;x(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,s){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(e,t=this,i,r){const s=this.strings;let o=!1;if(void 0===s)e=Q(this,e,t,0),o=!O(e)||e!==this._$AH&&e!==W,o&&(this._$AH=e);else{const r=e;let a,n;for(e=s[0],a=0;a<s.length-1;a++)n=Q(this,r[i+a],t,a),n===W&&(n=this._$AH[a]),o||=!O(n)||n!==this._$AH[a],n===q?e=q:e!==q&&(e+=(n??"")+s[a+1]),this._$AH[a]=n}o&&!r&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class re extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class se extends te{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??q)===W)return;const i=this._$AH,r=e===q&&i!==q||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==q&&(i===q||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const ae=w.litHtmlPolyfillSupport;ae?.(Z,ee),(w.litHtmlVersions??=[]).push("3.3.3");const ne=globalThis;class le extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let s=r._$litPart$;if(void 0===s){const e=i?.renderBefore??null;r._$litPart$=s=new ee(t.insertBefore(T(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}le._$litElement$=!0,le.finalized=!0,ne.litElementHydrateSupport?.({LitElement:le});const ce=ne.litElementPolyfillSupport;ce?.({LitElement:le}),(ne.litElementVersions??=[]).push("4.2.2"),console.info("%c SOLAR-OVERVIEW-CARD %c v0.1.2 ","color:white;background:#0b6e4f;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px;","color:#0b6e4f;background:#e6f4ec;font-weight:700;border-radius:0 4px 4px 0;padding:2px 6px;");const de={title:"Solar Overview",show_solar:!0,show_battery:!0,show_grid:!0,show_home:!0,show_ev:!0,battery_capacity_kwh:0,animate:!0,decimals_power:0,decimals_energy:1},he=(e,t=0)=>{const i=Number(e);return Number.isFinite(i)?i:t},pe=(e,t=0)=>{const i=he(e,0);return Math.abs(i)>=1e3?`${(i/1e3).toFixed(Math.max(t,1))} kW`:`${i.toFixed(t)} W`},ue=(e,t=1)=>`${he(e,0).toFixed(t)} kWh`,me=(e,t)=>t&&e&&e.states[t]?e.states[t]:null,ge=(e,t,i=0)=>{const r=me(e,t);return r?he(r.state,i):i},ve=(e,t)=>{const i=me(e,t);if(!i)return 0;const r=he(i.state,0);return"kw"===(i.attributes?.unit_of_measurement||"").toLowerCase()?1e3*r:r},_e=(e,t)=>{const i=me(e,t);if(!i)return 0;const r=he(i.state,0);return"wh"===(i.attributes?.unit_of_measurement||"").toLowerCase()?r/1e3:r},ye=(e,t,i="power")=>{if(!t||!t[i])return 0;const r=ve(e,t[i]);return t.invert?-r:r},fe=(e,t)=>t?t.power_import||t.power_export?(t.power_import?Math.abs(ve(e,t.power_import)):0)-(t.power_export?Math.abs(ve(e,t.power_export)):0):ye(e,t):0;class $e extends le{static properties={hass:{attribute:!1},_config:{state:!0}};static styles=o`
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

    .flow-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      min-height: 300px;
      margin: 4px auto 14px;
      /* Subtle radial glow behind the diagram */
      background:
        radial-gradient(ellipse 60% 50% at 50% 55%,
          color-mix(in srgb, var(--so-solar) 6%, transparent) 0%,
          transparent 70%);
    }
    .flow-svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: visible;
    }

    /* Flowing-dash energy line */
    .flow-line {
      fill: none;
      stroke-linecap: round;
      stroke-width: 2.5;
      stroke-dasharray: 1 8;
      stroke-dashoffset: 0;
      filter: drop-shadow(0 0 3px var(--line-color, currentColor));
    }
    .flow-line.idle { stroke-dasharray: none; opacity: 0.18; }
    .flow-line.active { animation: so-flow var(--flow-dur, 2.5s) linear infinite; }
    .flow-line.active.reverse { animation-direction: reverse; }
    @keyframes so-flow {
      from { stroke-dashoffset: 0; }
      to   { stroke-dashoffset: -18; }
    }

    .flow-line-bg {
      fill: none;
      stroke: var(--line-color, currentColor);
      stroke-opacity: 0.12;
      stroke-width: 4;
      stroke-linecap: round;
    }

    /* Nodes */
    .node {
      position: absolute;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      z-index: 2;
      text-align: center;
      width: 96px;
    }
    .node-icon {
      position: relative;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--node-color, #888);
      --mdc-icon-size: 30px;
      background:
        radial-gradient(circle at 30% 25%,
          color-mix(in srgb, var(--node-color, #888) 35%, var(--so-surface)) 0%,
          color-mix(in srgb, var(--node-color, #888) 14%, var(--so-surface)) 55%,
          color-mix(in srgb, var(--node-color, #888) 8%, var(--so-surface)) 100%);
      border: 1.5px solid color-mix(in srgb, var(--node-color, #888) 55%, transparent);
      box-shadow:
        0 6px 14px -4px color-mix(in srgb, var(--node-color, #888) 50%, transparent),
        inset 0 1px 0 color-mix(in srgb, #fff 25%, transparent);
      transition: transform .25s cubic-bezier(.2,.8,.2,1), box-shadow .25s ease;
    }
    .node.active .node-icon::after {
      content: '';
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      border: 2px solid color-mix(in srgb, var(--node-color, #888) 45%, transparent);
      opacity: 0;
      animation: so-pulse 2.6s ease-out infinite;
    }
    @keyframes so-pulse {
      0%   { transform: scale(.85); opacity: .55; }
      80%  { transform: scale(1.25); opacity: 0; }
      100% { transform: scale(1.25); opacity: 0; }
    }
    .node.clickable { cursor: pointer; }
    .node.clickable:hover .node-icon { transform: scale(1.06); }
    .node-power {
      font-weight: 700;
      font-size: 0.9rem;
      color: var(--so-on-surface);
      margin-top: 6px;
      line-height: 1.1;
      letter-spacing: -0.01em;
    }
    .node-sub {
      font-size: 0.72rem;
      color: var(--so-on-surface-variant);
      line-height: 1.15;
    }
    .node-label {
      font-size: 0.68rem;
      font-weight: 600;
      color: var(--so-on-surface-variant);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-top: 2px;
    }
    .node.small { width: 80px; }
    .node.small .node-icon { width: 48px; height: 48px; --mdc-icon-size: 24px; }

    /* SOC arc for the battery node */
    .soc-ring {
      position: absolute;
      inset: -5px;
      transform: rotate(-90deg);
      pointer-events: none;
    }
    .soc-ring circle {
      fill: none;
      stroke-width: 3;
      stroke-linecap: round;
    }
    .soc-ring .soc-track { stroke: color-mix(in srgb, var(--node-color, #888) 18%, transparent); }
    .soc-ring .soc-arc { stroke: var(--node-color, #888); transition: stroke-dashoffset .8s cubic-bezier(.2,.8,.2,1); }

    /* Inverter hub */
    .inverter-hub {
      position: absolute;
      transform: translate(-50%, -50%);
      width: 72px;
      height: 72px;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1px;
      background:
        radial-gradient(circle at 30% 25%,
          color-mix(in srgb, var(--so-solar) 22%, var(--so-surface)) 0%,
          color-mix(in srgb, var(--so-solar) 8%, var(--so-surface)) 60%,
          var(--so-surface) 100%);
      border: 1.5px solid color-mix(in srgb, var(--so-solar) 35%, var(--so-outline));
      color: var(--so-on-surface);
      box-shadow:
        0 10px 24px -8px color-mix(in srgb, var(--so-solar) 40%, transparent),
        inset 0 1px 0 color-mix(in srgb, #fff 30%, transparent);
      z-index: 2;
    }
    .inverter-hub ha-icon {
      --mdc-icon-size: 30px;
      color: color-mix(in srgb, var(--so-solar) 75%, var(--so-on-surface));
    }
    .inverter-hub .inv-label {
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: var(--so-on-surface-variant);
      margin-top: -2px;
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
  `;setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...de,...e,solar:{mppts:[],...e.solar||{}},battery:{...e.battery||{}},grid:{...e.grid||{}},home:{...e.home||{}},ev:{...e.ev||{}},inverter:{...e.inverter||{}}}}getCardSize(){return 6}static getStubConfig(){return{title:"Solar Overview",solar:{total_power:"",total_today:"",predicted_remaining_today:"",mppts:[]},battery:{soc:"",power:"",daily_charge:"",daily_discharge:"",capacity_kwh:0},grid:{power:"",daily_import:"",daily_export:""},home:{power:"",daily_energy:""},ev:{power:"",session_energy:"",soc:""}}}static getConfigElement(){return document.createElement("solar-overview-card-editor")}_click(e){e&&this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}}))}_flowDur(e){const t=Math.abs(e);return t<5?null:Math.max(2,4-Math.min(t,8e3)/8e3*2).toFixed(2)}_nodeEl({x:e,y:t,label:i,icon:r,color:s,power:o,sub:a,entityId:n,small:l=!1,soc:c=null,active:d=!1}){const h=2*Math.PI*30,p=null!=c?h*(1-Math.max(0,Math.min(100,c))/100):null;return V`
      <div class="node ${l?"small":""} ${d?"active":""} ${n?"clickable":""}"
           style="left:${e}%; top:${t}%; --node-color:${s};"
           @click=${()=>this._click(n)}>
        <div class="node-icon">
          ${null!=c?F`
            <svg class="soc-ring" viewBox="0 0 70 70">
              <circle class="soc-track" cx="35" cy="35" r="${30}"/>
              <circle class="soc-arc"   cx="35" cy="35" r="${30}"
                      stroke-dasharray="${h}" stroke-dashoffset="${p}"/>
            </svg>`:q}
          <ha-icon icon="${r}"></ha-icon>
        </div>
        ${null!=o?V`<div class="node-power">${o}</div>`:q}
        ${a?V`<div class="node-sub">${a}</div>`:q}
        <div class="node-label">${i}</div>
      </div>
    `}_renderFlow(){const e=this.hass,t=this._config,i=t.solar.total_power?ye(e,t.solar,"total_power"):(t.solar.mppts||[]).reduce((t,i)=>t+ve(e,i.power),0),r=ye(e,t.battery),s=fe(e,t.grid),o=ye(e,t.home),a=ye(e,t.ev),n=t.battery.soc?ge(e,t.battery.soc):null,l=t.solar.total_today?_e(e,t.solar.total_today):null,c=t.battery.daily_charge?_e(e,t.battery.daily_charge):null,d=t.battery.daily_discharge?_e(e,t.battery.daily_discharge):null,h=t.grid.daily_import?_e(e,t.grid.daily_import):null,p=t.grid.daily_export?_e(e,t.grid.daily_export):null,u=t.home.daily_energy?_e(e,t.home.daily_energy):null,m=t.ev.session_energy?_e(e,t.ev.session_energy):null,g=(t.solar.mppts||[]).filter(e=>e&&e.power),v=!1!==t.show_solar&&g.length>0,_=50,y=58,f=g.length,$=g.map((e,t)=>({x:1===f?50:14+72/(f-1)*t,y:10})),b=$.map((t,i)=>({id:`p-mppt-${i}`,d:`M ${t.x},${t.y+6} C ${t.x},42 50,42 50,52`,w:ve(e,g[i].power),kind:"solar"})),w=[...b,{id:"p-solar-inv",d:"M 50,16 L 50,52",w:i,kind:"solar",hide:v},{id:"p-grid-inv",d:"M 12,58 L 44,58",w:s,kind:"grid"},{id:"p-inv-batt",d:"M 50,64 L 50,87",w:r,kind:"battery"},{id:"p-inv-home",d:"M 56,58 L 70,58",w:o,kind:"home"},{id:"p-home-ev",d:"M 80,58 L 89,58",w:a,kind:"ev"}];return V`
      <div class="flow-wrap">
        <svg class="flow-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            ${w.map(e=>F`<path id="${e.id}" d="${e.d}"/>`)}
          </defs>
          ${w.map(e=>{if(e.hide)return q;const t=((e,t)=>{switch(e){case"grid":return t>=0?"var(--so-grid)":"var(--so-grid-export)";case"battery":return"var(--so-battery)";case"home":return"var(--so-home)";case"ev":return"var(--so-ev)";default:return"var(--so-solar)"}})(e.kind,e.w),i=this._config.animate?this._flowDur(e.w):null,r=null!=i,s=((e,t)=>"grid"===e&&t<0||"battery"===e&&t<0)(e.kind,e.w);return F`
              <use href="#${e.id}"
                   class="flow-line-bg"
                   vector-effect="non-scaling-stroke"
                   style="--line-color:${t};"/>
              <use href="#${e.id}"
                   class="flow-line ${r?"active":"idle"} ${s?"reverse":""}"
                   stroke="${t}"
                   vector-effect="non-scaling-stroke"
                   style="--line-color:${t}; --flow-dur:${i||0}s;"/>
            `})}
        </svg>

        <div class="inverter-hub" style="left:${_}%; top:${y}%;"
             title="Inverter"
             @click=${()=>this._click(t.inverter?.status||t.inverter?.temperature)}>
          <ha-icon icon="${t.inverter?.icon||"mdi:sine-wave"}"></ha-icon>
          <div class="inv-label">INV</div>
        </div>

        ${v?$.map((i,r)=>{const s=g[r],o=ve(e,s.power),a=he(s.max_power,0);return this._nodeEl({x:i.x,y:i.y,label:s.name||`PV${r+1}`,icon:s.icon||"mdi:solar-panel",color:"var(--so-solar)",power:pe(o,t.decimals_power),sub:a>0?`${Math.round(o/a*100)}% · ${(a/1e3).toFixed(1)} kW max`:q,entityId:s.power,small:!0,active:o>5})}):!1!==t.show_solar?this._nodeEl({x:50,y:10,label:"Solar",icon:"mdi:solar-power",color:"var(--so-solar)",power:pe(i,t.decimals_power),sub:null!=l?`${ue(l,t.decimals_energy)} today`:q,entityId:t.solar.total_power,active:i>5}):q}

        ${!1!==t.show_grid?this._nodeEl({x:7,y:58,label:s>=0?"Grid In":"Grid Out",icon:"mdi:transmission-tower",color:s>=0?"var(--so-grid)":"var(--so-grid-export)",power:pe(Math.abs(s),t.decimals_power),sub:null!=h||null!=p?V`${null!=h?V`↓${ue(h,t.decimals_energy)}`:""}${null!=h&&null!=p?" · ":""}${null!=p?V`↑${ue(p,t.decimals_energy)}`:""}`:q,entityId:t.grid.power||t.grid.power_import,active:Math.abs(s)>5}):q}

        ${!1!==t.show_battery?this._nodeEl({x:50,y:92,label:"Battery",icon:r>5?"mdi:battery-charging":r<-5?"mdi:battery-arrow-down":"mdi:battery-high",color:"var(--so-battery)",power:pe(Math.abs(r),t.decimals_power),sub:null!=c||null!=d?V`${null!=c?V`↑${ue(c,t.decimals_energy)}`:""}${null!=c&&null!=d?" · ":""}${null!=d?V`↓${ue(d,t.decimals_energy)}`:""}`:q,entityId:t.battery.power||t.battery.soc,soc:n,active:Math.abs(r)>5}):q}

        ${!1!==t.show_home?this._nodeEl({x:75,y:58,label:"Home",icon:"mdi:home-lightning-bolt",color:"var(--so-home)",power:pe(o,t.decimals_power),sub:null!=u?`${ue(u,t.decimals_energy)} today`:q,entityId:t.home.power,active:o>5}):q}

        ${!1!==t.show_ev&&(t.ev.power||t.ev.soc||t.ev.session_energy)?this._nodeEl({x:94,y:58,label:"EV",icon:a>5?"mdi:ev-station":"mdi:car-electric",color:"var(--so-ev)",power:pe(a,t.decimals_power),sub:null!=m?`${ue(m,t.decimals_energy)} session`:q,entityId:t.ev.power||t.ev.soc,soc:t.ev.soc?ge(e,t.ev.soc):null,small:!0,active:a>5}):q}
      </div>
    `}_solarTile(){const e=this.hass,t=this._config;if(!1===t.show_solar)return q;const i=t.solar.total_today?_e(e,t.solar.total_today):null,r=t.solar.predicted_remaining_today?_e(e,t.solar.predicted_remaining_today):null,s=t.solar.predicted_today?_e(e,t.solar.predicted_today):null,o=t.solar.mppts||[];return V`
      <div class="tile clickable" @click=${()=>this._click(t.solar.total_today||t.solar.total_power)}>
        <div class="tile-head"><ha-icon icon="mdi:solar-power-variant"></ha-icon> Solar today</div>
        <div class="tile-value">${null!=i?ue(i,t.decimals_energy):"—"}</div>
        <div class="tile-sub">
          ${null!=r?V`<span>☀️ ${ue(r,t.decimals_energy)} expected left</span>`:q}
          ${null!=s?V`<span>📊 ${ue(s,t.decimals_energy)} forecast total</span>`:q}
        </div>
        ${o.length?V`
          <div class="mppt-chips">
            ${o.map(t=>{const i=ve(e,t.power),r=he(t.max_power,0),s=r>0?Math.round(i/r*100):null;return V`<span class="chip" title=${t.power||""}>${t.name||t.power}: ${pe(i,0)}${null!=s?` · ${s}%`:""}</span>`})}
          </div>`:q}
      </div>
    `}_batteryTile(){const e=this.hass,t=this._config;if(!1===t.show_battery)return q;const i=t.battery.soc?ge(e,t.battery.soc):null,r=t.battery.power?ye(e,t.battery):null,s=t.battery.daily_charge?_e(e,t.battery.daily_charge):null,o=t.battery.daily_discharge?_e(e,t.battery.daily_discharge):null,a=he(t.battery.capacity_kwh,0),n=t.battery.remaining_kwh?_e(e,t.battery.remaining_kwh):a>0&&null!=i?a*i/100:null,l=t.battery.time_to_full?me(e,t.battery.time_to_full)?.state:null,c=t.battery.temperature?me(e,t.battery.temperature):null,d=null==r?"":r>5?`Charging · ${pe(r,t.decimals_power)}`:r<-5?`Discharging · ${pe(Math.abs(r),t.decimals_power)}`:"Idle";return V`
      <div class="tile clickable" @click=${()=>this._click(t.battery.soc||t.battery.power)}>
        <div class="tile-head"><ha-icon icon="mdi:battery-charging-high"></ha-icon> Battery</div>
        <div class="tile-value">${null!=i?`${i.toFixed(0)}%`:"—"}</div>
        <div class="bar"><span style="width:${i??0}%; background: var(--so-battery);"></span></div>
        <div class="tile-sub">
          <span>${d}</span>
          ${null!=n?V`<span>🔋 ${ue(n,t.decimals_energy)}${a>0?` / ${ue(a,1)}`:""}</span>`:q}
          ${null!=s?V`<span>⬆️ ${ue(s,t.decimals_energy)}</span>`:q}
          ${null!=o?V`<span>⬇️ ${ue(o,t.decimals_energy)}</span>`:q}
          ${l?V`<span>⏱ ${l}</span>`:q}
          ${c?V`<span>🌡 ${c.state}${c.attributes?.unit_of_measurement||"°"}</span>`:q}
        </div>
      </div>
    `}_gridTile(){const e=this.hass,t=this._config;if(!1===t.show_grid)return q;const i=t.grid.power||t.grid.power_import||t.grid.power_export?fe(e,t.grid):null,r=t.grid.daily_import?_e(e,t.grid.daily_import):null,s=t.grid.daily_export?_e(e,t.grid.daily_export):null,o=t.grid.price_import?me(e,t.grid.price_import):null,a=t.grid.price_export?me(e,t.grid.price_export):null,n=null==i?"":i>5?`Importing ${pe(i,t.decimals_power)}`:i<-5?`Exporting ${pe(Math.abs(i),t.decimals_power)}`:"Idle";return V`
      <div class="tile clickable" @click=${()=>this._click(t.grid.power)}>
        <div class="tile-head"><ha-icon icon="mdi:transmission-tower"></ha-icon> Grid</div>
        <div class="tile-value" style="color:${null==i||i>=0?"var(--so-grid)":"var(--so-grid-export)"};">${null!=i?pe(Math.abs(i),t.decimals_power):"—"}</div>
        <div class="tile-sub">
          <span>${n}</span>
          ${null!=r?V`<span>⬇️ ${ue(r,t.decimals_energy)}</span>`:q}
          ${null!=s?V`<span>⬆️ ${ue(s,t.decimals_energy)}</span>`:q}
          ${o?V`<span>💰 ${o.state} ${o.attributes?.unit_of_measurement||""}</span>`:q}
          ${a?V`<span>📈 ${a.state} ${a.attributes?.unit_of_measurement||""}</span>`:q}
        </div>
      </div>
    `}_homeTile(){const e=this.hass,t=this._config;if(!1===t.show_home)return q;const i=t.home.power?ye(e,t.home):null,r=t.home.daily_energy?_e(e,t.home.daily_energy):null;return V`
      <div class="tile clickable" @click=${()=>this._click(t.home.power)}>
        <div class="tile-head"><ha-icon icon="mdi:home-lightning-bolt"></ha-icon> Home</div>
        <div class="tile-value" style="color: var(--so-home);">${null!=i?pe(i,t.decimals_power):"—"}</div>
        <div class="tile-sub">
          ${null!=r?V`<span>⚡ ${ue(r,t.decimals_energy)} today</span>`:q}
        </div>
      </div>
    `}_evTile(){const e=this.hass,t=this._config;if(!1===t.show_ev)return q;if(!t.ev.power&&!t.ev.soc&&!t.ev.session_energy)return q;const i=t.ev.power?ye(e,t.ev):null,r=t.ev.soc?ge(e,t.ev.soc):null,s=t.ev.session_energy?_e(e,t.ev.session_energy):null,o=t.ev.status?me(e,t.ev.status)?.state:null,a=null!=i&&i>5;return V`
      <div class="tile clickable" @click=${()=>this._click(t.ev.power||t.ev.soc)}>
        <div class="tile-head"><ha-icon icon="mdi:car-electric"></ha-icon> EV ${o?V`· <span style="text-transform:none;font-weight:600;">${o}</span>`:""}</div>
        <div class="tile-value" style="color: var(--so-ev);">${null!=i?pe(i,t.decimals_power):null!=r?`${r.toFixed(0)}%`:"—"}</div>
        ${null!=r?V`
          <div class="bar"><span style="width:${r}%; background: var(--so-ev);"></span></div>`:q}
        <div class="tile-sub">
          ${null!=r&&null!=i?V`<span>🔋 ${r.toFixed(0)}%</span>`:q}
          ${null!=s?V`<span>🔌 ${ue(s,t.decimals_energy)} session</span>`:q}
          ${a?V`<span style="color: var(--so-ev); font-weight:600;">● Charging</span>`:q}
        </div>
      </div>
    `}render(){if(!this._config||!this.hass)return V``;const e=this._config,t=this.hass,i=e.solar.total_today?_e(t,e.solar.total_today):null,r=e.solar.predicted_remaining_today?_e(t,e.solar.predicted_remaining_today):null,s=e.battery.soc?ge(t,e.battery.soc):null,o=e.grid.price_import?me(t,e.grid.price_import):null;return V`
      <ha-card>
        <div class="header">
          <div>
            <div class="title">${e.title||de.title}</div>
            ${null!=i?V`<div class="subtitle">${ue(i,e.decimals_energy)} produced today</div>`:q}
          </div>
          <div class="header-stats">
            ${null!=r?V`<span class="pill">☀️ ${ue(r,e.decimals_energy)} expected</span>`:q}
            ${null!=s?V`<span class="pill battery">🔋 ${s.toFixed(0)}%</span>`:q}
            ${o?V`<span class="pill grid">💰 ${o.state} ${o.attributes?.unit_of_measurement||""}</span>`:q}
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
    `}}customElements.define("solar-overview-card",$e);class be extends le{static properties={hass:{attribute:!1},_config:{state:!0}};static styles=o`
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
  `;setConfig(e){this._config={...de,...e,solar:{mppts:[],...e.solar||{}},battery:{...e.battery||{}},grid:{...e.grid||{}},home:{...e.home||{}},ev:{...e.ev||{}},inverter:{...e.inverter||{}}}}_emit(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}_setTop(e,t){this._config={...this._config,[e]:t},this._emit()}_setSection(e,t,i){this._config={...this._config,[e]:{...this._config[e],[t]:i}},this._emit()}_entityPicker(e,t,i,r=["sensor","binary_sensor","switch","number","input_number"]){const s=null===t?this._config[i]:this._config[t]?.[i];return V`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${s||""}
        .label=${e}
        .includeDomains=${r}
        allow-custom-entity
        @value-changed=${e=>null===t?this._setTop(i,e.detail.value):this._setSection(t,i,e.detail.value)}>
      </ha-entity-picker>
    `}_addMppt(){const e=[...this._config.solar?.mppts||[],{name:"",power:"",max_power:0}];this._setSection("solar","mppts",e)}_removeMppt(e){const t=[...this._config.solar?.mppts||[]];t.splice(e,1),this._setSection("solar","mppts",t)}_updateMppt(e,t,i){const r=[...this._config.solar?.mppts||[]];r[e]={...r[e],[t]:i},this._setSection("solar","mppts",r)}render(){if(!this._config||!this.hass)return V``;const e=this._config;return V`
      <h3>General</h3>
      <ha-textfield label="Title" .value=${e.title||""} @input=${e=>this._setTop("title",e.target.value)}></ha-textfield>
      <div class="row">
        <ha-textfield label="Decimals (power)" type="number" min="0" max="3" .value=${String(e.decimals_power??0)} @input=${e=>this._setTop("decimals_power",Number(e.target.value))}></ha-textfield>
        <ha-textfield label="Decimals (energy)" type="number" min="0" max="3" .value=${String(e.decimals_energy??1)} @input=${e=>this._setTop("decimals_energy",Number(e.target.value))}></ha-textfield>
      </div>
      <ha-formfield label="Animate flow">
        <ha-switch .checked=${!1!==e.animate} @change=${e=>this._setTop("animate",e.target.checked)}></ha-switch>
      </ha-formfield>

      <h3>Solar</h3>
      ${this._entityPicker("Total PV power","solar","total_power")}
      ${this._entityPicker("Total PV energy today","solar","total_today")}
      ${this._entityPicker("Forecast: remaining today","solar","predicted_remaining_today")}
      ${this._entityPicker("Forecast: total today","solar","predicted_today")}
      <h4>MPPT strings</h4>
      ${(e.solar.mppts||[]).map((e,t)=>V`
        <div class="mppt">
          <ha-textfield label="Name" .value=${e.name||""} @input=${e=>this._updateMppt(t,"name",e.target.value)}></ha-textfield>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${e.power||""}
            .label=${"Power entity"}
            .includeDomains=${["sensor"]}
            allow-custom-entity
            @value-changed=${e=>this._updateMppt(t,"power",e.detail.value)}>
          </ha-entity-picker>
          <ha-textfield label="Max W" type="number" min="0" .value=${String(e.max_power??0)} @input=${e=>this._updateMppt(t,"max_power",Number(e.target.value))}></ha-textfield>
          <mwc-button @click=${()=>this._removeMppt(t)}>✕</mwc-button>
        </div>
      `)}
      <mwc-button raised @click=${()=>this._addMppt()}>Add MPPT</mwc-button>

      <h3>Battery</h3>
      ${this._entityPicker("SOC (%)","battery","soc")}
      ${this._entityPicker("Power","battery","power")}
      <ha-formfield label="Invert power sign (flip charge / discharge direction)">
        <ha-switch .checked=${!!e.battery.invert} @change=${e=>this._setSection("battery","invert",e.target.checked)}></ha-switch>
      </ha-formfield>
      ${this._entityPicker("Daily charge","battery","daily_charge")}
      ${this._entityPicker("Daily discharge","battery","daily_discharge")}
      ${this._entityPicker("Remaining energy","battery","remaining_kwh")}
      ${this._entityPicker("Time to full","battery","time_to_full")}
      ${this._entityPicker("Temperature","battery","temperature")}
      <ha-textfield label="Capacity (kWh)" type="number" min="0" step="0.1" .value=${String(e.battery.capacity_kwh??0)} @input=${e=>this._setSection("battery","capacity_kwh",Number(e.target.value))}></ha-textfield>

      <h3>Grid</h3>
      ${this._entityPicker("Net power (+ import / − export)","grid","power")}
      <ha-formfield label="Invert net power sign">
        <ha-switch .checked=${!!e.grid.invert} @change=${e=>this._setSection("grid","invert",e.target.checked)}></ha-switch>
      </ha-formfield>
      <div style="font-size:.78rem;color:var(--secondary-text-color);margin:6px 0;">Or use separate sensors for import/export power (overrides net):</div>
      ${this._entityPicker("Power: import only","grid","power_import")}
      ${this._entityPicker("Power: export only","grid","power_export")}
      ${this._entityPicker("Daily import","grid","daily_import")}
      ${this._entityPicker("Daily export","grid","daily_export")}
      ${this._entityPicker("Import price","grid","price_import")}
      ${this._entityPicker("Export price","grid","price_export")}

      <h3>Home / Load</h3>
      ${this._entityPicker("Power","home","power")}
      <ha-formfield label="Invert power sign">
        <ha-switch .checked=${!!e.home.invert} @change=${e=>this._setSection("home","invert",e.target.checked)}></ha-switch>
      </ha-formfield>
      ${this._entityPicker("Daily energy","home","daily_energy")}

      <h3>Inverter</h3>
      <ha-textfield label="Icon (e.g. mdi:sine-wave, mdi:flash, mdi:cog)" .value=${e.inverter?.icon||""} @input=${e=>this._setSection("inverter","icon",e.target.value)}></ha-textfield>
      ${this._entityPicker("Status","inverter","status",["sensor","binary_sensor"])}
      ${this._entityPicker("Temperature","inverter","temperature")}

      <h3>EV Charger</h3>
      ${this._entityPicker("Charging power","ev","power")}
      <ha-formfield label="Invert power sign">
        <ha-switch .checked=${!!e.ev.invert} @change=${e=>this._setSection("ev","invert",e.target.checked)}></ha-switch>
      </ha-formfield>
      ${this._entityPicker("Session energy","ev","session_energy")}
      ${this._entityPicker("Car SOC (%)","ev","soc")}
      ${this._entityPicker("Status","ev","status",["sensor","binary_sensor","switch"])}
    `}}customElements.define("solar-overview-card-editor",be),window.customCards=window.customCards||[],window.customCards.push({type:"solar-overview-card",name:"Solar Overview Card",description:"Material You styled solar / battery / grid / EV overview",preview:!0,documentationURL:"https://github.com/xprezz/solar-overview-card"});
