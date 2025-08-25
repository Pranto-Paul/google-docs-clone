import { Editor } from "./editor";
import ToolBar from "./toolbar";
interface DcoumentIdProps {
  params: Promise<{ documentId: string }>;
}

const DocuemntId = async ({ params }: DcoumentIdProps) => {
  const { documentId } = await params;
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <ToolBar />
      <Editor />
    </div>
  );
};
export default DocuemntId;
