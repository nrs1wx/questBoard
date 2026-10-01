import { useState } from "react";

const stepsByDifficulty = { Easy: 3, Medium: 4, Hard: 5 };

function AddQuestForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [xp, setXp] = useState(100);

  console.log("AddQuestForm render");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() === "" || Number(xp) <= 0) return;
    onAdd({ title: title.trim(), difficulty, xp: Number(xp), steps: stepsByDifficulty[difficulty] });
    setTitle("");
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        className="input grow"
        placeholder="New quest title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <select className="input" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
      <input
        className="input xp"
        type="number"
        min="10"
        step="10"
        value={xp}
        onChange={(event) => setXp(event.target.value)}
      />
      <button className="btn primary" type="submit">Add quest</button>
    </form>
  );
}

export default AddQuestForm;
