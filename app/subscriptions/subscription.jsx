import axios from 'axios';
import { useRouter } from 'next/navigation';

const Subscribe = ({ planName }) => {
    const router = useRouter();

    const handleSubscription = async () => {
        try {
            const response = await axios.post('http://localhost:8000/subscriptions/create/', {
                plan_name: planName
            });
            const { payment_url } = response.data;
            window.location.href = payment_url;  
        } catch (error) {
            console.error('Error creating subscription:', error);
        }
    };

    return (
        <div>
            <h1>Subscribe to {planName}</h1>
            <button onClick={handleSubscription}>Subscribe Now</button>
        </div>
    );
};

export default Subscribe;
