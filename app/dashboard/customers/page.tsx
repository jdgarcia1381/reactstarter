import { Metadata } from 'next';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { Suspense } from 'react';
import CustomersTable from '@/app/ui/customers/table';
import Pagination from '@/app/ui/invoices/pagination';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { CreateCustomer } from '@/app/ui/customers/buttons';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Customers',
};
export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const session = await auth();
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = 1;
  // @ts-ignore
  const customers = await fetchFilteredCustomers(query, session.user_id);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
          Customers
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
        <CreateCustomer/>
      </div>
      <Suspense key={query + currentPage}>
        <CustomersTable customers={customers} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
