import { Editor } from "./editor";

interface DcoumentIdProps {
  params: Promise<{ documentId: string }>;
}

const DocuemntId = async ({ params }: DcoumentIdProps) => {
  const { documentId } = await params;
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Editor />
    </div>
  );
};
export default DocuemntId;
