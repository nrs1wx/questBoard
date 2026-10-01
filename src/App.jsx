import { useState } from "react";
import Stats from "./components/Stats.jsx";
import AddQuestForm from "./components/AddQuestForm.jsx";
import Toolbar from "./components/Toolbar.jsx";
import QuestCard from "./components/QuestCard.jsx";
import { DEFAULT_STATUS } from "./statuses.js";

const initialQuests = [
  { id: 1, title: "Defeat the Forest Troll", difficulty: "Hard", xp: 300, steps: 5, status: "Accepted", version: 0 },
  { id: 2, title: "Deliver the Royal Letter", difficulty: "Easy", xp: 80, steps: 3, status: "Available", version: 0 },
  { id: 3, title: "Find the Lost Amulet", difficulty: "Medium", xp: 150, steps: 4, status: "Completed", version: 0 },
  { id: 4, title: "Guard the Mountain Pass", difficulty: "Medium", xp: 180, steps: 4, status: "Available", version: 0 },
];

function App() {
  const [quests, setQuests] = useState(initialQuests);
  const [filter, setFilter] = useState("All");
  const [reversed, setReversed] = useState(false);

  console.log("App render");

  const addQuest = (quest) => {
    setQuests([...quests, { ...quest, id: Date.now(), status: DEFAULT_STATUS, version: 0 }]);
  };

  const removeQuest = (id) => {
    setQuests(quests.filter((quest) => quest.id !== id));
  };

  const changeStatus = (id, status) => {
    setQuests(quests.map((quest) => (quest.id === id ? { ...quest, status } : quest)));
  };

  const resetQuest = (id) => {
    setQuests(quests.map((quest) => (quest.id === id ? { ...quest, version: quest.version + 1 } : quest)));
  };

  const isVisible = (quest) => filter === "All" || quest.status === filter;
  const visibleCount = quests.filter(isVisible).length;
  const orderedQuests = reversed ? [...quests].reverse() : quests;

  return (
    <div className="app">
      <header className="header">
        <h1>Quest Board</h1>
        <p>Pick a quest, track your steps, collect the XP.</p>
      </header>

      <Stats quests={quests} />
      <AddQuestForm onAdd={addQuest} />
      <Toolbar
        filter={filter}
        onFilterChange={setFilter}
        onReverse={() => setReversed(!reversed)}
      />

      {visibleCount === 0 && <p className="empty">No quests with this status. Add one or change the filter.</p>}

      <div className="quest-list">
        {orderedQuests.map((quest) => (
          <QuestCard
            key={quest.id + "-" + quest.version}
            quest={quest}
            visible={isVisible(quest)}
            onStatusChange={changeStatus}
            onRemove={removeQuest}
            onReset={resetQuest}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
