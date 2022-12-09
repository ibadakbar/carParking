import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { filterCar, getParkingCar, parkingCarStatus } from '../Redux/carReducer'



const CarData = () => {

    const parkingCar = useSelector(({ CarSlice }) => CarSlice?.result)
    const [carData, setCarData] = useState([])


    console.log(carData);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getParkingCar())
    }, [dispatch])


    useEffect(() => {

        setCarData(parkingCar)

    }, [parkingCar])



    const filterData = (tex) => {

        var newArray = parkingCar?.filter(val => val.numPlate.toLowerCase().indexOf(tex) === 0 || val.owner.toLowerCase().indexOf(tex) === 0 || val.phoneNo.toLowerCase().indexOf(tex) === 0)
        // setCarData(newArray)
        setCarData(newArray)

    }

    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    const processChanges = debounce(filterData);

    const ParkCar = (carId, carStatus) => {
        console.log(carStatus);
        const data = {
            carId,
            carStatus
        }
        dispatch(parkingCarStatus(data))
            .unwrap().then((res) => {

                dispatch(getParkingCar())
                return toast.success(res?.message)
            }).catch((err) => {
                console.log(err);
            })
    }
    // console.log(carData);


    return (
        <div>
            <div id="booking" class="section">
                <div class="section-center">
                    <div class="container">
                        <div class="row">
                            <div class="booking-form">
                                <div class="form-header">
                                    <h1>Car Parking Area</h1>
                                </div>
                                <form>

                                    <div class="form-group">
                                        <span class="form-label">Search Your Car</span>
                                        <input class="form-control" onChange={(e) => filterData(e.target.value)} type="text" placeholder="Search your car here" />
                                    </div>

                                    <table class="table table-dark">
                                        <thead>
                                            <tr>

                                                <th scope="col">No Plate</th>
                                                <th scope="col">Owner Name</th>
                                                <th scope="col">Phone No</th>
                                                <th scope="col">Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {carData?.map((parkCar) => {
                                                const id = parkCar._id

                                                return (
                                                    < tr >
                                                        <td scope="row">{parkCar.numPlate}</td>
                                                        <td>{parkCar.owner}</td>
                                                        <td>{parkCar.phoneNo}</td>

                                                        <td>
                                                            {
                                                                parkCar?.carStatus === 0 ?
                                                                    <button type="button" onClick={(e) => ParkCar(id, 1)} value={parkCar._id} class="btn btn-primary">IN</button>
                                                                    :
                                                                    <button type="button" onClick={(e) => ParkCar(id, 0)} class="btn btn-danger">OUT</button>

                                                            }


                                                        </td>


                                                    </tr>
                                                )
                                            })}
                                            {carData?.length <= 0 ?

                                                <div className='cardata'>
                                                    <span>

                                                        No Car Found

                                                    </span>

                                                </div>

                                                :
                                                <span></span>}


                                        </tbody>
                                    </table>
                                </form>
                                <div>




                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CarData