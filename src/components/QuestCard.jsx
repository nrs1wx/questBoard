import { useState } from "react";

import { STATUSES, DONE_STATUS } from "../statuses.js";

function QuestCard({ quest, visible, onStatusChange, onRemove, onReset }) {
  const [progress, setProgress] = useState(0);
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState("");

  console.log("QuestCard render:", quest.title);

  if (!visible) return null;

  const percent = (progress / quest.steps) * 100;
  const cardClass = quest.status === DONE_STATUS ? "card card-done" : "card";

  return (
    <div className={cardClass}>
      <div className="card-top">
        <h3>{quest.title}</h3>
        <span className={"badge " + quest.difficulty.toLowerCase()}>{quest.difficulty}</span>
      </div>

      <p className="reward">{quest.xp} XP</p>

      <label className="field">
        Status
        <select value={quest.status} onChange={(event) => onStatusChange(quest.id, event.target.value)}>
          {STATUSES.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </label>

      <div className="progress">
        <div className="progress-row">
          <span>Steps: {progress} / {quest.steps}</span>
          <div>
            <button className="step-btn" aria-label="Remove step" disabled={progress === 0} onClick={() => setProgress(progress - 1)}>-</button>
            <button className="step-btn" aria-label="Complete step" disabled={progress === quest.steps} onClick={() => setProgress(progress + 1)}>+</button>
          </div>
        </div>
        <div className="bar">
          <div className="bar-fill" style={{ width: percent + "%" }} />
        </div>
        {progress === quest.steps && <p className="complete">All steps finished</p>}
      </div>

      <button className="link" onClick={() => setShowNote(!showNote)}>
        {showNote ? "Hide note" : "Add note"}
      </button>
      {showNote && (
        <textarea
          className="note"
          placeholder="Write a note about this quest"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      )}

      <div className="card-actions">
        <button className="btn secondary" onClick={() => onReset(quest.id)}>Reset card</button>
        <button className="btn danger" onClick={() => onRemove(quest.id)}>Remove</button>
      </div>
    </div>
  );
}

export default QuestCard;
