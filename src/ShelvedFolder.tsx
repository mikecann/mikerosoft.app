import { ShelvedGroups } from './HomeContent';
import { SHELVED_ICON, type Tool } from './tools';

/** The Shelved folder on the desktop: an Explorer window of the tools I don't really use any more. */
export function ShelvedFolder({ tools }: { tools: Tool[] }) {
  return (
    <div className="doc scroll-area folder">
      <aside className="task-pane folder-pane" aria-labelledby="shelved-about">
        <h2 className="task-pane-head" id="shelved-about">
          <img src={SHELVED_ICON} alt="" />
          Shelved
        </h2>
        <div className="task-pane-body">
          <p>
            These are the ones I've kind of shelved. Some are Windows tools from before I moved to a Mac, and the rest
            I just don't use any more.
          </p>
          <p>They should still work tho, they just don't get many updates.</p>
        </div>
      </aside>
      <div className="folder-items">
        <ShelvedGroups tools={tools} />
      </div>
    </div>
  );
}
