# ✨ LLM Code Exporter Bookmarklet ✨

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stars](https://img.shields.io/github/stars/gloryknight/IA_file_extractor?style=social)](https://github.com/gloryknight/IA_file_extractor/stargazers) <!-- **Important:** Update the URL! -->

Tired of manually copying and pasting multiple code snippets from Large Language Model (LLM) responses like ChatGPT, Claude, Gemini, etc.? This simple bookmarklet extracts all code blocks from the current page, attempts to detect their filenames, packages them into a structured `.tar` archive, and downloads it – all with **one click!**

**Say goodbye to tedious copy-pasting and lost file structure!** 🚀

<!-- 🖼️ **RECOMMENDATION:** Create a short GIF showing the bookmarklet in action (click -> download) and embed it here! -->
<!-- Example: ![Demo GIF](link-to-your-demo.gif) -->

## Features

*   🖱️ **One-Click Extraction:** Grab all code blocks instantly.
*   📄 **Filename Detection:** Intelligently guesses filenames from text preceding the code blocks (e.g., `path/to/your/file.py`).
*   🏷️ **Language-Based Fallback:** Uses code block language (e.g., `language-python`) to assign extensions (`.py`) if no filename is found.
*   📦 **TAR Archive:** Packages files into a `.tar` archive, preserving directory structures mentioned in filenames (e.g., `src/utils/helper.js`).
*   🌐 **Browser-Based:** Runs entirely in your browser, no installation needed.
*   ✨ **Self-Contained:** Includes a minimal TAR implementation – no external libraries required.
*   📝 **UTF-8 Support:** Handles UTF-8 characters within the code content.

## How to Use

There are two easy ways to install the bookmarklet:

**Method 1: Copy & Paste (Recommended)**

1.  **Bookmark Any Page:** Create a new bookmark in your browser (Ctrl+D or Cmd+D). Name it something memorable like `Export LLM Code`.
2.  **Edit the Bookmark:** Right-click the new bookmark and choose "Edit" or "Properties".
3.  **Replace URL:** Delete the current content in the "URL" or "Location" field.
4.  **Paste the Code:** Copy the **minified** code below and paste it into the "URL" / "Location" field:

    ```javascript
    javascript:!function(){let e=/[`\*]?([\w\/.-]+\.\w+)[`\*]?$/i;console.log("Bookmarklet: Starting code extraction...");let t=document.querySelectorAll("pre > code"),l=[],n=1;if(0===t.length){alert('Bookmarklet: No code blocks found using selector "pre > code".');return}if(t.forEach(t=>{let r=t.closest("pre");if(!r)return;let o=t.textContent;if(!o||""===o.trim()){console.log("Bookmarklet: Skipping empty code block.");return}let s="",$=r.previousElementSibling,i=0;for(;$&&i<3;){let a=$.textContent?.trim();if(a){let c=a.match(e);if(c&&c[1]&&c[1].length<150&&!c[1].includes(" ")&&c[1].includes(".")){s=c[1],console.log(`Bookmarklet: Found potential filename "${s}" in preceding element.`);break}}$=$.previousElementSibling,i++}if(!s){let u=".txt",p=Array.from(t.classList).find(e=>e.startsWith("language-"));if(p){let f=p.substring(9),g={python:".py",javascript:".js",html:".html",css:".css",bash:".sh",shell:".sh",java:".java",csharp:".cs",cpp:".cpp",c:".c",typescript:".ts",json:".json",yaml:".yaml",markdown:".md",sql:".sql",xml:".xml",dockerfile:".dockerfile",plaintext:".txt"};g[f]?u=g[f]:f&&(u="."+f)}s=`file_${n}${u}`,console.log(`Bookmarklet: Could not find filename, using default: "${s}"`)}s=s.replace(/^\/+/,"").replace(/\.\.\//g,""),l.push({name:s,content:o}),n++}),l.length>0)try{let r=function e(t){let l=[];function n(e,t){let l=[],n=0;for(let r=0;r<e.length&&n<t;r++){let o=e.charCodeAt(r);o<128?(l.push(o),n++):console.warn("Non-ASCII character skipped in TAR header string:",e[r])}for(;l.length<t;)l.push(0);return l}function r(e,t){let l=e.toString(8),r="0".repeat(t-1-l.length)+l+"\0";return n(r,t)}t.forEach(e=>{let t=function e(t){let l=[];for(let n=0;n<t.length;n++){let r=t.charCodeAt(n);r<128?l.push(r):r<2048?l.push(192|r>>6,128|63&r):r<65536?l.push(224|r>>12,128|r>>6&63,128|63&r):l.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r)}return l}(e.content),o=t.length,s=e.name,$="";if(s.length>100){let i=-1;for(let a=Math.min(s.length,155)-1;a>=0;a--)if("/"===s[a]){let c=s.substring(0,a),u=s.substring(a+1);if(c.length<=155&&u.length<=100){i=a;break}}-1!==i?($=s.substring(0,i),s=s.substring(i+1)):(console.warn(`Filename "${e.name}" too long and could not be split cleanly for TAR. Truncating.`),$=s.substring(0,155),s=s.substring(155,255))}let p=new Uint8Array(512),f=0;p.set(n(s,100),f),f+=100,p.set(r(parseInt("644",8),8),f),f+=8,p.set(r(0,8),f),f+=8,p.set(r(0,8),f),f+=8,p.set(r(o,12),f),f+=12,p.set(r(Math.floor(Date.now()/1e3),12),f),f+=12,p.set(n("        ",8),f),f+=8,p.set(n("0",1),f),f+=1,p.set(n("",100),f),f+=100,p.set(n("ustar\0",6),f),f+=6,p.set(n("00",2),f),f+=2,p.set(n("user",32),f),f+=32,p.set(n("group",32),f),f+=32,p.set(r(0,8),f),f+=8,p.set(r(0,8),f),f+=8,p.set(n($,155),f),f+=155;let g=0;for(let h=0;h<512;h++)g+=p[h];p.set(r(g,8),148),l.push(...p),l.push(...t);let _=(512-o%512)%512;for(let d=0;d<_;d++)l.push(0)});let o=new Uint8Array(512);return l.push(...o,...o),new Uint8Array(l)}(l),o=new Blob([r],{type:"application/x-tar"}),s=(document.title||"llm_export").replace(/[^a-z0-9_-]/gi,"_").replace(/_+/g,"_");s.length>50&&(s=s.substring(0,50)),s=s||"llm_code_export",s+=".tar",function e(t,l){let n=URL.createObjectURL(t),r=document.createElement("a");r.href=n,r.download=l,r.style.display="none",document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(n)}(o,s),alert(`Bookmarklet: Successfully packaged ${l.length} file(s) into "${s}".`)}catch($){console.error("Bookmarklet Error:",$),alert(`Bookmarklet: An error occurred during TAR creation or download: ${$.message}`)}else alert("Bookmarklet: No non-empty code blocks were found to package.")}();
    ```

5.  **Save:** Save the changes to the bookmark.

**(Optional) Method 2: Drag and Drop Link (If you host this code or a page with the link)**

*You can create a simple HTML page in this repository using GitHub Pages and place a link there.*

1.  **Create Link:** Create an `<a>` tag where the `href` attribute contains the **minified** JavaScript code (starting with `javascript:`).
    ```html
    <a href="javascript:...">Export LLM Code</a>
    ```
2.  **Drag to Bookmarks Bar:** Users can simply drag this link directly onto their bookmarks toolbar.

**Usage:**

1.  Navigate to the page containing the LLM response with code blocks you want to save.
2.  Click the `Export LLM Code` bookmarklet you created.
3.  A `.tar` file (e.g., `llm_response_export.tar`) containing the extracted code files will be downloaded automatically!

## How It Works

The bookmarklet executes JavaScript in the context of the current page:

1.  It finds all `<pre><code>` elements.
2.  For each code block, it searches the preceding sibling elements for text that looks like a filename (using regex).
3.  If no filename is found, it checks the code block's `class` for a language (e.g., `language-python`) and uses that to generate a default filename (`file_1.py`).
4.  It uses a built-in, minimal JavaScript function to construct a TAR archive (USTAR format) in memory.
5.  File content is encoded as UTF-8.
6.  The generated TAR archive is converted to a `Blob`.
7.  A hidden link is created with the Blob URL and download attribute, then programmatically clicked to trigger the download.

## Limitations

*   **Filename Accuracy:** Filename detection is heuristic and might fail if the LLM response structure is unusual or filenames aren't near the code block.
*   **HTML Structure:** Relies on the common `<pre><code>...</code></pre>` structure. It won't work on pages using different elements for code display.
*   **TAR Features:** The TAR implementation is basic. It supports USTAR long filenames (up to ~255 characters split between prefix/name) but lacks features like complex permission handling or symbolic links.
*   **Browser Security:** May be restricted by Content Security Policy (CSP) on some websites.
*   **Bookmarklet Length Limits:** The code is minified, but extremely complex future versions might hit browser limits.

## Contributing

Found a bug or have an idea for improvement? Feel free to:

*   [Open an Issue](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME/issues) <!-- **Important:** Update the URL! -->
*   Submit a Pull Request

⭐️ **If you find this useful, please consider starring the repository!** ⭐️

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
*(**Note:** Remember to add an actual `LICENSE` file containing the MIT license text to your repository!)*

---