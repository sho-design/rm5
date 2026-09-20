/**
 * Applies the stored theme and text-size before first paint so the page does
 * not flash. Values are set by the utility bar (contrast) and footer (text size).
 */
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('rm-theme');if(t==='dark'||t==='contrast'){document.documentElement.setAttribute('data-theme',t)}var s=localStorage.getItem('rm-text');if(s==='1'||s==='2'){document.documentElement.setAttribute('data-text',s)}}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
