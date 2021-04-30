import { SideBar } from '@components/SideBar';
import { NavCollections } from '@types';
import { useState } from 'react';

type Props = {
  navCollections: NavCollections;
};

export const MainContainer: React.FC<Props> = ({
  children,
  navCollections,
}) => {
  const [shouldShownSideBar, setShouldShownSideBar] = useState(true);

  const toggleSideBar = () => {
    setShouldShownSideBar((p) => !p);
  };

  const sideBarClass = shouldShownSideBar
    ? 'main-sidebar'
    : 'main-sidebar-mini';

  return (
    <div className="main-container">
      {/*<div className={sideBarClass}>*/}
      {/*  {shouldShownSideBar && <SideBar navCollections={navCollections} />}*/}
      {/*</div>*/}

      {shouldShownSideBar ? (
        <>
          <div className="main-sidebar">
            <SideBar navCollections={navCollections} />
          </div>
          <button className="sidebar-toggle" onClick={toggleSideBar}>
            ⏪
          </button>
        </>
      ) : (
        <>
          <div className="main-sidebar-mini" />

          <button className="sidebar-toggle-mini" onClick={toggleSideBar}>
            ⏩
          </button>
        </>
      )}

      <main className="main-content">{children}</main>
    </div>
  );
};
