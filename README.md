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

**Method 1: Drag and Drop (Recommended):**
1. **Drag and Drop** following link to your bookmark bar: 
<a href="javascript:%21function%28%29%7Bif%28%22%2Fgloryknight%2FIA_file_extractor%22%3D%3D%3Ddocument.location.pathname%29return%3Blet%20e%3D%2F%5B%60%5C%2A%5D%3F%28%5B%5Cw%5C%2F.-%5D%2B%5C.%5Cw%2B%29%5B%60%5C%2A%5D%3F%24%2Fi%3Bconsole.log%28%22Bookmarklet%3A%20Starting%20code%20extraction...%22%29%3Blet%20t%3Ddocument.querySelectorAll%28%22pre%20%3E%20code%22%29%2Cl%3D%5B%5D%2Cn%3D1%3Bif%280%3D%3D%3Dt.length%29%7Bconsole.log%28%27Bookmarklet%3A%20No%20code%20blocks%20found%20using%20selector%20%22pre%20%3E%20code%22.%27%29%3Breturn%7Dif%28t.forEach%28t%3D%3E%7Blet%20o%3Dt.closest%28%22pre%22%29%3Bif%28%21o%29return%3Blet%20r%3Dt.textContent%3Bif%28%21r%7C%7C%22%22%3D%3D%3Dr.trim%28%29%29%7Bconsole.log%28%22Bookmarklet%3A%20Skipping%20empty%20code%20block.%22%29%3Breturn%7Dlet%20i%3D%22%22%2C%24%3Do.previousElementSibling%2Cs%3D0%3Bfor%28%3B%24%26%26s%3C3%3B%29%7Blet%20a%3D%24.textContent%3F.trim%28%29%3Bif%28a%29%7Blet%20c%3Da.match%28e%29%3Bif%28c%26%26c%5B1%5D%26%26c%5B1%5D.length%3C150%26%26%21c%5B1%5D.includes%28%22%20%22%29%26%26c%5B1%5D.includes%28%22.%22%29%29%7Bi%3Dc%5B1%5D%2Cconsole.log%28%60Bookmarklet%3A%20Found%20potential%20filename%20%22%24%7Bi%7D%22%20in%20preceding%20element.%60%29%3Bbreak%7D%7D%24%3D%24.previousElementSibling%2Cs%2B%2B%7Dif%28%21i%29%7Blet%20p%3D%22.txt%22%2Cf%3DArray.from%28t.classList%29.find%28e%3D%3Ee.startsWith%28%22language-%22%29%29%3Bif%28f%29%7Blet%20u%3Df.substring%289%29%2Cg%3D%7Bpython%3A%22.py%22%2Cjavascript%3A%22.js%22%2Chtml%3A%22.html%22%2Ccss%3A%22.css%22%2Cbash%3A%22.sh%22%2Cshell%3A%22.sh%22%2Cjava%3A%22.java%22%2Ccsharp%3A%22.cs%22%2Ccpp%3A%22.cpp%22%2Cc%3A%22.c%22%2Ctypescript%3A%22.ts%22%2Cjson%3A%22.json%22%2Cyaml%3A%22.yaml%22%2Cmarkdown%3A%22.md%22%2Csql%3A%22.sql%22%2Cxml%3A%22.xml%22%2Cdockerfile%3A%22.dockerfile%22%2Cplaintext%3A%22.txt%22%7D%3Bg%5Bu%5D%3Fp%3Dg%5Bu%5D%3Au%26%26%28p%3D%22.%22%2Bu%29%7Di%3D%60file_%24%7Bn%7D%24%7Bp%7D%60%2Cconsole.log%28%60Bookmarklet%3A%20Could%20not%20find%20filename%2C%20using%20default%3A%20%22%24%7Bi%7D%22%60%29%7Di%3Di.replace%28%2F%5E%5C%2F%2B%2F%2C%22%22%29.replace%28%2F%5C.%5C.%5C%2F%2Fg%2C%22%22%29%2Cl.push%28%7Bname%3Ai%2Ccontent%3Ar%7D%29%2Cn%2B%2B%7D%29%2Cl.length%3E0%29try%7Blet%20o%3Dfunction%20e%28t%29%7Blet%20l%3D%5B%5D%3Bfunction%20n%28e%2Ct%29%7Blet%20l%3D%5B%5D%2Cn%3D0%3Bfor%28let%20o%3D0%3Bo%3Ce.length%26%26n%3Ct%3Bo%2B%2B%29%7Blet%20r%3De.charCodeAt%28o%29%3Br%3C128%3F%28l.push%28r%29%2Cn%2B%2B%29%3Aconsole.warn%28%22Non-ASCII%20character%20skipped%20in%20TAR%20header%20string%3A%22%2Ce%5Bo%5D%29%7Dfor%28%3Bl.length%3Ct%3B%29l.push%280%29%3Breturn%20l%7Dfunction%20o%28e%2Ct%29%7Blet%20l%3De.toString%288%29%2Co%3D%220%22.repeat%28t-1-l.length%29%2Bl%2B%22%5C0%22%3Breturn%20n%28o%2Ct%29%7Dt.forEach%28e%3D%3E%7Blet%20t%3Dfunction%20e%28t%29%7Blet%20l%3D%5B%5D%3Bfor%28let%20n%3D0%3Bn%3Ct.length%3Bn%2B%2B%29%7Blet%20o%3Dt.charCodeAt%28n%29%3Bo%3C128%3Fl.push%28o%29%3Ao%3C2048%3Fl.push%28192%7Co%3E%3E6%2C128%7C63%26o%29%3Ao%3C65536%3Fl.push%28224%7Co%3E%3E12%2C128%7Co%3E%3E6%2663%2C128%7C63%26o%29%3Al.push%28240%7Co%3E%3E18%2C128%7Co%3E%3E12%2663%2C128%7Co%3E%3E6%2663%2C128%7C63%26o%29%7Dreturn%20l%7D%28e.content%29%2Cr%3Dt.length%2Ci%3De.name%2C%24%3D%22%22%3Bif%28i.length%3E100%29%7Blet%20s%3D-1%3Bfor%28let%20a%3DMath.min%28i.length%2C155%29-1%3Ba%3E%3D0%3Ba--%29if%28%22%2F%22%3D%3D%3Di%5Ba%5D%29%7Blet%20c%3Di.substring%280%2Ca%29%2Cp%3Di.substring%28a%2B1%29%3Bif%28c.length%3C%3D155%26%26p.length%3C%3D100%29%7Bs%3Da%3Bbreak%7D%7D-1%21%3D%3Ds%3F%28%24%3Di.substring%280%2Cs%29%2Ci%3Di.substring%28s%2B1%29%29%3A%28console.warn%28%60Filename%20%22%24%7Be.name%7D%22%20too%20long%20and%20could%20not%20be%20split%20cleanly%20for%20TAR.%20Truncating.%60%29%2C%24%3Di.substring%280%2C155%29%2Ci%3Di.substring%28155%2C255%29%29%7Dlet%20f%3Dnew%20Uint8Array%28512%29%2Cu%3D0%2Cg%3D%5Bi%2C100%2C420%2C8%2C0%2C8%2C0%2C8%2Cr%2C12%2CMath.floor%28Date.now%28%29%2F1e3%29%2C12%2C%22%20%20%20%20%20%20%20%20%22%2C8%2C%220%22%2C1%2C%22%22%2C100%2C%22ustar%5C0%22%2C6%2C%2200%22%2C2%2C%22user%22%2C32%2C%22group%22%2C32%2C0%2C8%2C0%2C8%2C%24%2C155%5D%3Bfor%28let%20h%3D0%3Bh%3Cg.length%3Bh%2B%3D2%29%7Blet%20_%3Dg%5Bh%5D%2Cm%3Dg%5Bh%2B1%5D%3B%22string%22%3D%3Dtypeof%20_%3Ff.set%28n%28_%2Cm%29%2Cu%29%3Af.set%28o%28_%2Cm%29%2Cu%29%2Cu%2B%3Dm%7Dlet%20d%3D0%3Bfor%28let%20k%3D0%3Bk%3C512%3Bk%2B%2B%29d%2B%3Df%5Bk%5D%3Bf.set%28o%28d%2C8%29%2C148%29%2Cl.push%28...f%29%2Cl.push%28...t%29%3Blet%20x%3D%28512-r%25512%29%25512%3Bfor%28let%20b%3D0%3Bb%3Cx%3Bb%2B%2B%29l.push%280%29%7D%29%3Blet%20r%3Dnew%20Uint8Array%28512%29%3Breturn%20l.push%28...r%2C...r%29%2Cnew%20Uint8Array%28l%29%7D%28l%29%2Cr%3Dnew%20Blob%28%5Bo%5D%2C%7Btype%3A%22application%2Fx-tar%22%7D%29%2Ci%3D%28document.title%7C%7C%22llm_export%22%29.replace%28%2F%5B%5Ea-z0-9_-%5D%2Fgi%2C%22_%22%29.replace%28%2F_%2B%2Fg%2C%22_%22%29%3Bi.length%3E50%26%26%28i%3Di.substring%280%2C50%29%29%2Ci%3Di%7C%7C%22llm_code_export%22%2Ci%2B%3D%22.tar%22%2Cfunction%20e%28t%2Cl%29%7Blet%20n%3DURL.createObjectURL%28t%29%2Co%3Ddocument.createElement%28%22a%22%29%3Bo.href%3Dn%2Co.download%3Dl%2Co.style.display%3D%22none%22%2Cdocument.body.appendChild%28o%29%2Co.click%28%29%2Cdocument.body.removeChild%28o%29%2CURL.revokeObjectURL%28n%29%7D%28r%2Ci%29%2Cconsole.log%28%60Bookmarklet%3A%20Successfully%20packaged%20%24%7Bl.length%7D%20file%28s%29%20into%20%22%24%7Bi%7D%22.%60%29%7Dcatch%28%24%29%7Bconsole.error%28%22Bookmarklet%20Error%3A%22%2C%24%29%7Delse%20console.log%28%22Bookmarklet%3A%20No%20non-empty%20code%20blocks%20were%20found%20to%20package.%22%29%7D%28%29%3B">Export LLM Code</a>

