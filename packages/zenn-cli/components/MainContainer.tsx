import { SideBar } from '@components/SideBar';
import { NavCollections } from '@types';

type Props = {
  navCollections: NavCollections;
  shouldShownSideBar: boolean;
};

export const MainContainer: React.FC<Props> = ({
  children,
  navCollections,
  shouldShownSideBar,
}) => {
  return (
    <div className="main-container">
      {shouldShownSideBar && (
        <div className="main-sidebar">
          <SideBar navCollections={navCollections} />
        </div>
      )}
      <main className="main-content">{children}</main>
    </div>
  );
};
