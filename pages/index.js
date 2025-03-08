import { useState } from 'react';
import styled from 'styled-components';

// Стилизованные компоненты
const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

const Logo = styled.img`
  display: block;
  margin: 0 auto 20px;
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
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
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
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  list-style-type: none;
`;

export default function Home() {
  const [decor, setDecor] = useState('');
  const [thickness, setThickness] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

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

  return (
    <Container>
      <Logo 
        src="https://mkf46.ru/upload/iblock/52d/zjkgt8smpy4x22za3ccb1z4sclwx49d9.png"
        alt="Логотип"
      />
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
                Декор: {result.decor}, Толщина: {result.thickness}мм, Ширина: {result.width}см, Длина: {result.length}см, 
                Бокс: {result.box_number}, Количество пачек: {result.pack_count}, Дата постановки: {result.placement_date}
              </ResultItem>
            ))}
          </ul>
        ) : (
          <p>Нет данных</p>
        )}
      </Results>
    </Container>
  );
}