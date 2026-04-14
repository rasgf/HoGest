tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f4f6f8',
                    100: '#e4ebf0',
                    200: '#c5d5df',
                    300: '#9cb5c5',
                    400: '#6c90a6',
                    500: '#4f768e',
                    600: '#3e5e74', // Ocean slate blue for primary actions
                    700: '#334b5e',
                    800: '#2d404f',
                    900: '#212E3C', // Deep sea text
                    950: '#1a242d',
                },
                accent: {
                    50: '#fbfaf8',
                    100: '#f5f2ee',
                    200: '#ebe3db',
                    300: '#ddcec0',
                    400: '#cbb39e',
                    500: '#bca085', // Sand/Gold touch
                    600: '#af8c70',
                    700: '#92705a',
                    800: '#775e4e',
                    900: '#604c41',
                },
                slate: { 900: '#0f172a', 800: '#1e293b' }
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.04)',
                'glass-hover': '0 12px 40px 0 rgba(0, 0, 0, 0.06)',
                'soft': '0 2px 20px rgba(0, 0, 0, 0.03)',
            }
        }
    }
};
