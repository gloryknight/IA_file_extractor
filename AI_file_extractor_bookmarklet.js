(function() {
    /* --- Configuration --- */
    const FILENAME_REGEX = /[`\*]?([\w\/.-]+\.\w+)[`\*]?$/i; // Look for filename.ext at the end of text, possibly wrapped in backticks/asterisks
    const MAX_PREV_SIBLING_SEARCH = 3; // How many previous siblings to check for a filename
    const DEFAULT_EXTENSION = '.txt'; // Default extension if none found in filename guess

    /* --- Minimal TAR Generation --- */
    function createTar(files) {
        const BLOCK_SIZE = 512;
        const USTAR_MAGIC = "ustar\0";
        const USTAR_VERSION = "00";
        let tarData = []; // Array of byte values (Uint8Array might be better but array works)

        function writeString(str, len) {
            const bytes = [];
            let strBytes = 0;
            for (let i = 0; i < str.length && strBytes < len; i++) {
                 // Basic UTF-8 encoding support for filename/path
                const charCode = str.charCodeAt(i);
                 if (charCode < 128) {
                    bytes.push(charCode);
                    strBytes++;
                 } else {
                    // Skip multi-byte chars for header strings to keep it simple ASCII/null padded
                    console.warn("Non-ASCII character skipped in TAR header string:", str[i]);
                 }
            }
             // Fill remaining space with nulls
            while (bytes.length < len) {
                bytes.push(0);
            }
            return bytes;
        }

        function writeOctal(num, len) {
            const octalStr = num.toString(8);
            const padded = '0'.repeat(len - 1 - octalStr.length) + octalStr + '\0';
            return writeString(padded, len); // Use writeString to get byte array
        }

        function stringToUTF8Bytes(str) {
             const bytes = [];
             for (let i = 0; i < str.length; i++) {
                 const charCode = str.charCodeAt(i);
                 if (charCode < 0x80) {
                     bytes.push(charCode);
                 } else if (charCode < 0x800) {
                     bytes.push(0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f));
                 } else if (charCode < 0x10000) {
                     bytes.push(0xe0 | (charCode >> 12), 0x80 | ((charCode >> 6) & 0x3f), 0x80 | (charCode & 0x3f));
                 } else {
                     bytes.push(0xf0 | (charCode >> 18), 0x80 | ((charCode >> 12) & 0x3f), 0x80 | ((charCode >> 6) & 0x3f), 0x80 | (charCode & 0x3f));
                 }
             }
             return bytes;
        }


        files.forEach(file => {
            const contentBytes = stringToUTF8Bytes(file.content);
            const fileSize = contentBytes.length;

            // Prepare header fields
            let name = file.name;
            let prefix = '';
            if (name.length > 100) {
                 // Attempt to split name/prefix according to USTAR
                 let splitPoint = -1;
                 // Find the last '/' within the potential prefix length (155)
                 for(let i = Math.min(name.length, 155) -1 ; i >= 0; i--) {
                    if (name[i] === '/') {
                        const potentialPrefix = name.substring(0, i);
                        const potentialName = name.substring(i + 1);
                        if (potentialPrefix.length <= 155 && potentialName.length <= 100) {
                            splitPoint = i;
                            break;
                        }
                    }
                 }

                if (splitPoint !== -1) {
                    prefix = name.substring(0, splitPoint);
                    name = name.substring(splitPoint + 1);
                } else {
                    // Cannot split nicely, truncate (might lead to issues)
                    console.warn(`Filename "${file.name}" too long and could not be split cleanly for TAR. Truncating.`);
                    prefix = name.substring(0, 155);
                    name = name.substring(155, 155 + 100);
                 }
             }

             const header = new Uint8Array(BLOCK_SIZE); // Use Uint8Array for header manipulation
            let offset = 0;

            // Name (100)
            header.set(writeString(name, 100), offset); offset += 100;
            // Mode (8) - 0644 octal
            header.set(writeOctal(parseInt('644', 8), 8), offset); offset += 8;
            // UID (8) - 0
            header.set(writeOctal(0, 8), offset); offset += 8;
            // GID (8) - 0
            header.set(writeOctal(0, 8), offset); offset += 8;
            // Size (12)
            header.set(writeOctal(fileSize, 12), offset); offset += 12;
            // Mtime (12) - current time in seconds since epoch
            header.set(writeOctal(Math.floor(Date.now() / 1000), 12), offset); offset += 12;
            // Checksum (8) - Placeholder (8 spaces)
            header.set(writeString('        ', 8), offset); offset += 8; // Placeholder: ASCII 32
            // Typeflag (1) - '0' for regular file
            header.set(writeString('0', 1), offset); offset += 1;
            // Linkname (100) - empty
            header.set(writeString('', 100), offset); offset += 100;
            // Magic (6) - "ustar\0"
            header.set(writeString(USTAR_MAGIC, 6), offset); offset += 6;
            // Version (2) - "00"
            header.set(writeString(USTAR_VERSION, 2), offset); offset += 2;
            // Uname (32) - "user"
            header.set(writeString('user', 32), offset); offset += 32;
            // Gname (32) - "group"
            header.set(writeString('group', 32), offset); offset += 32;
            // Devmajor (8) - 0
            header.set(writeOctal(0, 8), offset); offset += 8;
            // Devminor (8) - 0
            header.set(writeOctal(0, 8), offset); offset += 8;
            // Prefix (155)
            header.set(writeString(prefix, 155), offset); offset += 155;
             // Remaining space is padding (already 0 from Uint8Array)

            // Calculate checksum
            let checksum = 0;
            for (let i = 0; i < BLOCK_SIZE; i++) {
                checksum += header[i];
            }

            // Write calculated checksum back into header (octal string, null term, space padded)
             header.set(writeOctal(checksum, 8), 148); // Checksum field offset is 148

            // Add header block to tar data
            tarData.push(...header); // Spread the Uint8Array bytes into the array

            // Add file content bytes
            tarData.push(...contentBytes);

            // Pad file content to BLOCK_SIZE multiple
            const paddingSize = (BLOCK_SIZE - (fileSize % BLOCK_SIZE)) % BLOCK_SIZE;
            for (let i = 0; i < paddingSize; i++) {
                tarData.push(0);
            }
        });

        // Add two null blocks at the end of the archive
        const nullBlock = new Uint8Array(BLOCK_SIZE); // Automatically filled with zeros
        tarData.push(...nullBlock, ...nullBlock);

        return new Uint8Array(tarData); // Return as a single Uint8Array
    }

    /* --- Download Helper --- */
    function downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none'; // Hide the link
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Clean up memory
    }

    /* --- Main Logic --- */
    console.log('Bookmarklet: Starting code extraction...');
    const codeBlocks = document.querySelectorAll('pre > code');
    const files = [];
    let fileCounter = 1;

    if (codeBlocks.length === 0) {
        alert('Bookmarklet: No code blocks found using selector "pre > code".');
        return;
    }

    codeBlocks.forEach(codeElement => {
        const preElement = codeElement.closest('pre');
        if (!preElement) return; // Should have a parent pre

        const codeContent = codeElement.textContent;
        if (!codeContent || codeContent.trim() === '') {
             console.log('Bookmarklet: Skipping empty code block.');
            return; // Skip empty code blocks
        }

        // --- Filename Guessing ---
        let filename = '';
        let potentialNameElement = preElement.previousElementSibling;
        let searchDepth = 0;

        while (potentialNameElement && searchDepth < MAX_PREV_SIBLING_SEARCH) {
            const text = potentialNameElement.textContent?.trim();
            if (text) {
                const nameMatch = text.match(FILENAME_REGEX);
                 if (nameMatch && nameMatch[1]) {
                     // Basic sanity check: not excessively long, doesn't look like a sentence fragment
                     if (nameMatch[1].length < 150 && !nameMatch[1].includes(' ') && nameMatch[1].includes('.')) {
                        filename = nameMatch[1];
                        console.log(`Bookmarklet: Found potential filename "${filename}" in preceding element.`);
                        break; // Found a likely candidate
                     }
                 }
             }
            potentialNameElement = potentialNameElement.previousElementSibling;
            searchDepth++;
        }

        // --- Default Filename ---
        if (!filename) {
            // Try to get extension from code language class if available
            let ext = DEFAULT_EXTENSION;
            const langClass = Array.from(codeElement.classList).find(cls => cls.startsWith('language-'));
            if (langClass) {
                const lang = langClass.substring('language-'.length);
                 // Map common languages to extensions (add more as needed)
                 const extMap = { 'python': '.py', 'javascript': '.js', 'html': '.html', 'css': '.css', 'bash': '.sh', 'shell': '.sh', 'java': '.java', 'csharp': '.cs', 'cpp': '.cpp', 'c': '.c', 'typescript': '.ts', 'json': '.json', 'yaml': '.yaml', 'markdown': '.md', 'sql': '.sql', 'xml': '.xml', 'dockerfile': '.dockerfile', 'plaintext': '.txt' };
                 if (extMap[lang]) {
                    ext = extMap[lang];
                 } else if (lang) {
                     ext = '.' + lang; // Use the language name as extension if not mapped
                 }
            }
             filename = `file_${fileCounter}${ext}`;
            console.log(`Bookmarklet: Could not find filename, using default: "${filename}"`);
         }

        // Clean filename (remove leading slashes, etc.)
        filename = filename.replace(/^\/+/, '').replace(/\.\.\//g, ''); // Basic sanitization

        files.push({ name: filename, content: codeContent });
        fileCounter++;
    });

    /* --- Package and Download --- */
    if (files.length > 0) {
         try {
            const tarBytes = createTar(files);
            const blob = new Blob([tarBytes], { type: 'application/x-tar' });

            // Generate a reasonable download filename
            let downloadName = (document.title || 'llm_export').replace(/[^a-z0-9_-]/gi, '_').replace(/_+/g, '_');
             if (downloadName.length > 50) downloadName = downloadName.substring(0, 50); // Keep it reasonably short
            downloadName = downloadName || 'llm_code_export'; // Fallback if title resulted in empty string
             downloadName += '.tar';

            downloadBlob(blob, downloadName);
            alert(`Bookmarklet: Successfully packaged ${files.length} file(s) into "${downloadName}".`);
         } catch (error) {
             console.error("Bookmarklet Error:", error);
             alert(`Bookmarklet: An error occurred during TAR creation or download: ${error.message}`);
         }
    } else {
        alert('Bookmarklet: No non-empty code blocks were found to package.');
    }

})();