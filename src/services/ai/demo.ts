import type { Keyword, Topic, Draft, Tone, LengthOption } from '../../types';

export const DemoService = {
    async generateKeywords(_target: string): Promise<Keyword[]> {
        // Artificial delay for realism
        await new Promise(resolve => setTimeout(resolve, 1000));

        return [
            { id: 'k1', text: '인생2막 시작', selected: true },
            { id: 'k2', text: '혼자 일하기', selected: true },
            { id: 'k3', text: '방향 찾기', selected: true },
            { id: 'k4', text: '너무 늦은 건 아닐까', selected: true },
            { id: 'k5', text: '부업 첫걸음', selected: true },
            { id: 'k6', text: 'AI 배우기', selected: true },
            { id: 'k7', text: '꾸준함에 대한 걱정', selected: true },
            { id: 'k8', text: '의미 있는 일', selected: true },
            { id: 'k9', text: '건강 루틴', selected: true },
            { id: 'k10', text: '관계 변화', selected: true },
        ];
    },

    async generateTopics(_keywords: string[]): Promise<Topic[]> {
        await new Promise(resolve => setTimeout(resolve, 1500));

        const topics = [
            '혼자 시작해도 괜찮을까?',
            '지금 시작하면 너무 늦은 건 아닐까?',
            '뭘 기준으로 선택해야 할지 모르겠을 때',
            '꾸준히 못할까 봐 시작이 망설여질 때',
            'AI를 배워야 할지 망설이는 순간',
            '은퇴 후, 진짜 내 일을 찾을 수 있을까?',
            '남들은 다 잘하는 것 같은데 나만 제자리인 기분',
            '새로운 기술 배우기가 두려운 이유',
            '체력이 예전 같지 않아 무언가 시작하기 겁날 때',
            '가족들에게 내 계획을 말하기 어려울 때',
            '작게라도 수익을 내는 법이 궁금할 때',
            '나만의 속도로 가는 것이 불안할 때',
            '과거의 경력이 오히려 짐처럼 느껴질 때',
            '비슷한 고민을 가진 동료를 찾고 싶을 때',
            '완벽하게 준비하고 시작하려는 마음 버리기',
            '매일 조금씩 성장하는 기쁨을 느끼는 법',
            '실패해도 괜찮다는 확신을 갖는 법',
            '내가 가진 경험을 콘텐츠로 만드는 방법',
            '디지털 도구들이 낯설고 어렵게 느껴질 때',
            '나를 위한 시간을 확보하는 구체적 방법'
        ];

        return topics.map((text, index) => ({
            id: `t${index}`,
            text,
            selected: false
        }));
    },

    async generateDrafts(topic: string, context: string, _tone: Tone, _length: LengthOption): Promise<Draft[]> {
        await new Promise(resolve => setTimeout(resolve, 2000));

        return [
            {
                id: 'd1',
                type: 'concern',
                title: '솔직한 고민 정리',
                content: `${topic}\n\n사실 저도 요즘 이런 고민이 많았습니다. ${context ? `특히 ${context} 때문에 더 생각이 많아지더라고요.` : ''}\n\n처음에는 막막했지만, 하나씩 풀어가다 보니 결국 중요한 건 '속도'가 아니라 '방향'이라는 걸 깨달았습니다.\n\n완벽하지 않아도 괜찮습니다. 오늘 하루, 작은 한 걸음만 내디뎌보는 건 어떨까요?\n\n#인생2막 #중년의도전 #생각정리`
            },
            {
                id: 'd2',
                type: 'process',
                title: '과정 공유 (추천)',
                content: `오늘도 ${topic}에 대해 치열하게 고민 중입니다.\n\n${context || '계속 제자리걸음인 것 같아 답답했어요.'}\n\n하지만 고민만 하기보다 일단 저질러보기로 했습니다. 서툴더라도 제가 시도한 작은 과정들을 이곳에 기록해보려 합니다.\n\n저와 비슷한 고민을 하시는 분들, 우리 함께 힘내봐요!\n\n#성장기록 #도전 #함께해요`
            },
            {
                id: 'd3',
                type: 'routine',
                title: '나만의 루틴/해결책',
                content: `${topic} 콤플렉스를 극복하기 위해 제가 정한 작은 루틴이 있습니다.\n\n1. 매일 아침 10분씩 관련 글 읽기\n2. 못해도 하루 한 줄 기록하기\n3. '안 되면 말고'라는 마음 갖기\n\n거창한 목표보다 이런 사소한 습관들이 저를 지탱해주는 것 같아요.\n\n여러분의 오늘 하루를 지켜주는 루틴은 무엇인가요?\n\n#루틴 #습관만들기 #마인드셋`
            }
        ];
    }
};
