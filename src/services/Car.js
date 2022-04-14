import axios from 'axios';

export const getAllCars = () =>
  axios.get('https://carstockrest.herokuapp.com/cars').then((res) => res.data._embedded);

export const deleteCar = (data) => axios.delete(data);

export const addCar = (carDetail) =>
  axios.post('https://carstockrest.herokuapp.com/cars', carDetail, {
    headers: { 'Content-Type': 'application/json' },
  });

export const editCar = ({ url, car }) => {
  axios.put(url, car, {
    headers: { 'Content-Type': 'application/json' },
  });
};