**Usage:**

1.  Navigate to the page containing the LLM response with code blocks you want to save.
2.  Click the `Export LLM Code` bookmarklet you created.
3.  A `.tar` file (e.g., `llm_response_export.tar`) containing the extracted code files will be downloaded automatically!


**Method 2: Copy & Paste**

1.  **Bookmark Any Page:** Create a new bookmark in your browser (Ctrl+D or Cmd+D). Name it something memorable like `Export LLM Code`.
2.  **Edit the Bookmark:** Right-click the new bookmark and choose "Edit" or "Properties".
3.  **Replace URL:** Delete the current content in the "URL" or "Location" field.
4.  **Paste the Code:** Copy the link location from above and paste it into the "URL" / "Location" field.
5.  **Save:** Save the changes to the bookmark.


**Method 3: Manual Execute**
1.  **Paste the Code:** Copy the **minified** code below and paste it into the bowsers console (F12 -> Console).:

    ```javascript
    !function(){if("/gloryknight/IA_file_extractor"===document.location.pathname)return;let e=/[`\*]?([\w\/.-]+\.\w+)[`\*]?$/i;console.log("Bookmarklet: Starting code extraction...");let t=document.querySelectorAll("pre > code"),l=[],n=1;if(0===t.length){console.log('Bookmarklet: No code blocks found using selector "pre > code".');return}if(t.forEach(t=>{let o=t.closest("pre");if(!o)return;let r=t.textContent;if(!r||""===r.trim()){console.log("Bookmarklet: Skipping empty code block.");return}let i="",$=o.previousElementSibling,s=0;for(;$&&s<3;){let a=$.textContent?.trim();if(a){let c=a.match(e);if(c&&c[1]&&c[1].length<150&&!c[1].includes(" ")&&c[1].includes(".")){i=c[1],console.log(`Bookmarklet: Found potential filename "${i}" in preceding element.`);break}}$=$.previousElementSibling,s++}if(!i){let p=".txt",f=Array.from(t.classList).find(e=>e.startsWith("language-"));if(f){let u=f.substring(9),g={python:".py",javascript:".js",html:".html",css:".css",bash:".sh",shell:".sh",java:".java",csharp:".cs",cpp:".cpp",c:".c",typescript:".ts",json:".json",yaml:".yaml",markdown:".md",sql:".sql",xml:".xml",dockerfile:".dockerfile",plaintext:".txt"};g[u]?p=g[u]:u&&(p="."+u)}i=`file_${n}${p}`,console.log(`Bookmarklet: Could not find filename, using default: "${i}"`)}i=i.replace(/^\/+/,"").replace(/\.\.\//g,""),l.push({name:i,content:r}),n++}),l.length>0)try{let o=function e(t){let l=[];function n(e,t){let l=[],n=0;for(let o=0;o<e.length&&n<t;o++){let r=e.charCodeAt(o);r<128?(l.push(r),n++):console.warn("Non-ASCII character skipped in TAR header string:",e[o])}for(;l.length<t;)l.push(0);return l}function o(e,t){let l=e.toString(8),o="0".repeat(t-1-l.length)+l+"\0";return n(o,t)}t.forEach(e=>{let t=function e(t){let l=[];for(let n=0;n<t.length;n++){let o=t.charCodeAt(n);o<128?l.push(o):o<2048?l.push(192|o>>6,128|63&o):o<65536?l.push(224|o>>12,128|o>>6&63,128|63&o):l.push(240|o>>18,128|o>>12&63,128|o>>6&63,128|63&o)}return l}(e.content),r=t.length,i=e.name,$="";if(i.length>100){let s=-1;for(let a=Math.min(i.length,155)-1;a>=0;a--)if("/"===i[a]){let c=i.substring(0,a),p=i.substring(a+1);if(c.length<=155&&p.length<=100){s=a;break}}-1!==s?($=i.substring(0,s),i=i.substring(s+1)):(console.warn(`Filename "${e.name}" too long and could not be split cleanly for TAR. Truncating.`),$=i.substring(0,155),i=i.substring(155,255))}let f=new Uint8Array(512),u=0,g=[i,100,420,8,0,8,0,8,r,12,Math.floor(Date.now()/1e3),12,"        ",8,"0",1,"",100,"ustar\0",6,"00",2,"user",32,"group",32,0,8,0,8,$,155];for(let h=0;h<g.length;h+=2){let _=g[h],m=g[h+1];"string"==typeof _?f.set(n(_,m),u):f.set(o(_,m),u),u+=m}let d=0;for(let k=0;k<512;k++)d+=f[k];f.set(o(d,8),148),l.push(...f),l.push(...t);let x=(512-r%512)%512;for(let b=0;b<x;b++)l.push(0)});let r=new Uint8Array(512);return l.push(...r,...r),new Uint8Array(l)}(l),r=new Blob([o],{type:"application/x-tar"}),i=(document.title||"llm_export").replace(/[^a-z0-9_-]/gi,"_").replace(/_+/g,"_");i.length>50&&(i=i.substring(0,50)),i=i||"llm_code_export",i+=".tar",function e(t,l){let n=URL.createObjectURL(t),o=document.createElement("a");o.href=n,o.download=l,o.style.display="none",document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(n)}(r,i),console.log(`Bookmarklet: Successfully packaged ${l.length} file(s) into "${i}".`)}catch($){console.error("Bookmarklet Error:",$)}else console.log("Bookmarklet: No non-empty code blocks were found to package.")}();
    ```

2.  **Execute the Code:** Press enter after pasting.


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
* [Submit a Pull Request](https://github.com/gloryknight/IA_file_extractor/pulls)

⭐️ **If you find this useful, please consider starring the repository!** ⭐️

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
