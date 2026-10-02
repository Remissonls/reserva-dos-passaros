# 🕊️ Portal do Morador - Residencial Reserva dos Pássaros

Portal informativo oficial e Progressive Web App (PWA) voltado para os condôminos e moradores do Residencial Reserva dos Pássaros.

---

## 📱 Funcionalidades

- **📱 Suporte Completo a PWA (Progressive Web App):** Permite instalação direta na tela inicial de smartphones (Android/iOS) e na Área de Trabalho de computadores (Windows/Mac).
- **⚡ Carregamento Instantâneo & Offline:** Service Worker integrado com cache inteligente (`sw.js`).
- **🔍 Busca Instantânea Inteligente:** Localização rápida de regras, horários de mudança, provedores de internet, furos em paredes e taxas.
- **🚨 Ações Rápidas & Emergência:** Chamadas diretas para portaria, SAMU, Polícia, Bombeiros e Equatorial com cópia de número em um toque.
- **💳 Taxa Condominial & PIX:** Chave CNPJ com cópia de 1 clique e orientação de envio de comprovantes.
- **📄 Regras & Documentos:** Visualização e instruções sobre o Regimento Interno, Convenção de Condomínio e Manual do Proprietário Telesil.
- **❓ FAQ Interativo:** Perguntas frequentes com sanfona/acordeão sobre paredes de concreto estrutural, pets, silêncio e coleta de lixo.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** semântico e responsivo com formato Mobile App Container
- **Tailwind CSS** (via CDN) com paleta de cores institucional personalizada
- **JavaScript Moderno (ES6+)** modularizado e otimizado
- **FontAwesome 6** para ícones
- **Google Fonts** (*Poppins*)

---

## 📂 Estrutura do Projeto

```text
├── index.html               # Estrutura principal da aplicação
├── manifest.json            # Manifesto de configuração do PWA
├── sw.js                    # Service Worker para suporte offline e cache
├── css/
│   └── styles.css           # Estilos customizados, animações e safe-areas
├── js/
│   ├── tailwind-config.js   # Extensão de temas e paleta de cores
│   └── app.js               # Lógica de abas, modais, busca, clipboard e PWA
└── icons/
    ├── icon.svg             # Ícone vetorial da marca
    ├── icon-192.png         # Ícone PWA para telas médias / Android
    └── icon-512.png         # Ícone PWA para telas de alta resolução / Splash
```

---

## 🚀 Como Executar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/Remissonls/reserva-dos-passaros.git
   ```
2. Abra a pasta do projeto e dê um duplo clique no arquivo `index.html` ou execute com um servidor local (Live Server no VS Code ou `npx serve`).

---

Desenvolvido para os moradores do **Residencial Reserva dos Pássaros**.
