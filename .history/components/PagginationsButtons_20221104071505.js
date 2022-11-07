import { useRouter } from "next/router";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function PagginationsButtons() {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  return (
    <div className="flex justify-between max-w-lg text-blue-600 mb-10">
      {page >= 10 && (
        <Link href={`/products?p=${page - 1}`}>
          <div className="flex flex-col items-center cursor-pointer hover:underline">
            <ChevronLeftIcon className="h-5  text-blue-800 cursor-pointer" />
            <p>Previous</p>
          </div>
        </Link>
      )}

      <Link href={`/products?p=${page + 1}`}>
        <div className="flex flex-col items-center cursor-pointer hover:underline">
          <ChevronRightIcon className="h-5  cursor-pointer" />
          <p>Next</p>
        </div>
      </Link>
    </div>
  );
}

export default PagginationsButtons;
