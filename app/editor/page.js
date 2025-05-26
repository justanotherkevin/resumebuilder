import Editor from "@/components/Editor";
import Preview from "@/components/Resume/Preview";
import Tabs from "@/components/Tabs";
import dynamic from "next/dynamic";

const ClientPreview = dynamic(() => Preview, {
  ssr: false,
  loading: () => <p>Loading preview...</p>,
});

const page = ({ searchParams: { tab = "contact" } }) => {
  return (
    <div className="mx-auto mt-8 flex max-w-screen-xl 2xl:max-w-screen-2xl flex-col-reverse gap-10 px-3 pb-8 md:flex-row md:mt-8 2xl:mt-14 2xl:gap-16">
      <div className="flex-grow ">
        <Tabs activeTab={tab} />
        <Editor tab={tab} />
      </div>
      <ClientPreview />
    </div>
  );
};

export default page;
