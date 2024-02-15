


import OrbitCanvas from './components/OrbitCanvas';

function App() {

  const canvasSize = { width: 800, height: 600};
  const backgroundColor = '#433543'
  
  return (
    <div >
      <OrbitCanvas backgroundColor={backgroundColor} width={window.innerWidth} height={window.innerHeight}/>
    </div>
  );
}

export default App;
