import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { editCar } from '../../services/Car';

const EditModal = ({ isOpen, onClose, data }) => {
  const [car, setCar] = useState({
    brand: '',
    model: '',
    color: '',
    fuel: '',
    year: '',
    price: '',
  });

  // useEffect when data for modal is changed
  useEffect(() => {
    setCar({
      brand: data?.row?.original.brand,
      model: data?.row?.original.model,
      color: data?.row?.original.color,
      fuel: data?.row?.original.fuel,
      year: data?.row?.original.year,
      price: data?.row?.original.price,
    });
  }, [data]);

  // Set hook for edit
  const editCarMutation = useMutation(editCar);

  const handleInputChange = (event) => {
    setCar({ ...car, [event.target.id]: event.target.value });
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to edit this car?')) {
      editCarMutation.mutate({ url: data?.value, car });
      onClose();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add new car</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel htmlFor='brand'>Brand</FormLabel>
            <Input id='brand' type='text' value={car.brand} onChange={handleInputChange} />
            <FormLabel htmlFor='model'>Model</FormLabel>
            <Input id='model' type='text' value={car.model} onChange={handleInputChange} />
            <FormLabel htmlFor='color'>Color</FormLabel>
            <Input id='color' type='text' value={car.color} onChange={handleInputChange} />
            <FormLabel htmlFor='fuel'>Fuel</FormLabel>
            <Input id='fuel' type='text' value={car.fuel} onChange={handleInputChange} />
            <FormLabel htmlFor='year'>Year</FormLabel>
            <Input id='year' type='text' value={car.year} onChange={handleInputChange} />
            <FormLabel htmlFor='price'>Price</FormLabel>
            <Input id='price' type='text' value={car.price} onChange={handleInputChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme='blue'
            type='button'
            isLoading={editCarMutation.isLoading}
            mr={3}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button colorScheme='gray' type='button' variant='outline' onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
