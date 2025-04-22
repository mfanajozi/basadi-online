import { useState, useEffect, createContext, useContext } from 'react';

interface Theme {
  background: string;
  foreground: string;
}

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const lightTheme: Theme = {
  background: 'white',
  foreground: 'black',
};

const darkTheme: Theme = {
  background: 'black',
  foreground: 'white',
};

const ThemeContext = createContext<ThemeContextProps>({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme') === 'dark' ? darkTheme : lightTheme;
    return storedTheme;
  });

  useEffect(() => {
    localStorage.setItem('theme', theme === darkTheme ? 'dark' : 'light');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
