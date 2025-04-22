document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const level = urlParams.get('level');
    
    if (window.location.pathname.includes('chapters.html')) {
        if (!level) {
            window.location.href = 'index.html';
            return;
        }
        if (level === "beginner") {
            loadChapter("01-basics");
        } else if (level === "advanced") {
            loadChapter("101-migration");
        }
    }
});

async function loadChapter(chapterName) {
    try {
        const container = document.querySelector('.chapter-container');
        const chapterList = document.querySelector('.chapter-list');
        
        const response = await fetch(`chapters/${chapterName}.html`);
        
        if (!response.ok) {
            throw new Error(`Failed to load chapter: ${response.status}`);
        }
        
        const html = await response.text();
        
        const metaResponse = await fetch(`chapters/metadata.json`);
        if (!metaResponse.ok) {
            throw new Error(`Failed to load chapter metadata: ${metaResponse.status}`);
        }
        
        const metadata = await metaResponse.json();

        chapterList.innerHTML = "";
        metadata.chapters.forEach(chapter => {
            const chapterItem = document.createElement('a');
            chapterItem.onclick = loadChapter.bind(null, chapter.id);
            if (chapter.level === 'beginner') {
                chapterItem.innerHTML += `<div class="chapter-level beginner">Začátečník</div>`;
            } else if (chapter.level === 'advanced') {
                chapterItem.innerHTML += `<div class="chapter-level advanced">Pokročilý</div>`;
            }
            chapterItem.innerHTML += `${chapter.title}`;
            chapterList.appendChild(chapterItem);
        })

        const chapterMeta = metadata.chapters.find(c => c.id === chapterName);
        
        if (!chapterMeta) {
            throw new Error(`Chapter metadata not found for: ${chapterName}`);
        }
        
        document.title = `Jak začít s TypeScriptem? | ${chapterMeta.title}`;
        
        let fullHTML = `
            <section class="chapter-header">
                <h1>${chapterMeta.title}</h1>
        `;

        if (chapterMeta.level === "beginner") {
            fullHTML += `
                <div class="chapter-level beginner">
                    Začátečník
                </div>
            `;
        } else {
            fullHTML += `
                <div class="chapter-level advanced">
                    Pokročilý
                </div>
            `;
        }

        fullHTML += `            
            </section>
            <section class="chapter-content">
                ${html}
            </section>
            <section class="chapter-navigation">
            `;
        
        if (chapterMeta.prev) {
            const prevChapter = metadata.chapters.find(c => c.id === chapterMeta.prev);
            if (prevChapter) {
                fullHTML += `<a onclick="loadChapter('${prevChapter.id}')" class="btn yellow"><i class="fa-solid fa-arrow-left"></i> ${prevChapter.title}</a>`;
            }
        }
        
        if (chapterMeta.next) {
            const nextChapter = metadata.chapters.find(c => c.id === chapterMeta.next);
            if (nextChapter) {
                fullHTML += `<a onclick="loadChapter('${nextChapter.id}')" class="btn blue">${nextChapter.title} <i class="fa-solid fa-arrow-right"></i></a>`;
            }
        }
        fullHTML += `</section>`;

        container.innerHTML = fullHTML;
        
    } catch (error) {
        console.error('Error loading chapter:', error);
        document.getElementById('chapter-container').innerHTML = `
            <section class="chapter-header">
                <h1>Kapitola nenalezena</h1>
            </section>
            <section class="chapter-content">
                <p>Omlouváme se, požadovaná kapitola nebyla nalezena.</p>
            </section>
            <section class="chapter-navigation">
                <a href="index.html" class="btn blue">Zpět na úvodní stránku</a>
            </section>
        `;
    }
} 