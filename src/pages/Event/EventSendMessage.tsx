import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Textarea,
    useBreakpointValue,
    FormHelperText,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

// Validation schema
const validationSchema = Yup.object({
    name: Yup.string()
        .required("This is required")
        .min(2, "This must be at least 2 characters"),
    message: Yup.string()
        .required("This is required")
        .min(10, "This must be at least 10 characters"),
});

export default function EventSendMessage({ isOpen, onClose }: Props) {
    const buttonSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });

    return (
        <Modal
            closeOnOverlayClick={false}
            isOpen={isOpen}
            onClose={onClose}
            size={{ base: "sm", md: "md" }}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Your message</ModalHeader>
                <ModalCloseButton />
                <Formik
                    initialValues={{ name: "", message: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        console.log(values);
                        actions.setSubmitting(false);
                        onClose();
                    }}
                >
                    {(props) => (
                        <Form>
                            <ModalBody pb={6}>
                                {/* Name: label then input. below input there's a subtext helper */}
                                <Field name="name">
                                    {({ field, form }: { field: any; form: any }) => (
                                        <FormControl
                                            isInvalid={form.errors.name && form.touched.name}
                                        >
                                            <FormLabel htmlFor="name">Name</FormLabel>
                                            <Input {...field} id="name" placeholder="Name" size={{ base: 'sm', md: 'md' }} />
                                            <FormHelperText fontSize={'small'}>Name or nickname that they either know </FormHelperText>
                                            <FormErrorMessage fontSize={'small'}>{form.errors.name}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                {/* Say something to the newly weds: Label, Textarea. below input there's a subtext helper */}
                                <Field name="message">
                                    {({ field, form }: { field: any; form: any }) => (
                                        <FormControl
                                            isInvalid={form.errors.message && form.touched.message}
                                        >
                                            <FormLabel htmlFor="message" mt={4}>
                                                Say something to the newly weds
                                            </FormLabel>
                                            <Textarea
                                                {...field}
                                                id="message"
                                                size={{ base: 'xs', md: 'sm', lg: 'md' }}
                                            />
                                            <FormHelperText fontSize={'small'}>Share your thoughts and wishes</FormHelperText>
                                            <FormErrorMessage fontSize={'small'}>{form.errors.message}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    size={buttonSize}
                                    onClick={onClose}
                                    mr={4}
                                    isDisabled={props.isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size={buttonSize}
                                    colorScheme="blue"
                                    isLoading={props.isSubmitting}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            </ModalContent>
        </Modal>
    );
}
