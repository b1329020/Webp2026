import logo from './logo.svg';
import './App.css';

// 1. 把這個函式放在 App 函式的外面（上面）
const changeText = (event) => {
  console.log(event.target);
  event.target.innerText = event.target.innerText + "被點了";
};

function App() {
  return (
    <div className="App">
      {/* 2. 把 h1 標籤加在 return 的 div 裡面 */}
      <h1 onClick={changeText} style={{ marginTop: '50px', cursor: 'pointer' }}>
        hello CGU!!
      </h1>
    </div>
  );
}

export default App;