import { FaCircleUser } from "react-icons/fa6";
import MainContainer from '../component/Wrapper/MainContainer'
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useEffect,useState } from "react";

const WatchList = () => {
    useDocumentTitle(`Your WatchList  `);
    const [ticketData , setTicketData] = useState([]);


    useEffect(()=>{
        let data = JSON.parse(localStorage?.getItem('formateIncidentData'));

        if(data){
            setTicketData(data);
            console.log(data)
        }

    },[])
  return (
    <MainContainer>
        <div className="container mx-auto px-4 sm:px-8 mb-10">
            <div className="py-8">
                <div>
                <h2 className="text-2xl font-semibold leading-tight">My List</h2>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div
                    className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                >
                    <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                            User / Ticket
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                            Age/Slab
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                            Team
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                            Status
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                        ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ticketData?.map((ticket,index) =>{
                                return(
                                    <tr key={index}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex">
                                            <div className="flex-shrink-0 w-10 h-10 text-black">
                                                <FaCircleUser className="w-full h-full rounded-full"/>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                {ticket.name}
                                                </p>
                                                <p className="text-gray-600 whitespace-no-wrap">
                                                {ticket.ticketNo}
                                                </p>
                                            </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{ticket.age} Days</p>
                                            <p className="text-gray-600 whitespace-no-wrap">{ticket.slab}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{ticket.vendor}</p>
                                            <p className="text-gray-600 whitespace-no-wrap capitalize">{ticket.location}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span
                                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                            >
                                            <span
                                                aria-hidden
                                                className="absolute inset-0 opacity-50 rounded-full bg-green-200"
                                            ></span>
                                            <span className="relative">
                                                {ticket.status}
                                            </span>
                                            </span>
                                        </td>
                                        <td
                                            className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                                        >
                                        <button
                                        type="button"
                                        className="inline-block text-gray-500 hover:text-gray-700"
                                        >
                                        <svg
                                            className="inline-block h-6 w-6 fill-current"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                            d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                                            />
                                        </svg>
                                        </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    </MainContainer>
  )
}

export default WatchList