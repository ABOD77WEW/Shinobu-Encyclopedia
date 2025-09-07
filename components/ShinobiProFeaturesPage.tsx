import React, { useEffect } from 'react';
import { useShinobiPro } from '../hooks/useShinobiPro.tsx';
import { useNavigate } from 'react-router-dom';
import { ByakuganIcon, ProSharinganIcon } from './ThematicIcons.tsx';

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="bg-ink-dark/50 backdrop-blur-sm p-6 rounded-lg border-2 border-seal-red/50 transform hover:-translate-y-2 transition-transform duration-300 hover:shadow-glow-red-dark">
        <div className="flex items-center gap-4 mb-4">
            {icon}
            <h3 className="text-2xl font-bold text-text-light">{title}</h3>
        </div>
        <p className="text-text-light/80">{description}</p>
    </div>
);

const ShinobiProFeaturesPage: React.FC = () => {
    const { isPro } = useShinobiPro();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isPro) {
            navigate('/shinobi-pro');
        }
    }, [isPro, navigate]);

    if (!isPro) {
        return null; // or a loading spinner
    }

    return (
        <div className="min-h-[calc(100vh-84px)] bg-gradient-to-b from-ink-dark via-seal-red-dark to-ink-dark p-8 animate-page-transition">
            <div className="container mx-auto text-center">
                <h1 className="text-5xl font-black text-white mb-4 [text-shadow:0_0_20px_theme(colors.seal-red.light)]">مزايا شينوبي برو</h1>
                <p className="text-xl text-text-light/90 mb-12">بصفتك عضوًا في النخبة، لديك وصول إلى قدرات خاصة.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <FeatureCard
                        icon={<span className="text-4xl">📜</span>}
                        title="معلومات S-Rank"
                        description="اكتشف الأسرار والخفايا الأعمق للشخصيات والتقنيات المحرمة التي لا تظهر في السجلات العادية."
                    />
                    <FeatureCard
                        icon={<ByakuganIcon className="w-10 h-10 text-blue-300" />}
                        title="رؤية البياكوغان"
                        description="استخدم فلاتر بحث متقدمة لتصنيف الشخصيات حسب طبيعة التشاكرا، التقنيات، أو حتى الانتماءات."
                    />
                    <FeatureCard
                        icon={<ProSharinganIcon className="w-10 h-10 text-seal-red-light animate-pro-glow" />}
                        title="مظهر الأكاتسوكي"
                        description="قم بتفعيل مظهر حصري للموسوعة مستوحى من الأكاتسوكي، يغير ألوان الواجهة وتصميمها بالكامل."
                    />
                     <FeatureCard
                        icon={<span className="text-4xl">🆚</span>}
                        title="مقارنة المقاتلين"
                        description="أداة فريدة تسمح لك بوضع أي شخصيتين وجهًا لوجه لمقارنة إحصائياته وقدراتهما جنبًا إلى جنب."
                    />
                     <FeatureCard
                        icon={<span className="text-4xl">📜</span>}
                        title="مخطوطات حصرية"
                        description="مقالات وتحليلات عميقة حول استراتيجيات المعارك، تاريخ العشائر، وفلسفة عالم الشينوبي."
                    />
                     <FeatureCard
                        icon={<span className="text-4xl">🎖️</span>}
                        title="شارة النخبة"
                        description="شارة خاصة تظهر بجانب اسمك (في المستقبل) في أي تفاعلات مجتمعية داخل الموسوعة."
                    />
                </div>
            </div>
        </div>
    );
};

export default ShinobiProFeaturesPage;