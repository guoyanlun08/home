import React, { useState } from 'react';
import styles from './App.module.scss';

// ----- hooks -----
import { useBaseCounter } from './hooks/useBaseCounter';

// -----  组件 -----
import VirtualList from './components/VirtualLists';
import VirtualListsDynamic from './components/VirtualListsDynamic';

import ControlledComponent from './components/isControlledComponent/ControlledComponent';
import UnControlledComponent from './components/isControlledComponent/UnControlledComponent';
import ControlledAndUnControlled from './components/isControlledComponent/ControlledAndUnControlled';

function App() {
  const [controlledValue, setControlledValue] = useState('propsValue');

  const { dd, hh, mm, ss } = useBaseCounter({ time: 5 });

  return (
    <div className={styles.App}>
      {/* 虚拟列表 */}
      {/* <VirtualList/> */}
      {/* <VirtualListsDynamic /> */}

      {/* 受控组件 */}
      {/* <ControlledComponent /> */}

      {/* 非受控组件 */}
      {/* <UnControlledComponent /> */}

      {/* 受控和非受控组件 */}
      {/* <ControlledAndUnControlled defaultValue="default" /> */}
      {/* <ControlledAndUnControlled value={controlledValue} onChange={() => setControlledValue('changePropsValue')} /> */}

      {/* 定时器 hook 验证 */}
      <div>{`${dd}-${hh}-${mm}-${ss}`}</div>
    </div>
  );
}

export default App;
