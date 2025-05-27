'use client';

import { useEffect, useRef, useState } from 'react';
import Resume from './pdf';
import Loader from '../Loader';
import { useSelector } from 'react-redux';

// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import 'react-pdf/dist/Page/TextLayer.css';

import { usePDF } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';
import { FaDownload, FaEye } from 'react-icons/fa6';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const preview = url => {
  window.open(
    url,
    'Resume Preview',
    `toolbar=no, location=no, menubar=no, scrollbars=no, status=no, titlebar=no, resizable=no, width=600, height=800, left=${window.innerWidth / 2 - 300}, top=100`,
  );
};

const Preview = () => {
  const parentRef = useRef(null);
  const resumeData = useSelector(state => state.resume);
  const [instance, updateInstance] = usePDF({
    document: <Resume data={resumeData} />,
  });
  useEffect(() => {
    updateInstance(<Resume data={resumeData} />);
  }, [resumeData?.saved]);

  if (instance.loading) return <Loader />;

  if (instance.error) return <div>Something went wrong: {error}</div>;

  return (
    <div
      ref={parentRef}
      className='relative w-full md:max-w-[24rem] 2xl:max-w-[28rem]'
    >
      {instance.loading ? (
        <Loader />
      ) : (
        <Document loading={<Loader />} file={instance.url}>
          <Page
            pageNumber={1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            loading={<Loader />}
            width={parentRef.current?.clientWidth}
          />
        </Document>
      )}

      {!instance.loading && (
        <div className='mt-4 flex justify-around'>
          <button onClick={() => preview(instance.url)} className='btn text-sm'>
            <span>Preview</span>
            <FaEye />
          </button>
          <a
            href={instance.url}
            download={`${resumeData.contact?.name || 'resume'}.pdf`}
            className='btn text-sm'
          >
            <span>Download</span>
            <FaDownload />
          </a>
        </div>
      )}
    </div>
  );
};

// const Preview = () => {
//     const resumeData = useSelector(state => state.resume);
//     const [data, setData] = useState(resumeData);

//     useEffect(() => {
//         if (resumeData.saved) setData(resumeData);
//     }, [resumeData.saved]);

//     return (
//         <div className="hidden h-[40rem] w-[28rem] md:block">
//             <PDFViewer className="h-full w-full" showToolbar={true}>
//                 <Resume data={data} />
//             </PDFViewer>
//         </div>
//     );
// };

export default Preview;
