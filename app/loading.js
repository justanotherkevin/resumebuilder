import Loader from '@/components/Loader';
/*
https://nextjs.org/docs/app/api-reference/file-conventions/loading
Nextjs specific: A loading file can create instant loading states built on Suspense.
*/
const loading = () => <Loader />;

export default loading;
