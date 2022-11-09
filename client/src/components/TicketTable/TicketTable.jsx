import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeTicket } from "./ticketTableAction";

const TicketTable = () => {
  const dispatch = useDispatch();
  const { isAdmin } = useSelector((state) => state.adminSignin);
  const { searchTicketList, isLoading, error } = useSelector(
    (state) => state.tickets
  );
  const deleteTicket = (id) => {
    dispatch(removeTicket(id));
  };
  useEffect(() => {}, [dispatch]);

  if (isLoading) return <h3>Loading ...</h3>;

  if (error) return <h3>{error}</h3>;

  return (
    <div>
      <div className="overflow-x-auto relative shadow-xl sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-slate-200">
            <tr>
              <th scope="col" className="p-4">
                #
              </th>
              <th scope="col" className="py-3 px-6">
                Subjects
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
              <th scope="col" className="py-3 px-6">
                Opened Date
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {searchTicketList.length ? (
              searchTicketList.map((row) => (
                <tr
                  key={row._id}
                  className="bg-white border-b dark:bg-gray-600 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-4 w-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {row._id}
                  </td>
                  <td className="py-4 px-6 dark:text-slate-300">
                    {isAdmin ? (
                      <Link to={`/admin/ticket/${row._id}`}>{row.subject}</Link>
                    ) : (
                      <Link to={`/ticket/${row._id}`}>{row.subject}</Link>
                    )}
                  </td>
                  <td className="py-4 px-6 dark:text-slate-300">
                    {row.status}
                  </td>
                  <td className="py-4 px-6 dark:text-slate-300">
                    {row.openedAt && new Date(row.openedAt).toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => deleteTicket(row._id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-4 px-6 space-x-3 dark:text-slate-300"
                >
                  No ticket to show
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketTable;
