/**
 * Portal do Morador - Residencial Reserva dos Pássaros
 * Lógica de Interface, Navegação de Abas, Modais, Busca, Ações Rápidas e PWA
 */

// ==========================================================================
// 1. Alternância de Abas (Navegação Inferior)
// ==========================================================================

function switchTab(tabName, clickedElement) {
    // Fecha a caixa de resultados se houver busca ativa
    const searchInput = document.getElementById('global-search');
    if (searchInput && searchInput.value.trim() !== '') {
        clearSearch();
    }

    // Gerencia visibilidade das abas
    const tabs = ['home', 'avisos', 'servicos', 'faq'];
    tabs.forEach(name => {
        const el = document.getElementById(`tab-${name}`);
        if (el) el.classList.remove('active');
    });

    const targetTab = document.getElementById(`tab-${tabName}`);
    if (targetTab) {
        targetTab.classList.add('active');
    }

    // Atualiza estado visual dos botões da barra inferior
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    if (clickedElement) {
        clickedElement.classList.add('active');
    } else {
        const buttons = document.querySelectorAll('.nav-item');
        const index = tabs.indexOf(tabName);
        if (index >= 0 && buttons[index]) {
            buttons[index].classList.add('active');
        }
    }

    // Rola o painel principal para o topo de forma suave
    const scrollView = document.getElementById('main-scroll-view');
    if (scrollView) {
        scrollView.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ==========================================================================
// 2. Acordeão de Dúvidas Frequentes (FAQ)
// ==========================================================================

function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    if (!item) return;
    const content = item.querySelector('.faq-content');
    const icon = btn.querySelector('.fa-chevron-down');
    const isHidden = content.classList.contains('hidden');

    // Fecha outros itens para manter o visual limpo
    document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) {
            const c = other.querySelector('.faq-content');
            const ic = other.querySelector('.fa-chevron-down');
            if (c) c.classList.add('hidden');
            if (ic) ic.classList.remove('rotate-180');
        }
    });

    // Alterna o estado do item clicado
    if (isHidden) {
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
    } else {
        content.classList.add('hidden');
        if (icon) icon.classList.remove('rotate-180');
    }
}

// Abre diretamente um FAQ específico e aplica animação de destaque
function openFaqItem(id) {
    switchTab('faq');
    setTimeout(() => {
        const item = document.getElementById(id);
        if (item) {
            const btn = item.querySelector('button');
            const content = item.querySelector('.faq-content');
            if (content && content.classList.contains('hidden') && btn) {
                toggleFaq(btn);
            }
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            item.classList.add('highlight-pulse');
            setTimeout(() => item.classList.remove('highlight-pulse'), 1600);
        }
    }, 120);
}

// Rola para um elemento específico dentro de uma aba
function jumpToElement(tabName, elementId) {
    switchTab(tabName);
    setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('highlight-pulse');
            setTimeout(() => el.classList.remove('highlight-pulse'), 1600);
        }
    }, 120);
}

// ==========================================================================
// 3. Filtros do Quadro de Avisos
// ==========================================================================

function filterAvisos(category, btn) {
    document.querySelectorAll('.notice-filter-btn').forEach(b => {
        b.classList.remove('active', 'bg-brand-blue', 'text-white');
        b.classList.add('bg-white', 'text-slate-600', 'border', 'border-slate-200');
    });
    btn.classList.add('active', 'bg-brand-blue', 'text-white');
    btn.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-200');

    const cards = document.querySelectorAll('.notice-card');
    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ==========================================================================
// 4. Controle de Janelas Modais
// ==========================================================================

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('modal-hidden');
        modal.classList.add('modal-visible');
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('modal-visible');
        modal.classList.add('modal-hidden');
    }
}

// Modais de Ações Rápidas
function openPortariaModal() { openModal('modal-portaria'); }
function openSindicoModal() { openModal('modal-sindico'); }
function openPixModal() { openModal('modal-pix'); }
function openEmergenciaModal() { openModal('modal-emergencia'); }
function openShareModal() { openModal('modal-share'); }
function openPwaModal() { openModal('modal-pwa'); }

// Modais Informativos Dinâmicos
function openNoticeModal(title, text) {
    document.getElementById('modal-info-title').textContent = title;
    document.getElementById('modal-info-body').innerHTML = `<p>${text}</p>`;
    openModal('modal-info');
}

