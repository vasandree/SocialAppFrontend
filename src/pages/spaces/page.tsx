import { PageLayout } from '@/components/layout/page-layout.tsx';
import { SectionHeader } from '@/components/spaces/section-header.tsx';
import { useLanguage } from '@/app/language-context.tsx';

export const SpacesPage = () => {
  const { t } = useLanguage();

  return (
    <PageLayout currentPage="spaces">
      <div className="p-4 pb-20 md:p-8 md:pb-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <section className="mb-10">
            <SectionHeader title={t('spaces.title')} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" />
          </section>

          <section>
            <SectionHeader
              title={t('spaces.available')}
              showViewAll
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" />
          </section>
        </div>
      </div>
    </PageLayout>
  );
};
