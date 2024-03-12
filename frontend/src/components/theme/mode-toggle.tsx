import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme/theme-provider';

function ModeToggle({ className }: { className?: string }) {
  const { theme, changeTheme } = useTheme();

  return (
    <button
      className={`btn ${className}`}
      onClick={() => {
        changeTheme(theme === 'light' ? 'dark' : 'light');
      }}
      onFocus={(event) => event.currentTarget.blur()}
    >
      {theme === 'light' ? <Sun width={24} height={24} /> : <Moon width={24} height={24} />}
    </button>
  );
}

export default ModeToggle;
