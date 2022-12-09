import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addCar, getParkingCar } from '../Redux/carReducer';
import { toast } from 'react-toastify';

const defaultValue = {
    numPlate: "",
    ownerName: "",
    phoneNo: ""
}
const AddCar = () => {
    const dispatch = useDispatch()

    let schema = yup.object().shape({
        numPlate: yup.string().required("Number Plate is Required"),
        ownerName: yup.string().required("Owner Name is Required"),
        phoneNo: yup.string().required("Phone No is Required")

    });

    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({ mode: "onChange", resolver: yupResolver(schema), defaultValues: defaultValue });
    const onSubmit = (data) => {
        console.log(data);
        dispatch(addCar(data))
            .unwrap().then((res) => {
                console.log(res);
                dispatch(getParkingCar())
                reset()
                return toast.success(res?.message)
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>

            <div id="booking" class="section">
                <div class="section-center">
                    <div class="container">
                        <div class="row">
                            <div class="booking-form">
                                <div class="form-header">
                                    <h1>Car Registration</h1>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <div class="form-group">
                                        <span class="form-label">Number Plate</span>
                                        <input class="form-control" defaultValue={""} {...register('numPlate')} placeholder="Enter your Number Plate" />
                                        <p className='red'>{errors?.numPlate?.message}</p>

                                    </div>
                                    <div class="form-group">
                                        <span class="form-label">Owner</span>
                                        <input class="form-control" {...register('ownerName')} placeholder="Enter Owner Name" />
                                        <p className='red'>{errors?.ownerName?.message}</p>

                                    </div>
                                    <div class="form-group">
                                        <span class="form-label">Phone</span>
                                        <input class="form-control" {...register('phoneNo')} placeholder="Enter Phone No" />
                                        <p className='red'>{errors?.phoneNo?.message}</p>
                                    </div>
                                    <div class="row">


                                    </div>
                                    <div class="form-btn">
                                        <input type='submit' disabled={!isValid} class="submit-btn" />
                                    </div>
                                    <div>


                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddCar