import { Settings } from 'lucide-react';
import { useApp } from '../store/AppContext';

interface HeaderProps {
    onOpenSettings: () => void;
}

export function Header({ onOpenSettings }: HeaderProps) {
    const { app } = useApp();

    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid hsl(var(--color-border))'
        }}>
            <div>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'hsl(var(--color-primary))' }}>
                    ThreadGen
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <span style={{ fontSize: '0.875rem', color: 'hsl(var(--color-text-secondary))' }}>
                        생각의 흐름을 글로 연결합니다
                    </span>
                    {app.mode === 'DEMO' && (
                        <span style={{
                            fontSize: '0.75rem',
                            padding: '2px 6px',
                            background: 'hsl(var(--color-border))',
                            borderRadius: '4px',
                            fontWeight: 600
                        }}>체험판</span>
                    )}
                </div>
            </div>
            <button
                onClick={onOpenSettings}
                aria-label="설정"
                style={{ color: 'hsl(var(--color-text-secondary))' }}
            >
                <Settings size={24} />
            </button>
        </header>
    );
}
