import All from "./All";
import Indian from "./Indian";
import Chiness from "./Chiness";
import Veg from "./Veg";
import Nonveg from "./Nonveg";

import "../Home CSS/Main.css";

function Main({onAdd}) {
  return (
    <main>
      <h2 className="category-title">Category</h2>

      <div id="all-food">
        <All onAdd = {onAdd}/>
      </div>

      <div id="indian-food">
        <Indian onAdd = {onAdd} />
      </div>

      <div id="chinese-food">
        <Chiness onAdd = {onAdd} />
      </div>

      <div id="veg-food">
        <Veg onAdd = {onAdd}/>
      </div>

      <div id="non-veg-food">
        <Nonveg onAdd = {onAdd} />
      </div>
    </main>
  );
}

export default Main;