function openDocInfo(name, desc) {
    document.getElementById('modal-info-title').textContent = name;
    document.getElementById('modal-info-body').innerHTML = `
        <p class="font-medium text-slate-700">${desc}</p>
        <div class="p-3 bg-slate-100 rounded-xl text-center text-slate-500 mt-2">
            <i class="fa-solid fa-file-pdf text-red-500 text-xl block mb-1"></i>
            Arquivo disponível para leitura nos murais físicos e grupo oficial.
        </div>
    `;
    openModal('modal-info');
}

function openAmenityModal(title, hours, rules) {
    document.getElementById('modal-amenity-title').textContent = title;
    document.getElementById('modal-amenity-hours').textContent = hours;
    document.getElementById('modal-amenity-rules').textContent = rules;
    openModal('modal-amenity');
}

// ==========================================================================
// 5. Integrações Externas (WhatsApp & Compartilhamento)
// ==========================================================================

function contactProvider(name, phone) {
    const msg = encodeURIComponent(`Olá! Sou morador do Reserva dos Pássaros e quero consultar a disponibilidade e valores para instalação de fibra ótica na minha residência.`);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
}

function shareDirectWhatsApp() {
    const currentUrl = window.location.href.startsWith('http') ? window.location.href : 'Portal do Residencial Reserva dos Pássaros';
    const text = encodeURIComponent("Vizinhos, confiram o Portal Oficial do nosso condomínio Reserva dos Pássaros! Regras de mudança, contato da portaria, internet fibra e avisos importantes: " + currentUrl);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}

// ==========================================================================
// 6. Cópia para Área de Transferência & Toast de Feedback
// ==========================================================================

function copyToClipboard(text, successMsg) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                showToast(successMsg || "Copiado com sucesso!");
            }).catch(() => {
                fallbackCopy(text, successMsg);
            });
        } else {
            fallbackCopy(text, successMsg);
        }
    } catch (err) {
        fallbackCopy(text, successMsg);
    }
}

function fallbackCopy(text, successMsg) {
    try {
        const tempInput = document.createElement("textarea");
        tempInput.value = text;
        tempInput.style.position = "fixed";
        tempInput.style.left = "-9999px";
        document.body.appendChild(tempInput);
        tempInput.select();
        tempInput.setSelectionRange(0, 99999);
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        showToast(successMsg || "Copiado com sucesso!");
    } catch (err) {
        showToast("Erro ao copiar.");
    }
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;
    toastMsg.textContent = msg;
    toast.classList.remove('opacity-0');
    toast.classList.add('opacity-100');
    setTimeout(() => {
        toast.classList.remove('opacity-100');
        toast.classList.add('opacity-0');
    }, 2500);
}

// ==========================================================================
// 7. Mecanismo de Busca Instantânea
// ==========================================================================

const searchableItems = [
    { title: "Paredes de Concreto / Furos", tab: "faq", targetId: "faq-accordion-1", isFaq: true, desc: "Regras sobre brocas permitidas e proibição de quebrar paredes estruturais.", match: ["furar", "parede", "concreto", "broca", "quebrar", "obra"] },
    { title: "Horários de Mudança", tab: "home", targetId: "step-mudanca", desc: "Segunda a Sexta (08h às 17h) e Sábado (08h às 12h).", match: ["mudança", "caminhão", "horario", "mudanca", "entregar"] },
    { title: "Internet Fibra Homologada", tab: "servicos", targetId: "section-internet", desc: "Maxx Fibra e Alagoas Web com cabeamento liberado.", match: ["internet", "fibra", "provedor", "wifi", "conexao", "rede"] },
    { title: "Ligar Energia (Equatorial)", tab: "home", targetId: "step-luz", desc: "Passo a passo com RG, CPF e medidor da nova residência.", match: ["luz", "energia", "equatorial", "eletrica", "poste", "ligacao"] },
    { title: "Regras de Animais / Pets", tab: "faq", targetId: "faq-accordion-2", isFaq: true, desc: "Uso obrigatório de coleira na rua e recolhimento de dejetos.", match: ["pet", "cachorro", "gato", "animais", "coleira", "fezes"] },
    { title: "Piscinas e Lazer", tab: "servicos", targetId: "section-lazer", desc: "Horário de funcionamento das piscinas, churrasqueira e regras.", match: ["piscina", "churrasco", "festa", "salao", "lazer", "quadra"] },
    { title: "Coleta de Lixo Doméstico", tab: "faq", targetId: "faq-accordion-5", isFaq: true, desc: "Descarte nas lixeiras comunitárias centrais após as 18h.", match: ["lixo", "coleta", "sacola", "entulho", "descarte"] },
    { title: "Chave PIX e Taxa de Condomínio", tab: "home", modalId: "modal-pix", desc: "CNPJ para pagamento e informações sobre segunda via.", match: ["pix", "taxa", "boleto", "pagamento", "condominio", "segunda via"] },
    { title: "Regimento Interno e Documentos", tab: "servicos", targetId: "section-documentos", desc: "Regulamento aprovado, convenção e manual do proprietário.", match: ["regimento", "regra", "convencao", "manual", "telesil", "documento"] }
];

