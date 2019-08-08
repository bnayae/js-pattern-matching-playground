import React from 'react';
import './App.css';
import Sample from './components/Sample';

const App: React.FC = () => {
  return (
    <>
      <Sample title="undefined" />
      <Sample title="true" data={true} />
      <Sample title="1" data={1} />
      <Sample title="xyz" data="xyz" />
      <Sample title="['a', 'b', 'c']" data={['a', 'b', 'c']} />
      <Sample title="{ a: 'x'}" data={{ a: 'x' }} />
      <Sample title="{ a: 'x', b: 1}" data={{ a: 'x', b: 1 }} />
      <Sample title="{ a: 'x', b: 1, c: true}" data={{ a: 'x', b: 1, c: true }} />
      <Sample title="function" data={() => "hi"} />
    </>
  );
}

export default App;
