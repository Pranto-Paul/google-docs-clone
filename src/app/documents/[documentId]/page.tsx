interface DcoumentIdProps {
  params: Promise<{ documentId: string }>;
}

const DocuemntId = async ({ params }: DcoumentIdProps) => {
  const { documentId } = await params;
  return <div>This is document -{documentId}</div>;
};
export default DocuemntId;
