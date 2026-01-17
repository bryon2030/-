import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { AIManager } from '../../services/ai/manager';

export function TopicStep() {
    const { app, settings, dispatch } = useApp();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const selectedTopic = app.topics.find(t => t.selected);

    const handleNext = async () => {
        if (!selectedTopic) return;

        setLoading(true);
        setError(null);
        try {
            const drafts = await AIManager.generateDrafts(settings, selectedTopic.text, selectedTopic.userContext || '');
            dispatch({ type: 'SET_DRAFTS', payload: drafts });
            dispatch({ type: 'SET_STEP', payload: 4 });
        } catch (err: any) {
            console.error(err);
            if (err.message === 'OpenAI API Call Failed' || err.message === 'Gemini API Call Failed') {
                setError('API 호출 실패. API Key를 확인하세요.');
            } else {
                setError('본문을 생성하지 못했습니다.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                주제 선택
            </h2>
            <p style={{ color: 'hsl(var(--color-text-secondary))', marginBottom: '2rem' }}>
                가장 공감되는 상황(주제)을 하나 선택해주세요.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
                {app.topics.map(topic => (
                    <div
                        key={topic.id}
                        className="card"
                        onClick={() => dispatch({ type: 'SELECT_TOPIC', payload: topic.id })}
                        style={{
                            padding: '16px',
                            borderColor: topic.selected ? 'hsl(var(--color-primary))' : 'hsl(var(--color-border))',
                            backgroundColor: topic.selected ? 'hsl(225, 70%, 98%)' : 'hsl(var(--color-surface))',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <div style={{
                                marginTop: '4px',
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                border: `2px solid ${topic.selected ? 'hsl(var(--color-primary))' : 'hsl(var(--color-border))'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                {topic.selected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'hsl(var(--color-primary))' }} />}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '1rem', fontWeight: 500, color: 'hsl(var(--color-text-primary))' }}>
                                    {topic.text}
                                </div>

                                {/* Inline Context Input if Selected */}
                                {topic.selected && (
                                    <div style={{ marginTop: '12px', animation: 'fadeIn 0.3s' }} onClick={e => e.stopPropagation()}>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}>
                                            (선택) 구체적인 내 상황을 덧붙여주세요:
                                        </label>
                                        <input
                                            type="text"
                                            value={topic.userContext || ''}
                                            onChange={(e) => dispatch({ type: 'SET_TOPIC_CONTEXT', payload: { id: topic.id, context: e.target.value } })}
                                            placeholder="예) 남들보다 늦은 것 같아 불안한 마음이 커요."
                                            style={{
                                                width: '100%',
                                                padding: '10px',
                                                borderRadius: 'var(--radius-sm)',
                                                border: '1px solid hsl(var(--color-border))'
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', paddingBottom: '2rem' }}>
                <button
                    onClick={() => dispatch({ type: 'SET_STEP', payload: 2 })}
                    style={{
                        padding: '12px 24px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid hsl(var(--color-border))',
                        color: 'hsl(var(--color-text-secondary))'
                    }}
                >
                    이전
                </button>
                <button
                    className="btn-primary"
                    onClick={handleNext}
                    disabled={loading || !selectedTopic}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                    {loading ? '글 작성 중...' : (
                        <>
                            글 3가지 제안받기 <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </div>
            {error && <p style={{ color: 'hsl(var(--color-error))', fontSize: '0.875rem', marginTop: '8px', textAlign: 'center' }}>{error}</p>}
        </div>
    );
}
