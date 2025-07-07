import ResumeA4Preview from '../../(main)/(features)/resume-builder/components/resume-a4-preview';
import { templates } from '../../(main)/(features)/resume-builder/components/templates/template-data';
import { defaultResumeData } from '../../(main)/(features)/resume-builder/components/data';

export default function PreviewPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  let templateId = '';
  let colorSchemeId = '';
  let resumeData = defaultResumeData;
  templateId = Array.isArray(searchParams.template) ? searchParams.template[0] : searchParams.template ?? '';
  colorSchemeId = Array.isArray(searchParams.color) ? searchParams.color[0] : searchParams.color ?? '';

  if (searchParams.data) {
    try {
      const rawData = Array.isArray(searchParams.data) ? searchParams.data[0] : searchParams.data;
      resumeData = JSON.parse(decodeURIComponent(rawData));
    } catch (e) {
      // fallback to defaultResumeData
    }
  }

  if (!templateId || !colorSchemeId) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', maxWidth: '90vw', fontSize: '12px' }}>
          {JSON.stringify(searchParams, null, 2)}
        </pre>
        <div>Missing template or color parameter.</div>
      </div>
    );
  }

  return (
    <div className='h-screen w-screen'>
      <div className="flex justify-center items-center h-full bg-gray-100">
        <ResumeA4Preview
          resumeData={resumeData}
          selectedTemplate={templateId}
          selectedColorScheme={colorSchemeId}
          templates={templates}
        />
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';