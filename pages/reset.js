import Reset from '../components/Reset';

const ResetPassword = ({query}) => (
    <Reset resetToken={query.resetToken} />
)

export default ResetPassword;