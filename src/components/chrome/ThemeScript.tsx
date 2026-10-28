/**
 * Applies the stored theme and text-size before first paint so the page does
 * not flash. Values are set by the utility bar (contrast) and footer (text size).
 *
 * It also stops the browser from ever submitting a site form by itself. All
 * forms are sent by script as JSON; on a slow phone someone can press
 * "Continue" before the scripts have loaded, and a native submit would reload
 * the page, lose what they typed and put their details in the address bar.
 * React still receives the submit event once it has loaded.
 */
export function ThemeScript() {
  const code = `(function(){document.addEventListener('submit',function(e){e.preventDefault()},true);try{var t=localStorage.getItem('rm-theme');if(t==='dark'||t==='contrast'){document.documentElement.setAttribute('data-theme',t)}var s=localStorage.getItem('rm-text');if(s==='1'||s==='2'){document.documentElement.setAttribute('data-text',s)}}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
