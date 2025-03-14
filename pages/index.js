import { useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { FaMoon, FaSun } from 'react-icons/fa'; // Импортируем иконки

// Определяем темы
const darkTheme = {
  body: '#121212',
  text: '#FAFAFA',
  resultBackground: '#333',
  resultBorder: '#555',
  inputBackground: '#333',
  inputBorder: '#555',
  buttonBackground: '#2196F3',
  buttonHoverBackground: '#1976D2',
  shadowColor: 'rgba(255, 255, 255, 0.1)', // Светлая тень для темной темы
};

const lightTheme = {
  body: '#FFFFFF',
  text: '#000000',
  resultBackground: '#f9f9f9',
  resultBorder: '#ddd',
  inputBackground: '#fff',
  inputBorder: '#ccc',
  buttonBackground: '#007bff',
  buttonHoverBackground: '#0056b3',
  shadowColor: 'rgba(0, 0, 0, 0.1)', // Стандартная темная тень для светлой темы
};

// Глобальные стили
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    transition: background-color 0.3s ease;
  }
`;

// Стилизованные компоненты
const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  max-width: 100%;
  height: auto;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${(props) => props.theme.inputBorder};
  border-radius: 5px;
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.text};
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: ${(props) => props.theme.buttonBackground};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const Results = styled.div`
  margin-top: 20px;
`;

const ResultItem = styled.li`
  background-color: ${(props) => props.theme.resultBackground};
  padding: 15px;
  border: 1px solid ${(props) => props.theme.resultBorder};
  border-radius: 5px;
  margin-bottom: 10px;
  list-style-type: none;
  box-shadow: 0 2px 5px ${(props) => props.theme.shadowColor};
  color: ${(props) => props.theme.text};
`;

const DecorName = styled.span`
  font-weight: bold;
`;

const GreenNumber = styled.span`
  color: #64dd17;
  font-weight: bold;
`;

const ThemeToggleButton = styled.button`
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.text};
  font-size: 24px;

  &:hover {
    color: ${(props) => props.theme.buttonHoverBackground};
  }
`;

export default function Home() {
  const [decor, setDecor] = useState('');
  const [thickness, setThickness] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('light');

  const handleSearch = async () => {
    if (!decor || !thickness || !width || !length) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    try {
      const response = await fetch(`/api/search?decor=${decor}&thickness=${thickness}&width=${width}&length=${length}`);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setResults([]);
      } else {
        setResults(data);
        setError('');
      }
    } catch (err) {
      setError('Ошибка при выполнении запроса.');
      setResults([]);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Container>
        <Header>
          <Logo
            src="https://mkf46.ru/upload/iblock/52d/zjkgt8smpy4x22za3ccb1z4sclwx49d9.png"
            alt="Логотип"
          />
          <ThemeToggleButton onClick={toggleTheme}>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </ThemeToggleButton>
        </Header>
        <Form>
          <Input
            type="text"
            placeholder="Название декора"
            value={decor}
            onChange={(e) => setDecor(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Толщина (мм)"
            value={thickness}
            onChange={(e) => setThickness(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Ширина (см)"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Длина (см)"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <Button onClick={handleSearch}>Поиск</Button>
        </Form>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Results>
          <h2>Результаты:</h2>
          {results.length > 0 ? (
            <ul>
              {results.map((result, index) => (
                <ResultItem key={index}>
                  <DecorName>Декор: {result.decor}</DecorName>, Толщина: {result.thickness}мм, Ширина: {result.width}см, Длина: {result.length}см,
                  Бокс: <GreenNumber>{result.box_number}</GreenNumber>, Количество пачек: <GreenNumber>{result.pack_count}</GreenNumber>, Дата постановки: {result.placement_date}
                </ResultItem>
              ))}
            </ul>
          ) : (
            <p>Нет данных</p>
          )}
        </Results>
      </Container>
    </ThemeProvider>
  );
}