import Calendar from './components/Calendar';
import './index.css';
import { getDate } from './utils/getDate';

const App = (): JSX.Element => {
    return (
        <div className="App">
            <Calendar />
        </div>
    );
};

export default App;

