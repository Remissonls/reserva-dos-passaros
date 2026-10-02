/**
 * Configuração personalizada de cores e fontes para o Tailwind CSS CDN
 * Portal do Morador - Reserva dos Pássaros
 */
tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    orange: '#F26522',
                    orangeDark: '#D84F10',
                    blue: '#102B4E',
                    blueDark: '#0A1C33',
                    blueLight: '#1C4274',
                    surface: '#F8FAFC'
                }
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif']
            }
        }
    }
};
