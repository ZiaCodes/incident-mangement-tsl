const TableContainer = ({children,propsTable}) => {
  return (
    <div className="flex flex-col m-4 overflow-x-auto ">
        <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-x-auto border p-4 shadow-sm">
                        <table ref={propsTable}
                         className=" min-w-full text-center text-sm font-light ">
                            {children}
                        </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TableContainer