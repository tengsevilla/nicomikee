import { Flex, Text, VStack, Box, useBreakpointValue, Heading, Button, Card, FormControl, FormLabel, Input, FormErrorMessage, Select, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/react'
// import './Hero.scss';
import BGFullCleared from '../../core/assets/images/bg-full-cleared.jpg';
import BGMobileCleared from '../../core/assets/images/bg-mobile-plain.jpg';
import { MotionBoxContainer } from '../../components/MotionBox/MotionBoxContainer';
import * as Yup from 'yup';
import { Formik, Field, FormikErrors } from 'formik';
import { useState } from 'react';
import { IGuest } from '../../core/models/useGuestStore';
import { IQueryParams, useQueryParamStore } from '../../core/models/useQueryParamsStore';
import { BsFillSendFill } from "react-icons/bs";
import { createRSVP } from '../../core/models/useGuestStore';
import { Message } from '../../core/utils/utils';
const validationSchema = Yup.object({
    guests: Yup.array().of(
        Yup.object().shape({
            rsvpGuest: Yup.string().required('Required field'),
            rsvpContact: Yup.string(),
            rsvpAttending: Yup.string().required('Required field'),
            rsvpNumOfAttendees: Yup.number().required('Required field'),
        })
    )
});

// Function to create initial form states based on query parameters
const createInitialGuests = ({ guest1, guest2, isPair }: IQueryParams) => {
    const initialGuests: IGuest[] = [];
    if (guest1 || !isPair) {
        initialGuests.push({
            rsvpGuest: guest1 || '',
            rsvpContact: '',
            rsvpAttending: '',
            rsvpNumOfAttendees: 1,
        });
    }
    if (guest2 && isPair) {
        initialGuests.push({
            rsvpGuest: guest2 || '',
            rsvpContact: '',
            rsvpAttending: '',
            rsvpNumOfAttendees: 1,
        });
    }
    return initialGuests;
};

export default function GuestConfirmation() {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { params } = useQueryParamStore();
    const [guestForm] = useState<IGuest[]>(() => createInitialGuests(params));
    const fontSize = useBreakpointValue({ base: '12px', md: '16px', lg: '18px' });
    const padding = useBreakpointValue({ base: '8px 12px', md: '10px 16px', lg: '12px 24px' });

    const onSubmit = async (data: IGuest[]) => {
        // Create an array of promises from the data array
        const promises = data.map((guest: IGuest) => createRSVP(guest));

        try {
            // Wait for all RSVPs to be processed
            const results = await Promise.all(promises);
            console.log('All RSVPs processed:', results);
            // Handle success for all RSVPs
            // e.g., show a success message, redirect, etc.
            results.map(({ rsvpGuest, message }) => {
                Message('success', `${rsvpGuest} - ${message}`, 4000);
            });


        } catch (error) {
            // Handle errors here
            // This will catch any failed RSVP submission
            Message('error', 'Something weird came up, contact the couple!!', 5000);
            console.error('Error processing RSVPs:', error);
            // e.g., show an error message, rollback any changes if needed, etc.
        }
    }
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
                            onSubmit={(values) => onSubmit(values.guests)}
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
                                            {values.guests.map((guest: IGuest, index) => (
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
                                                                isInvalid={!!(errors.guests && errors.guests[index] && (errors.guests[index] as FormikErrors<IGuest>).rsvpGuest)}
                                                                mb={4}
                                                            >
                                                                <FormLabel>Name</FormLabel>
                                                                <Input
                                                                    type='text'
                                                                    name={`guests[${index}].rsvpGuest`}
                                                                    onChange={handleChange}
                                                                    value={guest.rsvpGuest}
                                                                    isDisabled={true}
                                                                />
                                                                <FormErrorMessage>{(errors.guests?.[index] as FormikErrors<IGuest>)?.rsvpGuest}</FormErrorMessage>
                                                            </FormControl>
                                                            <FormControl
                                                                isInvalid={!!(errors.guests && errors.guests[index] && (errors.guests[index] as FormikErrors<IGuest>).rsvpContact)}
                                                                mb={4}
                                                            >
                                                                <FormLabel>Contact number</FormLabel>
                                                                <Input
                                                                    type='text'
                                                                    name={`guests[${index}].rsvpContact`}
                                                                    onChange={handleChange}
                                                                    value={guest.rsvpContact}
                                                                />
                                                                <FormErrorMessage>{(errors.guests?.[index] as FormikErrors<IGuest>)?.rsvpContact}</FormErrorMessage>
                                                            </FormControl>
                                                            <FormControl
                                                                isInvalid={!!(errors.guests && errors.guests[index] && (errors.guests[index] as FormikErrors<IGuest>).rsvpAttending)}
                                                                mb={4}
                                                            >
                                                                <FormLabel>Will you be attending the wedding?</FormLabel>
                                                                <Field
                                                                    as={Select}
                                                                    id="rsvpAttending"
                                                                    name={`guests[${index}].rsvpAttending`}
                                                                    onChange={handleChange}

                                                                >
                                                                    <option value=""></option>
                                                                    <option value="Yes">Yes</option>
                                                                    <option value="No">No</option>
                                                                </Field>
                                                                <FormErrorMessage>{(errors.guests?.[index] as FormikErrors<IGuest>)?.rsvpAttending}</FormErrorMessage>
                                                            </FormControl>
                                                            <FormControl
                                                                isInvalid={!!(errors.guests && errors.guests[index] && (errors.guests[index] as FormikErrors<IGuest>).rsvpNumOfAttendees)}
                                                            >
                                                                <FormLabel>Number of attendees (including yourself)</FormLabel>
                                                                <Input
                                                                    type='number'
                                                                    name={`guests[${index}].rsvpNumOfAttendees`}
                                                                    onChange={handleChange}
                                                                    value={guest.rsvpNumOfAttendees}
                                                                />
                                                                <FormErrorMessage>{(errors.guests?.[index] as FormikErrors<IGuest>)?.rsvpNumOfAttendees}</FormErrorMessage>
                                                            </FormControl>
                                                        </Box>
                                                    </AccordionPanel>
                                                </AccordionItem>



                                            )

                                            )}
                                        </Accordion>
                                        <Flex justifyContent={'center'} mt={'auto'} py={4}>
                                            <Button leftIcon={<BsFillSendFill />} fontSize={fontSize} padding={padding} w={'auto'} onClick={() => { handleSubmit() }}>Send confirmation</Button>
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
                            onSubmit={(values) => onSubmit(values.guests)}
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
                                            {values.guests.map((guest: IGuest, index) => (
                                                <Box px={12} pt={12} pb={4} w={'100%'} key={index}>
                                                    <Text textAlign={'center'}>Guest {index + 1}</Text>
                                                    <FormControl
                                                        isInvalid={!!(errors.guests && errors.guests[index] && (errors.guests[index] as FormikErrors<IGuest>).rsvpGuest)}
                                                        mb={4}
                                                    >
                                                        <FormLabel>Name</FormLabel>
                                                        <Input
                                                            type='text'
                                                            name={`guests[${index}].rsvpGuest`}
                                                            onChange={handleChange}
                                                            value={guest.rsvpGuest}
                                                            isDisabled={true}
                                                        />
                                                        <FormErrorMessage>{(errors.guests?.[index] as FormikErrors<IGuest>)?.rsvpGuest}</FormErrorMessage>
                                                    </FormControl>
                                                    <FormControl
                                                        isInvalid={!!(errors.guests && errors.guests[index] && (errors.guests[index] as FormikErrors<IGuest>).rsvpContact)}
                                                        mb={4}
                                                    >
                                                        <FormLabel>Contact number</FormLabel>
                                                        <Input
                                                            type='number'
                                                            name={`guests[${index}].rsvpContact`}
                                                            onChange={handleChange}
                                                            value={guest.rsvpContact}
                                                        />
                                                        <FormErrorMessage>{(errors.guests?.[index] as FormikErrors<IGuest>)?.rsvpContact}</FormErrorMessage>
                                                    </FormControl>
                                                    <FormControl
                                                        isInvalid={!!(errors.guests && errors.guests[index] && (errors.guests[index] as FormikErrors<IGuest>).rsvpAttending)}
                                                        mb={4}
                                                    >
                                                        <FormLabel>Will you be attending the wedding?</FormLabel>
                                                        <Field
                                                            as={Select}
                                                            id="rsvpAttending"
                                                            name={`guests[${index}].rsvpAttending`}
                                                            onChange={handleChange}

                                                        >
                                                            <option value=""></option>
                                                            <option value="Yes">Yes</option>
                                                            <option value="No">No</option>
                                                        </Field>
                                                        <FormErrorMessage>{(errors.guests?.[index] as FormikErrors<IGuest>)?.rsvpAttending}</FormErrorMessage>
                                                    </FormControl>
                                                    <FormControl
                                                        isInvalid={!!(errors.guests && errors.guests[index] && (errors.guests[index] as FormikErrors<IGuest>).rsvpNumOfAttendees)}
                                                    >
                                                        <FormLabel>Number of attendees (including yourself)</FormLabel>
                                                        <Input
                                                            type='number'
                                                            name={`guests[${index}].rsvpNumOfAttendees`}
                                                            onChange={handleChange}
                                                            value={guest.rsvpNumOfAttendees}
                                                        />
                                                        <FormErrorMessage>{(errors.guests?.[index] as FormikErrors<IGuest>)?.rsvpNumOfAttendees}</FormErrorMessage>
                                                    </FormControl>
                                                </Box>
                                            )
                                            )}
                                        </Flex>
                                        <Flex justifyContent={'center'} mt={'auto'} pb={8}>
                                            <Button leftIcon={<BsFillSendFill />} fontSize={fontSize} padding={padding} w={'auto'} onClick={() => { handleSubmit() }}>Send confirmation</Button>
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