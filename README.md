# ✨ LLM Code Exporter Bookmarklet ✨

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stars](https://img.shields.io/github/stars/gloryknight/IA_file_extractor?style=social)](https://github.com/gloryknight/IA_file_extractor/stargazers)

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

**Method 1: Drag and Drop following link to your bookmark bar:**
<a href="javascript%3A%21function%28%29%7Blet%20e%3D%2F%5B%60%5C%2A%5D%3F%28%5B%5Cw%5C%2F.-%5D%2B%5C.%5Cw%2B%29%5B%60%5C%2A%5D%3F%24%2Fi%3Bconsole.log%28%22Bookmarklet%3A%20Starting%20code%20extraction...%22%29%3Blet%20t%3Ddocument.querySelectorAll%28%22pre%20%3E%20code%22%29%2Cl%3D%5B%5D%2Cn%3D1%3Bif%280%3D%3D%3Dt.length%29%7Balert%28%27Bookmarklet%3A%20No%20code%20blocks%20found%20using%20selector%20%22pre%20%3E%20code%22.%27%29%3Breturn%7Dif%28t.forEach%28t%3D%3E%7Blet%20r%3Dt.closest%28%22pre%22%29%3Bif%28%21r%29return%3Blet%20o%3Dt.textContent%3Bif%28%21o%7C%7C%22%22%3D%3D%3Do.trim%28%29%29%7Bconsole.log%28%22Bookmarklet%3A%20Skipping%20empty%20code%20block.%22%29%3Breturn%7Dlet%20s%3D%22%22%2C%24%3Dr.previousElementSibling%2Ci%3D0%3Bfor%28%3B%24%26%26i%3C3%3B%29%7Blet%20a%3D%24.textContent%3F.trim%28%29%3Bif%28a%29%7Blet%20c%3Da.match%28e%29%3Bif%28c%26%26c%5B1%5D%26%26c%5B1%5D.length%3C150%26%26%21c%5B1%5D.includes%28%22%20%22%29%26%26c%5B1%5D.includes%28%22.%22%29%29%7Bs%3Dc%5B1%5D%2Cconsole.log%28%60Bookmarklet%3A%20Found%20potential%20filename%20%22%24%7Bs%7D%22%20in%20preceding%20element.%60%29%3Bbreak%7D%7D%24%3D%24.previousElementSibling%2Ci%2B%2B%7Dif%28%21s%29%7Blet%20u%3D%22.txt%22%2Cp%3DArray.from%28t.classList%29.find%28e%3D%3Ee.startsWith%28%22language-%22%29%29%3Bif%28p%29%7Blet%20f%3Dp.substring%289%29%2Cg%3D%7Bpython%3A%22.py%22%2Cjavascript%3A%22.js%22%2Chtml%3A%22.html%22%2Ccss%3A%22.css%22%2Cbash%3A%22.sh%22%2Cshell%3A%22.sh%22%2Cjava%3A%22.java%22%2Ccsharp%3A%22.cs%22%2Ccpp%3A%22.cpp%22%2Cc%3A%22.c%22%2Ctypescript%3A%22.ts%22%2Cjson%3A%22.json%22%2Cyaml%3A%22.yaml%22%2Cmarkdown%3A%22.md%22%2Csql%3A%22.sql%22%2Cxml%3A%22.xml%22%2Cdockerfile%3A%22.dockerfile%22%2Cplaintext%3A%22.txt%22%7D%3Bg%5Bf%5D%3Fu%3Dg%5Bf%5D%3Af%26%26%28u%3D%22.%22%2Bf%29%7Ds%3D%60file_%24%7Bn%7D%24%7Bu%7D%60%2Cconsole.log%28%60Bookmarklet%3A%20Could%20not%20find%20filename%2C%20using%20default%3A%20%22%24%7Bs%7D%22%60%29%7Ds%3Ds.replace%28%2F%5E%5C%2F%2B%2F%2C%22%22%29.replace%28%2F%5C.%5C.%5C%2F%2Fg%2C%22%22%29%2Cl.push%28%7Bname%3As%2Ccontent%3Ao%7D%29%2Cn%2B%2B%7D%29%2Cl.length%3E0%29try%7Blet%20r%3Dfunction%20e%28t%29%7Blet%20l%3D%5B%5D%3Bfunction%20n%28e%2Ct%29%7Blet%20l%3D%5B%5D%2Cn%3D0%3Bfor%28let%20r%3D0%3Br%3Ce.length%26%26n%3Ct%3Br%2B%2B%29%7Blet%20o%3De.charCodeAt%28r%29%3Bo%3C128%3F%28l.push%28o%29%2Cn%2B%2B%29%3Aconsole.warn%28%22Non-ASCII%20character%20skipped%20in%20TAR%20header%20string%3A%22%2Ce%5Br%5D%29%7Dfor%28%3Bl.length%3Ct%3B%29l.push%280%29%3Breturn%20l%7Dfunction%20r%28e%2Ct%29%7Blet%20l%3De.toString%288%29%2Cr%3D%220%22.repeat%28t-1-l.length%29%2Bl%2B%22%5C0%22%3Breturn%20n%28r%2Ct%29%7Dt.forEach%28e%3D%3E%7Blet%20t%3Dfunction%20e%28t%29%7Blet%20l%3D%5B%5D%3Bfor%28let%20n%3D0%3Bn%3Ct.length%3Bn%2B%2B%29%7Blet%20r%3Dt.charCodeAt%28n%29%3Br%3C128%3Fl.push%28r%29%3Ar%3C2048%3Fl.push%28192%7Cr%3E%3E6%2C128%7C63%26r%29%3Ar%3C65536%3Fl.push%28224%7Cr%3E%3E12%2C128%7Cr%3E%3E6%2663%2C128%7C63%26r%29%3Al.push%28240%7Cr%3E%3E18%2C128%7Cr%3E%3E12%2663%2C128%7Cr%3E%3E6%2663%2C128%7C63%26r%29%7Dreturn%20l%7D%28e.content%29%2Co%3Dt.length%2Cs%3De.name%2C%24%3D%22%22%3Bif%28s.length%3E100%29%7Blet%20i%3D-1%3Bfor%28let%20a%3DMath.min%28s.length%2C155%29-1%3Ba%3E%3D0%3Ba--%29if%28%22%2F%22%3D%3D%3Ds%5Ba%5D%29%7Blet%20c%3Ds.substring%280%2Ca%29%2Cu%3Ds.substring%28a%2B1%29%3Bif%28c.length%3C%3D155%26%26u.length%3C%3D100%29%7Bi%3Da%3Bbreak%7D%7D-1%21%3D%3Di%3F%28%24%3Ds.substring%280%2Ci%29%2Cs%3Ds.substring%28i%2B1%29%29%3A%28console.warn%28%60Filename%20%22%24%7Be.name%7D%22%20too%20long%20and%20could%20not%20be%20split%20cleanly%20for%20TAR.%20Truncating.%60%29%2C%24%3Ds.substring%280%2C155%29%2Cs%3Ds.substring%28155%2C255%29%29%7Dlet%20p%3Dnew%20Uint8Array%28512%29%2Cf%3D0%3Bp.set%28n%28s%2C100%29%2Cf%29%2Cf%2B%3D100%2Cp.set%28r%28parseInt%28%22644%22%2C8%29%2C8%29%2Cf%29%2Cf%2B%3D8%2Cp.set%28r%280%2C8%29%2Cf%29%2Cf%2B%3D8%2Cp.set%28r%280%2C8%29%2Cf%29%2Cf%2B%3D8%2Cp.set%28r%28o%2C12%29%2Cf%29%2Cf%2B%3D12%2Cp.set%28r%28Math.floor%28Date.now%28%29%2F1e3%29%2C12%29%2Cf%29%2Cf%2B%3D12%2Cp.set%28n%28%22%20%20%20%20%20%20%20%20%22%2C8%29%2Cf%29%2Cf%2B%3D8%2Cp.set%28n%28%220%22%2C1%29%2Cf%29%2Cf%2B%3D1%2Cp.set%28n%28%22%22%2C100%29%2Cf%29%2Cf%2B%3D100%2Cp.set%28n%28%22ustar%5C0%22%2C6%29%2Cf%29%2Cf%2B%3D6%2Cp.set%28n%28%2200%22%2C2%29%2Cf%29%2Cf%2B%3D2%2Cp.set%28n%28%22user%22%2C32%29%2Cf%29%2Cf%2B%3D32%2Cp.set%28n%28%22group%22%2C32%29%2Cf%29%2Cf%2B%3D32%2Cp.set%28r%280%2C8%29%2Cf%29%2Cf%2B%3D8%2Cp.set%28r%280%2C8%29%2Cf%29%2Cf%2B%3D8%2Cp.set%28n%28%24%2C155%29%2Cf%29%2Cf%2B%3D155%3Blet%20g%3D0%3Bfor%28let%20h%3D0%3Bh%3C512%3Bh%2B%2B%29g%2B%3Dp%5Bh%5D%3Bp.set%28r%28g%2C8%29%2C148%29%2Cl.push%28...p%29%2Cl.push%28...t%29%3Blet%20_%3D%28512-o%25512%29%25512%3Bfor%28let%20d%3D0%3Bd%3C_%3Bd%2B%2B%29l.push%280%29%7D%29%3Blet%20o%3Dnew%20Uint8Array%28512%29%3Breturn%20l.push%28...o%2C...o%29%2Cnew%20Uint8Array%28l%29%7D%28l%29%2Co%3Dnew%20Blob%28%5Br%5D%2C%7Btype%3A%22application%2Fx-tar%22%7D%29%2Cs%3D%28document.title%7C%7C%22llm_export%22%29.replace%28%2F%5B%5Ea-z0-9_-%5D%2Fgi%2C%22_%22%29.replace%28%2F_%2B%2Fg%2C%22_%22%29%3Bs.length%3E50%26%26%28s%3Ds.substring%280%2C50%29%29%2Cs%3Ds%7C%7C%22llm_code_export%22%2Cs%2B%3D%22.tar%22%2Cfunction%20e%28t%2Cl%29%7Blet%20n%3DURL.createObjectURL%28t%29%2Cr%3Ddocument.createElement%28%22a%22%29%3Br.href%3Dn%2Cr.download%3Dl%2Cr.style.display%3D%22none%22%2Cdocument.body.appendChild%28r%29%2Cr.click%28%29%2Cdocument.body.removeChild%28r%29%2CURL.revokeObjectURL%28n%29%7D%28o%2Cs%29%2Calert%28%60Bookmarklet%3A%20Successfully%20packaged%20%24%7Bl.length%7D%20file%28s%29%20into%20%22%24%7Bs%7D%22.%60%29%7Dcatch%28%24%29%7Bconsole.error%28%22Bookmarklet%20Error%3A%22%2C%24%29%2Calert%28%60Bookmarklet%3A%20An%20error%20occurred%20during%20TAR%20creation%20or%20download%3A%20%24%7B%24.message%7D%60%29%7Delse%20alert%28%22Bookmarklet%3A%20No%20non-empty%20code%20blocks%20were%20found%20to%20package.%22%29%7D%28%29%3B">Export LLM Code</a>

**Usage:**

1.  Navigate to the page containing the LLM response with code blocks you want to save.
2.  Click the `Export LLM Code` bookmarklet you created.
3.  A `.tar` file (e.g., `llm_response_export.tar`) containing the extracted code files will be downloaded automatically!


**Method 2: Copy & Paste (Recommended)**

1.  **Bookmark Any Page:** Create a new bookmark in your browser (Ctrl+D or Cmd+D). Name it something memorable like `Export LLM Code`.
2.  **Edit the Bookmark:** Right-click the new bookmark and choose "Edit" or "Properties".
3.  **Replace URL:** Delete the current content in the "URL" or "Location" field.
4.  **Paste the Code:** Copy the **minified** code below and paste it into the "URL" / "Location" field:

    ```javascript
    javascript:!function(){let e=/[`\*]?([\w\/.-]+\.\w+)[`\*]?$/i;console.log("Bookmarklet: Starting code extraction...");let t=document.querySelectorAll("pre > code"),l=[],n=1;if(0===t.length){alert('Bookmarklet: No code blocks found using selector "pre > code".');return}if(t.forEach(t=>{let r=t.closest("pre");if(!r)return;let o=t.textContent;if(!o||""===o.trim()){console.log("Bookmarklet: Skipping empty code block.");return}let s="",$=r.previousElementSibling,i=0;for(;$&&i<3;){let a=$.textContent?.trim();if(a){let c=a.match(e);if(c&&c[1]&&c[1].length<150&&!c[1].includes(" ")&&c[1].includes(".")){s=c[1],console.log(`Bookmarklet: Found potential filename "${s}" in preceding element.`);break}}$=$.previousElementSibling,i++}if(!s){let u=".txt",p=Array.from(t.classList).find(e=>e.startsWith("language-"));if(p){let f=p.substring(9),g={python:".py",javascript:".js",html:".html",css:".css",bash:".sh",shell:".sh",java:".java",csharp:".cs",cpp:".cpp",c:".c",typescript:".ts",json:".json",yaml:".yaml",markdown:".md",sql:".sql",xml:".xml",dockerfile:".dockerfile",plaintext:".txt"};g[f]?u=g[f]:f&&(u="."+f)}s=`file_${n}${u}`,console.log(`Bookmarklet: Could not find filename, using default: "${s}"`)}s=s.replace(/^\/+/,"").replace(/\.\.\//g,""),l.push({name:s,content:o}),n++}),l.length>0)try{let r=function e(t){let l=[];function n(e,t){let l=[],n=0;for(let r=0;r<e.length&&n<t;r++){let o=e.charCodeAt(r);o<128?(l.push(o),n++):console.warn("Non-ASCII character skipped in TAR header string:",e[r])}for(;l.length<t;)l.push(0);return l}function r(e,t){let l=e.toString(8),r="0".repeat(t-1-l.length)+l+"\0";return n(r,t)}t.forEach(e=>{let t=function e(t){let l=[];for(let n=0;n<t.length;n++){let r=t.charCodeAt(n);r<128?l.push(r):r<2048?l.push(192|r>>6,128|63&r):r<65536?l.push(224|r>>12,128|r>>6&63,128|63&r):l.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r)}return l}(e.content),o=t.length,s=e.name,$="";if(s.length>100){let i=-1;for(let a=Math.min(s.length,155)-1;a>=0;a--)if("/"===s[a]){let c=s.substring(0,a),u=s.substring(a+1);if(c.length<=155&&u.length<=100){i=a;break}}-1!==i?($=s.substring(0,i),s=s.substring(i+1)):(console.warn(`Filename "${e.name}" too long and could not be split cleanly for TAR. Truncating.`),$=s.substring(0,155),s=s.substring(155,255))}let p=new Uint8Array(512),f=0;p.set(n(s,100),f),f+=100,p.set(r(parseInt("644",8),8),f),f+=8,p.set(r(0,8),f),f+=8,p.set(r(0,8),f),f+=8,p.set(r(o,12),f),f+=12,p.set(r(Math.floor(Date.now()/1e3),12),f),f+=12,p.set(n("        ",8),f),f+=8,p.set(n("0",1),f),f+=1,p.set(n("",100),f),f+=100,p.set(n("ustar\0",6),f),f+=6,p.set(n("00",2),f),f+=2,p.set(n("user",32),f),f+=32,p.set(n("group",32),f),f+=32,p.set(r(0,8),f),f+=8,p.set(r(0,8),f),f+=8,p.set(n($,155),f),f+=155;let g=0;for(let h=0;h<512;h++)g+=p[h];p.set(r(g,8),148),l.push(...p),l.push(...t);let _=(512-o%512)%512;for(let d=0;d<_;d++)l.push(0)});let o=new Uint8Array(512);return l.push(...o,...o),new Uint8Array(l)}(l),o=new Blob([r],{type:"application/x-tar"}),s=(document.title||"llm_export").replace(/[^a-z0-9_-]/gi,"_").replace(/_+/g,"_");s.length>50&&(s=s.substring(0,50)),s=s||"llm_code_export",s+=".tar",function e(t,l){let n=URL.createObjectURL(t),r=document.createElement("a");r.href=n,r.download=l,r.style.display="none",document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(n)}(o,s),alert(`Bookmarklet: Successfully packaged ${l.length} file(s) into "${s}".`)}catch($){console.error("Bookmarklet Error:",$),alert(`Bookmarklet: An error occurred during TAR creation or download: ${$.message}`)}else alert("Bookmarklet: No non-empty code blocks were found to package.")}();
    ```

5.  **Save:** Save the changes to the bookmark.


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

* [Open an Issue](https://github.com/gloryknight/IA_file_extractor/issues)
*   Submit a Pull Request

⭐️ **If you find this useful, please consider starring the repository!** ⭐️

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


---
