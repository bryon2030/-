import { useState } from 'react';
import { X, Save, AlertTriangle, ExternalLink } from 'lucide-react';
import { useApp } from '../store/AppContext';
import type { AppSettings, AIProvider } from '../types';

interface SettingsModalProps {
    onClose: () => void;
}

export function SettingsModal({ onClose }: SettingsModalProps) {
    const { settings, dispatch } = useApp();
    const [localSettings, setLocalSettings] = useState<AppSettings>(settings);

    const handleSave = () => {
        dispatch({ type: 'SET_SETTINGS', payload: localSettings });
        onClose();
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div className="card" style={{ width: '90%', maxWidth: '500px', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>설정</h2>
                    <button onClick={onClose} aria-label="닫기"><X size={20} /></button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    {/* Provider Selection */}
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>AI 제공자</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {(['openai', 'gemini'] as AIProvider[]).map(p => (
                                <button
                                    key={p}
                                    onClick={() => setLocalSettings({ ...localSettings, provider: p })}
                                    style={{
                                        flex: 1,
                                        padding: '8px',
                                        borderRadius: 'var(--radius-sm)',
                                        border: `1px solid ${localSettings.provider === p ? 'hsl(var(--color-primary))' : 'hsl(var(--color-border))'}`,
                                        background: localSettings.provider === p ? 'hsl(var(--color-primary))' : 'transparent',
                                        color: localSettings.provider === p ? 'white' : 'inherit',
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* API Key */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                            <label style={{ fontWeight: 600 }}>API Key</label>
                            <a
                                href={localSettings.provider === 'openai' ? 'https://platform.openai.com/api-keys' : 'https://aistudio.google.com/app/apikey'}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: '0.75rem', color: 'hsl(var(--color-primary))', display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                                키 발급받기 <ExternalLink size={12} />
                            </a>
                        </div>
                        <input
                            type="password"
                            value={localSettings.apiKey}
                            onChange={(e) => setLocalSettings({ ...localSettings, apiKey: e.target.value })}
                            placeholder="sk-..."
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid hsl(var(--color-border))',
                                fontFamily: 'monospace'
                            }}
                        />
                        <div style={{ fontSize: '0.75rem', color: 'hsl(var(--color-text-secondary))', marginTop: '4px' }}>
                            비워두면 <b>체험판 모드</b> (더미 데이터)로 동작합니다.
                        </div>
                    </div>

                    {/* Storage Option */}
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>API Key 저장 방식</label>
                        <select
                            value={localSettings.storageOption}
                            onChange={(e) => setLocalSettings({ ...localSettings, storageOption: e.target.value as any })}
                            style={{ width: '100%', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid hsl(var(--color-border))' }}
                        >
                            <option value="none">저장 안 함 (권장)</option>
                            <option value="session">세션 저장 (창 닫을 때까지)</option>
                            <option value="local">이 기기에 저장 (브라우저)</option>
                        </select>
                    </div>

                    {/* Preferences */}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>기본 어조</label>
                            <select
                                value={localSettings.tone}
                                onChange={(e) => setLocalSettings({ ...localSettings, tone: e.target.value as any })}
                                style={{ width: '100%', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid hsl(var(--color-border))' }}
                            >
                                <option value="dry">담백하게</option>
                                <option value="warm">따뜻하게</option>
                                <option value="firm">단호하게</option>
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>기본 길이</label>
                            <select
                                value={localSettings.length}
                                onChange={(e) => setLocalSettings({ ...localSettings, length: e.target.value as any })}
                                style={{ width: '100%', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid hsl(var(--color-border))' }}
                            >
                                <option value="3">짧게 (3줄 내외)</option>
                                <option value="5">보통 (5줄 내외)</option>
                                <option value="7">길게 (7줄 내외)</option>
                            </select>
                        </div>
                    </div>

                    {/* Security Notice */}
                    <div style={{
                        backgroundColor: 'hsl(var(--color-bg))',
                        padding: '1rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        color: 'hsl(var(--color-text-secondary))'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color: 'hsl(var(--color-text-primary))', fontWeight: 600 }}>
                            <AlertTriangle size={14} /> 보안 안내
                        </div>
                        <ul style={{ paddingLeft: '1rem', lineHeight: '1.4' }}>
                            <li>API 키는 선택하신 저장소(브라우저)에만 저장됩니다.</li>
                            <li>서버로 키를 전송하거나 저장하지 않습니다.</li>
                            <li>공용 PC에서는 '저장 안 함'을 권장합니다.</li>
                        </ul>
                    </div>

                    <button className="btn-primary" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <Save size={18} /> 설정 저장
                    </button>
                </div>
            </div>
        </div>
    );
}
