import type { ReactNode } from 'react';
import { Header } from './Header';
import { Stepper } from './Stepper';

interface LayoutProps {
    children: ReactNode;
    onOpenSettings: () => void;
}

export function Layout({ children, onOpenSettings }: LayoutProps) {
    return (
        <div className="container" style={{ padding: '20px' }}>
            <Header onOpenSettings={onOpenSettings} />
            <Stepper />
            <main style={{ flex: 1 }}>
                {children}
            </main>
            <footer style={{
                marginTop: 'auto',
                padding: '2rem 0',
                textAlign: 'center',
                color: 'hsl(var(--color-text-secondary))',
                fontSize: '0.75rem'
            }}>
                ThreadGen MVP © {new Date().getFullYear()}
            </footer>
        </div>
    );
}
