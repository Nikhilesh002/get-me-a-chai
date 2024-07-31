import Link from "next/link";

function NotFound() {
  return (
    <div className='mt-10 mx-auto text-center pt-10'>
      <h1 className='text-2xl font-bold'>User Not Found</h1>
      <p className='mb-4 mt-3 text-lg font-semibold'>The user you&apos;re looking for might have <br/> been removed or is temporarily unavailable.</p>
      <Link className='border px-2 py-1 rounded' href="/">Go Back Home</Link>
    </div>
  )
}

export default NotFound;