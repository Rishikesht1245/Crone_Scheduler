import DataTable from "react-data-table-component";
export { Media } from "react-data-table-component";

const Table = ({ columns, data, pending }) => {
  // custom style for table
  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: "13px",
        fontWeight: "bold",
        backgroundColor: "#f5f5f5",
      },
    },
  };

  return (
    <DataTable
      className="min-w-max"
      columns={columns}
      data={data}
      fixedHeader
      customStyles={tableCustomStyles}
      responsive
      highlightOnHover
      //fetching data states
      progressPending={pending}
      progressComponent={<div className="animate-spin">💫</div>}
      //show table head even data is not fully loaded
      persistTableHead
      pagination
      noDataComponent={<p className="my-8 font-semibold">No data to show.</p>}
    ></DataTable>
  );
};
export default Table;
