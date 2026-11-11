/**
 * Applies the stored theme and text-size before first paint so the page does
 * not flash. Values are set by the utility bar (contrast) and footer (text size).
 *
 * It also stops the browser from ever submitting a site form by itself. All
 * forms are sent by script as JSON; on a slow phone someone can press
 * "Continue" before the scripts have loaded, and a native submit would reload
 * the page, lose what they typed and put their details in the address bar.
 * React still receives the submit event once it has loaded.
 *
 * And it catches "/" or Ctrl+K pressed before the header is ready (round 29, Grace), plus the letters typed
 * after it, so search opens with them once it loads; until then the keys do not scroll the page.
 */
export function ThemeScript() {
  const code = `(function(){document.addEventListener('submit',function(e){e.preventDefault()},true);try{var t=localStorage.getItem('rm-theme');if(t==='dark'||t==='contrast'){document.documentElement.setAttribute('data-theme',t)}var s=localStorage.getItem('rm-text');if(s==='1'||s==='2'){document.documentElement.setAttribute('data-text',s)}}catch(e){}})();(function(){var w=window;w.__rmQ=null;document.addEventListener('keydown',function(e){if(w.__rmReady)return;var t=e.target,typing=t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName||''));if(w.__rmQ!==null){if(e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey){w.__rmQ+=e.key;e.preventDefault()}return}if(typing)return;var k=e.key||'';if((k==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey)||((e.ctrlKey||e.metaKey)&&!e.altKey&&k.toLowerCase()==='k')){w.__rmQ='';e.preventDefault()}},true)})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
