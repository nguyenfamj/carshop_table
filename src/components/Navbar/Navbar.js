import React from 'react';
import { Heading, Flex, Button, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddModal from '../AddModal/AddModal';

const Navbar = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        as='nav'
        align='center'
        justify='space-between'
        position='sticky'
        width='100vw'
        wrap='wrap'
        padding={3}
        bg='teal.400'
        color='white'
        borderBottomRadius='3xl'
        {...props}
      >
        <Flex align='center' ml={5}>
          <Heading as='h1' size='lg' letterSpacing={'wide'}>
            CAR SHOP
          </Heading>
        </Flex>
        <Button
          onClick={onOpen}
          mr={5}
          leftIcon={<AddIcon color='white' />}
          colorScheme='messenger'
          textColor='white'
        >
          ADD CAR
        </Button>
      </Flex>
      <AddModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Navbar;
