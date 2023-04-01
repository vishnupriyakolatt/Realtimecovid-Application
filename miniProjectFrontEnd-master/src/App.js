import './App.css';
import { MainProvider } from './context/maincontext'
import SubApp from './SubApp'


function App() {
  return (
    <MainProvider>
      <SubApp />
    </MainProvider>);
}

export default App;
