import { Link } from './router';
import { toolDetails } from './toolDetails';
import { toolPath } from './toolPages';
import type { Tool } from './tools';

export const SHELVED_ICON = '/xp/folder.png';

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
            These are the ones I've kind of shelved. Most are Windows tools from before I moved to a Mac, so I don't
            really use them any more.
          </p>
          <p>They should still work tho, they just don't get many updates.</p>
        </div>
      </aside>
      <div className="directory-grid folder-items">
        {tools.map(tool => (
          <Link key={tool.name} href={toolPath(tool.name)} className="directory-item">
            <img src={tool.icon} alt="" />
            <span>
              <strong>{tool.name}</strong>
              <small>{toolDetails[tool.name]?.tagline ?? tool.desc}</small>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
