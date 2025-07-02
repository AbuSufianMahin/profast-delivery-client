import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import warehouseData from "../../../../assets/data/warehouses.json"
import useAreaOptions from '../../../../hooks/useCityAndAreaOptions';

const SendParcel = () => {
    const { register, formState: { errors }, watch, handleSubmit } = useForm({
        defaultValues: {
            parcelType: "document",
        }
    });

    const parcelType = watch("parcelType");

    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };

    const cityOptions = useMemo(() => {
        const cities = warehouseData.map(w => w.city);
        return [...new Set(cities)];
    }, []);

    const senderSelectedCity = watch("senderCity");
    const senderAreaOptions = useAreaOptions(warehouseData, senderSelectedCity)

    const receiverSelectedCity = watch("receiverCity");
    const receiverAreaOptions = useAreaOptions(warehouseData, receiverSelectedCity)


    return (
        <div className="my-8 rounded-xl lg:rounded-4xl w-11/12 md:w-10/12 p-4 md:p-10 lg:px-24 lg:py-20 mx-auto border bg-neutral">
            <h1 className="text-5xl font-extrabold text-secondary">Add Parcel</h1>
            <div className='divider my-8'></div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-2xl font-semibold mb-4">Enter Your Parcel Details</h2>
                    {/* Parcel type radio buttons */}
                    <div className="mb-6">
                        <label className="block mb-2 font-medium">Parcel Type:</label>
                        <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                            <label className='flex items-center gap-2'>
                                <input type="radio" className="radio text-green-600" value="document" {...register("parcelType")} />
                                <span className="label-text">Document</span>
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type="radio" className="radio text-green-600" value="non-document" {...register("parcelType")} />
                                <span className="label-text">Non-document</span>
                            </label>
                        </div>
                    </div>

                    {/* parcel name and weight */}
                    <div className="flex flex-col md:flex-row md:gap-4">
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-lg">Parcel Name</legend>
                            <input
                                type="text"
                                placeholder="e.g., Documents"
                                className="input input-bordered w-full"
                                {...register("parcelName", { required: true })}
                            />
                            {errors.parcelName && <p className='text-error text-sm'>Parcel Name is required</p>}
                        </fieldset>

                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-lg">Parcel Weight (KG)</legend>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="e.g., 1.5"
                                className="input input-bordered w-full"
                                disabled={parcelType === "document"}
                                {...register("weight")}
                            />
                        </fieldset>
                    </div>

                    <div className='divider'></div>

                    {/* Sender and Receiver Informations */}
                    <div className='grid items-stretch lg:grid-cols-2 gap-5 md:gap lg:gap-14'>
                        {/* sender */}
                        <div>
                            <h1 className='text-2xl font-extrabold'>Sender Details</h1>
                            <div className='md:mt-6 lg:mt-8'>
                                <div className='flex flex-col md:flex-row md:gap-3 lg:gap-6'>
                                    <fieldset className="fieldset w-full">
                                        <legend className="fieldset-legend text-lg">Name<span className='text-error'>*</span></legend>
                                        <input
                                            type="text"
                                            className="input input-bordered w-full"
                                            placeholder='Sender Name'
                                            {...register("senderName")}
                                        />
                                    </fieldset>

                                    {/* Contact */}
                                    <fieldset className="fieldset w-full">
                                        <legend className="fieldset-legend text-lg">Contact<span className='text-error'>*</span></legend>
                                        <input
                                            type="tel"
                                            placeholder="Sender Phone Number"
                                            className="input input-bordered w-full"
                                            {...register("senderContact", { required: true })}
                                        />
                                        {errors.senderContact && <p className="text-error text-sm">Contact is required</p>}
                                    </fieldset>
                                </div>

                                {/* City */}
                                <div className='flex flex-col md:flex-row md:gap-3 lg:gap-6'>
                                    <fieldset className="fieldset w-full">
                                        <legend className="fieldset-legend text-lg">Select City<span className='text-error'>*</span></legend>
                                        <select
                                            className="select select-bordered w-full"
                                            {...register("senderCity", { required: true })}
                                        >
                                            <option value=''>-- Choose City --</option>
                                            {
                                                cityOptions.map((city, index) =>
                                                    <option key={index} value={city}>{city}</option>
                                                )
                                            }
                                        </select>
                                        {errors.region && <p className="text-error text-sm">Region is required</p>}
                                    </fieldset>

                                    {/* Service Center */}
                                    <fieldset className="fieldset w-full">
                                        <legend className="fieldset-legend text-lg">Select Area<span className='text-error'>*</span></legend>
                                        <select
                                            className="select select-bordered w-full"
                                            {...register("senderArea", { required: true })}
                                        >
                                            <option value="">-- Choose Area --</option>
                                            {!senderSelectedCity && <option disabled={true}>You need to choose city first</option>}

                                            {
                                                senderAreaOptions.map((center, index) =>
                                                    <option key={index} value={center}>{center}</option>
                                                )
                                            }
                                        </select>
                                        {errors.senderArea && <p className="text-error text-sm">Area is required</p>}
                                    </fieldset>
                                </div>

                                {/* Address */}
                                <fieldset className="fieldset w-full">
                                    <legend className="fieldset-legend text-lg">Address<span className='text-error'>*</span></legend>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        placeholder="e.g., House 11, Road 5, Dhanmondi"
                                        {...register("senderAddress", { required: true })}
                                    />
                                    {errors.address && <p className="text-error text-sm">Address is required</p>}
                                </fieldset>

                                {/* Pickup Instruction */}
                                <fieldset className="fieldset w-full">
                                    <legend className="fieldset-legend text-lg">Pickup Instruction</legend>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        placeholder="Any specific instruction for pickup..."
                                        {...register("senderPickupInstruction")}
                                    />
                                </fieldset>
                            </div>
                        </div >

                        <div className='divider my-0 lg:hidden'></div>
                        {/* receiver */}
                        <div>
                            <h1 className='text-2xl font-extrabold'>Reciever Details</h1>
                            <div className='md:mt-6 lg:mt-8'>
                                <div className='flex flex-col md:flex-row md:gap-3 lg:gap-6'>
                                    <fieldset className="fieldset w-full">
                                        <legend className="fieldset-legend text-lg">Name<span className='text-error'>*</span></legend>
                                        <input
                                            type="text"
                                            className="input input-bordered w-full"
                                            placeholder='receiver Name'
                                            {...register("receiverName")}
                                        />
                                    </fieldset>

                                    {/* Contact */}
                                    <fieldset className="fieldset w-full">
                                        <legend className="fieldset-legend text-lg">Contact<span className='text-error'>*</span></legend>
                                        <input
                                            type="tel"
                                            placeholder="receiver Phone Number"
                                            className="input input-bordered w-full"
                                            {...register("receiverContact", { required: true })}
                                        />
                                        {errors.receiverContact && <p className="text-error text-sm">Contact is required</p>}
                                    </fieldset>
                                </div>

                                {/* City */}
                                <div className='flex flex-col md:flex-row md:gap-3 lg:gap-6'>
                                    <fieldset className="fieldset w-full">
                                        <legend className="fieldset-legend text-lg">Select City<span className='text-error'>*</span></legend>
                                        <select
                                            className="select select-bordered w-full"
                                            {...register("receiverCity", { required: true })}
                                        >
                                            <option value=''>-- Choose City --</option>
                                            {
                                                cityOptions.map((city, index) =>
                                                    <option key={index} value={city}>{city}</option>
                                                )
                                            }
                                        </select>
                                        {errors.region && <p className="text-error text-sm">Region is required</p>}
                                    </fieldset>

                                    {/* Area */}
                                    <fieldset className="fieldset w-full">
                                        <legend className="fieldset-legend text-lg">Select Area<span className='text-error'>*</span></legend>
                                        <select
                                            className="select select-bordered w-full"
                                            {...register("receiverArea", { required: true })}
                                        >
                                            <option value="">-- Choose Area --</option>
                                            {!receiverSelectedCity && <option disabled={true}>You need to choose city first</option>}

                                            {
                                                receiverAreaOptions.map((center, index) =>
                                                    <option key={index} value={center}>{center}</option>
                                                )
                                            }
                                        </select>
                                        {errors.receiverArea && <p className="text-error text-sm">Area is required</p>}
                                    </fieldset>
                                </div>

                                {/* Address */}
                                <fieldset className="fieldset w-full">
                                    <legend className="fieldset-legend text-lg">Address<span className='text-error'>*</span></legend>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        placeholder="e.g., House 11, Road 5, Dhanmondi"
                                        {...register("receiverAddress", { required: true })}
                                    />
                                    {errors.address && <p className="text-error text-sm">Address is required</p>}
                                </fieldset>

                                {/* Pickup Instruction */}
                                <fieldset className="fieldset w-full">
                                    <legend className="fieldset-legend text-lg">Pickup Instruction</legend>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        placeholder="Any specific instruction for pickup..."
                                        {...register("receiverPickupInstruction")}
                                    />
                                </fieldset>
                            </div>
                        </div>

                    </div>

                    <p className='my-6 lg:my-14'>* PickUp Time 4pm-7pm Approx.</p>
                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary text-secondary" >Confirm Booking</button>
                </form>
            </div>
        </div>
    );
};

export default SendParcel;