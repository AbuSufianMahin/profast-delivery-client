import React from 'react';

const draft = () => {
    return (
        <>
            <td>
                {/* Trigger button */}
                <label
                    htmlFor={`rider_modal_${parcel._id}`}
                    className="btn h-fit py-1 btn-sm btn-primary text-secondary w-full sm:w-auto text-sm"
                    onClick={() => handleShowRiderList(parcel)}
                >
                    Available Riders
                </label>

                {/* DaisyUI Modal */}
                <input
                    type="checkbox"
                    id={`rider_modal_${parcel._id}`}
                    className="modal-toggle"
                    readOnly
                />
                <div className="modal bg-transparent" role="dialog">
                    <div className="modal-box max-w-5xl relative">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-2xl text-secondary">Available Riders</h3>
                            {parcel._id}
                            <label
                                htmlFor={`rider_modal_${parcel._id}`}
                                className="btn btn-sm btn-circle btn-ghost"
                            >
                                ✕
                            </label>
                        </div>

                        {/* Rider List Table */}
                        <div className="overflow-x-auto shadow rounded-lg">
                            <table className="table">
                                <thead className="bg-secondary text-white">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Contact</th>
                                        <th>City</th>
                                        <th>Warehouse</th>
                                        <th>Vehicle</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {availableRiders.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="text-center">No rider is available</td>
                                        </tr>
                                    ) : (
                                        availableRiders.map((rider, i) => (
                                            <tr key={rider._id}>
                                                <td>{i + 1}</td>
                                                <td>{rider.riderName}</td>
                                                <td>{rider.riderEmail}</td>
                                                <td>{rider.riderContact}</td>
                                                <td>{rider.riderCity}</td>
                                                <td>{rider.riderWarehouse}</td>
                                                <td>{rider.vehicleType}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-success text-white"
                                                        onClick={() => handleAssignRider(parcel, rider)}
                                                    >
                                                        Assign
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </td>





            {/* better but doest not close after assigning */}

            <td>
                {/* Trigger button */}
                <label
                    htmlFor={`rider_modal_${parcel._id}`}
                    className="btn h-fit py-1 btn-sm btn-primary text-secondary w-full sm:w-auto text-sm"
                    onClick={() => handleShowRiderList(parcel)}
                >
                    Available Riders
                </label>

                {/* DaisyUI Modal */}
                <input
                    type="checkbox"
                    id={`rider_modal_${parcel._id}`}
                    className="modal-toggle"

                />
                <div className="modal bg-transparent" role="dialog">
                    <div className="modal-box max-w-5xl relative">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-2xl text-secondary">Available Riders</h3>
                            {parcel._id}
                            <label
                                htmlFor={`rider_modal_${parcel._id}`}
                                className="btn btn-sm btn-circle btn-ghost"
                            >
                                ✕
                            </label>
                        </div>

                        {/* Rider List Table */}
                        <div className="overflow-x-auto shadow rounded-lg">
                            <table className="table">
                                <thead className="bg-secondary text-white">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Contact</th>
                                        <th>City</th>
                                        <th>Warehouse</th>
                                        <th>Vehicle</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {availableRiders.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="text-center">No rider is available</td>
                                        </tr>
                                    ) : (
                                        availableRiders.map((rider, i) => (
                                            <tr key={rider._id}>
                                                <td>{i + 1}</td>
                                                <td>{rider.riderName}</td>
                                                <td>{rider.riderEmail}</td>
                                                <td>{rider.riderContact}</td>
                                                <td>{rider.riderCity}</td>
                                                <td>{rider.riderWarehouse}</td>
                                                <td>{rider.vehicleType}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-success text-white"
                                                        onClick={() => handleAssignRider(parcel, rider)}
                                                    >
                                                        Assign
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </td>
        </>
    );
};

export default draft;