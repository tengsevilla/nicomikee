import { createStandaloneToast} from "@chakra-ui/react";
import moment from "moment";
const { toast } = createStandaloneToast()

export const Message = (status: 'success' | 'error' | 'warning' | 'info', text: string, duration: number = 3000) => {
    toast({
        description: text,
        status: status,
        duration: duration,
        isClosable: true,
        position: 'top'
    });
}

export const ParseToDisplayDate = (dateString: string) => {
    const formattedDate = moment(dateString).format('MMM DD, YYYY HH:mm');
    return formattedDate;
}