function handleSearch(term) {
    const clean = term.toLowerCase().trim();
    const resultsBox = document.getElementById('search-results-box');
    const container = document.getElementById('search-items-container');
    const clearBtn = document.getElementById('clear-search-btn');
    const countLabel = document.getElementById('search-count');

    if (!clean) {
        resultsBox.classList.add('hidden');
        clearBtn.classList.add('hidden');
        return;
    }

    clearBtn.classList.remove('hidden');

    const matches = searchableItems.filter(item => {
        const inTitle = item.title.toLowerCase().includes(clean);
        const inDesc = item.desc.toLowerCase().includes(clean);
        const inTags = item.match.some(m => m.includes(clean));
        return inTitle || inDesc || inTags;
    });

    container.innerHTML = '';
    countLabel.textContent = `${matches.length} encontrado(s)`;

    if (matches.length === 0) {
        container.innerHTML = `
            <p class="text-slate-400 text-center py-2 text-[11px]">
                Nenhum resultado direto. Tente buscar "luz", "piscina" ou "mudança".
            </p>
        `;
    } else {
        matches.forEach(m => {
            const div = document.createElement('div');
            div.className = 'py-2 flex items-center justify-between cursor-pointer hover:bg-slate-50 px-1 rounded-lg transition';
            div.innerHTML = `
                <div class="pr-2">
                    <span class="font-bold text-brand-blue block text-xs">${m.title}</span>
                    <span class="text-[10px] text-slate-500">${m.desc}</span>
                </div>
                <span class="text-[10px] bg-brand-orange/10 text-brand-orange font-bold px-2 py-1 rounded-md flex-shrink-0">
                    Abrir
                </span>
            `;
            div.onclick = () => {
                clearSearch();
                if (m.modalId) {
                    openModal(m.modalId);
                } else if (m.isFaq && m.targetId) {
                    openFaqItem(m.targetId);
                } else if (m.targetId) {
                    jumpToElement(m.tab, m.targetId);
                } else {
                    switchTab(m.tab);
                }
            };
            container.appendChild(div);
        });
    }

    resultsBox.classList.remove('hidden');
}

function clearSearch() {
    const searchInput = document.getElementById('global-search');
    if (searchInput) searchInput.value = '';
    const resultsBox = document.getElementById('search-results-box');
    if (resultsBox) resultsBox.classList.add('hidden');
    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) clearBtn.classList.add('hidden');
}

// ==========================================================================
// 8. Recursos PWA (Instalação como Aplicativo & Service Worker)
// ==========================================================================

let deferredPrompt = null;

// Registro do Service Worker (Offline & PWA)
if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((reg) => console.log('Service Worker registrado:', reg.scope))
            .catch((err) => console.log('Service Worker falhou:', err));
    });
}

// Captura do evento de instalação no Android, Chrome e Edge
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const banner = document.getElementById('pwa-install-banner');
    if (banner && !sessionStorage.getItem('pwa_banner_dismissed')) {
        banner.classList.remove('hidden');
    }
});

// Ação do botão "Instalar Aplicativo"
async function triggerPwaInstall() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            showToast('Instalando aplicativo na tela inicial...');
            dismissInstallBanner();
        }
        deferredPrompt = null;
    } else {
        // No iOS Safari ou navegadores sem prompt automático, orienta o usuário pelo modal
        openPwaModal();
    }
}

function dismissInstallBanner() {
    const banner = document.getElementById('pwa-install-banner');
    if (banner) banner.classList.add('hidden');
    sessionStorage.setItem('pwa_banner_dismissed', 'true');
}

// Detecta quando o aplicativo foi instalado com sucesso
window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    dismissInstallBanner();
    showToast('Aplicativo instalado na tela inicial com sucesso!');
});

// ==========================================================================
// 9. Inicialização Geral de Eventos
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Fecha modal clicando na área de fundo escurecida
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay.id);
            }
        });
    });
});
