import React, { useEffect } from 'react';
import riderImage from "../../../../assets/pictures/agent-pending.png"
import useCityOptions from '../../../../hooks/useCityOptions';
import warehouseData from "../../../../assets/data/warehouses.json"
import useAreaOptions from '../../../../hooks/useAreaOptions';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { errorAlert, successAlert } from '../../../../Utilities/sweetAlerts';


const BeARider = () => {
    const { user } = useAuth();
    const { register, unregister, formState: { errors }, watch, handleSubmit } = useForm();

    const selectedVehicle = watch("vehicleType");
    useEffect(() => {
        if (selectedVehicle === "cycle") {
            unregister("vehicleRegNo");
            unregister("drivingLicenseNumber");
        }
    }, [selectedVehicle, unregister]);

    const cityOptions = useCityOptions(warehouseData);

    const riderSelectedCity = watch("riderCity");
    const areaOptions = useAreaOptions(warehouseData, riderSelectedCity);

    const axiosSecure = useAxiosSecure();

    const handleRegisterRider = (data) => {
        const riderData = { ...data, status: "pending", created_at: new Date().toISOString(), riderAge: parseInt(data.riderAge) };

        axiosSecure.post('/add-riders', riderData)
            .then(res => {
                if (res.data.insertedId){
                    successAlert("Application Submitted!", 'Your rider application has been successfully submitted.');
                }
            })
            .catch(error => {
                errorAlert("Oops...", error.message)
            })
    }


    return (
        <div className="w-11/12 md:w-10/12 mx-auto p-6 md:p-12 lg:px-28 lg:py-20 bg-neutral rounded-4xl my-8">
            {/* Title Section */}
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-secondary">Be A Rider</h1>
                <p className="mt-4 text-gray-600 text-lg max-w-3xl">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>
            </div>

            <div className="divider"></div>

            <div className="grid xl:grid-cols-2 items-center gap-4 md:gap-10">
                {/* Form */}
                <div className='order-3 lg:order-1'>
                    <form onSubmit={handleSubmit(handleRegisterRider)}>
                        <div className="grid grid-cols-1 md:grid-cols-2  gap-2 md:gap-6 order-2 lg:order-1">

                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend text-lg">Your Name<span className="text-error">*</span></legend>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    {...register("riderName", { required: true })}
                                    className="input input-bordered w-full"
                                    defaultValue={user.displayName}
                                    readOnly
                                />
                                {errors.riderName && <p className="text-error text-sm">Name is required</p>}
                            </fieldset>

                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend text-lg">Your Age<span className="text-error">*</span></legend>
                                <input
                                    type="number"
                                    placeholder="Enter your age"
                                    {...register("riderAge", { required: true })}
                                    className="input input-bordered w-full"
                                />
                                {errors.riderAge && <p className="text-error text-sm">Age is required</p>}
                            </fieldset>

                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend text-lg">Your Email<span className="text-error">*</span></legend>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    {...register("riderEmail", { required: true })}
                                    className="input input-bordered w-full"
                                    defaultValue={user.email}
                                    readOnly
                                />
                                {errors.riderEmail && <p className="text-error text-sm">Email is required</p>}
                            </fieldset>

                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend text-lg">Contact<span className="text-error">*</span></legend>
                                <input
                                    type="text"
                                    placeholder="Enter your contact number"
                                    {...register("riderContact", { required: true })}
                                    className="input input-bordered w-full"
                                />
                                {errors.riderContact && <p className="text-error text-sm">Contact is required</p>}
                            </fieldset>

                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend text-lg">NID No<span className="text-error">*</span></legend>
                                <input
                                    type="text"
                                    placeholder="Enter your NID"
                                    {...register("riderNID", { required: true })}
                                    className="input input-bordered w-full"
                                />
                                {errors.riderNID && <p className="text-error text-sm">NID is required</p>}
                            </fieldset>

                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend text-lg">Vehicle Type<span className="text-error">*</span></legend>
                                <select
                                    className="select select-bordered w-full"
                                    defaultValue=""
                                    {...register("vehicleType", { required: "Please select your city" })}
                                >
                                    <option value="" disabled>-- Choose Vehicle Type --</option>
                                    <option value="bike" >Bike</option>
                                    <option value="cycle" >Cycle</option>


                                </select>
                                {errors.vehicleType && <p className="text-error text-sm">Vehicle Type is required</p>}
                            </fieldset>

                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend text-lg">Vehicle Registration number<span className="text-error">*</span></legend>
                                <input
                                    type="text"
                                    placeholder="Enter Vehicle Registration number"
                                    {...register("vehicleRegNo", selectedVehicle !== "cycle" ? { required: true } : {})}
                                    disabled={selectedVehicle === "cycle"}
                                    className="input input-bordered w-full"
                                />
                                {errors.vehicleRegNo && <p className="text-error text-sm">Vehicle Registration number is required</p>}
                            </fieldset>

                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend text-lg">Driving License<span className="text-error">*</span></legend>
                                <input
                                    type="text"
                                    placeholder="Enter Driving License"
                                    {...register("drivingLicenseNumber", selectedVehicle !== "cycle" ? { required: true } : {})}
                                    disabled={selectedVehicle === "cycle"}
                                    className="input input-bordered w-full"
                                />
                                {errors.drivingLicenseNumber && <p className="text-error text-sm">Driving License is required</p>}
                            </fieldset>

                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend text-lg">Your City</legend>
                                <select
                                    className="select select-bordered w-full"
                                    defaultValue=""
                                    {...register("riderCity", { required: "Please select your city" })}
                                >
                                    <option value="" disabled>-- Choose City --</option>
                                    {cityOptions.map((city, index) => (
                                        <option key={index} value={city}>{city}</option>
                                    ))}
                                </select>
                                {errors.riderCity && <p className="text-error text-sm">{errors.riderCity.message}</p>}
                            </fieldset>

                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend text-lg">Which warehouse you want to work?</legend>
                                <select
                                    className="select select-bordered w-full"
                                    {...register("riderWarehouse", { required: true })}
                                    defaultValue=""
                                >
                                    <option value="" disabled>Which warehouse you want to work?</option>
                                    {!riderSelectedCity && (
                                        <option disabled={true}>You need to choose city first</option>
                                    )}
                                    {areaOptions.map((center, index) => (
                                        <option key={index} value={center}>{center}</option>
                                    ))}
                                </select>
                                {errors.riderWarehouse && <p className="text-error text-sm">Warehouse is required</p>}
                            </fieldset>

                            <div className="col-span-1 md:col-span-2">
                                <button type="submit" className="btn btn-primary px-6 text-secondary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="divider order-2 xl:hidden"></div>
                {/* Image */}
                <div className="mx-auto order-1 lg:order-2">
                    <img src={riderImage} alt="Rider" className="rounded-lg w-full" />
                </div>
            </div>
        </div>


    );
};

export default BeARider;