import Link from "next/link";
const Home = () => {
  return (
    <div className="flex items-center justify-center text-red-500 h-screen text-lg">
      <p>
        Click{" "}
        <Link href="/documents/1" className="underline text-blue-400">
          here
        </Link>{" "}
        to go to Documents page
      </p>
    </div>
  );
};
export default Home;
