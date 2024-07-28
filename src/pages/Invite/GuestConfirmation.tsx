import { Flex, Text, VStack, Box, useBreakpointValue, Heading, Button, Card, FormControl, FormLabel, Input, FormErrorMessage, Select, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/react'
// import './Hero.scss';
import BGFullCleared from '../../core/assets/images/bg-full-cleared.jpg';
import BGMobileCleared from '../../core/assets/images/bg-mobile-plain.jpg';
import { MotionBoxContainer } from '../../components/MotionBox/MotionBoxContainer';
import * as Yup from 'yup';
import { Formik, Field, FormikErrors } from 'formik';
import { useState } from 'react';
import { IGuestConfirmation } from '../../core/models/guests';
import { IQueryParams, useQueryParamStore } from '../../core/models/store';

const validationSchema = Yup.object({
    guests: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Required field'),
            contactnumber: Yup.string(),
            attending: Yup.boolean().required('Required field'),
            numOfAttendees: Yup.number().required('Required field'),
        })
    )
});

// Function to create initial form states based on query parameters
const createInitialGuests = ({ guest1, guest2, isPair }: IQueryParams) => {
    const initialGuests: IGuestConfirmation[] = [];
    if (guest1 || !isPair) {
        initialGuests.push({
            name: guest1 || '',
            contactnumber: '',
            attending: '',
            numOfAttendees: '',
        });
    }
    if (guest2 && isPair) {
        initialGuests.push({
            name: guest2 || '',
            contactnumber: '',
            attending: '',
            numOfAttendees: '',
        });
    }
    return initialGuests;
};

