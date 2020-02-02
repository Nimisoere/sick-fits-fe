import PleaseSignIn from '../components/PleaseSignin';
import Orders from '../components/Orders';

const OrderPage = ({query}) => (
    <PleaseSignIn>
        <Orders />
    </PleaseSignIn>
)

export default OrderPage;