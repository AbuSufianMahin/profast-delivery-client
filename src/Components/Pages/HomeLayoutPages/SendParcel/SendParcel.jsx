import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import warehouseData from "../../../../assets/data/warehouses.json"
import useAreaOptions from '../../../../hooks/useAreaOptions';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { errorAlert, successAlertWithTimer } from '../../../../Utilities/sweetAlerts';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import InfiniteLoading from '../../../Shared/Loading/LoadingInfinite';
import useCityOptions from '../../../../hooks/useCityOptions';
import { useNavigate } from 'react-router';

const SendParcel = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [isSendingData, setIsSendingData] = useState(false);

    const { register, unregister, formState: { errors }, watch, handleSubmit, reset } = useForm({
        defaultValues: {
            parcelType: "document",
        }
    });

    const parcelType = watch("parcelType");

    const cityOptions = useCityOptions(warehouseData);

    const senderSelectedCity = watch("senderCity");
    const senderAreaOptions = useAreaOptions(warehouseData, senderSelectedCity);

    const receiverSelectedCity = watch("receiverCity");
    const receiverAreaOptions = useAreaOptions(warehouseData, receiverSelectedCity);

    useEffect(() => {
        if (parcelType === "document") {
            unregister("parcelWeight");
        }
    }, [parcelType, unregister])

    const onSubmit = (data) => {
        const {
            parcelName,
            parcelType,
            parcelWeight,
            senderName,
            senderContact,
            senderEmail,
            senderAddress,
            senderCity,
            senderArea,
            senderPickupInstruction,
            receiverName,
            receiverContact,
            receiverEmail,
            receiverAddress,
            receiverCity,
            receiverArea,
            receiverPickupInstruction
        } = data;

        // delivery cost count
        const isWithinCity = senderCity === receiverCity;
        let deliveryCharge = 0;
        let extraCost = 0;

        if (parcelType === "document") {
            deliveryCharge = isWithinCity ? 60 : 80;
        }
        else {
            const weight = parseFloat(parcelWeight);

            if (weight <= 3) {
                deliveryCharge = isWithinCity ? 110 : 150;
            }
            else {
                const extraWeight = parcelWeight - 3;
                extraCost = extraWeight * 40;

                deliveryCharge = isWithinCity ? (110 + extraCost) : (150 + extraCost + 40)
            }
        }

        const htmlContent = `
            <div class="text-base text-gray-900 leading-relaxed">
              <div class="mb-6 pb-4 border-b border-gray-300">
                <p class="font-semibold mb-2">Delivery Cost:</p>
                <p class="my-1">Documents: ৳60 (within city), ৳80 (outside city)</p>
                <p class="my-1">Non-documents up to 3kg: ৳110 (within city), ৳150 (outside city)</p>
                <p class="my-1">Non-documents over 3kg: +৳40/kg, plus ৳40 extra outside city</p>
              </div>
              <table class="w-full border-collapse text-sm">
                <tbody>
                  <tr>
                    <td class="py-2 px-3 font-semibold border-b border-gray-200">Parcel Type:</td>
                    <td class="py-2 px-3 border-b border-gray-200">${parcelType}</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-3 font-semibold border-b border-gray-200">Weight (kg):</td>
                    <td class="py-2 px-3 border-b border-gray-200">${parcelWeight ? parseFloat(parcelWeight).toFixed(2) : "N/A"}</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-3 font-semibold border-b border-gray-200">Within City:</td>
                    <td class="py-2 px-3 border-b border-gray-200">${isWithinCity ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-3 font-semibold border-b border-gray-200">Delivery Cost:</td>
                    <td class="py-2 px-3 border-b border-gray-200">৳${parcelType === "document" ? deliveryCharge : (isWithinCity ? 110 : 150)}</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-3 font-semibold border-b border-gray-200">Extra Weight (kg):</td>
                    <td class="py-2 px-3 border-b border-gray-200">${parcelWeight > 3 ? (parseFloat(parcelWeight) - 3).toFixed(2) : "0"}</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-3 font-semibold border-b border-gray-200">Extra Weight Cost:</td>
                    <td class="py-2 px-3 border-b border-gray-200">${parcelWeight > 3 ? (parseFloat(parcelWeight) - 3).toFixed(2) : 0} x ৳40 = ৳${extraCost.toFixed(2)}</td>
                  </tr>
                  <tr class="border-t-2 border-base-300 text-success">
                    <td class="py-3 px-3 font-bold text-lgs">Total Delivery Charge:</td>
                    <td class="py-3 px-3 font-bold text-lg">৳${deliveryCharge.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            `;

        const formattedParcelData = {
            parcelDetails: {
                name: parcelName,
                type: parcelType,
                weight: parseFloat(parcelWeight) || 0, // optional: convert "" to null
                deliveryCharge: deliveryCharge,
                createdAt: new Date().toISOString(),
                delivery_status: "not_collected",
                payment_status: "unpaid",
                trackingId: uuidv4()
            },
            senderDetails: {
                name: senderName,
                contact: senderContact,
                email: senderEmail,
                address: senderAddress,
                city: senderCity,
                area: senderArea,
                pickupInstruction: senderPickupInstruction || "", // optional fallback
            },
            receiverDetails: {
                name: receiverName,
                contact: receiverContact,
                email: receiverEmail,
                address: receiverAddress,
                city: receiverCity,
                area: receiverArea,
                pickupInstruction: receiverPickupInstruction || "", // optional fallback
            }
        };

        Swal.fire({
            title: "Cost Breakdown",
            html: htmlContent,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Yes, proceed",
            cancelButtonText: "No, go back",
            buttonsStyling: false,
            customClass: {
                confirmButton: "bg-green-600 hover:bg-green-700 text-neutral font-semibold py-2 px-5 rounded transition duration-200",
                cancelButton: "bg-red-600 hover:bg-red-700 text-neutral font-semibold py-2 px-5 rounded ml-2 transition duration-200"
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setIsSendingData(true);
                axiosSecure.post('/add-parcel', formattedParcelData)
                    .then(res => {
                        if (res.data.insertedId) {
                            successAlertWithTimer("Parcel Confirmed!", "Your parcel booking was successful. Redirecting you to your parcels page....")
                            .then(() => navigate('/dashboard/my-parcels'));
                            setIsSendingData(false);
                            reset();
                        }
                    })
                    .catch(err => {
                        errorAlert("Oops.. Something went wrong", err.message);
                        setIsSendingData(false);
                    });
            }
        });
    };

    return (
        <div className="my-8 rounded-xl lg:rounded-4xl w-11/12 md:w-10/12 p-4 md:p-10 lg:px-24 lg:py-20 mx-auto bg-neutral shadow-md">
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
                    <div className="flex flex-col md:flex-row gap-3 lg:gap-6 xl:gap-10">
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
                                step="0.1"
                                placeholder="e.g., 1.5"
                                className="input input-bordered w-full"
                                disabled={parcelType === "document"}
                                {...register("parcelWeight", parcelType !== "document" ? { required: true } : {})}
                            />
                            {errors.parcelWeight && <p className='text-error text-sm'>Parcel Weight is required</p>}
                        </fieldset>
                    </div>

                    <div className='divider'></div>

                    {/* Sender and Receiver Informations */}
                    <div className='grid items-stretch lg:grid-cols-2 lg:gap-6 xl:gap-10'>
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
                                            defaultValue={user.displayName}
                                            readOnly
                                            title="You cant change this input field" 
                                            {...register("senderName", { required: true })}
                                        />
                                        {errors.senderName && <p className="text-error text-sm">Sender Name is required</p>}
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
                                        {errors.senderCity && <p className="text-error text-sm">City is required</p>}
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
                                <fieldset className="fieldset w-full">
                                    <legend className="fieldset-legend text-lg">User Email</legend>
                                    <input
                                        type="email"
                                        className="input w-full"
                                        {...register("senderEmail")}
                                        defaultValue={user.email}
                                        readOnly
                                        title="You cant change this input field" />
                                </fieldset>
                                {/* Address */}
                                <fieldset className="fieldset w-full">
                                    <legend className="fieldset-legend text-lg">Address<span className='text-error'>*</span></legend>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        placeholder="e.g., House 11, Road 5, Dhanmondi"
                                        {...register("senderAddress", { required: true })}
                                    />
                                    {errors.senderAddress && <p className="text-error text-sm">Sender's Address is required</p>}
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
                                            placeholder='Receiver Name'
                                            {...register("receiverName", { required: true })}
                                        />
                                        {errors.receiverName && <p className="text-error text-sm">Receiver name is required</p>}
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
                                        {errors.receiverCity && <p className="text-error text-sm">City is required</p>}
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
                                <fieldset className="fieldset w-full">
                                    <legend className="fieldset-legend text-lg">User Email</legend>
                                    <input
                                        type="email"
                                        className="input w-full"
                                        placeholder='Enter Receiver Email'
                                        {...register("receiverEmail", { required: true })}
                                    />
                                    {errors.receiverEmail && <p className="text-error text-sm">Receiver Email is required<span className='text-error'>*</span></p>}
                                </fieldset>

                                {/* Address */}
                                <fieldset className="fieldset w-full">
                                    <legend className="fieldset-legend text-lg">Address<span className='text-error'>*</span></legend>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        placeholder="e.g., House 11, Road 5, Dhanmondi"
                                        {...register("receiverAddress", { required: true })}
                                    />
                                    {errors.receiverAddress && <p className="text-error text-sm">Receiver's Address is required</p>}
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
                    <div className='flex gap-4 items-center'>
                        <button type="submit" className="btn btn-primary text-secondary" >Confirm Booking</button>

                        {
                            isSendingData &&
                            <div className='text-primary w-10'>
                                <InfiniteLoading></InfiniteLoading>
                            </div>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SendParcel;