export default function GuestConfirmation() {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { params } = useQueryParamStore();
    const [guestForm] = useState<IGuestConfirmation[]>(() => createInitialGuests(params));

    return (
        <MotionBoxContainer>
            <Flex
                w={'full'}
                h={'100vh'}
                backgroundImage={(isMobile) ? BGMobileCleared : BGFullCleared}
                backgroundSize={'cover'}
                backgroundPosition={'center center'}
            >
                {
                    isMobile ?
                        <Formik
                            initialValues={{ guests: guestForm }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                console.log('Form Submitted', values);
                            }}
                        >
                            {({ handleChange, handleSubmit, values, errors }) => (
                                <VStack
                                    w={'full'}
                                    justify={'center'}
                                >
                                    <Flex>
                                        <Card h={'auto'} w={{ base: 'calc(100vw - 80px)', md: 900 }} textAlign={'center'} justifyContent={'center'} p={4}>
                                            <Heading as='h2' size={'md'} >
                                                RSVP
                                            </Heading>
                                            <Text fontSize={'sm'}>Please help us prepare everything better by confirming your attendance at our wedding event with the following RSVP form:</Text>
                                        </Card>
                                    </Flex>
                                    <Card h={'auto'} w={{ base: 'calc(100vw - 80px)', md: 900 }} onClick={(e) => e.stopPropagation()}>
                                        <Accordion allowMultiple={false} defaultIndex={0}>
                                            {values.guests.map((guest: IGuestConfirmation, index) => (
                                                <AccordionItem key={index}>
                                                    <h2>
                                                        <AccordionButton>
                                                            <Box as='span' flex='1' textAlign='left' textColor={(errors.guests && errors.guests[index]) ? 'red' : 'black'}>
                                                                Guest {index + 1}
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                    </h2>
                                                    <AccordionPanel pb={2}>
                                                        <Box p={1} w={'100%'}>
                                                            <Text textAlign={'center'}></Text>
                                                            <FormControl
                                                                isInvalid={!!(errors.guests && errors.guests[index] && (errors.guests[index] as FormikErrors<IGuestConfirmation>).name)}
                                                                mb={4}
                                                            >
                                                                <FormLabel>Name</FormLabel>
                                                                <Input
                                                                    type='text'
                                                                    name={`guests[${index}].name`}
                                                                    onChange={handleChange}
                                                                    value={guest.name}
                                                                />
                                                                <FormErrorMessage>{(errors.guests?.[index] as FormikErrors<IGuestConfirmation>)?.name}</FormErrorMessage>
                                                            </FormControl>
                                                            <FormControl
                                                                isInvalid={!!(errors.guests && errors.guests[index] && (errors.guests[index] as FormikErrors<IGuestConfirmation>).contactnumber)}
                                                                mb={4}
                                                            >
                                                                <FormLabel>Contact number</FormLabel>
                                                                <Input
                                                                    type='text'
                                                                    name={`guests[${index}].contactnumber`}
                                                                    onChange={handleChange}
                                                                    value={guest.contactnumber}
                                                                />
                                                                <FormErrorMessage>{(errors.guests?.[index] as FormikErrors<IGuestConfirmation>)?.contactnumber}</FormErrorMessage>
                                                            </FormControl>
                                                            <FormControl
                                                                isInvalid={!!(errors.guests && errors.guests[index] && (errors.guests[index] as FormikErrors<IGuestConfirmation>).attending)}
                                                                mb={4}
                                                            >
                                                                <FormLabel>Will you be attending the wedding?</FormLabel>
                                                                <Field
                                                                    as={Select}
                                                                    id="gender"
                                                                    name={`guests[${index}].attending`}
                                                                    onChange={handleChange}

                                                                >
                                                                    <option value=""></option>
                                                                    <option value="true">Yes</option>
                                                                    <option value="false">No</option>
                                                                </Field>
                                                                <FormErrorMessage>{(errors.guests?.[index] as FormikErrors<IGuestConfirmation>)?.attending}</FormErrorMessage>
                                                            </FormControl>
                                                            <FormControl
                                                                isInvalid={!!(errors.guests && errors.guests[index] && (errors.guests[index] as FormikErrors<IGuestConfirmation>).numOfAttendees)}
                                                            >
                                                                <FormLabel>Number of attendees (including yourself)</FormLabel>
                                                                <Input
                                                                    type='number'
                                                                    name={`guests[${index}].numOfAttendees`}
                                                                    onChange={handleChange}
                                                                    value={guest.numOfAttendees}
                                                                />
                                                                <FormErrorMessage>{(errors.guests?.[index] as FormikErrors<IGuestConfirmation>)?.numOfAttendees}</FormErrorMessage>
                                                            </FormControl>
                                                        </Box>
                                                    </AccordionPanel>
                                                </AccordionItem>



                                            )

                                            )}
                                        </Accordion>
                                        <Flex justifyContent={'center'} mt={'auto'} py={4}>
                                            <Button colorScheme="teal" size="lg" w={'auto'} onClick={() => { handleSubmit() }}>Send confirmation</Button>
                                        </Flex>

                                    </Card>

                                </VStack>
                            )}
                        </Formik>
                        :
                        // Desktop view
                        <Formik
                            initialValues={{ guests: guestForm }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                console.log('Form Submitted', values);
                            }}
                        >
                            {({ handleChange, handleSubmit, values, errors }) => (
                                <VStack
                                    w={'full'}
                                    justify={'center'}
                                    px={8}
                                >
                                    <Flex>
                                        <Card h={'auto'} w={{ base: 'calc(100vw - 80px)', md: 720 }} textAlign={'center'} justifyContent={'center'} p={8}>
                                            <Heading as='h2' size={'xl'} >
                                                RSVP
                                            </Heading>
                                            <Text fontSize={'md'}>Please help us prepare everything better by confirming your attendance at our wedding event with the following RSVP form:</Text>
                                        </Card>
                                    </Flex>
                                    <Card h={'auto'} w={{ base: 'calc(100vw - 80px)', md: 720 }} onClick={(e) => e.stopPropagation()}>
                                        <Flex direction={'row'} flexDir={'row'}>
                                            {values.guests.map((guest: IGuestConfirmation, index) => (
                                                <Box px={12} pt={12} pb={4} w={'100%'} key={index}>
                                                    <Text textAlign={'center'}>Guest {index + 1}</Text>
                                                    <FormControl
                                                        isInvalid={!!(errors.guests && errors.guests[index] && (errors.guests[index] as FormikErrors<IGuestConfirmation>).name)}
                                                        mb={4}
                                                    >
                                                        <FormLabel>Name</FormLabel>
                                                        <Input
                                                            type='text'
                                                            name={`guests[${index}].name`}
                                                            onChange={handleChange}
                                                            value={guest.name}
                                                        />
                                                        <FormErrorMessage>{(errors.guests?.[index] as FormikErrors<IGuestConfirmation>)?.name}</FormErrorMessage>
                                                    </FormControl>
                                                    <FormControl
                                                        isInvalid={!!(errors.guests && errors.guests[index] && (errors.guests[index] as FormikErrors<IGuestConfirmation>).contactnumber)}
                                                        mb={4}
                                                    >
                                                        <FormLabel>Contact number</FormLabel>
                                                        <Input
                                                            type='text'
                                                            name={`guests[${index}].contactnumber`}
                                                            onChange={handleChange}
                                                            value={guest.contactnumber}
                                                        />
                                                        <FormErrorMessage>{(errors.guests?.[index] as FormikErrors<IGuestConfirmation>)?.contactnumber}</FormErrorMessage>
                                                    </FormControl>
                                                    <FormControl
                                                        isInvalid={!!(errors.guests && errors.guests[index] && (errors.guests[index] as FormikErrors<IGuestConfirmation>).attending)}
                                                        mb={4}
                                                    >
                                                        <FormLabel>Will you be attending the wedding?</FormLabel>
                                                        <Field
                                                            as={Select}
                                                            id="gender"
                                                            name={`guests[${index}].attending`}
                                                            onChange={handleChange}

                                                        >
                                                            <option value=""></option>
                                                            <option value="true">Yes</option>
                                                            <option value="false">No</option>
                                                        </Field>
                                                        <FormErrorMessage>{(errors.guests?.[index] as FormikErrors<IGuestConfirmation>)?.attending}</FormErrorMessage>
                                                    </FormControl>
                                                    <FormControl
                                                        isInvalid={!!(errors.guests && errors.guests[index] && (errors.guests[index] as FormikErrors<IGuestConfirmation>).numOfAttendees)}
                                                    >
                                                        <FormLabel>Number of attendees (including yourself)</FormLabel>
                                                        <Input
                                                            type='number'
                                                            name={`guests[${index}].numOfAttendees`}
                                                            onChange={handleChange}
                                                            value={guest.numOfAttendees}
                                                        />
                                                        <FormErrorMessage>{(errors.guests?.[index] as FormikErrors<IGuestConfirmation>)?.numOfAttendees}</FormErrorMessage>
                                                    </FormControl>
                                                </Box>
                                            )
                                            )}
                                        </Flex>
                                        <Flex justifyContent={'center'} mt={'auto'} pb={8}>
                                            <Button colorScheme="teal" size="lg" w={'auto'} onClick={() => { handleSubmit() }}>Send confirmation</Button>
                                        </Flex>

                                    </Card>

                                </VStack>
                            )}
                        </Formik>
                }
            </Flex >
        </MotionBoxContainer >
    )
}