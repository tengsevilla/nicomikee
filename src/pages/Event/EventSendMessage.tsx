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
import { useMutation } from "@tanstack/react-query";
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Message } from "../../core/utils/utils";
import { useRef } from "react";
import { createMessage, IMessage } from "../../core/models/useMessageStore";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

// Validation schema
const validationSchema = Yup.object({
    messageName: Yup.string()
        .required("This is required")
        .min(3, "This must be at least 3 characters"),
    messageContent: Yup.string()
        .required("This is required")
        .min(10, "This must be at least 10 characters"),
});

export default function EventSendMessage({ isOpen, onClose }: Props) {
    const resetFormRef = useRef<() => void>(() => { });
    const buttonSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
    const qMessage = useMutation({
        mutationFn: (data: IMessage) => {
            return createMessage(data);
        },
        onSuccess: (response) => {
            if (response.status !== 200) {
                Message('error', response.message);
                return
            }
            Message('success', 'Message succesfully sent!');
            resetFormRef.current();
            onClose();
        },
        onError: () => {
            console.error('ERROR: API Failed');
        },
    })

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
                    initialValues={{ messageName: "", messageContent: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }: FormikHelpers<IMessage>) => {
                        resetFormRef.current = resetForm;
                        qMessage.mutate(values);
                    }}
                >
                    {(props) => (
                        <Form>
                            <ModalBody pb={6}>
                                {/* Name: label then input. below input there's a subtext helper */}
                                <Field name="messageName">
                                    {({ field, form }: { field: any; form: any }) => (
                                        <FormControl
                                            isInvalid={form.errors.messageName && form.touched.messageName}
                                        >
                                            <FormLabel htmlFor="messageName">Name</FormLabel>
                                            <Input {...field} id="messageName" size={{ base: 'sm', md: 'md' }} />
                                            <FormHelperText fontSize={'small'}>Name or nickname that they either know </FormHelperText>
                                            <FormErrorMessage fontSize={'small'}>{form.errors.messageName}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                {/* Say something to the newly weds: Label, Textarea. below input there's a subtext helper */}
                                <Field name="messageContent">
                                    {({ field, form }: { field: any; form: any }) => (
                                        <FormControl
                                            isInvalid={form.errors.messageContent && form.touched.messageContent}
                                        >
                                            <FormLabel htmlFor="messageContent" mt={4}>
                                                Say something to the newly weds
                                            </FormLabel>
                                            <Textarea
                                                {...field}
                                                id="messageContent"
                                                size={{ base: 'xs', md: 'sm', lg: 'md' }}
                                            />
                                            <FormHelperText fontSize={'small'}>Share your thoughts and wishes</FormHelperText>
                                            <FormErrorMessage fontSize={'small'}>{form.errors.messageContent}</FormErrorMessage>
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
                                    Submit
                                </Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            </ModalContent>
        </Modal>
    );
}
