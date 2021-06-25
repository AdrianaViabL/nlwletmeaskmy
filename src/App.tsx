import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
//exemplo de uso da propriedade children  <Button>clique aqui</Button>
import { BrowserRouter, Route } from 'react-router-dom';

import { AuthContextProvider} from './contexts/AuthContext'

function App() {
  
  //o parametro 'exact' faz com que o path criado seja exatamente como é declarado
  return (
    <BrowserRouter>
    <AuthContextProvider>
        <Route path="/" exact component={ Home }/>
        <Route path="/rooms/new" component={ NewRoom }/>
      
    </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
