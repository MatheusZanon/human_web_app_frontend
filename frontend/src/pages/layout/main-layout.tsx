import Footer from '@/components/layout/footer';
import NavHeader from '@/components/layout/header';
import Sidebar, { SidebarProvider } from '@/components/layout/aside';
import Main from '@/components/layout/main';

function MainLayout() {
  return (
    <>
      <SidebarProvider>
        <NavHeader />
        <div className='d-flex flex-column'>
          <aside className='d-flex'>
            <Sidebar />
          </aside>
          <Main />
          <Footer />
        </div>
      </SidebarProvider>
    </>
  );
}

export default MainLayout;
