
export default function EmptyCard() {
  return (
    <div className='flex flex-col items-center justify-center h-[80vh]'>
      <h1 className="text-4xl text-neutral-800 font-semibold mb-4">Your Notebook is empty</h1>
      <p className="text-neutral-600">Click on the add <strong className="text-black">+</strong> button below to add a new note.</p>
    </div>
  );
}