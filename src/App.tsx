import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
//exemplo de uso da propriedade children  <Button>clique aqui</Button>
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//Switch - faz com que não apareça duas rotas ao mesmo tempo quando o site é renderizado
import { AuthContextProvider} from './contexts/AuthContext'
import { AdminRoom } from './pages/AdminRoom';

function App() {
  
  //o parametro 'exact' faz com que o path criado seja exatamente como é declarado
  return (
    <BrowserRouter>
    <AuthContextProvider>
      <Switch>
        <Route path="/" exact component={ Home }/>
        <Route path="/rooms/new" component={ NewRoom }/>
        <Route path="/rooms/:id" component={ Room }/>
        <Route path="/admin/rooms/:id" component={ AdminRoom }/>
      </Switch>
    </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
