import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const PaymentSuccess = () => {
    return (
            <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">  Your payment was successful</Alert>
        </Stack>
    )
}

export default PaymentSuccess;