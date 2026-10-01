import { DONE_STATUS } from "../statuses.js";

function Stats({ quests }) {
  console.log("Stats render");

  const doneQuests = quests.filter((quest) => quest.status === DONE_STATUS);
  const earnedXp = doneQuests.reduce((sum, quest) => sum + quest.xp, 0);

  return (
    <div className="stats">
      <div className="stat">
        <strong>{quests.length}</strong>
        <span>Quests</span>
      </div>
      <div className="stat">
        <strong>{doneQuests.length}</strong>
        <span>Completed</span>
      </div>
      <div className="stat">
        <strong>{earnedXp}</strong>
        <span>XP earned</span>
      </div>
    </div>
  );
}

export default Stats;
