import Footer from '@/components/layout/footer';
import NavHeader from '@/components/layout/header';
import Sidebar, { SidebarProvider } from '@/components/layout/aside';
import Main from '@/components/layout/main';
import { AuthenticatedUserProvider } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';
import { ContextMenuProvider } from '@/contexts/ContextMenu/ContextMenuProvider';

function MainLayout() {
  return (
    <>
      <AuthenticatedUserProvider>
        <SidebarProvider>
          <ContextMenuProvider>
          <NavHeader />
          <div className='d-flex flex-column'>
            <aside className='d-flex'>
              <Sidebar />
            </aside>
            <Main />
            <Footer />
          </div>
          </ContextMenuProvider>
        </SidebarProvider>
      </AuthenticatedUserProvider>
    </>
  );
}

export default MainLayout;
