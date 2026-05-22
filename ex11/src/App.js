import React from 'react';
// 1. 引入 Material-UI 的組件與圖示（對齊簡報 Page 48）
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmIcon from '@material-ui/icons/Alarm';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

// 2. 定義 MultiButton 函式
const MultiButton = (num) => {
  var output = [];
  
  // 購物車按鈕
  output.push(
    <IconButton key="cart" color="primary" aria-label="add to shopping cart">
      <AddShoppingCartIcon />
    </IconButton>
  );
  
  // 垃圾桶按鈕
  output.push(
    <IconButton key="delete" color="primary" aria-label="delete">
      <DeleteIcon />
    </IconButton>
  );
  
  // 鬧鐘按鈕
  output.push(
    <IconButton key="alarm" color="primary" aria-label="add an alarm">
      <AlarmIcon />
    </IconButton>
  );
  
  return output;
};

// 3. 主組件：呈現 Page 49 的畫面
function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {/* 標題文字 */}
      <h1 style={{ color: 'red', fontSize: '3rem', fontWeight: 'bold' }}>
        hello CGU!!
      </h1>
      
      {/* 按鈕呈現區域 */}
      <div style={{ marginTop: '20px' }}>
        {MultiButton()}
      </div>
    </div>
  );
}

export default App;