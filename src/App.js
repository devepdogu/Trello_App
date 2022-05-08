import { ChakraProvider } from '@chakra-ui/react'
import Main from './components/main';
import './styles/app.scss'
import { ListProvider } from './components/listContext';
function App() {
  return (
    <ChakraProvider>
      <ListProvider>
        <Main></Main>
      </ListProvider>
    </ChakraProvider>
  );
}

export default App;
