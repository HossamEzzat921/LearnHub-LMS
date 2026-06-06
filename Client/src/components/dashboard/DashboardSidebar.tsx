import { cn } from '@/lib/utils';
import { LucideIcon, Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

interface DashboardSidebarProps {
  items: SidebarItem[];
  basePath: string;
}

const SidebarNav = ({ items, basePath, onClose }: DashboardSidebarProps & { onClose?: () => void }) => {
  const location = useLocation();
  const currentTab = location.pathname.replace(basePath, '').replace(/^\//, '') || items[0]?.id;

  return (
    <nav className="space-y-1 p-2">
      {items.map((item) => {
        const isActive = currentTab === item.id;
        return (
          <Link
            key={item.id}
            to={`${basePath}/${item.id}`}
            onClick={() => onClose?.()}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            <span className="flex-1">{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className={cn(
                'text-xs font-bold rounded-full px-2 py-0.5 min-w-[20px] text-center',
                isActive
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-destructive text-destructive-foreground'
              )}>
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};

const DashboardSidebar = ({ items, basePath }: DashboardSidebarProps) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const currentTab = location.pathname.replace(basePath, '').replace(/^\//, '') || items[0]?.id;
  const activeLabel = items.find(i => i.id === currentTab)?.label;

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 mb-4">
            <Menu className="h-4 w-4" />
            {activeLabel}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 pt-10">
          <SheetTitle className="px-4 pb-2 text-lg font-display font-semibold">Menu</SheetTitle>
          <SidebarNav items={items} basePath={basePath} onClose={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="w-56 shrink-0 sticky top-24 self-start">
      <div className="bg-card rounded-xl card-shadow overflow-hidden min-h-[calc(100vh-12rem)]">
        <SidebarNav items={items} basePath={basePath} />
      </div>
    </aside>
  );
};

export default DashboardSidebar;
