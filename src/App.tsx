import React, {useState} from 'react';
import axios from 'axios'
import './App.css';

interface Cat {
  name: string;
}

const App: React.FC = () => {
  const [cat, setCat] = useState<Cat | undefined>()

  const getCat = () => {

    
    axios.get<Cat>('http://localhost:7777/cats/Yogi')
      .then(res => setCat(res.data))
      .catch(e => console.error(e))
  }

  return (
    <div>
      <div>
      <button onClick={getCat}>
        Get the Cat!
      </button>
      </div>
      <div>
        {cat && <span>{cat.name}</span>}
      </div>
    </div>
  );
}

export default App;
