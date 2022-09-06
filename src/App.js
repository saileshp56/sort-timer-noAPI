import logo from "./logo.svg";
import "./App.css";
import ArrayInput from "./components/ArrayInput";
import RandomArray from "./components/RandomArray";

function App() {
  return (
    <div style={{ marginLeft: "20px" }}>
      <h1 style={{ marginBottom: "25px", color: "#062270" }}>
        Sort Visualizer: Start Visualizing Sorting Functions On Custom Arrays
      </h1>
      <ArrayInput />
      <RandomArray />
    </div>
  );
}

export default App;
